<template>
  <div class="wrapper">
    <img class="cover" :src="user.cover" />
    <div class="user-info">
      <div class="name">{{ user.name }}</div>
      <div class="account">@{{ user.account }}</div>
      <div class="introduction">{{ user.introduction }}</div>
      <div class="follow">
        <router-link
          class="followings-count"
          :to="{
            name: 'user-followings',
            params: { id: user.id, tab: 'followings' },
          }"
        >
          {{ user.followingsCount }} 個<span>跟隨中</span>
        </router-link>
        <router-link
          class="followers-count"
          :to="{
            name: 'user-followers',
            params: { id: user.id, tab: 'followers' },
          }"
        >
          {{ user.followersCount }} 位<span>跟隨者</span>
        </router-link>
      </div>
    </div>
    <img class="avatar" :src="user.avatar" />
    <div class="btn btn-edit" v-if="isSelf">
      <button class="btn-button" @click.stop.prevent="showModal">
        <span class="btn-text">編輯個人資料</span>
      </button>
    </div>
    <div class="btn-other" v-else>
      <div class="btn btn-message">
        <button>
          <img src="./../assets/btn_messege.svg" />
        </button>
      </div>
      <div class="btn btn-noti">
        <button v-if="!isNoti" @click.stop.prevent="clickNoti">
          <img src="./../assets/btn_noti.svg" />
        </button>
        <button v-else @click.stop.prevent="clickNotiChcek">
          <img src="./../assets/btn_noti_check.svg" />
        </button>
      </div>
      <div class="btn">
        <button
          v-if="isFollowed"
          class="btn-wrapper-followed"
          @click.stop.prevent="deleteFollow"
        >
          <span class="btn-text-followed">正在跟隨</span>
        </button>
        <button
          v-else
          class="btn-wrapper-follow"
          @click.stop.prevent="addFollow"
        >
          <span class="btn-text-follow">跟隨</span>
        </button>
      </div>
    </div>

    <!-- modal -->
    <div class="modal-edit" v-if="isShowModal">
      <div class="modal-edit-wrapper">
        <div class="modal-edit-header">
          <button
            class="modal-edit-icon-close"
            @click.stop.prevent="cancelModal"
          >
            <svg
              class="icon-close"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.414 12.0001L19.207 6.20712C19.597 5.81712 19.597 5.18412 19.207 4.79312C18.817 4.40212 18.184 4.40312 17.793 4.79312L12 10.5861L6.207 4.79312C5.817 4.40312 5.184 4.40312 4.793 4.79312C4.402 5.18312 4.403 5.81612 4.793 6.20712L10.586 12.0001L4.793 17.7931C4.403 18.1831 4.403 18.8161 4.793 19.2071C4.988 19.4021 5.243 19.5001 5.5 19.5001C5.757 19.5001 6.012 19.4021 6.207 19.2071L12 13.4141L17.793 19.2071C17.988 19.4021 18.243 19.5001 18.5 19.5001C18.757 19.5001 19.012 19.4021 19.207 19.2071C19.597 18.8171 19.597 18.1841 19.207 17.7931L13.414 12.0001Z"
                fill="#FF6600"
              />
            </svg>
          </button>
          <span class="modal-edit-header-text">編輯個人資料</span>
        </div>
        <div class="modal-edit-form">
          <form @submit.stop.prevent="handleSubmit">
            <div class="form-group modal-cover-wrapper">
              <img class="modal-cover" :src="user.cover | emptyImage" />
              <label for="cover" class="modal-icon">
                <img
                  class="modal-cover-icon-uploadPhoto"
                  src="./../assets/icon_uploadPhoto.svg"
                />
              </label>
              <input
                id="cover"
                type="file"
                name="cover"
                accept="image/*"
                class="form-control-file modal-input-img"
                @change="handleFileChangeCover"
              />
              <img
                class="modal-cover-icon-delete modal-icon"
                src="./../assets/icon_delete.svg"
              />
            </div>
            <div class="form-group modal-form">
              <img class="modal-avatar" :src="user.avatar | emptyImage" />
              <div class="modal-avatar-background"></div>
              <label
                for="avatar"
                class="modal-icon modal-avatar-icon-uploadPhoto"
              >
                <img src="./../assets/icon_uploadPhoto.svg" />
              </label>
              <input
                id="avatar"
                type="file"
                name="avatar"
                accept="image/*"
                class="form-control-file modal-input-img"
                @change="handleFileChangeAvatar"
              />
            </div>

            <div class="signin-form signin-form-name">
              <label class="input-label" for="name">名稱</label>
              <textarea
                id="name"
                name="name"
                maxlength="50"
                v-model="user.name"
                type="text"
                class="form-control form-control-name"
                autocomplete="username"
                required
                v-focus
                @keyup.esc="cancelModal"
                @keyup.enter="handleSubmit"
              ></textarea>
              <div class="signin-form-name-count">{{ nameCount }}/50</div>
            </div>

            <div class="signin-form signin-form-introduction">
              <label class="input-label" for="introduction">自我介紹</label>
              <textarea
                id="introduction"
                name="introduction"
                rows="3"
                cols="50"
                maxlength="160"
                v-model="user.introduction"
                class="form-control form-control-introduction"
                @keyup.esc="cancelModal"
                @keyup.enter="handleSubmit"
              ></textarea>
              <div class="signin-form-introduction-count">
                {{ introductionCount }}/160
              </div>
            </div>

            <button type="submit" class="save-btn btn btn-primary btn-block">
              <span class="modal-form-btn-text">儲存</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'
import usersAPI from './../apis/users'

export default {
  mixins: [emptyImageFilter],
  name: 'UserCard',
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isShowModal: false,
      user: {
        id: -1,
      },
      nameCount: -1,
      introductionCount: -1,
      initialName: '',
      initialIntroduction: '',
      initialCover: '',
      initialAvatar: '',
      isSelf: false,
      isNoti: false,
      isFollowed: false,
    }
  },
  computed: {
    ...mapState(['currentUser']),
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      },
    },
  },
  watch: {
    initialUser(newValue) {
      this.user = {
        ...this.user,
        ...newValue,
      }
      this.nameCount = this.user.name.length
      if (this.user.introduction.length > 160) {
        this.user.introduction = this.user.introduction.slice(0, 160)
      }
      this.introductionCount = this.user.introduction.length
      this.checkIsSelf()
      this.checkFollow()
    },
    user: {
      handler: function () {
        this.nameCount = this.user.name.length
        this.introductionCount = this.user.introduction.length
      },
      deep: true,
    }
  },
  created() {
    this.checkFollow()
  },
  methods: {
    checkIsSelf() {
      if (this.user.id === this.currentUser.id) {
        this.isSelf = true
      } else {
        this.isSelf = false
      }
    },
    clickNoti() {
      this.isNoti = true
    },
    clickNotiChcek() {
      this.isNoti = false
    },
    async checkFollow() {
      try {
        const { data } = await usersAPI.getFollowers({ userId: this.user.id })
        data.map((follower) => {
          if (follower.id === this.currentUser.id) {
            this.isFollowed = true
          } else {
            this.isFollowed = false
          }
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法讀取追隨狀態，請稍後再試',
        })
      }
    },
    async addFollow() {
      try {
        const { data } = await usersAPI.addFollow({ id: this.user.id })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.isFollowed = true
        this.user.followersCount++
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法新增追隨，請稍後再試',
        })
      }
    },
    async deleteFollow() {
      try {
        const { data } = await usersAPI.deleteFollow({
          followingId: this.user.id,
        })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.isFollowed = false
        this.user.followersCount--
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取消追隨，請稍後再試',
        })
      }
    },
    showModal() {
      this.isShowModal = true
      this.initialName = this.user.name
      this.initialIntroduction = this.user.introduction
      this.initialCover = this.user.cover
      this.initialAvatar = this.user.avatar
    },
    cancelModal() {
      this.isShowModal = false
      this.user.name = this.initialName
      this.user.introduction = this.initialIntroduction
      this.user.cover = this.initialCover
      this.user.avatar = this.initialAvatar
    },
    handleFileChangeCover(e) {
      const { files } = e.target
      if (files.length !== 0) {
        this.user.cover = window.URL.createObjectURL(files[0])
      }
    },
    handleFileChangeAvatar(e) {
      const { files } = e.target
      if (files.length !== 0) {
        this.user.avatar = window.URL.createObjectURL(files[0])
      }
    },
    async handleSubmit(e) {
      if (!this.user.name) {
        Toast.fire({
          icon: 'warning',
          title: '請填寫名稱',
        })
        return
      }

      const form = e.target
      const formData = new FormData(form)
      // for (let [name, value] of formData.entries()) {
      //   console.log(name + ': ' + value)
      // }

      try {
        const { data } = await usersAPI.editInfo({
          userId: this.user.id,
          formData,
        })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.isShowModal = false
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法修改資料，請稍後再試',
        })
        this.cancelModal()
      }
    },
  },
}
</script>

<style scoped>
.wrapper {
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
  top: 178px;
  left: 393px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 4px solid #ffffff;
}

.btn {
  padding: 0;
}

.btn-edit {
  position: absolute;
  top: 264px;
  left: 841px;
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
  margin-bottom: 20px;
}

.followings-count,
.followers-count {
  margin-right: 20px;
  color: #1c1c1c;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
}

.follow span {
  color: #657786;
}

.btn-other {
  position: absolute;
  top: 264px;
  left: 771px;
  display: flex;
  justify-content: flex-end;
  width: auto;
}

.btn-noti {
  margin: 0 10px 0 10px;
}

.btn-wrapper-follow {
  padding: 0;
  width: 92px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #ff6600;
  border-radius: 100px;
}

.btn-text-follow {
  line-height: 40px;
  font-weight: bold;
  font-size: 15px;
  color: #ff6600;
}

.btn-wrapper-followed {
  padding: 0;
  width: 92px;
  height: 40px;
  background: #ff6600;
  border: 1px solid #ff6600;
  border-radius: 100px;
}

.btn-text-followed {
  line-height: 40px;
  font-weight: bold;
  font-size: 15px;
  color: #ffffff;
}

.modal-edit {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
}

.modal-edit-wrapper {
  position: absolute;
  top: 54px;
  left: 50vh;
  transform: translate(0, 0);

  width: 600px;
  height: 654px;
  background: #ffffff;
  border-radius: 14px;
}

.modal-edit-header {
  height: 55px;
}

.modal-edit-icon-close {
  margin-top: 15px;
  margin-left: 15px;
}

.modal-edit-header-text {
  position: absolute;
  top: 13px;
  left: 79px;
  font-weight: bold;
  font-size: 19px;
  color: #1c1c1c;
}

.modal-form {
  position: relative;
}

.modal-input-img {
  display: none;
}

.modal-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.modal-cover-wrapper {
  position: relative;
  width: 600px;
  height: 200px;
  margin: 0;
}

.modal-cover {
  width: 600px;
  height: 200px;
  opacity: 0.6;
}

.modal-cover-icon-uploadPhoto {
  position: absolute;
  top: 88px;
  left: 260px;
}

.modal-cover-icon-delete {
  position: absolute;
  top: 88px;
  left: 314px;
}

.modal-avatar {
  position: absolute;
  top: -60px;
  left: 15px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #ffffff;
}

.modal-avatar-background {
  position: absolute;
  top: -60px;
  left: 15px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: rgba(200, 200, 200, 0.3);
}

.modal-avatar-icon-uploadPhoto {
  position: absolute;
  top: -15px;
  left: 63px;
}

.modal-form-btn-text {
  font-weight: 500;
  font-size: 18px;
  color: #ffffff;
}

.save-btn {
  position: absolute;
  top: 12px;
  left: 521px;
  background: #ff6600;
  color: white;
  width: 64px;
  height: 30px;
  border-radius: 50px;
  border: none;
}

.signin-form {
  position: relative;
  width: 570px;
  max-height: 212px;
  margin-left: 15px;
  background: #f5f8fa;
  box-shadow: 0 2px 0px 0 #657786;
}

.signin-form-name {
  margin-top: 80px;
  margin-bottom: 43px;
}

.signin-form-introduction {
  display: flex;
  height: 150px;
}

.input-label {
  position: absolute;
  top: 5px;
  left: 15px;
  margin: 0;
  font-weight: 500;
  font-size: 15px;
  color: #657786;
}

.form-control {
  padding: 24px 0 0 15px;
  text-align: start;
  font-weight: 500;
  font-size: 19px;
  color: #1c1c1c;
  border: none;
  background: #f5f8fa;
  box-shadow: none;
}

.form-control-name {
  height: 54px;
}

.form-control-introduction {
  width: 570px;
  height: 150px;
}
</style>
