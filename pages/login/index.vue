<template>
  <div class="bg-outer">
    <div class="wrapper">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="title-wrapper text-center">
              <img src="~/assets/aligngrouplogo.png" alt="Logo">
              <h2>Log in</h2>
            </div>

            <div class="google-login-wrapper mb-4">
              <GoogleLogin :params="params" :render-params="renderParams" :on-success="onSuccess" :on-failure="onFailure">
                Login
              </GoogleLogin>
            </div>

            <div class="title-wrapper text-center">
              <span>or</span>
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
                placeholder="Email Address"
                @change="validateEmail"
                @keyup.enter="onSubmit"
              >
              <span v-if="email.length" class="form-icon" @click="emptyInput('email')"><i class="fa fa-times" /></span>
              <span
                :class="['form-control-error', {'d-none': !errors.email}]"
              >
                {{ errors.email }}
              </span>
            </div>

            <div class="col-md-12 text-right forgot-password-wrapper">
              <nuxt-link to="#" class="text-link" @click.native="openModal('forgotPassword')">
                Forgot password?
              </nuxt-link>
            </div>

            <div class="form-group">
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
                @keyup.enter="onSubmit"
              >

              <span v-if="showPassword && password.length" class="form-icon" @click="togglePassword"><i class="fa fa-eye" /></span>
              <span v-else-if="password.length" class="form-icon" @click="togglePassword"><i class="fa fa-eye-slash" /></span>

              <span
                :class="[`form-control-error`, {'d-none': !errors.password}]"
                v-html="errors.password"
              />
            </div>

            <!--            <div class="form-check  mt-4">-->
            <!--              <input id="checkbox-remember-me" style="margin-left: -14px;" type="checkbox" class="form-check-input">-->
            <!--              <label class="form-check-label ml-3" for="checkbox-remember-me">Remember me</label>-->
            <!--            </div>-->

            <button
              :disabled="isDisable"
              :class="['btn btn-primary btn-block mt-4 mb-4 rounded', {'disabled': isDisable}]"
              @click="onSubmit"
            >
              Login
            </button>

            <div class="col-md-12 text-center register-wrapper">
              Don't have an account?
              <nuxt-link to="/signup" class="btn btn-register text-link">
                Sign up
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
import GoogleLogin from 'vue-google-login'

export default {
  name: 'AdminAuthPage',
  middleware: 'authenticated',
  components: {
    ForgotPassword,
    GoogleLogin
  },
  layout: 'empty',
  auth: false,
  data () {
    return {
      params: {
        client_id: '581341020272-t0geef2e7q4pmimguk3lseh774n12lkd.apps.googleusercontent.com'
      },
      renderParams: {
        height: 40,
        width: 374,
        longtitle: true
      },
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
    async onSuccess (googleUser) {
      const idToken = googleUser.getAuthResponse().id_token
      await this.$auth.loginWith('customLogin', {
        data: {
          idToken
        }
      })

      if (this.$auth.user.userProfile.employees[0].isStoreUser === true) {
        this.$router.push('/store')
      } else if (!this.isLogin) {
        this.$router.push('/onboarding')
      } else {
        this.$router.push('/')
      }
    },
    onFailure () {

    },
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
          .then(() => {
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

        if (this.$auth.user.userProfile.employees[0].isStoreUser === true) {
          this.$router.push('/store')
        } else if (!this.isLogin) {
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
      if (email.length === 0) {
        this.errors.email = ''
        return false
      }

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
        this.errors.password = 'Minimum password length 8 characters'
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
  .google-login-wrapper {
    .abcRioButton {
      width: 100% !important;
    }
  }

.bg-outer{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #f4f3f5;
  padding: 3em 16em;
}

.wrapper{
  /*background: #FFFFFF;*/
  /*width: 100%;*/
  width: 468px;
  height: auto;
  /*border-radius: 16px;*/
  padding: 3rem 2rem 3rem;
}

.title-wrapper{
  font-family: 'Roboto Condensed';

  h2{
    margin-top: 24px;
    margin-bottom: 32px;
    font-size: 32px;
    font-weight: 900;
    color: #2e4823;
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
  background: #6bb745;
  border-color: #6bb745;
  &.rounded{
    border-radius: 40px !important;
  }
  &:hover{
    box-shadow: none;
    transform: translateY(0);
  }
  &.disabled{
    background: #6bb745;
    border-color: #6bb745;
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
  color: #2E4823;

  &:hover{
    background-color: #FFFFFF;
  }
}

.register-wrapper {
  font-size: 14px;

  .btn-register {
    text-decoration: underline;
    text-underline: #2e4823;
    padding: 0;
    margin-top: -4px;

    &:hover {
      background-color: #f4f3f5;
      box-shadow: none;
    }
  }
}
  .forgot-password-wrapper {
    color: #6bb745;

    a {
      color: #6bb745 !important;
    }
    a:hover {
      background-color: #f4f3f5;
    }
  }
</style>
