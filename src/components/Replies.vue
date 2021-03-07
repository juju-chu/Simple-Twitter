<template>
  <div class="replies-wrapper">
    <div v-for="reply in replies" :key="reply.id">
      <div class="reply-wrapper">
        <div class="avatar-wrapper">
          <img class="avatar" :src="reply.avatar" />
        </div>
        <div class="reply-content">
          <div class="user-info">
            <div class="name">{{ reply.name }}</div>
            <div class="account-createdAt">
              @{{ reply.account }}・{{ reply.replyTime }}
            </div>
          </div>
          <div class="reply-to">
            回覆 <span>@{{ user.name }}</span>
          </div>
          <div class="comment">{{ reply.comment }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'

export default {
  name: 'Replies',
  props: {
    initialUser: {
      type: Object,
      default: () => ({
        avatar: '',
        name: '',
        account: '',
      }),
    },
  },
  data() {
    return {
      user: this.initialUser,
      replies: {
        id: -1,
        name: '',
        account: '',
        avatar: '',
        comment: '',
        replyTime: '',
      },
    }
  },
  watch: {
    initialUser(newValue) {
      this.user = {
        ...this.user,
        ...newValue,
      }
    },
  },
  created() {
    this.fetchReplies()
  },
  methods: {
    async fetchReplies() {
      try {
        const { id: tweetId } = this.$route.params
        const { data } = await tweetsAPI.getTweetReplies({ tweetId })
        this.replies = data.map((reply) => ({
          id: reply.id,
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
  },
}
</script>

<style scoped>
.reply-wrapper {
  display: flex;
  margin: 18px 0 0 15px;
  border-bottom: 1px solid #e6ecf0;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.reply-content {
  margin-left: 15px;
}
.user-info {
  display: flex;
}
.name {
  font-weight: bold;
  font-size: 15px;
}
.account-createdAt {
  margin-left: 5px;
  color: #657786;
}
.reply-to {
  margin-top: 4px;
  color: #657786;
}
.reply-to span {
  color: #ff6600;
}
.comment {
  margin: 5px 0 15px 0;
  font-weight: normal;
  font-size: 15px;
}
</style>
