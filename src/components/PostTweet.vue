<template>
  <div>
    <div class="wrapper">
      <img class="user-image" :src="currentUser.avatar" />
      <div>
        <textarea
          class="tweet-text"
          v-model="newTweet"
          type="text"
          maxlength="140"
          placeholder="有什麼新鮮事？"
        ></textarea>
      </div>
      <button @click.stop.prevent="postTweet(newTweet)">
        <span>推文</span>
      </button>
    </div>
  </div>
</template>

<script>
import tweetsAPI from './../apis/tweets'
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'

export default {
  name: 'PostTweet',
  computed: {
    ...mapState(['currentUser']),
  },
  data() {
    return {
      newTweet: '',
    }
  },
  methods: {
    async postTweet(newTweet) {
      if (this.newTweet.trim() === '') {
        Toast.fire({
          icon: 'warning',
          title: '尚未輸入內容',
        })
        return
      }
      try {
        const { data } = await tweetsAPI.post({ newTweet })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.isShowModal = false
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法新增推文，請稍後再試',
        })
      }
    },
  },
}
</script>

<style scoped>
.wrapper {
  position: relative;
  display: flex;
  border: 1px solid #e6ecf0;
}
.user-image {
  margin-top: 10px;
  margin-left: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.tweet-text {
  margin-top: 21px;
  margin-left: 10px;
  width: 510px;
  height: 90px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #9197a3;
  border: none;
  resize: none;
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
