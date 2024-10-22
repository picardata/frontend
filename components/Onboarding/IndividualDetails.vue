<template>
  <div class="onboarding-complete-profile">
    <div class="row mt-80">
      <div class="col-12">
        <div class="title">
          <p style="font-size: 24px;color: #2E4823; font-weight: bolder;">
            Hey {{ profile.name }}, welcome to Globelise
          </p><br>
          <p>
            To get started please provide your personal information accurately.
            <br> It will be used for all your document on Globelise.
          </p>
        </div>
      </div>
    </div>
    <div class="form-wrapper mt-5">
      <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
        <form @submit.prevent="handleSubmit(post)">
          <div class="row">
            <div class="col-6 ">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="name" name="Full Name">
                <input v-model="profile.name" type="text" class="login-credential-input form-control" placeholder="Full Name">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="nationality" name="Nationality">
                <country-select v-model="profile.nationality" :country="country" top-country="SG" placeholder="I'm a citizen of" class="form-control login-credential-input" />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" mode="passive" vid="timezone" name="Timezone">
                <input v-model="profile.timezone" type="text" class="login-credential-input form-control" placeholder="Timezone">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" mode="passive" vid="street" name="Address">
                <input v-model="profile.street" type="text" class="login-credential-input form-control" placeholder="Address">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="col-6 pl-5">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="countryOfTaxResidence" name="Country of Tax Residence">
                <country-select v-model="profile.countryOfTaxResidence" :country="country" top-country="SG" placeholder="Country of Tax Residence" class="form-control login-credential-input" />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" mode="passive" vid="taxID" name="Tax ID">
                <input v-model="profile.taxID" type="text" class="login-credential-input form-control" placeholder="Tax ID (optional)">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="profile.phone" name="phone">
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

              <ValidationProvider v-slot="{ errors }" mode="passive" vid="city" name="City">
                <input v-model="profile.city" type="text" class="login-credential-input form-control" placeholder="City">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" mode="passive" vid="postalCode" name="Postal Code">
                <input v-model="profile.postalCode" type="text" class="login-credential-input form-control" placeholder="Postal Code">
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
import 'vue-country-region-select'

export default {
  name: 'EntityDetails',
  components: {
    ValidationObserver,
    ValidationProvider,
    VuePhoneNumberInput
  },
  props: [
    'employee'
  ],
  data () {
    return {
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
        name: this.$auth.user.userProfile.firstname,
        email: this.$auth.user.username,
        formattedPhone: '',
        nationality: this.employee.nationality,
        timezone: this.employee.timezone,
        street: this.employee.street,
        countryOfTaxResidence: this.employee.countryOfTaxResidence,
        taxID: this.employee.taxID,
        phoneNumber: this.employee.phoneNumber,
        city: this.employee.city,
        postalCode: this.employee.postalCode
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
    },
    async post () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.employee.taxID = this.profile.taxID
      this.employee.nationality = this.profile.nationality
      this.employee.countryOfTaxResidence = this.profile.countryOfTaxResidence
      this.employee.timezone = this.profile.timezone
      this.employee.street = this.profile.street
      this.employee.city = this.profile.city
      this.employee.postalCode = this.profile.postalCode
      this.employee.phoneNumber = this.profile.phoneNumber

      return isValid
    },
    onFormChange () {
      let isComplete = true
      for (const name in this.profile) {
        if (!this.profile[name]) {
          isComplete = false
        }
      }

      this.$emit('formProfileChange', isComplete)
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-wrapper {
    padding: 2rem;
    background: #ffffff;

    .login-credential-input{
      margin-bottom: 35px;
      min-height: 60px;

      &::placeholder{
        color: #A0A3BD;
        font-size: 16px;
      }
    }
    .phonenumber-custom {
      background: #fff !important;

      .country-selector__input {
        border-radius: 0 !important;
      }
    }
  }

  .title{
    align-items: center;
    text-align: center;
    color: #000000;

    div{
      text-align: center;
      font-weight: 600;
      margin-left: 30px;
    }
  }
  .text-link{
    font-size: 16px;
    color: #2E4823;
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
    margin-top: 40px;
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
    position: absolute;
  }

  .mt-80{
    margin-top: 80px;
  }
</style>
