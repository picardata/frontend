<template>
  <bar-chart
    :height="350"
    :chart-data="this.chartData"
    :extra-options="this.extraOptions"
  />
</template>

<script>
import moment from 'moment'
import BarChart from '~/components/argon-core/Charts/BarChart'
import { Charts } from '~/components/argon-core/Charts/config'

function getResponseData (dataParam) {
  if (dataParam.length > 0) {
    const dataRaw = dataParam[0]
    const values = dataRaw.values

    const labels = values.map(value => moment(value.end_time.date).format('MMM DD'))
    const data = values.map(value => value.value)

    return {
      labels,
      data
    }
  }

  return null
}

export default {
  components: {
    BarChart
  },
  async fetch () {
    try {
      const responses = await Promise.all([this.$axios.$get('/api/facebook/page-views'), this.$axios.$get('/api/facebook/videos-views')])
      const pageViewResponse = responses[0]
      const pageVideoViewResponse = responses[1]

      const viewResponse = getResponseData(pageViewResponse)
      const videoViewRespone = getResponseData(pageVideoViewResponse)

      this.chartData = {
        labels: viewResponse.labels,
        datasets: [{
          label: 'Page View',
          backgroundColor: Charts.colors.theme.danger,
          data: viewResponse.data
        }, {
          label: 'Page Video View',
          backgroundColor: Charts.colors.theme.primary,
          data: videoViewRespone.data
        }]
      }
    } catch (_) {}
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
