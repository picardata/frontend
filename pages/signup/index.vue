<template>
  <div class="bg-outer">
    <div class="wrapper">
      <div class="container picardata-container">
        <div class="row">
          <div class="col-md-5">
            <div class="icon-picardata text-center">
              <img class="mb-2" src="~/assets/logo.png" alt="">
              <h2 class="register-to-picardata">
                Register to Picardata
              </h2>
            </div>

            <div class="form-group mt-4">
              <label
                :class="[`form-control-label`, {'d-none': !errors.username}]"
              >
                Email
              </label>
              <input
                v-model="username"
                :class="[`form-control`, 'login-credential-input', {'error': errors.username}]"
                placeholder="Email"
                autocomplete="off"
                @change="validateEmail"
                @keyup="validateForRegisterButton"
              >
              <span v-if="this.username.length > 0 && errors.username" class="form-icon" @click="emptyInput('username')"><i class="fa fa-times" /></span>
              <span
                :class="['form-control-error', {'d-none': !errors.username}]"
              >
                {{ errors.username }}
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
                autocomplete="off"
                @change="validatePassword"
                @keyup="validateForRegisterButton"
              >

              <span v-if="!showPassword && this.password.length > 0" class="form-icon" @click="togglePassword"><i class="fa fa-eye-slash" /></span>
              <span v-else-if="this.password.length > 0" class="form-icon" @click="togglePassword"><i class="fa fa-eye" /></span>

              <span
                :class="[`form-control-error`, {'d-none': !errors.password}]"
                v-html="errors.password"
              />
            </div>

            <div class="form-group  mt-4">
              <label
                :class="[`form-control-label`, {'d-none': !errors.passwordAgain}]"
              >
                Password again
              </label>
              <input
                v-model="passwordAgain"
                :type="showPasswordAgain ? 'text' : 'password'"
                :class="[`form-control`, 'login-credential-input', {'error': errors.passwordAgain}]"
                placeholder="Password again"
                autocomplete="off"
                @change="validatePasswordAgain"
                @keyup="validateForRegisterButton"
              >

              <span
                v-if="!showPasswordAgain && this.passwordAgain.length > 0"
                class="form-icon"
                @click="togglePasswordAgain"
              >
                <i class="fa fa-eye-slash" />
              </span>
              <span
                v-else-if="this.passwordAgain.length > 0"
                class="form-icon"
                @click="togglePasswordAgain"
              >
                <i class="fa fa-eye" />
              </span>

              <span
                :class="[`form-control-error`, {'d-none': !errors.passwordAgain}]"
                v-html="errors.passwordAgain"
              />
            </div>

            <button
              type="button"
              :class="['btn btn-primary btn-block mt-4 mb-4 rounded btn-register']"
              :disabled="disableRegisterButton"
              @click="onSubmit"
            >
              Register
            </button>
          </div>
          <div class="col-md-1" />
          <div class="col-md-6">
            <div class="img-banner">
              <div class="d-flex justify-content-center">
                <img src="~/assets/register-now-red.png" alt="">
              </div>
              <div class="d-flex justify-content-center">
                <nuxt-link to="/login" class="btn btn-outline-primary btn-block already-had-account">
                  <span class="already-had-account-text">Already had an account? Sign in</span>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'AdminAuthPage',
  layout: 'empty',
  auth: false,
  data () {
    return {
      errors: {
        username: '',
        password: '',
        passwordAgain: ''
      },
      showPassword: false,
      showPasswordAgain: false,
      isLogin: false,
      disableRegisterButton: true,
      username: '',
      password: '',
      passwordAgain: ''
    }
  },
  mounted () {
    this.disableAutoComplete()
  },
  // beforeMount () {
  //   return this.$auth.loggedIn ? this.$router.push('/') : ''
  // },
  methods: {
    async onSubmit () {
      const isValidate = this.validateEmail() && this.validatePassword() && this.validatePasswordAgain()
      if (!isValidate) {
        return false
      }

      if (!this.isLogin) {
        let result
        try {
          result = await this.$axios
            .$post('/api/users/', {
              username: this.username,
              password: this.password
            })
        } catch (e) {
          this.errors = []
          for (const field of ['username', 'password']) {
            const errors = e.response.data.errors[field]
            console.log('ini errorsnya = ')
            console.log(errors)
            if (errors !== undefined) {
              this.errors[field] = errors.join(', ')
            }
          }
          result = false
        }

        if (result === false) {
          // this.errors.password = '<i class="fa fa-exclamation-circle"></i> Email or password  you entered is incorrect'
          return false
        }
      }
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
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
      const email = this.username
      if (!this.isEmailFormatValid(email)) {
        this.errors.username = 'Error email\'s format'
        return false
      }

      this.errors.username = ''

      return true
    },
    isEmailFormatValid (email) {
      // if(email.length === 0) {
      //   return true;
      // }
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const test = re.test(email.toLowerCase())
      return test
    },
    isPasswordLengthValid (password) {
      // if(password.length === 0) {
      //   return true;
      // }
      return password && password.length >= 8
    },
    isPasswordMatched (originalPassword, repeatedPassword) {
      return originalPassword.length > 0 && repeatedPassword.length > 0 && (originalPassword === repeatedPassword)
    },
    isPasswordFormatValid (password) {
      // if(password.length === 0) {
      //   return true;
      // }
      const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
      const test = re.test(password)

      return test
    },
    validatePassword () {
      const password = this.password

      if (!this.isPasswordLengthValid(password)) {
        this.errors.password = 'Minimum password length 8 chars'
        return false
      }

      // const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
      // const test = re.test(password)

      if (!this.isPasswordFormatValid(password)) {
        this.errors.password = 'Please choose more secure and unique password. Please try the following: add uppercase letters, add numbers, add special characters, add more characters.'
        return false
      }

      // if (this.validateEmail() && this.validatePasswordAgain()) {
      //   this.disableRegisterButton = false;
      // }
      this.errors.password = ''
      return true
    },
    validatePasswordAgain () {
      const password = this.passwordAgain

      console.log('password again = ')
      console.log(password)

      if (!this.isPasswordLengthValid(password)) {
        this.errors.passwordAgain = 'Minimum password length 8 chars'
        return false
      }

      if (!this.isPasswordFormatValid(password)) {
        this.errors.passwordAgain = 'Please choose more secure and unique password. Please try the following: add uppercase letters, add numbers, add special characters, add more characters.'
        return false
      }

      const originalPassword = this.password

      if (!this.isPasswordMatched(originalPassword, password)) {
        this.errors.passwordAgain = "Password isn't matched"
        this.errors.password = this.errors.passwordAgain
        return false
      }

      // if (!test) {
      //   this.errors.password = 'Error password\'s format'
      //   return false
      // }

      // if (this.validatePassword() && this.validateEmail()) {
      //   this.disableRegisterButton = !this.disableRegisterButton;
      // }
      this.errors.passwordAgain = ''
      return true
    },
    validateForRegisterButton () {
      if (this.isEmailFormatValid(this.username) &&
          this.isPasswordLengthValid(this.password) &&
          this.isPasswordLengthValid(this.passwordAgain) &&
          this.isPasswordFormatValid(this.password) &&
          this.isPasswordFormatValid(this.passwordAgain) &&
          this.isPasswordMatched(this.password, this.passwordAgain)) {
        this.disableRegisterButton = false
      } else {
        this.disableRegisterButton = true
      }
    },
    emptyInput (value) {
      this[value] = ''
      this.errors[value] = ''
    },
    togglePassword () {
      this.showPassword = !this.showPassword
    },
    togglePasswordAgain () {
      this.showPasswordAgain = !this.showPasswordAgain
    },
    disableAutoComplete () {
      const elements = document.querySelectorAll('[autocomplete="off"]')

      if (!elements) {
        return
      }

      elements.forEach((element) => {
        element.setAttribute('readonly', 'readonly')
        // element.style.backgroundColor = "inherit";

        setTimeout(() => {
          element.removeAttribute('readonly')
        }, 500)
      })
    }
  }
}
</script>

<style scoped lang="scss">
$placeholder-color: #A0A3BD;
$placeholder-font-size: 16px;

.btn-register {
  font-size: 16px;
}

.btn-register:disabled {
  background: #3E4EDD;
  font-size: 16px;
}

input::-webkit-input-placeholder {
    color: $placeholder-color;
    font-size: $placeholder-font-size;
}
input:focus::-webkit-input-placeholder {
    color: $placeholder-color;
    font-size: $placeholder-font-size;
}

/* Firefox < 19 */
input:-moz-placeholder {
    color: $placeholder-color;
    font-size: $placeholder-font-size;
}
input:focus:-moz-placeholder {
    color: $placeholder-color;
    font-size: $placeholder-font-size;
}

/* Firefox > 19 */
input::-moz-placeholder {
    color: $placeholder-color;
    font-size: $placeholder-font-size;
}
input:focus::-moz-placeholder {
    color: $placeholder-color;
    font-size: $placeholder-font-size;
}

/* Internet Explorer 10 */
input:-ms-input-placeholder {
    color: $placeholder-color;
    font-size: $placeholder-font-size;
}
input:focus:-ms-input-placeholder {
    color: $placeholder-color;
    font-size: $placeholder-font-size;
}

.picardata-container {
  .form-group .form-control-label {
    font-size: 14px;
  }
}

.already-had-account-text:hover {
  color: #FFFF;
}
.already-had-account-text {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
  /* identical to box height, or 200% */

  letter-spacing: 0.75px;

  /* Main Blue */

  color: #3E4EDD;

  opacity: 0.8;
}

// .already-had-account {
//   background: #FFFFFF;
//   border: 1px solid #2534B6;
//   box-sizing: border-box;
//   border-radius: 4px;
// }

.already-had-account:hover span {
  color: #FFFF;
}

.register-to-picardata {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 50px;
  /* identical to box height, or 250% */

  text-align: center;
  // letter-spacing: 1px;

  /* Body Text */

  color: #313131;
}
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
  }
}

.mt-4{
  margin-top: 1.25rem;
}

.mb-4{
  margin-bottom: 1.25rem;
}

.form-check-input{
  transform: scale(1.5);
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
}

.img-banner{
  margin-top: 48px;

  .btn{
    margin-top: 32px;
  }
}

.login-credential-input {
  background: #EFF0F7;
  border-radius: 16px;
}

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
</style>
