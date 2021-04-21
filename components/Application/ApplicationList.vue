<template>
  <div>
    <div class="row">
      <div v-for="(application, index) in applications" :key="application.id" class="col-3">
        <div class="card shadow-sm mx-3">
          <img class="card-img-top" :src="application.logo" alt="Card image cap">
          <div class="card-body p-1 text-center">
            <h5 class="card-title">
              {{ application.name }}
            </h5>
            <p class="card-text">
              {{ application.detail | truncate(90, '...') }}
            </p>
            <base-button outline type="primary" @click.prevent="appClick(index)">
              Add to Picardata
            </base-button>
          </div>
        </div>
      </div>
    </div>
    <modal :show.sync="modals.modal0">
      <template slot="header">
        <h5 id="exampleModalLabel" class="modal-title" />
      </template>
      <div>
        <img
          slot="image"
          class="card-img-top card-img-logo"
          :src="selectedApp.logo"
          alt="Card image cap"
        >
        <p class="mt-3 notify-text font-weight-bolder">
          Picardata wants to access your <span class="text-primary">{{ selectedApp.name }}</span> account
        </p>
        <p class="content-text">
          This will allow Picardata to:
        </p>
        <ul class="content-text">
          <li>View and access your data</li>
        </ul>
      </div>
      <template slot="footer">
        <base-button tag="a" type="primary" target="_blank" :href="selectedApp.oauthUrl">
          Integrate now
        </base-button>
      </template>
    </modal>
  </div>
</template>
<script>

export default {
  name: 'ApplicationList',
  data () {
    return {
      modals: {
        modal0: false
      },
      selectedApp: {},
      applications: []
    }
  },
  mounted () {
    this.$axios.get('/api/applications/?order%5Bid%5D=desc&items_per_page=10&page_number=1')
      // eslint-disable-next-line no-return-assign
      .then((data) => {
        this.applications = data.data.filter(function (application) {
          return application.appCode === 'google.admin'
        })
      }).catch(
      // eslint-disable-next-line no-console
        (e) => {
          console.log(e)
        }
      )
  },
  methods: {
    appClick (index) {
      console.log(this.applications[index])
      this.selectedApp = this.applications[index]
      this.modals.modal0 = true
    },
    dismissModal () {
      this.modals.modal0 = false
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
