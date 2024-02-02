<script setup>
import { ref, onMounted } from 'vue';

import IconAssistant from '@/components/icons/IconAssistant.vue';

const versions = ref([]);

onMounted(async () => {
  versions.value = await window.api.receive('versions');
});
</script>

<template>
  <div class="m-auto w-3/4 lg:w-2/4 xl:w-1/4 py-10">
    <div class="text-center mb-8">
      <IconAssistant class="mx-auto max-w-2xl text-center text-stone-400" />
      <h1 class="text-2xl tracking-tight font-bold text-stone-100">Привіт, я Василь!</h1>
      <p class="my-2 text-2xl font-bold tracking-tight sm:text-3xl text-green-500 uppercase">
        Voice Assistant System
      </p>
    </div>

    <div
      class="flex p-4 mb-4 text-sm border border-green-400 rounded-lg bg-stone-900 text-green-400"
      role="alert"
    >
      <svg
        class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        />
      </svg>
      <div>
        <span class="font-medium">Про програму</span>
        <ul class="mt-1.5 list-disc list-inside">
          <li class="text-stone-300" v-for="item in versions" :key="item.key">
            <span class="font-medium"> {{ item.title }} </span>: {{ item.version }}
          </li>
        </ul>
      </div>
    </div>

    <div
      class="flex p-4 mb-4 text-sm border border-orange-400 rounded-lg bg-stone-900 text-orange-400"
      role="alert"
    >
      <svg
        class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        />
      </svg>
      <div>
        <span class="font-medium">Зауваження по програмі</span>
        <ul class="mt-1.5 list-disc list-inside">
          <li class="text-stone-300 mb-2">
            У своїй роботі додаток використовує можливості
            <a
              href="https://platform.openai.com/docs/guides/text-to-speech/text-to-speech"
              target="_blank"
              class="font-medium hover:text-green-400"
              >Text to speech</a
            >,

            <a
              href="https://platform.openai.com/docs/guides/speech-to-text/speech-to-text"
              target="_blank"
              class="font-medium hover:text-green-400"
              >Speech to text</a
            >

            та

            <a
              href="https://platform.openai.com/docs/guides/text-generation/text-generation-models"
              target="_blank"
              class="font-medium hover:text-green-400"
              >Text generation</a
            >
            OpenAI API.
          </li>
          <li class="text-stone-300 mb-2">
            <a
              href="https://openai.com/policies/usage-policies"
              target="_blank"
              class="font-medium hover:text-green-400"
            >
              Політика використання
            </a>
            OpenAI вимагає повідомити, що голос TTS, який ви чуєте, створено ШІ, а не голосом
            людини.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
