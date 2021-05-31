<template>
  <pie-chart
    :height="350"
    :chart-data="financial.chartData"
    :extra-options="financial.extraOptions"
  />
</template>

<script>
import PieChart from '~/components/argon-core/Charts/PieChart'
import { Charts } from '~/components/argon-core/Charts/config'

function randomScalingFactor () {
  return Math.round(Math.random() * 100)
}

export default {
  components: {
    PieChart
  },
  data () {
    return {
      financial: {
        chartData: {
          labels: [
            'Danger',
            'Warning',
            'Success',
            'Primary',
            'Info'
          ],
          datasets: [{
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ],
            backgroundColor: [
              Charts.colors.theme.danger,
              Charts.colors.theme.warning,
              Charts.colors.theme.success,
              Charts.colors.theme.primary,
              Charts.colors.theme.info
            ],
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
