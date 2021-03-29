<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-9">
          <h3>Meetings</h3>
        </div>
        <div class="col-auto text-right">
          <a class="btn btn-sm btn-primary" target="_blank" href="https://zoom.us/meeting/schedule">Schedule a
            Meeting</a>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="list-group list-group-flush">
        <a
          v-for="(meeting, index) in meetings"
          :key="index"
          target="_blank"
          :href="'https://zoom.us/meeting/' + meeting.id"
          class="list-group-item list-group-item-action"
        >
          <div class="row align-items-center">
            <div class="col ml--2">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h4 class="mb-0 text-sm">{{ meeting.topic }}</h4>
                </div>
                <div class="text-right text-muted">
                  <a :href="meeting.joinUrl" target="_blank" class="btn btn-sm btn-secondary">Join</a>
                  <a :href="'https://zoom.us/meeting/' + meeting.id" target="_blank" class="btn btn-sm btn-secondary">View</a>
                </div>
              </div>
              <p class="text-sm mb-0">{{ $moment(meeting.startTime).calendar() }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZoomMeetingWidget',
  data () {
    return {
      meetings: {}
    }
  },
  mounted () {
    this.$axios.get('/api/zoom/meetings')
      .then((data) => {
        console.log(data)
        this.meetings = data.data
      })
  }
}
</script>

<style scoped>

</style>
