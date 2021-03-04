<template>
  <div class="wrapper">
    <img class="cover" :src="user.cover" />
    <div class="user-info">
      <div class="name">{{ user.name }}</div>
      <div class="account">@{{ user.account }}</div>
      <div class="introduction">{{ user.introduction }}</div>
      <div class="follow">
        <div class="followings-count">
          {{ user.followingsCount }} 個<span>跟隨中</span>
        </div>
        <div class="followers-count">
          {{ user.followersCount }} 位<span>跟隨者</span>
        </div>
      </div>
    </div>
    <img class="avatar" :src="user.avatar" />
    <div class="btn">
      <button class="btn-button">
        <span class="btn-text">編輯個人資料</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}
img {
  object-fit: cover;
}
.cover {
  width: 598px;
  height: 200px;
}
.avatar {
  position: absolute;
  top: 124px;
  left: 14px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 4px solid #ffffff;
}
.btn {
  position: absolute;
  top: 210px;
  right: 15px;
  padding: 0;
}
.btn-button {
  width: 122px;
  height: 40px;
  background: none;
  border: 1px solid #ff6600;
  border-radius: 100px;
}
.btn-text {
  font-weight: bold;
  font-size: 15px;
  color: #ff6600;
}
.user-info {
  display: flex;
  flex-direction: column;
  margin-top: 69px;
  margin-left: 15px;
}
.name {
  font-weight: 900;
  font-size: 19px;
}
.account {
  font-weight: 500;
  font-size: 15px;
  color: #657786;
}
.introduction {
  margin-top: 10px;
  font-weight: normal;
  font-size: 14px;
}
.follow {
  display: flex;
  margin-top: 10px;
  margin-bottom: 36px;
}
.followings-count {
  margin-right: 20px;
  font-weight: 500;
  font-size: 14px;
}
.followers-count {
  margin-right: 20px;
  font-weight: 500;
  font-size: 14px;
}
.follow span {
  color: #657786;
}
</style>
