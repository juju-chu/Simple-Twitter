<template>
  <div class="wrapper">
    <SideBar class="side-bar" />

    <div class="header-users">上線使用者 ({{ onlineCount }})</div>
    <div class="online-users-wrapper">
      <OnlineUsers
        class="online-users"
        v-for="user in onlineUsers"
        :key="user.id"
        :user="user"
      />
    </div>

    <div class="header-room">公開聊天室</div>
    <div class="chat-room-wrapper">
      <ChatRoom
        class="chat-room"
        v-for="chatData in chatDatas.slice().reverse()"
        :key="chatData.id"
        :chatData="chatData"
      />
      <ChatRecordRoom
        class="chat-room"
        v-for="chatData in chatRecordDatas.slice().reverse()"
        :key="chatData.id"
        :chatData="chatData"
      />
    </div>
    <input
      @keypress.enter="send"
      class="input-text"
      MessageType="text"
      placeholder="輸入訊息..."
      v-model="message"
    />
    <button @click.stop.prevent="send" class="input-icon">
      <svg
        class="svg-inline--fa fa-paper-plane fa-w-16"
        aria-hidden="true"
        focusable="false"
        data-prefix="far"
        data-icon="paper-plane"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        data-fa-i2svg=""
      >
        <path
          fill="currentColor"
          d="M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1 111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6 8.2 0 16.3-2.1 23.6-6.2 12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9zM192 464v-64.6l36.6 15.1L192 464zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6 48 288 464 48l-59.4 387.3z"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script>
import SideBar from './../components/SideBar'
import OnlineUsers from './../components/OnlineUsers'
import ChatRecordRoom from './../components/ChatRecordRoom'
import ChatRoom from './../components/ChatRoom'
import { mapState } from 'vuex'
import uuidv4 from 'uuid'

// For vue - socket.io 
import Vue from 'vue'
import store from './../store'
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

export default {
  name: 'PublicMessage',
  components: {
    SideBar,
    OnlineUsers,
    ChatRoom,
    ChatRecordRoom,
  },
  data() {
    return {
      onlineCount: 0,
      onlineUsers: [],
      chatDatas: [],
      chatRecordDatas: [],
      message: '',
    }
  },
  created() {
    this.disconnectSever()
    this.connectSever()
  },
  methods: {
    send() {
      this.$socket.emit('send', {
        id: this.currentUser.id,
        msg: this.message,
        name: this.currentUser.name,
        time: new Date().toString(),
      })
      this.text = ''
    },
    disconnectSever() {
      this.$socket.disconnect()
    },
    connectSever() {
      this.$socket.connect()
    },
  },
  sockets: {
    connect() {
      console.log('socket connected')
    },
    allOnlineUsers(users) {
      // TODO:
      console.log('allOnlineUsers', users)
      this.onlineUsers = users
    },
    online(onlineCount) {
      this.onlineCount = onlineCount
    },
    chatRecord(records) {
      const tempDatas = records.map(record => {
        const hour = +record.createdAt.substring(11, 13) + 8
        const min = +record.createdAt.substring(14, 16)
        const createdTime = `${hour > 23
          ? '上午 ' + (hour - 24)
          : hour > 12
            ? '下午 ' + (hour - 12)
            : '上午 ' + hour
          }:${min < 10 ? '0' + min.toString() : min}`

        return {
          id: record.id,
          userId: record.UserId,
          message: record.message,
          messageType:
            record.UserId === this.currentUser.id ? 'message-self' : 'message-other',
          time: createdTime,
        }
      })

      this.chatRecordDatas.push(...tempDatas)
    },
    onlineUser(user) {
      this.chatDatas.push({
        id: uuidv4(),
        messageType: 'broadcast-online',
        name: user.name,
      })
    },
    offlineUser(user) {
      this.chatDatas.push({
        id: uuidv4(),
        messageType: 'broadcast-offline',
        name: user.name,
      })
    },
    message(data) {
      if (!data.message) {
        return
      }
      const hour = +data.createdAt.substring(11, 13) + 8
      const min = +data.createdAt.substring(14, 16)
      const createdTime = `${hour > 23
        ? '上午 ' + (hour - 24)
        : hour > 12
          ? '下午 ' + (hour - 12)
          : '上午 ' + hour
        }:${min < 10 ? '0' + min.toString() : min}`
      this.chatDatas.push({
        id: uuidv4(),
        userId: data.id,
        message: data.message,
        messageType:
          data.id === this.currentUser.id ? 'message-self' : 'message-other',
        name: data.name,
        avatar: data.avatar,
        time: createdTime,
      })
      if (data.id === this.currentUser.id) {
        this.message = ''
      }
    },
  },
  computed: {
    ...mapState(['currentUser']),
  },
}
</script>

<style scoped>
.wrapper {
  display: grid;
  height: 100vh;
  grid-template-columns: 378px 378px 1fr 50px;
  grid-template-rows: 55px 1fr 80px;
}

.side-bar {
  position: fixed;
  z-index: 2;
  grid-column: 1 / 2;
  grid-row: 1 / 4;
  padding-left: 103px;
  width: 378px;
  height: 100vh;
  border-right: 1px solid #e6ecf0;
}

.header-users,
.header-room {
  padding: 14px 0 0 15px;
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #1c1c1c;
  background: #fff;
  border-right: 1px solid #e6ecf0;
  border-bottom: 1px solid #e6ecf0;
}

.header-users {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

.online-users-wrapper {
  grid-column: 2 / 3;
  grid-row: 2 / 4;
  width: 378px;
  border-right: 1px solid #e6ecf0;
}

.online-users {
  border-bottom: 1px solid #e6ecf0;
}

.header-room {
  grid-column: 3 / 5;
  grid-row: 1 / 2;
}

.chat-room-wrapper {
  grid-column: 3 / 5;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column-reverse;
  margin: 20px;
  border-bottom: 1px solid #e6ecf0;
  overflow: auto;
}

.input-text {
  grid-column: 3 / 4;
  grid-row: 3 / 4;
  margin-left: 15px;
  padding-left: 15px;
  height: 50px;
  border-radius: 50px;
  background: #e6ecf0;
}

.input-icon {
  grid-column: 4 / 5;
  grid-row: 3 / 4;
  margin: 10px 0 0 10px;
  width: 24px;
  height: 24px;
}

.input-icon path {
  fill: #ff6600;
}
</style>
