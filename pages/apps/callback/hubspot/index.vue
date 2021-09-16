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
    this.$axios.get('/api/integrations/hubspot/oauth2/callback?code=' + this.$route.query.code)
      .then(() => {
        this.$router.push('/apps/integrated-apps')
      }).catch(
        (e) => {
          let message = ''
          if (e.response.status === 500) {
            message = 'Error while integrating apps'
          } else {
            message = e.response.data.errors[0]
          }

          this.$notify({ type: 'danger', message })

          setTimeout(() => {
            window.location = '/apps/app-library'
          }, 1000)
        }
      )
  }
}
</script>
