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
      el.style.left = '-15.5%'
    },
    submenuAfterEnter (el) {
      el.style.display = 'block'
      el.style.left = '0%'
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
    from { left: 0%; }
    to { left: -15.5%; }
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
