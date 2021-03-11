<template>
  <div class="wrapper">
    <SideBar class="side-bar" />
    <div class="center-column">
      <!-- header -->
      <header>
        <button
          @click="$router.push({ name: 'user', params: { id: user.id } })"
        >
          <img class="header-back-icon" src="./../assets/icon_back.svg" />
        </button>
        <div class="header-user">
          <div class="header-user-name">{{ user.name }}</div>
          <div class="header-user-tweets-count" v-show="!isLoading">
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
        <FollowCard
          v-for="follow in followShipData"
          :key="follow.id"
          class="follow-card"
          :initial-follow="follow"
        />
      </div>
    </div>
    <Recommendation class="recommendation-list" />
  </div>
</template>

<script>
import SideBar from './../components/SideBar'
import Recommendation from './../components/Recommendation'
import FollowCard from './../components/FollowCard'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  name: 'UserFollowShip',
  components: {
    SideBar,
    Recommendation,
    FollowCard
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
      isLoading: true,
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
        this.isLoading = false
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
    redirectTab(tab) {
      if (this.tab === tab) {
        return
      } else {
        this.tab = tab
      }

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
      this.fetchFollowData(this.user.id, this.tab)
    }
  },
  created() {
    const { id: userId } = this.$route.params
    const tab = this.$route.name

    if (tab === 'user-followings') {
      this.tab = 'followings'
    } else if (tab === 'user-followers') {
      this.tab = 'followers'
    }

    this.fetchUser(userId)
    this.fetchFollowData(userId, this.tab)

  },
  watch: {
    $route(to, from) {
      let targetTab = ''
      if (to.name === 'user-followings') {
        targetTab = 'followings'
      } else if (to.name === 'user-followers') {
        targetTab = 'followers'
      }

      if (this.tab !== targetTab) {
        this.tab = targetTab
        this.fetchFollowData(to.params.id, this.tab)
      }

      if (to.params.id !== from.params.id) {
        this.fetchUser(to.params.id)
        this.fetchFollowData(to.params.id, this.tab)
      }
    }
  }
}
</script>

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

/* ==========recommendation-list============= */

.recommendation-list {
  position: fixed;
  top: 15px;
  left: 1008px;
  grid-column: 3 / 4;
  grid-row: 1 / 2;
}
</style>