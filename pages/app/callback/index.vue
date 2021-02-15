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
    console.log(this.$route.query.code)
    this.$axios.get('/api/integrations/google/oauth2/callback?code=' + this.$route.query.code)
      .then(() => {
        this.$router.push('/')
      }).catch(
        (e) => { console.log(e) }
      )
  }
}
</script>
