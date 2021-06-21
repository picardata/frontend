<template>
  <line-chart
    :height="350"
    :chart-data="this.chartData"
  />
</template>

<script>
import LineChart from '~/components/argon-core/Charts/LineChart'
import { Charts } from '~/components/argon-core/Charts/config'

export default {
  components: {
    LineChart
  },
  data () {
    return {
      chartData: null
    }
  },
  props: ['values'],
  mounted () {
    if (this.values) {
      const labels = this.values.labels
      const data = this.values.data
      this.chartData = {
        labels,
        datasets: [{
          label: 'Post Reach',
          data,
          borderColor: Charts.colors.theme.primary
        }]
      }
    }
  }
}
</script>
