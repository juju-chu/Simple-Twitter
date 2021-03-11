<template>
  <div class="follow-card-wrapper">
    <router-link :to="{ name: 'user', params: { id: follow.id | -1 } }">
      <img class="user-avatar" :src="follow.avatar" alt="" />
    </router-link>
    <div class="card-content">
      <div class="profile-action-wrapper">
        <div class="profile">
          <router-link :to="{ name: 'user', params: { id: follow.id | -1 } }">
            <div class="user-name">{{ follow.name }}</div>
          </router-link>
          <router-link :to="{ name: 'user', params: { id: follow.id | -1 } }">
            <div class="user-account">@{{ follow.account }}</div>
          </router-link>
        </div>
        <div v-if="follow.id !== currentUser.id" class="action">
          <button
            :disabled="isProcessing"
            v-if="follow.isFollowed"
            @click.stop.prevent="removeFollowing(follow.id)"
            class="followed-btn"
            :class="{ disabled: isProcessing }"
          >
            正在跟隨
          </button>
          <button
            :disabled="isProcessing"
            @click.stop.prevent="addFollowing(follow.id)"
            v-else
            class="to-follow-btn"
            :class="{ disabled: isProcessing }"
          >
            跟隨
          </button>
        </div>
      </div>
      <div class="introduction">
        {{ follow.introduction }}
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from './../apis/users'
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'

export default {
  name: 'FollowCard',
  props: {
    initialFollow: {
      type: Object,
      required: true
    },
    newTopFollowShip: {
      type: Object,
      default: () => ({
        userId: -1,
        isFollowed: ''
      })
    }
  },
  data() {
    return {
      follow: {},
      isProcessing: false,
      newFollowShip: {
        userId: -1,
        isFollowed: false
      }
    }
  },
  methods: {
    fetchFollow() {
      this.follow = this.initialFollow
    },
    async addFollowing(userId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.addFollow({ id: userId })
        if (data.status != 'success') {
          throw new Error(data.message)
        }
        this.follow.isFollowed = true
        this.newFollowShip.userId = userId
        this.newFollowShip.isFollowed = true
        this.$emit('after-follow-ship', this.newFollowShip)
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
        this.follow.isFollowed = false
        this.newFollowShip.userId = userId
        this.newFollowShip.isFollowed = false
        this.$emit('after-follow-ship', this.newFollowShip)
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
    this.fetchFollow()
  },
  watch: {
    initalFollow(newValue) {
      this.follow = {
        ...this.follow,
        ...newValue
      }
    },
    newTopFollowShip: {
      handler: function (newValue) {
        if (this.follow.id === newValue.userId) {
          this.follow.isFollowed = newValue.isFollowed
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
.follow-card-wrapper {
  display: flex;
  width: 600px;
  min-height: 50px;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e6ecf0;
}

.user-avatar {
  grid-column: 1 / 2;
  margin-top: 3px;
  margin-left: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
}

.profile-action-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 525px;
  height: 35px;
  margin-left: 10px;
}

.user-name {
  font-weight: bold;
}

.user-account {
  color: #657786;
  font-weight: 500;
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

.introduction {
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 15px;
  font-weight: 400;
  font-size: 15px;
}
</style>