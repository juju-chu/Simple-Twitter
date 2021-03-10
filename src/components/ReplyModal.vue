<template>
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
              <div class="tweet-time">
                •{{ modalTweet.createdAt | fromNow }}
              </div>
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
                v-model="comment"
                class="reply-comment"
                name="comment"
                id="comment"
                placeholder="推你的回覆"
              ></textarea>
            </div>
            <footer class="reply-modal-footer">
              <button
                :disabled="isProcessing"
                class="reply-btn"
                :class="{ disabled: isProcessing }"
                type="submit"
              >
                回覆
              </button>
            </footer>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Modal HTML End-->
</template>

<style scoped>
.modal-background-wrapper {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vw;
  z-index: 2;
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

.disabled {
  background: #ecbd9e;
}
</style>

<script>
import tweetsAPI from '../apis/tweets'
import { mapState } from 'vuex'
import { Toast } from '../utils/helpers'
import { fromNowFilter } from './../utils/mixins'

export default {
  name: 'ReplyModal',
  mixins: [fromNowFilter],
  props: {
    initialIsReplyModalToggle: {
      type: Boolean,
      required: true,
      default: false
    },
    modalTweet: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      isReplyModalToggle: false,
      comment: '',
      isProcessing: false
    }
  },
  methods: {
    closeReplyModal() {
      this.isReplyModalToggle = false
      this.$emit("after-close-modal", this.isReplyModalToggle)
    },
    async handleSubmit() {
      if (!this.comment) {
        Toast.fire({
          icon: 'warning',
          title: '推文內容不可為空'
        })
        return
      }
      try {
        this.isProcessing = true
        const { data } = await tweetsAPI.reply({ id: this.modalTweet.id, comment: this.comment })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.comment = ''
        this.closeReplyModal()
        this.$emit('after-submit')
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法新增回覆，請稍後再試'
        })
      }
      this.isProcessing = false
    },
  },
  created() {
    this.isReplyModalToggle = this.initialIsReplyModalToggle
  },
  watch: {
    initialIsReplyModalToggle(newVale) {
      this.isReplyModalToggle = newVale
    }
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>