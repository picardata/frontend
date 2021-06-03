<template>
  <stats-card
    title="Total Facebook Page Follower"
    type="gradient-info"
    :sub-title="this.facebookFollowerCount"
    icon="ni ni-chart-bar-32"
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
  async fetch () {
    const pageFollowerResponse = await this.$axios.$get('/api/facebook/page-followers')

    this.facebookFollowerCount = pageFollowerResponse.followers_count
  },
  data () {
    return {
      facebookFollowerCount: 0
    }
  }
}
</script>
