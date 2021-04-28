<template>
  <div>
    <div class="row">
      <transition name="slide" @after-leave="submenuAfterLeave" @after-enter="submenuAfterEnter">
        <submenu v-show="submenu" class="col-xl-2" :submenu-data="menus">
          <template v-slot:breadcrumb>
            <div class="manual-crumb">
              Dashboard
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
              <div class="col-lg-4" style="padding-top: 2.5em; padding-left: 2.5em">
                <div class="box row">
                  <div class="col-lg-3" style="margin-top:2.5em; margin-bottom:-1.5em">
                    <h3 class="box-text">
                      Your Integrated Apps
                    </h3>
                  </div>
                  <div class="col-lg-12" style="margin-bottom:-5.625em">
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
        <div v-show="submenu" class="col-8">
          <h3>Overall Statistics</h3>
          <div class="row over-stat">
            <div class="card shadow-sm mx-3 col-4">
              <div class="card-body p-1 text-center">
                <RandomLineChart />
              </div>
            </div>
            <div class="card shadow-sm mx-3 col-4">
              <div class="card-body p-1 text-center">
                <RandomLineChart />
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import RandomLineChart from '~/components/Chart/RandomLineChart.vue'
import Submenu from '~/components/layouts/argon/Submenu'
export default {
  components: { RandomLineChart, Submenu },
  auth: true,
  layout: 'argon',
  data () {
    return {
      submenu: true,
      totalIntegrations: 0,
      menus: [
        {
          name: 'Your App Categories',
          type: 'subtitle'
        },
        {
          link: '/apps/app-library?category=6',
          type: 'item',
          name: 'Design'
        },
        {
          link: '/apps/app-library?category=4',
          type: 'item',
          name: 'Sales & Marketing'
        },
        {
          link: '/apps/app-library?category=1',
          type: 'item',
          name: 'Finance'
        },
        {
          link: '/apps/app-library?category=5',
          type: 'item',
          name: 'Social Media'
        },
        {
          link: '/apps/app-library?category=2',
          type: 'item',
          name: 'Collaboration'
        },
        {
          link: '/apps/app-library?category=3',
          type: 'item',
          name: 'Human Resources'
        }
      ]
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
      el.style.left = '-14.6em'
    },
    submenuAfterEnter (el) {
      el.style.display = 'block'
      el.style.left = '0em'
    }
  }
}
</script>
<style scoped>
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
    font-size: 1.125em;
    font-weight: 600;
  }

  .box {
    margin: 0.625em 0.625em 0.625em 0.625em;
    width: 10.625em;
    height: 20em;
    background-color: #3E4EDD;
    border-radius: 1.0625em;
  }

  hr {
    width: 3.125em;
    color: white;
    background-color: white;
    border: 0.09375em solid white;
    border-radius: 0.3125em;
  }

  .box-text {
    color: white;
  }

  .box-number {
    font-size: 3.125em;
    font-weight: "bold";
  }
</style>
