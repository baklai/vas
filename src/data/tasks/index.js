import tasks from './database';

export const searchTask = inputString => {
  if (!inputString?.length) return;

  const setsOfWords = [];

  for (let key in tasks) {
    if (tasks.hasOwnProperty(key)) {
      setsOfWords.push(...tasks[key].records);
    }
  }

  const wordsInString = [
    ...new Set(
      inputString
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .split(' ')
    )
  ];

  if (!wordsInString.length) return;

  let bestSet = null;
  let maxMatchingPercentage = 0;
  let countWordSet = 0;

  for (const wordSet of setsOfWords) {
    const matchingWords = wordSet?.words?.filter(word =>
      wordsInString.includes(word.toLowerCase())
    );

    const matchingPercentage = Math.round((matchingWords.length / wordsInString.length) * 100);

    if (matchingPercentage >= maxMatchingPercentage && wordSet?.words?.length > countWordSet) {
      maxMatchingPercentage = matchingPercentage;
      bestSet = wordSet;
    }
  }

  return { task: bestSet, matchingPercentage: maxMatchingPercentage };
};

export const taskList = () => {
  const response = [];

  for (let key in tasks) {
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

export default searchTask;
