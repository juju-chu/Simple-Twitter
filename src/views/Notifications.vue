<template>
  <div class="container">
    <div class="wrapper">
      <SideBar class="side-bar" @after-post-tweet="afterPostTweet" />

      <div class="center-column">
        <div class="header">
          <div class="header-title">通知</div>
        </div>
        <div class="notification-wrapper">
          <NotificationList
            class="notification-list"
            v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
          />
        </div>
      </div>

      <!-- Recommendation -->
      <Recommendation class="recommendation-list" />
    </div>
  </div>
</template>

<script>
import SideBar from './../components/SideBar'
import NotificationList from './../components/NotificationList'
import Recommendation from '../components/Recommendation'

const dummyNotifications = [
  {
    id: 1,
    avatar: 'https://loremflickr.com/320/240/dog/?lock=2.0202522757629793',
    name: 'John',
    title: 'newTweet',
    content:
      'Vero ut dolor rerum ad. Consectetur assumenda voluptatem cumque hic rerum repellat quae fugit. Et eos ut vel perferendis. Nobis rerum eos.',
  },
  {
    id: 2,
    avatar: 'https://loremflickr.com/320/240/dog/?lock=42.87898512441826',
    name: 'Mary',
    title: 'newReply',
    content:
      'Vero ut dolor rerum ad. Consectetur assumenda voluptatem cumque hic rerum repellat quae fugit. Et eos ut vel perferendis. Nobis rerum eos.',
  },
  {
    id: 3,
    avatar: 'https://loremflickr.com/320/240/dog/?lock=7.643201110272924',
    name: 'Michael',
    title: 'newFollow',
    content: '',
  },
  {
    id: 4,
    avatar: 'https://loremflickr.com/320/240/dog/?lock=4.951409888063251',
    name: '',
    title: 'newReplySelf',
    content:
      'Vero ut dolor rerum ad. Consectetur assumenda voluptatem cumque hic rerum repellat quae fugit. Et eos ut vel perferendis. Nobis rerum eos.',
  },
  {
    id: 5,
    avatar: 'https://loremflickr.com/320/240/dog/?lock=46.034589452628985',
    name: 'Peter',
    title: 'newLike',
    content: '',
  },
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
    fetchNotifications() {
      this.notifications = dummyNotifications
    },
    afterPostTweet() {
      this.fetchTweets()
    },
  },
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
  margin: 15px 0 0 1008px;
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

.notification-wrapper {
  margin-top: 55px;
}

.notification-list {
  border-bottom: 1px solid #e6ecf0;
}
</style>
