<template>
  <div class="recommendation-wrapper">
    <header>
      <p>跟隨誰</p>
    </header>
    <div class="follow-list">
      <TopUserCard
        v-for="user in topUsers"
        :key="user.id"
        :initial-user="user"
      />
    </div>
    <footer>
      <p @click.prevent.stop="showMoreUser">
        {{ isShowMore ? '顯示較少' : '顯示更多' }}
      </p>
    </footer>
  </div>
</template>

<script>
import usersAPI from './../apis/users'
import TopUserCard from './../components/TopUserCard'
import { Toast } from './../utils/helpers'

export default {
  name: 'Recommendation',
  components: {
    TopUserCard
  },
  data() {
    return {
      totalTopUsers: [],
      topUsers: [],
      isShowMore: false
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
    }
  },
  created() {
    this.fetchUsers()
  }
}
</script>

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
