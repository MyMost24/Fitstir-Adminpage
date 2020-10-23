import Vue from 'vue'
import VueRouter from 'vue-router'
import Uploadvideo from  './Uploadvideo';
import Playlistvideo from './PlaylistVideo'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import( '../views/Login')
  },
  {
    path: '/app',
    component: () => import( '../views/Home'),
    children : [
      {
        path : '',
        component : () => import('../views/UploadVideo/index')
      },
      Uploadvideo,
      Playlistvideo,
    ]
  },


]

const router = new VueRouter({
  routes
})

export default router
