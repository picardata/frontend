<template>
  <stats-card
    title="Total Hubspot Contact"
    type="gradient-info"
    :sub-title="counter"
    icon="ni ni-chart-pie-35"
  >
    <template slot="footer">
      <span class="text-nowrap">Since last month</span>
    </template>
  </stats-card>
</template>

<script>
import StatsCard from '~/components/argon-core/Cards/StatsCard'

export default {
  components: {
    StatsCard
  },
  props: ['counter']
}
</script>
