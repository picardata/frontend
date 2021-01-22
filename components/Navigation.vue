<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="#">Picardata</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">Dashboard</router-link>
        </li>
        <li class="nav-item active">
          <router-link to="/books" class="nav-link">Books</router-link>
        </li>
      </ul>
      <ul class="navbar-nav text-right ">
        <li class="nav-item active">
          <AppButton style="margin-left: 10px" class="nav-link" @click="onLogout">Logout</AppButton>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navigation',
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
