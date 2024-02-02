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
    <circle
      fill="none"
      stroke-opacity="1"
      :stroke="color"
      stroke-width=".5"
      cx="100"
      cy="100"
      r="0"
    >
      <animate
        attributeName="r"
        calcMode="spline"
        dur="2"
        values="1;80"
        keyTimes="0;1"
        keySplines="0 .2 .5 1"
        repeatCount="indefinite"
      ></animate>
      <animate
        attributeName="stroke-width"
        calcMode="spline"
        dur="2"
        values="0;25"
        keyTimes="0;1"
        keySplines="0 .2 .5 1"
        repeatCount="indefinite"
      ></animate>
      <animate
        attributeName="stroke-opacity"
        calcMode="spline"
        dur="2"
        values="1;0"
        keyTimes="0;1"
        keySplines="0 .2 .5 1"
        repeatCount="indefinite"
      ></animate>
    </circle>
  </svg>
</template>
