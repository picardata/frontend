<template>
  <div class="row picardata-form-index">
    <transition name="slide" @after-leave="submenuAfterLeave" @after-enter="submenuAfterEnter">
      <submenu v-show="submenu" class="col-xl-2" :submenu-data="formSubmenu">
        <template v-slot:breadcrumb>
          <div class="manual-crumb">
            Forms
          </div>
        </template>
        <template v-if="submenu" v-slot:collapse>
          <i :class="['pd-icon pdicon-Collapse']" @click="submenu = false" />
        </template>
        <template v-else v-slot:expand>
          <i :class="['pd-icon pdicon-Expand']" @click="submenu = true" />
        </template>
      </submenu>
    </transition>
    <transition name="slide" @after-leave="submenuAfterLeave" @after-enter="submenuAfterEnter">
      <div v-show="submenu" class="col-xl-10">
        <div>
          <base-header type="white" class="pb-6">
            <div class="row align-items-center py-4">
              <div class="col-lg-6 col-7">
                <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                  <route-breadcrumb :crumbs="crumbs" />
                </nav>
              </div>
            </div>
          </base-header>
          <div class="container-fluid mt--6">
            <div class="row">
              <a :id="elementId.back_button" class="col-sm-12 pd-icon pdicon-Back-Arrow picardata-arrow" href="/" />
            </div>
            <div class="row mt-3" style="margin-bottom: 4%">
              <div class="col-4">
                <span class="form-title">Forms</span>
              </div>
              <div class="col-8">
                <span class="align-middle float-right">
                  <nuxt-link :id="elementId.add_form" to="/forms/new" class="btn btn-lg btn-primary btn-add">Add blank form</nuxt-link>
                </span>
              </div>
            </div>
            <div class="row mt-3" style="margin-bottom: 4%">
              <div class="form-group col-12">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span id="inputGroupPrepend2" class="input-group-text border-0">
                      <font-awesome-icon
                        class="search-icon"
                        fixed-width
                        size="2x"
                        :icon="['fas', 'search']"
                      /></span>
                  </div>
                  <input
                    :id="elementId.search_input"
                    v-model="qSearch"
                    type="text"
                    class="form-control search-box border-0"
                    placeholder="Search created forms"
                    aria-describedby="inputGroupPrepend2"
                    @keyup="querySearch"
                  >
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-4">
                <span class="all-form-title">All forms</span>
              </div>
              <div class="col-8">
                <div class="dropdown col-3 fa-pull-right">
                  <button
                    v-if="sort === 0"
                    :id="elementId.last_updated"
                    class="btn dropdown-toggle text-primary"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    <font-awesome-icon
                      fixed-width
                      :icon="['fas', 'sort-amount-down-alt']"
                    />
                    Last updated
                  </button>
                  <button
                    v-if="sort === 1"
                    class="btn dropdown-toggle text-primary"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    <font-awesome-icon
                      fixed-width
                      :icon="['fas', 'sort-amount-down-alt']"
                    />
                    Title
                  </button>
                  <div class="dropdown-menu" aria-labelledby="sort-dropdown">
                    <button
                      v-if="sort === 1"
                      class="dropdown-item font-weight-bold fa-pull-left text-primary"
                      type="button"
                      @click.prevent="toggleSort"
                    >
                      <font-awesome-icon
                        fixed-width
                        :icon="['fas', 'sort-amount-down-alt']"
                      />
                      Last updated
                    </button>
                    <button
                      v-if="sort === 0"
                      class="dropdown-item font-weight-bold fa-pull-left text-primary"
                      type="button"
                      @click.prevent="toggleSort"
                    >
                      <font-awesome-icon
                        fixed-width
                        :icon="['fas', 'sort-amount-down-alt']"
                      />
                      Title
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div v-if="integrations.length === 0" class="col-sm-12">
                <span class="no-form-created-yet">No forms created yet</span>
              </div>
              <div v-for="(form) in integrations" :key="form.id" class="col-md-4 col-sm-12">
                <div class="card pb-4" @dblclick="$router.push(openLink(form.id))">
                  <div class="card-body" style="margin: auto">
                    <h5 :id="elementId.title_form + '-' + form.id" class="card-title">
                      {{ form.name }}
                    </h5>
                    <div class="row">
                      <div class="col-2 pt-3 pl-4">
                        <font-awesome-icon
                          fixed-width
                          size="lg"
                          class="sync-icon"
                          :icon="['fas', 'sync']"
                        />
                      </div>
                      <div class="col-10">
                        <p class="card-text last-updated">
                          Last updated:<br>
                          {{ formatDate(form.updatedAt) }}
                        </p>
                      </div>
                    </div>
                    <div class="row mt-2">
                      <div class="col-md-6 col-sm-12">
                        <button :id="elementId.share_form + '-' + form.id" class="btn btn-gray-light" @click="shareModal(form)">
                          <span class="share-open">Share</span>
                        </button>
                      </div>
                      <div class="col-md-6 col-sm-12">
                        <div class="divider d-inline" />
                        <nuxt-link :id="elementId.open_form + '-' + form.id" class="btn btn-gray-light" :to="openLink(form.id)">
                          <span class="share-open">Open</span>
                        </nuxt-link>
                      </div>
                      <!-- <div class="col-md-4 col-sm-12">
                    <div class="divider d-inline" />
                    <a class="btn btn-gray-light" href="#" @click.prevent="deletePop(index)">
                      Delete
                    </a>
                  </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Paging
              style="margin-top: 2%; margin-bottom: 4%;"
              :data="totalIntegrations"
              :get-total-page="getTotalPage"
              :get-current-page="getCurrentPage"
              :set-current-page="setCurrentPage"
            />
          </div>
          <modal name="delete-modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-container">
                  <div class="modal-header">
                    <h5>Move to Trash?</h5>
                    <div class="cancel-integrate" @click="dismissModal">
                      &times;
                    </div>
                  </div>
                  <div class="modal-body">
                    <p>"{{ selectedDeletion.name }}" will be deleted forever.</p>
                  </div>
                  <div class="modal-footer">
                    <a href="#" class="btn btn-default" @click.prevent="dismissModal">Cancel</a>
                    <a href="#" class="btn btn-primary" @click.prevent="deleteConfirm">Move to Trash</a>
                  </div>
                </div>
              </div>
            </div>
          </modal>

          <ModalShare :id="selectedShare.id" :share-form="modals.shareForm" :title="selectedShare.name" @closeShareForm="modals.shareForm = false" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// import PrevPage from '@/components/PrevPage'
import ModalShare from '@/components/pages/forms/ModalShareForm'
import Submenu from '~/components/layouts/argon/Submenu'
import Paging from '~/components/Custom/Paging'
import loaderMixin from '~/mixins/loader'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Mon', 'Tue', 'Thu', 'Fri', 'Sat', 'Sun']

export default {
  name: 'IndexVue',
  layout: 'argon',
  auth: true,
  components: { ModalShare, Submenu, Paging },
  mixins: [
    loaderMixin
  ],
  async fetch () {
    await this.loadDefaultData()
  },
  data () {
    return {
      elementId: {
        add_form: 'addNewForm',
        open_form: 'openForm',
        share_form: 'shareForm',
        title_form: 'titleForm',
        back_button: 'backButton',
        last_updated: 'lastUpdated',
        search_input: 'searchInput'
      },
      crumbs: [
        {
          name: 'Forms',
          path: '/forms'
        }
      ],
      sort: 0,
      qSearch: '',
      selectedDeletion: {
        id: 0,
        name: 'Untitled Form'
      },
      selectedShare: {},
      modals: {
        shareForm: false
      },
      submenu: true,
      formSubmenu: [
        {
          name: 'Create Form',
          type: 'subtitle'
        },
        {
          link: '/forms/new',
          name: 'Create a Blank Form',
          type: 'item'
        },
        {
          name: 'Your Forms',
          type: 'subtitle'
        },
        {
          link: '/forms',
          name: 'All Forms',
          type: 'item'
        },
        {
          link: '/forms/manage-all-forms',
          name: 'Manage All Forms',
          type: 'item'
        }
      ],
      totalIntegrations: [],
      integrations: [],
      totalPage: 1,
      size: 9,
      currentPage: 1,
      data: []
    }
  },
  computed: {
    sortParams () {
      const params = {}
      if (this.sort === 1) {
        params['order[name]'] = 'asc'
      } else {
        params['order[updatedAt]'] = 'desc'
      }
      params.q = this.qSearch
      return params
    }
  },
  methods: {
    async loadDefaultData () {
      const data = await this.$axios.$get('/api/forms/', { params: { 'order[updatedAt]': 'desc', page_number: 1, items_per_page: '999' } })

      const dataResult = data
      this.totalIntegrations = dataResult || []
      this.integrations = dataResult
      this.totalPage = Math.ceil(this.totalIntegrations.length / this.size)
      this.setCurrentPage(1)
    },
    shareModal (form) {
      this.selectedShare = form
      this.modals.shareForm = true
    },
    openLink (id) {
      return '/forms/' + id
    },
    formatDate (date) {
      const dateTime = new Date(date)
      return days[dateTime.getDay()] + ', ' + dateTime.getDate() + ' ' + months[dateTime.getMonth()] + ' ' + dateTime.getFullYear()
    },
    async toggleSort () {
      if (this.sort === 0) {
        this.sort = 1
      } else {
        this.sort = 0
      }
      const data = await this.$axios.get('/api/forms/', {
        params: this.sortParams
      })

      console.log('data = ')
      console.log(data)
      // .then((data) => {
      console.log(data)
      this.data = data.data
      this.loadData(data.data)
      // })
    },
    async search () {
      const data = await this.$axios.get('/api/forms/', {
        params: this.sortParams
      })

      this.loadData(data.data)
      // .then((data) => {
      // console.log(data)
      // this.data = data.data
      // })
    },
    async querySearch () {
      if (this.qSearch.length > 0) {
        this.search()
      } else {
        await this.loadDefaultData()
      }
    },
    deletePop (index) {
      this.selectedDeletion = this.data[index]
      this.$modal.show('delete-modal')
    },
    dismissModal () {
      this.$modal.hide('delete-modal')
    },
    deleteConfirm () {
      this.$axios
        .$delete('/api/forms/' + this.selectedDeletion.id)
        .then((data) => {
          // eslint-disable-next-line no-console
          console.log(data)
          this.search()
          this.$modal.hide('delete-modal')
        })
    },
    submenuAfterLeave (el) {
      el.style.display = 'block'
      el.style.left = '-14.6em'
    },
    submenuAfterEnter (el) {
      el.style.display = 'block'
      el.style.left = '0em'
    },
    setCurrentPage (currentPage) {
      if (currentPage > 0 && currentPage <= this.totalPage) {
        console.log('current page = ')
        console.log(currentPage)
        this.currentPage = currentPage

        const startIndex = ((this.currentPage * this.size) - this.size)
        const finishIndex = this.currentPage * this.size

        const newIntegrations = []
        for (let i = startIndex; i < finishIndex; i++) {
          if (typeof this.totalIntegrations[i] !== 'undefined') {
            newIntegrations.push(this.totalIntegrations[i])
          }
        }

        this.integrations = newIntegrations
      }
    },

    getTotalPage () {
      return this.totalPage
    },

    getCurrentPage () {
      return this.currentPage
    },

    loadData (data) {
      const dataResult = data
      this.totalIntegrations = dataResult || []
      this.integrations = dataResult
      this.totalPage = Math.ceil(this.totalIntegrations.length / this.size)
      this.setCurrentPage(1)
    }

  }
}
</script>

<style scoped>
h1 {
  font-size: 36px;
  font-weight: bolder;
}

.btn-add {
  height: 56px;
  border-radius: 40px;
  font-weight: normal;
  font-size: 16px;
  padding: 15px 30px;
}

.search-box {
  height: 62px;
  border-radius: 16px;
  background-color: #EFF0F6;
  padding-left: 0px;
}

span.input-group-text {
  background-color: #EFF0F6;
  border-radius: 16px;
}

.search-icon, .sync-icon {
  color: #A0A3BD;
}

div.dropdown button {
  background-color: white;
  border: 0;
}

div.dropdown button.dropdown-toggle:focus, div.dropdown button.dropdown-toggle:active {
  background-color: white;
  border-color: white;
  box-shadow: none;
}

.last-updated {
  color: #313131;
  font-size: 14px;
  opacity: 0.6;
}

div.dropdown button.dropdown-item {
  padding-left: 10px;
}

.dropdown-toggle:after {
  content: none
}

div.vl {
  border-left: 2px solid #C4C4C4;
  margin-top: 10px;
  padding-top: 0;
  height: 16px;
}

.slide-enter-active {
  animation: slide .2s reverse;
}

.slide-leave-active {
  animation: slide .2s;
}

@keyframes slide {
  from { left: 0em; }
  to { left: -14.6em; }
}

.manual-crumb {
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  letter-spacing: 1px;
  color: #14142B;
}

.picardata-arrow {
  color: #14142B;
  font-size: 200%;
}

.share-open {
  font-family: 'Roboto Condensed';
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 28px;
/* or 175% */

display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.75px;

/* Main Button */

color: #2534B6;
}

.card-title {
  font-family: 'Roboto Condensed';
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 24px;
letter-spacing: 0.75px;

/* Body Text */

color: #313131;
}

.form-title {
  font-family: 'Roboto Condensed';
font-style: normal;
font-weight: bold;
font-size: 36px;
line-height: 54px;
/* identical to box height */

letter-spacing: 0.75px;

/* Body Text */

color: #313131;
}

.all-form-title {
  font-family: 'Roboto Condensed';
font-style: normal;
font-weight: 600;
font-size: 20px;
line-height: 30px;
/* identical to box height */

letter-spacing: 0.75px;

/* Body Text */

color: #313131;
}
</style>

<style lang="scss">
.picardata-form-index {
  .slide-element {
    min-height: 100vh;
  }

  .no-form-created-yet {
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 50px;

    text-align: center;
    letter-spacing: 1px;

    color: #14142B;
    margin: auto;
  }
}
</style>
