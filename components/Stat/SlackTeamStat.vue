<template>
  <stats-card
    title="Total Slack Team"
    type="gradient-red"
    :sub-title="counter"
    icon="ni ni-active-40"
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
