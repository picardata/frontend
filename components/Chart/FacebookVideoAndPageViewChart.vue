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
  props: ['viewValues', 'videoViewValues'],
  mount () {
    this.chartData = {
      labels: this.viewValues.labels,
      datasets: [{
        label: 'Page View',
        backgroundColor: Charts.colors.theme.danger,
        data: this.viewValues.data
      }, {
        label: 'Page Video View',
        backgroundColor: Charts.colors.theme.primary,
        data: this.videoViewValues.data
      }]
    }
  },
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
  }
}
</script>
