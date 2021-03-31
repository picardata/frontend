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
          Post Reach
        </h5>
      </template>
      <div class="chart">
        <line-chart
          :height="350"
          :chart-data="postReachChart.chartData"
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
  name: 'PostReach',
  components: { LineChart },
  async fetch () {
    await this.$axios.get('/api/facebook/pages')
      .then(async (data) => {
        const res = data.data.map((d) => {
          return {
            pageId: d.id,
            pageAccessToken: d.access_token,
            insightUrl: `/api/facebook/post-reach?id=${d.id}&token=${d.access_token}`
          }
        })

        await this.$axios.$get(res[0].insightUrl)
          .then((data) => {
            const labels = data
              .filter(d => d.period === 'day')[0]
              .values
              .map(date => moment(date.end_time.date).format('MMM DD'))

            const postReachData = data
              .filter(d => d.period === 'day')[0]
              .values
              .map(reach => reach.value)

            this.postReachChart.chartData.labels = labels
            this.postReachChart.chartData.datasets[0].data = postReachData
          })
      })
  },
  data () {
    return {
      postReachChart: {
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
