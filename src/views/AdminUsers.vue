<template>
  <div class="wrapper">
    <AdminSidebar class="admin-side-bar" />

    <div class="center-column">
      <div class="header">
        <div class="header-title">使用者列表</div>
      </div>
      <AdminUsersCards class="admin-user-card" />
    </div>
  </div>
</template>

<script>
import AdminSidebar from './../components/AdminSidebar'
import AdminUsersCards from './../components/AdminUsersCards'

export default {
  name: 'AdminUsers',
  components: {
    AdminSidebar,
    AdminUsersCards,
  },
}
</script>

<style scoped>
.wrapper {
  display: grid;
  width: 100vw;
  grid-template-columns: 378px auto;
  grid-template-rows: 100vh;
}

.admin-side-bar {
  position: fixed;
  z-index: 1;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  padding-left: 103px;
  width: 378px;
  height: 100vh;
}

.center-column {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  border-left: 1px solid #e6ecf0;
}

.header {
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: 55px;
  background: #fff;
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

.admin-user-card {
  margin-top: 70px;
}
</style>
