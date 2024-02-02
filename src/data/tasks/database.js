import moment from 'moment';

import 'moment/dist/locale/uk';

export default {
  base: {
    group: 'Базові функції',
    tasks: [
      {
        request: 'Котра година?',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        action: () => {
          const currentDate = new Date();
          const currentHours = currentDate.getHours();
          const currentMinutes = currentDate.getMinutes();
          const hh = moment.duration(currentHours, 'h').locale('uk').humanize();
          const mm = moment.duration(currentMinutes, 'm').locale('uk').humanize();

          return `Поточний час: ${hh}, ${mm}`;
        }
      }
    ]
  },
  system: { group: 'Операційна система', tasks: [] },
  chatgpt: { group: 'Бесіда з ChatGPT', tasks: [] }
};
