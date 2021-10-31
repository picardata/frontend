<template>
  <div class="mr-3">
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <div class="all-form-title bold-text form-field mb-4">
          <span class="text-label">Legal Entity Name</span><br>
          <span class="text-label entity-name">{{ contractStep1.legalEntity }}</span>
        </div>
        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep1.employeeFirstName" name="Employee First and Middle Name">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Employee first and middle name</span>
            <input v-model="contractStep1.employeeFirstName" type="text" class="form-input form-control" placeholder="">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep1.employeeLastName" name="Employee Last Name">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Employee last name</span>
            <input v-model="contractStep1.employeeLastName" type="text" class="form-input form-control" placeholder="">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required|email" vid="contractStep1.contractorEmailAddress" name="Employee Personal Email Address">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Employee personal email address</span>
            <input v-model="contractStep1.employeePersonalEmailAddress" type="text" class="form-input form-control" placeholder="">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep1.employeeNationality" name="Employee Nationality">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Employee nationality</span>
            <country-select v-model="contractStep1.employeeNationality" :country="country" top-country="SG" placeholder="Employee Nationality" class="form-input form-control" />
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep1.employeeWorkingCountry" name="Country employee will be working from">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Country employee will be working from</span>
            <country-select v-model="contractStep1.employeeWorkingCountry" :country="country" top-country="SG" placeholder="Country employee will be working from" class="form-input form-control" />
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="contractStep1.employeeWorkingState" name="Employee State">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Employee state</span>
            <input v-model="contractStep1.employeeWorkingState" type="text" class="form-input form-control" placeholder="">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep1.isEmployeeNeedWorkingVisa" name="">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Does the employee need a work visa?</span>
            <select v-model="contractStep1.isEmployeeNeedWorkingVisa" class="form-control form-input">
              <option v-for="(needWorkingVisaOption, key) in needWorkingVisaOptions" :key="needWorkingVisaOption + key" :value="needWorkingVisaOption.id">
                {{ needWorkingVisaOption.name }}
              </option>
            </select>
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

export default {
  name: 'StepOne',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: [
    'employees',
    'contract'
  ],
  data () {
    return {
      contractStep1: {
        legalEntity: this.employees[0].company.name,
        employeeFirstName: this.contract.employeeFirstName,
        employeeLastName: this.contract.employeeLastName,
        employeePersonalEmailAddress: this.contract.employeePersonalEmailAddress,
        employeeNationality: this.contract.employeeNationality,
        employeeWorkingCountry: this.contract.employeeWorkingCountry,
        employeeWorkingState: this.contract.employeeWorkingState,
        isEmployeeNeedWorkingVisa: this.contract.isEmployeeNeedWorkingVisa,
        employeeWorkEligibilityDocFilename: this.contract.employeeWorkEligibilityDocFilename
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
      needWorkingVisaOptions: [
        {
          name: 'No',
          id: false
        },
        {
          name: 'Yes',
          id: true
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
      this.contract.employeeFirstName = this.contractStep1.employeeFirstName
      this.contract.employeeLastName = this.contractStep1.employeeLastName
      this.contract.employeePersonalEmailAddress = this.contractStep1.employeePersonalEmailAddress
      this.contract.employeeNationality = this.contractStep1.employeeNationality
      this.contract.employeeWorkingCountry = this.contractStep1.employeeWorkingCountry
      this.contract.employeeWorkingState = this.contractStep1.employeeWorkingState
      this.contract.isEmployeeNeedWorkingVisa = this.contractStep1.isEmployeeNeedWorkingVisa
      this.contract.employeeWorkEligibilityDocFilename = this.contractStep1.employeeWorkEligibilityDocFilename
      this.contract.legalEntity = this.contractStep1.legalEntity

      return isValid
    },
    onFormChange () {
    }
  }
}
</script>
