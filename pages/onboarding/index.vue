<template>
  <div class="row justify-content-center pt-80">
    <div v-if="step === 1" class="col-9">
      <WelcomeOnboard />

      <div class="row mt-4 user-type welcome-button-wrapper">
        <div class="col-6 next-button-wrapper">
          <button type="button" class="btn btn-user-type btn-primary" @click.prevent="goToEntityDetails">
            Next
          </button>
        </div>
        <div class="col-6 next-button-wrapper">
          <button type="button" class="btn btn-user-type btn-primary" @click.prevent="goToIndividualDetails">
            Next
          </button>
        </div>
      </div>
    </div>
    <div v-if="step === 2" class="col-9">
      <div class="row mt-3 text-center">
        <div class="col-4 font-weight-bold">
          <span class="text-highlight progress-font d-inline"><div class="d-inline progress-numbering">01.</div></span> Welcome on board
        </div>
        <div class="col-4">
          <span class="text-highlight progress-font d-inline"><div class="d-inline progress-numbering">02.</div></span> Entity Details
        </div>
        <div class="col-4">
          <span class="text-highlight progress-font d-inline"><div class="d-inline progress-numbering">03.</div></span> Individual Details
        </div>
      </div>
      <EntityDetails ref="entityDetails" :employee="employee" @finishSaveProfile="next" @skip="skip" @formProfileChange="changeFormComplete($event)" />

      <div class="button-form-wrapper mb-5">
        <button type="button" class="btn btn-lg btn-primary btn-add" @click.prevent="next">
          Save Details
        </button>
      </div>
    </div>
    <div v-if="step === 3" class="col-9">
      <div class="row mt-3 text-center">
        <div class="col-4 font-weight-bold">
          <span class="text-highlight progress-font d-inline"><div class="d-inline progress-numbering">01.</div></span> Welcome on board
        </div>
        <div class="col-4">
          <span class="text-highlight progress-font d-inline"><div class="d-inline progress-numbering">02.</div></span> Entity Details
        </div>
        <div class="col-4">
          <span class="text-highlight progress-font d-inline"><div class="d-inline progress-numbering">03.</div></span> Individual Details
        </div>
      </div>
      <IndividualDetails ref="individualDetails" :employee="employee" @finishSaveProfile="next" @formProfileChange="changeFormComplete($event)" />
      <div class="button-form-wrapper mb-5">
        <button type="button" class="btn btn-lg btn-primary btn-add" @click.prevent="next">
          Save Details
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import EntityDetails from '@/components/Onboarding/EntityDetails'
import IndividualDetails from '../../components/Onboarding/IndividualDetails'
import WelcomeOnboard from '~/components/Onboarding/welcome-onboard'
import loaderMixin from '~/mixins/loader'

export default {
  components: {
    WelcomeOnboard,
    EntityDetails,
    IndividualDetails
  },
  auth: true,
  mixins: [
    loaderMixin
  ],
  async asyncData (context) {
    console.log('asyncData')
    const userMe = await context.app.$axios.get('/api/users/me')
    const user = userMe.data.user

    if (user.onboardingStatus >= 21) {
      return context.redirect('/')
    }

    return {
      user
    }
  },
  data () {
    return {
      mountAppLibrary: false,
      googleTimer: null,
      step: 1,
      country: '',
      choices: [
        {
          name: 'Occupation',
          id: 0
        },
        {
          name: 'Artist',
          id: 1
        },
        {
          name: 'Designer',
          id: 2
        },
        {
          name: 'Software Developer',
          id: 3
        },
        {
          name: 'Sales & Marketing',
          id: 4
        }
      ],
      isProfileCompleted: false,
      isIntegrateGoogle: false,
      employee: {
        userProfile: this.$auth.user.userProfile.id,
        role: '',
        occupation: '',
        taxID: '',
        nationality: '',
        countryOfTaxResidence: '',
        timezone: '',
        street: '',
        city: '',
        postalCode: '',
        phoneNumber: '',
        isCompanyAdmin: false,
        isGlobeliseAdmin: false,
        isPartnerAdmin: false,
        isStoreUser: false,
        company: {
          name: '',
          location: '',
          street: '',
          city: '',
          postalCode: '',
          entityType: '',
          vatID: '',
          registrationNumber: '',
          country: ''
        }
      }
    }
  },
  computed: {

    getStepWelcome () {
      return this.step === 1
    },
    getStepPicardataIntro () {
      return this.step === 2
    },
    getStepProfile () {
      return this.step === 3
    },
    getStepIntegrations () {
      return this.step === 4
    }
  },
  created () {
    this.setStep(this.user.onboardingStatus)
    const self = this
    this.googleTimer = setInterval(function () {
      if (self.mountAppLibrary === true) {
        self.getGoogleIntegrationState()
      }
    }, 1500)
  },
  methods: {
    getGoogleIntegrationState () {
      const vuex = JSON.parse(localStorage.getItem('vuex'))
      if (this.isIntegrateGoogle !== vuex.googleIntegration.isIntegrated) {
        this.isIntegrateGoogle = vuex.googleIntegration.isIntegrated
        if (this.isIntegrateGoogle === true) {
          clearInterval(this.googleTimer)
          this.$router.push('/')
        }
      }
    },
    async next () {
      if (this.step === 2) {
        const result = await this.$refs.entityDetails.post()
        if (result) {
          await this.$axios.$post('/api/users/onboarding/next', {
            step: 2
          })

          this.step = 3
        }
      } else if (this.step === 3) {
        const result = await this.$refs.individualDetails.post()
        if (result) {
          const employeesData = {
            userProfile: this.employee.userProfile,
            role: '',
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
            company: null
          }

          if (this.employee.company.name !== '') {
            const companyData = {
              name: this.employee.company.name,
              location: this.employee.company.location,
              street: this.employee.company.street,
              city: this.employee.company.city,
              postalCode: this.employee.company.postalCode,
              entityType: this.employee.company.entityType,
              vatID: this.employee.company.vatID,
              registrationNumber: this.employee.company.registrationNumber,
              country: this.employee.company.country
            }

            await this.$axios.$post('/api/companies/',
              companyData
            ).then((data) => {
              employeesData.company = data.id

              this.$axios.$post('/api/employees/',
                employeesData
              ).then((data) => {
                this.$auth.setUser(data)
                this.step++

                if (Object.hasOwnProperty.call(this.$route.query, 'id') && Object.hasOwnProperty.call(this.$route.query, 'type')) {
                  const id = this.$route.query.id
                  const contractType = this.$route.query.type

                  if (contractType === '1') {
                    this.$router.push('/contracts/preview-contract/' + 'fixed-rate' + '/' + id)
                  } else if (contractType === '2') {
                    this.$router.push('/contracts/preview-contract/' + 'pay-as-you-go' + '/' + id)
                  } else if (contractType === '3') {
                    this.$router.push('/contracts/preview-contract/' + 'milestone' + '/' + id)
                  } else if (contractType === '4') {
                    this.$router.push('/contracts/preview-contract/' + 'full-time-employee' + '/' + id)
                  } else {
                    this.$router.push('/')
                  }
                } else {
                  this.$router.push('/')
                }
              }).catch(() => {
                return false
              })
            }).catch(() => {
              return false
            })
          } else {
            await this.$axios.$post('/api/employees/',
              employeesData
            ).then((data) => {
              this.$auth.setUser(data)
              this.step++

              if (Object.hasOwnProperty.call(this.$route.query, 'id') && Object.hasOwnProperty.call(this.$route.query, 'type')) {
                const id = this.$route.query.id
                const contractType = this.$route.query.type

                if (contractType === '1') {
                  this.$router.push('/contracts/preview-contract/' + 'fixed-rate' + '/' + id)
                } else if (contractType === '2') {
                  this.$router.push('/contracts/preview-contract/' + 'pay-as-you-go' + '/' + id)
                } else if (contractType === '3') {
                  this.$router.push('/contracts/preview-contract/' + 'milestone' + '/' + id)
                } else if (contractType === '4') {
                  this.$router.push('/contracts/preview-contract/' + 'full-time-employee' + '/' + id)
                } else {
                  this.$router.push('/')
                }
              } else {
                this.$router.push('/')
              }
            }).catch(() => {
              return false
            })
          }
        }
      } else {
        await this.$axios.$post('/api/users/onboarding/next')
        this.step++
      }
    },
    async goToEntityDetails () {
      await this.$axios.$post('/api/users/onboarding/next', {
        step: 1
      })

      this.step = 2
    },
    async goToIndividualDetails () {
      await this.$axios.$post('/api/users/onboarding/next', {
        step: 2
      })

      this.step = 3
    },
    skip () {
    },
    changeFormComplete (complete) {
      this.isProfileCompleted = complete
    },
    setStep (onboardingStep) {
      if (onboardingStep <= 3) {
        this.step = onboardingStep
      } else if (onboardingStep === 11) {
        this.step = 4
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .button-form-wrapper {
    padding: 0 2rem 2rem 2rem;
    background: #ffffff;
    .btn-add {
      width: 100%;
      border-radius: 0;
      background-color: #6bb745;
      border-color: #6bb745;
    }
  }

  .btn-add {
    width: 150px;
    border-radius: 40px;
  }

  .btn-user-type {
    width: 100px;
    border-radius: 20px;
  }

  .progress-font {
    color: #14142B;
    font-size: 18px;
  }

  .progress-numbering {
    color: #2E4823;
  }

  .btn-skip {
    color: #4E4B66;
  }

  .btn-bottom {
    position: fixed;
    bottom: 0px;
    right: 0px;
    padding-right: 50px;
    padding-bottom: 25px;
  }

  .pt-80{
    padding-top: 80px;
  }

  .modal-open{
    overflow: auto !important;
  }

  .bg-green{
    background-color: #2E4823 !important;
  }

  .next-button-wrapper {
    padding: 10px 30px;
    text-align: center;
  }
</style>
