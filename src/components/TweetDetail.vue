<template>
  <div class="wrapper-center">
    <div class="user">
      <img class="user-avatar" :src="user.avatar" />
      <div class="user-info">
        <span class="user-name">{{ user.name }}</span>
        <span class="user-account">@{{ user.account }}</span>
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
      <div class="action-replies">
        <img src="./../assets/reply.svg" />
      </div>
      <div class="action-likes">
        <img src="./../assets/like.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TweetDetail',
  props: {
    initialTweet: {
      type: Object,
      default: () => ({
        description: '',
        time: '',
        replyCount: -1,
        likeCount: -1,
      }),
    },
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
      tweet: this.initialTweet,
      user: this.initialUser,
    }
  },
  watch: {
    initialTweet(newValue) {
      this.tweet = {
        ...this.tweet,
        ...newValue,
      }
    },
    initialUser(newValue) {
      this.user = {
        ...this.user,
        ...newValue,
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
}
.createdAt {
  margin-top: 15px;
  font-weight: 500;
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
</style>
