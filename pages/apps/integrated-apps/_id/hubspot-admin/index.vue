<template>
  <div>
    <base-header type="white" class="p-0">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <route-breadcrumb :crumbs="crumbs" />
          </nav>
        </div>
      </div>
    </base-header>
    <div>
      <ApplicationDetail
        :logo="data.application.logo"
        :name="data.application.name"
        :detail="data.application.detail"
        :instruction="data.application.instruction"
        :detail-integrated-page="true"
      />
      <div class="row">
        <h3 class="mt-3 ml-4 col">
          View Statistic
        </h3>
      </div>
      <div class="row mt-3">
        <div class="col-3 ">
          <HubspotUserCount />
        </div>
        <div class="col-3 ">
          <HubspotCompanyCount />
        </div>
        <div class="col-3">
          <HubspotContactCount />
        </div>
        <div class="col-6">
          <HubspotDealChart v-if="dealsChart.loaded === true" :chart-data="dealsChart" :deal-stage="dealsChart.dealStage" />
        </div>
        <div class="col-12 ">
          <HubspotContactListWidget />
        </div>
        <div class="col-12 ">
          <HubspotCompanyListWidget />
        </div>
        <div class="col-12 ">
          <HubspotDealListWidget />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HubspotContactListWidget from '@/components/Application/Hubspot/HubspotContactListWidget'
import HubspotCompanyListWidget from '@/components/Application/Hubspot/HubspotCompanyListWidget'
import HubspotDealListWidget from '@/components/Application/Hubspot/HubspotDealListWidget'
import HubspotUserCount from '@/components/Application/Hubspot/HubspotUserCount'
import HubspotCompanyCount from '@/components/Application/Hubspot/HubspotCompanyCount'
import HubspotContactCount from '@/components/Application/Hubspot/HubspotContactCount'
import HubspotDealChart from '@/components/Application/Hubspot/HubspotDealChart'
import ApplicationDetail from '~/components/Application/ApplicationDetail'
import loaderMixin from '~/mixins/loader'
import hubspotMixin from '~/mixins/hubspot'

export default {
  layout: 'argon',
  components: {
    HubspotCompanyCount,
    HubspotUserCount,
    HubspotDealListWidget,
    HubspotCompanyListWidget,
    HubspotContactListWidget,
    ApplicationDetail,
    HubspotContactCount,
    HubspotDealChart
  },
  mixins: [
    loaderMixin,
    hubspotMixin
  ],
  async asyncData (context) {
    return await context.app.$axios.get('/api/integrations/' + context.route.params.id)
      .then((data) => {
        return {
          data: data.data
        }
      })
  },
  data () {
    return {
      crumbs: [
        {
          name: 'Apps',
          path: '/apps/integrated-apps'
        },
        {
          name: 'Integrated Apps',
          path: '/apps/integrated-apps'
        },
        {
          name: 'Hubspot',
          path: '/apps/integrated-apps'
        }
      ],
      closedWon: {
        dealStage: 'closedwon',
        loaded: false,
        labels: [],
        datasets: [{data: []}]
      },
      appointmentScheduled: {
        dealStage: 'appointmentscheduled',
        loaded: false,
        labels: [],
        datasets: [{data: []}]
      },
      qualifiedToBuy: {
        dealStage: 'qualifiedtobuy',
        loaded: false,
        labels: [],
        datasets: [{data: []}]
      },
      presentationScheduled: {
        dealStage: 'presentationscheduled',
        loaded: false,
        labels: [],
        datasets: [{data: []}]
      },
      decisionMakerBoughtIn: {
        dealStage: 'decisionmakerboughtin',
        loaded: false,
        labels: [],
        datasets: [{data: []}]
      },
      contractSent: {
        dealStage: 'contractsent',
        loaded: false,
        labels: [],
        datasets: [{data: []}]
      },
      closedLost: {
        dealStage: 'closedlost',
        loaded: false,
        labels: [],
        datasets: [{data: []}]
      },
    }
  },
  mounted() {
    this.getDealsData()
  },
  methods: {
    async getDealsData() {
      const stages = [
        this.appointmentScheduled,
        this.qualifiedToBuy,
        this.presentationScheduled,
        this.decisionMakerBoughtIn,
        this.contractSent,
        this.closedWon,
        this.closedLost,
      ]

      await this.$axios.get('/api/hubspot/deals/stats', {
        'params': {
          'month': this.$moment().format('M'),
          'year': this.$moment().format('Y')
        }
      })
      .then((data) => {
        data.data.map((deal) => {
          stages.map((stage) => {
            if(deal.dealStage === stage.dealStage) {
              stage.labels.push(
                deal.day + '/' + deal.month
              )
              stage.datasets[0].data.push(
                deal.total
              )
            }
          })
        })

        stages.map((stage) => {
          stage.loaded = true
        })
      })
    }
  },
  mounted () {
    this.getHubspotChartDealsData()
  }
}
</script>

<style scoped>

</style>
