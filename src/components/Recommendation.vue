<template>
  <div class="recommendation-wrapper">
    <header>
      <p>跟隨誰</p>
    </header>
    <div class="follow-list">
      <div v-for="user in users" :key="user.id" class="follow-card">
        <img class="user-avatar" :src="user.avatar" alt="" />
        <div class="profile">
          <div class="user-name">{{ user.name }}</div>
          <div class="user-account">@{{ user.account }}</div>
        </div>
        <div class="action">
          <button
            v-if="user.isFollowed"
            class="followed-btn btn btn-lg btn-primary btn-block"
          >
            正在跟隨
          </button>
          <button v-else class="to-follow-btn btn btn-lg btn-primary btn-block">
            跟隨
          </button>
        </div>
      </div>
    </div>
    <footer>
      <p @click.prevent.stop="showMoreUser">顯示更多</p>
    </footer>
  </div>
</template>

<style scoped>
.recommendation-wrapper {
  width: 350px;
  height: 517px;
  border-radius: 14px;
  background: #f5f8fa;
}

header p {
  line-height: 45px;
  margin-left: 15px;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
}

header {
  height: 45px;
  border-bottom: 1px solid #e6ecf0;
}

.follow-card {
  display: grid;
  grid-template-columns: 65px 1fr 1fr;
  height: 71px;
  border-bottom: 1px solid #e6ecf0;
}

.user-avatar {
  grid-column: 1 / 2;
  margin-top: 10px;
  margin-left: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
}

.profile {
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 150px;
  margin-left: 10px;
}

.profile div {
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
}

.user-account {
  color: #657786;
}

.action {
  grid-column: 3 / 4;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: auto;
}

.followed-btn {
  width: 92px;
  height: 30px;
  margin-right: 15px;
  padding: 0;
  background: #ff6600;
  font-size: 15px;
  color: white;
  line-height: 30px;
  border-radius: 100px;
  border: none;
}

.to-follow-btn {
  width: 62px;
  height: 30px;
  margin-right: 15px;
  padding: 0;
  background: #f5f8fa;
  font-size: 15px;
  color: #ff6600;
  line-height: 30px;
  border-radius: 100px;
  border: 1px solid #ff6600;
}

footer {
  height: 45px;
}

footer p {
  margin-top: 11px;
  margin-left: 15px;
  font-size: 15px;
  font-weight: bolder;
  color: #ff6600;
  cursor: pointer;
}
</style>

<script>
//Dummy users, to be removed
const dummyUsers = [
  {
    id: 1,
    name: 'Robert Stroman',
    account: 'user1',
    avatar: 'https://loremflickr.com/320/240/dog/?lock=19.49557651044964',
    isFollowed: true

  },
  {
    id: 2,
    name: 'Robert Stroman',
    account: 'user1',
    avatar: 'https://loremflickr.com/320/240/dog/?lock=19.49557651044964',
    isFollowed: false
  },
  {
    id: 3,
    name: 'Ashley Ondricka',
    account: 'user6',
    avatar: 'https://loremflickr.com/320/240/dog/?lock=26.314776042720133',
    isFollowed: false
  },
  {
    id: 4,
    name: 'Tracy Towne',
    account: 'user5',
    avatar: 'https://loremflickr.com/320/240/dog/?lock=37.8808195638617',
    isFollowed: false
  },
  {
    id: 5,
    name: 'Ashley Ondricka',
    account: 'user6',
    avatar: 'https://loremflickr.com/320/240/dog/?lock=26.314776042720133',
    isFollowed: false
  },
  {
    id: 6,
    name: 'Priscilla Stehr',
    account: 'user7',
    avatar: 'https://loremflickr.com/320/240/dog/?lock=33.233134434246146',
    isFollowed: false
  },

]

export default {
  name: 'Recommendation',
  data () {
    return {
      users: []
    }
  },
  methods: {
    fetchUsers () {
      //Todo: 用API取得random users資料，先使用dummy users
      this.users = [...dummyUsers]
    },
    showMoreUser () {
      console.log('show more user')
    }
  },
  created () {
    this.fetchUsers()
  }
}
</script>