<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="/"><img src="~/assets/nav_logo.png" alt="Logo">icardata</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div id="navbarSupportedContent" class="collapse navbar-collapse">
      <ul v-if="$auth.loggedIn && (onboardingStatus != 1)" class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">
            Dashboard
          </router-link>
        </li>
        <li class="nav-item active">
          <router-link to="/form" class="nav-link">
            Forms
          </router-link>
        </li>
        <li class="nav-item active">
          <router-link to="/apps/app-library" class="nav-link">
            App Library
          </router-link>
        </li>
      </ul>
      <ul v-if="$auth.loggedIn && (onboardingStatus != 1)" class="navbar-nav text-right ">
        <li class="nav-item dropdown" style="width: 100px;">
          <a
            class="nav-link dropdown-toggle active"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          ><img src="https://www.nicepng.com/png/detail/186-1866063_dicks-out-for-harambe-sample-avatar.png" class="rounded" style="width: 30px;" alt="Avatar"></a>
          <div class="dropdown-menu">
            <nuxt-link to="/profile/me" class="dropdown-item">
              Profile
            </nuxt-link>
            <div class="dropdown-divider" />
            <a class="dropdown-item" href="#" @click.prevent="onLogout">Logout</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      onboardingStatus: null
    }
  },
  watch: {
    $route () {
      if (this.$auth.loggedIn) {
        this.onboardingStatus = this.$auth.user.onboardingStatus
      }
    }
  },
  mounted () {
    if (this.$auth.loggedIn) {
      this.onboardingStatus = this.$auth.user.onboardingStatus
    }
  },
  methods: {
    onLogout () {
      this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
