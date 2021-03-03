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
const dummyCurrentUser = {
  id: 5,
  name: 'Tracy Towne',
  account: 'user5',
  avatar: 'https://loremflickr.com/320/240/dog/?lock=37.8808195638617',
}
export default {
  name: 'PostTweet',
  data() {
    return {
      currentUser: {},
    }
  },
  created() {
    this.fetchCurrentUser()
  },
  methods: {
    fetchCurrentUser() {
      this.currentUser = dummyCurrentUser
    },
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
