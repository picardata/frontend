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
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitGeneral)">
          <div class="row">
            <div class="col-sm-8 col-xs-12">
              <div class="font-weight-bold mb-4">
                <h3>General Information</h3>
              </div>
              <ValidationProvider v-slot="{ errors }" vid="profile.firstname" name="profile.firstname">
                <AppControlInput v-model="profile.firstname" placeholder="Your Firstname" required="required" type="text">
                  First Name
                </AppControlInput>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" vid="profile.lastname" name="profile.lastname">
                <AppControlInput v-model="profile.lastname" placeholder="Your Lastname" type="text">
                  Last Name
                </AppControlInput>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" vid="profile.email" name="profile.email">
                <AppControlInput v-model="profile.email" placeholder="Email" type="email" required="required">
                  Email
                </AppControlInput>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" vid="profile.phone" name="profile.phone">
                Phone
                <VuePhoneNumberInput
                  v-model="profile.phone"
                  placeholder="Phone Number"
                  class="form-group"
                  :default-country-code="profile.phoneCountryCode ? profile.phoneCountryCode : 'SG'"
                  type="tel"
                  @update="profile.formattedPhone = $event.e164"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" vid="profile.location" name="profile.location">
                <label>Location</label>
                <div class="form-group">
                  <country-select
                    v-model="profile.location"
                    country-name="true"
                    :country="profile.location"
                    top-country="US"
                    name="address"
                    class-name="form-control"
                    placeholder="Location"
                  />
                </div>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-sm-8 col-xs-12 text-right">
              <button type="submit" class="btn btn-primary btn-lg">
                Save Profile Information
              </button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
        <div class="col-sm-5 col-xs-12">
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitGeneral)">
          <div class="row">
            <div class="col-sm-8 col-xs-12">
              <div class="font-weight-bold mb-4">
                <h3>General Information</h3>
              </div>
              <ValidationProvider v-slot="{ errors }" vid="profile.firstname" name="profile.firstname">
                <AppControlInput v-model="profile.firstname" placeholder="Your Firstname" required="required" type="text">
                  First Name
                </AppControlInput>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" vid="profile.lastname" name="profile.lastname">
                <AppControlInput v-model="profile.lastname" placeholder="Your Lastname" type="text">
                  Last Name
                </AppControlInput>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" vid="profile.email" name="profile.email">
                <AppControlInput v-model="profile.email" placeholder="Email" type="email" required="required">
                  Email
                </AppControlInput>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" vid="profile.phone" name="profile.phone">
                Phone
                <VuePhoneNumberInput
                  v-model="profile.phone"
                  placeholder="Phone Number"
                  class="form-group"
                  :default-country-code="profile.phoneCountryCode ? profile.phoneCountryCode : 'SG'"
                  type="tel"
                  @update="profile.formattedPhone = $event.e164"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" vid="profile.location" name="profile.location">
                <label>Location</label>
                <div class="form-group">
                  <country-select
                    v-model="profile.location"
                    country-name="true"
                    :country="profile.location"
                    top-country="US"
                    name="address"
                    class-name="form-control"
                    placeholder="Location"
                  />
                </div>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-sm-8 col-xs-12 text-right">
              <button type="submit" class="btn btn-primary btn-lg">
                Save Profile Information
              </button>
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
import listCountryCode from '~/country-code.json'

export default {
  layout: 'argon',
  components: {
    ValidationObserver,
    ValidationProvider,
    VuePhoneNumberInput
  },
  async asyncData (context) {
    return await context.app.$axios.get('/api/users/me')
      .then((data) => {
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

        return {
          profile: {
            id: data.data.user.userProfile.id,
            firstname: data.data.user.userProfile.firstname,
            lastname: data.data.user.userProfile.lastname,
            email: data.data.user.userProfile.email,
            phone: phoneNoCode(data.data.user.userProfile.phone),
            phoneCountryCode: phoneCountryCode(data.data.user.userProfile.phone),
            formattedPhone: data.data.user.userProfile.phone,
            location: data.data.user.userProfile.address
          }
        }
      })
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
    }
  }
}
</script>
