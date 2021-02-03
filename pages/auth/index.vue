<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8 mt-5">
        <div class="card align-self-center">
          <h5 class="card-header">
            {{ isLogin ? 'Login' : 'Sign Up' }}
          </h5>
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
              <AppButton class="btn btn-primary" type="submit">
                {{ isLogin ? 'Login' : 'Sign Up' }}
              </AppButton>
              <AppButton
                type="button"
                btn-style="inverted"
                @click="isLogin = !isLogin"
              >
                Switch to {{ isLogin ? 'Signup' : 'Login' }}
              </AppButton>
            </form>
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
      isLogin: true,
      email: 'test@mailinator.com',
      password: 'password'
    }
  },
  mounted() {
    console.log(this.$axios.defaults.baseURL);
    console.log(process.env.apiUrl);
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
            console.log(data)
          })
          .catch((e) => {
            for (const field of ['username', 'password']) {
              const errors = e.response.data.errors[field]
              if (errors !== undefined) {
                this.errors = this.errors.concat(errors)
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
        console.log('here')
        console.log(err)
      }
    }
  }
}
</script>
