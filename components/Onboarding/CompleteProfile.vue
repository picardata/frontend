<template>
  <div class="onboarding-complete-profile">
    <div class="row mt-5">
      <div class="col-12">
        <div class="title">
          <img src="~/assets/nav_logo_dark.png" alt="Picardata">
          <div>Complete your Profile</div>
        </div>
      </div>
    </div>
    <div>
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(next)">
          <div class="row mt-5">
            <div class="col-md-2 px-0">
              <img src="~/assets/dashboard-img/profile-pict.png" alt="">
              <a class="text-link" href="#">Change photo</a>
            </div>
            <div class="col-5 pl-5">
              <div class="sub-title">
                General Information
              </div>
              <ValidationProvider v-slot="{ errors }" vid="profile.firstname" name="profile.firstname">
                <input v-model="profile.name" type="text" class="login-credential-input form-control" placeholder="Your name">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" vid="profile.email" name="profile.email">
                <input v-model="profile.email" type="text" class="login-credential-input form-control" placeholder="Email">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" vid="profile.phone" name="profile.phone">
                <VuePhoneNumberInput
                    v-model="profile.phone"
                    placeholder="Phone Number"
                    class="form-group phonenumber-custom"
                    default-country-code="SG"
                    type="tel"
                    @update="profile.formattedPhone = $event.e164"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" vid="profile.address" name="profile.address">
                <input v-model="profile.location" type="text" class="login-credential-input form-control" placeholder="Location">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="col-5">
              <div class="sub-title">
                Work Information
              </div>
              <ValidationProvider v-slot="{ errors }" vid="occupation" name="occupation">
                <select v-model="profile.occupation" class="form-control login-credential-input">
                  <option v-for="(choice, key) in choices" :key="choice + key" :value="choice.id">{{ choice.name }}</option>
                </select>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" vid="role" name="role">
                <input v-model="profile.role" type="text" class="login-credential-input form-control" placeholder="Role">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" vid="company.name" name="company.name">
                <input v-model="profile.organization" type="text" class="login-credential-input form-control" placeholder="Organization">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" vid="company.location" name="company.location">
                <input v-model="profile.workLocation" type="text" class="login-credential-input form-control" placeholder="Work Location">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
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

export default {
  name: 'CompleteProfile',
  components: {
    ValidationObserver,
    ValidationProvider,
    VuePhoneNumberInput
  },
  data () {
    return {
      country: '',
      choices: [
        {
          name: 'Choose Occupation',
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
      profile: {
        name: '',
        email: this.$auth.user.username,
        phone: '',
        formattedPhone: '',
        location: '',
        occupation: 0,
        role: '',
        organization: '',
        workLocation: ''
      }
    }
  },
  mounted () {
    this.stylingInputPhone()
  },
  methods: {
    stylingInputPhone () {
      const inputTel = document.getElementsByClassName('input-tel__input')[0]
      inputTel.style.borderTopRightRadius = '16px'
      inputTel.style.borderBottomRightRadius = '16px'

      const countryInput = document.getElementsByClassName('country-selector__input')[0]
      countryInput.style.borderTopLeftRadius = '16px'
      countryInput.style.borderBottomLeftRadius = '16px'
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  display: flex;
  align-items: center;

  div{
    font-size: 24px;
    font-weight: 600;
    color: #14142B;
    margin-left: 30px;
  }
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
}
.login-credential-input{
  margin-top: 40px;
}
.phonenumber-custom{
  margin-top: 40px;
}
</style>
