import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/sass/app.scss'


// Navigation Guards for switch languages
router.beforeEach((to, from, next) => {
  let language = to.params.lang

  if (!language) {
    language = 'en'
  }

  if (language && language === 'fa') {
    document.querySelector('body').classList.add('rtl')
  } else {
    document.querySelector('body').classList.remove('rtl')
  }

  i18n.locale = language
  next()
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
