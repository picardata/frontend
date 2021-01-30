<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="#">Picardata</a>
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
      <ul v-if="$auth.loggedIn" class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">
            Dashboard
          </router-link>
        </li>
        <!-- <li class="nav-item active">
          <router-link to="/books" class="nav-link">Books</router-link>
        </li> -->
      </ul>
      <ul v-if="$auth.loggedIn" class="navbar-nav text-right ">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle active"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >Dropdown</a>
          <div class="dropdown-menu">
            <nuxt-link to="/profile/me" class="dropdown-item">
              Profile
            </nuxt-link>
            <!-- <a class="dropdown-item" href="#">Settings</a> -->
            <div class="dropdown-divider" />
            <a class="dropdown-item" href="#" @click.prevent="onLogout">Logout</a>
          </div>
        </li>
      </ul>
      <ul v-if="!$auth.loggedIn" class="navbar-nav text-right pull-right">
        <li class="nav-item active">
          <AppButton style="margin-left: 10px" class="nav-link" @click="this.$router.push('/auth')">
            Login
          </AppButton>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  methods: {
    onLogout () {
      this.$auth.logout()
      this.$router.push('/auth')
    }
  }
}
</script>

<style scoped>

</style>
