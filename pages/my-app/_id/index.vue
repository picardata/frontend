<template>
  <div>
    <PrevPage />
    <ApplicationDetail :logo="data.application.logo" :name="data.application.name" :detail="data.application.detail"/>
  </div>
</template>

<script>
import ApplicationDetail from '~/components/Application/ApplicationDetail'
import PrevPage from '~/components/PrevPage'

export default {
  components: { ApplicationDetail, PrevPage },
  async asyncData (context) {
    return await context.app.$axios.get('/api/integrations/' + context.route.params.id)
      .then((data) => {
        return {
          data: data.data
        }
      })
  }
}
</script>

<style scoped>

</style>
