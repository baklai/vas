import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import * as tf from '@tensorflow/tfjs';
import * as SpeechCommands from '@tensorflow-models/speech-commands';
import Wave from 'wave-visualizer';

import { useOptions } from '@/stores/options';
import { useTasks } from '@/stores/tasks';
import { useApi } from '@/stores/apiservice';

const BASE_SOUNDS_PATH = 'sounds';
const BASE_SOUNDS_EXT = 'mp3';

export const useAssistant = defineStore('assistant', () => {
  const options = useOptions();
  const tasks = useTasks();
  const api = useApi();

  const recognizer = ref();

  const isListening = computed(() => recognizer.value.isListening());

  async function play(audioBlobOrFile) {
    return new Promise((resolve, reject) => {
      options.setAnimation('sensor');

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

  async function gptToSpeech(text) {
    options.setAnimation('spinner');
    const audioBlob = await api.completions(text);
    await play(audioBlob);
  }

  async function textToSpeech(text) {
    options.setAnimation('spinner');
    const audioBlob = await api.speech(text);
    await play(audioBlob);
  }

  async function speechToText(audioBlob) {
    options.setAnimation('spinner');
    return await api.transcriptions(audioBlob);
  }

  async function initialize() {
    const model = SpeechCommands.create(
      'BROWSER_FFT',
      undefined,
      `${window.location.origin}/models/tfjs-speech-vasyl/model.json`,
      `${window.location.origin}/models/tfjs-speech-vasyl/metadata.json`
    );
    await model.ensureModelLoaded();
    recognizer.value = model;

    options.setAnimation('sensor');
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

        options.setAnimation('waver');

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
    options.setAnimation('sensor');

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
          const text = await speechToText(audioData);
          const task = await tasks.findTask(text);

          if (typeof task?.action === 'function') {
            const response = task.action();
            await play('zadacha-uspishno-vykonana');
            await textToSpeech(response);
          } else {
            await play('shchos-ya-tebe-ne-zrozumiv');
          }

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
    options.setAnimation('off');
    if (recognizer.value.isListening()) {
      await recognizer.value.stopListening();
    }
    if (options.msgGoodbyeStatus) {
      await textToSpeech(options.msgGoodbye);
    }
  }

  return {
    isListening,
    gptToSpeech,
    textToSpeech,
    speechToText,
    initialize,
    recording,
    listening,
    stoping
  };
});
