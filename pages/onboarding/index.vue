<template>
  <div class="col-12">
    <div v-if="step === 1" class="col-10">
      <div class="row text-center">
        <div class="mt-4 col-12">
          <div class="progress" style="height: 5px;">
            <div
              class="progress-bar bg-primary"
              role="progressbar"
              style="width: 30%"
              aria-valuenow="30"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-4 font-weight-bold">
          01. Welcome on board
        </div>
        <div class="col-4">
          02. Complete Profile
        </div>
        <div class="col-4">
          03. Start Integrating
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <H1>How Picardata works?</H1>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-4">
          <div class="card">
            <div class="card-body p-4">
              <h5 class="card-title">
                Your Apps
              </h5>
              <p class="card-text">
                You probably have a tons of app to manage. Social media, design tools, sales and
                marketing and much more.
              </p>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card">
            <div class="card-body p-4">
              <h5 class="card-title">
                Special title treatment
              </h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional content.
              </p>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card">
            <div class="card-body p-4">
              <h5 class="card-title">
                Special title treatment
              </h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional content.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5 justify-content-end">
        <div class="pl-2">
          <button type="button" class="btn btn-light btn-lg" @click.prevent="next">
            Skip for now
          </button>
          <button type="button" class="btn btn-primary btn-lg" @click.prevent="next">
            Next
          </button>
        </div>
      </div>
    </div>
    <div v-if="step === 2" class="col-10">
      <div class="row text-center">
        <div class="mt-4 col-12">
          <div class="progress" style="height: 5px;">
            <div
              class="progress-bar bg-primary"
              role="progressbar"
              style="width: 60%"
              aria-valuenow="60"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-4">
          01. Welcome on board
        </div>
        <div class="col-4 font-weight-bold">
          02. Complete Profile
        </div>
        <div class="col-4">
          03. Start Integrating
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <H1>Complete your Profile</H1>
        </div>
      </div>
      <form>
      <div class="row mt-5">
        <div class="col-6">
          <div class="font-weight-bold">
            General Information
          </div>
          <AppControlInput v-model="profile.name" name="name" placeholder="Your Name" type="text" />
          <AppControlInput v-model="profile.email" placeholder="Email" type="email" />
          <AppControlInput v-model="profile.phone" placeholder="Phone Number" type="tel" />
          <AppControlInput v-model="profile.location" name="address" placeholder="Location" type="address" />
        </div>
        <div class="col-6">
          <div class="font-weight-bold">
            Work Information
          </div>
          <AppControlInput
            v-model="profile.occupation"
            :choices="choices"
            placeholder="Choose Occupation"
            control-type="select"
          />
          <AppControlInput v-model="profile.role" placeholder="Role" type="text" />
          <AppControlInput v-model="profile.organization" name="job" placeholder="Organization" type="text" />
          <AppControlInput v-model="profile.workLocation" placeholder="Work Location" type="text" />
        </div>
      </div>
      <div class="row mt-5 justify-content-end">
        <button type="button" class="btn btn-light btn-lg" @click.prevent="next">
          Skip for now
        </button>
        <button type="button" class="btn btn-primary btn-lg" @click.prevent="next">
          Save Profile
        </button>
      </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  auth: true,
  data () {
    return {
      step: 1,
      choices: [
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
        email: '',
        phone: '',
        location: '',
        occupation: '',
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
    getStepProfile () {
      return this.step === 2
    },
    getStepIntegrations () {
      return this.step === 3
    }
  },
  methods: {
    next () {
      this.step = this.step + 1
      if (this.step === 3) {
        this.$axios.$post('/api/employees/', {
          userProfile: {
            firstname: this.profile.name,
            lastname: '',
            address: this.profile.location,
            phone: this.profile.phone,
            email: this.profile.email,
            user: this.$auth.user.id
          },
          role: this.profile.role,
          occupation: this.profile.occupation,
          company: {
            name: this.profile.organization,
            location: this.profile.workLocation
          }
        }).then(() => {
          this.$router.push('/')
        }).catch((e) => {
          for (const field of ['username', 'password']) {
            const errors = e.response.data.errors[field]
            if (errors !== undefined) {
              this.errors = this.errors.concat(errors)
            }
          }
          return false
        })
      }
    }
  }
}
</script>
