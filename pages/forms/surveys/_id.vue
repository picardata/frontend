<template>
  <div />
</template>

<script>
export default {
  name: 'PublicForm',
  auth: false,
  layout: 'empty',
  async asyncData (context) {
    return await context.app.$axios.$get('/api/forms/generate-link/' + context.route.params.id)
      .then((data) => {
        return {
          form: data
        }
      })
      .catch(e => console.log(e))
  },
  created () {
    this.$router.push('/forms/survey/' + this.form.id + '?account=public')
  }
}
</script>
