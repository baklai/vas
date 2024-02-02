<script setup>
defineProps({
  width: {
    type: String,
    default: '200'
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
  <svg
    class="mx-auto text-center"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    :width="width"
    :height="height"
  >
    <linearGradient id="a8">
      <stop offset="0" :stop-color="color" stop-opacity="0"></stop>
      <stop offset="1" :stop-color="color"></stop>
    </linearGradient>
    <circle
      fill="none"
      stroke="url(#a8)"
      stroke-width="15"
      stroke-linecap="round"
      stroke-dasharray="0 44 0 44 0 44 0 44 0 360"
      cx="100"
      cy="100"
      r="70"
      transform-origin="center"
    >
      <animateTransform
        type="rotate"
        attributeName="transform"
        calcMode="discrete"
        dur="1"
        values="360;324;288;252;216;180;144;108;72;36"
        repeatCount="indefinite"
      ></animateTransform>
    </circle>
  </svg>
</template>
