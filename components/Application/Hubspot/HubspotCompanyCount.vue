<template>
  <stats-card>
    <!-- Card body -->
    <div class="row">
      <div class="col">
        <h5 class="card-title text-uppercase text-muted mb-0">
          Total companies
        </h5>
        <span class="h2 font-weight-bold mb-0">{{ companiesCount }}</span>
      </div>
      <div class="col-auto">
        <div class="icon icon-shape bg-blue text-white rounded-circle shadow">
          <i class="ni ni-building" />
        </div>
      </div>
    </div>
    <p class="mt-3 mb-0 text-sm">
      <span class="text-success mr-2"><i class="fa fa-arrow-up" /> {{ companiesIncrease }}%</span>
      <span class="text-nowrap">Since last month</span>
    </p>
  </stats-card>
</template>
<script>
export default {
  name: 'HubspotCompanyCount',
  data () {
    return {
      stats: []
    }
  },
  computed: {
    companiesCount () {
      if (this.stats.length > 0) {
        return this.stats[0].total
      }
      return 0
    },
    companiesIncrease () {
      if (this.stats.length > 1) {
        const increase = (this.stats[0].total - this.stats[1].total) / this.stats[0].total
        return parseInt(increase * 100)
      }
      return 100
    }
  },
  mounted () {
    this.$axios.get('/api/hubspot/companies/stats')
      .then((data) => {
        // eslint-disable-next-line no-console
        console.log(data.data)
        this.stats = data.data
      }).catch(
        (e) => {
        // eslint-disable-next-line no-console
          console.log(e)
        }
      )
  }
}
</script>
<style scoped>
.card-title h4 {
  font-size: 28px;
}
</style>
