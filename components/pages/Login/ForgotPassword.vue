<template>
  <div>
    <modal :show.sync="modals.forgotPassword" modal-classes="forgot-password">
      <h6 id="modal-title-default" slot="header" class="modal-title" />
      <h2>Forget Password</h2>
      <p class="pt-3 py-0">
        Enter your Picardata registered email
      </p>

      <div class="form-group mt-4">
        <label
          :class="[`form-control-label`, {'d-none': !errors.email}]"
        >
          Email
        </label>
        <input
          v-model="email"
          :class="[`form-control`, 'login-credential-input email', {'error': errors.email}]"
          placeholder="Email"
          @change="validateEmail"
        >
        <span class="form-icon"><i class="fa fa-times" /></span>
        <span
          :class="['form-control-error', {'d-none': !errors.email}]"
          v-html="errors.email"
        />
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

    <modal :show.sync="modals.fillPassword" modal-classes="forgot-password">
      <h6 slot="header" class="modal-title" />
      <h2>Check your email’s inbox</h2>
      <p class="pt-3 py-0">
        Check your email and input the codes to help you resetting the password.
      </p>

      <div class="form-group mt-4">
        <label
          :class="[`form-control-label`, {'d-none': !errors.password1}]"
        >
          New password
        </label>
        <input
          v-model="password1"
          :type="showPassword.password1 ? 'text' : 'password'"
          :class="[`form-control`, 'login-credential-input', {'error': errors.password1}]"
          placeholder="New Password"
          @input="validatePassword('password1')"
        >
        <span v-if="!showPassword.password1 && this.password1.length > 0" class="form-icon" @click="togglePassword('password1')"><i class="fa fa-eye-slash" /></span>
        <span v-else-if="this.password1.length > 0" class="form-icon" @click="togglePassword('password1')"><i class="fa fa-eye" /></span>
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
          v-model="password2"
          :type="showPassword.password2 ? 'text' : 'password'"
          :class="[`form-control`, 'login-credential-input', {'error': errors.password2}]"
          placeholder="Retype new password"
          @input="validateConfirmPassword()"
        >
        <span v-if="!showPassword.password2 && this.password2.length > 0" class="form-icon" @click="togglePassword('password2')"><i class="fa fa-eye-slash" /></span>
        <span v-else-if="this.password2.length > 0" class="form-icon" @click="togglePassword('password2')"><i class="fa fa-eye" /></span>
        <span
          :class="['form-control-error', {'d-none': !errors.password2}]"
        >
          {{ errors.password2 }}
        </span>
      </div>

      <div class="col-md-12 text-center">
        <button
          :class="['btn btn-primary rounded reset-password mt-3 line-height-3', {'disabled': isDisablePassword}]"
          :disabled="isDisablePassword"
          @click="resetPassword"
        >
          Reset Password
        </button>
      </div>
    </modal>

    <modal :show.sync="modals.successResetPassword" modal-classes="forgot-password">
      <h6 slot="header" class="modal-title" />
      <h2 class="text-center">
        Password reset!
      </h2>

      <div class="col-md-12 text-center">
        <img class="text-center mt-4 mb-3" src="~/assets/check-circle.png" alt="">
      </div>

      <div class="col-md-12 text-center">
        <button class="btn btn-primary rounded reset-password mt-4" @click="refreshPage">
          Login
        </button>
      </div>
    </modal>

    <modal :show.sync="modals.successSendEmail" modal-classes="forgot-password">
      <h6 slot="header" class="modal-title" />
      <h2 class="text-center">
        Email Sent
      </h2>

      <div class="col-md-12 text-center">
        <p>We sent an email to {{ email }} with a link to get back into your account</p>
      </div>

      <div class="col-md-12 text-center">
        <button class="btn btn-primary rounded reset-password mt-4" @click="modals.successSendEmail = false">
          OK
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  props: ['modals'],
  data () {
    return {
      errors: {
        email: '',
        password1: '',
        password2: ''
      },
      email: '',
      password1: '',
      password2: '',
      id: '',
      showPassword: {
        password1: false,
        password2: false
      }
    }
  },
  computed: {
    isDisableEmail () {
      if (this.email.length < 1) {
        return true
      }

      return !this.validateEmail()
    },
    isDisablePassword () {
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
  mounted () {
    const query = this.$route.query

    if (query.resetpassword) {
      this.email = query.username
      this.id = query.id
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
      const validateFormat = this.validatePassword('password2')
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
    findEmail () {
      this.$axios
        .$post('/api/forgot-password', {
          email: this.email
        })
        .then((data) => {
          if (data.success !== true) {
            this.errors.email = 'Uh oh! The email isn’t registered yet. <a class="text-link" href="/signup">Register instead</a>'
          } else {
            this.$emit('toggleModal', 'successSendEmail')
          }
        })
    },
    async resetPassword () {
      if (this.password1 !== this.password2) {
        this.errors = this.errors.concat("Confirm password doesn't match")
      } else {
        await this.$axios
          .put('api/users/' + this.id, {
            username: this.email,
            password: this.password1
          })
          .then(() => {
            this.$emit('toggleModal', 'successResetPassword')
          })
          .catch((e) => {
            for (const field of ['username', 'password']) {
              const errors = e.response.data.errors[field]
              if (errors !== undefined) {
                this.errors.password1 = this.errors.concat(errors)
              }
            }
            return false
          })
      }
    },
    refreshPage () {
      this.modals.successResetPassword = false
      this.$router.push('/login')
    },
    togglePassword (name) {
      this.showPassword[name] = !this.showPassword[name]
    },
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

      &.email{
        border: 2px solid #14142B;
      }

      &.error{
        border: 2px solid #ED2E7E !important;
      }
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

  &.line-height-3{
    line-height: 3;
  }
}

::v-deep .text-link{
  font-size: 14px;
  color: #3E4EDD;
  text-decoration: underline;
}

p{
  color: #313131;
}
</style>
