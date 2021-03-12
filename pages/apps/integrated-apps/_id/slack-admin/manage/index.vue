<template>
  <div>
    <base-header type="white" class="p-0">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <route-breadcrumb :crumbs="crumbs" />
          </nav>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt-3">
      <ApplicationDetail
        :logo="data.application.logo"
        :name="data.application.name"
        :detail="data.application.detail"
        :instruction="data.application.instruction"
        :detail-page="false"
      />
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
              href="#channels"
            >Channels</a>
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
        <SlackUserList />
        <SlackChannelList />
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
                  <base-button type="primary" @click="modals.modal0 = true">
                    Uninstall {{ data.application.name }}
                  </base-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :show.sync="modals.modal0">
      <template slot="header">
        <h5 id="exampleModalLabel" class="modal-title">
          Uninstall {{ this.data.application.name }}
        </h5>
      </template>
      <div>
        Are you sure you want to uninstall {{ this.data.application.name }}?
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="modals.modal0 = false">
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

import SlackChannelList from '@/components/Application/Slack/SlackChannelList'
import SlackUserList from '@/components/Application/Slack/SlackUserList'
import ApplicationDetail from '~/components/Application/ApplicationDetail'

export default {
  layout: 'argon',
  components: {
    SlackUserList,
    SlackChannelList,
    ApplicationDetail
  },
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
        modal0: false
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
          name: 'Slack',
          path: '/apps/integrated-apps/' + this.$route.params.id + '/slack-admin'
        },
        {
          name: 'Manage Slack',
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
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
.card-title h4 {
  font-size: 28px;
}
</style>
