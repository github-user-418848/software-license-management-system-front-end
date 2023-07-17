import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Account/Login.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  // Add more routes for other pages/components as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;