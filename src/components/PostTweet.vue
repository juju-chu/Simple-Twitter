<template>
  <div>
    <img :src="currentUser.avatar" />
    <input type="text" placeholder="有什麼新鮮事？" />
    <button>
      <span>推文</span>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PostTweet',
  computed: {
    ...mapState(['currentUser']),
  },
}
</script>

<style scoped>
div {
  position: relative;
  border: 1px solid #e6ecf0;
}
img {
  margin-top: 10px;
  margin-left: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
input {
  margin-top: 21px;
  margin-left: 10px;
  width: 510px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #9197a3;
  border: none;
}
button {
  position: absolute;
  bottom: 10px;
  right: 15px;
  width: 64px;
  height: 40px;
  background: #ff6600;
  border: none;
  border-radius: 100px;
}
span {
  font-size: 18px;
  color: #ffffff;
}
</style>
