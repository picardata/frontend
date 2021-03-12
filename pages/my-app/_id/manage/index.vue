<template>
  <div>
    <PrevPage />
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
      <div class="card col-12 mt-3">
        <div class="card-body">
          <div class="card-title">
            <div class="row">
              <div class="col-6">
                <h4 id="users">
                  Users
                </h4>
              </div>
              <div class="col-6">
                <a
                  class="nav-link fa-pull-right"
                  href="#users"
                >
                  <font-awesome-icon
                    fixed-width
                    :icon="['fas', 'plus']"
                  />
                  Create New User</a>
              </div>
            </div>
          </div>
          <div class="card-text">
            <GoogleUserList />
          </div>
        </div>
      </div>
      <div class="card col-12 mt-3">
        <div class="card-body">
          <div class="card-title">
            <div class="row">
              <div class="col-6">
                <h4 id="groups">
                  Groups
                </h4>
              </div>
              <div class="col-6">
                <a
                  class="nav-link fa-pull-right"
                  href="#users"
                  @click.prevent="createNewGroup"
                >
                  <font-awesome-icon
                    fixed-width
                    :icon="['fas', 'plus']"
                  />
                  Create New Group</a>
              </div>
            </div>
          </div>
          <div class="card-text">
            <GoogleGroupList />
          </div>
        </div>
      </div>
      <div class="card col-12 mt-3">
        <div class="card-body">
          <div class="card-title">
            <h4 id="settings">
              Settings
            </h4>
          </div>
          <div class="card-text">
            <div class="row">
              <button class="btn btn-primary btn-md " @click="deleteModal">
                Uninstall {{ data.application.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import GoogleUserList from '~/components/Application/Google/GoogleUserList.vue'
import GoogleGroupList from '~/components/Application/Google/GoogleGroupList.vue'
import ApplicationDetail from '~/components/Application/ApplicationDetail'
import PrevPage from '~/components/PrevPage'

export default {
  components: {
    PrevPage,
    GoogleUserList,
    GoogleGroupList,
    ApplicationDetail
  },
  data () {
    return {
      dialog: true
    }
  },
  async asyncData (context) {
    return await context.app.$axios.get('/api/integrations/' + context.route.params.id)
      .then((data) => {
        return {
          data: data.data
        }
      })
  },
  methods: {
    deleteModal () {
      this.$modal.show('dialog', {
        title: 'Uninstall ' + this.data.application.name,
        text: 'Uninstall?',
        buttons: [
          {
            title: 'Uninstall',
            handler: () => {
              this.$axios.delete('/api/integrations/' + this.data.application.id)
                .then(res => console.log(res))
                .catch(e => console.log(e))
              this.$router.push('/')
            }
          },
          {
            title: 'Cancel',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    createNewGroup () {

    }
  }
}
</script>

<style scoped>
img.logo {
  width: 100px;
}
</style>
