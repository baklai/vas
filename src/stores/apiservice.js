import { defineStore } from 'pinia';
import axios from 'axios';

import { useOptions } from '@/stores/options';

const BASE_OPENAI_API = 'https://api.openai.com/v1';

export const useApi = defineStore('apiservice', () => {
  const { getToken } = useOptions();

  async function transcriptions(audioBlob) {
    const formData = new FormData();
    formData.append('file', audioBlob, 'speech.mp3');
    formData.append('language', 'uk');
    formData.append('model', 'whisper-1');
    formData.append('response_format', 'text');

    const response = await axios.post(`${BASE_OPENAI_API}/audio/transcriptions`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'text'
    });

    return response.data;
  }

  async function completions(text) {
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

    const response = await axios.post(`${BASE_OPENAI_API}/chat/completions`, jsonData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    });

    return await speech(response.data.choices[0].message.content);
  }

  async function speech(text) {
    const jsonData = {
      model: 'tts-1',
      voice: 'onyx',
      speed: 0.9,
      response_format: 'mp3',
      input: text
    };

    const response = await axios.post(`${BASE_OPENAI_API}/audio/speech`, jsonData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      responseType: 'arraybuffer'
    });

    return new Blob([response.data], { type: 'audio/mp3' });
  }

  return {
    transcriptions,
    completions,
    speech
  };
});
