<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8 mt-5">
        <div class="card align-self-center">
          <h5 class="card-header">{{ isLogin ? 'Login' : 'Sign Up' }}</h5>
          <div class="card-body">
            <form @submit.prevent="onSubmit">
              <AppControlInput type="email" v-model="email">E-Mail Address</AppControlInput>
              <AppControlInput type="password" v-model="password">Password</AppControlInput>
              <AppButton class="btn btn-primary" type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</AppButton>
              <AppButton
                type="button"
                btn-style="inverted"
                @click="isLogin = !isLogin">Switch to {{ isLogin ? 'Signup' : 'Login' }}
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
      isLogin: true,
      email: 'test@mailinator.com',
      password: 'password'
    }
  },
  methods: {
    async onSubmit () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.email,
            password: this.password
          }
        })
        this.$router.push('/books')
      } catch (err) {
        console.log('here')
        console.log(err)
      }
      // this.$store.dispatch('authenticateUser', {
      //   isLogin: this.isLogin,
      //   email: this.email,
      //   password: this.password
      // }).then(() => {
      //   this.$router.push('/')
      // })
    }
  }
}
</script>
