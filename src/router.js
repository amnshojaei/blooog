import Vue from 'vue';
import Router from 'vue-router';

import Home from './pages/Home.vue';
import About from './pages/About.vue';
import Contact from './pages/Contact.vue';
import Single from './pages/posts/Single.vue';
import i18n from './i18n';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: `${i18n.locale}`
    },
    {
      path: '/:lang',
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
        },
        {
          path: 'about',
          name: 'about',
          component: About,
        },
        {
          path: 'contact',
          name: 'contact',
          component: Contact,
        },
        {
          path: 'post/:id',
          name: 'post',
          component: Single,
        },
      ]
    }
  ],
});
