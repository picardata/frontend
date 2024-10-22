<template>
  <div class="row p-4 mr-0">
    <div class="col-sm-4 col-xs-12">
      <div class="row">
        <div class="card">
          <img class="card-img-top" src="https://www.nicepng.com/png/detail/186-1866063_dicks-out-for-harambe-sample-avatar.png" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">
              {{ profile.firstname }} {{ profile.lastname }}
            </h5>
            <p class="card-text">
              <b>Location:</b> {{ profile.location }}
            </p>
            <p class="card-text">
              <b>Email:</b> {{ profile.email }}
            </p>
            <p class="card-text">
              <b>Phone:</b> {{ profile.phone }}
            </p>
            <div class="btn-group-vertical w-100">
              <nuxt-link to="/profile/me" class="btn btn-primary">
                Edit General Information
              </nuxt-link>
              <nuxt-link to="/profile/me/work" class="btn btn-primary active">
                Edit Work Information
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-8 col-xs-12">
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitWork)">
          <div class="row">
            <div class="col-sm-8 col-xs-12">
              <div class="font-weight-bold mb-4">
                <h3>Work Information</h3>
              </div>
              <ValidationProvider v-slot="{ errors }" vid="profile.lastname" name="profile.lastname">
                <AppControlInput
                  v-model="employee.occupation"
                  :choices="choices"
                  :choices-selected="employee.occupation"
                  placeholder="Choose Occupation"
                  control-type="select"
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
                <label>Location</label>
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
                </div>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-sm-8 col-xs-12 text-right">
              <button type="button" class="btn btn-primary btn-lg" @click.prevent="submitWork">
                Save Work Information
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
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import loaderMixin from '~/mixins/loader'

export default {
  layout: 'argon',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [
    loaderMixin
  ],
  async asyncData (context) {
    return await context.app.$axios.get('/api/user-profiles/' + context.app.$auth.user.userProfile.id + '/employees/me')
      .then((data) => {
        return {
          employee: {
            id: data.data.id,
            role: data.data.role,
            occupation: String(data.data.occupation),
            organization: data.data.company.name,
            workLocation: data.data.company.location
          },
          profile: {
            firstname: data.data.userProfile.firstname,
            lastname: data.data.userProfile.lastname,
            email: data.data.userProfile.email,
            phone: data.data.userProfile.phone,
            location: data.data.userProfile.address

          }
        }
      })
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
      ]
    }
  },
  methods: {
    submitWork () {
      this.$axios.$patch('/api/employees/' + this.employee.id, {
        role: this.employee.role,
        occupation: this.employee.occupation,
        company: {
          name: this.employee.organization,
          location: this.employee.workLocation
        }
      }).then(() => {
        this.$router.push('/profile/me/work')
      }).catch((e) => {
        for (const field of ['username', 'password']) {
          const errors = e.response.data.errors[field]
          if (errors !== undefined) {
            this.errors = this.errors.concat(errors)
          }
        }
        return false
      })
    }
  }
}
</script>
