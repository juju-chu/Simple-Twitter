<template>
  <div class="tweet-wrapper">
    <div>
      <div class="tweet-content">
        <div class="tweet-detail">
          <router-link :to="{ name: 'user', params: { id: tweet.userId } }">
            <img class="tweet-user-photo" :src="tweet.avatar" />
          </router-link>
          <div class="tweet">
            <div class="tweet-user">
              <router-link :to="{ name: 'user', params: { id: tweet.userId } }">
                <span class="tweet-user-name">{{ tweet.name }}</span>
              </router-link>
              <router-link :to="{ name: 'user', params: { id: tweet.userId } }">
                <span class="tweet-user-info">@{{ tweet.account }}</span>
              </router-link>
              <span>・</span>
              <router-link
                :to="{ name: 'tweets-replies', params: { id: tweet.id } }"
              >
                <span class="tweet-user-info">{{
                  tweet.createdAt | fromNow
                }}</span>
              </router-link>
            </div>
            <div
              class="tweet-description"
              @click.stop.prevent="openReplies(tweet.id)"
            >
              {{ tweet.description }}
            </div>
          </div>
        </div>
        <div class="tweet-actions">
          <button
            @click.stop.prevent="toggleReplyModal(tweet)"
            class="action tweet-actions-reply"
          >
            <img
              class="icon tweet-actions-reply-icon"
              src="./../assets/icon_reply.svg"
            />
            <span>{{ tweet.replyCount }}</span>
          </button>
          <div class="action tweet-actions-like">
            <button
              class="tweet-actions-like-icon"
              v-if="tweet.isLiked"
              @click.stop.prevent="deleteLike(tweet.id)"
              :disabled="isProcessing"
            >
              <img
                class="icon tweet-actions-like-icon"
                src="./../assets/icon_liked.svg"
              />
            </button>
            <button
              class="tweet-actions-like-icon"
              v-else
              @click.stop.prevent="addLike(tweet.id)"
              :disabled="isProcessing"
            >
              <img
                class="icon tweet-actions-like-icon"
                src="./../assets/icon_like.svg"
              />
            </button>
            <span :class="{ likes: tweet.isLiked }">{{ tweet.likeCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- ReplyModal -->
    <ReplyModal
      :initial-is-reply-modal-toggle="isReplyModalToggle"
      :modal-tweet="modalTweet"
      @after-close-modal="closeReplyModal"
    />
  </div>
</template>

<script>
import ReplyModal from '../components/ReplyModal'
import tweetsAPI from './../apis/tweets'
import { fromNowFilter } from './../utils/mixins'
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'

export default {
  mixins: [fromNowFilter],
  name: 'TweetList',
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
  computed: {
    ...mapState(['currentUser']),
  },
  methods: {
    toggleReplyModal(tweet) {
      this.isReplyModalToggle = true
      this.modalTweet = tweet
    },
    closeReplyModal(isReplyModalToggle) {
      this.isReplyModalToggle = isReplyModalToggle
    },
    openReplies(tweetId) {
      this.$router.push({ name: 'tweets-replies', params: { id: tweetId } })
    },
    async addLike(tweetId) {
      try {
        this.isProcessing = true
        const { data } = await tweetsAPI.addLike({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.tweet.isLiked = true
        this.tweet.likeCount = this.tweet.likeCount + 1
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
        this.tweet.likeCount = this.tweet.likeCount - 1
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
.tweet-wrapper {
  width: 600px;
}
.tweet-content {
  display: flex;
  flex-direction: column;
  padding: 13px 15px 6px 15px;
  border-bottom: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
}
.tweet-detail {
  display: flex;
  cursor: pointer;
}
.tweet-user-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.tweet {
  margin-left: 10px;
}
.weet-user-name {
  font-weight: bold;
  font-size: 15px;
}
.tweet-user-info {
  margin-left: 5px;
  color: #657786;
}
.tweet-description {
  margin-top: 6px;
  font-weight: 500;
  font-size: 15px;
}
.tweet-actions {
  margin-left: 60px;
}
.action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40px;
  height: 15px;
}
.tweet-actions {
  display: flex;
  margin-top: 10px;
  height: 21px;
}
.tweet-actions-like {
  margin-left: 50px;
}
.likes {
  color: #e0245e;
}
.icon {
  width: 15px;
  height: 15px;
  color: #657786;
}
</style>
