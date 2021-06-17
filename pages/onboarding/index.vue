<template>
  <div class="row justify-content-center pt-80">
    <div v-if="step === 1" class="col-9">
      <div class="row text-center">
        <div class="mt-4 col-12">
          <div class="progress" style="height: 5px;">
            <div
              class="progress-bar bg-blue"
              role="progressbar"
              style="width: 16.5%"
              aria-valuenow="16.5"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-4 font-weight-bold">
          <span class="text-highlight progress-font d-inline"><div class="d-inline progress-numbering">01.</div></span> Welcome on board
        </div>
        <div class="col-4">
          <span class="text-highlight progress-font d-inline"><div class="d-inline progress-numbering">02.</div></span> Complete Profile
        </div>
        <div class="col-4">
          <span class="text-highlight progress-font d-inline"><div class="d-inline progress-numbering">03.</div></span> Start Integrating
        </div>
      </div>
      <WelcomeOnboard />
    </div>
    <div v-if="step === 2" class="col-9">
      <div class="row text-center">
        <div class="mt-4 col-12">
          <div class="progress" style="height: 5px;">
            <div
              class="progress-bar bg-blue"
              role="progressbar"
              style="width: 33%"
              aria-valuenow="33"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-4 font-weight-bold">
          <span class="text-highlight progress-font d-inline"><div class="d-inline progress-numbering">01.</div></span> Welcome on board
        </div>
        <div class="col-4">
          <span class="text-highlight progress-font d-inline"><div class="d-inline progress-numbering">02.</div></span> Complete Profile
        </div>
        <div class="col-4">
          <span class="text-highlight progress-font d-inline"><div class="d-inline progress-numbering">03.</div></span> Start Integrating
        </div>
      </div>
      <HowPicardataWorks />
    </div>
    <div v-if="step === 3" class="col-9">
      <div class="row text-center">
        <div class="mt-4 col-12">
          <div class="progress" style="height: 5px;">
            <div
              class="progress-bar bg-blue"
              role="progressbar"
              :style="isProfileCompleted ? 'width: 66%' : 'width: 38%'"
              aria-valuenow="66"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-4">
          <span class="text-highlight progress-font d-inline"><div class="d-inline progress-numbering">01.</div></span> Welcome on board
        </div>
        <div class="col-4 font-weight-bold">
          <span class="text-highlight progress-font d-inline"><div class="d-inline progress-numbering">02.</div></span> Complete Profile
        </div>
        <div class="col-4">
          <span class="text-highlight progress-font d-inline"><div class="d-inline progress-numbering">03.</div></span> Start Integrating
        </div>
      </div>
      <CompleteProfile ref="completeProfile" @finishSaveProfile="next" @skip="skip" @formProfileChange="changeFormComplete($event)" />
    </div>
    <div v-if="step === 4" class="col-12">
      <div class="col-9" style="margin-left: auto;margin-right: auto;">
        <div class="row text-center">
          <div class="mt-4 col-12">
            <div class="progress" style="height: 5px;">
              <div
                class="progress-bar bg-blue"
                role="progressbar"
                :style="isIntegratedGoogle ? 'width: 100%' : 'width: 82%'"
                aria-valuenow="99"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-4">
            <span class="text-highlight progress-font d-inline"><div class="d-inline progress-numbering">01.</div></span> Welcome on board
          </div>
          <div class="col-4">
            <span class="text-highlight progress-font d-inline"><div class="d-inline progress-numbering">02.</div></span> Complete Profile
          </div>
          <div class="col-4 font-weight-bold">
            <span class="text-highlight progress-font d-inline"><div class="d-inline progress-numbering">03.</div></span> Start Integrating
          </div>
        </div>
      </div>
      <AppLibrary />
    </div>
    <div v-else class="row mt-5 justify-content-end btn-bottom">
      <div class="pl-2">
        <button type="button" class="btn btn-link btn-link-dark-gray btn-lg btn-skip" @click="skip">
          Skip for now
        </button>
        <button v-if="step === 3" type="button" class="btn btn-lg btn-primary btn-add" @click.prevent="next">
          Save Profile
        </button>
        <button v-else type="button" class="btn btn-lg btn-primary btn-add" @click.prevent="next">
          Next
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import CompleteProfile from '@/components/Onboarding/CompleteProfile'
import HowPicardataWorks from '~/components/Onboarding/how-picardata-works'
import WelcomeOnboard from '~/components/Onboarding/welcome-onboard'
import AppLibrary from '~/pages/apps/app-library/index.vue'
import loaderMixin from '~/mixins/loader'

export default {
  components: {
    HowPicardataWorks,
    WelcomeOnboard,
    CompleteProfile,
    AppLibrary
  },
  auth: true,
  mixins: [
    loaderMixin
  ],
  async asyncData (context) {
    const userMe = await context.app.$axios.get('/api/users/me')
    const user = userMe.data.user

    return {
      user
    }
  },
  data () {
    return {
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
      isIntegratedGoogle: false
    }
  },
  created () {
    this.setStep(this.user.onboardingStatus)
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
  methods: {
    async next () {
      if (this.step === 3) {
        const result = await this.$refs.completeProfile.post()
        if (result) {
          this.step++
        }
      } else {
        this.$axios.$post('/api/users/onboarding/next')
        this.step++
      }
    },
    skip () {
      this.$axios.$post('/api/employees/', {
        userProfile: {
          firstname: '',
          lastname: '',
          address: '',
          phone: '',
          email: this.$auth.user.username,
          user: this.$auth.user.id
        },
        role: '',
        occupation: '',
        company: {
          name: '',
          location: ''
        }
      }).then((data) => {
        this.$auth.setUser(data)
        this.step = 4
        return true
      })
    },
    changeFormComplete (complete) {
      this.isProfileCompleted = complete
    },
    setStep (onboardingStep) {
      if (onboardingStep <= 3) {
        this.step = onboardingStep
        return
      }

      switch (onboardingStep) {
        case 11:
          this.step = 4
          return
        default:
          this.step = 1
      }
    }
  }
}
</script>
<style scoped>
  .btn-add {
    width: 150px;
    border-radius: 40px;
  }

  .progress-font {
    color: #14142B;
    font-size: 18px;
  }

  .progress-numbering {
    color: #3E4EDD;
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
</style>
