<template>
  <div class="wrapper-center">
    <div class="user">
      <router-link
        :to="{ name: 'user', params: { id: tweet.userId ? tweet.userId : -1 } }"
      >
        <img class="user-avatar" :src="tweet.avatar" />
      </router-link>
      <div class="user-info">
        <router-link
          :to="{
            name: 'user',
            params: { id: tweet.userId ? tweet.userId : -1 },
          }"
        >
          <span class="user-name">{{ tweet.name }}</span>
        </router-link>
        <router-link
          :to="{
            name: 'user',
            params: { id: tweet.userId ? tweet.userId : -1 },
          }"
        >
          <span class="user-account">@{{ tweet.account }}</span>
        </router-link>
      </div>
    </div>
    <div class="description">{{ tweet.description }}</div>
    <div class="createdAt">{{ tweet.time }}</div>
    <div class="divider-1"></div>
    <div class="count-wrapper">
      <div class="count count-replies">
        {{ tweet.replyCount }}<span> 回覆</span>
      </div>
      <div class="count count-likes">
        {{ tweet.likeCount }}<span> 喜歡次數</span>
      </div>
    </div>
    <div class="divider-2"></div>
    <div class="action">
      <button
        @click.stop.prevent="toggleReplyModal(tweet)"
        class="action-replies"
      >
        <img src="./../assets/reply.svg" />
      </button>
      <button
        class="action-likes"
        @click.stop.prevent="addLike(tweet.id)"
        v-if="!tweet.isLiked"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 27.0473H14.9825C11.7537 26.9873 2.4375 18.5698 2.4375 10.5973C2.4375 6.76728 5.59375 3.40479 9.19125 3.40479C12.0537 3.40479 13.9787 5.37979 14.9987 6.81729C16.0162 5.38229 17.9412 3.40479 20.805 3.40479C24.405 3.40479 27.56 6.76729 27.56 10.5985C27.56 18.5685 18.2425 26.986 15.0137 27.0448H15V27.0473ZM9.1925 5.28104C6.5925 5.28104 4.31375 7.76603 4.31375 10.5998C4.31375 17.7748 13.1062 25.0948 15.0012 25.1723C16.8987 25.0948 25.6887 17.776 25.6887 10.5998C25.6887 7.76603 23.41 5.28104 20.81 5.28104C17.65 5.28104 15.885 8.95104 15.87 8.98729C15.5825 9.68979 14.425 9.68979 14.1362 8.98729C14.1187 8.94979 12.355 5.28104 9.19375 5.28104H9.1925Z"
            fill="#657786"
          />
        </svg>
      </button>
      <button
        class="action-likes liked"
        @click.stop.prevent="deleteLike(tweet.id)"
        v-else
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 27.0473H14.9825C11.7537 26.9873 2.4375 18.5698 2.4375 10.5973C2.4375 6.76728 5.59375 3.40479 9.19125 3.40479C12.0537 3.40479 13.9787 5.37979 14.9987 6.81729C16.0162 5.38229 17.9412 3.40479 20.805 3.40479C24.405 3.40479 27.56 6.76729 27.56 10.5985C27.56 18.5685 18.2425 26.986 15.0137 27.0448H15V27.0473ZM9.1925 5.28104C6.5925 5.28104 4.31375 7.76603 4.31375 10.5998C4.31375 17.7748 13.1062 25.0948 15.0012 25.1723C16.8987 25.0948 25.6887 17.776 25.6887 10.5998C25.6887 7.76603 23.41 5.28104 20.81 5.28104C17.65 5.28104 15.885 8.95104 15.87 8.98729C15.5825 9.68979 14.425 9.68979 14.1362 8.98729C14.1187 8.94979 12.355 5.28104 9.19375 5.28104H9.1925Z"
            fill="#657786"
          />
        </svg>
      </button>
    </div>
    <!-- ReplyModal -->
    <ReplyModal
      :initial-is-reply-modal-toggle="isReplyModalToggle"
      :modal-tweet="modalTweet"
      @after-close-modal="closeReplyModal"
      @after-submit="afterSubmit"
    />
  </div>
</template>

<script>
import tweetsAPI from './../apis/tweets'
import ReplyModal from '../components/ReplyModal'
import { Toast } from './../utils/helpers'

export default {
  name: 'TweetDetail',
  components: {
    ReplyModal,
  },
  props: {
    initialTweet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tweet: this.initialTweet,
      modalTweet: {},
      isReplyModalToggle: false,
      isProcessing: false,
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
    toggleReplyModal(tweet) {
      this.isReplyModalToggle = true
      this.modalTweet = tweet
    },
    closeReplyModal(isReplyModalToggle) {
      this.isReplyModalToggle = isReplyModalToggle
    },
    afterSubmit() {
      this.$emit('after-submit')
    },
    async addLike(tweetId) {
      try {
        this.isProcessing = true
        const { data } = await tweetsAPI.addLike({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.tweet.isLiked = true
        this.tweet.likeCount++
        this.isProcessing = false
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法按讚，請稍後再試',
        })
        this.isProcessing = false
      }
    },
    async deleteLike(tweetId) {
      try {
        this.isProcessing = true
        const { data } = await tweetsAPI.deleteLike({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.tweet.isLiked = false
        this.tweet.likeCount--
        this.isProcessing = false
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取消按讚，請稍後再試',
        })
        this.isProcessing = false
      }
    },
  },
}
</script>

<style scoped>
.wrapper-center {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.user {
  display: flex;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-info {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.user-name {
  font-weight: bold;
  font-size: 15px;
}

.user-account {
  font-weight: 500;
  font-size: 15px;
  color: #657786;
}

.description {
  margin-top: 15px;
  width: 510px;
  font-weight: 500;
  font-size: 23px;
  overflow-wrap: anywhere;
}

.createdAt {
  margin-top: 15px;
  font-weight: 400;
  font-size: 15px;
  color: #657786;
}

.divider-1,
.divider-2 {
  width: 570px;
  height: 1px;
  background: #e6ecf0;
}

.divider-1 {
  margin-top: 15px;
}

.divider-2 {
  margin-top: 20px;
}

.count-wrapper {
  display: flex;
}

.count {
  font-weight: bold;
  font-size: 19px;
}

.count span {
  color: #657786;
}

.count-likes {
  margin-left: 20px;
}

.action {
  display: flex;
  margin: 18px 0 11px 0;
}

.action-likes {
  margin-left: 150px;
}

.liked path {
  fill: #e0245e;
}
</style>
