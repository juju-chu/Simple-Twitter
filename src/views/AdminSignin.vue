
<template>
  <div class="container py-5">
    <div class="title text-center">
      <img class="mb-4" src="../assets/Logo.svg" alt="" />
      <h1 class="h3 font-weight-normal">後台登入</h1>
    </div>
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="signin-form">
        <label class="input-label" for="account">帳號</label>
        <input
          id="account"
          name="account"
          v-model="email"
          type="email"
          class="form-control"
          placeholder=""
          autocomplete="username"
          required
          autofocus
        />
      </div>
      <div class="signin-form">
        <label class="input-label" for="password">密碼</label>
        <input
          id="password"
          name="password"
          v-model="password"
          type="password"
          class="form-control"
          placeholder=""
          minlength="6"
          autocomplete="current-password"
          required
        />
      </div>

      <button
        :disabled="isProcessing"
        class="btn btn-lg btn-primary btn-block"
        type="submit"
      >
        登入
      </button>

      <div class="signup-admin-link">
        <p>
          <router-link to="/signin" class="link">前台登入</router-link>
        </p>
      </div>
    </form>
  </div>
</template>


<style scoped>
* {
  box-sizing: border-box;
}

.signin-form {
  position: relative;
  max-width: 540px;
  max-height: 212px;
  margin: 0 auto;
}

.btn {
  border-radius: 50px;
  background: #ff6600;
  border: none;
  max-width: 540px;
  margin: 30px auto;
}

.signup-admin-link {
  display: flex;
  justify-content: flex-end;
  max-width: 540px;
  max-height: 26px;
  margin: 41px auto;
  color: #007bff;
}

.form-control {
  height: 50px;
  background: #f5f8fa;
  border: none;
  box-shadow: 0 2px 0px 0 #657786;
  margin-top: 20px;
  padding-top: 30px;
  font-size: 19px;
  font-weight: 500;
}

.input-label {
  position: absolute;
  top: 5px;
  left: 10px;
  color: #657786;
  font-weight: 500;
}

.link {
  text-decoration: underline;
}
</style>

<script>
import authorizationAPI from '../apis/authorization'
import { Toast } from '../utils/helpers'

export default {
  data() {
    return {
      email: '',
      password: '',
      isProcessing: false,
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入帳號密碼',
          })
          return
        }

        this.isProcessing = true

        //將authorizationAPI.signIn回傳的response解構賦值給data
        const { data } = await authorizationAPI
          .signIn({
            email: this.email,
            password: this.password,
          })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        //把token保留在local storage中
        localStorage.setItem('token', data.token)

        if (!data.user.isAdmin) {
          Toast.fire({
            icon: 'warning',
            title: '非管理者帳號，自動前往前台登入頁'
          })
          this.$store.commit('revokeCurrentUser')
          this.$router.push('/signin')
        } else {
          //透過setCurrentUser把使用者資料待到vuex的state中
          this.$store.commit('setCurrentUser', data.user)
          this.$router.push("/admin/tweets")
        }
      }
      catch (e) {
        console.log(e)
        this.isProcessing = false
        this.password = ''

        Toast.fire({
          icon: 'warning',
          title: '輸入的帳號密碼有誤',
        })
      }
    }
  },
};

</script>