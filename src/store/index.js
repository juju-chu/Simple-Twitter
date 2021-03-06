import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: '',
      name: '',
      email: '',
      avatar: '',
      isAdmin: false,
    },
    isAuthenticated: false,
    token: '',
  },
  //用commit發動mutations
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser,
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    revokeCurrentUser(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    },
  },
  //用dispatch發動actions
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        const { id, account, name, email, avatar, isAdmin } = data
        commit('setCurrentUser', { id, account, name, email, avatar, isAdmin })

        return true
      } catch (error) {
        console.log('error', error)
        console.error('can not fetch user information')
        commit('revokeCurrentUser')

        return false
      }
    },
  },
  modules: {},
})
