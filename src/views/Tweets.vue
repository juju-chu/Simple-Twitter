<template>
  <div class="wrapper">
    <SideBar
      class="side-bar"
      iconColorController="Tweets"
      :user-id="currentUser.id"
      :user-avatar="currentUser.avatar"
    />

    <div class="center-column">
      <div class="header">
        <div class="header-title">首頁</div>
      </div>
      <PostTweet class="post-tweet" />

      <div class="divider"></div>

      <!-- Tweet list -->
      <TweetsList class="tweet-list" :tweets="tweets" />
    </div>

    <!-- Recommendation -->
    <!-- <div class="recommendation">Recommendation</div> -->
  </div>
</template>

<script>
const dummyCurrentUser = {
  id: 5,
  name: 'Tracy Towne',
  account: 'user5',
  avatar: 'https://loremflickr.com/320/240/dog/?lock=37.8808195638617',
}
import SideBar from './../components/SideBar'
import PostTweet from './../components/PostTweet'
import TweetsList from './../components/TweetsList'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'

export default {
  name: 'Tweets',
  components: {
    SideBar,
    PostTweet,
    TweetsList,
  },
  data () {
    return {
      tweets: [],
      currentUser: {},
    }
  },
  created () {
    this.fetchTweets()
    this.fetchCurrentUser()
  },
  methods: {
    async fetchTweets () {
      try {
        const { data } = await tweetsAPI.get()
        this.tweets = data.map((tweet) => ({
          id: tweet.id,
          avatar: tweet.User.avatar,
          name: tweet.User.name,
          createdAt: tweet.createdAt,
          description: tweet.description,
          replyCount: tweet.replyCount,
          likeCount: tweet.likeCount,
        }))
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得推文，請稍後再試',
        })
      }
    },
    fetchCurrentUser () {
      this.currentUser = dummyCurrentUser
    },
  },
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
}
.header {
  position: fixed;
  z-index: 1;
  width: 600px;
  height: 55px;
  border: 1px solid #e6ecf0;
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
  border: 1px solid #e6ecf0;
}
.divider {
  width: 600px;
  height: 10px;
  margin-bottom: 10px;
  background: #e6ecf0;
}
.recommendation {
  grid-column: 3 / 4;
  grid-row: 1 / 2;
}
</style>
