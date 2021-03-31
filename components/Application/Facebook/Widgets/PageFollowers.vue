<template>
  <div>
    <card>
      <template slot="header">
        <!-- Subtitle -->
        <h6 class="surtitle">
          Overview
        </h6>
        <!-- Title -->
        <h5 class="h3 mb-0">
          Page Followers
        </h5>
      </template>
      <div class="chart">
        <line-chart
          :height="350"
          :chart-data="pageFollowersChart.chartData"
        />
      </div>
    </card>
  </div>
</template>
<script>
import moment from 'moment'
import LineChart from '~/components/argon-core/Charts/LineChart'
import * as chartConfigs from '~/components/argon-core/Charts/config'

export default {
  name: 'PageFollowers',
  components: { LineChart },
  async fetch () {
    await this.$axios.get('/api/facebook/pages')
      .then(async (data) => {
        const res = data.data.map((d) => {
          return {
            pageId: d.id,
            pageAccessToken: d.access_token,
            insightUrl: `/api/facebook/page-followers?id=${d.id}&token=${d.access_token}`
          }
        })

        return await this.$axios.$get(res[0].insightUrl)
          .then((data) => {
            const labels = [moment().format('MMM DD')]

            const pageFollowersData = [data.followers_count]

            this.pageFollowersChart.chartData.labels = labels
            this.pageFollowersChart.chartData.datasets[0].data = pageFollowersData
          })
      })
  },
  data () {
    return {
      pageFollowersChart: {
        chartData: {
          labels: [],
          datasets: [{
            label: 'total',
            data: []
          }]
        },
        extraOptions: chartConfigs.blueChartOptions
      }
    }
  }
}
</script>
