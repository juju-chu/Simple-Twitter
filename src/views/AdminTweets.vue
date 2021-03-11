<template>
  <div class="wrapper">
    <AdminSidebar class="admin-side-bar" />

    <div class="center-column">
      <div class="header">
        <div class="header-title">推文清單</div>
      </div>
      <div class="tweet-list">
        <AminTweetsList
          v-for="tweet in tweets"
          :key="tweet.id"
          :initial-tweet="tweet"
          class="tweet-list-item"
          @after-delete-tweet="afterDeleteTweet"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from './../components/AdminSidebar'
import AminTweetsList from './../components/AdminTweetsList'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'

export default {
  name: 'AdminTweets',
  components: {
    AdminSidebar,
    AminTweetsList,
  },
  data() {
    return {
      tweets: [],
    }
  },
  created() {
    this.fetchTweets()
  },
  methods: {
    async fetchTweets() {
      try {
        const { data } = await adminAPI.tweets.get()
        this.tweets = data.map((tweet) => {
          let { id, description, createdAt, User } = tweet
          const { name, account, avatar } = User
          if (description.length >= 50) {
            description = description + ' ...'
          }
          return {
            id,
            description,
            createdAt,
            name,
            account,
            avatar,
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
    afterDeleteTweet() {
      this.fetchTweets()
    },
  },
}
</script>

<style scoped>
.wrapper {
  display: grid;
  width: 100vw;
  grid-template-columns: 378px auto;
  grid-template-rows: 100vh;
}

.admin-side-bar {
  position: fixed;
  z-index: 1;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  padding-left: 103px;
  width: 378px;
  height: 100vh;
}

.center-column {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  border-left: 1px solid #e6ecf0;
}

.header {
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: 55px;
  background: #fff;
  border-bottom: 1px solid #e6ecf0;
}

.header-title {
  margin-left: 15px;
  line-height: 55px;

  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #1c1c1c;
}

.tweet-list {
  margin-top: 70px;
}
</style>
