<template>
  <div class="admin-sidebar-wrapper">
    <img class="admin-sidebar-logo" alt="logo" src="./../assets/Logo.svg" />
    <div class="navigation">
      <div class="nav-item admin-sidebar-tweets">
        <div class="item">
          <img
            class="admin-sidebar-tweets-icon icon"
            src="./../assets/homeIcon.svg"
          />
          <span class="text admin-sidebar-tweets-text">推文清單</span>
        </div>
      </div>
      <div class="nav-item admin-sidebar-user-list">
        <div class="item">
          <img
            class="admin-sidebar-user-list-icon icon"
            src="./../assets/userSelfIcon.svg"
          />
          <span class="text admin-sidebar-user-list-text">使用者列表</span>
        </div>
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
.admin-sidebar-tweets-text {
  color: #ff6600;
}
.logout {
  position: absolute;
  bottom: 17px;
  left: 111px;
}
</style>
