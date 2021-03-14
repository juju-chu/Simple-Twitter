<template>
  <div class="wrapper">
    <SideBar class="side-bar" />

    <div class="header-users">
      訊息
      <svg
        class="header-icon"
        width="20"
        height="19"
        viewBox="0 0 20 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.25 0.0180054H2.75C1.233 0.0180054 0 1.25201 0 2.77001V15.265C0 16.783 1.233 18.018 2.75 18.018H17.25C18.767 18.018 20 16.783 20 15.265V2.77001C20 1.25201 18.767 0.0180054 17.25 0.0180054ZM2.75 1.51801H17.25C17.94 1.51801 18.5 2.07801 18.5 2.76801V3.48201L10.45 8.84901C10.177 9.02901 9.824 9.03101 9.55 8.84701L1.5 3.48201V2.76801C1.5 2.07801 2.06 1.51801 2.75 1.51801ZM17.25 16.516H2.75C2.06 16.516 1.5 15.956 1.5 15.266V5.24001L8.74 10.07C9.123 10.326 9.562 10.454 10 10.454C10.44 10.454 10.877 10.326 11.26 10.071L18.5 5.24101V15.263C18.5 15.953 17.94 16.513 17.25 16.513V16.516Z"
          fill="black"
        />
      </svg>
    </div>
    <div class="private-users-wrapper">
      <PrivateUsers
        class="private-users"
        v-for="user in privateUsers"
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
const dummyData = [
  {
    id: 1,
    userId: 2,
    name: 'Vicki Windler',
    account: 'user2',
    avatar: 'https://loremflickr.com/320/240/dog/?lock=7.643201110272924',
    lastMessage:
      'Deleniti qui mollitia ratione qui. Hic ad consequatur perspiciatis odio inventore rem. Dicta similique ducimus. Aut quaerat et ab.',
    createdAt: '2021-03-14T11:36:40.000Z',
  },
  {
    id: 2,
    userId: 3,
    name: 'Phillip Nicolas',
    account: 'user3',
    avatar: 'https://loremflickr.com/320/240/dog/?lock=2.7842269503866035',
    lastMessage:
      'Sed iure et molestiae. Sed aliquid et rerum. Quia et nulla. Distinctio ex rerum incidunt aut ullam provident. Debitis laboriosam accusantium est eaque doloribus',
    createdAt: '2021-03-14T03:36:40.000Z',
  },
  {
    id: 3,
    userId: 4,
    name: 'Tommie Ward',
    account: 'user4',
    avatar: 'https://loremflickr.com/320/240/dog/?lock=35.34804975546177',
    lastMessage: 'Rerum omnis rerum laborum repudiandae qui amet.',
    createdAt: '2021-03-12T15:40:40.000Z',
  },
  {
    id: 4,
    userId: 5,
    name: 'Erik Pouros',
    account: 'user5',
    avatar: 'https://loremflickr.com/320/240/dog/?lock=35.00129934402724',
    lastMessage:
      'Quod accusamus eius consequatur velit dicta porro praesentium. Quasi beatae ex sequi ea optio omnis. Sapiente facere eos iusto quo itaque reiciendis ut est.',
    createdAt: '2021-02-10T10:36:40.000Z',
  },
]

import SideBar from './../components/SideBar'
import PrivateUsers from './../components/PrivateUsers'
import ChatRoom from './../components/ChatRoom'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  name: 'PublicMessage',
  components: {
    SideBar,
    PrivateUsers,
    ChatRoom,
  },
  data() {
    return {
      privateUsers: [],
      chatDatas: [],
      message: '',
    }
  },
  created() {
    this.fetchPrivateUsers()
    this.fetchChatDatas()
  },
  methods: {
    fetchPrivateUsers() {
      // TODO:
      this.privateUsers = dummyData.map((user) => {
        if (user.lastMessage.length > 35) {
          user.lastMessage = user.lastMessage.slice(0, 35) + ' ...'
        }

        const formNow = moment(user.createdAt).fromNow()
        let time = ''
        if (formNow.includes('hours')) {
          time = formNow
        } else {
          let timeArray = user.createdAt.split('T')
          timeArray = timeArray[0].split('-')
          time = `${timeArray[1]}月${timeArray[1]}日`
        }

        return {
          id: user.id,
          userId: user.userId,
          name: user.name,
          account: user.account,
          avatar: user.avatar,
          lastMessage: user.lastMessage,
          createdAt: time,
        }
      })
    },
    fetchChatDatas() {
      // TODO:
      // this.chatDatas = dummyChatDatas
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
  grid-template-columns: 378px 450px 1fr 50px;
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
  position: relative;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

.header-icon {
  position: absolute;
  top: 14px;
  right: 15px;
}

.private-users-wrapper {
  grid-column: 2 / 3;
  grid-row: 2 / 4;
  border-right: 1px solid #e6ecf0;
}

.private-users {
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
