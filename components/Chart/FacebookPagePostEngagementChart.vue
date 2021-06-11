<template>
  <line-chart
    :height="350"
    :chart-data="chartData"
  />
</template>

<script>
import LineChart from '~/components/argon-core/Charts/LineChart'
import { Charts } from '~/components/argon-core/Charts/config'

export default {
  components: {
    LineChart
  },
  mounted () {
    if(this.values) {
      this.chartData = {
          labels: this.values.labels,
          datasets: [{
            label: 'Page Post Engagement',
            data: this.values.data,
            borderColor: Charts.colors.theme.warning
          }]
      }
    }
  },
  props: ["values"],
  data () {
    return {
      chartData: null
    }
  }
}
</script>
