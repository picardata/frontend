<template>
  <div class="row most-access">
    <div v-for="(application, index) in applications" :key="application.id" class="card shadow-sm mx-3">
      <img class="card-img-top" :src="application.logo" alt="Card image cap">
      <div class="card-body p-1 text-center">
        <h5 class="card-title">
          {{ application.name }}
        </h5>
        <p class="card-text">
          {{ application.detail | truncate(90, '...') }}
        </p>
        <AppButton class="btn btn-primary" type="button" @click="appClick(index)">
          Add to Picardata
        </AppButton>
      </div>
    </div>
    <modal name="app-modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <h5>Integrate {{ selectedApp.name }}?</h5>
              <div class="cancel-integrate" @click="dismissModal">
                &times;
              </div>
            </div>
            <div class="modal-footer">
              <a target="_blank" :href="selectedApp.oauthUrl" class="btn btn-primary">Yes</a>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import AppButton from '~/components/Form/AppButton'
export default {
  name: 'ApplicationList',
  components: { AppButton },
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
      // eslint-disable-next-line no-console
        (e) => { console.log(e) }
      )
  },
  methods: {
    appClick (index) {
      this.selectedApp = this.applications[index]
      this.$modal.show('app-modal')
    },
    dismissModal () {
      this.$modal.hide('app-modal')
    }
  }
}
</script>
<style>
.modal-header {
  justify-content: space-between;
}

.cancel-integrate {
  cursor: pointer;
  font-size: 20px;
  color: black;
}
</style>
