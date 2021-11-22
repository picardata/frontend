<template>
  <div>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <div class="card border p-4">
          <div class="all-form-title bold-text form-field field-group">
            <span class="text-label">Profile</span>
          </div>

          <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="profileForm.firstName" name="First Name">
            <div class="all-form-title bold-text form-field mb-4">
              <span class="text-label">First Name</span>
              <input v-model="profileForm.firstName" type="text" class="form-input form-control" placeholder="">
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="profileForm.lastName" name="Last Name">
            <div class="all-form-title bold-text form-field mb-4">
              <span class="text-label">Last Name</span>
              <input v-model="profileForm.lastName" type="text" class="form-input form-control" placeholder="">
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="profileForm.country" name="Country">
            <div class="all-form-title bold-text form-field mb-4">
              <span class="text-label">Country</span>
              <country-select v-model="profileForm.countryOfTaxResidence" :country="profileForm.countryOfTaxResidence" top-country="SG" class="form-input form-control" placeholder="" />
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="profileForm.city" name="City">
            <div class="all-form-title bold-text form-field mb-4">
              <span class="text-label">City</span>
              <input v-model="profileForm.city" type="text" class="form-input form-control" placeholder="">
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="profileForm.street" name="street">
            <div class="all-form-title bold-text form-field mb-4">
              <span class="text-label">Street</span>
              <input v-model="profileForm.street" type="text" class="form-input form-control" placeholder="">
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="profileForm.postalCode" name="postalCode">
            <div class="all-form-title bold-text form-field mb-4">
              <span class="text-label">Postal Code</span>
              <input v-model="profileForm.postalCode" type="text" class="form-input form-control" placeholder="">
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="profileForm.taxID" name="taxID">
            <div class="all-form-title bold-text form-field mb-4">
              <span class="text-label">Tax ID</span>
              <input v-model="profileForm.taxID" type="text" class="form-input form-control" placeholder="">
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="profileForm.phoneNumber" name="phoneNumber">
            <div class="all-form-title bold-text form-field mb-4">
              <span class="text-label">Phone Number</span>
              <VuePhoneNumberInput
                v-model="profileForm.phoneNumber"
                placeholder="Phone Number"
                class="form-group phonenumber-custom"
                default-country-code="SG"
                type="tel"
                @update="profileForm.formattedPhone = $event.e164"
              />
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import 'vue-country-region-select'

export default {
  name: 'Profile',
  components: {
    ValidationObserver,
    ValidationProvider,
    VuePhoneNumberInput
  },
  props: [
    'profile',
    'employee'
  ],
  data () {
    return {
      profileForm: {
        formattedPhone: '',
        firstName: this.profile.firstName,
        lastName: this.profile.lastName,
        countryOfTaxResidence: this.employee.countryOfTaxResidence,
        city: this.employee.city,
        street: this.employee.street,
        postalCode: this.employee.postalCode,
        taxID: this.employee.taxID,
        phoneNumber: this.employee.phoneNumber
      }
    }
  },
  methods: {
    async post () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.profile.firstName = this.profileForm.firstName
      this.profile.lastName = this.profileForm.lastName
      this.employee.countryOfTaxResidence = this.profileForm.countryOfTaxResidence
      this.employee.city = this.profileForm.city
      this.employee.street = this.profileForm.street
      this.employee.postalCode = this.profileForm.postalCode
      this.employee.taxID = this.profileForm.taxID
      this.employee.phoneNumber = this.profileForm.phoneNumber

      return isValid
    },
    onFormChange () {
    }
  }
}
</script>
