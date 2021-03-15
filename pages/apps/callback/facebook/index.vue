<template>
  <div>
    <p>
      Please wait to be redirected.
    </p>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log(this.$route.query.state)
    this.$axios.get('/api/integrations/facebook/oauth2/callback?code=' + this.$route.query.code + '&state=' + encodeURI(this.$route.query.state))
      .then(() => {
        this.$router.push('/apps/integrated-apps')
      }).catch(
      // eslint-disable-next-line no-console
        (e) => { console.log(e) }
      )
  }
}
</script>
