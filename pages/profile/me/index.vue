<template>
  <div class="row p-4">
    <div class="col-4">
      <div class="row">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="https://www.nicepng.com/png/detail/186-1866063_dicks-out-for-harambe-sample-avatar.png" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{ profile.firstname }} {{ profile.lastname }}</h5>
            <p class="card-text"><b>Location:</b> {{ profile.location }}</p>
            <p class="card-text"><b>Email:</b> {{ profile.email }}</p>
            <p class="card-text"><b>Phone:</b> {{ profile.phone }}</p>
            <nuxt-link to="/profile/me" class="nav-link active">Edit General Information</nuxt-link>
            <nuxt-link to="/profile/me/work" class="nav-link">Edit Work Information</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="col-8">
      <div class="row">
        <div class="col-6">
          <div class="font-weight-bold mb-4">
            <h3>General Information</h3>
          </div>
          <AppControlInput v-model="profile.firstname" placeholder="Your Firstname" type="text">Firstname</AppControlInput>
          <AppControlInput v-model="profile.lastname" placeholder="Your Lastname" type="text">Lastname</AppControlInput>
          <AppControlInput v-model="profile.email" placeholder="Email" type="text">Email</AppControlInput>
          <AppControlInput v-model="profile.phone" placeholder="Phone Number" type="text">Phone</AppControlInput>
          <AppControlInput v-model="profile.location" placeholder="Location" type="text">Location</AppControlInput>
        </div>
      </div>
      <div class="row mt-5 justify-content-center">
        <button type="button" class="btn btn-primary btn-lg" @click.prevent="submitGeneral">
          Save Profile Information
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData (context) {
    return await context.app.$axios.get('/api/users/me')
      .then((data) => {
        console.log(data)
        return {
          profile: {
            id: data.data.user.userProfile.id,
            firstname: data.data.user.userProfile.firstname,
            lastname: data.data.user.userProfile.lastname,
            email: data.data.user.userProfile.email,
            phone: data.data.user.userProfile.phone,
            location: data.data.user.userProfile.address
          }
        }
      })
  },
  methods: {
    submitGeneral() {
      this.$axios.$patch('/api/user-profiles/' + this.profile.id, {
            firstname: this.profile.firstname,
            lastname: this.profile.lastname,
            address: this.profile.location,
            phone: this.profile.phone,
            email: this.profile.email
        }).then(() => {
          this.$router.push('/profile/me')
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
</script>
