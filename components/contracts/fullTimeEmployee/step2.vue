<template>
  <div class="mr-3">
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep1.seniorityLevel" name="Seniority">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Seniority Level</span>
            <select v-model="contractStep2.seniorityLevel" class="form-control form-input">
              <option v-for="(seniorityLevel, key) in seniorityLevels" :key="seniorityLevel + key" :value="seniorityLevel.id">
                {{ seniorityLevel.name }}
              </option>
            </select>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep1.jobTitle" name="Job Title">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Job Title</span>
            <input v-model="contractStep2.jobTitle" type="text" class="form-input form-control" placeholder="">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep2.scopeOfWork" name="Scope of Work">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Scope of Work</span>
            <textarea v-model="contractStep2.scopeOfWork" type="text" class="form-input form-control" placeholder="Job Scope"></textarea>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import 'vue-country-region-select'

export default {
  name: 'step2',
  auth: true,
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: [
    'contract'
  ],
  data () {
    return {
      contractStep2: {
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
