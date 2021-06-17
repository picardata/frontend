<template>
  <div class="row picardata-profile">
    <div class="col-md-12 float-left">
      <div class="row">
        <base-header type="white" class="p-0">
          <div class="row align-items-center py-4">
            <!-- <div class="col-lg-12 col-12"> -->
            <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
              <route-breadcrumb :crumbs="crumbs" />
            </nav>
            <!-- </div> -->
          </div>
        </base-header>
      </div>
    </div>

    <div class="col-md-12">
      <div class="float-left picardata-title">
        <div class="row">
          <a class="col-sm-2 pd-icon pdicon-Back-Arrow picardata-arrow" href="/" />
          <!-- <div class="col-sm-1"></div> -->
          <!-- <div class="col-sm-1" style="color: #14142B;"> -->
          <!-- </div> -->
          <div class="col-sm-10 profile-arrow-text">
            Manage Profile
          </div>
          <!-- <div class="col-sm-4"></div> -->
        </div>
      </div>
    </div>

    <div class="col-md-12" style="margin-top: 4%;">
      <ValidationObserver ref="form" v-slot="{ handleSubmit }" @change="valueChanged">
        <form @submit.prevent="handleSubmit(save)">
          <div class="row">
            <div class="col-sm-2 col-xs-12">
              <!-- <div class="row"> -->
              <div class="card">
                <img
                  class="card-img-top"
                  src="~/assets/profile-icon.png"
                  alt="Card image cap"
                >
              </div>
              <!-- </div> -->
            </div>
            <div class="col-sm-5 col-xs-12">
              <div class="row">
                <div class="col-sm-8 col-xs-12">
                  <div class="font-weight-bold mb-4">
                    <h3 class="main-title">
                      General Information
                    </h3>
                  </div>
                  <!--              <RoundedInput-->
                  <!--                :id="'input-text-first-name'"-->
                  <!--                v-model="profile.firstname"-->
                  <!--                placeholder="Your Firstname"-->
                  <!--                :disabled="isInViewMode()"-->
                  <!--                label="First Name"-->
                  <!--                @input="valueChanged()"-->
                  <!--              />-->
                  <!--              <RoundedInput-->
                  <!--                :id="'input-text-last-name'"-->
                  <!--                v-model="profile.lastname"-->
                  <!--                placeholder="Your Lastname"-->
                  <!--                :disabled="isInViewMode()"-->
                  <!--                label="Last Name"-->
                  <!--                @input="valueChanged()"-->
                  <!--              />-->
                  <!--              <RoundedInput-->
                  <!--                :id="'input-text-email'"-->
                  <!--                v-model="profile.email"-->
                  <!--                placeholder="Email"-->
                  <!--                :disabled="isInViewMode()"-->
                  <!--                label="Email"-->
                  <!--                @input="valueChanged()"-->
                  <!--              />-->
                  <!--              <RoundedInput-->
                  <!--                :id="'input-text-phone-number'"-->
                  <!--                v-model="profile.phone"-->
                  <!--                placeholder="Phone number"-->
                  <!--                :disabled="isInViewMode()"-->
                  <!--                label="Phone number"-->
                  <!--                @input="valueChanged()"-->
                  <!--              />-->
                  <!--              <RoundedInput-->
                  <!--                :id="'input-text-location'"-->
                  <!--                v-model="generalLocation"-->
                  <!--                placeholder="Location"-->
                  <!--                :disabled="isInViewMode()"-->
                  <!--                label="Location"-->
                  <!--                @input="valueChanged()"-->
                  <!--              />-->
                  <ValidationProvider v-slot="{ errors }" rules="required" vid="profile.firstname" name="firstname">
                    <div class="form-group">
                      <label class="label">First Name</label>
                      <input v-model="profile.firstname" type="text" class="login-credential-input form-control" placeholder="Firstname" :disabled="isInViewMode()">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider v-slot="{ errors }" rules="required" vid="profile.lastname" name="lastname">
                    <div class="form-group">
                      <label class="label">Last Name</label>
                      <input v-model="profile.lastname" type="text" class="login-credential-input form-control" placeholder="Lastname" :disabled="isInViewMode()">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider v-slot="{ errors }" mode="passive" rules="required|email" vid="profile.email" name="email">
                    <div class="form-group">
                      <label class="label">Email</label>
                      <input v-model="profile.email" type="text" class="login-credential-input form-control" placeholder="Email" disabled="">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="profile.phone" name="phone">
                    <div class="form-group">
                      <label class="label">Phone number</label>
                      <VuePhoneNumberInput
                        v-model="profile.phone"
                        placeholder="Phone Number"
                        class="form-group phonenumber-custom"
                        default-country-code="SG"
                        type="tel"
                        :disabled="isInViewMode()"
                        @update="profile.formattedPhone = $event.e164"
                      />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="profile.address" name="location">
                    <div class="form-group">
                      <label class="label">Location</label>
                      <input v-model="profile.location" type="text" class="login-credential-input form-control" placeholder="Location" :disabled="isInViewMode()">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
              </div>
            </div>
            <div class="col-sm-5 col-xs-12">
              <div class="row">
                <div class="col-sm-8 col-xs-12">
                  <div class="font-weight-bold mb-4">
                    <h3 class="main-title">
                      Work Information
                    </h3>
                  </div>
                  <ValidationProvider v-slot="{ errors }" rules="oneOf:1,2,3,4" vid="occupation" name="occupation">
                    <div class="form-group">
                      <label class="label">Occupation</label>
                      <select id="input-select-occupation" v-model="workOccupation" class="form-control radius-input" :disabled="isInViewMode()">
                        <option v-for="(choice, key) in choices" :key="choice + key" :value="choice.id">
                          {{ choice.name }}
                        </option>
                      </select>
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <!--              <RoundedInput-->
                  <!--                :id="'input-text-role'"-->
                  <!--                v-model="employee.role"-->
                  <!--                placeholder="Role"-->
                  <!--                :disabled="isInViewMode()"-->
                  <!--                label="Role"-->
                  <!--                @input="valueChanged()"-->
                  <!--              />-->
                  <!--              <RoundedInput-->
                  <!--                :id="'input-text-company'"-->
                  <!--                v-model="employee.organization"-->
                  <!--                placeholder="Company"-->
                  <!--                :disabled="isInViewMode()"-->
                  <!--                label="Company"-->
                  <!--                @input="valueChanged()"-->
                  <!--              />-->
                  <!--              <RoundedInput-->
                  <!--                :id="'input-text-city'"-->
                  <!--                v-model="employee.workLocation"-->
                  <!--                placeholder="City"-->
                  <!--                :disabled="isInViewMode()"-->
                  <!--                label="City"-->
                  <!--                @input="valueChanged()"-->
                  <!--              />-->
                  <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="role" name="role">
                    <div class="form-group">
                      <label class="label">Role</label>
                      <input v-model="profile.role" type="text" class="login-credential-input form-control" placeholder="Role" :disabled="isInViewMode()">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="company.name" name="Organization">
                    <div class="form-group">
                      <label class="label">Organization</label>
                      <input v-model="profile.organization" type="text" class="login-credential-input form-control" placeholder="Organization" :disabled="isInViewMode()">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="company.location" name="City">
                    <div class="form-group">
                      <label class="label">City</label>
                      <input v-model="profile.workLocation" type="text" class="login-credential-input form-control" placeholder="Work Location" :disabled="isInViewMode()">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
              </div>
              <div v-if="buttonStatus !== 'LOADING'" class="row button-radius">
                <div v-if="buttonStatus != 'VIEW'" class="col-sm-4 col-xs-12 text-left cancel-button" style="margin: auto">
                  <span id="button-cancel-edit-profle" @click="cancel">Cancel</span>
                </div>
                <div v-if="buttonStatus === 'VIEW'" class="col-sm-8 col-xs-12 text-right">
                  <button
                    id="button-edit-profile"
                    class="btn btn-primary btn-lg"
                    type="button"
                    @click="save"
                  >
                    <span>Edit Profile</span>
                  </button>
                </div>
                <div v-else class="col-sm-8 col-xs-12">
                  <button
                    id="button-save-profile"
                    class="btn btn-primary btn-lg"
                    :disabled="buttonStatus !== 'SAVE'"
                    type="submit"
                    @click="save"
                  >
                    <span>Save Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import listCountryCode from '~/country-code.json'
import loaderMixin from '~/mixins/loader'

export default {
  layout: 'argon',
  components: {
    ValidationObserver,
    ValidationProvider,
    VuePhoneNumberInput
  },
  mixins: [
    loaderMixin
  ],
  async asyncData (context) {
    const userMe = await context.app.$axios.get('/api/users/me')
    // .then((data) => {
    const phoneCountryCode = (phone) => {
      if (phone) {
        const code = phone.split(' ')[0]
        return listCountryCode.filter((i) => {
          return i.dial_code === code
        })[0].code
      }
    }

    // const phoneNoCode = (phone) => {
    //   if (phone) {
    //     const i = phone.indexOf(' ')
    //     return phone.substr(i, phone.length)
    //   }
    // }

    const userProfile = await context.app.$axios.get('/api/user-profiles/' + context.app.$auth.user.userProfile.id + '/employees/me')
    const resultData = {
      employee: {
        id: userProfile.data.id,
        role: userProfile.data.role,
        occupation: String(userProfile.data.occupation),
        organization: userProfile.data.company.name,
        workLocation: userProfile.data.company.location
      },
      profile: {
        id: userMe.data.user.userProfile.id,
        firstname: userMe.data.user.userProfile.firstname,
        lastname: userMe.data.user.userProfile.lastname,
        email: userMe.data.user.userProfile.email,
        phone: userMe.data.user.userProfile.phone,
        phoneCountryCode: phoneCountryCode(userMe.data.user.userProfile.phone),
        formattedPhone: userMe.data.user.userProfile.phone,
        location: userMe.data.user.userProfile.address
      },
      generalLocation: userMe.data.user.userProfile.address,
      workOccupation: String(userProfile.data.occupation),
      buttonStatus: 'VIEW'
    }

    return resultData
    // // .then((data) => {
    //   return {

    //   }
    // })
    // })
  },
  data () {
    return {
      choices: [
        {
          name: 'Artist',
          id: 1
        },
        {
          name: 'Designer',
          id: 2
        },
        {
          name: 'Software Developer',
          id: 3
        },
        {
          name: 'Sales & Marketing',
          id: 4
        }
      ],
      crumbs: [
        {
          name: 'Profile',
          path: '/profile'
        }
      ],
      buttonStatus: 'VIEW'
    }
  },
  watch: {
    generalLocation () {
      this.valueChanged()
    },
    workOccupation () {
      this.valueChanged()
    }
  },
  methods: {
    submitGeneral () {
      this.$axios.$patch('/api/user-profiles/' + this.profile.id, {
        firstname: this.profile.firstname,
        lastname: this.profile.lastname,
        address: this.profile.location,
        phone: this.profile.formattedPhone ? this.profile.formattedPhone : '',
        email: this.profile.email
      }).then(() => {
        this.$router.push('/profile/me')
      }).catch((e) => {
        const errors = {}

        if (e.response.data.errors !== undefined) {
          Object.entries(e.response.data.errors).forEach(function (value) {
            const key = 'profile.' + value[0]
            errors[key] = value[1]
          })
        }
        this.$refs.form.setErrors(errors)
        return false
      })
    },
    async save () {
      if (this.buttonStatus === 'VIEW') {
        this.buttonStatus = 'EDIT'
      } else {
        const isValid = await this.$refs.form.validate()
        if (!isValid) {
          return false
        }

        this.buttonStatus = 'LOADING'
        try {
          await this.$axios.$patch('/api/user-profiles/' + this.profile.id, {
            firstname: this.profile.firstname,
            lastname: this.profile.lastname,
            address: this.generalLocation,
            phone: this.profile.phone,
            email: this.profile.email
          })

          await this.$axios.$patch('/api/employees/' + this.employee.id, {
            role: this.employee.role,
            occupation: this.workOccupation,
            company: {
              name: this.employee.organization,
              location: this.employee.workLocation
            }
          })
        } finally {
          this.buttonStatus = 'VIEW'
        }
      }
    },
    cancel () {
      this.buttonStatus = 'LOADING'
      this.$nuxt.refresh()
      this.$refs.form.reset()
    },
    isInViewMode () {
      return this.buttonStatus === 'VIEW'
    },
    valueChanged () {
      this.buttonStatus = 'SAVE'
    }
  }
}
</script>
<style lang="scss" scoped>
.profile-arrow-text {
  font-family: Poppins;
font-style: normal;
font-weight: bold;
font-size: 24px;
line-height: 48px;
/* identical to box height */

letter-spacing: 0.75px;

/* Body Text */

color: #313131;
}

.picardata-arrow {
  color: #14142B;
  margin: auto;
  font-size: 30px;
}

.cancel-button {
  color: #4E4B66;
  cursor: pointer;
}

.main-title {
  color: #313131;
}

option, .form-control:focus {
  background: #EFF0F7;
  border-radius: 15px;
}

.button-radius button {
  background: #2534B6;
  border-radius: 40px;
  color: #F7F7FC;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
  /* or 175% */

  // display: flex;
  // align-items: center;
  text-align: center;
  letter-spacing: 0.75px;
}
.text-link{
  font-size: 16px;
  color: #3E4EDD;
  font-weight: 600;
  display: block;
  text-decoration: underline;
  margin-top: 16px;
}

.sub-title{
  font-size: 18px;
  font-weight: 600;
  color: #313131;
}
.login-credential-input{
  &::placeholder{
    color: #A0A3BD;
    font-size: 16px;
  }
}
select.login-credential-input{
  appearance: none;

  + span{
    position: absolute;
    right: 40px;
    top: 20%;
  }
}

.text-danger{
  position: relative;
  top: 4px;
}

.mt-80{
  margin-top: 80px;
}
.label {
  color: #181C3B;
}

input:disabled{
  opacity: 0.5;
}
</style>
