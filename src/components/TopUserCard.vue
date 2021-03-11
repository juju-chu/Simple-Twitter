<template>
  <div class="follow-card">
    <router-link :to="{ name: 'user', params: { id: user.id } }">
      <img class="user-avatar" :src="user.avatar" alt="" />
    </router-link>
    <div class="profile">
      <router-link :to="{ name: 'user', params: { id: user.id } }">
        <div class="user-name">{{ user.name }}</div>
      </router-link>
      <router-link :to="{ name: 'user', params: { id: user.id } }">
        <div class="user-account">@{{ user.account }}</div>
      </router-link>
    </div>
    <div v-if="user.id !== currentUser.id" class="action">
      <button
        :disabled="isProcessing"
        v-if="user.isFollowed"
        @click.stop.prevent="removeFollowing(user.id)"
        class="followed-btn"
        :class="{ disabled: isProcessing }"
      >
        正在跟隨
      </button>
      <button
        :disabled="isProcessing"
        @click.stop.prevent="addFollowing(user.id)"
        v-else
        class="to-follow-btn"
        :class="{ disabled: isProcessing }"
      >
        跟隨
      </button>
    </div>
  </div>
</template>

<script>
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'

export default {
  name: 'TopCardUser',
  props: {
    initialUser: {
      type: Object,
      required: true
    },
    newFollowShip: {
      type: Object,
      default: () => ({
        userId: -1,
        isFollowed: ''
      })
    }
  },
  data() {
    return {
      user: {},
      isProcessing: false,
      newTopFollowShip: {
        userId: -1,
        isFollowed: ''
      }
    }
  },
  methods: {
    fetchUser() {
      this.user = this.initialUser
    },
    async addFollowing(userId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.addFollow({ id: userId })
        if (data.status != 'success') {
          throw new Error(data.message)
        }
        this.user.isFollowed = true
        this.newTopFollowShip.userId = userId
        this.newTopFollowShip.isFollowed = true
        this.$emit('after-top-follow-ship', this.newTopFollowShip)
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法追蹤用戶，請稍後再試'
        })
      }
      this.isProcessing = false
    },
    async removeFollowing(userId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.deleteFollow({ followingId: userId })
        if (data.status != 'success') {
          throw new Error(data.message)
        }
        this.user.isFollowed = false
        this.newTopFollowShip.userId = userId
        this.newTopFollowShip.isFollowed = false
        this.$emit('after-top-follow-ship', this.newTopFollowShip)
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取消追蹤用戶，請稍後再試'
        })
      }
      this.isProcessing = false
    },
  },
  created() {
    this.fetchUser()
  },
  watch: {
    initialUser(newValue) {
      this.user = {
        ...this.user,
        ...newValue
      }
    },
    newFollowShip: {
      handler: function (newValue) {
        if (this.user.id === newValue.userId) {
          this.user.isFollowed = newValue.isFollowed
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  }

}
</script>

<style scoped>
.follow-card {
  display: grid;
  grid-template-columns: 65px 1fr 1fr;
  height: 71px;
  border-bottom: 1px solid #e6ecf0;
  background: #f5f8fa;
}

.user-avatar {
  grid-column: 1 / 2;
  margin-top: 10px;
  margin-left: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
}

.profile {
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 150px;
  margin-left: 10px;
}

.profile div {
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
}

.user-account {
  color: #657786;
}

.action {
  grid-column: 3 / 4;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: auto;
}

button.followed-btn {
  width: 92px;
  height: 30px;
  margin-right: 15px;
  padding: 0;
  background: #ff6600;
  font-size: 15px;
  color: white;
  border-radius: 100px;
  border: none;
  outline: none;
}

button.followed-btn.disabled {
  background: #ecbd9e;
}

button.to-follow-btn {
  width: 62px;
  height: 30px;
  margin-right: 15px;
  padding: 0;
  background: #f5f8fa;
  font-size: 15px;
  color: #ff6600;
  border-radius: 100px;
  border: 1px solid #ff6600;
  outline: none;
}

button.to-follow-btn.disabled {
  color: #ecbd9e;
  border: 1px solid #ecbd9e;
}
</style>