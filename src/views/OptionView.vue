<script setup>
import ServiceToken from '@/components/ServiceToken.vue';

import { useOptions } from '@/stores/options';

const options = useOptions();

const setMsgWelcome = event => {
  options.setMsgWelcome(event.target.value);
};

const setMsgGoodbye = event => {
  options.setMsgGoodbye(event.target.value);
};
</script>

<template>
  <div class="grid gap-6 mb-6 md:grid-cols-2 m-auto px-4 py-10 lg:w-4/6">
    <div class="p-4 border rounded-lg border-stone-600">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <svg
            class="flex-shrink-0 w-4 h-4 me-2 text-green-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z"
            />
          </svg>
          <h3 class="text-lg font-medium text-green-400">Автозапуск</h3>
        </div>
      </div>

      <div class="mt-2 mb-4 text-sm text-stone-400">Автозапуск асистента при старті системи</div>

      <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <input
            required
            type="checkbox"
            v-model="options.startup"
            class="w-4 h-4 border rounded focus:ring-3 bg-stone-700 border-stone-600 focus:ring-blue-600 ring-offset-stone-800"
          />
        </div>
        <label class="ms-2 text-sm font-medium text-stone-200">
          Автозапуск додатку при старті системи
        </label>
      </div>

      <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <input
            required
            type="checkbox"
            v-model="options.autostart"
            class="w-4 h-4 border rounded focus:ring-3 bg-stone-700 border-stone-600 focus:ring-blue-600 ring-offset-stone-800"
          />
        </div>
        <label class="ms-2 text-sm font-medium text-stone-200">
          Автозапуск асистента при старті додатку
        </label>
      </div>
    </div>

    <div class="p-4 border rounded-lg border-stone-600">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <svg
            class="flex-shrink-0 w-4 h-4 me-2 text-green-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M21 18H15V15H13.3C12.2 17.4 9.7 19 7 19C3.1 19 0 15.9 0 12S3.1 5 7 5C9.7 5 12.2 6.6 13.3 9H24V15H21V18M17 16H19V13H22V11H11.9L11.7 10.3C11 8.3 9.1 7 7 7C4.2 7 2 9.2 2 12S4.2 17 7 17C9.1 17 11 15.7 11.7 13.7L11.9 13H17V16M7 15C5.3 15 4 13.7 4 12S5.3 9 7 9 10 10.3 10 12 8.7 15 7 15M7 11C6.4 11 6 11.4 6 12S6.4 13 7 13 8 12.6 8 12 7.6 11 7 11Z"
            />
          </svg>
          <h3 class="text-lg font-medium text-green-400">Ключ доступу до OpenAI API</h3>
        </div>
      </div>

      <div class="mt-2 mb-4 text-sm text-stone-400">
        Введіть ключ доступу до OpenAI API, щоб система запрацювала.
      </div>

      <div class="flex flex-col mb-6">
        <ServiceToken />
      </div>
    </div>

    <div class="p-4 border rounded-lg border-stone-600">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <svg
            class="flex-shrink-0 w-4 h-4 me-2 text-green-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M9,5A4,4 0 0,1 13,9A4,4 0 0,1 9,13A4,4 0 0,1 5,9A4,4 0 0,1 9,5M9,15C11.67,15 17,16.34 17,19V21H1V19C1,16.34 6.33,15 9,15M16.76,5.36C18.78,7.56 18.78,10.61 16.76,12.63L15.08,10.94C15.92,9.76 15.92,8.23 15.08,7.05L16.76,5.36M20.07,2C24,6.05 23.97,12.11 20.07,16L18.44,14.37C21.21,11.19 21.21,6.65 18.44,3.63L20.07,2Z"
            />
          </svg>
          <h3 class="text-lg font-medium text-green-400">Вітальне повідомлення</h3>
        </div>
      </div>

      <div class="mt-2 mb-4 text-sm text-stone-400">
        Вітальне повідомлення яке буде говорити асистент при запуску системи
      </div>

      <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <input
            required
            type="checkbox"
            v-model="options.msgWelcomeStatus"
            class="w-4 h-4 border rounded focus:ring-3 bg-stone-700 border-stone-600 focus:ring-blue-600 ring-offset-stone-800"
          />
        </div>
        <label class="ms-2 text-sm font-medium text-stone-200">
          Увімкнути/вимкнути повідомлення
        </label>
      </div>

      <div class="mb-6">
        <input
          required
          type="text"
          v-model="options.msgWelcome"
          class="border text-sm rounded-lg block w-full p-2.5 bg-stone-800 border-stone-600 placeholder-stone-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="Вітальне повідомлення"
          @input="setMsgWelcome"
        />
      </div>
    </div>

    <div class="p-4 border rounded-lg border-stone-600">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <svg
            class="flex-shrink-0 w-4 h-4 me-2 text-green-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M9,5A4,4 0 0,1 13,9A4,4 0 0,1 9,13A4,4 0 0,1 5,9A4,4 0 0,1 9,5M9,15C11.67,15 17,16.34 17,19V21H1V19C1,16.34 6.33,15 9,15M16.76,5.36C18.78,7.56 18.78,10.61 16.76,12.63L15.08,10.94C15.92,9.76 15.92,8.23 15.08,7.05L16.76,5.36M20.07,2C24,6.05 23.97,12.11 20.07,16L18.44,14.37C21.21,11.19 21.21,6.65 18.44,3.63L20.07,2Z"
            />
          </svg>
          <h3 class="text-lg font-medium text-green-400">Прощальне повідомлення</h3>
        </div>
      </div>

      <div class="mt-2 mb-4 text-sm text-stone-400">
        Прощальне повідомлення яке буде говорити асистент при зупинці системи
      </div>

      <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <input
            required
            type="checkbox"
            v-model="options.msgGoodbyeStatus"
            class="w-4 h-4 border rounded focus:ring-3 bg-stone-800 border-stone-600 focus:ring-blue-600 ring-offset-stone-800"
          />
        </div>
        <label class="ms-2 text-sm font-medium text-stone-200">
          Увімкнути/вимкнути повідомлення
        </label>
      </div>

      <div class="mb-6">
        <input
          required
          type="text"
          v-model="options.msgGoodbye"
          class="border text-sm rounded-lg block w-full p-2.5 bg-stone-800 border-stone-600 placeholder-stone-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="Прощальне повідомлення"
          @input="setMsgGoodbye"
        />
      </div>
    </div>
  </div>
</template>
