<template>
  <div class="wrapper">
    <AdminSidebar class="admin-side-bar" iconColorController="AdminTweets" />

    <div class="center-column">
      <div class="header">
        <div class="header-title">使用者列表</div>
      </div>
      <AdminUsersCards class="admin-user-card" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 378px 1062px;
  grid-template-rows: auto;
}
.admin-side-bar {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  margin-top: 4px;
  margin-left: 103px;
  width: 235px;
  height: 1196px;
}
.center-column {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  border-left: 1px solid #e6ecf0;
}
.header {
  width: auto;
  height: 55px;
  border-bottom: 1px solid #e6ecf0;
}
.header-title {
  margin-left: 15px;
  line-height: 55px;

  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #1c1c1c;
}
</style>

<script>
import AdminSidebar from './../components/AdminSidebar'
import AdminUsersCards from './../components/AdminUsersCards'

export default {
  name: 'AdminUsers',
  components: {
    AdminSidebar,
    AdminUsersCards
  },
}
</script>