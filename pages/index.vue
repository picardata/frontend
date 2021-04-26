<template>
  <div>
    <div class="row">
      <transition name="slide" @after-leave="submenuAfterLeave" @after-enter="submenuAfterEnter">
        <div v-show="submenu" :class="slideClass" class="col-xl-2 slide-element">
          <div class="row pt-3">
            <div class="col-lg-12" style="margin-bottom: 50px">
              <route-breadcrumb />
            </div>
            <div class="col-xl-6" style="margin-bottom: 20px">
              <h3>Your App Categories</h3>
            </div>
            <div class="col-xl-12">
              <div id="list-tab" class="list-group" role="tablist">
                <a href="#" class="list-item row">
                  <div class="col-lg-10">
                    <nuxt-link to="/apps/app-library?category=6"><p class="list-text">Design</p></nuxt-link>
                  </div>
                  <div class="col-lg-1">
                    <i :class="['pd-icon pdicon-Chevron-Right']" />
                  </div>
                </a>
                <a href="#" class="list-item row">
                  <div class="col-lg-10">
                    <nuxt-link to="/apps/app-library?category=4"><p class="list-text">Sales &amp; Marketing</p></nuxt-link>
                  </div>
                  <div class="col-lg-1">
                    <i :class="['pd-icon pdicon-Chevron-Right']" />
                  </div>
                </a>
                <a href="#" class="list-item row">
                  <div class="col-lg-10">
                    <nuxt-link to="/apps/app-library?category=1"><p class="list-text">Finance</p></nuxt-link>
                  </div>
                  <div class="col-lg-1">
                    <i :class="['pd-icon pdicon-Chevron-Right']" />
                  </div>
                </a>
                <a href="#" class="list-item row">
                  <div class="col-lg-10">
                    <nuxt-link to="/apps/app-library?category=5"><p class="list-text">Social Media</p></nuxt-link>
                  </div>
                  <div class="col-lg-1">
                    <i :class="['pd-icon pdicon-Chevron-Right']" />
                  </div>
                </a>
                <a href="#" class="list-item row">
                  <div class="col-lg-10">
                    <nuxt-link to="/apps/app-library?category=2"><p class="list-text">Collaboration</p></nuxt-link>
                  </div>
                  <div class="col-lg-1">
                    <i :class="['pd-icon pdicon-Chevron-Right']" />
                  </div>
                </a>
                <a href="#" class="list-item row">
                  <div class="col-lg-10">
                    <nuxt-link to="/apps/app-library?category=3"><p class="list-text">Human Resources</p></nuxt-link>
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
export default {
  components: { RandomLineChart },
  auth: true,
  layout: 'argon',
  data () {
    return {
      submenu: true,
      totalIntegrations: 0
    }
  },
  created () {
    setTimeout(() => {
      const container = this.$el.querySelector('.slide-element')
      container.classList.remove('slide-enter-active')
      container.classList.remove('slide-leave-active')
    }, 1000)
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
      el.style.left = '-257px'
    },
    submenuAfterLeave (el) {
      el.style.display = 'block'
      el.style.left = '-256px'
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
    to { left: -256px; }
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
    background-color: #2534B6;
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
    font-size: 13px;
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
</style>
