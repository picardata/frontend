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
        <div v-show="submenu" class="col-10">
          <div class="right-content">
            <div class="row">
              <div class="col-12">
                <div class="profile">
                  <div class="image">
                    <img src="~/assets/dashboard-img/ic_no_image_placeholder.png" alt="">
                  </div>
                  <div>
                    <div class="name">
                      {{ profile.firstname }} {{ profile.lastname }}
                    </div>
                    <div class="role">
                      {{ employee.role }} @ {{ employee.organization }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="most-apps">
                  <h4>Most Accessed Apps</h4>
                  <div class="list-apps">
                    <div
                      v-for="(app, index) in mostAccessedApps"
                      :key="app.name + index"
                      class="app shadow"
                    >
                      <img :src="require(`~/assets/dashboard-img/${app.img}`)" alt="">
                      <h1>{{ app.title }}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12" style="margin: 2em 0em 2em 0em">
                <h4 class="d-inline stat-menu-title">
                  Overall Statistics
                </h4>
                <base-button type="primary" class="d-inline float-right">
                  <i :class="['pd-icon pdicon-Configure']" @click="submenu = true" />
                  Customize chart
                </base-button>
              </div>
              <div class="col-lg-12 stat-menu">
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
            <div class="row" style="margin-top: 2em">
              <div class="col-xl-3 col-md-6">
                <stats-card
                  title="Total traffic"
                  type="gradient-red"
                  sub-title="350,897"
                  icon="ni ni-active-40"
                >
                  <template slot="footer">
                    <span class="text-success mr-2"><i class="fa fa-arrow-up" /> 3.48%</span>
                    <span class="text-nowrap">Since last month</span>
                  </template>
                </stats-card>
              </div>
              <div class="col-xl-3 col-md-6">
                <stats-card
                  title="Total traffic"
                  type="gradient-orange"
                  sub-title="2,356"
                  icon="ni ni-chart-pie-35"
                >
                  <template slot="footer">
                    <span class="text-success mr-2"><i class="fa fa-arrow-up" /> 12.18%</span>
                    <span class="text-nowrap">Since last month</span>
                  </template>
                </stats-card>
              </div>
              <div class="col-xl-3 col-md-6">
                <stats-card
                  title="Sales"
                  type="gradient-green"
                  sub-title="924"
                  icon="ni ni-money-coins"
                >
                  <template slot="footer">
                    <span class="text-danger mr-2"><i class="fa fa-arrow-down" /> 5.72%</span>
                    <span class="text-nowrap">Since last month</span>
                  </template>
                </stats-card>
              </div>
              <div class="col-xl-3 col-md-6">
                <stats-card
                  title="Performance"
                  type="gradient-info"
                  sub-title="49,65%"
                  icon="ni ni-chart-bar-32"
                >
                  <template slot="footer">
                    <span class="text-success mr-2"><i class="fa fa-arrow-up" /> 54.8%</span>
                    <span class="text-nowrap">Since last month</span>
                  </template>
                </stats-card>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-6">
                <card>
                  <template slot="header">
                    <!-- Subtitle -->
                    <h6 class="surtitle">
                      Overview
                    </h6>
                    <!-- Title -->
                    <h5 class="h3 mb-0">
                      Total sales
                    </h5>
                  </template>
                  <div class="chart">
                    <line-chart
                      :height="350"
                      :chart-data="salesChart.chartData"
                    />
                  </div>
                </card>
              </div>

              <div class="col-xl-6">
                <card>
                  <template slot="header">
                    <!-- Subtitle -->
                    <h6 class="surtitle">
                      Performance
                    </h6>
                    <!-- Title -->
                    <h5 class="h3 mb-0">
                      Total orders
                    </h5>
                  </template>
                  <div class="chart">
                    <bar-chart
                      :chart-data="ordersChart.chartData"
                      :height="350"
                    />
                  </div>
                </card>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-6">
                <card>
                  <template slot="header">
                    <!-- Subtitle -->
                    <h6 class="surtitle">
                      Growth
                    </h6>
                    <!-- Title -->
                    <h5 class="h3 mb-0">
                      Sales value
                    </h5>
                  </template>
                  <div class="chart">
                    <line-chart
                      :height="350"
                      :chart-data="dotsChart.chartData"
                      :extra-options="dotsChart.extraOptions"
                    />
                  </div>
                </card>
              </div>

              <div class="col-xl-6">
                <card>
                  <template slot="header">
                    <!-- Subtitle -->
                    <h6 class="surtitle">
                      Users
                    </h6>
                    <!-- Title -->
                    <h5 class="h3 mb-0">
                      Audience overview
                    </h5>
                  </template>
                  <div class="chart-area">
                    <doughnut-chart
                      :height="350"
                      :chart-data="doughnutChart.chartData"
                      :extra-options="doughnutChart.extraOptions"
                    />
                  </div>
                </card>
              </div>
            </div>

            <div class="row">
              <div class="col-xl-6">
                <card>
                  <template slot="header">
                    <!-- Subtitle -->
                    <h6 class="surtitle">
                      Partners
                    </h6>
                    <!-- Title -->
                    <h5 class="h3 mb-0">
                      Affiliate traffic
                    </h5>
                  </template>
                  <div class="chart">
                    <pie-chart
                      :height="350"
                      :chart-data="pieChart.chartData"
                      :extra-options="pieChart.extraOptions"
                    />
                  </div>
                </card>
              </div>
              <div class="col-xl-6">
                <card>
                  <template slot="header">
                    <!-- Subtitle -->
                    <h6 class="surtitle">
                      Overview
                    </h6>
                    <!-- Title -->
                    <h5 class="h3 mb-0">
                      Product comparison
                    </h5>
                  </template>
                  <div class="chart-area">
                    <bar-chart
                      :height="350"
                      :chart-data="barChartStacked.chartData"
                      :extra-options="barChartStacked.extraOptions"
                    />
                  </div>
                </card>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import DoughnutChart from '~/components/argon-core/Charts/DoughnutChart'
import LineChart from '~/components/argon-core/Charts/LineChart'
import BarChart from '~/components/argon-core/Charts/BarChart'
import PieChart from '~/components/argon-core/Charts/PieChart'
import StatsCard from '~/components/argon-core/Cards/StatsCard'
import { Charts } from '~/components/argon-core/Charts/config'
import * as chartConfigs from '~/components/argon-core/Charts/config'
import Submenu from '~/components/layouts/argon/Submenu'

function randomScalingFactor () {
  return Math.round(Math.random() * 100)
}

export default {
  components: {
    Submenu,
    DoughnutChart,
    LineChart,
    BarChart,
    PieChart,
    StatsCard
  },
  auth: true,
  layout: 'argon',
  async asyncData (context) {
    return await context.app.$axios.get('/api/user-profiles/' + context.app.$auth.user.userProfile.id + '/employees/me')
      .then((data) => {
        return {
          employee: {
            role: data.data.role,
            occupation: String(data.data.occupation),
            organization: data.data.company.name,
            workLocation: data.data.company.location
          },
          profile: {
            firstname: data.data.userProfile.firstname,
            lastname: data.data.userProfile.lastname,
            email: data.data.userProfile.email,
            phone: data.data.userProfile.phone,
            location: data.data.userProfile.address

          }
        }
      })
  },
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
      ],
      mostAccessedApps: [
        {
          title: 'Intercom',
          img: 'intercom.png'
        },
        {
          title: 'Slack',
          img: 'slack.png'
        },
        {
          title: 'Airtable',
          img: 'airtable.png'
        },
        {
          title: 'Twitter',
          img: 'twitter.png'
        },
        {
          title: 'Paypal',
          img: 'paypal.png'
        },
        {
          title: 'Mailchimp',
          img: 'mailchimp.png'
        },
        {
          title: 'Instagram',
          img: 'instagram.png'
        },
        {
          title: 'Chorus.ai',
          img: 'chorus.png'
        }
      ],
      salesChart: {
        chartData: {
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Performance',
            data: [0, 20, 10, 30, 15, 40, 20, 60, 60]
          }]

        },
        extraOptions: chartConfigs.blueChartOptions
      },
      ordersChart: {
        chartData: {
          labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Sales',
            data: [25, 20, 30, 22, 17, 29]
          }]
        }
      },
      dotsChart: {
        chartData: {
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Performance',
            data: [10, 18, 28, 23, 28, 40, 36, 46, 52],
            pointRadius: 10,
            pointHoverRadius: 15,
            showLine: false
          }]
        },
        extraOptions: {
          scales: {
            yAxes: [{
              gridLines: {
                color: Charts.colors.gray[200],
                zeroLineColor: Charts.colors.gray[200]
              }
            }]
          }
        }
      },
      doughnutChart: {
        chartData: {

          labels: [
            'Danger',
            'Warning',
            'Success',
            'Primary',
            'Info'
          ],
          datasets: [{
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ],
            backgroundColor: [
              Charts.colors.theme.danger,
              Charts.colors.theme.warning,
              Charts.colors.theme.success,
              Charts.colors.theme.primary,
              Charts.colors.theme.info
            ],
            label: 'Dataset 1'
          }]
        },
        extraOptions: {
          responsive: true,
          legend: {
            position: 'bottom'
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      },
      pieChart: {
        chartData: {
          labels: [
            'Danger',
            'Warning',
            'Success',
            'Primary',
            'Info'
          ],
          datasets: [{
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ],
            backgroundColor: [
              Charts.colors.theme.danger,
              Charts.colors.theme.warning,
              Charts.colors.theme.success,
              Charts.colors.theme.primary,
              Charts.colors.theme.info
            ],
            label: 'Dataset 1'
          }]
        },
        extraOptions: {
          responsive: true,
          legend: {
            position: 'top'
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      },
      barChartStacked: {
        chartData: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Dataset 1',
            backgroundColor: Charts.colors.theme.danger,
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          }, {
            label: 'Dataset 2',
            backgroundColor: Charts.colors.theme.primary,
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          }, {
            label: 'Dataset 3',
            backgroundColor: Charts.colors.theme.success,
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          }]

        },
        extraOptions: {
          tooltips: {
            mode: 'index',
            intersect: false
          },
          responsive: true,
          scales: {
            xAxes: [{
              stacked: true
            }],
            yAxes: [{
              stacked: true
            }]
          }
        }
      }
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
<style scoped lang="scss">
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
    font-size: 50px;
    font-weight: bold;
  }

  .right-content{
    padding: 80px 40px;
  }

  .profile{
    display: flex;
    align-items: center;
    .image{
      margin-right: 24px;
    }
    .name{
      font-weight: 600;
      font-size: 20px;
      color: #14142B;
    }
    .role{
      font-weight: 500;
      color: #14142B;
      margin-top: 8px;
    }
  }

  .most-apps{
    h4{
      color: #313131;
      font-weight: 600;
      font-size: 20px;
      margin-top: 40px;
    }
  }

  .stat-menu-title{
    color: #313131;
    font-weight: 600;
    font-size: 20px;
    margin-top: 40px;
  }

  .list-apps{
    display: flex;
    flex-wrap: wrap;

    .app{
      padding: 18px 4px 18px;
      border-radius: 8px;
      text-align: center;
      width: 100px;
      margin-right: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      img{
        width: fit-content;
      }
      h1{
        font-size: 14px;
        margin-top: 20px;
        color: #313131;
      }
    }
    font-size: 50px;
    font-weight: bold;
  }

  .right-content{
    padding: 80px 0 80px 40px;
  }

  .profile{
    display: flex;
    align-items: center;
    .image{
      margin-right: 24px;
    }
    .name{
      font-weight: 600;
      font-size: 20px;
      color: #14142B;
    }
    .role{
      font-weight: 500;
      color: #14142B;
      margin-top: 8px;
    }
  }

  .most-apps{
    h4{
      color: #313131;
      font-weight: 600;
      font-size: 20px;
      margin-top: 40px;
    }
  }

  .list-apps{
    display: flex;
    flex-wrap: wrap;

    .app{
      padding: 18px 4px 18px;
      border-radius: 8px;
      text-align: center;
      width: 100px;
      margin-right: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      img{
        width: fit-content;
      }
      h1{
        font-size: 14px;
        margin-top: 20px;
        color: #313131;
      }
    }
  }
</style>
