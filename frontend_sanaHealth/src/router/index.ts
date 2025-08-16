    // router/index.ts
    import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
    import HomeView from '@/views/HomeView.vue';
    const routes: Array<RouteRecordRaw> = [
      {
        path: '/',
        name: 'Home',
        component: HomeView,
      },
    ];

    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    export default router;