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
    const pagePostEngagement = await this.$axios.$get('/api/facebook/post-engagements')

    if (pagePostEngagement.length > 0) {
      const pagePostEngagementData = pagePostEngagement[0]
      const values = pagePostEngagementData.values

      const labels = values.map(value => moment(value.end_time.date).format('MMM DD'))
      const data = values.map(value => value.value)

      this.chartData = {
        labels,
        datasets: [{
          label: 'Page Post Engagement',
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
