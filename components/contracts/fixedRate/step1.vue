<template>
  <div class="mr-3">
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <div class="all-form-title bold-text form-field mb-4">
          <span class="text-label">Legal Entity Name</span><br>
          <span class="text-label entity-name">{{ contractStep1.legalEntity }}</span>
        </div>
        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep1.contractName" name="Contract Name">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Contract Name</span>
            <input v-model="contractStep1.contractName" type="text" class="form-input form-control" placeholder="">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep1.contractorName" name="Contractor Name">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Contractor Name</span>
            <input v-model="contractStep1.contractorName" type="text" class="form-input form-control" placeholder="">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required|email" vid="contractStep1.contractorEmailAddress" name="Contractor Email Address">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Contractor Email Address</span>
            <input v-model="contractStep1.contractorEmailAddress" type="text" class="form-input form-control" placeholder="">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep1.jobTitle" name="Job Title">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Job Title</span>
            <input v-model="contractStep1.jobTitle" type="text" class="form-input form-control" placeholder="">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep1.seniorityLevel" name="Seniority Level">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Seniority Level</span>
            <select v-model="contractStep1.seniorityLevel" class="form-control form-input">
              <option value="0" selected>
                Choose Seniority Level
              </option>
              <option v-for="(seniorityLevel, key) in seniorityLevels" :key="seniorityLevel + key" :value="seniorityLevel.id">
                {{ seniorityLevel.name }}
              </option>
            </select>
            <span class="text-danger">{{ errors.email }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep1.scopeOfWork" name="Scope of Work">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Scope of Work</span>
            <textarea v-model="contractStep1.scopeOfWork" rows="6" type="text" class="form-input form-control" placeholder="Describe the project scope here..." />
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="contractStep1.startDate" name="Start Date">
          <div class="all-form-title bold-text form-field mb-4">
            <base-input class="text-label" label="Contractor's Start Date">
              <flat-picker
                v-model="contractStep1.startDate"
                slot-scope="{focus, blur}"
                :config="startDateconfig"
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
  name: 'StepOne',
  components: {
    ValidationObserver,
    ValidationProvider,
    flatPicker
  },
  props: [
    'employees',
    'contract'
  ],
  data () {
    return {
      contractStep1: {
        legalEntity: this.employees[0].company.name,
        contractName: this.contract.contractName,
        contractorName: this.contract.contractorName,
        contractorEmailAddress: this.contract.contractorEmailAddress,
        jobTitle: this.contract.jobTitle,
        seniorityLevel: this.contract.seniorityLevel,
        scopeOfWork: this.contract.scopeOfWork,
        startDate: this.contract.startDate
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
    async post () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }
      this.contract.legalEntity = this.contractStep1.legalEntity
      this.contract.contractName = this.contractStep1.contractName
      this.contract.contractorName = this.contractStep1.contractorName
      this.contract.contractorEmailAddress = this.contractStep1.contractorEmailAddress
      this.contract.jobTitle = this.contractStep1.jobTitle
      this.contract.seniorityLevel = this.contractStep1.seniorityLevel
      this.contract.scopeOfWork = this.contractStep1.scopeOfWork
      this.contract.startDate = this.contractStep1.startDate

      return isValid
    },
    onFormChange () {
    }
  }
}
</script>
