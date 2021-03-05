import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import UserSignIn from '../views/UserSignIn.vue'
import UserSignUp from '../views/UserSignUp.vue'
import Tweets from '../views/Tweets.vue'
import User from '../views/User.vue'
import UserSetting from '../views/UserSetting.vue'
import AdminSignin from '../views/AdminSignin.vue'
import AdminTweets from './../views/AdminTweets.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin',
  },
  {
    path: '/signin',
    name: 'signin',
    component: UserSignIn,
  },
  {
    path: '/signup',
    name: 'signup',
    component: UserSignUp,
  },
  {
    path: '/users/:id/setting',
    name: 'user-setting',
    component: UserSetting,
  },
  {
    path: '/users/:id',
    name: 'user',
    component: User,
  },
  {
    path: '/tweets',
    name: 'tweets',
    component: Tweets,
  },
  {
    path: '/admin/signin',
    name: 'admin-signin',
    component: AdminSignin,
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: AdminTweets,
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
]

const router = new VueRouter({
  routes,
})

export default router
