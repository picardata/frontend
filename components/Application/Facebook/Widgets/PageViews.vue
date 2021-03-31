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
          Page Views
        </h5>
      </template>
      <div class="chart">
        <line-chart
          :height="350"
          :chart-data="pageViewsChart.chartData"
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
  name: 'PageViews',
  components: { LineChart },
  async fetch () {
    await this.$axios.$get('/api/facebook/page-views')
      .then((data) => {
        const labels = data
          .filter(d => d.period === 'day')[0]
          .values
          .map(date => moment(date.end_time.date).format('MMM DD'))

        const pageViewsData = data
          .filter(d => d.period === 'day')[0]
          .values
          .map(view => view.value)

        this.pageViewsChart.chartData.labels = labels
        this.pageViewsChart.chartData.datasets[0].data = pageViewsData
      })
  },
  data () {
    return {
      pageViewsChart: {
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
