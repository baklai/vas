<script setup>
import AppPreview from '@/components/AppPreview.vue';
import OpenAIToken from '@/components/OpenAIToken.vue';
import TasksPreview from '@/components/TasksPreview.vue';
import CanvasWaver from '@/components/CanvasWaver.vue';

import IconSensor from '@/components/icons/IconSensor.vue';
import IconSpinner from '@/components/icons/IconSpinner.vue';

import { useAssistant } from '@/stores/assistant';

const assistant = useAssistant();
</script>

<template>
  <div class="py-10 overflow-auto">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <AppPreview />

        <section class="mx-auto text-center my-10" v-if="assistant.isToken">
          <IconSensor width="180" height="180" color="#22c55e" v-show="assistant.sensor" />

          <IconSpinner width="180" height="180" color="#22c55e" v-show="assistant.spinner" />

          <CanvasWaver
            id="waver"
            width="300"
            height="180"
            color="#22c55e"
            v-show="assistant.waver"
          />
        </section>

        <section class="mx-auto text-center my-14 w-9/12" v-else>
          <OpenAIToken />
        </section>

        <section class="mx-auto text-center my-20 w-10/12" v-if="assistant.isToken">
          <TasksPreview />
        </section>
      </div>
    </div>
  </div>
</template>
