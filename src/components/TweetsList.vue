<template>
  <div class="tweet-wrapper">
    <div v-for="tweet in tweets" :key="tweet.id">
      <div class="tweet-content">
        <div class="tweet-detail" @click.stop.prevent="openReplies(tweet.id)">
          <img class="tweet-user-photo" :src="tweet.avatar" alt="" />
          <div class="tweet">
            <div class="tweet-user">
              <span class="tweet-user-name">{{ tweet.name }}</span>
              <span class="tweet-user-info"
                >@{{ tweet.account }}・{{ tweet.time }}</span
              >
            </div>
            <div class="tweet-description">{{ tweet.description }}</div>
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

    <!-- Modal HTML -->
    <div v-if="isReplyModalToggle" class="modal-background-wrapper">
      <div class="reply-modal-wrapper">
        <header class="reply-modal-header">
          <button @click.stop.prevent="closeReplyModal">
            <svg
              class="close-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.414 12.0001L19.207 6.20712C19.597 5.81712 19.597 5.18412 19.207 4.79312C18.817 4.40212 18.184 4.40312 17.793 4.79312L12 10.5861L6.207 4.79312C5.817 4.40312 5.184 4.40312 4.793 4.79312C4.402 5.18312 4.403 5.81612 4.793 6.20712L10.586 12.0001L4.793 17.7931C4.403 18.1831 4.403 18.8161 4.793 19.2071C4.988 19.4021 5.243 19.5001 5.5 19.5001C5.757 19.5001 6.012 19.4021 6.207 19.2071L12 13.4141L17.793 19.2071C17.988 19.4021 18.243 19.5001 18.5 19.5001C18.757 19.5001 19.012 19.4021 19.207 19.2071C19.597 18.8171 19.597 18.1841 19.207 17.7931L13.414 12.0001Z"
                fill="#FF6600"
              />
            </svg>
          </button>
        </header>
        <div class="reply-modal-content">
          <div class="upper-wrapper">
            <div class="image-area">
              <img class="tweet-user-avatar" :src="modalTweet.avatar" alt="" />
              <div class="divider-wrapper">
                <div class="divider"></div>
              </div>
            </div>
            <div class="text-area">
              <div class="profile-wrapper">
                <div class="tweet-name">{{ modalTweet.name }}</div>
                <div class="tweet-account">@{{ modalTweet.account }}</div>
                <div class="tweet-time">•3小時</div>
              </div>
              <div class="text-wrapper">
                {{ modalTweet.description }}
              </div>
              <div class="interaction-wrapper">
                回覆給<span class="interaction-tweet-account"
                  >@{{ modalTweet.account }}</span
                >
              </div>
            </div>
          </div>
          <form class="forms" @submit.prevent.stop="handleSubmit">
            <div class="lower-wrapper">
              <div class="reply-content">
                <img
                  class="current-user-avatar"
                  :src="currentUser.avatar"
                  alt=""
                />
                <textarea
                  v-model="replyComment"
                  class="reply-comment"
                  name="comment"
                  id="comment"
                  placeholder="推你的回覆"
                ></textarea>
              </div>
              <footer class="reply-modal-footer">
                <button class="reply-btn">回覆</button>
              </footer>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal HTML End-->
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TweetList',
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
      replyComment: '',
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
  created() {
    this.tweets = {
      ...this.tweets,
      ...this.initialTweets,
    }
  },
  methods: {
    toggleReplyModal(tweet) {
      this.isReplyModalToggle = true
      this.modalTweet = tweet
    },
    closeReplyModal() {
      this.isReplyModalToggle = false
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

/* ==========Modal Style============= */
.modal-background-wrapper {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vw;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.4);
}

.reply-modal-wrapper {
  position: fixed;
  top: 54px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 600px;
  min-height: 350px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 14px;
}

.reply-modal-header {
  width: 600px;
  height: 55px;
  border-bottom: 1px solid #e6ecf0;
}

.close-icon {
  margin-top: 15px;
  margin-left: 15px;
}

.upper-wrapper {
  display: flex;
  width: 600px;
  min-height: 100px;
}

.image-area {
  display: grid;
  grid-template-rows: 68px 1fr;
  width: 50px;
  min-height: 100px;
  margin-left: 15px;
}

.tweet-user-avatar {
  grid-row: 1 / 2;
  width: 50px;
  height: 50px;
  margin-top: 18px;
  border-radius: 50px;
}

.divider-wrapper {
  grid-row: 2 / 3;
  margin-top: 5px;
  margin-bottom: 10px;
}

.divider {
  width: 2px;
  height: 100%;
  margin: 0 auto;
  background: #ccd6dd;
}

.text-area {
  width: 535px;
  min-height: 100px;
  margin-left: 10px;
}

.profile-wrapper {
  display: flex;
  height: 43px;
  padding-top: 15px;
}

.tweet-name {
  margin-right: 5px;
  font-weight: bold;
}

.tweet-account,
.tweet-time {
  color: #657786;
}

.interaction-wrapper {
  margin-top: 15px;
  margin-bottom: 23px;
  font-size: 13px;
  color: #657786;
}

.interaction-tweet-account {
  color: #ff6600;
}

.reply-content {
  display: flex;
  margin-left: 15px;
}

.current-user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50px;
}

textarea.reply-comment {
  outline: none;
  border: none;
  resize: none;
  min-height: 171px;
  width: 525px;
  margin-left: 10px;
  padding-top: 10px;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #9197a3;
}

.reply-modal-footer {
  display: flex;
  flex-direction: row-reverse;
  height: 55px;
}

.reply-btn {
  width: 64px;
  height: 40px;
  margin-right: 15px;
  background: #ff6600;
  border-radius: 100px;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  color: #ffffff;
}

/* ==========Modal Style End============= */
</style>
