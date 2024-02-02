<script setup>
defineProps({
  id: {
    type: String,
    default: 'waver'
  },
  width: {
    type: String,
    default: '300'
  },
  height: {
    type: String,
    default: '200'
  },
  color: {
    type: String,
    default: '#ffffff'
  }
});
</script>

<template>
  <canvas :id="id" :width="width" :height="height" class="mx-auto text-center"></canvas>
</template>
