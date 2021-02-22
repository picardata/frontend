<template>
  <div class="container">
    <div class="row">
      <div class="p-4 col-12">
        <h3>Applications</h3>
        <ApplicationList />
      </div>
    </div>
  </div>
</template>
<script>
import ApplicationList from '~/components/Application/ApplicationList'

export default {
  components: { ApplicationList },
  auth: true,
  data () {
    return {
      user: undefined
    }
  },
  mounted () {
    this.$axios.$get('/api/users/me')
      .then((user) => {
        if (user.user.onboardingStatus === 21) {
          this.$router.push('/')
        }
      })
      .catch(e => console.log(e))
  }
}
</script>
<style>
  .most-access div.card {
    width: 170px;
    font-size: 14px;
  }
</style>
