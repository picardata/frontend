<template>
  <div>
    <ApplicationManageDetail :crumbs="crumbs" :data="data" />
    <div class="container-fluid mt-3">
      <div class="row mt-5">
        <ul id="pills-tab" class="nav mb-3" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              href="#overview"
            >Overview</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#account"
            >Account</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#users"
            >Users</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#groups"
            >Groups</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#settings"
            >Settings</a>
          </li>
        </ul>
      </div>
      <div class="row">
        <div class="card col-12 mt-3">
          <div class="card-body">
            <div class="card-title">
              <h4 id="overview">
                Overview
              </h4>
            </div>
            <div class="card-text">
              <h5>Not Supported</h5>
            </div>
          </div>
        </div>
        <div class="card col-12 mt-3">
          <div class="card-body">
            <div class="card-title">
              <h4 id="account">
                Account
              </h4>
            </div>
            <div class="card-text">
              <h5>Not Supported</h5>
            </div>
          </div>
        </div>
        <GoogleUserList />
        <GoogleGroupList />
        <div class="card col-12 mt-3">
          <div class="card-body">
            <div class="card-title">
              <h4 id="settings">
                Settings
              </h4>
            </div>
            <div class="card-text">
              <div class="row">
                <div class="col-12">
                  <h4>Uninstall App</h4>
                  <p>Remove <span class="font-weight-bolder">{{ data.application.name }}</span> from Picardata and prevent members from using it.</p>
                  <base-button type="primary" @click="modals.uninstall = true">
                    Uninstall {{ data.application.name }}
                  </base-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card col-12 mt-3">
          <div class="card-body">
            <div class="card-title">
              <h4 id="settings">
                Manual Sync
              </h4>
            </div>
            <div class="card-text">
              <div class="row">
                <div class="col-12">
                  <base-button type="primary" @click="syncGoogleUsers">
                    Sync Google Users
                  </base-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :show.sync="modals.uninstall">
      <template slot="header">
        <h5 class="modal-title">
          Uninstall {{ this.data.application.name }}
        </h5>
      </template>
      <div>
        Are you sure you want to uninstall {{ this.data.application.name }}?
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="modals.uninstall = false">
          Cancel
        </base-button>
        <base-button type="primary" @click.prevent="deleteModal">
          Uninstall
        </base-button>
      </template>
    </modal>
  </div>
</template>

<script>

import GoogleUserList from '~/components/Application/Google/GoogleUserList.vue'
import GoogleGroupList from '~/components/Application/Google/GoogleGroupList.vue'
import ApplicationManageDetail from '~/components/Application/ApplicationManageDetail'
import loaderMixin from '~/mixins/loader'

export default {
  layout: 'argon',
  components: {
    GoogleUserList,
    GoogleGroupList,
    ApplicationManageDetail
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
  },
  data () {
    return {
      dialog: true,
      modals: {
        uninstall: false
      },
      crumbs: [
        {
          name: 'Apps',
          path: '/apps'
        },
        {
          name: 'Integrated Apps',
          path: '/apps/integrated-apps'
        },
        {
          name: 'Google',
          path: '/apps/integrated-apps/' + this.$route.params.id + '/google-admin'
        },
        {
          name: 'Manage Google',
          path: '/apps/integrated-apps'
        }
      ]
    }
  },
  methods: {
    deleteModal () {
      this.$axios.delete('/api/integrations/' + this.data.id)
        .then(res => console.log(res))
        .catch(e => console.log(e))
      this.$router.push('/apps/integrated-apps')
    },
    async syncGoogleUsers () {
      await this.$axios.$post('/api/integration-users/google-integration-users')
    }
  }
}
</script>
<style scoped>
.card-title h4  {
  font-size: 28px;
}
</style>
/api/integration-users/google-integration-users
