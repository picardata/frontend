<template>
  <div class="container">
    <div class="row justify-content-center" style="margin-bottom: 20px">
      <div class="col-8 mt-5">
        <div v-if="message != ''" class="alert alert-warning alert-dismissible fade show" role="alert">
          {{ message }}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" style="margin-bottom: 20px">
      <div class="col-8">
        <div class="d-flex justify-content-center">
          <h5>Find your account</h5>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" style="margin-bottom: 20px">
      <div class="col-8">
        <form @submit.prevent="onSubmit">
          <AppControlInput v-model="email" required type="email" placeholder="email">
            enter your email
          </AppControlInput>
          <div class="d-flex justify-content-center">
            <AppButton class="btn btn-primary float-center" type="submit">
              send
            </AppButton>
          </div>
        </form>
      </div>
    </div>
    <div class="row justify-content-center" style="margin-bottom: 20px">
      <div class="col-8">
        <div class="d-flex justify-content-center">
          <p>or</p>
        </div>
        <div class="d-flex justify-content-center">
          <nuxt-link to="/signup">
            create new account
          </nuxt-link>
        </div>
      </div>
    </div>
    <br><br><br>
    <div class="row justify-content-center" style="margin-bottom: 20px">
      <div class="col-8">
        <div class="d-flex justify-content-center">
          <AppButton class="btn btn-primary float-center" type="button" @click="toLogin">
            back to login
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loaderMixin from '~/mixins/loader'

export default {
  auth: false,
  mixins: [
    loaderMixin
  ],
  data () {
    return {
      errors: [],
      email: '',
      message: '',
      link: ''
    }
  },
  methods: {
    onSubmit () {
      this.$axios
        .$post('/api/forgot-password', {
          email: this.email
        })
        .then((data) => {
          // eslint-disable-next-line no-console
          console.log(data)
          if (data.success === true) {
            this.message = 'Check your inbox!'
          } else {
            this.message = "Couldn't find your email!"
          }
        })
    },
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>
