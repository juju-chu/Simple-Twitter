<template>
  <div class="wrapper">
    <SideBar class="side-bar" />

    <div class="header-users">上線使用者 ({{ onlineCount }})</div>
    <div class="onlineUser-wrapper">
      <OnlineUser
        class="onlineUser"
        v-for="user in users"
        :key="user.id"
        :user="user"
      />
    </div>

    <div class="header-room">公開聊天室</div>
    <div class="chat-room-wrapper">
      <ChatRoom
        class="chat-room"
        v-for="chatData in chatDatas"
        :key="chatData.id"
        :chatData="chatData"
      />
    </div>
    <input
      class="input-text"
      MessageType="text"
      placeholder="輸入訊息..."
      v-model="message"
    />
    <button class="input-icon">
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
const dummyUsers = [
  {
    id: 2,
    name: "Apple",
    account: "apple",
    avatar: "https://loremflickr.com/320/240/dog/?lock=42.87898512441826",
  },
  {
    id: 3,
    name: "Jane",
    account: "user2",
    avatar: "https://loremflickr.com/320/240/dog/?lock=7.643201110272924",
  },
  {
    id: 4,
    name: "Wade",
    account: "user3",
    avatar: "https://loremflickr.com/320/240/dog/?lock=2.7842269503866035",
  },
  {
    id: 5,
    name: "Esther",
    account: "user4",
    avatar: "https://loremflickr.com/320/240/dog/?lock=35.34804975546177",
  },
  {
    id: 6,
    name: "Ralph",
    account: "user5",
    avatar: "https://loremflickr.com/320/240/dog/?lock=35.00129934402724",
  }
]
const dummyChatDatas = [
  {
    id: 1,
    MessageType: "broadcast-online",
    name: "Apple",
  },
  {
    id: 2,
    MessageType: "broadcast-online",
    name: "Jane",
  },
  {
    id: 3,
    userId: 2,
    MessageType: "message-other",
    name: "Apple",
    avatar: "https://loremflickr.com/320/240/dog/?lock=42.87898512441826",
    message: "哈囉",
    time: "2021-03-12T15:34:40.000Z",
  },
  {
    id: 4,
    userId: 1,
    MessageType: "message-self",
    message: "你好",
    time: "2021-03-12T15:36:40.000Z",
  },
  {
    id: 5,
    MessageType: "broadcast-offline",
    name: "Jane",
  },
  {
    id: 6,
    MessageType: "broadcast-online",
    name: "Wade",
  },
  {
    id: 7,
    userId: 4,
    MessageType: "message-other",
    name: "Wade",
    avatar: "https://loremflickr.com/320/240/dog/?lock=2.7842269503866035",
    message: "今天天氣如何？",
    time: "2021-03-12T15:41:40.000Z",
  },
  {
    id: 8,
    MessageType: "broadcast-online",
    name: "Jane",
  },
  {
    id: 9,
    MessageType: "broadcast-online",
    name: "Esther",
  },
  {
    id: 10,
    MessageType: "broadcast-online",
    name: "Ralph",
  },
  {
    id: 11,
    userId: 3,
    MessageType: "message-other",
    name: "Jane",
    avatar: "https://loremflickr.com/320/240/dog/?lock=7.643201110272924",
    message: "剛斷線",
    time: "2021-03-12T15:50:40.000Z",
  },
]
import SideBar from './../components/SideBar'
import OnlineUser from './../components/OnlineUser'
import ChatRoom from './../components/ChatRoom'

export default {
  name: 'PublicMessage',
  components: {
    SideBar,
    OnlineUser,
    ChatRoom,
  },
  data() {
    return {
      onlineCount: -1,
      users: [],
      chatDatas: '',
      message: '',
    }
  },
  created() {
    this.fetchData()
    this.fetchUsers()
    this.fetchChatDatas()
  },
  methods: {
    fetchData() {
      // TODO:
      this.onlineCount = dummyUsers.length
    },
    fetchUsers() {
      // TODO:
      this.users = dummyUsers
    },
    fetchChatDatas() {
      // TODO:
      this.chatDatas = dummyChatDatas
    },
  }
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

.onlineUser-wrapper {
  grid-column: 2 / 3;
  grid-row: 2 / 4;
  width: 378px;
  border-right: 1px solid #e6ecf0;
}

.onlineUser {
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
  flex-direction: column;
  justify-content: flex-end;
  margin: 20px;
  border-bottom: 1px solid #e6ecf0;
}

.input-text {
  grid-column: 3 / 4;
  grid-row: 3 / 4;
  margin: 15px 0 0 15px;
  padding-left: 15px;
  height: 50px;
  border-radius: 50px;
  background: #e6ecf0;
}

.input-icon {
  grid-column: 4 / 5;
  grid-row: 3 / 4;
  margin: 25px 0 0 10px;
  width: 24px;
  height: 24px;
}

.input-icon path {
  fill: #ff6600;
}
</style>