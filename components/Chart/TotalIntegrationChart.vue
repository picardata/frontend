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
  fetch () {
    this.$axios.$get('/api/integrations/total-users/stats')
      .then((res) => {
        const totalIntegrationResult = res

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
      })
      .finally(() => {
        this.$store.commit('loader/loading', false)
      })
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
