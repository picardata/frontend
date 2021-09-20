<template>
  <div class="row picardata-form-index">

    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <div class="container-fluid">
          <div class="row profile mt-6">
            <div class="image">
              <img src="~/assets/dashboard-img/ic_no_image_placeholder.png" alt="">
            </div>
            <div>
              <div class="name">
                Welcome, {{ profile.firstname }} {{ profile.lastname }}
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-12">
              <ul class="list-packages">
                <li>
                  <div class="row">
                    <div class="col-6">
                      <div class="card border p-4">
                        <div class="mr-3">
                          <div class="all-form-title bold-text row">
                            <div class="col-6">
                              <h3 style="text-align: left; padding: 0.87rem 0 0 0;">
                                No payments due
                              </h3>
                            </div>
                            <div class="col-6">
                              <nuxt-link to="/contracts/create-contract" class="btn btn-lg btn-primary btn-round">
                                Create Contract
                              </nuxt-link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="card border p-4">
                        <div class="mr-3">
                          <div class="all-form-title bold-text">
                            <div>
                              <h2 style="text-align: left;">
                                Payment history
                              </h2>
                              <img class="mt-3" style="" src="~/assets/contract/fixed_rate_contract.svg" alt="Fixed rate contract">

                            </div>
                            <div class="mt-3">
                              You’ll see beautiful graphs after your first payment!
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Select, Option } from 'element-ui'
import HubspotDealChart from '@/components/Application/Hubspot/HubspotDealChart'
import moment from 'moment'
// import StatsCard from '~/components/argon-core/Cards/StatsCard'
import TotalIntegrationChart from '~/components/Chart/TotalIntegrationChart'
import FacebookPostReachChart from '~/components/Chart/FacebookPostReachChart'
import FacebookPagePostEngagementChart from '~/components/Chart/FacebookPagePostEngagementChart'
import FacebookFollowerStat from '~/components/Stat/FacebookFollowerStat'
import HubspotCompanyStat from '~/components/Stat/HubspotCompanyStat'

import HubspotTotalContactStat from '~/components/Stat/HubspotTotalContactStat'
import FacebookVideoAndPageViewChart from '~/components/Chart/FacebookVideoAndPageViewChart'
import { Charts } from '~/components/argon-core/Charts/config'
import Submenu from '~/components/layouts/argon/Submenu'
import loaderMixin from '~/mixins/loader'
import hubspotMixin from '~/mixins/hubspot'
import SlackUserStat from '~/components/Stat/SlackUserStat'

function randomScalingFactor () {
  return Math.round(Math.random() * 100)
}

function isContainNonZero (data) {
  if (data) {
    const innerData = data.data
    return innerData.some(x => x > 0)
  }

  return false
}

function processFacebookRespone (response) {
  const pagePostEngagement = response.data

  let facebookPagePostEngagementData
  if (pagePostEngagement && pagePostEngagement.length > 0) {
    const pagePostEngagementData = pagePostEngagement[0]
    const values = pagePostEngagementData.values

    const labels = values.map(value => moment(value.end_time.date).format('MMM DD'))
    const data = values.map(value => value.value)

    facebookPagePostEngagementData = {
      labels,
      data
    }
  }

  return facebookPagePostEngagementData
}

export default {
  components: {
    Submenu,
    TotalIntegrationChart,
    FacebookFollowerStat,
    FacebookPostReachChart,
    FacebookPagePostEngagementChart,
    FacebookVideoAndPageViewChart,
    HubspotCompanyStat,
    [Select.name]: Select,
    [Option.name]: Option,
    HubspotDealChart,
    HubspotTotalContactStat,
    SlackUserStat
  },
  auth: true,
  layout: 'argon',
  mixins: [
    loaderMixin,
    hubspotMixin
  ],
  async asyncData (context) {
    const promises = [
      context.app.$axios.get('/api/hubspot/companies/stats'),
      context.app.$axios.get('/api/hubspot/contacts/stats'),
      context.app.$axios.get('/api/user-profiles/' + context.app.$auth.user.userProfile.id + '/employees/me'),
      context.app.$axios.get('/api/slack/users/stats'),
      context.app.$axios.get('/api/facebook/post-engagements'),
      context.app.$axios.get('/api/facebook/page-followers'),
      context.app.$axios.get('/api/facebook/post-reach'),
      context.app.$axios.get('/api/facebook/page-views'),
      context.app.$axios.get('/api/facebook/videos-views')
    ]

    const responses = await Promise.all(promises.map(p => p.catch(_ => null)))

    let hubspotCompanyStatRaw
    let hubspotCompanyStat
    if (responses[0]) {
      hubspotCompanyStatRaw = responses[0]
      hubspotCompanyStat = hubspotCompanyStatRaw.data
    }

    let hubspotContactStatRaw
    let hubspotContactStat
    if (responses[1]) {
      hubspotContactStatRaw = responses[1]
      hubspotContactStat = hubspotContactStatRaw.data
    }

    let slackUserStatRaw
    let slackUserStat
    if (responses[3]) {
      slackUserStatRaw = responses[3]
      slackUserStat = slackUserStatRaw.data
    }

    let hubspotCompanyStatTotal = 0

    if (hubspotCompanyStat && hubspotCompanyStat.length > 0) {
      hubspotCompanyStatTotal = hubspotCompanyStat[0].total
    }

    let hubspotContactStatTotal = 0
    if (hubspotContactStat && hubspotContactStat.length > 0) {
      hubspotContactStatTotal = hubspotContactStat[0].total
    }

    let slackUserStatTotal = 0
    if (slackUserStat && slackUserStat.length > 0) {
      slackUserStatTotal = slackUserStat[0].total
    }

    let data
    if (responses[2]) {
      data = responses[2]
    }

    let facebookPagePostEngagementData
    if (responses[4]) {
      facebookPagePostEngagementData = processFacebookRespone(responses[4])
    }

    let facebookFollowerCount
    if (responses[5]) {
      const data = responses[5].data
      facebookFollowerCount = data.followers_count
    }

    let facebookPagePostReachData
    if (responses[6]) {
      facebookPagePostReachData = processFacebookRespone(responses[6])
    }

    let facebookPageViewData
    if (responses[7]) {
      facebookPageViewData = processFacebookRespone(responses[7])
    }

    let facebookPageVideoViewData
    if (responses[8]) {
      facebookPageVideoViewData = processFacebookRespone(responses[8])
    }

    const isAnyFacebookPageViewOrVideoViewExist = isContainNonZero(facebookPageViewData) || isContainNonZero(facebookPageVideoViewData)

    const isAnyFacebookPagePostReachExist = isContainNonZero(facebookPagePostReachData)

    const isAnyFacebookPagePostEngagementExist = isContainNonZero(facebookPagePostEngagementData)

    const facebookPageViewAndVideoViewData = {
      pageView: facebookPageViewData,
      pageVideoView: facebookPageVideoViewData
    }
    return {
      isAnyFacebookPagePostEngagementExist,
      isAnyFacebookPagePostReachExist,
      isAnyFacebookPageViewOrVideoViewExist,
      facebookPageViewAndVideoViewData,
      facebookPageViewData,
      facebookPageVideoViewData,
      facebookFollowerCount,
      facebookPagePostReachData,
      facebookPagePostEngagementData,
      hubspotCompanyStatTotal,
      hubspotContactStatTotal,
      slackUserStatTotal,
      employee: {
        role: data ? data.data.role : '',
        occupation: data ? String(data.data.occupation) : '',
        organization: data ? data.data.company.name : '',
        workLocation: data ? data.data.company.location : ''
      },
      profile: {
        firstname: data ? data.data.userProfile.firstname : '',
        lastname: data ? data.data.userProfile.lastname : '',
        email: data ? data.data.userProfile.email : '',
        phone: data ? data.data.userProfile.phone : '',
        location: data ? data.data.userProfile.address : ''
      }
    }
  },
  data () {
    return {
      timeframes: [
        {
          label: 'This month',
          value: 1
        },
        {
          label: '4 months',
          value: 4
        },
        {
          label: '6 months',
          value: 6
        },
        {
          label: 'This year',
          value: 12
        }
      ],
      selects: {
        firstWidget: 'This month',
        secondWidget: '6 months',
        thirdWidget: 'This months',
        forthWidget: '4 months',
        fifthWidget: '4 months',
        sixthWidget: 'This year',
        seventhWidget: '6 months',
        eighthWidget: '6 months'
      },
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
      mostAccessedApps: [],
      salesInsight: {
        chartData: {
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Performance',
            data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
            borderColor: Charts.colors.theme.primary
          }]
        }
      },
      transaction: {
        chartData: {
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Performance',
            data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
            borderColor: Charts.colors.theme.warning
          }]
        }
      },
      socialMedia: {
        chartData: {
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Performance',
            data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
            borderColor: Charts.colors.theme.danger
          }]
        }
      },
      humanResources: {
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
      financial: {
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
      salesAndMarketing: {
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
  computed: {
    hubspotDataExist () {
      return this.dealsChart.datasets[0].data.length
    }
  },
  mounted () {
    this.$axios.get('/api/integrations/?order%5Bid%5D=desc')
      // eslint-disable-next-line no-return-assign
      .then((data) => {
        this.mostAccessedApps = data.data.filter(x => x.status === 1)
        this.totalIntegrations = data.data.filter(x => x.status === 1).length
      }).catch(
      // eslint-disable-next-line no-console
        (e) => {
          console.log(e)
        }
      )

    // Hubspot get deals chart data
    this.getHubspotChartDealsData()
  },
  methods: {
    submenuAfterLeave (el) {
      el.style.display = 'block'
      el.style.left = '-14.6em'
    },
    submenuAfterEnter (el) {
      el.style.display = 'block'
      el.style.left = '0em'
    },
    appClick (index) {
      const selectedIntegration = this.mostAccessedApps[index]
      window.open('/apps/integrated-apps/' + selectedIntegration.id + '/' + selectedIntegration.application.appCode.replace('.', '-'), '_blank').focus()
    }
  }
}
</script>
<style scoped lang="scss">
  /deep/.el-input__inner {
    border: 0px;
    font-style: 'Roboto Condensed';
    font-size: 12px;
    font-weight: 500;
    color: #2534B6;
  }

  .all-form-title {
    font-family: 'Roboto Condensed';
    font-style: normal;
    color: #313131;
    text-align: center;
    h3 {
      font-size: 18px;
    }
    span {
      font-size: 14px;
      font-weight: normal !important;
    }
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
    font-size: 1.125em;
    font-weight: 600;
  }

  .box {
    margin: 0.625em 0.625em 0.625em 0.625em;
    width: 10.625em;
    height: 20em;
    background-color: #2E4823;
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
    padding: 80px 40px 40px 0;
  }

  .profile{
    display: flex;
    align-items: center;
    margin-top: 20px;

    .image{
      margin-right: 24px;
    }
    .name{
      font-weight: bolder;
      font-size: 24px;
      color: #2E4823;
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
        width: 40px;
      }
      h1{
        font-size: 14px;
        margin-top: 20px;
        color: #313131;
      }
    }
  }
</style>
