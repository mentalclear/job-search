import { createRouter, createWebHashHistory } from 'vue-router';

// Lazy loading the components(Used insted of imports)
const HomeView = () => import('@/views/HomeView.vue');
// Grouping lazy loaded components into chunks(see comments inside):
const JobResultsView = () => import(/* webpackChunkName: 'jobs' */ '@/views/JobResultsView.vue');
const JobView = () => import(/* webpackChunkName: 'jobs' */ '@/views/JobView.vue');
const TeamsView = () => import(/* webpackChunkName: 'jobs' */ '@/views/TeamsView.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/jobs/results',
    name: 'JobResults',
    component: JobResultsView,
  },
  {
    path: '/jobs/results/:id',
    name: 'JobListing',
    component: JobView,
  },
  {
    path: '/teams',
    name: 'Teams',
    component: TeamsView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
