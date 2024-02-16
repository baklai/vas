import { ref } from 'vue';
import { defineStore } from 'pinia';

import moment from 'moment';

import 'moment/dist/locale/uk';

const SIMILARITY_ACCURACY = 0.95;

export const useTasks = defineStore('tasks', () => {
  const tasks = ref({
    base: {
      group: 'Базові функції',
      tasks: [
        {
          request: 'Котра година?',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          action: () => {
            const currentDate = new Date();
            const hh = moment.duration(currentDate.getHours(), 'h').locale('uk').humanize();
            const mm = moment.duration(currentDate.getMinutes(), 'm').locale('uk').humanize();

            return `Поточний час: ${hh}, ${mm}`;
          }
        }
      ]
    },
    system: {
      group: 'Операційна система',
      tasks: [
        {
          request: 'Відкрий блокнот!',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          action: () => {
            const currentDate = new Date();
            const hh = moment.duration(currentDate.getHours(), 'h').locale('uk').humanize();
            const mm = moment.duration(currentDate.getMinutes(), 'm').locale('uk').humanize();

            return `Поточний час: ${hh}, ${mm}`;
          }
        },
        {
          request: 'Відкрий браузер!',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          action: () => {
            const currentDate = new Date();
            const hh = moment.duration(currentDate.getHours(), 'h').locale('uk').humanize();
            const mm = moment.duration(currentDate.getMinutes(), 'm').locale('uk').humanize();

            return `Поточний час: ${hh}, ${mm}`;
          }
        },
        {
          request: 'Презавантаж компьютер!',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          action: () => {
            const currentDate = new Date();
            const hh = moment.duration(currentDate.getHours(), 'h').locale('uk').humanize();
            const mm = moment.duration(currentDate.getMinutes(), 'm').locale('uk').humanize();

            return `Поточний час: ${hh}, ${mm}`;
          }
        },
        {
          request: 'Вимкни компьютер!',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          action: () => {
            const currentDate = new Date();
            const hh = moment.duration(currentDate.getHours(), 'h').locale('uk').humanize();
            const mm = moment.duration(currentDate.getMinutes(), 'm').locale('uk').humanize();

            return `Поточний час: ${hh}, ${mm}`;
          }
        }
      ]
    },
    chatgpt: { group: 'Бесіда з ChatGPT', tasks: [] }
  });

  function findTask(request) {
    if (!request?.length) return;

    const arrTasks = listOfTasks();

    for (const task of arrTasks) {
      const similar = jaroWinklerDistance(request.toUpperCase(), task.request.toUpperCase());

      if (similar >= SIMILARITY_ACCURACY) return task;
    }

    return;
  }

  function listOfTasks() {
    const response = [];

    for (const key in tasks.value) {
      if (tasks.value.hasOwnProperty(key)) {
        response.push(
          ...tasks.value[key].tasks.map(({ request, description, action }) => {
            return { request, description, action };
          })
        );
      }
    }

    return response;
  }

  function listTasksOfGroups() {
    const response = [];

    for (const key in tasks.value) {
      if (tasks.value.hasOwnProperty(key)) {
        response.push({
          group: tasks.value[key].group,
          tasks: tasks.value[key].tasks.map(({ request, description }) => {
            return { request, description };
          })
        });
      }
    }

    return response;
  }

  function jaroWinklerDistance(str1, str2) {
    function jaroDistance(s1, s2) {
      const len1 = s1.length;
      const len2 = s2.length;

      const matchDistance = Math.floor(Math.max(len1, len2) / 2) - 1;

      const matches = new Array(Math.min(len1, len2));
      matches.fill(false);

      let matchingCharacters = 0;

      for (let i = 0; i < len1; i++) {
        const start = Math.max(0, i - matchDistance);
        const end = Math.min(i + matchDistance + 1, len2);

        for (let j = start; j < end; j++) {
          if (!matches[j] && s1[i] === s2[j]) {
            matches[j] = true;
            matchingCharacters++;
            break;
          }
        }
      }

      if (matchingCharacters === 0) {
        return 0.0;
      }

      const transpositions =
        matches.filter((match, index) => match && s1[index] !== s2[index]).length / 2;

      const jaroSimilarity =
        (matchingCharacters / len1 +
          matchingCharacters / len2 +
          (matchingCharacters - transpositions) / matchingCharacters) /
        3;

      return jaroSimilarity;
    }

    function winklerAdjustment(jaroSimilarity, prefixLength) {
      const jaroWinklerScalingFactor = 0.1;
      const maxCommonPrefixLength = 4;

      const commonPrefixLength = Math.min(prefixLength, maxCommonPrefixLength);

      return jaroSimilarity + commonPrefixLength * jaroWinklerScalingFactor * (1 - jaroSimilarity);
    }

    const jaroSimilarity = jaroDistance(str1, str2);

    let prefixLength = 0;
    for (let i = 0; i < Math.min(str1.length, str2.length, 4); i++) {
      if (str1[i] === str2[i]) {
        prefixLength++;
      } else {
        break;
      }
    }

    return winklerAdjustment(jaroSimilarity, prefixLength);
  }

  return {
    findTask,
    listOfTasks,
    listTasksOfGroups
  };
});
