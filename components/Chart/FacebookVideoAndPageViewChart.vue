<template>
  <bar-chart
    :height="350"
    :chart-data="videoAndPageView.chartData"
    :extra-options="videoAndPageView.extraOptions"
  />
</template>

<script>
import moment from 'moment'
import BarChart from '~/components/argon-core/Charts/BarChart'
import { Charts } from '~/components/argon-core/Charts/config'

function randomScalingFactor () {
  return Math.round(Math.random() * 100)
}

export default {
  components: {
    BarChart
  },
  async fetch () {
    // const postReachsResponse = await this.$axios.$get('/api/facebook/post-reach')

    // if (postReachsResponse.length > 0) {
    //   const postReachData = postReachsResponse[0]
    //   const values = postReachData.values

    //   const labels = values.map(value => moment(value.end_time.date).format('MMM DD'))
    //   const data = values.map(value => value.value)

    //   this.chartData = {
    //     labels,
    //     datasets: [{
    //       label: 'Post Reach',
    //       data,
    //       borderColor: Charts.colors.theme.primary
    //     }]
    //   }
    // }
  },
  data () {
    return {
      videoAndPageView: {
        chartData: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Dataset 1',
            backgroundColor: Charts.colors.theme.danger,
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          }, {
            label: 'Dataset 2',
            backgroundColor: Charts.colors.theme.primary,
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          }, {
            label: 'Dataset 3',
            backgroundColor: Charts.colors.theme.success,
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          }]

        },
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
}
</script>

