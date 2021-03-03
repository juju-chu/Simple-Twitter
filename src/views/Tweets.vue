<template>
  <div class="container">
    <SideBar class="side-bar" />

    <div class="header">
      <div class="header-title">首頁</div>
    </div>
    <PostTweet class="post-tweet" />

    <div class="divider"></div>

    <!-- Tweet list -->
    <!-- <TweetList class="tweet-list" /> -->

    <!-- Recommendation -->
    <!-- <div class="recommendation">Recommendation</div> -->
  </div>
</template>

<script>
import SideBar from './../components/SideBar'
import PostTweet from './../components/PostTweet'
// import TweetList from './../components/TweetList'

export default {
  name: 'Tweets',
  components: {
    SideBar,
    PostTweet,
    // TweetList,
  }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 378px 600px 462px;
  grid-template-rows: 55px 120px 10px 1fr;
}
.side-bar {
  grid-column: 1 / 2;
  grid-row: 1 / 4;
  margin-top: 4px;
  margin-left: 103px;
  width: 235px;
  height: 1196px;
}
.header {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  border: 1px solid #e6ecf0;
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
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  border: 1px solid #e6ecf0;
}
.divider {
  grid-column: 2 / 3;
  grid-row: 3 / 4;

  background: #e6ecf0;
}
.tweet-list {
  grid-column: 2 / 3;
  grid-row: 4 / 5;
  background: #888888;
}
.recommendation {
  grid-column: 3 / 4;
  grid-row: 1 / 4;
  background: #666;
}
</style>