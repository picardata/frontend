<template>
  <div class="bg-outer">
    <div class="wrapper">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
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
              <span class="form-icon" @click="emptyInput('email')"><i class="fa fa-times" /></span>
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

              <span v-if="showPassword" class="form-icon" @click="togglePassword"><i class="fa fa-eye-slash" /></span>
              <span v-else class="form-icon" @click="togglePassword"><i class="fa fa-eye" /></span>

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
                placeholder="Password Again"
                @change="validatePasswordAgain"
                v-on:keyup="validateForRegisterButton"
              >

              <span v-if="showPasswordAgain" 
                    class="form-icon" @click="togglePasswordAgain">
                    <i class="fa fa-eye-slash" />
              </span>
              <span v-else class="form-icon" 
                    @click="togglePasswordAgain">
                    <i class="fa fa-eye" />
              </span>

              <span
                :class="[`form-control-error`, {'d-none': !errors.passwordAgain}]"
                v-html="errors.passwordAgain"
              />
            </div>

            <button
              type="button"
              :class="['btn btn-primary btn-block mt-4 mb-4 rounded']"
              @click="onSubmit"
              :disabled="disableRegisterButton"
            >
              Register
            </button>

          </div>
          <div class="col-md-6">
            <div class="img-banner">
              <img src="~/assets/register-now-red.png" alt="">

              <nuxt-link to="/login" class="btn btn-outline-primary btn-block">
                Already had an account? Sign in
              </nuxt-link>
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
        email: '',
        password: '',
        passwordAgain: ''
      },
      showPassword: false,
      showPasswordAgain: false,
      isLogin: false,
      disableRegisterButton: true,
      email: '',
      password: '',
      passwordAgain: ''
    }
  },
  // beforeMount () {
  //   return this.$auth.loggedIn ? this.$router.push('/') : ''
  // },
  methods: {
    async onSubmit () {
      const isValidate = this.validateEmail() && this.validatePassword() && this.validatePasswordAgain();
      if (!isValidate) {
        return false
      }

      if (!this.isLogin) {
        let result;
        try {
           result = await this.$axios
                              .$post('/api/users/', {
                                username: this.email,
                                password: this.password
                              })
        } catch(e) {
            this.errors = []
            for (const field of ['username', 'password']) {
              const errors = e.response.data.errors[field]
              if (errors !== undefined) {
                this.errors = this.errors.concat(errors)
              }
            }
            result = false
        }

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
      if(!this.isEmailFormatValid(email)) {
        this.errors.email = 'Error email\'s format'
        return false;
      }

      this.errors.email = ''

      return true
    },
    isEmailFormatValid(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const test = re.test(email.toLowerCase())
      return test;
    },
    isPasswordLengthValid(password) {
      return password && password.length >= 8;
    },
    isPasswordMatched(originalPassword, repeatedPassword) {
      return originalPassword == repeatedPassword;
    },
    isPasswordFormatValid(password) {
      const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
      const test = re.test(password)

      return test;
    },
    validatePassword () {
      const password = this.password

      if(!this.isPasswordLengthValid(password)) {
        this.errors.password = 'Minimum password length 8 chars'
        return false
      }

      const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
      const test = re.test(password)


      if (!this.isPasswordFormatValid(password)) {
        this.errors.password = "Please choose more secure and unique password. Please try the following: add uppercase letters, add numbers, add special characters, add more characters."
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

      console.log('password again = ');
      console.log(password);

      if (!this.isPasswordLengthValid(password)) {
        this.errors.passwordAgain = 'Minimum password length 8 chars'
        return false
      }

      if (!this.isPasswordFormatValid(password)) {
        this.errors.passwordAgain = "Please choose more secure and unique password. Please try the following: add uppercase letters, add numbers, add special characters, add more characters."
        return false
      }

      const originalPassword = this.password;

      if(!this.isPasswordMatched(originalPassword, password)) {
        this.errors.passwordAgain = "Password isn't matched";
        this.errors.password = this.errors.passwordAgain;
        return false;
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
    validateForRegisterButton() {
      console.log('current password again = ');
      console.log(this.passwordAgain);
      const validatePassword = this.validatePassword();
      const validateEmail = this.validateEmail();
      console.log('validate password = ');
      console.log(validatePassword);
      console.log('validate email = ');
      console.log(validateEmail);
      // this.disableRegisterButton = false;
      if (this.isEmailFormatValid(this.email) 
          && this.isPasswordMatched(this.password, this.passwordAgain)) {
        this.disableRegisterButton = false;
      } else {
        this.disableRegisterButton = true;
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
