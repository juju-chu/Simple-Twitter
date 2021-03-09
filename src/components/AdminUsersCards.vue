<template>
  <div class="user-cards-wrapper">
    <div v-for="user in users" :key="user.id" class="user-card">
      <img class="user-cover" :src="user.cover" alt="" />
      <img class="user-avatar" :src="user.avatar" alt="" />
      <div class="user-profile">
        <div class="user-name">{{ user.name }}</div>
        <div class="user-account">@{{ user.account }}</div>
        <div class="activity">
          <div class="activity-reply">
            <svg
              width="24"
              height="24"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.77881 1.40127L6.18631 1.39502H6.18506C3.45131 1.39502 1.31006 3.53689 1.31006 6.27127C1.31006 8.83252 3.30131 10.775 5.97568 10.8775V13.27C5.97568 13.3375 6.00318 13.4488 6.05068 13.5219C6.13943 13.6625 6.29068 13.7388 6.44568 13.7388C6.53193 13.7388 6.61881 13.715 6.69693 13.665C6.86193 13.56 10.7426 11.0775 11.7519 10.2238C12.9407 9.21752 13.6519 7.74252 13.6538 6.27877V6.26814C13.6501 3.53877 11.5101 1.40127 8.77881 1.40064V1.40127ZM11.1457 9.50877C10.4369 10.1088 8.10693 11.6369 6.91318 12.4106V10.4188C6.91318 10.16 6.70381 9.95002 6.44443 9.95002H6.19693C3.90943 9.95002 2.24818 8.40252 2.24818 6.27127C2.24818 4.06252 3.97818 2.33252 6.18568 2.33252L8.77756 2.33877H8.77881C10.9863 2.33877 12.7163 4.06752 12.7176 6.27377C12.7157 7.46752 12.1288 8.67627 11.1463 9.50877H11.1457Z"
                fill="#657786"
              />
            </svg>
            <span class="reply-count">{{ user.tweetCount }}</span>
          </div>
          <div class="activity-like">
            <svg
              width="24"
              height="24"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 13.5239H7.49125C5.87687 13.4939 1.21875 9.28514 1.21875 5.29889C1.21875 3.38389 2.79687 1.70264 4.59562 1.70264C6.02687 1.70264 6.98937 2.69014 7.49937 3.40889C8.00812 2.69139 8.97062 1.70264 10.4025 1.70264C12.2025 1.70264 13.78 3.38389 13.78 5.29951C13.78 9.28451 9.12125 13.4933 7.50687 13.5226H7.5V13.5239ZM4.59625 2.64076C3.29625 2.64076 2.15687 3.88326 2.15687 5.30014C2.15687 8.88764 6.55312 12.5476 7.50062 12.5864C8.44937 12.5476 12.8444 8.88826 12.8444 5.30014C12.8444 3.88326 11.705 2.64076 10.405 2.64076C8.825 2.64076 7.9425 4.47576 7.935 4.49389C7.79125 4.84514 7.2125 4.84514 7.06812 4.49389C7.05937 4.47514 6.1775 2.64076 4.59687 2.64076H4.59625Z"
                fill="#657786"
              />
            </svg>
            <span class="like-count">{{ user.likeCount }}</span>
          </div>
        </div>
        <div class="followship">
          <div class="followings-info">
            <span class="followship-count">{{ user.followingCount }}個</span>
            <span class="followship-unit">跟隨中</span>
          </div>
          <div class="followers-info">
            <span class="followship-count">{{ user.followerCount }}位</span>
            <span class="followship-unit">跟隨者</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-cards-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, 245px);
  grid-gap: 15px;
  margin-top: 18px;
  margin-left: 15px;
}

.user-card {
  position: relative;
  width: 245px;
  height: 314px;
  background: #f6f7f8;
  border-radius: 10px;
}

.user-cover {
  width: 245px;
  height: 140px;
  border-radius: 10px 10px 0px 0px;
}

.user-avatar {
  position: absolute;
  left: 50%;
  top: 68px;
  transform: translate(-50%, 0);
  width: 100px;
  height: 100px;
  border: 4px solid #ffffff;
  border-radius: 50px;
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-name {
  margin-top: 33px;
  font-weight: 900;
  font-size: 15px;
  line-height: 22px;
}

.user-account {
  margin-top: 2px;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}

.activity {
  display: flex;
  justify-content: center;
  min-width: 130px;
  height: 24px;
  margin-top: 15px;
}

.activity-reply,
.activity-like {
  display: flex;
  align-items: center;
}

.activity-like {
  margin-left: 16.95px;
}

span.reply-count,
span.like-count {
  margin-left: 7.15px;
}

.followship {
  display: flex;
  align-items: center;
  min-width: 150px;
  height: 20px;
  margin-top: 15px;
}

.followers-info {
  margin-left: 5px;
}

.followship-unit {
  color: #657786;
}

.followship-count,
.followship-unit {
  font-size: 14px;
}
</style>

<script>
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'

export default {
  name: 'AdminUsersCards',
  data() {
    return {
      users: []
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const { data } = await adminAPI.users.get()
        this.users = data.map(user => ({
          id: user.id,
          cover: user.cover,
          avatar: user.avatar,
          name: user.name,
          account: user.account,
          tweetCount: user.tweetCount,
          likeCount: user.likeCount,
          followingCount: user.FollowingCount,
          followerCount: user.FollowerCount
        }))

      }
      catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得所有用戶資訊，請稍後再試'
        })
      }
    }
  },
  created() {
    this.fetchUsers()
  }

}
</script>