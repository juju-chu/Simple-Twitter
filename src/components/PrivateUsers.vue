<template>
  <div>
    <button class="wrapper" @click.stop.prevent="handleClick">
      <router-link :to="{ name: 'user', params: { id: user.userId } }">
        <img class="avatar" :src="user.avatar" />
      </router-link>
      <div class="user-wrapper">
        <div class="user-info">
          <div>
            <router-link :to="{ name: 'user', params: { id: user.userId } }">
              <span class="name">{{ user.name }}</span>
            </router-link>
            <router-link :to="{ name: 'user', params: { id: user.userId } }">
              <span class="account">@{{ user.account }}</span>
            </router-link>
          </div>
          <div class="last-time">{{ user.createdAt }}</div>
        </div>
        <div class="user-message">{{ user.lastMessage }}</div>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'PrivateUsers',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.$emit('after-click', this.user)
    },
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  margin: 0 10px 0 10px;
  height: 80px;
}

.user-wrapper {
  margin-left: 10px;
  width: 370px;
}

.user-info {
  display: flex;
  justify-content: space-between;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.name {
  font-weight: bold;
  font-size: 15px;
}

.account {
  margin-left: 5px;
  font-weight: 500;
  font-size: 15px;
}

.account,
.last-time,
.user-message {
  color: #657786;
  text-align: start;
}
</style>
