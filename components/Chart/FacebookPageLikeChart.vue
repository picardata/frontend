<template>
  <line-chart
    :height="350"
    :chart-data="chartData"
  />
</template>

<script>
import moment from 'moment'
import LineChart from '~/components/argon-core/Charts/LineChart'
import { Charts } from '~/components/argon-core/Charts/config'

export default {
  components: {
    LineChart
  },
  async fetch () {
    const pageLike = await this.$axios.$get('/api/facebook/page-likes')

    if (pageLike.length > 0) {
      const pageLikeData = pageLike[0]
      const values = pageLikeData.values

      const labels = values.map(value => moment(value.end_time.date).format('MMM DD'))
      const data = values.map(value => value.value)

      this.chartData = {
        labels,
        datasets: [{
          label: 'Page Like',
          data,
          borderColor: Charts.colors.theme.warning
        }]
      }
    }
  },
  data () {
    return {
      chartData: null
    }
  }
}
</script>
