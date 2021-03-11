<template>
  <div class="tweet-wrapper">
    <div>
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
          :class="{ active: isProcessing }"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.414 12.0001L19.207 6.20712C19.597 5.81712 19.597 5.18412 19.207 4.79312C18.817 4.40212 18.184 4.40312 17.793 4.79312L12 10.5861L6.207 4.79312C5.817 4.40312 5.184 4.40312 4.793 4.79312C4.402 5.18312 4.403 5.81612 4.793 6.20712L10.586 12.0001L4.793 17.7931C4.403 18.1831 4.403 18.8161 4.793 19.2071C4.988 19.4021 5.243 19.5001 5.5 19.5001C5.757 19.5001 6.012 19.4021 6.207 19.2071L12 13.4141L17.793 19.2071C17.988 19.4021 18.243 19.5001 18.5 19.5001C18.757 19.5001 19.012 19.4021 19.207 19.2071C19.597 18.8171 19.597 18.1841 19.207 17.7931L13.414 12.0001Z"
              fill="#657786"
            />
          </svg>
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
    initialTweet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isProcessing: false,
      tweet: this.initialTweet,
    }
  },
  watch: {
    initialTweet(newValue) {
      this.tweet = {
        ...this.tweet,
        ...newValue,
      }
    },
  },
  methods: {
    async deleteTweet(tweetId) {
      try {
        this.isProcessing = true
        const { data } = await adminAPI.tweets.delete({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$emit('after-delete-tweet')
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
.active path {
  fill: #ff6600;
}
</style>
