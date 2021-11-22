<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <div class="container-fluid pt-6">
          <div class="row mt-3">
            <div class="col-12 form-title-wrapper">
              <span class="form-title page-header">Build your resume</span>
            </div>
          </div>
          <div class="row mt-6 contract-type-wrapper">
            <div class="col-3" />
            <div class="col-7">
              <div class="row">
                <div class="col-12">
                  <div v-if="step === 1">
                    <profile ref="profile" :profile="profile" :employee="employee" @finishSaveProfile="next" @formProfileChange="changeFormComplete($event)" />
                  </div>

                  <div v-if="step === 2">
                    <education ref="education" :educations="educations" @finishSaveProfile="next" @formProfileChange="changeFormComplete($event)" />
                  </div>

                  <div v-if="step === 3">
                    <workExperience ref="workExperience" :work-experiences="workExperiences" @finishSaveProfile="next" @formProfileChange="changeFormComplete($event)" />
                  </div>

                  <div v-if="step === 4">
                    <skill ref="skill" :skills="skills" @finishSaveProfile="next" @formProfileChange="changeFormComplete($event)" />
                  </div>

                  <div v-if="step === 5">
                    <additionalInfo ref="additionalInfo" :additional-info="additionalInfo" @finishSaveProfile="next" @formProfileChange="changeFormComplete($event)" />
                  </div>

                  <div class="contract-type-actions-wrapper">
                    <button v-if="step < 6" type="button" class="btn btn-lg btn-secondary btn-add next-btn" @click.prevent="next">
                      Next
                    </button>

                    <button v-if="step > 1 && step < 6" type="button" class="btn btn-lg btn-primary btn-add back-btn" @click.prevent="back">
                      <i class="fas fa-arrow-left" />
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :show.sync="modals.successfullSubmission" size="lg" modal-classes="modal-contract-details">
      <div class="col-12 form-title-wrapper">
        <span class="form-title page-header">Your CV has been successfully updated</span><br>
        <img style="height: 400px;" src="~/assets/menu_icons/Email_confirmation.png" alt="Successful">
      </div>

      <button type="button" class="btn btn-lg btn-primary btn-add next-btn float-right" @click.prevent="modals.successfullSubmission = false">
        <span>Close</span>
      </button>
    </modal>
  </div>
</template>

<script>
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import 'vue-country-region-select'
import profile from '@/components/cv/profile'
import education from '@/components/cv/education'
import workExperience from '@/components/cv/workExperience'
import skill from '@/components/cv/skill'
import additionalInfo from '@/components/cv/additionalInfo'

export default {
  layout: 'argon',
  auth: true,
  components: {
    profile,
    education,
    workExperience,
    skill,
    additionalInfo
  },
  async asyncData (context) {
    const employeeId = context.app.$auth.user.userProfile.employees[0].id

    const [profile, educations, workExperiences, skills, additionalInfos] = await Promise.all([
      context.app.$axios.get('/api/users/me'),
      context.app.$axios.get('/api/education/?order[updatedAt]=asc&page_number=1&items_per_page=999&status=1&employee=' + employeeId),
      context.app.$axios.get('/api/work/experience/?order[updatedAt]=asc&page_number=1&items_per_page=999&status=1&employee=' + employeeId),
      context.app.$axios.get('/api/skill/?order[updatedAt]=asc&page_number=1&items_per_page=999&status=1&employee=' + employeeId),
      context.app.$axios.get('/api/additional/info/?order[updatedAt]=asc&page_number=1&items_per_page=999&status=1&employee=' + employeeId)

    ])

    return {
      profileRaw: profile.data,
      educationsRawData: educations.data,
      workExperiencesRawData: workExperiences.data,
      skillsRawData: skills.data,
      additionalInfosRawData: additionalInfos.data
    }
  },

  data () {
    return {
      step: 1,
      submenu: true,
      profile: {
        firstName: '',
        lastName: '',
        id: ''
      },
      employee: {
        id: '',
        countryOfTaxResidence: '',
        city: '',
        street: '',
        postalCode: '',
        taxID: '',
        phoneNumber: '',
        role: '',
        occupation: '',
        dateOfBirth: '',
        nationality: '',
        timezone: '',
        isGlobeliseAdmin: '',
        isCompanyAdmin: '',
        company: '',
        userProfile: ''
      },
      educations: [
        {
          degree: '',
          fieldOfStudy: '',
          school: '',
          country: '',
          city: '',
          startDate: '',
          endDate: '',
          currentlyAttending: '',
          employee: '',
          status: 1
        }
      ],
      workExperiences: [
        {
          jobTitle: '',
          company: '',
          country: '',
          city: '',
          startDate: '',
          endDate: '',
          currentWorkplace: '',
          description: '',
          status: 1,
          employee: ''
        }
      ],
      skills: [
        {
          name: '',
          status: 1,
          employee: ''
        }
      ],
      additionalInfo: {
        jobTitle: '',
        jobType: null,
        industry: '',
        yearOfExperience: '',
        salaryCurrency: '',
        salaryAmount: '',
        willingToRelocate: '',
        countryPreference: '',
        workingDays: [],
        shifts: [],
        otherWorkArrangements: [],
        status: 1,
        employee: ''
      },
      modals: {
        successfullSubmission: false
      }
    }
  },
  created () {
    this.profile.firstName = this.profileRaw.user.userProfile.firstname
    this.profile.lastName = this.profileRaw.user.userProfile.lastname
    this.profile.id = this.profileRaw.user.userProfile.id
    this.employee.countryOfTaxResidence = this.profileRaw.user.userProfile.employees[0].countryOfTaxResidence
    this.employee.city = this.profileRaw.user.userProfile.employees[0].city
    this.employee.street = this.profileRaw.user.userProfile.employees[0].street
    this.employee.postalCode = this.profileRaw.user.userProfile.employees[0].postalCode
    this.employee.taxID = this.profileRaw.user.userProfile.employees[0].taxID
    this.employee.phoneNumber = this.profileRaw.user.userProfile.employees[0].phoneNumber
    this.employee.role = this.profileRaw.user.userProfile.employees[0].role
    this.employee.occupation = this.profileRaw.user.userProfile.employees[0].occupation
    this.employee.dateOfBirth = this.profileRaw.user.userProfile.employees[0].dateOfBirth
    this.employee.nationality = this.profileRaw.user.userProfile.employees[0].nationality
    this.employee.timezone = this.profileRaw.user.userProfile.employees[0].timezone
    this.employee.isGlobeliseAdmin = this.profileRaw.user.userProfile.employees[0].isGlobeliseAdmin
    this.employee.isCompanyAdmin = this.profileRaw.user.userProfile.employees[0].isCompanyAdmin
    this.employee.userProfile = this.profileRaw.user.userProfile.id
    this.employee.uuid = this.profileRaw.user.userProfile.employees[0].uuid
    this.employee.id = this.profileRaw.user.userProfile.employees[0].id

    if (this.profileRaw.user.userProfile.employees[0].company !== null) {
      this.employee.company = this.profileRaw.user.userProfile.employees[0].company.id
    }

    if (this.educationsRawData.length > 0) {
      const educations = []

      this.educationsRawData.forEach(function (educationData) {
        const education = {
          degree: educationData.degree,
          fieldOfStudy: educationData.fieldOfStudy,
          school: educationData.school,
          country: educationData.country,
          city: educationData.city,
          startDate: educationData.startDate,
          endDate: educationData.endDate,
          currentlyAttending: educationData.currentlyAttending,
          id: educationData.id,
          uuid: educationData.uuid,
          status: educationData.status,
          employee: educationData.employee.id
        }

        educations.push(education)
      })

      this.educations = educations
    }

    if (this.workExperiencesRawData.length > 0) {
      const workExperiences = []

      this.workExperiencesRawData.forEach(function (workExperienceData) {
        const workExperience = {
          jobTitle: workExperienceData.jobTitle,
          company: workExperienceData.company,
          country: workExperienceData.country,
          city: workExperienceData.city,
          currentWorkplace: workExperienceData.currentWorkplace,
          description: workExperienceData.description,
          startDate: workExperienceData.startDate,
          endDate: workExperienceData.endDate,
          status: workExperienceData.status,
          employee: workExperienceData.employee.id,
          id: workExperienceData.id,
          uuid: workExperienceData.uuid
        }

        workExperiences.push(workExperience)
      })

      this.workExperiences = workExperiences
    }

    if (this.skillsRawData.length > 0) {
      const skills = []

      this.skillsRawData.forEach(function (skillRawData) {
        const skill = {
          name: skillRawData.name,
          status: skillRawData.status,
          employee: skillRawData.employee.id,
          id: skillRawData.id,
          uuid: skillRawData.uuid
        }

        skills.push(skill)
      })

      this.skills = skills
    }

    if (this.additionalInfosRawData.length > 0) {
      let additionalInfo = {}

      this.additionalInfosRawData.forEach(function (additionalInfoRawData) {
        additionalInfo = {
          jobTitle: additionalInfoRawData.jobTitle,
          industry: additionalInfoRawData.industry,
          yearOfExperience: additionalInfoRawData.yearOfExperience,
          salaryCurrency: additionalInfoRawData.salaryCurrency,
          salaryAmount: additionalInfoRawData.salaryAmount,
          willingToRelocate: additionalInfoRawData.willingToRelocate,
          countryPreference: additionalInfoRawData.countryPreference,
          status: additionalInfoRawData.status,
          employee: additionalInfoRawData.employee.id,
          id: additionalInfoRawData.id,
          uuid: additionalInfoRawData.uuid,
          jobType: JSON.parse(additionalInfoRawData.jobType),
          workingDays: JSON.parse(additionalInfoRawData.workingDays),
          shifts: JSON.parse(additionalInfoRawData.shifts),
          otherWorkArrangements: JSON.parse(additionalInfoRawData.otherWorkArrangements)
        }
      })

      this.additionalInfo = additionalInfo
    }
  },
  methods: {
    changeFormComplete (complete) {
      this.isProfileCompleted = complete
    },
    async next () {
      if (this.step === 1) {
        const isValid = await this.$refs.profile.post()
        if (!isValid) {
          return false
        }

        this.step++

        this.$axios.$patch('/api/employees/' + this.employee.uuid, {
          userProfile: this.employee.userProfile,
          role: this.employee.role,
          occupation: this.employee.occupation,
          taxID: this.employee.taxID,
          nationality: this.employee.nationality,
          countryOfTaxResidence: this.employee.countryOfTaxResidence,
          timezone: this.employee.timezone,
          street: this.employee.street,
          city: this.employee.city,
          postalCode: this.employee.postalCode,
          phoneNumber: this.employee.phoneNumber,
          isCompanyAdmin: this.employee.isCompanyAdmin,
          isGlobeliseAdmin: this.employee.isGlobeliseAdmin,
          company: this.employee.company
        }).then(() => {
          this.$axios.$patch('/api/user-profiles/' + this.profile.id, {
            firstname: this.profile.firstName,
            lastname: this.profile.lastName
          }).then(() => {
            return true
          }).catch((e) => {
            const errors = {}
            Object.entries(e.response.data.errors).forEach(function (value) {
              const key = value[0]
              errors[key] = value[1]
            })
            this.$refs.form.setErrors(errors)
            return false
          })

          return true
        }).catch((e) => {
          const errors = {}

          Object.entries(e.response.data.errors).forEach(function (value) {
            const key = value[0]
            errors[key] = value[1]
          })

          this.$refs.form.setErrors(errors)
          return false
        })
      } else if (this.step === 2) {
        const isValid = await this.$refs.education.post()
        if (!isValid) {
          return false
        }

        this.step++

        const employeeId = this.employee.id
        const axiosCall = this.$axios

        this.educations.forEach(function (education) {
          if (Object.hasOwnProperty.call(education, 'id')) {
            const educationUuid = education.uuid

            axiosCall.$patch('/api/education/' + educationUuid, {
              degree: education.degree,
              fieldOfStudy: education.fieldOfStudy,
              school: education.school,
              country: education.country,
              city: education.city,
              startDate: education.startDate,
              endDate: education.endDate,
              currentlyAttending: education.currentlyAttending,
              status: education.status,
              employee: education.employee
            }).then(() => {
              return true
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
            axiosCall.$post('/api/education/', {
              degree: education.degree,
              fieldOfStudy: education.fieldOfStudy,
              school: education.school,
              country: education.country,
              city: education.city,
              startDate: education.startDate,
              endDate: education.endDate,
              currentlyAttending: education.currentlyAttending,
              status: education.status,
              employee: employeeId
            }).then((data) => {
              education.id = data.id
              education.uuid = data.uuid
              education.employee = data.employee.id

              return true
            }).catch((e) => {
              const errors = {}

              Object.entries(e.response.data.errors).forEach(function (value) {
                const key = value[0]
                errors[key] = value[1]
              })

              this.$refs.form.setErrors(errors)
              return false
            })
          }
        })
      } else if (this.step === 3) {
        const isValid = await this.$refs.workExperience.post()
        if (!isValid) {
          return false
        }

        this.step++

        const employeeId = this.employee.id
        const axiosCall = this.$axios

        this.workExperiences.forEach(function (workExperience) {
          if (Object.hasOwnProperty.call(workExperience, 'id')) {
            const workExperienceUuid = workExperience.uuid

            axiosCall.$patch('/api/work/experience/' + workExperienceUuid, {
              jobTitle: workExperience.jobTitle,
              company: workExperience.company,
              country: workExperience.country,
              city: workExperience.city,
              currentWorkplace: workExperience.currentWorkplace,
              description: workExperience.description,
              startDate: workExperience.startDate,
              endDate: workExperience.endDate,
              status: workExperience.status,
              employee: workExperience.employee
            }).then(() => {
              return true
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
            axiosCall.$post('/api/work/experience/', {
              jobTitle: workExperience.jobTitle,
              company: workExperience.company,
              country: workExperience.country,
              city: workExperience.city,
              currentWorkplace: workExperience.currentWorkplace,
              description: workExperience.description,
              startDate: workExperience.startDate,
              endDate: workExperience.endDate,
              status: workExperience.status,
              employee: employeeId
            }).then((data) => {
              workExperience.id = data.id
              workExperience.uuid = data.uuid
              workExperience.employee = data.employee.id

              return true
            }).catch((e) => {
              const errors = {}

              Object.entries(e.response.data.errors).forEach(function (value) {
                const key = value[0]
                errors[key] = value[1]
              })

              this.$refs.form.setErrors(errors)
              return false
            })
          }
        })
      } else if (this.step === 4) {
        const isValid = await this.$refs.skill.post()
        if (!isValid) {
          return false
        }

        this.step++

        const employeeId = this.employee.id
        const axiosCall = this.$axios

        this.skills.forEach(function (skill) {
          if (Object.hasOwnProperty.call(skill, 'id')) {
            const skillUuid = skill.uuid

            axiosCall.$patch('/api/skill/' + skillUuid, {
              name: skill.name,
              status: skill.status,
              employee: skill.employee
            }).then(() => {
              return true
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
            axiosCall.$post('/api/skill/', {
              name: skill.name,
              status: skill.status,
              employee: employeeId
            }).then((data) => {
              skill.id = data.id
              skill.uuid = data.uuid
              skill.employee = data.employee.id

              return true
            }).catch((e) => {
              const errors = {}

              Object.entries(e.response.data.errors).forEach(function (value) {
                const key = value[0]
                errors[key] = value[1]
              })

              this.$refs.form.setErrors(errors)
              return false
            })
          }
        })
      } else if (this.step === 5) {
        const isValid = await this.$refs.additionalInfo.post()
        if (!isValid) {
          return false
        }

        this.step = 1
        this.modals.successfullSubmission = true

        const employeeId = this.employee.id
        const axiosCall = this.$axios

        if (Object.hasOwnProperty.call(this.additionalInfo, 'id')) {
          const additionalInfoUuid = this.additionalInfo.uuid

          axiosCall.$patch('/api/additional/info/' + additionalInfoUuid, {
            jobTitle: this.additionalInfo.jobTitle,
            jobType: this.additionalInfo.jobType,
            industry: this.additionalInfo.industry,
            yearOfExperience: this.additionalInfo.yearOfExperience,
            salaryCurrency: this.additionalInfo.salaryCurrency,
            salaryAmount: this.additionalInfo.salaryAmount,
            willingToRelocate: this.additionalInfo.willingToRelocate,
            countryPreference: this.additionalInfo.countryPreference,
            workingDays: this.additionalInfo.workingDays,
            shifts: this.additionalInfo.shifts,
            otherWorkArrangements: this.additionalInfo.otherWorkArrangements,
            status: this.additionalInfo.status,
            employee: this.additionalInfo.employee
          }).then(() => {
            return true
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
          axiosCall.$post('/api/additional/info/', {
            jobTitle: this.additionalInfo.jobTitle,
            jobType: this.additionalInfo.jobType,
            industry: this.additionalInfo.industry,
            yearOfExperience: this.additionalInfo.yearOfExperience,
            salaryCurrency: this.additionalInfo.salaryCurrency,
            salaryAmount: this.additionalInfo.salaryAmount,
            willingToRelocate: this.additionalInfo.willingToRelocate,
            countryPreference: this.additionalInfo.countryPreference,
            workingDays: this.additionalInfo.workingDays,
            shifts: this.additionalInfo.shifts,
            otherWorkArrangements: this.additionalInfo.otherWorkArrangements,
            status: this.additionalInfo.status,
            employee: employeeId
          }).then((data) => {
            this.additionalInfo.id = data.id
            this.additionalInfo.uuid = data.uuid
            this.additionalInfo.employee = data.employee.id

            return true
          }).catch((e) => {
            const errors = {}

            Object.entries(e.response.data.errors).forEach(function (value) {
              const key = value[0]
              errors[key] = value[1]
            })

            this.$refs.form.setErrors(errors)
            return false
          })
        }
      }
    },
    back () {
      this.step--
    }
  }
}
</script>

<style scoped>
  .card {
    height: auto;
  }

  h1 {
    font-size: 36px;
    font-weight: bolder;
  }

  .form-title {
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 54px;
    /* identical to box height */
    letter-spacing: 0.75px;
    /* Body Text */
    color: #313131;
  }

  .bold-text{
    font-weight:700 !important;
  }
  .contract-type-wrapper {
    text-align: center;
  }
</style>

<style lang="scss">

  .multiple-fields-wrapper {
    display: inline-table;
    width: 100%;
  }

  .form-title-wrapper {
    text-align: center;
    span {
      display: block;
    }
  }

  .full-contract-details {
    .form-field {
      color: #6a6969;

      .contract-main-title {
        text-align: center;
      }

      .sub-point {
        margin-left: 25px;
      }

      .sub-sub-point {
        margin-left: 50px;
      }

      b {
        color: black;
        font-weight: 900;
      }
    }
  }
  .contract-type-actions-wrapper {
    margin-bottom: 20px;

    .next-btn {
      width: 100%;
      margin-bottom: 5px;
    }

    .back-btn {
      margin-top: 0;
      background-color: transparent;
      border: 0px;
      box-shadow: none;
      color: #525f7f;
      float: left;
      padding-left: 0px;

      .fa {
        margin-right: 5px;
      }

      &.btn-primary:hover, &.btn-primary:active {
        background-color: transparent;
        border: 0px;
        box-shadow: none !important;
        color: #525f7f;
      }
    }
  }

  .signature-wrapper {
    .form-field {
      width: 40%;
    }
  }
  .img-btn {
    background-color: transparent;
  }

  .all-form-title {
    font-family: 'Roboto Condensed';
    font-style: normal;
    color: #313131;
    text-align: center;
    /*margin-bottom: 30px;*/

    &.form-field {
      text-align: left;
    }

    &.two-colls {
      &.first-coll {
        padding-right: 10px;
      }
      float: left;
      display: block;
      width: 50%;
    }

    &.field-group {
      .text-label {
        font-size: 18px;
        color: #2E4823 !important;
      }
      margin-bottom: 10px;
    }

    h3 {
      font-size: 18px;
    }

    .text-label {
      font-size: 16px;
      font-weight: 800 !important;
      color: #2E4823 !important;

      &.text-label-secondary {
        color: #6BB745 !important;
      }
    }
    .entity-name {
      font-size: 20px !important;
      margin: 10px 0;
      display: block;
    }

    .text-label-desc {
      display: block;
      font-size: 14px;
      color: darkgrey;
    }

    .form-checkbox-left {
      display: block;
      float: left;
      margin-top: 0;
    }

    .form-control-label {
      font-size: 16px;
      font-weight: 800 !important;
      color: #313131;
    }

    .text-label-desc {
      .form-control-label {
        display: block;
        font-size: 14px;
        color: darkgrey;
      }
    }

    .form-input {
      margin: 10px 0 5px 0;
      width: 100%;
      height: 100%;
      outline: none;
      font-size: 16px;
      line-height: 24px;
      color: var(--black);
    }

    .form-signature {
      border: none;
      border-bottom: 1px solid #eee;
      font-family: 'Birthstone', cursive;
      color: black;
      font-size: 24px;
    }

    .contract-review-field-wrapper {
      background-color: #f4f3f5;
      padding: 10px 10px;
      height: 40px;
      margin: 10px 0 0 0;
      display: inline-table;
      width: 100%;

      .text-left {
        float: left;
      }

      .text-right {
        float: right;
        font-weight: bold !important;
      }
    }
  }

  .list-packages{
    padding-left: 0px;

    li{
      list-style: none;
    }
  }

  .list-item-packages{
    li{
      list-style: inside;
      font-family: 'Roboto Condensed';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      letter-spacing: 0.75px;
      /* Body Text */
      color: #000;
    }
  }
  hr{
    &.black-line{
      width: 100%;
      color: #E0E0E0;
      background-color: #E0E0E0;
      margin:1em auto;
    }
  }
  .cards-info{
    span{
      letter-spacing: 0.75px;
      margin-rigt: 6px;
    }
  }
  div{
    &.divider{
      border-left: 1px solid #EFF7FF !important;
    }
  }
</style>
