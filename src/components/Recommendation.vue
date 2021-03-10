<template>
  <div class="recommendation-wrapper">
    <header>
      <p>跟隨誰</p>
    </header>
    <div class="follow-list">
      <div v-for="user in topUsers" :key="user.id" class="follow-card">
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
        <div class="action">
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
    </div>
    <footer>
      <p @click.prevent.stop="showMoreUser">
        {{ isShowMore ? '顯示較少' : '顯示更多' }}
      </p>
    </footer>
  </div>
</template>

<style scoped>
.recommendation-wrapper {
  width: 350px;
  min-height: 517px;
}

header p {
  line-height: 45px;
  margin-left: 15px;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
}

header {
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  background: #f5f8fa;
  height: 45px;
  border-bottom: 1px solid #e6ecf0;
}

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

footer {
  height: 45px;
  background: #f5f8fa;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
}

footer p {
  margin-left: 15px;
  font-size: 15px;
  font-weight: normal;
  line-height: 45px;
  color: #ff6600;
  cursor: pointer;
}
</style>

<script>
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

export default {
  name: 'Recommendation',
  data() {
    return {
      totalTopUsers: [],
      topUsers: [],
      isShowMore: false,
      isProcessing: false
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const { data } = await usersAPI.getTopUsers()
        this.totalTopUsers = data

        for (let i = 0; i < 6; i++) {
          this.topUsers.push(this.totalTopUsers[i])
        }

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得Top Users資訊，請稍後再試'
        })
      }
    },
    showMoreUser() {
      this.isShowMore = !this.isShowMore
      if (this.isShowMore) {
        this.topUsers = this.totalTopUsers
      } else {
        this.topUsers = []
        for (let i = 0; i < 6; i++) {
          this.topUsers.push(this.totalTopUsers[i])
        }
      }
    },
    async addFollowing(userId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.addFollow({ id: userId })
        if (data.status != 'success') {
          throw new Error(data.message)
        }
        this.totalTopUsers = this.totalTopUsers.map((user) => {
          if (user.id === userId) {
            user.isFollowed = true
          }
          return user
        })
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
        this.totalTopUsers = this.totalTopUsers.map((user) => {
          if (user.id === userId) {
            user.isFollowed = false
          }
          return user
        })
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
    this.fetchUsers()
  },
}
</script>
