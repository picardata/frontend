<template>
  <bar-chart
    :height="350"
    :chart-data="this.chartData"
    :extra-options="this.extraOptions"
  />
</template>

<script>
import BarChart from '~/components/argon-core/Charts/BarChart'
import { Charts } from '~/components/argon-core/Charts/config'

export default {
  components: {
    BarChart
  },
  props: ['values'],
  data () {
    return {
      chartData: null,
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
  },
  mounted () {
    if (this.values) {
      const pageView = this.values.pageView
      const pageVideoView = this.values.pageVideoView
      this.chartData = {
        labels: pageView.labels,
        datasets: [{
          label: 'Page View',
          backgroundColor: Charts.colors.theme.danger,
          data: pageView.data
        }, {
          label: 'Page Video View',
          backgroundColor: Charts.colors.theme.primary,
          data: pageVideoView.data
        }]
      }
    }
  }
}
</script>
