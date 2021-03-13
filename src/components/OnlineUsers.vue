<template>
  <div>
    <div class="wrapper">
      <router-link :to="{ name: 'user', params: { id: user.id } }">
        <img class="avatar" :src="user.avatar" />
      </router-link>
      <router-link :to="{ name: 'user', params: { id: user.id } }">
        <span class="name">{{ user.name }}</span>
      </router-link>
      <router-link :to="{ name: 'user', params: { id: user.id } }">
        <span class="account">@{{ user.account }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OnlineUsers',
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
  display: flex;
  align-items: center;
  margin-left: 15px;
  width: 378px;
  height: 80px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.name {
  margin-left: 10px;
  font-weight: bold;
  font-size: 15px;
}

.account {
  margin-left: 5px;
  font-weight: 500;
  font-size: 15px;
  color: #657786;
}
</style>
