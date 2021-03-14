<template>
  <div class="wrapper">
    <SideBar class="side-bar" @after-post-tweet="afterPostTweet" />

    <div class="center-column">
      <div class="header">
        <div class="header-title">首頁</div>
      </div>
      <PostTweet class="post-tweet" @after-post-tweet="afterPostTweet" />

      <div class="divider"></div>

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
import PostTweet from './../components/PostTweet'
import TweetsList from './../components/TweetsList'
import Recommendation from '../components/Recommendation'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'
//import { mapState } from 'vuex'

// // For vue - socket.io 
// import Vue from 'vue'
// import store from './../store'
// import VueSocketIO from 'vue-socket.io'
// import SocketIO from 'socket.io-client'

// const token = localStorage.getItem('token')

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO('https://mighty-spire-48914.herokuapp.com', {
//     reconnectionDelayMax: 10000,
//     auth: {
//       token: token
//     },
//     query: {
//       "my-key": "my-value"
//     }
//   }),
//   vuex: {
//     store,
//     actionPrefix: "SOCKET_",
//     mutationPrefix: "SOCKET_"
//   }
// })
// )

export default {
  name: 'Tweets',
  components: {
    SideBar,
    PostTweet,
    TweetsList,
    Recommendation,
  },
  data() {
    return {
      tweets: [],
    }
  },
  created() {
    this.fetchTweets()
    //this.disconnectSever()
  },
  methods: {
    async fetchTweets() {
      try {
        const { data } = await tweetsAPI.get()
        this.tweets = data.map((tweet) => ({
          id: tweet.id,
          userId: tweet.User.id,
          account: tweet.User.account,
          avatar: tweet.User.avatar,
          name: tweet.User.name,
          time: tweet.time,
          description: tweet.description,
          replyCount: tweet.replyCount,
          likeCount: tweet.likeCount,
          createdAt: tweet.createdAt,
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
    afterPostTweet() {
      this.fetchTweets()
    },
    // disconnectSever() {
    //   console.log('disconnect')
    //   this.$socket.disconnect()
    // }
  },
  // computed: {
  //   ...mapState(['currentUser'])
  // }
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

.center-column {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  border-right: 1px solid #e6ecf0;
}

.recommendation-list {
  position: fixed;
  top: 15px;
  left: 1008px;
  grid-column: 3 / 4;
  grid-row: 1 / 2;
}

.header {
  position: fixed;
  z-index: 1;
  width: 600px;
  height: 55px;
  border-right: 1px solid #e6ecf0;
  border-bottom: 1px solid #e6ecf0;
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

.post-tweet {
  margin-top: 55px;
  width: 600px;
  height: 120px;
}

.divider {
  width: 600px;
  height: 10px;
  margin-bottom: 10px;
  background: #e6ecf0;
}
</style>
