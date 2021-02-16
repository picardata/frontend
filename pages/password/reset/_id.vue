<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8 mt-5">
        <div class="card align-self-center">
          <h5 class="card-header">
            Make a new password
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
              <AppControlInput v-model="password" required type="password">
                New password
              </AppControlInput>
              <AppControlInput v-model="confirmPassword" required type="password">
                Confirm password
              </AppControlInput>
              <AppButton class="btn btn-primary" type="submit">
                Submit
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
  auth: false,
  data () {
    return {
      errors: [],
      password: '',
      confirmPassword: '',
      username: this.$route.query.username,
      id: this.$route.params.id
    }
  },
  methods: {
    onSubmit: async function() {
        if(this.password != this.confirmPassword) {
            this.errors = this.errors.concat("Confirm password doesn't match")
        } else {
            const result = await this.$axios
            .put('api/users/' + this.id, {
                username: this.username,
                password: this.password
            })
            .then(() => {
                console.log("redirect to login")
                this.$router.push('/login')
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
        }
    }
  }
}
</script>