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
              href="#"
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
              <a href="#" class="text-dark" @click.prevent="updateForm(index)">
                <div class="media align-items-center">
                  <span class="avatar avatar-sm rounded-circle">
                    <img
                      :alt="user.name"
                      :src="user.profilePic"
                    ></span>
                  <div class="media-body ml-2 d-none d-lg-block">
                    <span
                      class="mb-0 text-sm  font-weight-bold"
                    >{{ user.name }} {{ user.email.trim() === ''?'':'(' + user.email + ')' }}
                    </span>
                  </div>
                </div>
              </a>
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
            id="email"
            v-model="user.email"
            type="email"
            name="email"
            class="form-control"
            placeholder="Email"
            required="required"
          >
        </div>
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="modals.createUser = false">
          Cancel
        </base-button>
        <base-button v-if="form.new === false" type="secondary" @click.prevent="deleteUser">
          Delete
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
  name: 'AsanaUserList',
  fetch () {
    this.$axios.get('/api/asana/users')
      .then((data) => {
        // eslint-disable-next-line no-console
        console.log(data.data)
        this.users = data.data
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
      form: {
        new: true
      },
      user: {
        email: ''
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
      this.user = {
        index: 0,
        email: ''
      }
    },
    saveUser () {
      this.$axios.$post('/api/asana/users', {
        email: this.user.email
      })
        .then((data) => {
          console.log(data)
          this.modals.createUser = false
          this.users.push(
            {
              email: data.email
            }
          )
          this.clearForm()
        }).catch((e) => {
        console.log(e)
      })
    },
    deleteUser () {
      this.$axios.$delete('/api/asana/users/' + this.user.email, this.user)
        .then((data) => {
          this.modals.createUser = false
          const index = this.user.index
          this.clearForm()
          this.users.splice(index, 1)
          console.log(data)
        }).catch((e) => {
        console.log(e)
      })
    },
    openForm () {
      this.form.new = true
      this.clearForm()
      this.modals.createUser = true
    },
    updateForm (index) {
      this.form.new = false
      this.user = this.users[index]
      this.user.index = index
      this.modals.createUser = true
    }
  }
}
</script>
<style scoped>
.card-title h4 {
  font-size: 28px;
}

input {
  border-width: 0 0 2px 0;
  border-radius: 0;
  border-color: var(--primary);
  padding-left: 0;
}

</style>
