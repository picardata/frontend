<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 mt-5">
        <h3><img src="~/assets/nav_logo_dark.png" alt="Picardata"> How Picardata works?</h3>
      </div>
      <div class="col-8 mt-2">
        <div class="card-deck">
          <div class="card">
            <div class="card-body p-4">
              <h5 class="card-title text-highlight">
                YOUR APPS
              </h5>
              <p class="card-text">
                You probably have a tons of app to manage. Social media, design tools, sales and marketing and much more.
              </p>
            </div>
          </div>
          <div class="card">
            <div class="card-body p-4">
              <h5 class="card-title text-highlight">
                HANDLE YOUR APPS
              </h5>
              <p class="card-text">
                How do you manage your apps precisely? Picardata can do that for you to monitor and view how they work.
              </p>
            </div>
          </div>
          <div class="card">
            <div class="card-body p-4">
              <h5 class="card-title text-highlight">
                INTEGRATE YOUR APP
              </h5>
              <p class="card-text">
                Firstly you have to integrate them. You can add, revoke and view data and access within your app.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 mt-2">
        <div class="card align-self-center">
          <div class="card-body">
            <form @submit.prevent="onSubmit">
              <p v-if="errors.length" class="text-danger">
                <b>Please correct the following error(s):</b>
              </p>
              <ul class="text-danger">
                <li v-for="error in errors" :key="error">
                  {{ error }}
                </li>
              </ul>
              <AppControlInput v-model="email" required type="email">
                E-Mail Address
              </AppControlInput>
              <AppControlInput v-model="password" required type="password">
                Password
              </AppControlInput>
              <div class="form-submission text-right">
                <AppButton class="btn btn-primary" type="submit">
                  {{ isLogin ? 'Login' : 'Sign Up' }}
                </AppButton>
              </div>
            </form>
            <div class="row mt-2 p-3">
              Already have an account? &nbsp;<nuxt-link to="/login">
                Log In
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AdminAuthPage',
  layout: 'admin',
  auth: false,
  data () {
    return {
      errors: [],
      isLogin: false,
      email: '',
      password: ''
    }
  },
  methods: {
    async onSubmit () {
      if (!this.isLogin) {
        const result = await this.$axios
          .$post('/api/users/', {
            username: this.email,
            password: this.password
          })
          .then((data) => {
            // eslint-disable-next-line no-console
            console.log(data)
          })
          .catch((e) => {
            for (const field of ['username', 'password']) {
              const errors = e.response.data.errors[field]
              if (errors !== undefined) {
                this.errors = errors
              }
            }
            return false
          })
        if (result === false) {
          return false
        }
      }
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.email,
            password: this.password
          }
        })
        if (!this.isLogin) {
          this.$router.push('/onboarding')
        } else {
          this.$router.push('/')
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    }
  }
}
</script>
