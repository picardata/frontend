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
    <div >
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
        <div class="col-sm-3 col-xs-6">
          <SlackUserCount />
        </div>
        <div class="col-sm-3 col-xs-6">
          <SlackUserGroupCount />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-sm-5">
          <card class="pcd">
            <div class="row">
              <div class="col-sm-8">
                <h2>Response</h2>
              </div>
              <div class="col-sm-4">
                <span class="text-primary desc">This month <span class="pd-icon pdicon-Chevron-Down text-primary" /></span>
              </div>
            </div>
            <div class="row">
              <span class="col-sm-12">Conversation Responses</span>
            </div>
            <div class="row mt-4">
              <div class="col-sm-8">
                <div class="chart">
                  <line-chart
                    :height="150"
                    :chart-data="salesChart.chartData"
                  />
                </div>
              </div>
              <div class="col-sm-4">
                <h1 class="desc-title mb-0">
                  18.8k
                </h1>
                <span class="desc">Increases 53%</span>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SlackUserCount from '@/components/Application/Slack/SlackUserCount'
import SlackUserGroupCount from '@/components/Application/Slack/SlackUserGroupCount'
import ApplicationDetail from '~/components/Application/ApplicationDetail'
import LineChart from '~/components/argon-core/Charts/LineChart'
import * as chartConfigs from '~/components/argon-core/Charts/config'

export default {
  layout: 'argon',
  components: { SlackUserCount, ApplicationDetail, SlackUserGroupCount, LineChart },
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
      salesChart: {
        chartData: {
          labels: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          datasets: [{
            label: '',
            data: [20, 0, 80, 30, 50, 25, 23, 15, 0]
          }]

        },
        extraOptions: chartConfigs.blueChartOptions
      },
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
          name: 'Slack',
          path: '/apps/integrated-apps'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
