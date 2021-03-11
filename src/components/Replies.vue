<template>
  <div class="replies-wrapper">
    <div v-for="reply in replies" :key="reply.id">
      <div class="reply-wrapper">
        <div class="avatar-wrapper">
          <router-link
            :to="{
              name: 'user',
              params: { id: reply.userId ? reply.userId : -1 },
            }"
          >
            <img class="avatar" :src="reply.avatar" />
          </router-link>
        </div>
        <div class="reply-content">
          <div class="user-info">
            <router-link
              :to="{
                name: 'user',
                params: { id: reply.userId ? reply.userId : -1 },
              }"
            >
              <div class="name">{{ reply.name }}</div>
            </router-link>
            <div class="account-createdAt">
              <router-link
                :to="{
                  name: 'user',
                  params: { id: reply.userId ? reply.userId : -1 },
                }"
              >
                <span>@{{ reply.account }}</span>
              </router-link>
              <span>・</span>
              <span>{{ reply.replyTime }}</span>
            </div>
          </div>
          <div class="reply-to">
            回覆
            <router-link
              :to="{
                name: 'user',
                params: { id: tweet.userId ? tweet.userId : -1 },
              }"
            >
              <span>@{{ tweet.name }}</span>
            </router-link>
          </div>
          <div class="comment">{{ reply.comment }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Replies',
  props: {
    initialTweet: {
      type: Object,
      required: true,
    },
    replies: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
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
}

.account-createdAt span {
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
  width: 510px;
  overflow-wrap: anywhere;
}
</style>
