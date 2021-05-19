<template>
  <div class="container">
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
          @after-submit="afterSubmit"
        />

        <!-- Replies -->
        <Replies class="replies" :initial-tweet="tweet" :replies="replies" />
      </div>

      <!-- Recommendation -->
      <Recommendation class="recommendation-list" />
    </div>
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
      replies: [],
    }
  },
  created() {
    this.fetchTweet()
    this.fetchReplies()
  },
  methods: {
    async fetchTweet() {
      try {
        const { id: tweetId } = this.$route.params
        const { data } = await tweetsAPI.getTweet({ tweetId })
        const {
          id,
          UserId: userId,
          description,
          createdAt,
          likeCount,
          replyCount,
          User: user,
          isLiked,
        } = data
        const time = this.transformTime(createdAt)
        this.tweet = {
          id,
          userId,
          avatar: user.avatar,
          name: user.name,
          account: user.account,
          description,
          time,
          likeCount,
          replyCount,
          createdAt,
          isLiked
        }
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得資料，請稍後再試',
        })
      }
    },
    async fetchReplies() {
      try {
        const { id: tweetId } = this.$route.params
        const { data } = await tweetsAPI.getTweetReplies({ tweetId })
        this.replies = data.map((reply) => ({
          id: reply.id,
          userId: reply.UserId,
          name: reply.User.name,
          account: reply.User.account,
          avatar: reply.User.avatar,
          comment: reply.comment,
          replyTime: reply.replyTime,
        }))
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得回覆資訊，請稍後再試',
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
    afterSubmit() {
      this.fetchTweet()
      this.fetchReplies()
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
  margin: 15px 0 0 1008px;
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
