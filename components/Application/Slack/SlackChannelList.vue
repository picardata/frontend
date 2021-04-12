<template>
  <div class="card col-12 mt-3">
    <div class="card-body">
      <div class="card-title">
        <div class="row">
          <div class="col-6">
            <h4 id="channels">
              Channels ({{ channels.length }})
            </h4>
          </div>
          <div class="col-6">
            <a
              class="nav-link fa-pull-right"
              href="#users"
              @click.prevent="createNewChannel"
            >
              <font-awesome-icon
                fixed-width
                :icon="['fas', 'plus']"
              />
              Create New Channel</a>
          </div>
        </div>
      </div>
      <div class="card-text">
        <div class="row">
          <ul class="list-channel">
            <li v-for="(channel, index) in channels" :key="index" class="list-channel-item border-0">
              <a href="#" class="text-dark">{{ channel.name }} {{ channel.topic.trim() === '' ? '' : '( ' + channel.topic + ')' }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlackChannelList',
  mounted () {
    this.$axios.get('/api/slack/channels')
      .then((data) => {
        // eslint-disable-next-line no-console
        this.channels = data.data
      }).catch(
        (e) => {
        // eslint-disable-next-line no-console
          console.log(e)
        }
      )
  },
  data () {
    return {
      channels: []
    }
  }
}
</script>
<style scoped>
.card-title h4 {
  font-size: 28px;
}
</style>
