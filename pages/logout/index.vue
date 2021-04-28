<script>
export default {
  name: 'LogoutPage',
  beforeMount () {
    this.$auth.logout()
  }
}
</script>
