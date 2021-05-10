<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col-6 center">
        <div class="card">
          <div class="card-body">
            <h4 class="text-center">
              {{ message }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RedirectionContent',
  data () {
    return {
      message: ''
    }
  },
  mounted () {
    const error = this.$route.query.error

    if (error) {
      this.message = 'Integration is cancelled. Please wait. You will be redirected soon.'
    } else {
      this.message = 'We are processing your request. Please wait. You will be redirected soon.'
    }

    setTimeout(() => {
      window.location = '/apps/integrated-apps'
    }, 3000)
  }
}
</script>

<style scoped>

</style>
