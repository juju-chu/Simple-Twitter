import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import UserSignIn from '../views/UserSignIn.vue'
import UserSignUp from '../views/UserSignUp.vue'
import Tweets from '../views/Tweets.vue'
import TweetReplies from './../views/TweetReplies.vue'
import PublicMessage from './../views/PublicMessage.vue'
import User from '../views/User.vue'
import UserSetting from '../views/UserSetting.vue'
import UserFollowShip from '../views/UserFollowShip.vue'
import AdminSignin from '../views/AdminSignin.vue'
import AdminTweets from './../views/AdminTweets.vue'
import AdminUsers from '../views/AdminUsers.vue'
import store from './../store'

Vue.use(VueRouter)

const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && !currentUser.isAdmin) {
    next('/404')
    return
  }
  next()
}

const authorizeIsUser = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.isAdmin) {
    next('/404')
    return
  }
  next()
}

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
    beforeEnter: authorizeIsUser,
  },
  {
    path: '/users/:id',
    name: 'user',
    component: User,
    beforeEnter: authorizeIsUser,
  },
  {
    path: '/users/:id/replied_tweets',
    name: 'user-replied-tweets',
    component: User,
    beforeEnter: authorizeIsUser,
  },
  {
    path: '/users/:id/likes',
    name: 'user-likes',
    component: User,
    beforeEnter: authorizeIsUser,
  },
  {
    path: '/users/:id/followers',
    name: 'user-followers',
    component: UserFollowShip,
    beforeEnter: authorizeIsUser,
  },
  {
    path: '/users/:id/followings',
    name: 'user-followings',
    component: UserFollowShip,
    beforeEnter: authorizeIsUser,
  },
  {
    path: '/tweets',
    name: 'tweets',
    component: Tweets,
    beforeEnter: authorizeIsUser,
  },
  {
    path: '/tweets/:id',
    name: 'tweets-replies',
    component: TweetReplies,
    beforeEnter: authorizeIsUser,
  },
  {
    path: '/public-messages',
    name: 'public-messages',
    component: PublicMessage,
    beforeEnter: authorizeIsUser,
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
    beforeEnter: authorizeIsAdmin,
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: AdminUsers,
    beforeEnter: authorizeIsAdmin,
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

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  const tokenInStore = store.state.token
  const pathsWithoutAuthentication = ['signup', 'signin', 'admin-signin']
  let isAuthenticated = store.state.isAuthenticated
  let isAdmin = store.state.currentUser.isAdmin
  //const { id, tab } = to.params

  if (token && token !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }

  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    if (!isAdmin) {
      next('/tweets')
    } else if (isAdmin) {
      next('/admin/tweets')
    }

    return
  }

  next()
})

export default router
