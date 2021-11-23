<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <div class="container-fluid pt-6">
          <div class="row mt-3">
            <div class="col-1" />
            <div class="col-11 form-title-wrapper">
              <span class="form-title page-header float-left">My CV</span>
            </div>
          </div>
          <div class="row mt-2 contract-type-wrapper full-contract-details">
            <div class="col-1" />
            <div class="col-7">
              <div class="card border p-4">
                <div>
                  <div class="all-form-title bold-text form-field">
                    <button type="button" class="btn btn-lg btn-tertiary float-right mr-0 pl-4 pr-4" @click.prevent="goToEditPage">
                      Edit
                    </button>
                    <span class="text-label fs-20 ff-roboto"> {{ profile.firstName }} {{ profile.lastName }}</span><br>
                    <span class="text-label fs-14"> {{ employee.street }} {{ employee.city }} {{ employee.postalCode }} {{ employee.countryOfTaxResidence }} </span><br>
                    <span class="text-label fs-14"> {{ profile.userName }}</span><br>
                    <span class="text-label fs-14"> {{ employee.phoneNumber }}</span><br>
                  </div>

                  <div class="all-form-title bold-text form-field pl-4 pt-4 pb-2">
                    <div class="pb-3 mb-3 border-bottom">
                      <span class="text-label fs-16 ff-roboto font-weight-600"> Work Experience</span>
                    </div>
                    <div v-for="(workExperience, index) in workExperiences" :key="'workExperiences-' + index" class="pb-3">
                      <span class="text-label fs-14"> {{ workExperience.jobTitle }} </span><br>
                      <span class="text-label fs-14"> {{ workExperience.company }} {{ workExperience.city }}</span><br>
                      <span class="text-label fs-14"> From {{ $moment(workExperience.startDate).format("MMMM YYYY") }} to {{ $moment(workExperience.endDate).format("MMMM YYYY") }}</span><br>
                    </div>
                  </div>

                  <div class="all-form-title bold-text form-field pl-4 pt-4 pb-2">
                    <div class="pb-3 mb-3 border-bottom">
                      <span class="text-label fs-16 ff-roboto font-weight-600"> Education</span>
                    </div>
                    <div v-for="(education, index) in educations" :key="'educations-' + index" class="pb-3">
                      <span class="text-label fs-14"> {{ degrees[education.degree].name }} </span><br>
                      <span class="text-label fs-14"> {{ education.school }} {{ education.city }}</span><br>
                      <span class="text-label fs-14"> From {{ $moment(education.startDate).format("MMMM YYYY") }} to {{ $moment(education.endDate).format("MMMM YYYY") }}</span><br>
                    </div>
                  </div>

                  <div class="all-form-title bold-text form-field pl-4 pt-4 pb-2">
                    <div class="pb-3 mb-3 border-bottom">
                      <span class="text-label fs-16 ff-roboto font-weight-600"> Skills</span>
                    </div>
                    <div v-for="(skill, index) in skills" :key="'educations-' + index" class="pb-1">
                      <span class="text-label fs-14"> {{ skill.name }} </span><br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="pl-4 pt-2 cv-right-menu text-left">
                <a href="#" class="p-3 border-bottom text-left text-secondary">
                  <img src="~/assets/menu_icons/delete.png" alt="Delete CV">
                  <span class="pl-2">
                    Delete this resume
                  </span>

                </a>
                <a href="#" class="p-3 border-bottom text-left text-secondary">
                  <img src="~/assets/menu_icons/Download.png" alt="Download as PDF">
                  <span class="pl-2">
                    Download as PDF
                  </span>
                </a>
                <a href="#" class="p-3 border-bottom text-left text-secondary">
                  <img src="~/assets/menu_icons/info.png" alt="Visit the help center">
                  <span class="pl-2">
                    Visit the help center
                  </span>
                </a>
                <a href="#" class="p-3 border-bottom text-left text-secondary">
                  <img src="~/assets/menu_icons/Contracts.png" alt="View CV as Public">
                  <span class="pl-2">
                    View CV as Public
                  </span>
                </a>
              </div>

              <div class="pl-4 pt-6 cv-right-menu text-left">
                <span class="text-primary">Resume private settings</span>
                <a href="#" class="p-3 text-left text-primary">
                  <img src="~/assets/menu_icons/Tick.png" alt="Delete CV">
                  <span class="pl-2">
                    Draft
                  </span><br>

                  <span class="description d-block">No view access</span>

                </a>
                <a href="#" class="p-3 text-left text-primary">
                  <img src="~/assets/menu_icons/Untick.png" alt="Download as PDF">
                  <span class="pl-2">
                    Public
                  </span><br>
                  <span class="description d-block">
                    Can be found and viewed by all employers on Globelise via search candidate feature, employers you are applying to and via view access link that you share
                  </span>
                </a>
                <a href="#" class="p-3 text-left text-primary">
                  <img src="~/assets/menu_icons/Untick.png" alt="Visit the help center">
                  <span class="pl-2">
                    Private
                  </span><br>
                  <span class="description d-block">
                    Can be found and viewed by employers you are applying to and via view access link that you share
                  </span>
                </a>
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

export default {
  layout: 'argon',
  auth: true,
  components: {
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
      profile: {
        firstName: '',
        lastName: '',
        id: '',
        userName: ''
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
    this.profile.userName = this.profileRaw.user.username
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
    goToEditPage () {
      window.location.href = '/cv/edit'
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

  .cv-right-menu {
    a {
      display: block;

      span {
        vertical-align: bottom;
      }

      img {
        height: 24px;
      }

      .description {
        font-size: 14px;
        padding-left: 35px;
        padding-top: 10px;
      }
    }
  }

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

      .fs-14 {
        font-size: 14px;
      }

      .fs-16 {
        font-size: 16px;
      }

      .fs-18 {
        font-size: 18px;
      }

      .fs-20 {
        font-size: 20px;
      }

      .fs-22 {
        font-size: 22px;
      }

      .fs-24 {
        font-size: 24px;
      }

      .ff-roboto {
        font-family: 'Roboto', sans-serif;
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
