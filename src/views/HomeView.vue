<script setup>
import AppPreview from '@/components/AppPreview.vue';
import ServiceToken from '@/components/ServiceToken.vue';
import TasksPreview from '@/components/TasksPreview.vue';
import CanvasWaver from '@/components/CanvasWaver.vue';

import IconSensor from '@/components/icons/IconSensor.vue';
import IconSpinner from '@/components/icons/IconSpinner.vue';

import { useOptions } from '@/stores/options';

const options = useOptions();
</script>

<template>
  <div class="py-10 overflow-auto">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <AppPreview />

        <section class="mx-auto text-center my-10" v-if="options.isToken">
          <IconSensor width="180" height="180" color="#22c55e" v-show="options.isSensor" />

          <IconSpinner width="180" height="180" color="#22c55e" v-show="options.isSpinner" />

          <CanvasWaver
            id="waver"
            width="300"
            height="180"
            color="#22c55e"
            v-show="options.isWaver"
          />
        </section>

        <section class="mx-auto text-center my-14 w-9/12" v-else>
          <ServiceToken />
        </section>

        <section class="mx-auto text-center my-20 w-10/12" v-if="options.isToken">
          <TasksPreview />
        </section>
      </div>
    </div>
  </div>
</template>
