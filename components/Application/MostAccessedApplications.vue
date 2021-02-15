<template>
  <div class="row most-access">
    <div v-for="(integration, index) in integrations" :key="integration.id" class="card shadow-sm mx-3">
      <div class=" p-3">
        <img class="card-img-top" :src="integration.application.logo" alt="Card image cap" @click="appClick(index)">
      </div>
      <div class="card-body p-1 text-center">
        <p class="bold">
          {{ integration.application.name }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MostAccessedApplications',
  data () {
    return {
      integrations: []
    }
  },
  mounted () {
    this.$axios.get('/api/integrations/?order%5Bid%5D=desc&items_per_page=10&page_number=1')
      // eslint-disable-next-line no-return-assign
      .then((data) => {
        this.integrations = data.data
      }).catch(
        (e) => { console.log(e) }
      )
  },
  methods: {
    appClick (index) {
      const selectedIntegration = this.integrations[index]
      this.$router.push('/app/' + selectedIntegration.id)
    }
  }
}
</script>
