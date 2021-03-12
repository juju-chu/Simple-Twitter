<template>
  <div class="wrapper">
    <SideBar class="side-bar" @after-post-tweet="afterPostTweet" />

    <div class="center-column">
      <div class="header">
        <div class="header-title">上線使用者 ({{ onlineCount }})</div>
      </div>

      <div class="onlineUser-wrapper">
        <OnlineUser
          class="onlineUser"
          v-for="user in users"
          :key="user.id"
          :user="user"
        />
      </div>
    </div>

    <div class="right-column">
      <div class="header">
        <div class="header-title">公開聊天室</div>
      </div>
      <!-- <PublicRoom class="publicRoom" /> -->
    </div>
  </div>
</template>

<script>
const dummyUsers = [
  {
    id: 1,
    name: "Apple",
    account: "apple",
    avatar: "https://loremflickr.com/320/240/dog/?lock=42.87898512441826",
  },
  {
    id: 2,
    name: "Jane",
    account: "user2",
    avatar: "https://loremflickr.com/320/240/dog/?lock=7.643201110272924",
  },
  {
    id: 3,
    name: "Wade",
    account: "user3",
    avatar: "https://loremflickr.com/320/240/dog/?lock=2.7842269503866035",
  },
  {
    id: 4,
    name: "Esther",
    account: "user4",
    avatar: "https://loremflickr.com/320/240/dog/?lock=35.34804975546177",
  },
  {
    id: 5,
    name: "Ralph",
    account: "user5",
    avatar: "https://loremflickr.com/320/240/dog/?lock=35.00129934402724",
  }
]
import SideBar from './../components/SideBar'
import OnlineUser from './../components/OnlineUser'
// import PublicRoom from './../components/PublicRoom'

export default {
  name: 'PublicMessage',
  components: {
    SideBar,
    OnlineUser,
    // PublicRoom,
  },
  data() {
    return {
      onlineCount: -1,
      users: [],
    }
  },
  created() {
    this.fetchData()
    this.fetchUsers()
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
  }
}
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 378px 378px 1fr;
  grid-template-rows: 100vh;
}

.side-bar {
  position: fixed;
  z-index: 2;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  padding-left: 103px;
  width: 378px;
  height: 100vh;
  border-right: 1px solid #e6ecf0;
}

.center-column {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  border-right: 1px solid #e6ecf0;
}

.header {
  position: fixed;
  z-index: 1;
  height: 55px;
  background: #fff;
}

.header-title {
  margin-left: 15px;
  line-height: 55px;

  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #1c1c1c;
}

.onlineUser-wrapper {
  margin-top: 55px;
  border-top: 1px solid #e6ecf0;
}

.onlineUser {
  width: 378px;
  border-bottom: 1px solid #e6ecf0;
}

.right-column {
  grid-column: 3 / 4;
  grid-row: 1 / 2;
}

.publicRoom {
  margin-top: 55px;
  border-top: 1px solid #e6ecf0;
}
</style>