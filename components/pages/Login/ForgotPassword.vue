<template>
  <div>
    <modal :show.sync="modals.forgotPassword" modalClasses="forgot-password">
      <h6 slot="header" class="modal-title" id="modal-title-default"></h6>
      <h2>Forget Password</h2>
      <p class="pt-3 py-0">Enter your Picardata registered email</p>

      <div class="form-group mt-4">
        <label
            :class="[`form-control-label`, {'d-none': !errors.email}]"
        >
          Email
        </label>
        <input
            v-model="email"
            :class="[`form-control`, 'login-credential-input', {'error': errors.email}]"
            placeholder="Email"
            @change="validateEmail"
        >
        <span class="form-icon"><i class="fa fa-times" /></span>
        <span
            :class="['form-control-error', {'d-none': !errors.email}]"
        >
        {{ errors.email }}
              </span>
      </div>

      <div class="col-md-12 text-center">
        <button
            :class="['btn btn-primary rounded reset-password mt-3', {'disabled': isDisableEmail}]"
            :disabled="isDisableEmail"
            @click="findEmail"
        >
          Reset Password
        </button>
      </div>
    </modal>

    <modal :show.sync="modals.fillPassword" modalClasses="forgot-password">
      <h6 slot="header" class="modal-title"></h6>
      <h2>Check your email’s inbox</h2>
      <p class="pt-3 py-0">Check your email and input the codes to help you resetting the password.</p>

      <div class="form-group mt-4">
        <label
            :class="[`form-control-label`, {'d-none': !errors.password1}]"
        >
          New password
        </label>
        <input
            type="password"
            v-model="password1"
            :class="[`form-control`, 'login-credential-input', {'error': errors.password1}]"
            placeholder="New Password"
            @input="validatePassword('password1')"
        >
        <span class="form-icon"><i class="fa fa-times" /></span>
        <span
            :class="['form-control-error', {'d-none': !errors.password1}]"
        >
          {{ errors.password1 }}
        </span>
      </div>
      <div class="form-group">
        <label
            :class="[`form-control-label`, {'d-none': !errors.password2}]"
        >
          Retype new password
        </label>
        <input
            type="password"
            v-model="password2"
            :class="[`form-control`, 'login-credential-input', {'error': errors.password2}]"
            placeholder="Retype new password"
            @input="validateConfirmPassword()"
        >
        <span class="form-icon"><i class="fa fa-times" /></span>
        <span
            :class="['form-control-error', {'d-none': !errors.password2}]"
        >
        {{ errors.password2 }}
              </span>
      </div>

      <div class="col-md-12 text-center">
        <button
            :class="['btn btn-primary rounded reset-password mt-3', {'disabled': isDisablePassword}]"
            :disabled="isDisablePassword"
            @click="resetPassword"
        >
          Reset Password
        </button>
      </div>
    </modal>

    <modal :show.sync="modals.successResetPassword" modalClasses="forgot-password">
      <h6 slot="header" class="modal-title"></h6>
      <h2 class="text-center">Password reset!</h2>

      <div class="col-md-12 text-center">
        <img class="text-center mt-4 mb-3" src="~/assets/check-circle.png" alt="">
      </div>

      <div class="col-md-12 text-center">
        <button class="btn btn-primary rounded reset-password mt-4">Login</button>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  props: ['modals'],
  data (){
    return {
      errors: {
        email: '',
        password1: '',
        password2: ''
      },
      email: '',
      password1: '',
      password2: ''
    }
  },
  computed: {
    isDisableEmail() {
      if (this.email.length < 1) {
        return true
      }

      return !this.validateEmail();
    },
    isDisablePassword() {
      const password1 = this.password1
      const password2 = this.password2

      if (password1.length < 1 || password2.length < 1) {
        return true
      }

      if (password1 !== password2) {
        return true
      }

      if (!this.validatePassword('password1') || !this.validatePassword('password2')) {
        return true
      }

      return false
    }
  },
  methods: {
    validateEmail () {
      const email = this.email
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const test = re.test(email.toLowerCase())

      if (!test) {
        this.errors.email = 'Error email\'s format'
        return false
      }

      this.errors.email = ''
      return true
    },
    validatePassword (passwordName) {
      const password = this[passwordName]
      if (password.length < 8) {
        this.errors[passwordName] = 'Minimum password length 8 chars'
        return false
      }

      const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/
      const test = re.test(password)

      if (!test) {
        this.errors[passwordName] = 'Error password\'s format'
        return false
      }

      this.errors[passwordName] = ''
      return true
    },
    validateConfirmPassword () {
      let validateFormat = this.validatePassword('password2')
      if (!validateFormat) {
        return false
      }

      if (this.password1 !== this.password2) {
        this.errors.password2 = 'Confirm password doesn\'t match'
        return false
      }

      this.errors.password2 = ''
      return true
    },
    findEmail (){
      this.$emit('toggleModal', 'fillPassword')
    },
    resetPassword (){
      this.$emit('toggleModal', 'successResetPassword')
    }
  }
}
</script>

<style scoped lang="scss">
.form-group{
  position: relative;

  .form-control-label{
    position: absolute;
    padding: 6px 24px;
    color: #C30052;
    z-index: 2;

    + .login-credential-input{
      padding: 24px 24px 0;
    }

    &.d-none + .login-credential-input{
      padding: 0 24px;
    }
  }

  .form-control-error{
    color: #C30052;
    margin-top: 8px;
    font-size: 14px;
  }

  .form-icon{
    position: absolute;
    right: 0;
    top: 0;
    padding: 24px;
    font-size: 14px;
    color: #A0A3BD;
  }
}

.btn-primary{
  background: #2534B6;
  min-width: 200px;
  &.rounded{
    border-radius: 40px !important;
  }
  &:hover{
    box-shadow: none;
    transform: translateY(0);
  }
}
</style>
