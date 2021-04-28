<template>
  <div>
    <!-- <div class="container-fluid mt--6"> -->
    <div class="row">
      <transition name="slide" @after-leave="submenuAfterLeave" @after-enter="submenuAfterEnter">
        <submenu v-show="submenu" class="col-xl-2" :submenu-data="yourApp">
          <template v-slot:breadcrumb>
            <div class="manual-crumb">
              Apps
            </div>
          </template>
          <template v-if="submenu" v-slot:collapse>
            <i :class="['pd-icon pdicon-Expand']" @click="submenu = false" />
          </template>
          <template v-else v-slot:expand>
            <i :class="['pd-icon pdicon-Collapse']" @click="submenu = true" />
          </template>
          <template v-slot:content>
            <div class="row">
              <div class="col-lg-4" style="padding-top: 40px; padding-left: 40px">
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
              <div class="col-lg-12" style="margin-top: -55px; margin-left: 56px">
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
        <div v-show="submenu" class="col-xl-10">
          <base-header type="white" class="pb-6">
            <div class="row align-items-center py-4">
              <div class="col-lg-6 col-7">
                <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                  <route-breadcrumb :crumbs="crumbs" />
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
          </base-header>
          <div class="row">
            <div class="col-lg-6">
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
            <div class="col-xl-6">
              <card>
                <h5 slot="header" class="h3 mb-0">
                  Team members
                </h5>
                <user-list />
              </card>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import Submenu from '~/components/layouts/argon/Submenu'
export default {
  name: 'Index',
  layout: 'argon',
  components: { Submenu },
  data () {
    return {
      crumbs: [
        {
          name: 'Apps',
          path: '/apps'
        }
      ],
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
          link: '/apps/manage-all-apps',
          type: 'item',
          name: 'Manage All Apps'
        },
        {
          name: 'Integration',
          type: 'subtitle'
        },
        {
          link: '/apps/app-library',
          type: 'item',
          name: 'Integrated Apps'
        }
      ],
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
    submenuAfterLeave (el) {
      el.style.display = 'block'
      el.style.left = '-251px'
    },
    submenuAfterEnter (el) {
      el.style.display = 'block'
      el.style.left = '0px'
    }
  }
}
</script>
<style>
  .slide-enter-active {
    animation: slide .2s reverse;
  }

  .slide-leave-active {
    animation: slide .2s;
  }

  @keyframes slide {
    from { left: 0px; }
    to { left: -251px; }
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

  .box-text {
    color: white;
  }

  .box-number {
     font-size: 50px;
     font-weight: "bold";
  }
</style>
