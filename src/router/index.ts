import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import Jokes from '../views/Jokes.vue'
import NearestColor from "@/views/NearestColor.vue";
import TextArea from "@/views/TextArea.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/nearestColor',
    name: 'NearestColor',
    component: NearestColor
  },
  {
    path: '/textArea',
    name: 'TextArea',
    component: TextArea
  },
  {
    path: '/jokes',
    name: 'Jokes',
    component: Jokes
  }
];

const router = new VueRouter({
  routes
});

export default router
