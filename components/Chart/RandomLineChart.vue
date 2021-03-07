<template>
  <div class="small">
    <div class="text-left p-3">
      <h6>Inbound Conversion</h6>
    </div>
    <line-chart :chart-data="datacollection" />
  </div>
</template>

<script>
import LineChart from '../argon-core/Charts/LineChart'

export default {
  components: {
    LineChart
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
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        responsive: true,
        datasets: [
          {
            label: 'Twitter',
            borderColor: '#f87979',
            fill: false,
            data: [{
              x: this.getRandomInt(),
              y: this.getRandomInt()
            },
            {
              x: this.getRandomInt(),
              y: this.getRandomInt()
            },
            {
              x: this.getRandomInt(),
              y: this.getRandomInt()
            },
            {
              x: this.getRandomInt(),
              y: this.getRandomInt()
            }]
          }, {
            label: 'Facebook',
            borderColor: '#04c6ff',
            fill: false,
            data: [{
              x: this.getRandomInt(),
              y: this.getRandomInt()
            },
            {
              x: this.getRandomInt(),
              y: this.getRandomInt()
            },
            {
              x: this.getRandomInt(),
              y: this.getRandomInt()
            },
            {
              x: this.getRandomInt(),
              y: this.getRandomInt()
            }]
          }
        ]
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
