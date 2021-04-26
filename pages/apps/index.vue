<template>
  <div>
    <!-- <base-header type="white" class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <route-breadcrumb />
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">
            New
          </base-button>
          <base-button size="sm" type="neutral">
            Filters
          </base-button>
        </div>
      </div>
    </base-header> -->
    <!-- <div class="container-fluid mt--6"> -->
    <div class="row">
      <transition name="slide" @after-leave="submenuAfterLeave" @after-enter="submenuAfterEnter">
        <div v-show="submenu" class="col-xl-2 slide-element">
          <div class="row pt-3">
            <div class="col-lg-12" style="margin-bottom: 50px">
              <route-breadcrumb class="submenu-breadcrumb" />
            </div>
            <div class="col-xl-6" style="margin-bottom: 20px">
              <p class="subtitle">
                Your Apps
              </p>
            </div>
            <div class="col-xl-12">
              <div id="list-tab" class="list-group" role="tablist">
                <a href="#" class="list-item row">
                  <div class="col-lg-10">
                    <nuxt-link to="/apps/integrated-apps"><p class="list-text">Integrated Apps</p></nuxt-link>
                  </div>
                  <div class="col-lg-1">
                    <i :class="['pd-icon pdicon-Chevron-Right']" />
                  </div>
                </a>
                <a href="#" class="list-item row">
                  <div class="col-lg-10">
                    <nuxt-link to="/apps/manage-all-apps"><p class="list-text">Manage all apps</p></nuxt-link>
                  </div>
                  <div class="col-lg-1">
                    <i :class="['pd-icon pdicon-Chevron-Right']" />
                  </div>
                </a>
              </div>
            </div>
            <div class="col-xl-6" style="margin-bottom: 20px">
              <p class="subtitle">
                Integration
              </p>
            </div>
            <div class="col-xl-12">
              <div id="list-tab" class="list-group" role="tablist">
                <a href="#" class="list-item row">
                  <div class="col-lg-10">
                    <nuxt-link to="/apps/app-library"><p class="list-text">App Library</p></nuxt-link>
                  </div>
                  <div class="col-lg-1">
                    <i :class="['pd-icon pdicon-Chevron-Right']" />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4" style="padding-top: 40px; padding-left: 20px">
              <div class="box row">
                <div class="col-lg-3" style="margin-top:40px; margin-bottom:-20px">
                  <h3 class="box-text">
                    Your Integrated Apps
                  </h3>
                </div>
                <div class="col-lg-12" style="margin-bottom:-90px">
                  <p class="box-text box-number">
                    {{ totalIntegrations }}
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
            <div class="col-lg-12" style="margin-top: -55px; margin-left: 36px">
              <nuxt-link to="/apps/app-library">
                <h5 class="box-text">
                  + Add Application
                </h5>
              </nuxt-link>
            </div>
          </div>
        </div>
      </transition>
      <transition name="slide" @after-leave="buttonAfterLeave" @after-enter="buttonAfterEnter">
        <div v-show="submenu" class="col-lg-1 collapse-button">
          <i v-if="submenu" :class="['pd-icon pdicon-Collapse']" @click="submenu = false" />
          <i v-else :class="['pd-icon pdicon-Expand']" @click="submenu = true" />
        </div>
      </transition>
      <transition name="slide" @after-leave="submenuAfterLeave" @after-enter="submenuAfterEnter">
        <div v-show="submenu" class="col-xl-3">
          <card>
            <form
              id="navbar-search-main"
              class="navbar-search form-inline mr-sm-3"
              :class="{'navbar-search-light': type === 'default', 'navbar-search-dark': type === 'light'}"
            >
              <div class="form-group mb-0">
                <div class="input-group input-group-alternative input-group-merge">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-search" /></span>
                  </div>
                  <input class="form-control" placeholder="Search" type="text">
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
          </card>
        </div>
      </transition>
      <transition name="slide" @after-leave="submenuAfterLeave" @after-enter="submenuAfterEnter">
        <div v-show="submenu" class="col-xl-6">
          <card>
            <h5 slot="header" class="h3 mb-0">
              Team members
            </h5>
            <user-list />
          </card>
        </div>
      </transition>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>

export default {
  name: 'Index',
  layout: 'argon',
  components: {},
  data () {
    return {
      submenu: true,
      totalIntegrations: 0
    }
  },
  mounted () {
    this.$axios.get('/api/integrations/?order%5Bid%5D=desc')
      // eslint-disable-next-line no-return-assign
      .then((data) => {
        this.totalIntegrations = data.data.filter(x => x.status === 1).length
      }).catch(
      // eslint-disable-next-line no-console
        (e) => {
          console.log(e)
        }
      )
  },
  methods: {
    buttonAfterLeave (el) {
      el.style.display = 'block'
      el.style.left = '-282px'
    },
    submenuAfterLeave (el) {
      el.style.display = 'block'
      el.style.left = '-280px'
    },
    buttonAfterEnter (el) {
      el.style.display = 'block'
      el.style.left = '0px'
    },
    submenuAfterEnter (el) {
      el.style.display = 'block'
      el.style.left = '0px'
    }
  }
}
</script>
<style>
  div.card {
    border: none;
  }

  .most-access div.card {
    border: none;
    width: 170px;
    font-size: 14px;
  }

  .over-stat div.card {
    border: none;
    font-size: 14px;
  }

  .slide-enter-active {
    animation: slide .2s reverse;
  }

  .slide-leave-active {
    animation: slide .2s;
  }

  @keyframes slide {
    from { left: 0px; }
    to { left: -280px; }
  }

  .list-item {
    margin-bottom: 8px;
  }

  i.pdicon-Collapse, i.pdicon-Expand {
    font-size: 30px;
    cursor: pointer;
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

  .list-text {
    color: #2534B6;
    font-weight: bold;
    font-size: 16px;
  }

  i.pdicon-Chevron-Right {
    color: #2534B6;
  }

  .slide-element {
    background-color: #F4F9FF;
  }

  .box-text {
    color: white;
  }

  .box-number {
     font-size: 50px;
     font-weight: "bold";
  }

  .collapse-button {
    margin-top: 13px;
    margin-left: -30px;
    margin-right: -70px;
  }

  .submenu-breadcrumb > ol > li > a {
    color: #181C3B !important;
  }

  .subtitle {
    color: #181C3B !important;
    font-size: 20px;
    font-weight: bold
  }
</style>
