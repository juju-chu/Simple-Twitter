<template>
  <div class="container">
    <SideBar class="side-bar" />

    <div class="center-column">
      <div class="header">
        <button @click="$router.back()">
          <img class="header-back-icon" src="./../assets/icon_back.svg" />
        </button>
        <div class="header-user">
          <div class="header-user-name">{{ user.name }}</div>
          <div class="header-user-tweets-count">
            {{ user.userTweetsCount }} 推文
          </div>
        </div>
      </div>

      <UserCard class="User-card" :initial-user="user" />

      <div class="tab">
        <button
          class="tab-item"
          :class="{ active: tab === 'tweets' }"
          @click.stop.prevent="redirectTab('tweets')"
        >
          <span class="tab-item-text">推文</span>
        </button>
        <div class="tab-item">
          <span class="tab-item-text">推文與回覆</span>
        </div>
        <button
          class="tab-item"
          :class="{ active: tab === 'likes' }"
          @click.stop.prevent="redirectTab('likes')"
        >
          <span class="tab-item-text">喜歡的內容</span>
        </button>
      </div>

      <!-- Tweet list -->
      <TweetsList
        class="tweet-list"
        v-for="tweet in tweets"
        :key="tweet.id"
        :initial-tweet="tweet"
      />
    </div>

    <!-- Recommendation -->
    <Recommendation class="recommendation-list" />
  </div>
</template>

<script>
import SideBar from './../components/SideBar'
import UserCard from './../components/UserCard'
import TweetsList from './../components/TweetsList'
import usersAPI from './../apis/users'
import Recommendation from '../components/Recommendation'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'

export default {
  name: 'User',
  components: {
    SideBar,
    UserCard,
    TweetsList,
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
      isSelf: false,
      tweets: [],
      tab: 'tweets',
    }
  },
  computed: {
    ...mapState(['currentUser']),
  },
  created() {
    const { id: userId } = this.$route.params
    this.fetchUser(userId)
  },
  watch: {
    $route(to, from) {
      if (to.name !== from.name || to.params.id !== from.params.id) {
        this.fetchUser(to.params.id)
      }
    },
  },
  methods: {
    checkIsSelf() {
      if (this.user.id === this.currentUser.id) {
        this.isSelf = true
      }
    },
    async fetchUser(userId) {
      if (this.$route.name.includes('likes')) {
        this.tab = 'likes'
      } else {
        this.tab = 'tweets'
      }
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
        this.setTab(userId, this.tab)
        this.checkIsSelf()
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試',
        })
      }
    },
    setTab(userId, tab) {
      if (tab === 'likes') {
        this.fetchLikes(userId)
      } else {
        this.fetchTweets(userId)
      }
    },
    async fetchTweets(userId) {
      try {
        const { data } = await usersAPI.getUsersTweets({ userId })
        this.tweets = data.map((tweet) => {
          return {
            id: tweet.id,
            userId: tweet.User.id,
            account: tweet.User.account,
            name: tweet.User.name,
            avatar: tweet.User.avatar,
            description: tweet.description,
            createdAt: tweet.createdAt,
            likeCount: tweet.likeCount,
            replyCount: tweet.replyCount,
            isLiked: tweet.isLiked,
          }
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得推文，請稍後再試',
        })
      }
    },
    async fetchLikes(userId) {
      try {
        const { data } = await usersAPI.getUsersLikes({ userId })
        this.tweets = data.map((tweet) => ({
          id: tweet.id,
          userId: tweet.User.id,
          account: tweet.User.account,
          name: tweet.User.name,
          avatar: tweet.User.avatar,
          description: tweet.description,
          createdAt: tweet.createdAt,
          likeCount: tweet.likeCount,
          replyCount: tweet.replyCount,
          isLiked: tweet.isLiked,
        }))
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得推文，請稍後再試',
        })
      }
    },
    redirectTab(tab) {
      switch (tab) {
        case 'tweets':
          this.$router.push({
            name: 'user',
            params: { id: this.user.id },
          })
          break
        case 'likes':
          this.$router.push({
            name: 'user-likes',
            params: { id: this.user.id },
          })
          break
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params
    this.fetchUser(userId)
    next()
  },
}
</script>

<style scoped>
.container {
  display: grid;
  margin: 0;
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
.center-column {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  border-right: 1px solid #e6ecf0;
}
.header {
  position: fixed;
  z-index: 1;
  display: flex;
  width: 600px;
  height: 55px;
  background: #fff;
  border-right: 1px solid #e6ecf0;
}
.header-back-icon {
  margin-left: 15px;
  width: 24px;
  height: 24px;
}
.header-user {
  margin-left: 43px;
  margin-bottom: 7px;
  display: flex;
  flex-direction: column;
  height: 42px;
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
.User-card {
  margin-top: 55px;
  height: auto;
}
.tab {
  display: flex;
  width: 390px;
  height: 54px;
}
.tab-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 54px;
}
.tab-item-text {
  font-weight: bold;
  font-size: 15px;
  color: #657786;
}
.active {
  border-bottom: 2px solid #ff6600;
}
.active span {
  color: #ff6600;
}
.tweet-list {
  border-top: 1px solid #e6ecf0;
}
.recommendation-list {
  position: fixed;
  top: 15px;
  left: 1008px;
  grid-column: 3 / 4;
  grid-row: 1 / 2;
}
</style>
