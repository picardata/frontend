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

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep3.firstPaymentType" name="Payment Type">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">First payment type</span>
            <select v-model="contractStep3.firstPaymentType" class="form-control form-input">
              <option v-for="(firstPaymentTypeOption, key) in firstPaymentTypeOptions" :key="firstPaymentTypeOption + key" :value="firstPaymentTypeOption.id">
                {{ firstPaymentTypeOption.name }}
              </option>
            </select>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="numeric" vid="contractStep3.firstPaymentAmount" name="Payment Amount">
          <div class="all-form-title bold-text form-field two-colls first-coll mb-4">
            <span class="text-label"> Amount</span>
            <input v-model="contractStep3.firstPaymentAmount" type="text" class="form-input form-control" placeholder="">
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
        firstPaymentDate: this.contract.firstPaymentDate,
        firstPaymentType: this.contract.firstPaymentType,
        firstPaymentAmount: this.contract.firstPaymentAmount
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
      seniorityLevels: [
        {
          name: 'Not applicable',
          id: 1
        },
        {
          name: 'Junior',
          id: 2
        },
        {
          name: 'Mid',
          id: 3
        },
        {
          name: 'Senior',
          id: 4
        },
        {
          name: 'Lead',
          id: 5
        },
        {
          name: 'Principal / Staff',
          id: 6
        },
        {
          name: 'Director',
          id: 7
        },
        {
          name: 'Head of Department',
          id: 8
        },
        {
          name: 'Vice President',
          id: 9
        },
        {
          name: 'Senior Vice President',
          id: 10
        },
        {
          name: 'C-level Executive',
          id: 11
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
