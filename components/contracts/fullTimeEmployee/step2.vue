<template>
  <div>
    <div class="card border p-4">
      <div class="all-form-title bold-text form-field">
        <span class="text-label">Legal Entity Name</span><br>
        <span class="text-label entity-name">{{ contractStep2.legalEntity }}</span>
      </div>
    </div>
    <div class="card border p-4">
      <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
        <form @submit.prevent="handleSubmit(post)">
          <div class="multiple-fields-wrapper">
            <div class="all-form-title bold-text form-field two-colls first-coll mb-4">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep1.seniorityLevel" name="Seniority">
                <span class="text-label">Seniority Level</span>
                <select v-model="contractStep2.seniorityLevel" class="form-control form-input">
                  <option v-for="(seniorityLevel, key) in seniorityLevels" :key="seniorityLevel + key" :value="seniorityLevel.id">
                    {{ seniorityLevel.name }}
                  </option>
                </select>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="all-form-title bold-text form-field two-colls mb-4">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep1.jobTitle" name="Job Title">
                <span class="text-label">Job Title</span>
                <input v-model="contractStep2.jobTitle" type="text" class="form-input form-control" placeholder="">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>

          <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep2.scopeOfWork" name="Scope of Work">
            <div class="all-form-title bold-text form-field mb-4">
              <span class="text-label">Scope of Work</span>
              <textarea v-model="contractStep2.scopeOfWork" rows="6" type="text" class="form-input form-control" placeholder="Job Scope" />
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import 'vue-country-region-select'

export default {
  name: 'Step2',
  auth: true,
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: [
    'contract',
    'employees'
  ],
  data () {
    return {
      contractStep2: {
        legalEntity: this.employees[0].company.name,
        seniorityLevel: this.contract.seniorityLevel,
        jobTitle: this.contract.jobTitle,
        scopeOfWork: this.contract.scopeOfWork
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
          id: 0
        },
        {
          name: 'Junior',
          id: 1
        },
        {
          name: 'Mid',
          id: 2
        },
        {
          name: 'Senior',
          id: 3
        },
        {
          name: 'Lead',
          id: 4
        },
        {
          name: 'Principal / Staff',
          id: 5
        },
        {
          name: 'Director',
          id: 6
        },
        {
          name: 'Head of Department',
          id: 7
        },
        {
          name: 'Vice President',
          id: 8
        },
        {
          name: 'Senior Vice President',
          id: 9
        },
        {
          name: 'C-level Executive',
          id: 10
        }
      ],
      submenu: true,
      conditionalDisabled: {
        invoicing: 1
      }
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

      this.contract.seniorityLevel = this.contractStep2.seniorityLevel
      this.contract.jobTitle = this.contractStep2.jobTitle
      this.contract.scopeOfWork = this.contractStep2.scopeOfWork

      return isValid
    }
  }
}
</script>
