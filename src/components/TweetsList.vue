<template>
  <div class="tweet-wrapper">
    <div v-for="tweet in tweets" :key="tweet.id">
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
            <img
              class="icon tweet-actions-like-icon"
              src="./../assets/icon_like.svg"
            />
            <span>{{ tweet.likeCount }}</span>
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
import { fromNowFilter } from './../utils/mixins'
import { mapState } from 'vuex'

export default {
  mixins: [fromNowFilter],
  name: 'TweetList',
  components: {
    ReplyModal,
  },
  props: {
    initialTweets: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tweets: this.initialTweets,
      modalTweet: {},
      isReplyModalToggle: false,
    }
  },
  watch: {
    initialTweets(newValue) {
      this.tweets = newValue
    },
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
.icon {
  width: 15px;
  height: 15px;
  color: #657786;
}
</style>
