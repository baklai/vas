<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

import AppNavbar from '@/components/AppNavbar.vue';

import { useAssistant } from '@/stores/assistant';

const assistant = useAssistant();

onMounted(async () => {
  await assistant.initialize();
  await assistant.play('moyi-vitannya-ya-na-zvyazku');
  if (assistant.isToken) {
    await assistant.play('pryvit-ya-vasyl-chym-ya-mozhu-dopomohty-sohodni');
    await assistant.listening();
  } else {
    await assistant.play('na-danyy-chas-ya-obmezhenyy-u-svoyikh-mozhlyvostyakh');
    await assistant.play('vidsutniy-klyuch-dostupu-do-openai');
  }
});
</script>

<template>
  <AppNavbar />
  <main class="h-full pt-10 overflow-auto bg-stone-800">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>
