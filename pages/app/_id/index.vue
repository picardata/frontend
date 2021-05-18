<template>
  <div class="mt-5">
    <div class="row">
      <div class="col-2">
        <img class="logo" :src="data.application.logo" alt="Logo">
      </div>
    </div>
    <div class="row mt-5">
      <ul id="pills-tab" class="nav nav-pills mb-3" role="tablist">
        <li class="nav-item">
          <a
            id="pills-general-tab"
            class="nav-link active"
            data-toggle="pill"
            href="#pills-general"
            role="tab"
            aria-controls="pills-general"
            aria-selected="true"
          >General</a>
        </li>
        <li class="nav-item">
          <a
            id="pills-settings-tab"
            class="nav-link"
            data-toggle="pill"
            href="#pills-settings"
            role="tab"
            aria-controls="pills-settings"
            aria-selected="false"
          >Settings</a>
        </li>
        <li class="nav-item">
          <a
            id="pills-users-tab"
            class="nav-link"
            data-toggle="pill"
            href="#pills-users"
            role="tab"
            aria-controls="pills-users"
            aria-selected="false"
          >Users</a>
        </li>
      </ul>
      <div id="pills-tabContent" class="tab-content">
        <div id="pills-general" class="tab-pane fade show active" role="tabpanel" aria-labelledby="pills-general-tab">
          <div class="row">
            <h4>{{ data.application.detail }}</h4>
          </div>
        </div>
        <div id="pills-settings" class="tab-pane fade" role="tabpanel" aria-labelledby="pills-settings-tab">
          Settings
        </div>
        <div id="pills-users" class="tab-pane fade" role="tabpanel" aria-labelledby="pills-users-tab">
          <GoogleUserList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import GoogleUserList from '~/components/Application/Google/GoogleUserList.vue'
import loaderMixin from '~/mixins/loader'

export default {
  components: {
    GoogleUserList
  },
  mixins: [
    loaderMixin
  ],
  async asyncData (context) {
    return await context.app.$axios.get('/api/integrations/' + context.route.params.id)
      .then((data) => {
        return {
          data: data.data
        }
      })
  }
}
</script>

<style scoped>
img.logo {
  width: 100px;
}
</style>
