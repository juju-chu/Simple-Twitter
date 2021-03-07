<template>
  <div class="admin-sidebar-wrapper">
    <img class="admin-sidebar-logo" alt="logo" src="./../assets/Logo.svg" />
    <div class="navigation">
      <div class="nav-item admin-sidebar-tweets">
        <router-link to="/admin/tweets" class="item">
          <svg
            class="admin-sidebar-tweets-icon icon"
            width="24"
            height="22"
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.58 6.34986L12.475 0.896855C12.178 0.736855 11.821 0.736855 11.525 0.896855L1.42496 6.34986C0.938957 6.61386 0.757957 7.21986 1.01996 7.70586C1.19996 8.04086 1.54496 8.23086 1.89996 8.23086C2.05996 8.23086 2.22396 8.19286 2.37496 8.11086L3.10896 7.71486L4.69896 18.9649C4.91496 20.1789 6.00896 21.0269 7.35896 21.0269H16.641C17.991 21.0269 19.085 20.1789 19.303 18.9389L20.891 7.71386L21.628 8.11186C22.113 8.37486 22.72 8.19386 22.982 7.70786C23.245 7.22186 23.062 6.61486 22.578 6.35286L22.58 6.34986ZM12 14.4349C10.205 14.4349 8.74996 12.9799 8.74996 11.1849C8.74996 9.38986 10.205 7.93486 12 7.93486C13.795 7.93486 15.25 9.38986 15.25 11.1849C15.25 12.9799 13.795 14.4349 12 14.4349Z"
              :fill="iconColor[0]"
            />
          </svg>
          <span class="text admin-sidebar-tweets-text" :class="active[0]"
            >推文清單</span
          >
        </router-link>
      </div>
      <div class="nav-item admin-sidebar-user-list">
        <router-link to="/admin/users" class="item">
          <svg
            class="admin-sidebar-user-self-icon icon"
            width="18"
            height="21"
            viewBox="0 0 18 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.99991 10.8158C10.3549 10.8158 11.8719 10.6658 12.8399 9.55976C13.6539 8.62976 13.9179 7.19176 13.6459 5.16776C13.2659 2.34276 11.5289 0.655762 8.99991 0.655762C6.47091 0.655762 4.73391 2.34276 4.35391 5.16976C4.08191 7.19176 4.3459 8.62976 5.1599 9.55976C6.1279 10.6668 7.64491 10.8158 8.99991 10.8158ZM5.83991 5.36776C6.00191 4.16776 6.62691 2.15576 8.99991 2.15576C11.3729 2.15576 11.9979 4.16876 12.1599 5.36776C12.3669 6.91776 12.2169 7.99476 11.7099 8.57276C11.2549 9.09276 10.4439 9.31576 8.99991 9.31576C7.55591 9.31576 6.7449 9.09276 6.28991 8.57276C5.78291 7.99476 5.63291 6.91676 5.83991 5.36776ZM17.2799 18.2358C16.4029 14.7098 12.9979 12.2458 8.99991 12.2458C5.00191 12.2458 1.59691 14.7098 0.719905 18.2358C0.547905 18.9278 0.691905 19.6358 1.1149 20.1758C1.5229 20.6958 2.15491 20.9958 2.84791 20.9958H15.1519C15.8449 20.9958 16.4769 20.6958 16.8849 20.1758C17.3089 19.6358 17.4519 18.9288 17.2789 18.2358H17.2799ZM15.7039 19.2518C15.5779 19.4118 15.3879 19.4978 15.1519 19.4978H2.84791C2.61291 19.4978 2.42191 19.4128 2.29591 19.2518C2.15891 19.0778 2.11591 18.8398 2.17591 18.5978C2.88591 15.7428 5.69291 13.7478 8.99991 13.7478C12.3069 13.7478 15.1139 15.7418 15.8239 18.5978C15.8839 18.8398 15.8409 19.0778 15.7039 19.2518Z"
              :fill="iconColor[1]"
            />
          </svg>
          <span class="text admin-sidebar-user-list-text" :class="active[1]"
            >使用者列表</span
          >
        </router-link>
      </div>
    </div>
    <div class="nav-item logout">
      <div class="item">
        <img class="icon logout-icon" src="./../assets/logoutIcon.svg" />
        <span class="text logout-text">登出</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminSideBar',
  data() {
    return {
      iconColor: ['black', 'black'],
      active: ['normal', 'normal'],
    }
  },
  props: {
    iconColorController: {
      type: String,
      required: true,
    },
  },
  created() {
    this.controlIconColor()
  },
  methods: {
    controlIconColor() {
      switch (this.iconColorController) {
        case 'AdminTweets':
          this.iconColor[0] = '#FF6600'
          this.active[0] = 'activeIcon'
          break
        case 'AdminUsersList':
          this.iconColor[1] = '#FF6600'
          this.active[1] = 'activeIcon'
          break
      }
    },
  },
}
</script>

<style scoped>
.admin-sidebar-logo {
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
  display: flex;
}
.icon {
  margin-right: 20px;
  width: 24px;
  height: 24px;
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
.logout {
  position: absolute;
  bottom: 17px;
  left: 111px;
}
</style>
