<template>
  <div class="card col-12 mt-3">
    <div class="card-body">
      <div class="card-title">
        <div class="row">
          <div class="col-6">
            <h4 id="users">
              Users ({{ usersCount }})
            </h4>
          </div>
          <div class="col-6">
            <a
              class="nav-link fa-pull-right"
              href="#users"
              @click.prevent="openForm"
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
        <div class="row">
          <ul class="list-group">
            <li v-for="(user, index) in users" :key="index" class="list-group-item border-0">
              <a href="#" class="text-dark">{{ user.name.givenName }} {{ user.name.familyName }} ({{ user.primaryEmail }})</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <modal :show.sync="modals.createUser">
      <template slot="header">
        <h5 class="modal-title">
          Add User
        </h5>
      </template>
      <div>
        <div class="form-group">
          <input
            id="givenName"
            v-model="newUser.givenName"
            type="text"
            name="givenName"
            class="form-control"
            placeholder="First Name"
            required="required"
          >
        </div>
        <div class="form-group">
          <input
            id="familyName"
            v-model="newUser.familyName"
            type="text"
            name="familyName"
            class="form-control"
            placeholder="Last Name"
            required="required"
          >
        </div>
        <div class="form-group">
          <input
            id="primaryEmail"
            v-model="newUser.primaryEmail"
            type="email"
            name="primaryEmail"
            class="form-control"
            placeholder="Email"
            required="required"
          >
        </div>
        <div class="form-group">
          <input
            id="password"
            v-model="newUser.password"
            type="password"
            name="password"
            class="form-control"
            placeholder="Password"
            required="required"
          >
        </div>
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="modals.createUser = false">
          Cancel
        </base-button>
        <base-button type="primary" @click.prevent="saveUser">
          Save
        </base-button>
      </template>
    </modal>
  </div>
</template>
<script>
export default {
  name: 'GoogleUserList',
  fetch () {
    this.$axios.get('/api/google-directories/users')
      .then((data) => {
        // eslint-disable-next-line no-console
        console.log(data.data.users)
        this.users = data.data.users
      }).catch(
        (e) => {
          // eslint-disable-next-line no-console
          console.log(e)
        }
      )
  },
  data () {
    return {
      users: [],
      modals: {
        createUser: false
      },
      newUser: {
        password: '',
        primaryEmail: '',
        givenName: '',
        familyName: ''
      }
    }
  },
  computed: {
    usersCount () {
      return this.users.length
    }
  },
  methods: {
    clearForm () {
      this.newUser = {
        password: '',
        primaryEmail: '',
        givenName: '',
        familyName: ''
      }
    },
    saveUser () {
      this.$axios.$post('/api/google-directories/users', this.newUser)
          .then((data) => {
            console.log(data)
            this.modals.createUser = false
          }).catch((e) => {
        console.log(e)
      })
    },
    openForm () {
      this.clearForm()
      this.modals.createUser = true
    }
  }
}
</script>
<style scoped>
.card-title h4  {
  font-size: 28px;
}

input {
  border-width: 0 0 2px 0;
  border-radius: 0;
  border-color: var(--primary);
  padding-left: 0;
}
</style>
