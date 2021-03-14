<template>
  <div>
    <div class="notification-wrapper">
      <img class="avatar" :src="notification.avatar" />
      <div class="title-wrapper">
        <div v-if="isNewTweet" class="title">
          {{ notification.name }} 有新的推文通知
        </div>
        <div v-if="isNewReply" class="title">
          {{ notification.name }} 有新的回覆
        </div>
        <div v-if="isNewFollow" class="title">
          {{ notification.name }} 開始追蹤你
        </div>
        <div v-if="isNewReplySelf" class="title">
          你的貼文有新的回覆
        </div>
        <div v-if="isNnewLike" class="title">
          {{ notification.name }} 喜歡你的貼文
        </div>
      </div>
      <div class="content">{{ notification.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationList',
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isNewTweet: false,
      isNewReply: false,
      isNewFollow: false,
      isNewReplySelf: false,
      isNnewLike: false,
    }
  },
  mounted() {
    this.handleTitle()
  },
  methods: {
    handleTitle() {
      switch (this.notification.title) {
        case 'newTweet':
          this.isNewTweet = true
          this.isNewReply = false
          this.isNewFollow = false
          this.isNewReplySelf = false
          this.isNnewLike = false
          break
        case 'newReply':
          this.isNewTweet = false
          this.isNewReply = true
          this.isNewFollow = false
          this.isNewReplySelf = false
          this.isNnewLike = false
          break
        case 'newFollow':
          this.isNewTweet = false
          this.isNewReply = false
          this.isNewFollow = true
          this.isNewReplySelf = false
          this.isNnewLike = false
          break
        case 'newReplySelf':
          this.isNewTweet = false
          this.isNewReply = false
          this.isNewFollow = false
          this.isNewReplySelf = true
          this.isNnewLike = false
          break
        case 'newLike':
          this.isNewTweet = false
          this.isNewReply = false
          this.isNewFollow = false
          this.isNewReplySelf = false
          this.isNnewLike = true
          break
      }
    },
  },
}
</script>

<style scoped>
.notification-wrapper {
  padding: 15px 15px 10px 15px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.title-wrapper {
  margin-top: 10px;
}

.title {
  font-weight: 500;
  font-size: 15px;
}

.content {
  margin-top: 5px;
  font-weight: 500;
  font-size: 15px;
  color: #657786;
}
</style>
