<template>
  <div class="wrapper">
    <SideBar class="side-bar" />
    <div class="center-column">
      <!-- header -->
      <header>
        <button @click="$router.back()">
          <img class="header-back-icon" src="./../assets/icon_back.svg" />
        </button>
        <div class="header-user">
          <div class="header-user-name">{{ user.name }}</div>
          <div class="header-user-tweets-count">
            {{ user.userTweetsCount }} 推文
          </div>
        </div>
      </header>

      <!-- tab -->
      <div class="tabs">
        <button
          @click.stop.prevent="redirectTab('followers')"
          class="followers-btn"
          :class="{ active: tab === 'followers' }"
        >
          跟隨者
        </button>
        <button
          @click.stop.prevent="redirectTab('followings')"
          class="followings-btn"
          :class="{ active: tab === 'followings' }"
        >
          正在跟隨
        </button>
      </div>

      <!-- followship-list -->
      <div class="followship-list">
        <div
          v-for="follow in followShipData"
          :key="follow.id"
          class="follow-card"
        >
          <router-link :to="{ name: 'user', params: { id: follow.id } }">
            <img class="user-avatar" :src="follow.avatar" alt="" />
          </router-link>
          <div class="card-content">
            <div class="profile-action-wrapper">
              <div class="profile">
                <router-link :to="{ name: 'user', params: { id: follow.id } }">
                  <div class="user-name">{{ follow.name }}</div>
                </router-link>
                <router-link :to="{ name: 'user', params: { id: follow.id } }">
                  <div class="user-account">@{{ follow.account }}</div>
                </router-link>
              </div>
              <div class="action">
                <button
                  v-if="follow.isFollowed"
                  @click.stop.prevent="removeFollowing(follow.id)"
                  class="followed-btn"
                >
                  正在跟隨
                </button>
                <button
                  @click.stop.prevent="addFollowing(follow.id)"
                  v-else
                  class="to-follow-btn"
                >
                  跟隨
                </button>
              </div>
            </div>
            <div class="introduction">
              {{ follow.introduction }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Recommendation class="recommendation-list" />
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 378px 600px 462px;
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

header {
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  width: 600px;
  height: 55px;
  background: #fff;
  border-right: 1px solid #e6ecf0;
}

.header-user {
  margin-left: 40px;
  margin-bottom: 7px;
  display: flex;
  flex-direction: column;
  height: 42px;
}

.header-back-icon {
  margin-left: 15px;
  width: 24px;
  height: 24px;
}

.header-user-name {
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 900;
  font-size: 19px;
  color: #1c1c1c;
}

.header-user-tweets-count {
  font-weight: 500;
  font-size: 13px;
  color: #657786;
}

div.tabs {
  position: fixed;
  top: 58px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 260px;
  height: 54px;
}

.followers-btn,
.followings-btn {
  width: 130px;
  height: 54px;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  color: #657786;
}

.active {
  color: #ff6600;
  border-bottom: 2px solid #ff6600;
}

.center-column {
  position: relative;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  border-right: 1px solid #e6ecf0;
}

/* ==========followship list============= */

.followship-list {
  position: fixed;
  top: 112px;
  width: 600px;
  height: 100vh;
  border-top: 1px solid #e6ecf0;
}

.follow-card {
  display: flex;
  width: 600px;
  min-height: 50px;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e6ecf0;
}

.user-avatar {
  grid-column: 1 / 2;
  margin-top: 3px;
  margin-left: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
}

.profile-action-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 525px;
  height: 35px;
  margin-left: 10px;
}

.user-name {
  font-weight: bold;
}

.user-account {
  color: #657786;
  font-weight: 500;
}

button.followed-btn {
  width: 92px;
  height: 30px;
  margin-right: 15px;
  padding: 0;
  background: #ff6600;
  font-size: 15px;
  color: white;
  border-radius: 100px;
  border: none;
  outline: none;
}

button.to-follow-btn {
  width: 62px;
  height: 30px;
  margin-right: 15px;
  padding: 0;
  font-size: 15px;
  color: #ff6600;
  border-radius: 100px;
  border: 1px solid #ff6600;
  outline: none;
}

.introduction {
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 15px;
  font-weight: 400;
  font-size: 15px;
}

/* ==========recommendation-list============= */

.recommendation-list {
  position: fixed;
  top: 15px;
  left: 1008px;
  grid-column: 3 / 4;
  grid-row: 1 / 2;
}
</style>

<script>
import SideBar from '../components/SideBar'
import Recommendation from '../components/Recommendation'
import usersAPI from '../apis/users'
import { Toast } from './../utils/helpers'

export default {
  name: 'UserFollowShip',
  components: {
    SideBar,
    Recommendation,
  },
  data() {
    return {
      user: {
        id: -1,
        account: '',
        name: '',
        avatar: '',
        cover: '',
        introduction: '',
        userTweetsCount: -1,
        followingsCount: -1,
        followersCount: -1,
      },
      followShipData: [],
      tab: 'followers',
    }
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await usersAPI.get({ userId })
        const {
          id,
          account,
          name,
          avatar,
          cover,
          introduction,
          userTweetsCount,
          FollowingsCount: followingsCount,
          FollowersCount: followersCount,
        } = data
        this.user = {
          id,
          account,
          name,
          avatar,
          cover,
          introduction,
          userTweetsCount,
          followingsCount,
          followersCount,
        }
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試',
        })
      }
    },
    async fetchFollowData(userId, tab) {
      try {
        let data = {}
        if (tab === 'followings') {
          data = await usersAPI.getFollowings({ userId })
        } else if (tab === 'followers') {
          data = await usersAPI.getFollowers({ userId })
        }

        this.followShipData = [...data.data]
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得follow ship資訊，請稍後再試',
        })
      }
    },
    setTab(tab) {
      if (tab === 'followings') {
        this.tab = 'followings'
      } else if (tab === 'followers') {
        this.tab = 'followers'
      } else {
        this.$router.push('/*')
      }
    },
    redirectTab(tab) {
      if (tab === 'followings') {
        this.$router.push({
          name: 'user-followings',
          params: { id: this.user.id, tab },
        })
      } else if (tab === 'followers') {
        this.$router.push({
          name: 'user-followers',
          params: { id: this.user.id, tab },
        })
      }
      this.setTab(tab)
    },
    addFollowing(userId) {
      //TODO: 透過API發送請求新增follow
      this.followShipData = this.followShipData.map((follow) => {
        if (follow.id === userId) {
          follow.isFollowed = true
        }
        return follow
      })
    },
    removeFollowing(userId) {
      //TODO: 透過API發送請求移除follow
      this.followShipData = this.followShipData.map((follow) => {
        if (follow.id === userId) {
          follow.isFollowed = false
        }
        return follow
      })
    },
  },
  created() {
    const { id: userId, tab } = this.$route.params
    this.fetchUser(userId)
    this.setTab(tab)
    this.fetchFollowData(userId, tab)
  },
  watch: {
    tab(newValue) {
      if (this.user.id !== -1) {
        this.fetchFollowData(this.user.id, newValue)
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId, tab } = to.params
    this.setTab(tab)

    //fetch user and follow data only when next router user id is different with current user id
    if (Number(userId) !== this.user.id) {
      this.fetchUser(userId)
      this.fetchFollowData(userId, tab)
    }

    next()
  },
}
</script>
