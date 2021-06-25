<template>
  <bar-chart
    :height="350"
    :chart-data="barChartData"
  />
</template>

<script>
import BarChart from '~/components/argon-core/Charts/BarChart'

export default {
  name: 'HubspotDealChart',
  components: { BarChart },
  props: {
    dealStage: String,
    chartData: Object
  },
  computed: {
    barChartData () {
      return {
        datasets: this.chartData.datasets,
        labels: this.chartData.labels.map((label) => {
          return this.dealStageFormat(label)
        })
      }
    }
  },
  methods: {
    dealStageFormat (stage) {
      const stages = {
        appointmentscheduled: 'Appointment scheduled',
        qualifiedtobuy: 'Qualified to buy',
        presentationscheduled: 'Presentation scheduled',
        decisionmakerboughtin: 'Decision maker bought-In',
        contractsent: 'Contract sent',
        closedwon: 'Closed won',
        closedlost: 'Closed lost',
        allstages: 'All stages'
      }

      return stages[stage]
    }

  }
}
</script>
