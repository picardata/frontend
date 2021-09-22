<template>
  <div class="mr-3">
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contract.legalEntity" name="Entity Name">
          <div class="all-form-title bold-text form-field">
            <span class="text-label">Legal Entity Name</span>
            <input v-model="contract.legalEntity" type="text" class="form-input form-control" placeholder="">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contract.contractName" name="Contract Name">
          <div class="all-form-title bold-text form-field">
            <span class="text-label">Contract Name</span>
            <input v-model="contract.contractName" type="text" class="form-input form-control" placeholder="">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contract.jobTitle" name="Job Title">
          <div class="all-form-title bold-text form-field">
            <span class="text-label">Job Title</span>
            <input v-model="contract.jobTitle" type="text" class="form-input form-control" placeholder="">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contract.seniorityLevel" name="Seniority Level">
          <div class="all-form-title bold-text form-field">
            <span class="text-label">Seniority Level</span>
            <select v-model="contract.seniorityLevel" class="form-control form-input">
              <option value="0" selected>
                Choose Seniority Level
              </option>
              <option v-for="(seniorityLevel, key) in seniorityLevels" :key="seniorityLevel + key" :value="seniorityLevel.id">
                {{ seniorityLevel.name }}
              </option>
            </select>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contract.scopeOfWork" name="Scope of Work">
          <div class="all-form-title bold-text form-field">
            <span class="text-label">Scope of Work</span>
            <textarea v-model="contract.scopeOfWork" type="text" class="form-input form-control" placeholder="Describe the project scope here..."></textarea>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contract.startDate" name="Contractor's Start Date">
          <div class="all-form-title bold-text form-field">
            <base-input class="text-label" label="Contractor's Start Date">
              <flat-picker
                slot-scope="{focus, blur}"
                @on-open="focus"
                @on-close="blur"
                :config="startDateconfig"
                class="form-control form-input datepicker"
                v-model="contract.startDate">
              </flat-picker>
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
        crumbs: [
          {
            name: 'Create Contract',
            path: '/contracts'
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


