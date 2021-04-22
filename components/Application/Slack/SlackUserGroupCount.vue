<template>
  <stats-card class="pcd">
    <!-- Card body -->
    <div class="row">
      <div class="col-sm-12">
        <h5 class="card-title mb-0 pcd">
          User Groups
        </h5>
      </div>
      <div class="col-sm-12 mt-3">
        <span class="h2 font-weight-bold mb-0">{{ userGroupsCount }}</span>
      </div>
    </div>

    <hr class="blue-divider mb-4" />

    <p class="desc">User Groups Total Created</p>
  </stats-card>
</template>
<script>
export default {
  name: 'SlackUserGroupCount',
  data () {
    return {
      stats: []
    }
  },
  computed: {
    userGroupsCount () {
      if (this.stats.length > 0) {
        return this.stats[0].total
      }
      return 0
    },
    userGroupsIncrease () {
      if (this.stats.length > 1) {
        const increase = (this.stats[0].total - this.stats[1].total) / this.stats[0].total
        return parseInt(increase * 100)
      }
      return 100
    }
  },
  mounted () {
    this.$axios.get('/api/slack/user-groups/stats')
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
