<template>
  <div class="bg-outer">
    <div class="wrapper">
      <div class="container">
        <div class="row">
          <div class="col-md-5">
            <div class="icon-picardata text-center">
              <img class="mb-2" src="~/assets/logo.png" alt="">
              <h2>Login to Picardata</h2>
            </div>

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
              <span v-if="email.length" class="form-icon" @click="emptyInput('email')"><i class="fa fa-times" /></span>
              <span
                :class="['form-control-error', {'d-none': !errors.email}]"
              >
                {{ errors.email }}
              </span>
            </div>

            <div class="form-group mt-4">
              <label
                :class="[`form-control-label`, {'d-none': !errors.password}]"
              >
                Password
              </label>
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :class="[`form-control`, 'login-credential-input', {'error': errors.password}]"
                placeholder="Password"
                @change="validatePassword"
              >

              <span v-if="showPassword && password.length" class="form-icon" @click="togglePassword"><i class="fa fa-eye" /></span>
              <span v-else-if="password.length" class="form-icon" @click="togglePassword"><i class="fa fa-eye-slash" /></span>

              <span
                :class="[`form-control-error`, {'d-none': !errors.password}]"
                v-html="errors.password"
              />
            </div>

            <div class="form-check  mt-4">
              <input id="checkbox-remember-me" type="checkbox" class="form-check-input">
              <label class="form-check-label ml-2" for="checkbox-remember-me">Remember me</label>
            </div>

            <button
              :disabled="isDisable"
              :class="['btn btn-primary btn-block mt-4 mb-4 rounded', {'disabled': isDisable}]"
              @click="onSubmit"
            >
              Login
            </button>

            <div class="col-md-12 text-center">
              <nuxt-link to="#" class="text-link" @click.native="openModal('forgotPassword')">
                Forgot password
              </nuxt-link>
            </div>
          </div>
          <div class="col-md-1" />
          <div class="col-md-6">
            <div class="img-banner text-center">
              <img src="~/assets/register-now.png" alt="">

              <nuxt-link to="/signup" class="btn btn-outline-primary text-link">
                Not registered yet? Register now
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ForgotPassword :modals="modals" @toggleModal="openModal($event)" />
  </div>
</template>
<script>

import ForgotPassword from '@/components/pages/Login/ForgotPassword'

export default {
  name: 'AdminAuthPage',
  middleware: 'authenticated',
  components: {
    ForgotPassword
  },
  layout: 'empty',
  auth: false,
  data () {
    return {
      errors: {
        email: '',
        password: ''
      },
      showPassword: false,
      isLogin: true,
      email: '',
      password: '',
      modals: {
        forgotPassword: false,
        fillPassword: false,
        successResetPassword: false,
        successSendEmail: false
      }
    }
  },
  computed: {
    isDisable () {
      const email = this.email
      const password = this.password
      if (!email || !password) {
        return true
      }

      const validateEmail = this.validateEmail()
      const validatePassword = this.validatePassword()

      if (!validateEmail || !validatePassword) {
        return true
      }

      return false
    }
  },
  mounted () {
    const query = this.$route.query
    if (query.resetpassword) {
      this.modals.fillPassword = true
    }
  },
  methods: {
    async onSubmit () {
      const isValidate = this.validateEmail() && this.validatePassword()
      if (!isValidate) {
        return false
      }

      if (!this.isLogin) {
        const result = await this.$axios
          .$post('/api/users/', {
            username: this.email,
            password: this.password
          })
          .then((data) => {
            // eslint-disable-next-line no-console
            console.log(data)
          })
          .catch((e) => {
            this.errors = []
            for (const field of ['username', 'password']) {
              const errors = e.response.data.errors[field]
              if (errors !== undefined) {
                this.errors = this.errors.concat(errors)
              }
            }
            return false
          })
        if (result === false) {
          this.errors.password = '<i class="fa fa-exclamation-circle"></i> Email or password  you entered is incorrect'
          return false
        }
      }
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.email,
            password: this.password
          }
        })
        if (!this.isLogin) {
          this.$router.push('/onboarding')
        } else {
          this.$router.push('/')
        }
      } catch (err) {
        this.errors.password = '<i class="fa fa-exclamation-circle"></i> Email or password  you entered is incorrect'
        return false
      }
    },
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
    validatePassword () {
      const password = this.password

      if (password.length === 0) {
        this.errors.password = ''
        return false
      }

      if (password.length < 8) {
        this.errors.password = 'Minimum password length 8 chars'
        return false
      }

      this.errors.password = ''
      return true
    },
    emptyInput (value) {
      this[value] = ''
      this.errors[value] = ''
    },
    togglePassword () {
      this.showPassword = !this.showPassword
    },
    openModal (name) {
      const keys = Object.keys(this.modals)
      for (const key of keys) {
        this.modals[key] = false
      }
      this.modals[name] = true
    }
  }
}
</script>

<style scoped lang="scss">
.bg-outer{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #181C3B;
  padding: 3em 16em;
}

.wrapper{
  background: #FFFFFF;
  width: 100%;
  height: auto;
  border-radius: 16px;
  padding: 3rem 4rem 3rem;
}

.icon-picardata{
  h2{
    margin-top: 24px;
    margin-bottom: 32px;
    font-size: 20px;
    font-weight: 600;
  }
}

.mt-4{
  margin-top: 1.25rem;
}

.mb-4{
  margin-bottom: 1.25rem;
}

.form-check{
  .form-check-input{
    transform: scale(1.846);
  }
  .form-check-label{
    color: #313131;
    font-size: 14px;
  }
}

.btn-primary{
  background: #2534B6;
  &.rounded{
    border-radius: 40px !important;
  }
  &:hover{
    box-shadow: none;
    transform: translateY(0);
  }
  &.disabled{
    background: #3E4EDD;
  }
}

.img-banner{
  margin-top: 48px;

  .btn{
    margin-top: 32px;
  }
}

.form-group{
  position: relative;

  .form-control-label{
    position: absolute;
    padding: 6px 24px;
    color: #C30052;
    z-index: 2;
    font-size: 14px;

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

.text-link{
  font-size: 14px;
  color: #3E4EDD;
}
</style>
