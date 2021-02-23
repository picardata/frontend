<template>
  <div class="row p-4">
    <div class="col-4">
      <div class="row">
        <div class="card" style="width: 18rem;">
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
            <div class="btn-group-vertical">
              <nuxt-link to="/profile/me" class="btn btn-primary  active">
                Edit General Information
              </nuxt-link>
              <nuxt-link to="/profile/me/work" class="btn btn-primary">
                Edit Work Information
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-8">
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitGeneral)">
          <div class="row">
            <div class="col-6">
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
                  default-country-code="SG"
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
          <div class="row mt-5 justify-content-center">
            <button type="submit" class="btn btn-primary btn-lg">
              Save Profile Information
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import VuePhoneNumberInput from 'vue-phone-number-input'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    VuePhoneNumberInput
  },
  async asyncData (context) {
    return await context.app.$axios.get('/api/users/me')
      .then((data) => {
        return {
          profile: {
            id: data.data.user.userProfile.id,
            firstname: data.data.user.userProfile.firstname,
            lastname: data.data.user.userProfile.lastname,
            email: data.data.user.userProfile.email,
            phone: data.data.user.userProfile.phone,
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
        phone: this.profile.phone ? this.profile.phone.trim() : '',
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
