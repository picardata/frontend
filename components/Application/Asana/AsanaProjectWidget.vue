<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-9">
          <h3>Projects</h3>
        </div>
        <div class="col-auto text-right">
          <a class="btn btn-sm btn-primary" target="_blank" href="https://app.asana.com/0/projects/new/blank">Create a
            Project</a>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="list-group list-group-flush">
        <a
          v-for="(project, index) in projects"
          :key="index"
          target="_blank"
          :href="project.permalinkUrl"
          class="list-group-item list-group-item-action"
        >
          <div class="row align-items-center">
            <div class="col ml--2">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h4 class="mb-0 text-sm">{{ project.name }}</h4>
                </div>
                <div class="text-right text-muted">
                  <a :href="project.permalinkUrl" target="_blank" class="btn btn-sm btn-secondary">View</a>
                </div>
              </div>
              <p class="text-sm mb-0">{{ project.notes | truncate(90, '...') }}</p>
              <p class="text-sm mb-0">{{ $moment(project.startOn).calendar() }} - {{
                $moment(project.dueOn).calendar()
              }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AsanaProjectWidget',
  data () {
    return {
      projects: {}
    }
  },
  mounted () {
    this.$axios.get('/api/asana/projects')
      .then((data) => {
        console.log(data)
        this.projects = data.data
      })
  }
}
</script>

<style scoped>

</style>
