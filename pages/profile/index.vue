<template>
  <div class="row p-4 mr-0">
    <div class="col-sm-2 col-xs-12">
      <div class="row">
        <div class="card">
          <img class="card-img-top" src="https://www.nicepng.com/png/detail/186-1866063_dicks-out-for-harambe-sample-avatar.png" alt="Card image cap">
        </div>
      </div>
    </div>
    <div class="col-sm-5 col-xs-12">
      <!-- <ValidationObserver ref="form" v-slot="{ handleSubmit }"> -->
        <!-- <form> -->
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
        <!-- </form> -->
      <!-- </ValidationObserver> -->
    </div>
        <div class="col-sm-5 col-xs-12">
      <!-- <ValidationObserver ref="form" v-slot="{ handleSubmit }"> -->
        <!-- <form> -->
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
              <ValidationProvider v-slot="{ errors }" vid="profile.role" name="employee.role">
                <AppControlInput v-model="employee.role" placeholder="Role" type="text">
                  Role
                </AppControlInput>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" vid="employee.organization" name="employee.organization">
                <AppControlInput v-model="employee.organization" placeholder="Organization" type="text">
                  Organization
                </AppControlInput>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" vid="employee.workLocation" name="employee.workLocation">
              <div class="form-group">
                <label>City</label>
                <input v-model="employee.workLocation" 
                       placeholder="Work Location" 
                       required="required" 
                       type="text" 
                       class="form-control picardata-input-rounded" 
                       name="address"
                       disabled> 
              </div>
                <!-- <label>City</label>
                <div class="form-group">
                  <country-select
                    v-model="employee.workLocation"
                    country-name="true"
                    :country="employee.workLocation"
                    top-country="US"
                    name="address"
                    class-name="form-control"
                    placeholder="Work Location"
                  />
                </div> -->
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
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
          phone: phoneNoCode(userMe.data.user.userProfile.phone),
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
    save() {
      console.log('Di save bro !');
      this.buttonStatus = "EDIT"
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
