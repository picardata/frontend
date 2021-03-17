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
    this.$axios.get('/api/integrations/hubspot/oauth2/callback?code=' + this.$route.query.code)
      .then(() => {
        this.$router.push('/apps/integrated-apps')
      }).catch(
      // eslint-disable-next-line no-console
        (e) => { console.log(e) }
      )
  }
}
</script>
