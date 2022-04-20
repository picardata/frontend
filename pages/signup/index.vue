<template>
  <div class="bg-outer">
    <div class="wrapper">
      <div class="container picardata-container">
        <div class="row">
          <div class="col-md-12">
            <div v-if="isCVSignupFlow" class="title-wrapper mb-5 text-left text-primary">
              <h2>Create a free account</h2>
              <p>Be notified when there is a match between your profile with an employer's</p>
              <p>At Globelise, our automated intelligence system works through thousand of employer and employee profiles everyday to find matches in expectations in terms of interest, skillset, personalities, working styles and work culture.</p>
              <p>Build your professional career with ease, by letting Globelise help you find your ideal employer from anywhere in the world with just a few clicks.</p>
            </div>
            <div v-else class="title-wrapper text-center mb-5">
              <h2>Sign up</h2>
              <span />
            </div>

            <div class="google-login-wrapper mb-4">
              <GoogleLogin :params="params" :render-params="renderParams" :on-success="onSuccess" :on-failure="onFailure">
                Sign up
              </GoogleLogin>
            </div>

            <div class="title-wrapper text-center">
              <span>or</span>
            </div>

            <div class="body-form-wrapper mt-4">
              <span class="description">Sign up using email address</span>

              <div class="form-group mt-4">
                <label
                  :class="[`form-control-label`, {'d-none': !errors.firstname}]"
                >
                  First Name
                </label>
                <input
                  v-model="firstname"
                  :class="[`form-control`, 'login-credential-input', {'error': errors.firstname}]"
                  placeholder="Full Name"
                >
                <span v-if="this.firstname.length > 0 && errors.firstname" class="form-icon" @click="emptyInput('firstname')"><i class="fa fa-times" /></span>
                <span
                  :class="['form-control-error', {'d-none': !errors.firstname}]"
                >
                  {{ errors.firstname }}
                </span>
              </div>

              <div class="form-group mt-4">
                <label
                  :class="[`form-control-label`, {'d-none': !errors.lastname}]"
                >
                  Last Name
                </label>
                <input
                  v-model="lastname"
                  :class="[`form-control`, 'login-credential-input', {'error': errors.lastname}]"
                  placeholder="Last Name"
                >
                <span v-if="this.lastname.length > 0 && errors.lastname" class="form-icon" @click="emptyInput('lastname')"><i class="fa fa-times" /></span>
                <span
                  :class="['form-control-error', {'d-none': !errors.lastname}]"
                >
                  {{ errors.lastname }}
                </span>
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
                  maxlength="50"
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
                  Confirm Password
                </label>
                <input
                  v-model="passwordAgain"
                  :type="showPasswordAgain ? 'text' : 'password'"
                  :class="[`form-control`, 'login-credential-input', {'error': errors.passwordAgain}]"
                  placeholder="Confirm Password"
                  autocomplete="off"
                  maxlength="50"
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
              <div class="form-group mt-4">
                <div>
                  <input v-model="termAndPrivacy" type="checkbox" @click="handleTermAndPrivacy">
                  By Continuing, you confirm and acknowledge that you have read and you agree to our <a href="https://drive.google.com/file/d/11qIsXocRG6EtkpdhH1649HVC5VgAB4Vp/view?usp=sharing" target="_blank">terms of services</a> and <a href="https://drive.google.com/file/d/1qOjaPGbIyLNNlVV4AeWN3CUz9Lkt4VQd/view?usp=sharing" target="_blank">privacy policy</a>.
                </div>
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

            <div class="footer-form-wrapper text-center justify-content-center mt-3">
              Already had an account?
              <nuxt-link to="/login" class="already-had-account">
                <span class="already-had-account-text">Sign in</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import GoogleLogin from 'vue-google-login'
import loaderMixin from '~/mixins/loader'

export default {
  name: 'AdminAuthPage',
  layout: 'empty',
  auth: false,
  components: {
    GoogleLogin
  },
  mixins: [
    loaderMixin
  ],
  data () {
    return {
      errors: {
        username: '',
        password: '',
        passwordAgain: '',
        firstname: '',
        lastname: ''
      },
      params: {
        client_id: '581341020272-t0geef2e7q4pmimguk3lseh774n12lkd.apps.googleusercontent.com'
      },
      renderParams: {
        height: 40,
        width: 499,
        longtitle: true
      },
      showPassword: false,
      showPasswordAgain: false,
      isLogin: false,
      disableRegisterButton: true,
      username: '',
      password: '',
      passwordAgain: '',
      firstname: '',
      lastname: '',
      termAndPrivacy: false,
      isCVSignupFlow: false,
      userProfileId: null
    }
  },
  created () {
    if (Object.hasOwnProperty.call(this.$route.query, 'cv')) {
      this.isCVSignupFlow = true
    }
  },
  mounted () {
    this.disableAutoComplete()
  },
  // beforeMount () {
  //   return this.$auth.loggedIn ? this.$router.push('/') : ''
  // },
  methods: {
    onFailure () {

    },
    async onSuccess (googleUser) {
      const idToken = googleUser.getAuthResponse().id_token

      await this.$axios
        .$post('/google/validate/user', {
          idToken
        })
        .then((data) => {
          this.username = data.username
          this.firstname = data.givenname
          this.lastname = data.familyname
          this.password = this.passwordAgain = this.generatePassword()

          if (!this.isLogin) {
            let result = this.$axios
              .$post('/api/users/', {
                username: this.username,
                password: this.password,
                userProfile: {
                  firstname: this.firstname,
                  lastname: this.lastname,
                  email: this.username
                }
              })
              .then((data) => {
                this.userProfileId = data.userProfile.id

                this.$auth.loginWith('local', {
                  data: {
                    username: this.username,
                    password: this.password,
                    userProfile: {
                      firstname: this.firstname,
                      email: this.username
                    }
                  }
                }).then(() => {
                  if (!this.isLogin) {
                    if (Object.hasOwnProperty.call(this.$route.query, 'id') && Object.hasOwnProperty.call(this.$route.query, 'type')) {
                      const id = this.$route.query.id
                      const contractType = this.$route.query.type

                      window.location.href = '/onboarding?id=' + id + '&type=' + contractType
                    } else if (Object.hasOwnProperty.call(this.$route.query, 'cv')) {
                      const employeeData = {
                        userProfile: this.userProfileId,
                        role: '',
                        occupation: '',
                        taxID: '',
                        nationality: '',
                        countryOfTaxResidence: '',
                        timezone: '',
                        street: '',
                        city: '',
                        postalCode: '',
                        phoneNumber: '',
                        isCompanyAdmin: false,
                        isGlobeliseAdmin: false,
                        company: null
                      }

                      this.$axios.$post('/api/employees/',
                        employeeData
                      ).then((data) => {
                        this.$auth.setUser(data)
                        window.location.href = '/cv/edit'
                      }).catch(() => {
                        return false
                      })
                    } else if (Object.hasOwnProperty.call(this.$route.query, 'partnerRegistration')) {
                      const employeeData = {
                        userProfile: this.userProfileId,
                        role: '',
                        occupation: '',
                        taxID: '',
                        nationality: '',
                        countryOfTaxResidence: '',
                        timezone: '',
                        street: '',
                        city: '',
                        postalCode: '',
                        phoneNumber: '',
                        isCompanyAdmin: false,
                        isGlobeliseAdmin: false,
                        company: null
                      }

                      this.$axios.$post('/api/employees/',
                        employeeData
                      ).then((data) => {
                        this.$auth.setUser(data)
                        window.location.href = '/store/partners/register'
                      }).catch(() => {
                        return false
                      })
                    } else {
                      window.location.href = '/onboarding'
                    }
                  } else {
                    window.location.href = '/'
                  }
                })
              })
              .catch((e) => {
                this.errors = []
                for (const field of ['username', 'password']) {
                  const errors = e.response.data.errors[field]
                  if (errors !== undefined) {
                    this.errors[field] = errors.join(', ')
                  }
                }

                result = false
              })

            if (result === false) {
              this.errors.password = '<i class="fa fa-exclamation-circle"></i> Email or password  you entered is incorrect'
              return false
            }
          }
        })
        .catch(() => {
          this.errors.username = '<i class="fa fa-exclamation-circle"></i> Invalid username'
          return false
        })
    },
    async onSubmit () {
      const isValidate = this.validateEmail() && this.validatePassword() && this.validatePasswordAgain()
      if (!isValidate) {
        return false
      }

      if (!this.isLogin) {
        let result
        try {
          result = await this.$axios.$post('/api/users/', {
            username: this.username,
            password: this.password,
            userProfile: {
              firstname: this.firstname,
              lastname: this.lastname,
              email: this.username
            }
          }).then((data) => {
            this.userProfileId = data.userProfile.id
          })
        } catch (e) {
          this.errors = []
          for (const field of ['username', 'password']) {
            const errors = e.response.data.errors[field]
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
            password: this.password,
            userProfile: {
              firstname: this.firstname,
              email: this.username
            }
          }
        })
        if (!this.isLogin) {
          if (Object.hasOwnProperty.call(this.$route.query, 'id') && Object.hasOwnProperty.call(this.$route.query, 'type')) {
            const id = this.$route.query.id
            const contractType = this.$route.query.type

            this.$router.push('/onboarding?id=' + id + '&type=' + contractType)
          } else if (Object.hasOwnProperty.call(this.$route.query, 'cv')) {
            const employeeData = {
              userProfile: this.userProfileId,
              role: '',
              occupation: '',
              taxID: '',
              nationality: '',
              countryOfTaxResidence: '',
              timezone: '',
              street: '',
              city: '',
              postalCode: '',
              phoneNumber: '',
              isCompanyAdmin: false,
              isPartnerAdmin: false,
              isGlobeliseAdmin: false,
              company: null
            }

            this.$axios.$post('/api/employees/',
              employeeData
            ).then((data) => {
              this.$auth.setUser(data)
              window.location.href = '/cv/edit'
            }).catch(() => {
              return false
            })
          } else if (Object.hasOwnProperty.call(this.$route.query, 'partnerRegistration')) {
            const employeeData = {
              userProfile: this.userProfileId,
              role: '',
              occupation: '',
              taxID: '',
              nationality: '',
              countryOfTaxResidence: '',
              timezone: '',
              street: '',
              city: '',
              postalCode: '',
              phoneNumber: '',
              isCompanyAdmin: false,
              isPartnerAdmin: true,
              isGlobeliseAdmin: false,
              company: null
            }

            const marketplacePartnerData = {
              name: '',
              country: 'SG',
              registrationNumber: '',
              industry: '',
              website: '',
              businessDescription: '',
              partnershipStatus: 1
            }

            const companyData = {
              name: '',
              location: '',
              street: '',
              city: '',
              postalCode: '',
              entityType: '',
              vatID: '',
              registrationNumber: '',
              country: '',
              companyMarketplacePartner: ''
            }

            await this.$axios.$post('/api/marketplace/partner/',
              marketplacePartnerData
            ).then((data) => {
              const marketPlace = data
              companyData.companyMarketplacePartner = marketPlace.id

              this.$axios.$post('/api/companies/',
                companyData
              ).then((data) => {
                employeeData.company = data.id

                this.$axios.$post('/api/employees/',
                  employeeData
                ).then((data) => {
                  this.$auth.setUser(data)
                  window.location.href = '/store/partners/' + marketPlace.uuid + '/edit'
                }).catch(() => {
                  return false
                })
              }).catch(() => {
                return false
              })
            }).catch(() => {
              return false
            })
          } else {
            this.$router.push('/onboarding')
          }
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
      if (originalPassword.length === 0 || repeatedPassword.length === 0) {
        return true
      }
      return originalPassword === repeatedPassword
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
        this.errors.password = 'Minimum password length 8 characters'
        return false
      }

      if (!this.isAcceptedCharacterPassword(password)) {
        this.errors.password = 'Accepted special character for password only !@#$%^&*!'
        return false
      }

      // const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
      // const test = re.test(password)

      if (!this.isPasswordFormatValid(password)) {
        this.errors.password = 'Please choose more secure and unique password. Must be at least 8 to maximum 50 characters long with at least one upper case letter, number, and special character'
        return false
      }

      // if (this.validateEmail() && this.validatePasswordAgain()) {
      //   this.disableRegisterButton = false;
      // }

      const passwordAgain = this.passwordAgain

      if (!this.isPasswordMatched(password, passwordAgain)) {
        this.errors.passwordAgain = "Password isn't matched"
        this.errors.password = this.errors.passwordAgain
        return false
      }

      this.errors.password = ''
      this.errors.passwordAgain = ''
      return true
    },
    isAcceptedCharacterPassword (password) {
      const re = /^[a-zA-Z0-9!@#$%^&*]+$/i
      const test = re.test(password)

      return test
    },
    validatePasswordAgain () {
      const password = this.passwordAgain

      const originalPassword = this.password

      if (!this.isPasswordMatched(originalPassword, password)) {
        this.errors.passwordAgain = "Password isn't matched"
        this.errors.password = this.errors.passwordAgain
        return false
      }

      if (!this.isPasswordLengthValid(password)) {
        this.errors.passwordAgain = 'Minimum password length 8 characters'
        return false
      }

      if (!this.isAcceptedCharacterPassword(password)) {
        this.errors.passwordAgain = 'Accepted special character for password only !@#$%^&*!'
        return false
      }

      if (!this.isPasswordFormatValid(password)) {
        this.errors.passwordAgain = 'Please choose more secure and unique password. Must be at least 8 to maximum 50 characters long with at least one upper case letter, number, and special character.'
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
      this.errors.password = ''
      return true
    },
    generatePassword () {
      const length = 16
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*!'
      let retVal = ''
      for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n))
      }
      return retVal
    },
    isFieldValid () {
      return this.isEmailFormatValid(this.username) &&
          this.isPasswordLengthValid(this.password) &&
          this.isPasswordLengthValid(this.passwordAgain) &&
          this.isPasswordFormatValid(this.password) &&
          this.isPasswordFormatValid(this.passwordAgain) &&
          this.isPasswordMatched(this.password, this.passwordAgain)
    },
    validateForRegisterButton () {
      if (this.isEmailFormatValid(this.username) &&
          this.isPasswordLengthValid(this.password) &&
          this.isPasswordLengthValid(this.passwordAgain) &&
          this.isPasswordFormatValid(this.password) &&
          this.isPasswordFormatValid(this.passwordAgain) &&
          this.isPasswordMatched(this.password, this.passwordAgain) &&
          this.termAndPrivacy) {
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
    },
    handleTermAndPrivacy () {
      if (this.isFieldValid() &&
         !this.termAndPrivacy) {
        this.disableRegisterButton = false
      } else {
        this.disableRegisterButton = true
      }
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
  background: #6bb745;
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
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
  /* identical to box height, or 200% */

  letter-spacing: 0.75px;

  /* Main Blue */

  color: #2E4823;

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
  font-family: 'Roboto Condensed';
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
  background-color: #f4f3f5;
  padding: 3em 16em;
}

.wrapper{
  width: 65%;
  height: auto;
  /*border-radius: 16px;*/
  padding: 2rem;
}

.body-form-wrapper {
  background: #ffffff;
  padding: 3rem 2rem 0.5rem 2rem;

  .description {
    text-align: center;
    width: 100%;
    display: block;
    font-size: 18px;
  }
}

.title-wrapper{
  font-family: 'Roboto Condensed';

  h2{
    margin-top: 24px;
    margin-bottom: 32px;
    font-size: 32px;
    font-weight: 900;
    color: #2e4823;
    font-family: 'Roboto', sans-serif;
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

.login-credential-input {
  background: #ffffff;
  border-radius: 0;
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

.already-had-account {
  font-size: 14px;

  .already-had-account-text {
    text-decoration: underline;
    text-underline: #2e4823;
    padding: 0;
    margin-top: -4px;
    font-size: 15px;
    color: #2e4823;
    text-decoration: underline;

    &:hover {
      background-color: #f4f3f5;
      box-shadow: none;
      color: #2e4823;
    }
  }
}
</style>
