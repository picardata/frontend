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
        const user = this.$auth.state.user
        if (user.onboardingStatus < 21) {
          this.updateOnboarding()
        }

        this.$router.push('/apps/integrated-apps')
        const test = JSON.parse(localStorage.getItem('vuex'))
        this.$store.commit('googleIntegration/changeState', !test.googleIntegration.isIntegrated)
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
  },
  methods: {
    async updateOnboarding () {
      const userMe = await this.$axios.get('/api/users/me')
      const user = userMe.data.user
      this.$auth.setUser(user)
    }
  }
}
</script>
