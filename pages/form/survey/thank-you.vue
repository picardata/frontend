<template>
  <div>
    <h2>Thank you! your response has been recorded</h2>
    <a :href="'/form/survey/' + form" class="btn btn-default">Submit another response</a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: this.$route.query.form
    }
  }
}
</script>