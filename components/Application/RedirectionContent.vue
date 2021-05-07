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

    console.log('errornya = ')
    console.log(error)
    if (error) {
      this.message = 'Integration is cancelled. Please wait. You will be redirected soon.'
      const that = this
      setTimeout(function () {
        that.$router.push('/apps/integrated-apps')
      }, 3000)
    } else {
      this.message = 'We are processing your request. Please wait. You will be redirected soon.'
    }
  }
}
</script>

<style scoped>

</style>
