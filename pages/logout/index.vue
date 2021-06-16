<template>
  <div></div>
</template>

<script>
export default {
  name: 'LogoutPage',
  beforeMount () {
    this.$auth.logout()
  }
}
</script>
