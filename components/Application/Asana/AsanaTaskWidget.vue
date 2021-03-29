<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-9">
          <h3>Tasks</h3>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="list-group list-group-flush">
        <a
          v-for="(task, index) in tasks"
          :key="index"
          target="_blank"
          :href="task.permalinkUrl"
          class="list-group-item list-group-item-action"
        >
          <div class="row align-items-center">
            <div class="col ml--2">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h4 class="mb-0 text-sm">{{ task.name }}</h4>
                </div>
                <div class="text-right text-muted">
                  <a :href="task.permalinkUrl" target="_blank" class="btn btn-sm btn-secondary">View</a>
                </div>
              </div>
              <p class="text-sm mb-0">{{ task.notes | truncate(90, '...') }}</p>
              <p class="text-sm mb-0">{{ $moment(task.startOn).calendar() }} - {{ $moment(task.dueOn).calendar() }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AsanaTasksWidget',
  data () {
    return {
      tasks: {}
    }
  },
  mounted () {
    this.$axios.get('/api/asana/tasks')
      .then((data) => {
        console.log(data)
        this.tasks = data.data
      })
  }
}
</script>

<style scoped>

</style>
