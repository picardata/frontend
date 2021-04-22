<template>
  <div class="row justify-content-center">
    <div class="col-9">
      <div class="row text-center">
        <div class="mt-4 col-12">
          <div class="progress" style="height: 5px;">
            <div
              class="progress-bar bg-blue"
              role="progressbar"
              style="width: 100%"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-4 font-weight-bold">
          <span class="text-highlight">01.</span> Welcome on board
        </div>
        <div class="col-4 font-weight-bold">
          <span class="text-highlight">02.</span> Complete Profile
        </div>
        <div class="col-4 font-weight-bold">
          <span class="text-highlight">03.</span> Start Integrating
        </div>
      </div>
      <div class="row">
        <div class="p-4">
          <ApplicationList />
        </div>
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
