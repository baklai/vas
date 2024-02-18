<script setup>
import { onMounted } from 'vue';
import { useRouter, RouterView } from 'vue-router';

import AppNavbar from '@/components/AppNavbar.vue';

import { useAssistant } from '@/stores/assistant';
import { useOptions } from '@/stores/options';

const assistant = useAssistant();
const options = useOptions();
const router = useRouter();

onMounted(async () => {
  window.api.on('router', name => {
    router.push({ name });
  });

  await assistant.initialize();

  if (!options.isToken) return;
  if (!options.isAutostart) return;

  if (options.isMsgWelcomeStatus) {
    await assistant.textToSpeech(options.msgWelcome);
  }

  if (options.isAutostart) {
    console.log(typeof options.isAutostart);
    await assistant.listening();
  }
});
</script>

<template>
  <AppNavbar />
  <main class="h-full overflow-auto bg-stone-800">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>
