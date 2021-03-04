<template>
  <div class="container py-5">
    <div class="title text-center">
      <img class="mb-4" src="../assets/Logo.svg" alt="" />
      <h1>建立你的帳號</h1>
    </div>
    <!-- SettingForm -->
    <SettingForm
      @after-submit="handleAfterSubmit"
      :is-processing="isProcessing"
    />
  </div>
</template>


<style scoped>
* {
  box-sizing: border-box;
}

h1 {
  font-weight: bold;
  font-size: 23px;
  line-height: 33px;
}
</style>

<script>
import SettingForm from '../components/SettingForm'
import authorizationAPI from '../apis/authorization'
import { Toast } from '../utils/helpers'

export default {
  name: 'UserSignUp',
  components: {
    SettingForm
  },
  data () {
    return {
      isProcessing: false
    }
  },
  methods: {
    async handleAfterSubmit ({ account, name, email, password, checkPassword }) {

      try {
        this.isProcessing = true
        const { data } = await authorizationAPI.signUp({ account, name, email, password, checkPassword })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$router.push('/signin')

      } catch (error) {
        this.isProcessing = false
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法註冊用戶，請稍後再試'
        })
      }
    }
  }
}

</script>