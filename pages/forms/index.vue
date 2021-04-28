<template>
  <div class="row">
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
    <div class="col-xl-10">
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
        <div class="row mt-3">
          <div class="col-4">
            <h1>Forms</h1>
          </div>
          <div class="col-8">
            <span class="align-middle float-right">
              <nuxt-link to="/forms/new" class="btn btn-lg btn-primary btn-add">Add blank form</nuxt-link>
            </span>
          </div>
        </div>
        <div class="row mt-3">
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
            <h4>All forms</h4>
          </div>
          <div class="col-8">
            <div class="dropdown col-3 fa-pull-right">
              <button
                v-if="sort === 0"
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
          <div v-for="(form, index) in data" :key="form.id" class="p-4 col-md-4 col-sm-12">
            <div class="card pb-4" @dblclick="$router.push(openLink(form.id))">
              <div class="card-body">
                <h5 class="card-title">
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
                  <div class="col-md-4 col-sm-12">
                    <nuxt-link class="btn btn-gray-light" to="/forms/share">
                      <span class="text-primary">Share</span>
                    </nuxt-link>
                  </div>
                  <div class="col-md-4 col-sm-12">
                    <div class="divider d-inline" />
                    <nuxt-link class="btn btn-gray-light" :to="openLink(form.id)">
                      <span class="text-primary">Open</span>
                    </nuxt-link>
                  </div>
                  <div class="col-md-4 col-sm-12">
                    <div class="divider d-inline" />
                    <a class="btn btn-gray-light" href="#" @click.prevent="deletePop(index)">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  </div>
</template>

<script>
import Submenu from '~/components/layouts/argon/Submenu'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Mon', 'Tue', 'Thu', 'Fri', 'Sat', 'Sun']

export default {
  name: 'IndexVue',
  auth: true,
  layout: 'argon',
  components: { Submenu },
  async asyncData (context) {
    return await context.app.$axios.get('/api/forms/', { params: { 'order[updatedAt]': 'desc' } })
      .then((data) => {
        console.log(data)
        return { data: data.data }
      })
  },
  data () {
    return {
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
          link: '/manage-all-forms',
          name: 'Manage All Forms',
          type: 'item'
        }
      ]
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
    openLink (id) {
      return '/forms/' + id
    },
    formatDate (date) {
      const dateTime = new Date(date)
      return days[dateTime.getDay()] + ', ' + dateTime.getDate() + ' ' + months[dateTime.getMonth()] + ' ' + dateTime.getFullYear()
    },
    toggleSort () {
      if (this.sort === 0) {
        this.sort = 1
      } else {
        this.sort = 0
      }
      this.$axios.get('/api/forms/', {
        params: this.sortParams
      })
        .then((data) => {
          console.log(data)
          this.data = data.data
        })
    },
    search () {
      this.$axios.get('/api/forms/', {
        params: this.sortParams
      })
        .then((data) => {
          console.log(data)
          this.data = data.data
        })
    },
    querySearch () {
      if (this.qSearch.length > 2) {
        this.search()
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
      el.style.left = '-250px'
    },
    submenuAfterEnter (el) {
      el.style.display = 'block'
      el.style.left = '0px'
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
    from { left: 0px; }
    to { left: -250px; }
  }

  .list-item {
    margin-bottom: 8px;
  }

  .list-text {
    color: #2534B6;
    font-weight: bold;
    font-size: 16px;
  }

  .subtitle {
    color: #181C3B !important;
    font-size: 20px;
    font-weight: bold
  }

  .manual-crumb {
    color: #181C3B;
    font-size: 18px;
    font-weight: 600;
  }

  .list-item {
    margin-bottom: 8px;
  }

  i.pdicon-Collapse, i.pdicon-Expand {
    font-size: 30px;
    cursor: pointer;
    margin-right: -20px !important;
  }

  hr {
    width: 50px;
    color: white;
    background-color: white;
    border: 1.5px solid white;
    border-radius: 5px;
  }

  .list-text {
    color: #2534B6;
    font-weight: bold;
    font-size: 16px;
  }

  i.pdicon-Chevron-Right {
    color: #2534B6;
  }

</style>
