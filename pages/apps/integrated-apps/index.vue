<template>
  <div class="row integrated-app-container">
    <transition name="slide" @after-leave="submenuAfterLeave" @after-enter="submenuAfterEnter">
      <submenu v-show="submenu" class="col-md-2" :submenu-data="yourApp">
        <template v-slot:breadcrumb>
          <div class="manual-crumb">
            Apps
          </div>
        </template>
        <template v-if="submenu" v-slot:collapse>
          <i :class="['pd-icon pdicon-Collapse']" @click="submenu = false" />
        </template>
        <template v-else v-slot:expand>
          <i :class="['pd-icon pdicon-Expand']" @click="submenu = true" />
        </template>
        <template v-slot:content>
          <div class="row">
            <div class="col-lg-4" style="padding-top: 2.5em; padding-left: 2.5em">
              <div class="box row">
                <div class="col-lg-3" style="margin-top:2.5em; margin-bottom:-1.5em">
                  <h3 class="box-text">
                    Your Integrated Apps
                  </h3>
                </div>
                <div class="col-lg-12" style="margin-bottom:-5.625em">
                  <p class="box-text box-number">
                    {{ countTotalIntegrations }}
                  </p>
                </div>
                <div class="col-lg-12">
                  <hr class="text-left pull-left float-left">
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <img
                slot="image"
                class="card-img-top"
                src="/img/integrated-apps.png"
              >
            </div>
          </div>
          <div class="row" style="margin">
            <div class="col-lg-12" style="margin-top: -3.42em; margin-left: 3.5em">
              <nuxt-link to="/apps/app-library">
                <h5 class="box-text">
                  + Add Application
                </h5>
              </nuxt-link>
            </div>
          </div>
        </template>
      </submenu>
    </transition>
    <transition name="slide" @after-leave="submenuAfterLeave" @after-enter="submenuAfterEnter">
      <div v-show="submenu" class="col-md-1" />
    </transition>
    <transition name="slide" @after-leave="submenuAfterLeave" @after-enter="submenuAfterEnter">
      <div v-show="submenu" class="col-md-9" style="margin-left: -3%">
        <div class="integrated-app">
          <base-header type="white" class="">
            <div class="row align-items-center py-4">
              <div class="col-lg-6 col-7">
                <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                  <route-breadcrumb :crumbs="crumbs" />
                </nav>
              </div>
            </div>
          </base-header>
          <div class="">
            <!-- <div class=""> -->
            <div class="row">
              <div class="col-sm-6 float-right picardata-title">
                <div class="row ">
                  <a id="app" class="col-sm-1 pd-icon pdicon-Back-Arrow picardata-arrow" href="/" />
                  <!-- <div class="col-sm-1"></div> -->
                  <!-- <div class="col-sm-1" style="color: #14142B;"> -->
                  <!-- </div> -->
                  <div class="col-sm-11">
                    Integrated Apps
                  </div>
                  <!-- <div class="col-sm-4"></div> -->
                </div>
              </div>
              <div class="col-sm-1" />
              <div class="col-sm-5 float-left picardata-title-manage-app">
                <a class="row" href="/apps/integrated-apps">
                  <div class="col-sm-6" />
                  <div class="col-sm-1">
                    <span class="pd-icon pdicon-Configure" />
                  </div>
                  <div class="col-sm-5">
                    Manage apps
                  </div>
                </a>
              </div>
            </div>
            <!-- </div> -->
            <div>
              <!-- <div class=""> -->
              <form
                id="navbar-search-main"
                class="navbar-search form-inline"
                :class="{'navbar-search-light': type === 'default', 'navbar-search-dark': type === 'light'}"
              >
                <div class="form-group" style="margin-top: 4%; margin-bottom: 4%">
                  <div
                    class="input-group input-group-alternative input-group-merge search-button"
                    style="background: #EFF0F7;border-radius: 12px;border: none; width: 100%"
                  >
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-search" /></span>
                    </div>
                    <input
                      class="form-control app-search"
                      placeholder="Search your integrated app"
                      type="text"
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
              <div v-if="false" class="row pt-3">
                <div class="col-xl-12">
                  <ul class="list-group">
                    <li class="list-group-item">
                      <a href="#" data-filter="all">All applications</a>
                    </li>
                    <li class="list-group-item">
                      <a href="#" data-filter="">Collaboration Tools</a>
                    </li>
                    <li class="list-group-item">
                      <a href="#" data-filter="">Customer Support</a>
                    </li>
                    <li class="list-group-item">
                      <a href="#" data-filter="">Design</a>
                    </li>
                    <li class="list-group-item">
                      <a href="#" data-filter="">Finance</a>
                    </li>
                    <li class="list-group-item">
                      <a href="#" data-filter="">Human Resource</a>
                    </li>
                    <li class="list-group-item">
                      <a href="#" data-filter="">Sales & Marketing</a>
                    </li>
                    <li class="list-group-item">
                      <a href="#" data-filter="">Social Media</a>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- </div> -->
            </div>
            <div class="row" style="margin-top: 1%">
              <div class="col">
                <base-button type="primary">
                  All
                </base-button>
                <base-button outline type="primary">
                  Collaboration
                </base-button>
                <base-button outline type="primary">
                  Design
                </base-button>
                <base-button outline type="primary">
                  Financial
                </base-button>
                <base-button outline type="primary">
                  Human Resource
                </base-button>
              </div>
            </div>
            <div v-if="integrations.length === 0" class="img-banner" style="margin-top: 4%;margin-bottom: 2%">
              <div class="d-flex justify-content-center">
                <nuxt-link to="/apps/app-library" class="btn btn-outline-primary btn-block already-had-account">
                  <span class="already-had-account-text">No integrated apps  yet. Start integrating now!</span>
                </nuxt-link>
              </div>
            </div>
            <div :class="'row p-0 ' + classAdded">
              <div v-for="(integration, index) in integrations" :key="integration.id" :class="appClass" class="m-4">
                <card class="pcd">
                  <div class="row justify-content-center">
                    <div class="col-sm-10 p-0">
                      <div class="text-center p-3 mb-3">
                        <img
                          slot="image"
                          class="card-img-top app-img"
                          :src="integration.application.logo"
                          :alt="integration.application.name"
                        >
                      </div>
                      <h5 class="card-title">
                        {{ integration.application.name }}
                      </h5>
                      <div class="card-body p-0">
                        <div class="row">
                          <div class="col-xl-2 p-3">
                            <i class="fa fa-check text-success" />
                          </div>
                          <div class="col-xl-9 pt-3 pb-3">
                            <p>
                              Data Appear on Dashboard
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="card-footer p-0">
                        <base-button outline class="w-100 p-3 " type="primary" @click="appClick(index)">
                          View Globelise
                        </base-button>
                      </div>
                    </div>
                  </div>
                </card>
              </div>
            </div>
            <!-- <ItegratedAppsList
        class-added="ml-1 col-xl-10"
        app-class="col-4"
        :totalPage="totalPage"
        @setTotalPage="setTotalPage"
        :size="size"
        :currentPage="currentPage"
        @setCurrentPage="setCurrentPage"/> -->
            <div v-if="integrations.length > 0" class="row" style="margin-bottom: 2%;">
              <div class="col-md-12 ">
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
              <!-- <div class="col-md-12 ">   -->

              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import loaderMixin from '~/mixins/loader'
// import ItegratedAppsList from '@/components/Application/IntegratedAppsList'
export default {
  name: 'Index',
  layout: 'argon',
  mixins: [
    loaderMixin
  ],
  // components: { ItegratedAppsList },
  data () {
    return {
      crumbs: [
        {
          name: 'Apps',
          path: '/apps'
        },
        {
          name: 'Integrated Apps',
          path: '/apps/integrated-apps'
        }
      ],
      totalPage: 1,
      currentPage: 1,
      size: 5,
      modals: {
        modal0: false
      },
      totalIntegrations: [],
      integrations: [],
      yourApp: [
        {
          name: 'Your Apps',
          type: 'subtitle'
        },
        {
          link: '/apps/integrated-apps',
          type: 'item',
          name: 'Integrated Apps'
        },
        {
          name: 'Integration',
          type: 'subtitle'
        },
        {
          link: '/apps/app-library',
          type: 'item',
          name: 'App Library'
        }
      ],
      submenu: true
    }
  },
  computed: {
    countTotalIntegrations () {
      return this.totalIntegrations.length
    }
  },
  mounted () {
    const element = document.querySelector('.integrated-app .header .container-fluid')
    console.log('element = ')
    console.log(element)
    element.classList.remove('container-fluid')
    // element.getElementsByClassName('container-fluid').className=""
    this.$axios.get('/api/integrations/?order%5Bid%5D=desc')
      // eslint-disable-next-line no-return-assign
      .then((data) => {
        console.log(data)
        this.totalIntegrations = data.data.filter(x => x.status === 1)
        console.log('total integration = ')

        this.integrations = [...this.totalIntegrations]
        // this.totalPage = 5;
        this.totalPage = Math.ceil(this.totalIntegrations.length / 5)
        this.setCurrentPage(1)
      }).catch(
      // eslint-disable-next-line no-console
        (e) => {
          console.log(e)
        }
      )
  },
  methods: {
    setTotalPage (totalPage, integrations, setIntegration) {
      console.log('Mantab !')
      this.totalPage = totalPage
      this.integrations = integrations

      console.log('this integrations = ')
      console.log(this.integrations)

      this.setIntegration = setIntegration

      console.log('this set integration = ')
      console.log(this.setIntegration)
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
    },

    appClick (index) {
      const selectedIntegration = this.integrations[index]
      window.location.href = '/apps/integrated-apps/' + selectedIntegration.id + '/' + selectedIntegration.application.appCode.replace('.', '-')
    },

    submenuAfterLeave (el) {
      el.style.display = 'block'
      el.style.left = '-14.6em'
    },

    submenuAfterEnter (el) {
      el.style.display = 'block'
      el.style.left = '0em'
    }
  }
}
</script>

<style>
.integrated-app .breadcrumb-item a[href="/apps"] {
  color: #313131;
  font-weight: 600;
  pointer-events: none;
}
</style>

<style scoped>

.integrated-app {
  font-family: 'Poppins'
}
.nav-last {
  opacity: 0.3;
}

form, .input-group, .form-group {
  width: 100% !important;
}

li.list-group-item {
  padding: 1rem 0 1rem 0;
  border: none;
}

li.list-group-item a {
  color: black;
}
div.search-button {
  background-color: #EFF0F7;
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
  /* width: 13px; */
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
  font-size: 20px;
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
  width: auto;
  /*height: 60px;
  left: 689px;
  top: 2066px; */

  background: #FAFAFA;
  border-radius: 8px;
  color: #404040;
  /* Inside Auto Layout */

  flex: none;
  order: 6;
  align-self: flex-end;
  flex-grow: 0;
  /* margin: 56px 0px; */
  /* font-family: picardata; */
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

div.divider {
  border-left: 1px solid #C4C4C4;
  width: 1px;
  height: 14px;
  margin: 7px 0 0 0;
  padding: 0 14px 0 0;
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

/* .breadcrumb-item:nth-child(2) {
    color: #313131;
    font-weight: 600;
} */

 .picardata-title {
  /* position: absolute; */
/* width: 278px; */
/* height: 48px; */
/* left: 0px; */
/* top: calc(50% - 48px/2 - 3px); */
margin: auto;
/* font-family: Poppins; */
font-style: normal;
font-weight: bolder;
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
margin: auto;
}

.picardata-arrow {
  color: #14142B;
  margin: auto
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
  color: #181C3B;
  font-size: 18px;
  font-weight: 600;
}

.box {
  margin: 10px 10px 10px 10px;
  width: 170px;
  height: 320px;
  background-color: #3E4EDD;
  border-radius: 17px;
}

hr {
  width: 50px;
  color: white;
  background-color: white;
  border: 1.5px solid white;
  border-radius: 5px;
}

.box-text {
  color: white;
}

.box-number {
    font-size: 50px;
    font-weight: "bold";
}

</style>
