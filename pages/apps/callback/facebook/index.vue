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
