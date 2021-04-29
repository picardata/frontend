<template>
  <div class="row">
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
      <div class="row"> 
        <div class="col-sm-2 col-xs-12">
          <!-- <div class="row"> -->
            <div class="card">
              <img class="card-img-top" 
                  src="~/assets/profile-icon.png" 
                  alt="Card image cap">
            </div>
          <!-- </div> -->
        </div>
        <div class="col-sm-5 col-xs-12">
            <div class="row">
              <div class="col-sm-8 col-xs-12">
                <div class="font-weight-bold mb-4">
                  <h3>General Information</h3>
                </div>
                <RoundedInput v-model="profile.firstname"
                              v-on:input="valueChanged()"
                              placeholder="Your Firstname"
                              :disabled="isInViewMode()" 
                              label="First Name"/>
                <RoundedInput v-model="profile.lastname"
                              v-on:input="valueChanged()"
                              placeholder="Your Lastname"
                              :disabled="isInViewMode()" 
                              label="Last Name"/>
                <RoundedInput v-model="profile.email"
                              v-on:input="valueChanged()"
                              placeholder="Email"
                              :disabled="isInViewMode()" 
                              label="Email"/>
                <RoundedInput v-model="profile.phone"
                              v-on:input="valueChanged()"
                              placeholder="Phone"
                              :disabled="isInViewMode()" 
                              label="Phone"/>
                <ValidationProvider v-slot="{ errors }" vid="profile.location" name="profile.location">
                  <label>Location</label>
                  <div class="form-group">
                    <country-select
                      v-model="generalLocation"
                      country-name="true"
                      :country="generalLocation"
                      top-country="US"
                      name="address"
                      class-name="form-control picardata-input-rounded"
                      placeholder="Location"
                      :disabled="isInViewMode()"
                    />
                  </div>
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
        </div>
        <div class="col-sm-5 col-xs-12">
          <div class="row">
            <div class="col-sm-8 col-xs-12">
              <div class="font-weight-bold mb-4">
                <h3>Work Information</h3>
              </div>
              <ValidationProvider v-slot="{ errors }" vid="profile.lastname" name="profile.lastname">
                <AppControlInput
                  v-model="workOccupation"
                  :choices="choices"
                  :choices-selected="workOccupation"
                  placeholder="Choose Occupation"
                  control-type="select"
                  :disabled="isInViewMode()"
                  class="picardata-input-rounded"
                >
                  Occupation
                </AppControlInput>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <RoundedInput v-model="employee.role"
                            v-on:input="valueChanged()"
                            placeholder="Role"
                            :disabled="isInViewMode()" 
                            label="Role"/>
              <RoundedInput v-model="employee.organization"
                            v-on:input="valueChanged()"
                            placeholder="Organization"
                            :disabled="isInViewMode()" 
                            label="Organization"/>
              <RoundedInput v-model="employee.workLocation"
                            v-on:input="valueChanged()"
                            placeholder="City"
                            :disabled="isInViewMode()" 
                            label="City"/>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4 col-xs-12 text-right" v-if="buttonStatus != 'VIEW'">
              <span v-on:click="cancel">Cancel</span>
            </div>
            <div class="col-sm-8 col-xs-12 text-right">
              <button v-on:click="save" 
                      class="btn btn-primary btn-lg" 
                      :disabled="buttonStatus === 'EDIT'">
                <span v-if="buttonStatus === 'VIEW'">Edit Profile</span>
                <span v-else>Save Profile</span>
              </button>
            </div>
          </div>
        <!-- </form> -->
      <!-- </ValidationObserver> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import VuePhoneNumberInput from 'vue-phone-number-input'
import listCountryCode from '~/country-code.json'

export default {
  layout: 'argon',
  components: {
    ValidationObserver,
    ValidationProvider,
    VuePhoneNumberInput
  },
  async asyncData (context) {
    const userMe =  await context.app.$axios.get('/api/users/me')
      // .then((data) => {
    const phoneCountryCode = (phone) => {
      if (phone) {
        const code = phone.split(' ')[0]
        return listCountryCode.filter((i) => {
          return i.dial_code === code
        })[0].code
      }
    }

    const phoneNoCode = (phone) => {
      if (phone) {
        const i = phone.indexOf(' ')
        return phone.substr(i, phone.length)
      }
    }

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
          firstname: userProfile.data.userProfile.firstname,
          lastname: userProfile.data.userProfile.lastname,
          email: userProfile.data.userProfile.email,
          phone: userProfile.data.userProfile.phone,
          location: userProfile.data.userProfile.address
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
        workOccupation:  String(userProfile.data.occupation)
    };

    return resultData;
      // // .then((data) => {
      //   return {

      //   }
      // })
      // })
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
    async save() {
      if(this.buttonStatus === "VIEW") {
        this.buttonStatus = "EDIT"
      } else {
        // console.log('general location')
        const userProfileResult = 
          await this.$axios.$patch('/api/user-profiles/' + this.profile.id, {
            firstname: this.profile.firstname,
            lastname: this.profile.lastname,
            address: this.generalLocation,
            phone: this.profile.phone,
            email: this.profile.email
          });


        const employeeResult = await this.$axios.$patch('/api/employees/' + this.employee.id, {
            role: this.employee.role,
            occupation: this.workOccupation,
            company: {
              name: this.employee.organization,
              location: this.employee.workLocation
            }
        });

        this.buttonStatus = "VIEW";
      }
    },
    cancel() {
      this.buttonStatus = "VIEW"
    },
    isInViewMode() {
      return this.buttonStatus === "VIEW"
    },
    valueChanged() {
      this.buttonStatus = "SAVE"
    }
  },
  data () {
    return {
      choices: [
        {
          name: 'Occupation',
          id: 0
        },
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
    generalLocation: function() {
      this.valueChanged()
    },
    workOccupation: function() {
      this.valueChanged()
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
</style>
