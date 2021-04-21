<template>
  <div class="row">
    <div class="col-xl-3">
      <card>
        <div class="row">
          <form
            id="navbar-search-main"
            class="navbar-search form-inline light"
          >
            <div class="form-group mb-0">
              <div class="input-group input-group-alternative input-group-merge search-button">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-search" /></span>
                </div>
                <input
                  v-model="qSearch"
                  class="form-control app-search"
                  placeholder="Search app"
                  type="text"
                  @keyup="querySearch"
                >
              </div>
            </div>
            <button
              type="button"
              class="close"
              data-action="search-close"
              data-target="#navbar-search-main"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </form>
        </div>
        <div class="row pt-3">
          <div class="col-xl-12">
            <div id="list-tab" class="list-group" role="tablist">
              <a href="#" class="list-group-item  list-group-item-action" @click.prevent="filterCategory(0)">All
                applications</a>
              <a href="#" class="list-group-item  list-group-item-action" @click.prevent="filterCategory(1)">Essential
                app</a>
              <a href="#" class="list-group-item  list-group-item-action" @click.prevent="filterCategory(2)">Collaboration
                tools</a>
              <a href="#" class="list-group-item  list-group-item-action" @click.prevent="filterCategory(3)">Communication</a>
              <a href="#" class="list-group-item  list-group-item-action" @click.prevent="filterCategory(4)">CRM</a>
              <a href="#" class="list-group-item  list-group-item-action" @click.prevent="filterCategory(5)">Social
                Media</a>
              <a href="#" class="list-group-item  list-group-item-action" @click.prevent="filterCategory(6)">Design</a>
            </div>
          </div>
        </div>
      </card>
    </div>
    <div :class="'row p-0 ' + classAdded">
      <div v-for="(application, index) in filteredApplications" :key="application.id" :class="appClass">
        <card>
          <div class="text-center p-3">
            <img
              slot="image"
              class="card-img-top app-img"
              :src="application.logo"
              :alt="application.name"
              @click="$router.push('/apps/app-library/' + application.id)"
            >
          </div>
          <h5 class="card-title">
            <nuxt-link :to="'/apps/app-library/' + application.id">
              {{ application.name }}
            </nuxt-link>
          </h5>
          <p class="card-text" @click="$router.push('/apps/app-library/' + application.id)">
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
      default: 'col-4'
    }
  },
  data () {
    return {
      selectedApp: {},
      modals: {
        modal0: false
      },
      filteredApplications: [],
      applications: [],
      qSearch: '',
    }
  },
  mounted () {
    this.$axios.get('/api/applications/?order%5Bid%5D=desc')
      // eslint-disable-next-line no-return-assign
      .then((data) => {
        this.applications = data.data
        this.filteredApplications = this.applications
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
    },
    filterCategory (categoryId) {
      this.filteredApplications = this.applications
      if (categoryId > 0) {
        this.filteredApplications = this.applications.filter(function (application) {
          let hasCategory = false
          application.category.forEach(function (category) {
            console.log(category.id)
            console.log(category.id === categoryId)
            if (category.id === categoryId) {
              hasCategory = true
            }
          })
          return hasCategory
        })
      }
    },
    querySearch () {
      console.log(this.qSearch)
      const searchQuery = this.qSearch
      this.filteredApplications = this.applications.filter(function (application) {
        const re = new RegExp(searchQuery, 'i')
        console.log(application.name)
        console.log(application.name.match(re))
        console.log(application.name.match(re) !== null)
        return application.name.search(re) !== -1
      })
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

form, .input-group, .form-group {
  width: 100% !important;
}

a.list-group-item {
  padding: 1rem 0 1rem 0;
  border: none;
}

a.list-group-item a {
  color: black;
}

div.search-button {
  background-color: #EFF0F7;
}

.card-text, .card-img-top {
  cursor: pointer;
}
</style>
