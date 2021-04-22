<template>
  <div class="picardata-page-app-library">
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
        <div class="col-sm-6 float-right picardata-title">
          <div class="row ">
            <!-- <div class="col-sm-1"></div> -->
            <a class="pd-icon pdicon-Back-Arrow picardata-arrow" href="/apps" style="color: #313131" />
            <!-- <div class="col-sm-1" style="color: #313131">
            </div> -->
            <div class="col-sm-11">
              App Library
            </div>
            <!-- <div class="col-sm-4"></div> -->
          </div>
        </div>
        <div class="col-sm-1" />
        <div class="col-sm-5 float-left" />
      </div>
      <div class="row">
        <div class="col-xl-3">
          <card>
            <div class="row">
              <form
                id="navbar-search-main"
                class="navbar-search form-inline light"
              >
                <div class="form-group mb-0">
                  <div
                    class="input-group input-group-alternative input-group-merge search-button"
                    style="flex-wrap: initial;border-radius: 16px;"
                  >
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-search" /></span>
                    </div>
                    <input
                      v-model="S"
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
            <div class="row pt-3 app-menu">
              <div class="col-xl-12">
                <div id="list-tab" class="list-group " role="tablist">
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
          <div class="col-md-12" style="margin-bottom: 4%;margin-left: 4%;width: 100%">
            <div class="col-md-8 float-left see-marketing">
              See what usually Sales & Marketing use..
            </div>

            <div class="col-md-4 see-app-list float-right" style="display: block;">
              <div class="row">
                <!-- <div class="col-md-1"></div> -->
                <div class="col-md-10" style="margin: auto;">
                  Or see all app list
                </div>
                <span class="col-md-2 pd-icon pdicon-Back-Arrow" style="-webkit-transform: scaleX(-1);transform: scaleX(-1);margin: auto;" />
                <!-- </div> -->
              </div>
            </div>
          </div>
          <div class="row" style="margin-left: 4%;width: 100%">
            <div v-for="(application, index) in integrations" :key="application.id" :class="appClass">
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
        <div v-if="isQSearchNotExist()" class="col-md-12" style="margin-bottom: 2%">
          <div class="picardata-paging float-right">
            <div class="col-sm" @click="setPrevious()">
              <span
                v-if="isLastForPrev()"
                class="pd-icon pdicon-Chevron-Left nav-last picardata-nav picardata-nav-inactive"
              />
              <span
                v-else
                class="pd-icon pdicon-Chevron-Left picardata-nav"
              />
            </div>
            <span
              v-for="n in this.totalPage"
              :key="n"
              class="col-sm picardata-paging-text"
              @click="setCurrentPage(n)"
            >
              <span
                v-if="isCurrentPage(n)"
                class="picardata-paging-active"
              >
                {{ n }}
              </span>
              <span v-else>{{ n }}</span>
            </span>
            <div class="col-sm" @click="setNext()">
              <span v-if="isLastForNext()" class="pd-icon pdicon-Chevron-Right nav-last picardata-nav picardata-nav-inactive" />
              <span v-else class="pd-icon pdicon-Chevron-Right picardata-nav" />
            </div>
          </div>
        </div>
        <!-- <div v-if="isQSearchNotExist()" class="row" style="margin-bottom: 2%;"> -->

        <!-- <div class="col-md-12 ">   -->

        <!-- </div> -->
      </div>
    </div>
    <!-- <AppLibraryList /> -->
  </div>
  <!-- </div> -->
</template>

<script>

// import AppLibraryList from '@/components/Application/AppLibraryList'

export default {
  name: 'Index',
  layout: 'argon',
  // components: { AppLibraryList },
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
      crumbs: [
        {
          name: 'Apps',
          path: '/apps'
        },
        {
          name: 'App Library',
          path: '/apps/app-library'
        }
      ],
      selectedApp: {},
      // modals: {
      //   modal0: false
      // },
      filteredApplications: [],
      applications: [],
      S: '',
      totalPage: 1,
      currentPage: 1,
      size: 5,
      modals: {
        modal0: false
      },
      totalIntegrations: [],
      integrations: []
    }
  },
  mounted () {
    this.$axios.get('/api/applications/?order%5Bid%5D=desc')
      // eslint-disable-next-line no-return-assign
      .then((data) => {
        this.applications = data.data
        this.filteredApplications = this.applications

        this.totalIntegrations = data.data.filter(x => x.status === 1)
        console.log('total integration = ')

        this.integrations = [...this.totalIntegrations]
        // this.totalPage = 5;
        this.totalPage = Math.ceil(this.filteredApplications.length / 5)
        this.setCurrentPage(1)
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
      console.log(this.S)
      if (this.S) {
        const searchQuery = this.S
        this.integrations = this.totalIntegrations.filter(function (application) {
          const re = new RegExp(searchQuery, 'i')
          console.log(application.name)
          console.log(application.name.match(re))
          console.log(application.name.match(re) !== null)
          return application.name.search(re) !== -1
        })
      } else {
        this.setCurrentPage(this.currentPage)
      }
    },
    isQSearchNotExist () {
      return !this.S
    },
    isCurrentPage (n) {
      return this.currentPage === n
    },

    setCurrentPage (currentPage) {
      if (currentPage > 0 && currentPage <= this.totalPage) {
        console.log('current page = ')
        console.log(currentPage)
        this.currentPage = currentPage

        // const newIntegrations = this.integrations;
        const startIndex = ((this.currentPage * this.size) - this.size)
        const finishIndex = this.currentPage * this.size

        console.log('start index = ')
        console.log(startIndex)

        console.log('finish index = ')
        console.log(finishIndex)

        // console.log('start form = ');
        // console.log(startForm);

        // console.log('size = ');
        // console.log(size);

        const newIntegrations = []
        for (let i = startIndex; i < finishIndex; i++) {
          if (typeof this.totalIntegrations[i] !== 'undefined') {
            newIntegrations.push(this.totalIntegrations[i])
          }
        }

        console.log('new integrations = ')
        console.log(newIntegrations)

        this.integrations = newIntegrations
        // this.setIntegration(newIntegrations);
      }
    },

    setNext () {
      this.setCurrentPage(this.currentPage + 1)
    },

    isLastForPrev () {
      // console.log('current page = ');
      // console.log(n);
      return this.currentPage === 1
    },

    isLastForNext () {
      return this.currentPage === this.totalPage
    },

    setPrevious () {
      this.setCurrentPage(this.currentPage - 1)
    }
  }
}
</script>

<style>
.picardata-page-app-library .breadcrumb-item a[href="/apps"] {
  color: #313131;
  font-weight: 600;
  pointer-events: none;
}
</style>
<style scoped>

.picardata-page-app-library {
  font-family: 'Poppins'
}

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

.picardata-paging-active {
  color: #3E4EDD;
}

.picardata-nav {
  /* position: absolute; */
  /* left: 25%;
  right: 25%;
  top: 8.33%;
  bottom: 8.33%; */
  /* font-family: Poppins !important; */
  margin: auto;
  /* Neutral / N-800 Tundora */
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0.75px;
  text-align: center;

  /* background: #404040; */
}

.picardata-nav-inactive {
  /* position: absolute; */
  /* left: 25%;
  right: 25%;
  top: 8.33%;
  bottom: 8.33%; */
  font-weight: 400;

  /* background: #404040; */
}

.picardata-paging-text {
  position: static;
  width: 13px;
  /* height: 28px; */
  left: 143px;
  top: 0px;

  /* font-family: Poppins; */
  font-style: normal;
  font-weight: normal;
  font-weight: bold;
  margin: auto;
  /* font-size: 20px; */
  /* line-height: 28px; */
  /* identical to box height, or 140% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.75px;

  /* Body Text */

  color: #313131;
}
.picardata-paging {
  /* Frame 266 */

  /* Auto Layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  cursor: pointer;
  position: static;
  width: atuo;
  /*height: 60px;
  left: 689px;
  top: 2066px; */

  background: #FAFAFA;
  border-radius: 8px;
  color: #313131;
  /* Inside Auto Layout */

  flex: none;
  order: 6;
  align-self: flex-end;
  flex-grow: 0;
  /* margin: 56px 0px; */
  /* font-family: picardata; */
}

 .picardata-title {
  /* position: absolute; */
/* width: 278px; */
/* height: 48px; */
/* left: 0px; */
/* top: calc(50% - 48px/2 - 3px); */
margin: auto;
/* font-family: Poppins; */
font-style: normal;
font-weight: bold;
font-size: 32px;
color: #313131;
/* line-height: 48px; */
/* identical to box height */

/* letter-spacing: 0.75px; */
}

.picardata-title-manage-app {
  /* position: absolute;
left: 6.28%;
right: 4.83%;
top: 27.81%;
bottom: 28.44%; */

/* Desktop / Link Small */

/* font-family: Poppins; */
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 28px;
/* identical to box height, or 175% */

/* display: flex;
align-items: center;
text-align: right;
letter-spacing: 0.75px; */

/* Main Button */

color: #2534B6;
}

.nav-last {
  opacity: 0.3;
}

.sales-marketing {
  /* H1 Heading */

position: absolute;
width: 400px;
height: 27px;
left: 0px;
top: calc(50% - 27px/2 + 0.5px);

/* font-family: Poppins; */
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 27px;
/* identical to box height */

letter-spacing: 0.75px;

/* Body Text */

color: #313131;

}

.see-marketing {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */

  letter-spacing: 0.75px;

  /* Body Text */

  color: #313131;
}

.see-app-list {
  /* font-family: Poppins; */
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

.picardata-arrow {
  color: #14142B;
  margin: auto
}

.app-menu .list-group-item {
  /* font-family: "Poppins"; */
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 24px;
/* identical to box height */

letter-spacing: 0.75px;

color: #000000;
}
</style>
