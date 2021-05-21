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
    console.log('Masuk sini bro !')
    // this.$axios.get('/api/integrations/slack/oauth2/callback?code=' + this.$route.query.code)
    //   .then(() => {
    //     this.$router.push('/apps/integrated-apps')
    //   }).catch(
    //   // eslint-disable-next-line no-console
    //     (e) => { console.log(e) }
    //   )
  }
}
</script>
