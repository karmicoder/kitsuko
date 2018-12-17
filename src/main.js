import Vue from 'vue';
import VueMaterial from 'vue-material';

import App from './App.vue';
import store from './store';
import router from '@/router';

import 'vue-material/dist/vue-material.min.css';
import 'vue2-animate/dist/vue2-animate.min.css';

Vue.use(VueMaterial);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
