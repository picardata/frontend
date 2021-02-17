<template>
  <div v-if="$auth.loggedIn">
    <b-nav vertical class="w-25">
      <router-link to="/" class="nav-link">
        Dashboard
      </router-link>
      <router-link to="/books" class="nav-link">
        Books
      </router-link>
      <b-nav-item active @click.prevent="onLogout">
        Logout
      </b-nav-item>
    </b-nav>
  </div>
</template>
<script>

export default {
  name: 'Sidebar',
  methods: {
    onLogout () {
      this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>
