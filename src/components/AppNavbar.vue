<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import iconRestore from '@/assets/img/icon-restore.png';
import iconMaximize from '@/assets/img/icon-maximize.png';

import { useAssistant } from '@/stores/assistant';

const Router = useRouter();

const assistant = useAssistant();

const isMenu = ref(false);
const isMaximized = ref(false);

const menu = ref([]);

const getRoute = name => {
  const routes = Router.getRoutes();
  const route = routes.find(item => item.name === name);
  return {
    title: route.meta.title,
    description: route.meta.description,
    route: { name: route.name }
  };
};

const showHideMenu = () => {
  isMenu.value = !isMenu.value;
};

const onMinimize = () => {
  window.api.send('minimize', true);
};

const onMaximize = () => {
  window.api.send('maximize', true);
};

const onClose = async () => {
  await assistant.stoping();
  window.api.send('close', true);
};

onMounted(() => {
  menu.value = [
    [getRoute('home'), getRoute('task'), getRoute('tasks')],
    [getRoute('option'), getRoute('about')]
  ];

  window.api.on('isMaximized', () => {
    isMaximized.value = true;
  });

  window.api.on('isRestored', () => {
    isMaximized.value = false;
  });
});
</script>

<template>
  <div class="flex flex-col items-stretch w-full top-0">
    <div class="flex w-full bg-stone-900 drag">
      <div class="flex justify-start w-4/12 h-10">
        <button class="h-full w-10 flex items-center justify-center no-drag" @click="showHideMenu">
          <img src="@/assets/img/icon-menu.png" alt="menu" width="24" height="24" />
        </button>
      </div>
      <div class="flex grow text-center items-center justify-center">
        <p class="uppercase text-center text-stone-50 font-bold truncate">
          {{ $route.meta.title || 'Voice Assistant System' }}
        </p>
      </div>
      <div class="flex justify-end w-4/12 h-10">
        <button
          class="h-full w-10 flex items-center justify-center hover:bg-stone-700 no-drag"
          @click="onMinimize"
        >
          <img src="@/assets/img/icon-minimize.png" alt="minimize" width="24" height="24" />
        </button>
        <button
          class="h-full w-10 flex items-center justify-center hover:bg-stone-700 no-drag"
          @click="onMaximize"
        >
          <img
            :src="isMaximized ? iconRestore : iconMaximize"
            alt="restore/maximize"
            width="24"
            height="24"
          />
        </button>
        <button
          class="h-full w-10 flex items-center justify-center hover:bg-red-700 no-drag"
          @click="onClose"
        >
          <img src="@/assets/img/icon-close.png" alt="close" width="24" height="24" />
        </button>
      </div>
    </div>

    <Transition>
      <nav class="w-full" v-show="isMenu">
        <div class="shadow-sm border-y bg-stone-800 border-stone-700">
          <div
            class="grid overflow-auto max-w-screen-xl px-4 py-5 mx-auto sm:grid-cols-2 md:grid-cols-3 md:px-6 h-screen sm:h-auto"
          >
            <ul v-for="ul in menu">
              <li v-for="li in ul" @click="showHideMenu">
                <router-link
                  :to="li.route"
                  class="block p-3 rounded-lg hover:bg-stone-700 text-green-600 hover:text-green-400"
                >
                  <div class="font-semibold">{{ li.title }}</div>
                  <span class="text-sm text-stone-400">
                    {{ li.description }}
                  </span>
                </router-link>
              </li>
            </ul>

            <div class="mt-2 mb-10 ml-4">
              <h2 class="mb-2 font-semibold text-stone-50">OpenAI API</h2>
              <p class="mb-2 text-stone-400">
                OpenAI API можна застосувати практично до будь-якого завдання. OpenAI пропонуємо
                низку моделей з різними можливостями та цінами.
              </p>
              <a
                target="_blank"
                href="https://platform.openai.com/docs/overview"
                class="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-400"
              >
                Дослідіть OpenAI API
                <span class="sr-only">Дослідіть OpenAI API</span>
                <svg
                  class="w-3 h-3 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </Transition>
  </div>
</template>

<style scoped>
.drag {
  -webkit-app-region: drag;
}

.no-drag {
  -webkit-app-region: no-drag;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
