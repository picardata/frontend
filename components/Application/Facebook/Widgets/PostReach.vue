<template>
  <div>
    <card class="pcd">
      <div class="row">
        <div class="col-sm-8">
          <h2>Reachs</h2>
        </div>
        <div class="col-sm-4">
          <span class="text-primary desc">This month <span class="pd-icon pdicon-Chevron-Down text-primary"></span></span>
        </div>
      </div>
      <div class="row">
        <span class="col-sm-12">Post Reachs</span>
      </div>
      <div class="row mt-4">
        <div class="col-sm-8">
          <div class="chart">
            <line-chart
                :height="150"
                :chart-data="chartdata"
            >
            </line-chart>
          </div>
        </div>
        <div class="col-sm-4">
          <h1 class="desc-title mb-0">18.8k</h1>
          <span class="desc">Increases 53%</span>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import LineChart from '~/components/argon-core/Charts/LineChart'

export default {
  name: 'PostReach',
  components: { LineChart },
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  }
}
</script>
