<template>
  <div>
    <card class="pcd">
      <div class="row">
        <div class="col-sm-8">
          <h2>Deals</h2>
        </div>
      </div>
      <div class="row">
        <span class="col-sm-12">{{ dealStageFormat(dealStage) }}</span>
      </div>
      <div class="row mt-4">
        <div class="col-sm-12">
          <div class="chart">
            <bar-chart
              :height="300"
              :chart-data="chartData"
            />
          </div>
        </div>
      </div>
    </card>
  </div>
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
