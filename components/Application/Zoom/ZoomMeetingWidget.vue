<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-9">
          <div class="row">
            <div class="col-3">
              <h3>Meetings</h3>
            </div>
            <div v-if="totalUpcomingMeeting" class="col-9 total-meeting">
              <div class="rounded-rectangular">
                <span class="font-weight-bold d-inline" style="margin-left:8px">{{ totalUpcomingMeeting }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-auto text-right">
          <a class="btn btn-sm btn-primary" target="_blank" href="https://zoom.us/meeting/schedule">Schedule a
            Meeting</a>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="list-group list-group-flush">
        <div
          v-for="(meeting, index) in meetings"
          :key="index"
        >
          <a
            v-if="meeting.upcoming === true"
            target="_blank"
            :href="'https://zoom.us/meeting/' + meeting.id"
            class="list-group-item list-group-item-action"
          >
            <div class="row align-items-center">
              <div class="col ml--2">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 class="mb-0 text-sm">{{ meeting.topic }} <span v-if="meeting.upcoming === true" style="color:red;">*</span></h4>
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
  </div>
</template>

<script>
export default {
  name: 'ZoomMeetingWidget',
  data () {
    return {
      meetings: []
    }
  },
  computed: {
    totalUpcomingMeeting () {
      if (this.meetings.length !== 0) {
        return this.meetings.filter((meeting) => {
          return meeting.upcoming === true
        }).length
      } else {
        return 0
      }
    },
    timeZone () {
      if (this.meetings.length !== 0) {
        return this.meetings.map((meeting) => {
          return meeting.timezone
        })[0]
      } else {
        return Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    },
    today () {
      return new Date().toLocaleString({ timeZone: this.timeZone })
    }
  },
  mounted () {
    this.$axios.get('/api/zoom/meetings')
      .then((data) => {
        console.log(data)
        this.meetings = data.data.map((meeting) => {
          const startTime = new Date(meeting.startTime).toLocaleString({ timeZone: this.timeZone })
          if (new Date(startTime) >= new Date(this.today)) {
            meeting.upcoming = true
          } else {
            meeting.upcoming = false
          }
          return meeting
        })
      })
  }
}
</script>

<style scoped>
.rounded-rectangular {
  margin-left: 6px;
  height:24px;
  width:30px;
  background-color:#3AAF85;
  color:white;
  border-radius:14%;
}

.total-meeting {
  margin-left:-54px;
  margin-top:2px;
}
</style>
