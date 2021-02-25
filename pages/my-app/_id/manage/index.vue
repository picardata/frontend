<template>
  <div>
    <PrevPage />
    <ApplicationDetail :logo="data.application.logo" :name="data.application.name" :detail="data.application.detail" :detail-page="false" />
    <div class="row mt-5">
      <ul id="pills-tab" class="nav mb-3" role="tablist">
        <li class="nav-item">
          <a
            id="pills-overview-tab"
            class="nav-link active"
            data-toggle="pill"
            href="#pills-overview"
            role="tab"
            aria-controls="pills-overview"
            aria-selected="true"
          >Overview</a>
        </li>
        <li class="nav-item">
          <a
            id="pills-account-tab"
            class="nav-link"
            data-toggle="pill"
            href="#pills-account"
            role="tab"
            aria-controls="pills-account"
            aria-selected="false"
          >Account</a>
        </li>
        <li class="nav-item">
          <a
            id="pills-members-tab"
            class="nav-link"
            data-toggle="pill"
            href="#pills-members"
            role="tab"
            aria-controls="pills-members"
            aria-selected="false"
          >Members</a>
        </li>
        <li class="nav-item">
          <a
            id="pills-teams-tab"
            class="nav-link"
            data-toggle="pill"
            href="#pills-teams"
            role="tab"
            aria-controls="pills-teams"
            aria-selected="false"
          >Teams</a>
        </li>
      </ul>
      <div id="pills-tabContent" class="tab-content col-12">
        <div id="pills-overview" class="tab-pane fade show active" role="tabpanel" aria-labelledby="pills-overview-tab">
          <div class="row">
            <p>Coming soon</p>
          </div>
        </div>
        <div id="pills-account" class="tab-pane fade" role="tabpanel" aria-labelledby="pills-account-tab">
          <div class="row">
            <div class="col-12">
              <p>Coming soon</p>
            </div>
          </div>
        </div>
        <div id="pills-members" class="tab-pane fade col-12" role="tabpanel" aria-labelledby="pills-members-tab">
          <div class="row">
            <GoogleUserList />
          </div>
        </div>
        <div id="pills-teams" class="tab-pane fade col-12" role="tabpanel" aria-labelledby="pills-teams-tab">
          <div class="row">
            <p>Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import GoogleUserList from '~/components/Application/Google/GoogleUserList.vue'
import ApplicationDetail from '~/components/Application/ApplicationDetail'
import PrevPage from '~/components/PrevPage'

export default {
  components: {
    PrevPage,
    GoogleUserList,
    ApplicationDetail
  },
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
