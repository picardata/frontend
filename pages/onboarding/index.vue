<template>
  <div class="row justify-content-center">
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
          <span class="text-highlight">01.</span> Welcome on board
        </div>
        <div class="col-4">
          <span class="text-highlight">02.</span> Complete Profile
        </div>
        <div class="col-4">
          <span class="text-highlight">03.</span> Start Integrating
        </div>
      </div>
      <WelcomeOnboard />
      <div class="row mt-5 justify-content-end">
        <div class="pl-2">
          <button type="button" class="btn btn-link btn-link-dark-gray btn-lg" @click.prevent="post">
            Skip for now
          </button>
          <button type="button" class="btn btn-lg btn-primary btn-add" @click.prevent="next">
            Next
          </button>
        </div>
      </div>
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
          <span class="text-highlight">01.</span> Welcome on board
        </div>
        <div class="col-4">
          <span class="text-highlight">02.</span> Complete Profile
        </div>
        <div class="col-4">
          <span class="text-highlight">03.</span> Start Integrating
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <h3><img src="~/assets/nav_logo_dark.png" alt="Picardata"> How Picardata works?</h3>
        </div>
      </div>
      <div class="row mt-5">
        <HowPicardataWorks />
      </div>
      <div class="row mt-5 justify-content-end">
        <div class="pl-2">
          <button type="button" class="btn btn-link btn-link-dark-gray btn-lg" @click.prevent="post">
            Skip for now
          </button>
          <button type="button" class="btn btn-lg btn-primary btn-add" @click.prevent="next">
            Next
          </button>
        </div>
      </div>
    </div>
    <div v-if="step === 3" class="col-9">
      <CompleteProfile />
    </div>
  </div>
</template>
<script>
import CompleteProfile from '@/components/Onboarding/CompleteProfile'
import HowPicardataWorks from '~/components/Onboarding/how-picardata-works'
import WelcomeOnboard from '~/components/Onboarding/welcome-onboard'

export default {
  components: {
    HowPicardataWorks,
    WelcomeOnboard,
    CompleteProfile
  },
  auth: true,
  data () {
    return {
      step: 3,
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
      profile: {
        name: '',
        email: this.$auth.user.username,
        phone: '',
        formattedPhone: '',
        location: '',
        occupation: 0,
        role: '',
        organization: '',
        workLocation: ''
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
  methods: {
    post () {
      this.$axios.$post('/api/employees/', {
        userProfile: {
          firstname: this.profile.name.trim(),
          lastname: '',
          address: this.profile.location,
          phone: this.profile.phone.trim() === '' ? '' : this.profile.formattedPhone,
          email: this.profile.email,
          user: this.$auth.user.id
        },
        role: this.profile.role,
        occupation: this.profile.occupation,
        company: {
          name: this.profile.organization,
          location: this.profile.workLocation
        }
      }).then((data) => {
        this.$auth.setUser(data)
        this.$router.push('/library')
      }).catch((e) => {
        const errors = {}

        if (e.response.data.errors.userProfile !== undefined) {
          Object.entries(e.response.data.errors.userProfile).forEach(function (value) {
            const key = 'profile.' + value[0]
            errors[key] = value[1]
          })
        }
        if (e.response.data.errors.company !== undefined) {
          Object.entries(e.response.data.errors.company).forEach(function (value) {
            const key = 'company.' + value[0]
            errors[key] = value[1]
          })
        }

        // eslint-disable-next-line no-console
        console.log(errors)
        this.$refs.form.setErrors(errors)
        this.step = 3
        return false
      })
    },
    next () {
      if (this.step === 4) {
        this.post()
      } else {
        this.step = this.step + 1
      }
    }
  }
}
</script>
<style>
  .btn-add {
    width: 150px;
    border-radius: 40px;
  }
</style>
