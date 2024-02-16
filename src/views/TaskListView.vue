<script setup>
import { ref, onMounted } from 'vue';

import { useTasks } from '@/stores/tasks';

const vastasks = useTasks();

const tasksList = ref([]);

const selectTask = ref(null);

const toggleTask = task => {
  if (selectTask.value === task) {
    selectTask.value = null;
  } else {
    selectTask.value = task;
  }
};

onMounted(() => {
  tasksList.value = vastasks.listTasksOfGroups();
});
</script>

<template>
  <div class="pt-10 pb-20">
    <div v-for="(group, i) in tasksList" :key="i" class="py-6">
      <div class="text-base font-bold tracking-wider text-stone-100 m-auto w-3/4 mb-4">
        <h1>{{ group.group }}</h1>
      </div>

      <div class="m-auto w-3/4" v-for="(task, j) in group.tasks" :key="j">
        <h2>
          <button
            type="button"
            class="flex items-center justify-between w-full py-2 px-2 font-medium rtl:text-right border-b border-dotted border-stone-700 text-green-500 gap-3"
            @click="toggleTask(`${i}-${j}`)"
          >
            <span>{{ task.request }}</span>
            <svg
              :class="`${i}-${j}` === selectTask ? '' : 'rotate-180'"
              class="w-3 h-3 shrink-0 text-stone-400 hover:text-stone-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div v-show="`${i}-${j}` === selectTask">
          <div class="py-5 border-stone-700">
            <p class="text-stone-300">
              {{ task.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
