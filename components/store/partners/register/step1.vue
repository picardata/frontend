<template>
  <div>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <div class="card border p-4">
          <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
            <form @submit.prevent="handleSubmit(post)">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="partnerStep1.name" name="Company Name">
                <div class="all-form-title bold-text form-field mb-4">
                  <span class="text-label">Company Name</span>
                  <input v-model="partnerStep1.name" type="text" class="form-input form-control" placeholder="">
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="partnerStep1.registrationNumber" name="Business Registration Number">
                <div class="all-form-title bold-text form-field mb-4">
                  <span class="text-label">Business Registration Number</span>
                  <input v-model="partnerStep1.registrationNumber" type="text" class="form-input form-control" placeholder="">
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="partnerStep1.country" name="Country">
                <div class="all-form-title bold-text form-field mb-4">
                  <span class="text-label">Country</span>
                  <country-select v-model="partnerStep1.country" :country="country" top-country="SG" class="form-control form-input" />

                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="partnerStep1.industry" name="Type of Industry">
                <div class="all-form-title bold-text form-field mb-4">
                  <span class="text-label">Type of Industry</span>
                  <input v-model="partnerStep1.industry" type="text" class="form-input form-control" placeholder="">
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="partnerStep1.website" name="Website">
                <div class="all-form-title bold-text form-field mb-4">
                  <span class="text-label">Business Website</span>
                  <input v-model="partnerStep1.website" type="text" class="form-input form-control" placeholder="">
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="partnerStep1.businessDescription" name="Business Description">
                <div class="all-form-title bold-text form-field mb-4">
                  <span class="text-label">Business Description</span>
                  <textarea v-model="partnerStep1.businessDescription" rows="6" type="text" class="form-input form-control" placeholder="Describe your business here..." />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <div :key="showLogoKey" class="all-form-title bold-text form-field mb-4">
                <ValidationProvider
                  ref="logo"
                  v-slot="{ errors }"
                >
                  <span class="text-label">Company Logo</span><br>
                  <span class="text-label-desc">
                    
                  </span>
                  <input
                    id="logo"
                    ref="logo"
                    type="file"
                    class="btn btn-sm btn-secondary btn-add-doc"
                    accept="image/*"
                    @change="handleLogoUpload($event)"
                  >

                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

            </form>
          </ValidationObserver>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import 'vue-country-region-select'
import flatPicker from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import 'vue-country-region-select'

export default {
  name: 'StepOne',
  components: {
    ValidationObserver,
    ValidationProvider,
    flatPicker
  },
  props: [
    'partner'
  ],
  data () {
    return {
      partnerStep1: {
        name: this.partner.name,
        country: this.partner.country,
        registrationNumber: this.partner.registrationNumber,
        industry: this.partner.industry,
        website: this.partner.website,
        businessDescription: this.partner.businessDescription,
        logo: this.logo,
        logoFilename: this.logoFilename
      },
      startDateconfig: {
        allowInput: true,
        altFormat: 'j F Y',
        altInput: true
      },
      crumbs: [
        {
          name: 'Create Contract',
          path: '/contracts'
        }
      ],
      country: '',
      submenu: true,
      showLogoKey: 0
    }
  },
  methods: {
    handleLogoUpload (event) {
      this.partnerStep1.logo = event.target.files[0]
    },
    async post () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.partner.name = this.partnerStep1.name
      this.partner.country = this.partnerStep1.country
      this.partner.registrationNumber = this.partnerStep1.registrationNumber
      this.partner.industry = this.partnerStep1.industry
      this.partner.website = this.partnerStep1.website
      this.partner.businessDescription = this.partnerStep1.businessDescription
      this.partner.logo = this.partnerStep1.logo
      this.partner.logoFilename = this.partnerStep1.logoFilename

      return isValid
    },
    onFormChange () {
    }
  }
}
</script>
