<template>
  <div :class="'row p-0 ' + classAdded">
    <div v-for="(application, index) in applications" :key="application.id" :class="appClass">
      <card>
        <div class="text-center p-3">
          <img
            slot="image"
            class="card-img-top app-img"
            :src="application.logo"
            :alt="application.name"
          >
        </div>
        <h5 class="card-title">
          {{ application.name }}
        </h5>
        <p class="card-text">
          {{ application.detail | truncate(90, '...') }}
        </p>
        <div class="card-body p-0">
          <div class="row">
            <div class="col p-0">
              <div class="card-profile-stats d-flex justify-content-center">
                <div class="p-0">
                  <span class="heading"><i class="fa fa-download" /> 22</span>
                </div>
                <div class="divider" />
                <div class="p-0">
                  <span class="heading"><i class="fa fa-heart" /> 10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div :class="{'text-center': true, 'pt-3 pb-2': application.integrations.length !== 0}">
          <base-button v-if="application.integrations.length === 0" outline type="primary" @click="appClick(index)">
            Add to Picardata
          </base-button>
          <span v-else class="text-primary"><i class="fa fa-check " /> Added</span>
        </div>
      </card>
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
  name: 'AppLibraryList',
  props: {
    classAdded: {
      type: String,
      default: 'col-xl-9'
    },
    appClass: {
      type: String,
      default: 'col-3'
    }
  },
  data () {
    return {
      selectedApp: {},
      modals: {
        modal0: false
      },
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
        (e) => {
          console.log(e)
        }
      )
  },
  methods: {
    appClick (index) {
      this.selectedApp = this.applications[index]
      this.modals.modal0 = true
    },
    dismissModal () {
      this.modals.modal0 = false
    }
  }
}
</script>

<style scoped>
  p.notify-text {
    font-size: 24px;
  }

  ul li::marker {
    color: #2534B6; /* Change the color */
  }

  .content-text {
    font-size: 18px;
  }

  .card-title {
    font-size: 16px;
    font-weight: 600;
  }

  .heading {
    font-weight: 500;
  }

  .app-img {
    width: 80px;
  }
</style>
