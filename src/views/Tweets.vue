<template>
  <div class="container">
    <SideBar class="side-bar" />

    <div class="center-column">
      <div class="header">
        <div class="header-title">首頁</div>
      </div>
      <PostTweet class="post-tweet" />

      <div class="divider"></div>

      <!-- Tweet list -->
      <TweetsList class="tweet-list" />
    </div>

    <!-- Recommendation -->
    <!-- <div class="recommendation">Recommendation</div> -->
  </div>
</template>

<script>
import SideBar from './../components/SideBar'
import PostTweet from './../components/PostTweet'
import TweetsList from './../components/TweetsList'

export default {
  name: 'Tweets',
  components: {
    SideBar,
    PostTweet,
    TweetsList,
  },
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 378px 600px 462px;
  grid-template-rows: 1200px;
}
.side-bar {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  margin-top: 4px;
  margin-left: 103px;
  width: 235px;
  height: 1196px;
}
.center-column {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  border: 1px solid #e6ecf0;
}
.header {
  width: 600px;
  height: 55px;
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
  width: 600px;
  height: 120px;
  border: 1px solid #e6ecf0;
}
.divider {
  width: 600px;
  height: 10px;
  margin-bottom: 10px;
  background: #e6ecf0;
}
.recommendation {
  grid-column: 3 / 4;
  grid-row: 1 / 2;
}
</style>
