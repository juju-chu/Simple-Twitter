import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/application.css'
import store from './store'
// For vue - socket.io 
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

const token = localStorage.getItem('token')

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('https://mighty-spire-48914.herokuapp.com', {
    reconnectionDelayMax: 10000,
    auth: {
      token: token
    },
    query: {
      "my-key": "my-value"
    }
  }),
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
})
)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
