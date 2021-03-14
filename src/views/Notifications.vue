<template>
  <div class="wrapper">
    <SideBar class="side-bar" @after-post-tweet="afterPostTweet" />

    <div class="center-column">
      <div class="header">
        <div class="header-title">通知</div>
      </div>
      <!-- Tweet list -->
      <NotificationList
        class="notification-list"
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </div>

    <!-- Recommendation -->
    <Recommendation class="recommendation-list" />
  </div>
</template>

<script>
import SideBar from './../components/SideBar'
import NotificationList from './../components/NotificationList'
import Recommendation from '../components/Recommendation'
//import { Toast } from './../utils/helpers'

const dummyNotifications = [
  {
    id: 1,
    avatar: 'https://i.imgur.com/4RHubaz.jpg',
    name: 'name',
    title: 'newTweet',
    content: 'Vero ut dolor rerum ad. Consectetur assumenda voluptatem cumque hic rerum repellat quae fugit. Et eos ut vel perferendis. Nobis rerum eos.'
  },
  {
    id: 2,
    avatar: 'https://i.imgur.com/4RHubaz.jpg',
    name: 'name',
    title: 'newReply',
    content: 'Vero ut dolor rerum ad. Consectetur assumenda voluptatem cumque hic rerum repellat quae fugit. Et eos ut vel perferendis. Nobis rerum eos.'
  },
  {
    id: 3,
    avatar: 'https://i.imgur.com/4RHubaz.jpg',
    name: 'name',
    title: 'newFollow',
    content: ''
  },
  {
    id: 4,
    avatar: 'https://i.imgur.com/4RHubaz.jpg',
    name: 'name',
    title: 'newReply',
    content: 'Vero ut dolor rerum ad. Consectetur assumenda voluptatem cumque hic rerum repellat quae fugit. Et eos ut vel perferendis. Nobis rerum eos.'
  },
  {
    id: 5,
    avatar: 'https://i.imgur.com/4RHubaz.jpg',
    name: 'name',
    title: 'newLike',
    content: ''
  }
]

export default {
  name: 'Notifications',
  components: {
    SideBar,
    NotificationList,
    Recommendation,
  },
  data() {
    return {
      notifications: [],
    }
  },
  created() {
    this.fetchNotifications()
  },
  methods: {
    // async fetchNotifications() {
    //   try {
    //     const { data } = await users.getNotifications()
    //     this.tweets = data.map((tweet) => ({
    //       id: tweet.id,
    //       userId: tweet.User.id,
    //       account: tweet.User.account,
    //       avatar: tweet.User.avatar,
    //       name: tweet.User.name,
    //       time: tweet.time,
    //       description: tweet.description,
    //       replyCount: tweet.replyCount,
    //       likeCount: tweet.likeCount,
    //       createdAt: tweet.createdAt,
    //       isLiked: tweet.isLiked,
    //     }))
    //   } catch (error) {
    //     console.log(error)
    //     Toast.fire({
    //       icon: 'error',
    //       title: '無法取得推文，請稍後再試',
    //     })
    //   }
    // },
    fetchNotifications() {
      this.notifications = dummyNotifications
    },
    afterPostTweet() {
      this.fetchTweets()
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 378px 600px 462px;
  grid-template-rows: 100vh;
}

.side-bar {
  position: fixed;
  z-index: 2;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  padding-left: 103px;
  width: 378px;
  height: 100vh;
  border-right: 1px solid #e6ecf0;
}

.center-column {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  border-right: 1px solid #e6ecf0;
}

.recommendation-list {
  position: fixed;
  top: 15px;
  left: 1008px;
  grid-column: 3 / 4;
  grid-row: 1 / 2;
}

.header {
  position: fixed;
  z-index: 1;
  width: 600px;
  height: 55px;
  border-right: 1px solid #e6ecf0;
  border-bottom: 1px solid #e6ecf0;
  background: #fff;
}

.header-title {
  margin-left: 15px;
  line-height: 55px;

  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #1c1c1c;
}

.post-tweet {
  margin-top: 55px;
  width: 600px;
  height: 120px;
}

.divider {
  width: 600px;
  height: 10px;
  margin-bottom: 10px;
  background: #e6ecf0;
}
</style>
