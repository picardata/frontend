<template>
  <stats-card
    title="Sales"
    type="gradient-green"
    :sub-title="this.counter"
    icon="ni ni-money-coins"
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
