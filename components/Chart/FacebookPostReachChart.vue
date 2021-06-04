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
  async fetch () {
    const totalIntegrationResult = await this.$axios.$get('/api/integrations/total-users/stats')
  },
  data () {
    return {
        chartData: {
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Performance',
                data: [100, 20, 10, 30, 15, 40, 20, 60, 60],
                borderColor: Charts.colors.theme.primary
            }]
        }
    }
  }
}
</script>
