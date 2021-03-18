<template>
  <div>
    <RedirectionContent />
  </div>
</template>

<script>
import RedirectionContent from '@/components/Application/RedirectionContent'
export default {
  components: { RedirectionContent },
  mounted () {
    this.$axios.get('/api/integrations/monday/oauth2/callback?code=' + this.$route.query.code)
      .then(() => {
        this.$router.push('/apps/integrated-apps')
      }).catch(
      // eslint-disable-next-line no-console
        (e) => { console.log(e) }
      )
  }
}
</script>
