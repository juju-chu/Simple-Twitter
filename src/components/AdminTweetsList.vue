<template>
  <div class="tweet-wrapper">
    <div v-for="tweet in tweets" :key="tweet.id">
      <div class="tweet-content">
        <img class="tweet-user-photo" :src="tweet.avatar" alt="" />
        <div class="tweet">
          <div class="tweet-user">
            <span class="tweet-user-name">{{ tweet.name }}</span>
            <span class="tweet-user-info"
              >@{{ tweet.account }}・{{ tweet.createdAt | fromNow }}</span
            >
          </div>
          <div class="tweet-description">{{ tweet.description }}</div>
        </div>
        <button
          @click.stop.prevent="deleteTweet(tweet.id)"
          :disabled="isProcessing"
        >
          <img src="./../assets/icon_close.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'
import { fromNowFilter } from './../utils/mixins'

export default {
  mixins: [fromNowFilter],
  name: 'AdminTweetsList',
  props: {
    noActions: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tweets: [],
      isProcessing: false,
    }
  },
  created() {
    this.fetchTweets()
  },
  methods: {
    async fetchTweets() {
      // TODO: 取得 API 請求後的資料
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
    async deleteTweet(tweetId) {
      try {
        this.isProcessing = true
        const { data } = await adminAPI.tweets.delete({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.fetchTweets()
        this.isProcessing = false
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法刪除推文，請稍後再試',
        })
      }
    },
  },
}
</script>

<style scoped>
.tweet-wrapper {
  width: auto;
  height: 136px;
}
.tweet-content {
  display: flex;
  margin-bottom: 10px;
  border-bottom: 1px solid #e6ecf0;
}
.tweet-user-photo {
  margin-top: 13px;
  margin-left: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.tweet {
  margin-top: 15px;
  margin-left: 10px;
}
.tweet-user {
  height: 22px;
}
.tweet-user-info {
  margin-left: 5px;
  color: #657786;
}
.tweet-description {
  margin-top: 6px;
  margin-bottom: 37px;
}
button {
  margin-left: auto;
  margin-right: 15px;
  border: none;
  background: none;
}
</style>
