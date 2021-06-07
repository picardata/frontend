export default {
  data () {
    return {
      dealsChart: {
        dealStage: 'allstages',
        loaded: false,
        labels: [],
        datasets: [{ data: [] }]
      }
    }
  },
  methods: {
    async getHubspotChartDealsData () {
      const labels = []
      const chartData = []
      await this.$axios.get('/api/hubspot/deals/stats', {
        params: {
          month: this.$moment().format('M'),
          year: this.$moment().format('Y')
        }
      })
        .then((data) => {
          data.data.map((deal) => {
            const l = deal.dealStage
            if (!labels.includes(l)) {
              labels.push(l)
              chartData.push(deal.total)
            } else {
              const i = labels.indexOf(l)
              chartData[i] += deal.total
            }
          })

          this.dealsChart.labels = labels
          this.dealsChart.datasets[0].data = chartData

          this.dealsChart.loaded = true
        })
    }
  }
}
