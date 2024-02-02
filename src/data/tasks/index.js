import moment from 'moment';

import 'moment/dist/locale/uk';

const tasks = {
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
  system: { group: 'Операційна система', tasks: [] },
  chatgpt: { group: 'Бесіда з ChatGPT', tasks: [] }
};

export const listOfTasks = () => {
  const response = [];

  for (const key in tasks) {
    if (tasks.hasOwnProperty(key)) {
      response.push(
        ...tasks[key].tasks.map(({ request, description, action }) => {
          return { request, description, action };
        })
      );
    }
  }

  return response;
};

export const listTasksOfGroups = () => {
  const response = [];

  for (const key in tasks) {
    if (tasks.hasOwnProperty(key)) {
      response.push({
        group: tasks[key].group,
        tasks: tasks[key].tasks.map(({ request, description }) => {
          return { request, description };
        })
      });
    }
  }

  return response;
};

export default tasks;
