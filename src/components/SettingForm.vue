<template>
  <form class="w-100" @submit.prevent.stop="handleSubmit">
    <div class="signin-form">
      <label class="input-label" for="account">帳號</label>
      <input
        id="account"
        name="account"
        v-model="account"
        type="text"
        class="form-control"
        placeholder=""
        autocomplete="account"
        required
        autofocus
      />
    </div>
    <div class="signin-form">
      <label class="input-label" for="account">名稱</label>
      <input
        id="name"
        name="name"
        v-model="name"
        type="text"
        class="form-control"
        placeholder=""
        autocomplete="username"
        required
        autofocus
      />
    </div>
    <div class="signin-form">
      <label class="input-label" for="account">Email</label>
      <input
        id="email"
        name="email"
        v-model="email"
        type="email"
        class="form-control"
        placeholder=""
        autocomplete="email"
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
        required
      />
    </div>
    <div class="signin-form">
      <label class="input-label" for="password">密碼確認</label>
      <input
        id="password-check"
        name="passwordCheck"
        v-model="passwordCheck"
        type="password"
        class="form-control"
        placeholder=""
        minlength="6"
        maxlength="12"
        required
      />
    </div>

    <button
      :disabled="isProcessing"
      class="btn btn-lg btn-primary btn-block"
      type="submit"
    >
      註冊
    </button>

    <div class="signup-admin-link">
      <p>
        <router-link to="/signin" class="link">取消</router-link>
      </p>
    </div>
  </form>
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
  margin: 0 auto;
  margin-top: 30px;
}

.signup-admin-link {
  display: flex;
  justify-content: center;
  max-width: 540px;
  max-height: 26px;
  margin: 20px auto;
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
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #0099ff;
}
</style>

<script>
import { Toast } from '../utils/helpers'

export default {
  name: 'SettingForm',
  props: {
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      account: '',
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      //isProcessing: false,
    }
  },
  methods: {
    handleSubmit () {
      if (!this.account || !this.name || !this.email || !this.password || !this.passwordCheck) {
        Toast.fire({
          icon: 'warning',
          title: '請輸入所有欄位',
        })
        return
      }

      if (this.password.length < 6) {
        Toast.fire({
          icon: 'warning',
          title: '密碼長度不足'
        })
        return
      }

      if (this.passwordCheck !== this.password) {
        Toast.fire({
          icon: 'warning',
          title: '密碼與密碼確認不同'
        })
        return
      }

      //this.isProcessing = true

      this.$emit('after-submit', {
        account: this.account,
        name: this.name,
        email: this.email,
        password: this.password,
        checkPassword: this.passwordCheck
      })
    }
  },
}

</script>