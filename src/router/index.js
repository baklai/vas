import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'Асистент',
        description: 'Як я можу допомогти сьогодні?'
      },
      component: HomeView
    },
    {
      path: '/task',
      name: 'task',
      meta: {
        title: 'Нова задача',
        description: 'Спробуйте створити кастомну задачу.'
      },
      component: () => import('../views/TaskOneView.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      meta: {
        title: 'Перелік задач',
        description: 'Перелік стандартних та кастомних задач.'
      },
      component: () => import('../views/TaskListView.vue')
    },
    {
      path: '/option',
      name: 'option',
      meta: {
        title: 'Налаштування',
        description: 'Налаштування системи голосового асистента.'
      },
      component: () => import('../views/OptionView.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: 'Про програму',
        description: 'Документація по роботі з голосовим асистентом.'
      },
      component: () => import('../views/AboutView.vue')
    }
  ]
});

export default router;
