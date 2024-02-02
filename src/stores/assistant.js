import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import * as tf from '@tensorflow/tfjs';
import * as SpeechCommands from '@tensorflow-models/speech-commands';
import Wave from 'wave-visualizer';
import axios from 'axios';

const BASE_OPENAI_API = 'https://api.openai.com/v1';

const BASE_SOUNDS_PATH = 'sounds';
const BASE_SOUNDS_EXT = 'mp3';

export const useAssistant = defineStore('assistant', () => {
  const openAIToken = ref();
  const recognizer = ref();
  const spinner = ref(false);
  const sensor = ref(false);
  const waver = ref(false);

  const isToken = computed(() => !!openAIToken.value);

  const isListening = computed(() => recognizer.value.isListening());

  function getToken() {
    return openAIToken.value;
  }

  function setToken(token) {
    openAIToken.value = token;
    localStorage.setItem('openai-api-token', token);
  }

  function animation(element) {
    switch (element) {
      case 'spinner':
        waver.value = false;
        sensor.value = false;

        spinner.value = true;
        break;
      case 'sensor':
        waver.value = false;
        spinner.value = false;

        sensor.value = true;
        break;
      case 'waver':
        sensor.value = false;
        spinner.value = false;

        waver.value = true;
        break;
      default:
        waver.value = false;
        sensor.value = false;
        spinner.value = false;
        break;
    }
  }

  async function play(audioBlobOrFile) {
    return new Promise((resolve, reject) => {
      animation('sensor');

      const audioURL =
        typeof audioBlobOrFile === 'string'
          ? `/${BASE_SOUNDS_PATH}/${audioBlobOrFile}.${BASE_SOUNDS_EXT}`.toLowerCase()
          : URL.createObjectURL(audioBlobOrFile);

      const audio = new Audio(audioURL);

      audio.addEventListener('ended', () => {
        resolve();
      });

      audio.addEventListener('error', err => {
        reject(err);
      });

      audio.play();
    });
  }

  async function chatGPT(text) {
    const jsonData = {
      model: 'gpt-3.5-turbo',
      max_tokens: 300,
      messages: [
        {
          role: 'system',
          content:
            'Тебе кличуть Василь. Ти голосовий помічник, який дає короткі та чіткі відповіді.'
        },
        {
          role: 'user',
          content: text
        }
      ]
    };

    animation('spinner');

    const response = await axios.post(`${BASE_OPENAI_API}/chat/completions`, jsonData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    });

    return response.data.choices[0].message.content;
  }

  async function textToSpeech(text) {
    const jsonData = {
      model: 'tts-1',
      voice: 'onyx',
      speed: 0.9,
      response_format: 'mp3',
      input: text
    };

    animation('spinner');

    const response = await axios.post(`${BASE_OPENAI_API}/audio/speech`, jsonData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      responseType: 'arraybuffer'
    });

    const audioBlob = new Blob([response.data], { type: 'audio/mp3' });

    await play(audioBlob);
  }

  async function speechToText(audioBlob) {
    const formData = new FormData();
    formData.append('file', audioBlob, 'speech.mp3');
    formData.append('language', 'uk');
    formData.append('model', 'whisper-1');
    formData.append('response_format', 'text');

    animation('spinner');

    const response = await axios.post(`${BASE_OPENAI_API}/audio/transcriptions`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'text'
    });

    return response.data;
  }

  async function initialize() {
    openAIToken.value = localStorage.getItem('openai-api-token');
    const model = SpeechCommands.create(
      'BROWSER_FFT',
      undefined,
      `${window.location.origin}/models/tfjs-speech-vasyl/model.json`,
      `${window.location.origin}/models/tfjs-speech-vasyl/metadata.json`
    );
    await model.ensureModelLoaded();
    recognizer.value = model;

    animation('sensor');
  }

  async function recording() {
    const silence = (audioStream, exitOnSilence = 5, callback) => {
      const audioContext = new AudioContext();
      let exitOnSilenceCount = 0;
      const gainNode = audioContext.createGain();
      const microphoneStream = audioContext.createMediaStreamSource(audioStream);
      microphoneStream.connect(gainNode);
      const analyserNode = audioContext.createAnalyser();
      analyserNode.smoothingTimeConstant = 0;
      analyserNode.fftSize = 2048;
      microphoneStream.connect(analyserNode);
      const bufferLength = analyserNode.frequencyBinCount;
      const arrayTimeDomain = new Uint8Array(bufferLength);
      let interval = setInterval(function () {
        analyserNode.getByteTimeDomainData(arrayTimeDomain);
        const isSilence = arrayTimeDomain.every(value => Math.abs(value - 128) < 10);
        if (isSilence) {
          exitOnSilenceCount++;
          if (exitOnSilenceCount >= exitOnSilence * 2) {
            clearInterval(interval);
            if (typeof callback === 'function') {
              callback();
            }
            return;
          }
          console.log('recording:', 'silence');
        } else {
          exitOnSilenceCount = 0;
          console.log('recording:', 'say');
        }
      }, 500);
    };

    return new Promise(async (resolve, reject) => {
      try {
        await play('zvukovyy-syhnal');

        animation('waver');

        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true
        });

        const wave = new Wave();
        wave.fromStream(audioStream, 'waver', {
          type: 'bars',
          colors: ['#22c55e', '#292524', '3498db'],
          stroke: 2
        });

        const chunks = [];
        const mediaRecorder = new MediaRecorder(audioStream);
        silence(audioStream, 3, () => {
          mediaRecorder.stop();
        });
        mediaRecorder.ondataavailable = async event => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };
        mediaRecorder.onstop = async () => {
          audioStream.getTracks().forEach(track => track.stop());
          const audioBlob = new Blob(chunks, { type: 'audio/mp3; codecs=opus' });
          resolve(audioBlob);
        };
        mediaRecorder.start();
      } catch (err) {
        reject(err);
      }
    });
  }

  async function listening() {
    if (!recognizer.value) return;
    animation('sensor');

    const classLabels = recognizer.value.wordLabels();

    await recognizer.value.listen(
      async ({ scores }) => {
        scores = Array.from(scores).map((s, i) => ({
          score: s,
          word: classLabels[i]
        }));

        const [current] = scores.sort((s1, s2) => s2.score - s1.score);

        console.log('assistant:', current.word);

        if (current.word.toLowerCase() === 'vasyl') {
          if (recognizer.value.isListening()) {
            await recognizer.value.stopListening();
          }

          await play('pryvit-shcho-potribno-kazhy-pislya-syhnalu');

          const audioData = await recording();

          const task = await speechToText(audioData);

          // const response = await window.api.receive('tasks', null);

          const response = await chatGPT(task);

          await textToSpeech(response);

          await listening();
        }
      },
      {
        includeSpectogram: false,
        overlapFactor: 0,
        invokeCallbackOnNoiseAndUnkown: false,
        probabilityThershold: 0.99
      }
    );
  }

  async function stoping() {
    animation('off');
    if (recognizer.value.isListening()) {
      await recognizer.value.stopListening();
      await play('vsoho-naykrashchoho-do-zustrichi');
    }
  }

  return {
    spinner,
    sensor,
    waver,
    isToken,
    isListening,
    play,
    setToken,
    chatGPT,
    textToSpeech,
    speechToText,
    initialize,
    recording,
    listening,
    stoping
  };
});
