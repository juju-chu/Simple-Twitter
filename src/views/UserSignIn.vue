
<template>
  <div class="container py-5">
    <div class="title text-center">
      <img class="mb-4" src="../assets/Logo.svg" alt="" />
      <h1>登入 Alphitter</h1>
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
          maxlength="12"
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
          <router-link to="/signup" class="link">註冊 Alphitter</router-link>
          ・
          <router-link to="/admin/signin" class="link">後台登入</router-link>
        </p>
      </div>
    </form>
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
}

.form-control {
  height: 50px;
  background: #f5f8fa;
  border: none;
  box-shadow: 0 2px 0px 0 #657786;
  margin-top: 20px;
  text-align: right;
}

.input-label {
  position: absolute;
  top: 5px;
  left: 10px;
  color: #657786;
}

.link {
  text-decoration: underline;
  font-size: 18px;
  line-height: 26px;
}

p {
  color: #0099ff;
}
</style>

<script>
import authorizationAPI from "../apis/authorization"
import { Toast } from "../utils/helpers"

export default {
  name: 'UserSignIn',
  data () {
    return {
      email: "",
      password: "",
      isProcessing: false,
    }
  },
  methods: {
    async handleSubmit () {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請輸入帳號密碼",
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

        if (data.status !== "success") {
          throw new Error(data.message)
        }

        //把token保留在local storage中
        localStorage.setItem("token", data.token)

        //透過setCurrentUser把使用者資料待到vuex的state中
        this.$store.commit('setCurrentUser', data.user)
        this.$router.push("/tweets")
      }
      catch (e) {
        console.log(e)
        this.isProcessing = false
        this.password = ""

        Toast.fire({
          icon: "warning",
          title: "輸入的帳號密碼有誤",
        })
      }
    }
  },
}

</script>