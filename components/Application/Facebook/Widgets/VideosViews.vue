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
          Videos Views
        </h5>
      </template>
      <div class="chart">
        <line-chart
          :height="350"
          :chart-data="videosViewsChart.chartData"
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
  name: 'VideosViews',
  components: { LineChart },
  async fetch () {
    await this.$axios.$get('/api/facebook/videos-views')
      .then((data) => {
        const labels = data
          .filter(d => d.period === 'day')[0]
          .values
          .map(date => moment(date.end_time.date).format('MMM DD'))

        const videosViewsData = data
          .filter(d => d.period === 'day')[0]
          .values
          .map(view => view.value)

        this.videosViewsChart.chartData.labels = labels
        this.videosViewsChart.chartData.datasets[0].data = videosViewsData
      })
  },
  data () {
    return {
      videosViewsChart: {
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
