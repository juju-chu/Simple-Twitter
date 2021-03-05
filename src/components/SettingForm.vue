<template>
  <form class="forms" @submit.prevent.stop="handleSubmit">
    <div class="signin-form">
      <label class="input-label" for="account">帳號</label>
      <input
        id="account"
        name="account"
        v-model="userData.account"
        type="text"
        class="form-control"
        placeholder=""
        autocomplete="account"
        required
        autofocus
      />
    </div>
    <div v-if="isUserSetting" class="user-setting-margin"></div>
    <div class="signin-form">
      <label class="input-label" for="name">名稱</label>
      <input
        id="name"
        name="name"
        v-model="userData.name"
        type="text"
        class="form-control"
        placeholder=""
        autocomplete="username"
        required
        autofocus
      />
    </div>
    <div v-if="isUserSetting" class="user-setting-margin"></div>
    <div class="signin-form">
      <label class="input-label" for="email">Email</label>
      <input
        id="email"
        name="email"
        v-model="userData.email"
        type="email"
        class="form-control"
        placeholder=""
        autocomplete="email"
        required
        autofocus
      />
    </div>
    <div v-if="isUserSetting" class="user-setting-margin"></div>
    <div class="signin-form">
      <label class="input-label" for="password">密碼</label>
      <input
        id="password"
        name="password"
        v-model="userData.password"
        type="password"
        class="form-control"
        placeholder=""
        minlength="6"
        maxlength="12"
        required
      />
    </div>
    <div v-if="isUserSetting" class="user-setting-margin"></div>
    <div class="signin-form">
      <label class="input-label" for="check-password">密碼確認</label>
      <input
        id="check-password"
        name="checkPassword"
        v-model="userData.checkPassword"
        type="password"
        class="form-control"
        placeholder=""
        minlength="6"
        maxlength="12"
        required
      />
    </div>

    <div class="action-btns">
      <button
        v-if="!isUserSetting"
        :disabled="isProcessing"
        class="regist-btn btn btn-lg btn-primary btn-block"
        type="submit"
      >
        註冊
      </button>

      <div v-if="!isUserSetting" class="signup-admin-link">
        <p>
          <router-link to="/signin" class="link">取消</router-link>
        </p>
      </div>

      <button
        v-if="isUserSetting"
        :disabled="isProcessing"
        class="save-btn btn btn-lg btn-primary btn-block"
        type="submit"
      >
        儲存
      </button>
    </div>
  </form>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.forms {
  width: 540px;
}

.signin-form {
  position: relative;
  max-height: 212px;
  margin-bottom: 20px;
}

.regist-btn {
  border-radius: 50px;
  background: #ff6600;
  border: none;
  max-width: 540px;
  margin: 0 auto;
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

.user-setting-margin {
  height: 12px;
}

.action-btns {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 30px;
}

.save-btn {
  background: #ff6600;
  color: white;
  width: 122px;
  height: 50px;
  border-radius: 50px;
  border: none;
}
</style>

<script>
import { Toast } from '../utils/helpers'

export default {
  name: 'SettingForm',
  props: {
    initialUserData: {
      type: Object,
      default: () => ({
        id: -1,
        account: '',
        name: '',
        email: '',
        password: ''
      })
    },
    isProcessing: {
      type: Boolean,
      default: false
    },
    isUserSetting: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      userData: {
        ...this.initialUserData,
      }
    }
  },
  watch: {
    initialUserData (newValue) {
      this.userData = {
        ...this.userData,
        ...newValue
      }
    }
  },
  methods: {
    handleSubmit () {
      if (!this.userData.account || !this.userData.name || !this.userData.email || !this.userData.password || !this.userData.checkPassword) {
        Toast.fire({
          icon: 'warning',
          title: '請輸入所有欄位',
        })
        return
      }

      if (this.userData.password.length < 6) {
        Toast.fire({
          icon: 'warning',
          title: '密碼長度不足'
        })
        return
      }

      if (this.userData.checkPassword !== this.userData.password) {
        Toast.fire({
          icon: 'warning',
          title: '密碼與密碼確認不同'
        })
        return
      }

      //this.isProcessing = true

      this.$emit('after-submit', {
        account: this.userData.account,
        name: this.userData.name,
        email: this.userData.email,
        password: this.userData.password,
        checkPassword: this.userData.checkPassword
      })
    }
  },
}

</script>