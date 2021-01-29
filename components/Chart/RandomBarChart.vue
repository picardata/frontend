<template>
  <div class="small">
    <div class="text-left p-3">
      <h6>Inbound Conversion</h6>
    </div>
    <bar-chart :chart-data="datacollection" />
  </div>
</template>

<script>
import BarChart from './BarChart'

export default {
  components: {
    BarChart
  },
  data () {
    return {
      datacollection: null
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.datacollection = {
        label: 'Sales',
        responsive: true,
        datasets: [{
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          data: [10, 20, 30, 40, 50, 60, 70]
        }]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (1000 - 50 + 10)) + 5
    }
  }
}
</script>

<style>
  .small {
    max-width: 600px;
  }

  canvas {
    /* height:200px !important; */
  }
</style>
