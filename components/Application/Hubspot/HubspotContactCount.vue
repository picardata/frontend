<template>
  <stats-card class="pcd">
    <!-- Card body -->
    <div class="row">
      <div class="col-sm-12">
        <h5 class="card-title mb-0 pcd">
          {{ title }}
        </h5>
      </div>
      <div class="col-sm-12 mt-3">
        <span class="h2 font-weight-bold mb-0">{{ contactsCount }}</span>
      </div>
    </div>

    <hr class="blue-divider mb-4">

    <p class="desc">
      {{ title }} Total Created
    </p>
  </stats-card>
</template>
<script>
export default {
  name: 'HubspotContactCount',
  props: {
    title: {
      type: String,
      default: 'Contacts'
    }
  },
  data () {
    return {
      stats: []
    }
  },
  computed: {
    contactsCount () {
      if (this.stats.length > 0) {
        return this.stats[0].total
      }
      return 0
    },
    contactsIncrease () {
      if (this.stats.length > 1) {
        const increase = (this.stats[0].total - this.stats[1].total) / this.stats[0].total
        return parseInt(increase * 100)
      }
      return 100
    }
  },
  mounted () {
    this.$axios.get('/api/hubspot/contacts/stats')
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
