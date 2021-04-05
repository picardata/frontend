<template>
  <div>
    <card>
      <template slot="header">
        <!-- Subtitle -->
        <h6 class="surtitle">
          Overview
        </h6>
        <!-- Title -->
        <h5 class="h3 mb-0">
          Videos Views
        </h5>
      </template>
      <div class="chart">
        <line-chart
          :height="350"
          :chart-data="chartdata"
        />
      </div>
    </card>
  </div>
</template>
<script>
import LineChart from '~/components/argon-core/Charts/LineChart'

export default {
  name: 'VideosViews',
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
