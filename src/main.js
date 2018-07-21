import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import axios from 'axios'
import './boss.config.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import './assets/css/common.css'


Vue.use(Vant);
Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.prototype.$http = axios;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Env'] = globalConfig.env;
axios.defaults.headers = globalConfig.header;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
