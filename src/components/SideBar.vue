<template>
  <div class="sidebar-wrapper">
    <img class="sidebar-logo" alt="logo" src="./../assets/Logo.svg" />
    <div class="navigation">
      <div class="nav-item sidebar-tweets">
        <div class="item">
          <img
            class="sidebar-tweets-icon icon"
            src="./../assets/homeIcon.svg"
          />
          <span class="text sidebar-tweets-text">首頁</span>
        </div>
      </div>
      <div class="nav-item sidebar-user-self">
        <div class="item">
          <img
            class="sidebar-user-self-icon icon"
            src="./../assets/userSelfIcon.svg"
          />
          <span class="text sidebar-user-self-text">個人資料</span>
        </div>
      </div>
      <div class="nav-item sidebar-user-setting">
        <div class="item">
          <img
            class="sidebar-user-icon icon"
            src="./../assets/userSettingIcon.svg"
          />
          <span class="text sidebar-user-text">設定</span>
        </div>
      </div>
      <div class="nav-item">
        <button class="sidebar-btn btn" type="button">
          <span class="sidebar-btn-text">推文</span>
        </button>
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
.sidebar-tweets-text {
  color: #ff6600;
}
.sidebar-btn {
  width: 210px;
  height: 45px;
  background: #ff6600;
  border: none;
  border-radius: 100px;
}
.sidebar-btn-text {
  color: #ffffff;
}
.logout {
  position: absolute;
  bottom: 17px;
  left: 111px;
}
</style>