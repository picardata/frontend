<template>
  <pie-chart
    :height="350"
    :chart-data="totalIntegration.chartData"
    :extra-options="totalIntegration.extraOptions"
  />
</template>

<script>
import PieChart from '~/components/argon-core/Charts/PieChart'
import { Charts } from '~/components/argon-core/Charts/config'

function randomScalingFactor () {
  return Math.round(Math.random() * 100)
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default {
  components: {
    PieChart
  },
  async fetch() {
    const totalIntegrationResult = await this.$axios.$get('/api/integrations/total-users/stats')
    console.log('total integration result = ')
    console.log(totalIntegrationResult)
  },
  data () {
    return {
      totalIntegration: {
        chartData: {
          labels: [],
          datasets: [{
            data: [],
            backgroundColor: [],
            label: 'Dataset 1'
          }]
        },
        extraOptions: {
          responsive: true,
          legend: {
            position: 'top'
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      }
    }
  }
}
</script>
