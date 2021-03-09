<template>
  <div class="wrapper">
    <SideBar class="side-bar" />

    <div class="center-column">
      <div class="header">
        <button @click="$router.back()">
          <img class="header-back-icon" src="./../assets/icon_back.svg" />
        </button>
        <div class="header-title">推文</div>
      </div>

      <!-- TweetDetail -->
      <TweetDetail
        class="tweet-detail"
        :initial-tweet="tweet"
        :initial-user="user"
      />

      <!-- Replies -->
      <Replies class="replies" :initial-user="user" />
    </div>

    <!-- Recommendation -->
    <Recommendation class="recommendation-list" />
  </div>
</template>

<script>
import SideBar from './../components/SideBar'
import TweetDetail from './../components/TweetDetail'
import Replies from './../components/Replies'
import Recommendation from '../components/Recommendation'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'

export default {
  name: 'TweetReplies',
  components: {
    SideBar,
    TweetDetail,
    Replies,
    Recommendation,
  },
  data() {
    return {
      tweet: {},
      user: {},
    }
  },
  created() {
    this.fetchTweet()
  },
  methods: {
    async fetchTweet() {
      try {
        const { id: tweetId } = this.$route.params
        const { data } = await tweetsAPI.getTweet({ tweetId })
        const {
          UserId: userId,
          description,
          createdAt,
          likeCount,
          replyCount,
          User: user,
        } = data
        const time = this.transformTime(createdAt)
        this.tweet = {
          userId,
          description,
          time,
          likeCount,
          replyCount,
          createdAt,
        }
        this.user = user
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得資料，請稍後再試',
        })
      }
    },
    transformTime(createdAt) {
      const createdAtArray = createdAt.split('T')
      const dateArray = createdAtArray[0].split('-')
      const date = `${dateArray[0]}年${Number(dateArray[1])}月${Number(
        dateArray[2]
      )}日`
      let timeArray = createdAtArray[1].split('.')
      timeArray = timeArray[0].split(':')
      let time = ''
      if (timeArray[0] < 12) {
        time = `上午 ${timeArray[0]}:${timeArray[1]}`
      } else if (Number(timeArray[0]) === 12) {
        time = `下午 ${timeArray[0]}:${timeArray[1]}`
      } else {
        timeArray[0] = timeArray[0] - 11
        time = `下午 ${timeArray[0]}:${timeArray[1]}`
      }

      return `${time}・${date}`
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
  display: flex;
  width: 600px;
  height: 55px;
  background: #fff;
  border-right: 1px solid #e6ecf0;
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
.header-back-icon {
  margin-left: 15px;
  width: 24px;
  height: 24px;
}
.tweet-detail {
  margin-top: 70px;
  border-bottom: 1px solid #e6ecf0;
}
</style>
