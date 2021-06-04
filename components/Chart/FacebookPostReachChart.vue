<template>
    <line-chart
        :height="350"
        :chart-data="chartData"
    />
</template>

<script>
import LineChart from '~/components/argon-core/Charts/LineChart'
import { Charts } from '~/components/argon-core/Charts/config'
import moment from 'moment'

export default {
  components: {
    LineChart
  },
  async fetch () {
    const postReachsResponse = await this.$axios.$get('/api/facebook/post-reach')

    if(postReachsResponse.length > 0) {
      const postReachData = postReachsResponse[0]
      const values = postReachData.values

      const labels = values.map(value => moment(value.end_time.date).format('MMM DD'))
      const data = values.map(value => value.value) 

      this.chartData = {
        labels,
        datasets: [{
          label: 'Post Reach',
          data,
          borderColor: Charts.colors.theme.primary
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
