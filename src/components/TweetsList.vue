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
          <div class="tweet-actions">
            <div class="action tweet-actions-reply">
              <img
                class="icon tweet-actions-reply-icon"
                src="./../assets/icon_reply.svg"
              />
              <span>{{ tweet.replyCount }}</span>
            </div>
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
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
export default {
  mixins: [fromNowFilter],
  name: 'PostTweet',
  props: {
    tweets: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.tweet-wrapper {
  width: 600px;
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
}
.tweet-actions {
  margin-bottom: 10px;
  width: 130px;
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
