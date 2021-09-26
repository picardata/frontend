<template>
  <div class="mr-3">
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="contractStep4.terminationDate" name="Termination date">
          <div class="all-form-title bold-text form-field">
            <span class="text-label"> Termination date</span><br/>
            <base-input class="text-label-desc" label="The client will pay the contractor until the contract has been terminated.">
              <flat-picker
                slot-scope="{focus, blur}"
                @on-open="focus"
                @on-close="blur"
                :config="terminationDateconfig"
                class="form-control form-input datepicker"
                v-model="contractStep4.terminationDate">
              </flat-picker>
            </base-input>

            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep4.noticePeriod" name="Notice period">
          <div class="all-form-title bold-text form-field">
            <span class="text-label">Notice period</span><br/>
            <span class="text-label-desc">Either party may terminate within the days of notice based on the agreement, after which the contract will be terminated.</span>
            <input v-model="contractStep4.noticePeriod" type="text" class="form-input form-control" placeholder="">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep4.specialClause" name="Special Clause">
          <div class="all-form-title bold-text form-field">
            <span class="text-label">Special Clause</span><br/>
            <span class="text-label-desc">You may want a special clause on the contract to outline terms of a special scenario.</span>

            <textarea v-model="contractStep4.specialClause" type="text" class="form-input form-control" placeholder=""></textarea>
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
  name: 'step4',
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
      contractStep4: {
        terminationDate: this.contract.terminationDate,
        noticePeriod: this.contract.noticePeriod,
        specialClause: this.contract.specialClause
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
      terminationDateconfig: {
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

      this.contract.terminationDate = this.contractStep4.terminationDate
      this.contract.noticePeriod = this.contractStep4.noticePeriod
      this.contract.specialClause = this.contractStep4.specialClause
      return isValid
    }
  }
}
</script>
