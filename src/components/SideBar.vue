<template>
  <div class="sidebar-wrapper">
    <img class="sidebar-logo" alt="logo" src="./../assets/Logo.svg" />
    <div class="navigation">
      <div class="nav-item sidebar-tweets">
        <router-link to="/tweets" class="item">
          <svg
            class="sidebar-tweets-icon icon"
            width="24"
            height="22"
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.58 6.34986L12.475 0.896855C12.178 0.736855 11.821 0.736855 11.525 0.896855L1.42496 6.34986C0.938957 6.61386 0.757957 7.21986 1.01996 7.70586C1.19996 8.04086 1.54496 8.23086 1.89996 8.23086C2.05996 8.23086 2.22396 8.19286 2.37496 8.11086L3.10896 7.71486L4.69896 18.9649C4.91496 20.1789 6.00896 21.0269 7.35896 21.0269H16.641C17.991 21.0269 19.085 20.1789 19.303 18.9389L20.891 7.71386L21.628 8.11186C22.113 8.37486 22.72 8.19386 22.982 7.70786C23.245 7.22186 23.062 6.61486 22.578 6.35286L22.58 6.34986ZM12 14.4349C10.205 14.4349 8.74996 12.9799 8.74996 11.1849C8.74996 9.38986 10.205 7.93486 12 7.93486C13.795 7.93486 15.25 9.38986 15.25 11.1849C15.25 12.9799 13.795 14.4349 12 14.4349Z"
              fill="#1C1C1C"
            />
          </svg>
          <span class="text sidebar-tweets-text">首頁</span>
        </router-link>
      </div>
      <div class="nav-item sidebar-notify">
        <router-link to="/notifications" class="item">
          <svg
            v-if="isNotify"
            class="icon-spot-noti"
            width="7"
            height="7"
            viewBox="0 0 7 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="3" r="3.5" fill="#FF6600" stroke="white" />
          </svg>
          <svg
            class="icon"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.697 15.468C19.677 15.452 17.557 13.828 17.594 9.43799C17.614 6.90599 16.782 4.65599 15.247 3.10299C13.872 1.70999 12.01 0.939993 10.005 0.929993H9.992C7.988 0.939993 6.126 1.70999 4.75 3.10399C3.216 4.65699 2.382 6.90599 2.404 9.43799C2.441 13.768 0.384001 15.405 0.302002 15.468C0.0420015 15.661 -0.0639986 15.998 0.0370014 16.306C0.139001 16.614 0.427002 16.821 0.749002 16.821H5.669C5.771 19.131 7.666 20.981 9.999 20.981C12.332 20.981 14.225 19.131 14.326 16.821H19.248C19.57 16.821 19.858 16.615 19.958 16.307C20.061 16 19.955 15.662 19.695 15.469L19.697 15.468ZM10 19.478C8.495 19.478 7.27 18.301 7.172 16.82H12.828C12.728 18.3 11.505 19.48 10 19.48V19.478ZM2.38 15.32C3.12 14.188 3.928 12.292 3.904 9.42399C3.886 7.26399 4.548 5.44199 5.817 4.15699C6.91 3.04999 8.397 2.43699 10 2.42999C11.603 2.43799 13.087 3.04999 14.18 4.15799C15.45 5.44299 16.113 7.26399 16.095 9.42499C16.071 12.293 16.88 14.19 17.62 15.321H2.38V15.32Z"
              fill="black"
            />
          </svg>
          <span class="text sidebar-notify-text">通知</span>
        </router-link>
      </div>
      <div class="nav-item sidebar-public">
        <router-link to="/public-messages" class="item">
          <svg
            v-if="isPublic"
            class="icon-spot-msg"
            width="7"
            height="7"
            viewBox="0 0 7 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="3" r="3.5" fill="#FF6600" stroke="white" />
          </svg>
          <svg
            class="icon"
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.25 0.0180054H2.75C1.233 0.0180054 0 1.25201 0 2.77001V15.265C0 16.783 1.233 18.018 2.75 18.018H17.25C18.767 18.018 20 16.783 20 15.265V2.77001C20 1.25201 18.767 0.0180054 17.25 0.0180054ZM2.75 1.51801H17.25C17.94 1.51801 18.5 2.07801 18.5 2.76801V3.48201L10.45 8.84901C10.177 9.02901 9.824 9.03101 9.55 8.84701L1.5 3.48201V2.76801C1.5 2.07801 2.06 1.51801 2.75 1.51801ZM17.25 16.516H2.75C2.06 16.516 1.5 15.956 1.5 15.266V5.24001L8.74 10.07C9.123 10.326 9.562 10.454 10 10.454C10.44 10.454 10.877 10.326 11.26 10.071L18.5 5.24101V15.263C18.5 15.953 17.94 16.513 17.25 16.513V16.516Z"
              fill="black"
            />
          </svg>
          <span class="text sidebar-public-text">公開聊天室</span>
        </router-link>
      </div>
      <div class="nav-item sidebar-private">
        <router-link to="/private-messages" class="item">
          <svg
            v-if="isPrivate"
            class="icon-spot-msg"
            width="7"
            height="7"
            viewBox="0 0 7 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="3" r="3.5" fill="#FF6600" stroke="white" />
          </svg>
          <svg
            class="icon"
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.25 0.0180054H2.75C1.233 0.0180054 0 1.25201 0 2.77001V15.265C0 16.783 1.233 18.018 2.75 18.018H17.25C18.767 18.018 20 16.783 20 15.265V2.77001C20 1.25201 18.767 0.0180054 17.25 0.0180054ZM2.75 1.51801H17.25C17.94 1.51801 18.5 2.07801 18.5 2.76801V3.48201L10.45 8.84901C10.177 9.02901 9.824 9.03101 9.55 8.84701L1.5 3.48201V2.76801C1.5 2.07801 2.06 1.51801 2.75 1.51801ZM17.25 16.516H2.75C2.06 16.516 1.5 15.956 1.5 15.266V5.24001L8.74 10.07C9.123 10.326 9.562 10.454 10 10.454C10.44 10.454 10.877 10.326 11.26 10.071L18.5 5.24101V15.263C18.5 15.953 17.94 16.513 17.25 16.513V16.516Z"
              fill="black"
            />
          </svg>
          <span class="text sidebar-private-text">私人訊息</span>
        </router-link>
      </div>
      <div class="nav-item sidebar-user-self">
        <router-link
          class="item"
          :to="{ name: 'user', params: { id: currentUser.id } }"
        >
          <svg
            class="sidebar-user-self-icon icon"
            width="18"
            height="21"
            viewBox="0 0 18 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.99991 10.8158C10.3549 10.8158 11.8719 10.6658 12.8399 9.55976C13.6539 8.62976 13.9179 7.19176 13.6459 5.16776C13.2659 2.34276 11.5289 0.655762 8.99991 0.655762C6.47091 0.655762 4.73391 2.34276 4.35391 5.16976C4.08191 7.19176 4.3459 8.62976 5.1599 9.55976C6.1279 10.6668 7.64491 10.8158 8.99991 10.8158ZM5.83991 5.36776C6.00191 4.16776 6.62691 2.15576 8.99991 2.15576C11.3729 2.15576 11.9979 4.16876 12.1599 5.36776C12.3669 6.91776 12.2169 7.99476 11.7099 8.57276C11.2549 9.09276 10.4439 9.31576 8.99991 9.31576C7.55591 9.31576 6.7449 9.09276 6.28991 8.57276C5.78291 7.99476 5.63291 6.91676 5.83991 5.36776ZM17.2799 18.2358C16.4029 14.7098 12.9979 12.2458 8.99991 12.2458C5.00191 12.2458 1.59691 14.7098 0.719905 18.2358C0.547905 18.9278 0.691905 19.6358 1.1149 20.1758C1.5229 20.6958 2.15491 20.9958 2.84791 20.9958H15.1519C15.8449 20.9958 16.4769 20.6958 16.8849 20.1758C17.3089 19.6358 17.4519 18.9288 17.2789 18.2358H17.2799ZM15.7039 19.2518C15.5779 19.4118 15.3879 19.4978 15.1519 19.4978H2.84791C2.61291 19.4978 2.42191 19.4128 2.29591 19.2518C2.15891 19.0778 2.11591 18.8398 2.17591 18.5978C2.88591 15.7428 5.69291 13.7478 8.99991 13.7478C12.3069 13.7478 15.1139 15.7418 15.8239 18.5978C15.8839 18.8398 15.8409 19.0778 15.7039 19.2518Z"
              :fill="iconColor"
            />
          </svg>

          <span class="text sidebar-user-self-text" :class="active"
            >個人資料</span
          ></router-link
        >
      </div>
      <div class="nav-item sidebar-user-setting">
        <router-link
          class="item"
          :to="{ name: 'user-setting', params: { id: currentUser.id } }"
        >
          <svg
            class="sidebar-user-icon icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 8.20996C9.90996 8.20996 8.20996 9.90996 8.20996 12C8.20996 14.09 9.90996 15.79 12 15.79C14.09 15.79 15.79 14.09 15.79 12C15.79 9.90996 14.09 8.20996 12 8.20996ZM12 14.29C10.738 14.29 9.70996 13.264 9.70996 12C9.70996 10.736 10.74 9.70996 12 9.70996C13.26 9.70996 14.29 10.736 14.29 12C14.29 13.264 13.262 14.29 12 14.29Z"
              fill="#1C1C1C"
            />
            <path
              d="M12.36 22.375H11.638C10.455 22.375 9.48405 21.487 9.37605 20.311L9.36205 20.164C9.33705 19.877 9.15505 19.631 8.89005 19.52C8.60405 19.4 8.30805 19.455 8.09205 19.635L7.97605 19.732C7.10805 20.457 5.72305 20.395 4.91605 19.592L4.40605 19.082C3.57005 18.242 3.51005 16.928 4.26605 16.022L4.36405 15.904C4.55005 15.682 4.59405 15.381 4.48605 15.117C4.37605 14.845 4.12805 14.663 3.84005 14.637L3.69005 14.623C2.51005 14.516 1.62305 13.543 1.62305 12.361V11.639C1.62305 10.456 2.51105 9.485 3.68705 9.377L3.84305 9.363C4.12805 9.338 4.37305 9.156 4.48505 8.89C4.59505 8.62 4.55005 8.317 4.36505 8.095L4.27105 7.979C3.51405 7.071 3.57305 5.756 4.40805 4.919L4.92005 4.407C5.72405 3.603 7.10805 3.542 7.98005 4.267L8.09605 4.365C8.31405 4.549 8.62405 4.595 8.88605 4.487C9.15605 4.375 9.33805 4.129 9.36305 3.844L9.37705 3.691C9.48405 2.511 10.457 1.625 11.639 1.625H12.361C13.544 1.625 14.515 2.513 14.623 3.689L14.637 3.845C14.662 4.13 14.843 4.375 15.109 4.485C15.386 4.602 15.689 4.547 15.903 4.368L16.023 4.266C16.89 3.543 18.277 3.604 19.083 4.406L19.593 4.918C20.429 5.756 20.489 7.071 19.733 7.978L19.633 8.096C19.445 8.316 19.399 8.618 19.51 8.884C19.622 9.154 19.87 9.334 20.156 9.362L20.308 9.376C21.488 9.483 22.375 10.456 22.375 11.638V12.361C22.375 13.544 21.487 14.515 20.311 14.623L20.156 14.637C19.872 14.661 19.626 14.842 19.516 15.107C19.403 15.379 19.449 15.681 19.633 15.902L19.733 16.022C20.489 16.927 20.429 18.242 19.593 19.082L19.083 19.592C18.276 20.396 16.893 20.456 16.023 19.732L15.908 19.636C15.691 19.453 15.378 19.406 15.118 19.514C14.845 19.628 14.663 19.874 14.638 20.16L14.624 20.31C14.517 21.483 13.544 22.37 12.362 22.37L12.36 22.375ZM8.58705 17.955C8.88705 17.955 9.18005 18.015 9.45705 18.13C10.247 18.458 10.781 19.184 10.857 20.026L10.871 20.173C10.908 20.573 11.238 20.873 11.641 20.873H12.363C12.763 20.873 13.093 20.573 13.131 20.173L13.145 20.025C13.221 19.183 13.755 18.458 14.537 18.133C15.33 17.803 16.233 17.951 16.87 18.483L16.983 18.577C17.161 18.725 17.349 18.757 17.476 18.757C17.682 18.757 17.876 18.677 18.022 18.53L18.532 18.02C18.816 17.736 18.837 17.29 18.58 16.982L18.48 16.862C17.938 16.212 17.803 15.322 18.128 14.539C18.454 13.749 19.18 13.219 20.022 13.142L20.177 13.128C20.574 13.091 20.877 12.761 20.877 12.358V11.636C20.877 11.236 20.574 10.906 20.175 10.868L20.023 10.854C19.177 10.776 18.453 10.244 18.128 9.461C17.802 8.673 17.938 7.783 18.481 7.134L18.581 7.016C18.838 6.706 18.817 6.26 18.533 5.976L18.023 5.466C17.877 5.319 17.683 5.239 17.477 5.239C17.35 5.239 17.162 5.271 16.985 5.419L16.865 5.519C16.231 6.047 15.315 6.189 14.543 5.873C13.755 5.546 13.223 4.821 13.146 3.977L13.132 3.822C13.097 3.425 12.767 3.122 12.365 3.122H11.642C11.242 3.122 10.912 3.425 10.874 3.824L10.86 3.976C10.784 4.819 10.252 5.544 9.47005 5.869C8.68305 6.195 7.77705 6.052 7.14005 5.519L7.02205 5.423C6.84205 5.273 6.65405 5.243 6.52705 5.243C6.32105 5.243 6.12705 5.323 5.98105 5.469L5.46905 5.979C5.18705 6.263 5.16605 6.709 5.42305 7.017L5.52305 7.135C6.06305 7.788 6.20005 8.679 5.87505 9.46C5.54805 10.248 4.82305 10.78 3.98005 10.857L3.82405 10.871C3.42705 10.908 3.12405 11.238 3.12405 11.641V12.363C3.12405 12.763 3.42705 13.093 3.82605 13.131L3.97605 13.145C4.82405 13.223 5.54905 13.757 5.87305 14.541C6.19805 15.327 6.06305 16.216 5.52005 16.866L5.42405 16.981C5.16405 17.291 5.18605 17.737 5.47005 18.021L5.98005 18.531C6.12605 18.678 6.32005 18.758 6.52605 18.758C6.65305 18.758 6.84105 18.728 7.01805 18.578L7.13405 18.482C7.54005 18.146 8.05705 17.958 8.58705 17.958V17.955Z"
              fill="#1C1C1C"
            />
          </svg>

          <span class="text sidebar-user-text">設定</span>
        </router-link>
      </div>
      <div class="nav-item">
        <button
          class="sidebar-btn btn"
          type="button"
          @click.stop.prevent="showModal"
        >
          <span class="sidebar-btn-text">推文</span>
        </button>
      </div>
    </div>
    <div class="nav-item logout">
      <button class="item" @click.stop.prevent="logout">
        <img class="icon logout-icon" src="./../assets/logoutIcon.svg" />
        <span class="text logout-text">登出</span>
      </button>
    </div>

    <!-- modal -->
    <div class="post-tweet" v-if="isShowModal">
      <div class="post-tweet-modal">
        <div class="post-tweet-modal-header">
          <button @click.stop.prevent="cancelModal">
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
        </div>
        <div class="post-tweet-modal-tweet">
          <img class="tweet-avatar" :src="currentUser.avatar | emptyImage" />
          <textarea
            class="tweet-text"
            placeholder="有什麼新鮮事？"
            maxlength="140"
            v-model="newTweet"
            v-focus
            @keyup.esc="cancelModal"
          ></textarea>
        </div>
        <div class="post-tweet-model-button">
          <button
            class="post-tweet-model-btn"
            @click.stop.prevent="postTweet(newTweet)"
            :disabled="isProcessing"
            :class="{ disabled: isProcessing }"
          >
            <span class="post-tweet-model-btn-text">推文</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tweetsAPI from './../apis/tweets'
import { mapState } from 'vuex'
import { emptyImageFilter } from './../utils/mixins'
import { Toast } from './../utils/helpers'
export default {
  mixins: [emptyImageFilter],
  name: 'SideBar',
  data() {
    return {
      iconColor: '#1C1C1C',
      active: '',
      isShowModal: false,
      newTweet: '',
      userId: -1,
      isProcessing: false,
      isNotify: false,
      isPublic: false,
      isPrivate: false,
    }
  },
  computed: {
    ...mapState(['currentUser']),
  },
  watch: {
    $route(to) {
      if (this.userId !== to.params.id) {
        this.controlIconColor()
      }

      this.userId = to.params.id
    },
    newTweet(newValue) {
      if (newValue.length === 140) {
        Toast.fire({
          icon: 'warning',
          title: '已達字數上限',
        })
      }
    },
  },
  created() {
    this.controlIconColor()
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      },
    },
  },
  methods: {
    controlIconColor() {
      const { id } = this.$route.params
      if (
        this.$route.name.includes('user') &&
        Number(id) === this.currentUser.id &&
        !this.$route.name.includes('setting')
      ) {
        this.iconColor = '#FF6600'
        this.active = 'activeIcon'
      } else {
        this.iconColor = '#1C1C1C'
        this.active = ''
      }
    },
    showModal() {
      this.isShowModal = true
    },
    cancelModal() {
      this.isShowModal = false
    },
    async postTweet(newTweet) {
      if (this.newTweet.trim() === '') {
        Toast.fire({
          icon: 'warning',
          title: '尚未輸入內容',
        })
        return
      }
      try {
        this.isProcessing = true
        const { data } = await tweetsAPI.post({ newTweet })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.newTweet = ''
        this.isShowModal = false
        this.isProcessing = false
        this.$emit('after-post-tweet')
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法新增推文，請稍後再試',
        })
        this.isProcessing = false
      }
    },
    logout() {
      this.$store.commit('revokeCurrentUser')
      this.$router.push('/signin')
    },
  },
}
</script>

<style scoped>
.sidebar-wrapper {
  position: relative;
  margin: 0;
}

.sidebar-logo {
  margin-top: 14px;
  width: 30px;
  height: 30px;
}

.navigation {
  width: 235px;
  height: 240px;
  margin-top: 24px;
}

.nav-item {
  display: flex;
  align-items: center;
  width: 235px;
  height: 60px;
}

.item {
  position: relative;
  display: flex;
}

.router-link-exact-active span {
  color: #ff6600;
}

.router-link-exact-active path {
  fill: #ff6600;
}

.icon {
  margin-right: 20px;
  width: 24px;
  height: 24px;
}

.icon-spot-noti {
  position: absolute;
  top: 0;
  left: 16px;
}

.icon-spot-msg {
  position: absolute;
  top: -2px;
  left: 19px;
}

.text {
  line-height: 26px;
  font-weight: 700;
  font-size: 18px;
  color: #1c1c1c;
}

.activeIcon {
  color: #ff6600;
}

.sidebar-btn,
.post-tweet-model-btn {
  width: 210px;
  height: 45px;
  background: #ff6600;
  border: none;
  border-radius: 100px;
}

.sidebar-btn-text,
.post-tweet-model-btn-text {
  color: #ffffff;
}

.post-tweet-model-button {
  position: absolute;
  bottom: 15px;
  right: 15px;
}

.post-tweet-model-btn {
  width: 64px;
  height: 40px;
}

.disabled {
  background: #ecbd9e;
}

.post-tweet {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
}

.post-tweet-modal {
  position: absolute;
  top: 54px;
  left: 50vh;
  transform: translate(0, 0);

  width: 600px;
  height: 300px;
  background: #ffffff;
  border-radius: 14px;
}

.post-tweet-modal-header {
  margin-top: 15px;
  height: 40px;
  border-bottom: 1px solid #e6ecf0;
}

.icon-close {
  margin-left: 15px;
}

.post-tweet-modal-tweet {
  display: flex;
  margin-top: 15px;
  margin-left: 15px;
}

.tweet-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.tweet-text {
  width: 600px;
  height: 100px;
  margin-left: 10px;
  border: none;
  resize: none;
  overflow-wrap: anywhere;
}

.logout {
  position: absolute;
  bottom: 17px;
  left: 111px;
}
</style>
