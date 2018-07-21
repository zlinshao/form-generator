/**
 * Created by Administrator on 2017/12/13 0013.
 */
import Vue from 'vue';
import Vuex from 'vuex';

import autoForm from './modules/autoForm'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    autoForm
  },
});

export default store
