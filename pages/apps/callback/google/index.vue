<template>
  <div>
    <RedirectionContent />
  </div>
</template>

<script>
import RedirectionContent from '@/components/Application/RedirectionContent'
export default {
  layout: 'argon',
  components: { RedirectionContent },
  mounted () {
    this.$axios.get('/api/integrations/google/oauth2/callback?code=' + this.$route.query.code)
      .then(() => {
        this.$router.push('/apps/integrated-apps')
        const test = JSON.parse(localStorage.getItem('vuex'))
        this.$store.commit('googleIntegration/changeState', !test.googleIntegration.isIntegrated)
      }).catch(
      // eslint-disable-next-line no-console
        (e) => { console.log(e) }
      )
  }
}
</script>
