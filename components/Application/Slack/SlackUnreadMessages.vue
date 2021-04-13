<template>
  <div class="card col-12 mt-3">
    <div class="card-body">
      <div class="card-title">
        <div class="row">
          <div class="col-6">
            <h4 id="channels">
              Unread Messages ({{ messageCount }})
            </h4>
          </div>
          <div class="col-6" />
        </div>
      </div>
      <div class="card-text">
        <div class="row">
          <ul class="list-channel">
            <li v-for="(message, index) in messages" :key="index" class="list-group-item border-0">
              <a :href="'https://app.slack.com/client/' + message.team_id + '/' + message.id " class="text-dark" target="_blank">
                <div class="media align-items-center">
                  <span class="avatar avatar-sm rounded-circle">
                    <img
                      :alt="message.user_name"
                      :src="message.profilePic"
                    ></span>
                  <div class="media-body ml-2 d-none d-lg-block">
                    <span
                      class="mb-0 text-sm  font-weight-bold"
                    >{{ message.user_name }} <badge rounded type="danger">{{ message.unreadCount }}</badge>
                    </span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlackUnreadMessages',
  data () {
    return {
      users: [],
      messages: []
    }
  },
  computed: {
    messageCount () {
      return this.messages.length
    }
  },
  mounted () {
    this.$axios.get('/api/slack/users')
      .then((data) => {
        this.users = data.data.users
      }).catch(
        (e) => {
          // eslint-disable-next-line no-console
          console.log(e)
        }
      )

    this.$axios.get('/api/slack/messages')
      .then((data) => {
        this.messages = data.data
        this.reformatMessage()
      }).catch(
        (e) => {
          // eslint-disable-next-line no-console
          console.log(e)
        }
      )
  },
  methods: {
    reformatMessage () {
      const self = this

      const newMessages = []
      this.messages.forEach(function (message) {
        const result = self.users.find((user) => {
          return user.id === message.user_id
        })

        message.user_name = result.realName
        message.profilePic = result.profilePic
        newMessages.push(message)
      })

      console.log(newMessages)
      this.messages = newMessages
    }
  }
}
</script>
<style scoped>
.card-title h4 {
  font-size: 28px;
}
</style>
