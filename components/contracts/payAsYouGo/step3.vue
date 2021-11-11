<template>
  <div class="mr-3">
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <div class="all-form-title bold-text form-field field-group">
          <span class="text-label">Define dates of contract</span>
        </div>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="contractStep3.firstPaymentDate" name="First payment date">
          <div class="all-form-title bold-text form-field mb-4">
            <base-input class="text-label" label="First payment date">
              <flat-picker
                v-model="contractStep3.firstPaymentDate"
                slot-scope="{focus, blur}"
                :config="firstPaymentDateconfig"
                class="form-control form-input datepicker"
                @on-open="focus"
                @on-close="blur"
              />
            </base-input>

            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
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

export default {
  name: 'Step1',
  auth: true,
  components: {
    ValidationObserver,
    ValidationProvider,
    flatPicker
  },
  props: [
    'contract'
  ],
  data () {
    return {
      contractStep3: {
        firstPaymentDate: this.contract.firstPaymentDate
      },
      startDateconfig: {
        allowInput: true,
        altFormat: 'j F Y',
        altInput: true
      },
      firstPaymentDateconfig: {
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
      firstPaymentTypeOptions: [
        {
          name: 'Full Payment',
          id: 1
        },
        {
          name: 'Pro Rata',
          id: 2
        }
      ],
      submenu: true
    }
  },
  methods: {
    onFormChange () {
    },
    async post () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.contract.firstPaymentDate = this.contractStep3.firstPaymentDate
      this.contract.firstPaymentType = this.contractStep3.firstPaymentType
      this.contract.firstPaymentAmount = this.contractStep3.firstPaymentAmount
      return isValid
    }
  }
}
</script>
