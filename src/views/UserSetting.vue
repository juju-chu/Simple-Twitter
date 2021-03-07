<template>
  <div class="wrapper">
    <SideBar class="side-bar" />

    <div class="center-column">
      <header>帳戶設定</header>
      <div class="form-wrapper">
        <SettingForm
          :initial-user-data="userData"
          :isUserSetting="isUserSetting"
          :is-processing="isProcessing"
          @after-submit="handleAfterSubmit"
          class="setting-form"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 378px 1063px;
  grid-template-rows: 100vh;
}

.side-bar {
  position: fixed;
  z-index: 2;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  padding-left: 103px;
  width: 378px;
  height: 100vh;
  border-right: 1px solid #e6ecf0;
}

.center-column {
  position: relative;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  height: 100vh;
}

header {
  height: 55px;
  padding-top: 13px;
  padding-bottom: 14px;
  padding-left: 23.69px;
  font-size: 19px;
  border-bottom: 1px solid #e6ecf0;
}

.form-wrapper {
  position: absolute;
  top: 85px;
  left: 16px;
}

.forms {
  width: 642px;
}

.form-control {
  margin-bottom: 32px;
}
</style>

<script>
import SideBar from '../components/SideBar'
import SettingForm from '../components/SettingForm'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

export default {
  name: 'UserSetting',
  data() {
    return {
      userData: {
        id: -1,
        account: '',
        name: '',
        email: '',
        password: '',
      },
      isUserSetting: true,
      isProcessing: false,
    }
  },
  components: {
    SideBar,
    SettingForm,
  },
  methods: {
    async fetchUserData(userId) {
      try {
        const { data } = await usersAPI.get({ userId })

        this.userData = {
          ...this.userData,
          id: data.id,
          account: data.account,
          name: data.name,
          email: data.email,
          password: data.password,
        }
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資訊，請稍後再試',
        })
      }
    },
    async handleAfterSubmit({ account, name, email, password, checkPassword }) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.updateUser({
          id: this.$route.params,
          account,
          name,
          email,
          password,
          checkPassword,
        })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$router.push('/signin')
      } catch (error) {
        this.isProcessing = false
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法更新用戶資訊，請稍後再試',
        })
      }
    },
  },
  created() {
    const { id } = this.$route.params
    this.fetchUserData(id)
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = this.$route.params
    this.fetchUserData(id)
    next()
  },
}
</script>
