<template>
  <div class="bg-outer">
    <div class="wrapper">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="icon-picardata text-center">
              <img class="mb-2" src="~/assets/logo.png" alt="">
              <h2>Login to Picardata</h2>
            </div>

            <div class="input-group mt-4">
              <input class="form-control login-credential-input py-2" placeholder="Email">
            </div>

            <div class="input-group mt-4">
              <input class="form-control login-credential-input py-2 border-right-0" placeholder="Password">
              <span class="input-group-append">
                <div class="input-group-text bg-transparent"><i class="fa fa-eye"></i></div>
              </span>
            </div>

            <div class="form-check  mt-4">
              <input id="checkbox-remember-me" type="checkbox" class="form-check-input">
              <label class="form-check-label ml-2" for="checkbox-remember-me">Remember me</label>
            </div>

            <button type="button" class="btn btn-primary btn-block mt-4 mb-4 rounded"> Login </button>

            <div class="col-md-12 text-center">
              <nuxt-link to="#">
                Forgot password
              </nuxt-link>
            </div>
          </div>
          <div class="col-md-6">
            Hello Planet
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AdminAuthPage',
  layout: 'empty',
  auth: false,
  data () {
    return {
      errors: [],
      isLogin: true,
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
            this.errors = []
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
        this.errors = []
        for (const field of ['username', 'password']) {
          const errors = err.response.data.errors[field]
          if (errors !== undefined) {
            this.errors = this.errors.concat(errors)
          }
        }
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bg-outer{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #181C3B;
  padding: 4em 16em;
}

.wrapper{
  background: #FFFFFF;
  width: 100%;
  height: auto;
  border-radius: 16px;
  padding: 3rem 4rem 0;
}

.mt-4{
  margin-top: 1.25rem;
}

.mb-4{
  margin-bottom: 1.25rem;
}

.form-check-input{
  transform: scale(1.5);
}

.btn-primary{
  background: #2534B6;
  &.rounded{
    border-radius: 40px !important;
  }
  &:hover{
    box-shadow: none;
    transform: translateY(0);
  }
}
</style>
