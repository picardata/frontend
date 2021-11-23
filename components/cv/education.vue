<template>
  <div>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <div class="card border p-4">
          <div class="all-form-title bold-text form-field field-group">
            <span class="text-label">Education</span>
          </div>
        </div>

        <div v-for="(education, index) in educations" :key="'educations-' + index" class="card border p-4 ">
          <div v-if="index !== 0">
            <button type="button" class="btn btn-sm img-btn float-right" @click.prevent="removeEducationDetails(education, index)">
              <img src="~/assets/menu_icons/delete.png" alt="delete">
            </button>
          </div>
          <div class="multiple-fields-wrapper">
            <div class="all-form-title bold-text form-field two-colls first-coll mb-4">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="education.degree" name="Degree">
                <span class="text-label">Degree</span>
                <select v-model="education.degree" class="form-control form-input">
                  <option v-for="(degree, key) in degrees" :key="degree + key" :value="degree.id">
                    {{ degree.name }}
                  </option>
                </select>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="all-form-title bold-text form-field two-colls mb-4">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="education.fieldOfStudy" name="Field of study">
                <span class="text-label">Field of study</span>
                <input v-model="education.fieldOfStudy" type="text" class="form-input form-control" placeholder="">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>

          <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="education.school" name="School">
            <div class="all-form-title bold-text form-field mb-4">
              <span class="text-label">School</span>
              <input v-model="education.school" type="text" class="form-input form-control" placeholder="">
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="education.city" name="City">
            <div class="all-form-title bold-text form-field mb-4">
              <span class="text-label">City</span>
              <input v-model="education.city" type="text" class="form-input form-control" placeholder="">
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <div class="multiple-fields-wrapper">
            <div class="all-form-title bold-text form-field two-colls first-coll mb-2">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="education.startDate" name="Start date">
                <span class="text-label">From</span><br>
                <base-input class="text-label">
                  <flat-picker
                    v-model="education.startDate"
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
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="education.endDate" name="End date">
                <span class="text-label">To</span><br>
                <base-input class="text-label">
                  <flat-picker
                    v-model="education.endDate"
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
              <ValidationProvider v-slot="{ errors }" mode="passive" vid="education.currentlyAttending" name="currentlyAttending">
                <span class="text-label">Currently attending</span>

                <base-checkbox v-model="education.currentlyAttending" class="mr-1 form-checkbox-left" />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
        </div>

        <button type="button" class="btn btn-sm btn-primary btn-add-milestone pl-4 pr-4 mb-4" @click.prevent="addNewEducationDetails()">
          Add Education
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
  name: 'Educations',
  components: {
    ValidationObserver,
    ValidationProvider,
    flatPicker
  },
  props: [
    'educations'
  ],
  data () {
    return {
      dateFieldConfig: {
        allowInput: true,
        altFormat: 'F Y',
        altInput: true
      },
      degrees: [
        {
          name: 'Elementary School',
          id: 0
        },
        {
          name: 'Junior High School',
          id: 1
        },
        {
          name: 'Senior High School',
          id: 2
        },
        {
          name: 'Associate Degree',
          id: 3
        },
        {
          name: 'Bachelor Degree',
          id: 4
        },
        {
          name: 'Master Degree',
          id: 5
        },
        {
          name: 'Doctoral Degree',
          id: 6
        },
        {
          name: 'Other',
          id: 7
        }
      ],
      educationsWrapperKey: 0
    }
  },
  methods: {
    addNewEducationDetails () {
      const newEducation = {
        degree: '',
        fieldOfStudy: '',
        school: '',
        country: '',
        city: '',
        startDate: '',
        endDate: '',
        currentlyAttending: '',
        status: 1
      }

      this.educations.push(newEducation)
      this.educationsWrapperKey++
    },
    removeEducationDetails (education, index) {
      const educations = this.educations

      if (Object.hasOwnProperty.call(education, 'id')) {
        const educationUuid = education.uuid

        this.$axios.$patch('/api/education/' + educationUuid, {
          degree: education.degree,
          fieldOfStudy: education.fieldOfStudy,
          school: education.school,
          country: education.country,
          city: education.city,
          startDate: education.startDate,
          endDate: education.endDate,
          currentlyAttending: education.currentlyAttending,
          employee: education.employee,
          status: 0
        }).then(() => {
          educations.splice(index, 1)
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
        educations.splice(index, 1)
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
