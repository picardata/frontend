<template>
  <div class="mr-3">
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <div class="all-form-title bold-text form-field field-group">
          <span class="text-label">Define dates of contract</span>
        </div>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contract.firstPaymentDate" name="First payment date">
          <div class="all-form-title bold-text form-field">
            <base-input class="text-label" label="First payment date">
              <flat-picker
                slot-scope="{focus, blur}"
                @on-open="focus"
                @on-close="blur"
                :config="firstPaymentDateconfig"
                class="form-control form-input datepicker"
                v-model="contract.firstPaymentDate">
              </flat-picker>
            </base-input>

            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contract.firstPaymentType" name="">
          <div class="all-form-title bold-text form-field">
            <span class="text-label">First payment type</span>
            <select v-model="contract.invoiceCycleEnds" class="form-control form-input">
              <option v-for="(firstPaymentTypeOption, key) in firstPaymentTypeOptions" :key="firstPaymentTypeOption + key" :value="firstPaymentTypeOption.id">
                {{ firstPaymentTypeOption.name }}
              </option>
            </select>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contract.firstPaymentAmount" name="Full Amount">
          <div class="all-form-title bold-text form-field two-colls first-coll">
            <span class="text-label"> Amount</span>
            <input v-model="contract.firstPaymentAmount" type="text" class="form-input form-control" placeholder="">
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
  import BaseSlider from '@/components/argon-core/BaseSlider'
  import loaderMixin from '~/mixins/loader'

  export default {
    name: 'step1',
    auth: true,
    components: {
      ValidationObserver,
      ValidationProvider,
      flatPicker,
      BaseSlider
    },
    mixins: [
      loaderMixin
    ],
    data () {
      return {
        contract: {
          legalEntity: '',
          contractName: '',
          jobTitle: '',
          seniorityLevel: '',
          scopeOfWork: '',
          startDate: null,
          salaryAmount: '',
          salaryCurrency: '',
          salaryFrequency: '',
          isInvoiceSettingsCustomisable: '',
          invoiceCycleEnds: '',
          invoicePaymentDue: '',
          isInvoicePaymentPayAheadOfTheWeekend: '',
          firstPaymentDate: '',
          firstPaymentType: '',
          firstPaymentAmount: '',
          terminationDate: '',
          noticePeriod: '',
          specialClause: '',
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
        console.log('onFormChange');
        debugger;
        let isComplete = true
        for (const name in this.contract) {
          if (!this.contract[name]) {
            isComplete = false
          }
        }

        this.$emit('formProfileChange', isComplete)
      },
      async post () {
        console.log('post');
        debugger;
        const isValid = await this.$refs.form.validate()
        if (!isValid) {
          return false
        }
      }
    }
  }
</script>


