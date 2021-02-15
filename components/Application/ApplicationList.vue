<template>
  <div class="row most-access">
    <div v-for="(application, index) in applications" :key="application.id" class="card shadow-sm mx-3">
      <div class=" p-3">
        <img class="card-img-top" :src="application.logo" alt="Card image cap" @click="appClick(index)">
      </div>
      <div class="card-body p-1 text-center">
        <p class="bold">
          {{ application.name }}
        </p>
      </div>
    </div>
    <modal name="app-modal">
      <div>
        <div class="card shadow-sm mx-3 app-modal col-12">
          <div class="card-body p-1 text-center">
            <div>
              <img class="card-img-top" :src="selectedApp.logo" alt="Card image cap">
            </div>
            <div>
              <p class="bold">
                {{ selectedApp.name }}
              </p>
              <p>{{ selectedApp.detail }}</p>
              <a target="_blank" :href="selectedApp.oauthUrl" class="btn btn-primary">Integrate</a>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
export default {
  name: 'ApplicationList',
  data () {
    return {
      selectedApp: {},
      applications: []
    }
  },
  mounted () {
    this.$axios.get('/api/applications/?order%5Bid%5D=desc&items_per_page=10&page_number=1')
      // eslint-disable-next-line no-return-assign
      .then((data) => {
        this.applications = data.data
      }).catch(
        (e) => { console.log(e) }
      )
  },
  methods: {
    appClick (index) {
      this.selectedApp = this.applications[index]
      this.$modal.show('app-modal')
    }
  }
}
</script>
