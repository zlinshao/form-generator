import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Login from './views/login.vue'
import FormGenerator from './views/autoForm/index'
import Preview from './views/autoForm/Preview/index'
import ViewInMobile from './views/autoForm/Preview/viewInMobile/index'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      redirect : '/formGenerator'
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/formGenerator",
      name: "formGenerator",
      component: FormGenerator
    },
    {
      path: "/preview",
      name: "preview",
      component: Preview
    },
    {
      path: "/viewInMobile",
      name: "viewInMobile",
      component: ViewInMobile
    }
  ]
});
