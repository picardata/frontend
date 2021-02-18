<template>
  <div class="col-12">
    <div v-if="step === 1" class="col-10">
      <div class="row text-center">
        <div class="mt-4 col-12">
          <div class="progress" style="height: 5px;">
            <div
              class="progress-bar bg-primary"
              role="progressbar"
              style="width: 30%"
              aria-valuenow="30"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-4 font-weight-bold">
          01. Welcome on board
        </div>
        <div class="col-4">
          02. Complete Profile
        </div>
        <div class="col-4">
          03. Start Integrating
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <H1>Welcome to Picardata!</H1>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <p>
            Welcome to your Picardata! Here in Picardata you’ll see bunch of benefits to view, check and maintenance your integrated app. Picardata is a tool that can help you managing your applications; either it’s to add any access to your applications or maybe other things!
          </p>
        </div>
      </div>
      <div class="row mt-5 justify-content-end">
        <div class="pl-2">
          <button type="button" class="btn btn-primary btn-lg" @click.prevent="next">
            Next
          </button>
        </div>
      </div>
    </div>
    <div v-if="step === 2" class="col-10">
      <div class="row text-center">
        <div class="mt-4 col-12">
          <div class="progress" style="height: 5px;">
            <div
              class="progress-bar bg-primary"
              role="progressbar"
              style="width: 30%"
              aria-valuenow="30"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-4 font-weight-bold">
          01. Welcome on board
        </div>
        <div class="col-4">
          02. Complete Profile
        </div>
        <div class="col-4">
          03. Start Integrating
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <H1>How Picardata works?</H1>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-4">
          <div class="card">
            <div class="card-body p-4">
              <h5 class="card-title">
                YOUR APPS
              </h5>
              <p class="card-text">
                You probably have a tons of app to manage. Social media, design tools, sales and marketing and much more.
              </p>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card">
            <div class="card-body p-4">
              <h5 class="card-title">
                HANDLE YOUR APPS
              </h5>
              <p class="card-text">
                How do you manage your apps precisely? Picardata can do that for you to monitor and view how they work.
              </p>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card">
            <div class="card-body p-4">
              <h5 class="card-title">
                INTEGRATE YOUR APP
              </h5>
              <p class="card-text">
                Firstly you have to integrate them. You can add, revoke and view data and access within your app.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5 justify-content-end">
        <div class="pl-2">
          <button type="button" class="btn btn-primary btn-lg" @click.prevent="next">
            Next
          </button>
        </div>
      </div>
    </div>
    <div v-if="step === 3" class="col-10">
      <div class="row text-center">
        <div class="mt-4 col-12">
          <div class="progress" style="height: 5px;">
            <div
              class="progress-bar bg-primary"
              role="progressbar"
              style="width: 60%"
              aria-valuenow="60"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-4">
          01. Welcome on board
        </div>
        <div class="col-4 font-weight-bold">
          02. Complete Profile
        </div>
        <div class="col-4">
          03. Start Integrating
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <H1>Complete your Profile</H1>
        </div>
      </div>
      <div>
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(next)">
            <div class="row mt-5">
              <div class="col-6">
                <div class="font-weight-bold">
                  General Information
                </div>
                <ValidationProvider v-slot="{ errors }" vid="profile.firstname" name="profile.firstname">
                  <AppControlInput v-model="profile.name" name="name" placeholder="Your Name" type="text" />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" vid="profile.email" name="profile.email">
                  <AppControlInput v-model="profile.email" placeholder="Email" type="email" required="required" />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" vid="profile.phone" name="profile.phone">
                  <label />
                  <VuePhoneNumberInput
                    v-model="profile.phone"
                    placeholder="Phone Number"
                    class="form-group"
                    default-country-code="SG"
                    type="tel"
                    @update="profile.formattedPhone = $event.e164"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" vid="profile.address" name="profile.address">
                  <label />
                  <div class="form-group">
                    <country-select
                      v-model="profile.location"
                      country-name="true"
                      :country="country"
                      top-country="US"
                      name="address"
                      class-name="form-control"
                      placeholder="Location"
                    />
                  </div>
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="col-6">
                <div class="font-weight-bold">
                  Work Information
                </div>
                <ValidationProvider v-slot="{ errors }" vid="occupation" name="occupation">
                  <AppControlInput
                    v-model="profile.occupation"
                    :choices="choices"
                    placeholder="Choose Occupation"
                    control-type="select"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" vid="role" name="role">
                  <AppControlInput v-model="profile.role" placeholder="Role" type="text" />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" vid="company.name" name="company.name">
                  <AppControlInput v-model="profile.organization" name="job" placeholder="Organization" type="text" />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" vid="company.location" name="company.location">
                  <label />
                  <div class="form-group">
                    <country-select
                      v-model="profile.workLocation"
                      country-name="true"
                      :country="country"
                      top-country="US"
                      name="address"
                      class-name="form-control"
                      placeholder="Work Location"
                    />
                  </div>
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
            <div class="row mt-5 justify-content-end">
              <button type="button" class="btn btn-light btn-lg" @click.prevent="next">
                Skip for now
              </button>
              <button type="submit" class="btn btn-primary btn-lg">
                Save Profile
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    VuePhoneNumberInput
  },
  auth: true,
  data () {
    return {
      step: 1,
      country: '',
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
      profile: {
        name: '',
        email: this.$auth.user.username,
        phone: '',
        formattedPhone: '',
        location: '',
        occupation: '',
        role: '',
        organization: '',
        workLocation: ''
      }
    }
  },
  computed: {
    getStepWelcome () {
      return this.step === 1
    },
    getStepProfile () {
      return this.step === 2
    },
    getStepIntegrations () {
      return this.step === 3
    }
  },
  methods: {
    next () {
      if (this.step === 3) {
        this.$axios.$post('/api/employees/', {
          userProfile: {
            firstname: this.profile.name.trim(),
            lastname: '',
            address: this.profile.location,
            phone: this.profile.phone.trim() === '' ? '' : this.profile.formattedPhone,
            email: this.profile.email,
            user: this.$auth.user.id
          },
          role: this.profile.role,
          occupation: this.profile.occupation,
          company: {
            name: this.profile.organization,
            location: this.profile.workLocation
          }
        }).then(() => {
          this.$router.push('/')
        }).catch((e) => {
          const errors = {}

          if (e.response.data.errors.userProfile !== undefined) {
            Object.entries(e.response.data.errors.userProfile).forEach(function (value) {
              const key = 'profile.' + value[0]
              errors[key] = value[1]
            })
          }
          if (e.response.data.errors.company !== undefined) {
            Object.entries(e.response.data.errors.company).forEach(function (value) {
              const key = 'company.' + value[0]
              errors[key] = value[1]
            })
          }

          console.log(errors)
          this.$refs.form.setErrors(errors)
          this.step = 3
          return false
        })
      } else {
        this.step = this.step + 1
      }
    }
  }
}
</script>
