<template>
  <pie-chart
    :height="350"
    :chart-data="chartData"
    :extra-options="totalIntegration.extraOptions"
  />
</template>

<script>
import PieChart from '~/components/argon-core/Charts/PieChart'

function getRandomColor () {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export default {
  components: {
    PieChart
  },
  async fetch () {
    const totalIntegrationResult = await this.$axios.$get('/api/integrations/total-users/stats')
    console.log('total integration result = ')
    console.log(totalIntegrationResult)

    const labels = []
    const data = []
    const backgroundColor = []

    for (let i = 0; i < totalIntegrationResult.length; i++) {
      const totalIntegration = totalIntegrationResult[i]

      labels.push(totalIntegration.name)
      data.push(totalIntegration.totalIntegration)
      backgroundColor.push(getRandomColor())
    }

    this.chartData = {
      labels,
      datasets: [{
        data,
        backgroundColor,
        label: 'Total user this year'
      }]
    }

    console.log(this.chartData)
  },
  data () {
    return {
      chartData: null,
      totalIntegration: {
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
