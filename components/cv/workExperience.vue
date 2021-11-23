<template>
  <div>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <div class="card border p-4">
          <div class="all-form-title bold-text form-field field-group">
            <span class="text-label">Work Experiences</span>
          </div>
        </div>

        <div v-for="(workExperience, index) in workExperiences" :key="'workExperiences-' + index" class="card border p-4 ">
          <div v-if="index !== 0">
            <button type="button" class="btn btn-sm img-btn float-right" @click.prevent="removeWorkExperienceDetails(workExperience, index)">
              <img src="~/assets/menu_icons/delete.png" alt="delete">
            </button>
          </div>

          <div class="multiple-fields-wrapper">
            <div class="all-form-title bold-text form-field two-colls first-coll mb-4">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="workExperience.jobTitle" name="Job Title">
                <span class="text-label">Job Title</span>
                <input v-model="workExperience.jobTitle" type="text" class="form-input form-control" placeholder="">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="all-form-title bold-text form-field two-colls mb-4">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="workExperience.company" name="Company">
                <span class="text-label">Company</span>
                <input v-model="workExperience.company" type="text" class="form-input form-control" placeholder="">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>

          <div class="multiple-fields-wrapper">
            <div class="all-form-title bold-text form-field two-colls first-coll mb-4">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="workExperience.city" name="City">
                <span class="text-label">City</span>
                <input v-model="workExperience.city" type="text" class="form-input form-control" placeholder="">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="all-form-title bold-text form-field two-colls mb-4">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="workExperience.country" name="Country">
                <span class="text-label">Country</span>
                <country-select v-model="workExperience.country" :country="workExperience.country" top-country="SG" class="form-input form-control" placeholder="" />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>

          <div class="multiple-fields-wrapper">
            <div class="all-form-title bold-text form-field two-colls first-coll mb-2">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="workExperience.startDate" name="Start date">
                <span class="text-label">From</span><br>
                <base-input class="text-label">
                  <flat-picker
                    v-model="workExperience.startDate"
                    slot-scope="{focus, blur}"
                    :config="dateFieldConfig"
                    class="form-control form-input datepicker"
                    @on-open="focus"
                    @on-close="blur"
                  />
                </base-input>

                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="all-form-title bold-text form-field two-colls mb-2">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="workExperience.endDate" name="End date">
                <span class="text-label">To</span><br>
                <base-input class="text-label">
                  <flat-picker
                    v-model="workExperience.endDate"
                    slot-scope="{focus, blur}"
                    :config="dateFieldConfig"
                    class="form-control form-input datepicker"
                    @on-open="focus"
                    @on-close="blur"
                  />
                </base-input>

                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>

          <div class="multiple-fields-wrapper">
            <div class="all-form-title bold-text form-field two-colls first-coll mb-4">
              <ValidationProvider v-slot="{ errors }" mode="passive" vid="workExperience.currentWorkplace" name="currentWorkplace">
                <span class="text-label">Current workplace</span>

                <base-checkbox v-model="workExperience.currentWorkplace" class="mr-1 form-checkbox-left" />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>

          <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="workExperience.description" name="Description">
            <div class="all-form-title bold-text form-field mb-4">
              <span class="text-label">Description</span>
              <textarea v-model="workExperience.description" rows="6" type="text" class="form-input form-control" placeholder="" />
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>

        <button type="button" class="btn btn-sm btn-primary btn-add-milestone pl-4 pr-4 mb-4" @click.prevent="addNewWorkExperienceDetails()">
          Add Work Experience
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import 'vue-country-region-select'
import flatPicker from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'WorkingExperiences',
  components: {
    ValidationObserver,
    ValidationProvider,
    flatPicker
  },
  props: [
    'workExperiences'
  ],
  data () {
    return {
      dateFieldConfig: {
        allowInput: true,
        altFormat: 'F Y',
        altInput: true
      },
      workExperiencesWrapperKey: 0
    }
  },
  methods: {
    addNewWorkExperienceDetails () {
      const newWorkExperience = {
        jobTitle: '',
        company: '',
        country: '',
        city: '',
        currentWorkplace: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 1,
        employee: ''
      }

      this.workExperiences.push(newWorkExperience)
      this.workExperiencesWrapperKey++
    },
    removeWorkExperienceDetails (workExperience, index) {
      const workExperiences = this.workExperiences

      if (Object.hasOwnProperty.call(workExperience, 'id')) {
        const workExperienceUuid = workExperience.uuid

        this.$axios.$patch('/api/work/experience/' + workExperienceUuid, {
          jobTitle: workExperience.jobName,
          company: workExperience.company,
          country: workExperience.country,
          city: workExperience.city,
          currentWorkplace: workExperience.currentWorkplace,
          description: workExperience.description,
          startDate: workExperience.startDate,
          endDate: workExperience.endDate,
          status: 0,
          employee: workExperience.employee
        }).then(() => {
          workExperiences.splice(index, 1)
        }).catch((e) => {
          const errors = {}

          Object.entries(e.response.data.errors).forEach(function (value) {
            const key = value[0]
            errors[key] = value[1]
          })

          this.$refs.form.setErrors(errors)
          return false
        })
      } else {
        workExperiences.splice(index, 1)
      }
    },
    async post () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      return isValid
    },
    onFormChange () {
    }
  }
}
</script>
