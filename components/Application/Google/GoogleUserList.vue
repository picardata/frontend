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
              <a href="#" class="text-dark" @click.prevent="updateForm(index)">{{ user.name.givenName }} {{ user.name.familyName }} ({{
                user.primaryEmail
              }})</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <modal :show.sync="modals.createUser">
      <template slot="header">
        <h5 class="modal-title">
          <span v-if="form.new">Add User</span>
          <span v-else>User Information</span>
        </h5>
      </template>
      <div>
        <div class="form-group">
          <input
            id="givenName"
            v-model="user.name.givenName"
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
            v-model="user.name.familyName"
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
            v-model="user.primaryEmail"
            type="email"
            name="primaryEmail"
            class="form-control"
            placeholder="Email"
            required="required"
          >
        </div>
        <div class="form-group">
          <input
            v-if="form.new"
            id="password"
            v-model="user.password"
            type="password"
            name="password"
            class="form-control"
            placeholder="Password"
            required="required"
          >
        </div>
        <div>
          <h4>Joined Groups</h4>
          <table v-for="group,index in user.groups" :key="index" style="margin-bottom: 10px">
            <tr>
              <td width="5px">
                Department
              </td>
              <td>: {{ group.name }}</td>
            </tr>
            <tr>
              <td width="5px">
                Role
              </td>
              <td>: {{ group.userRole }}</td>
            </tr>
          </table>
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
  name: 'GoogleUserList',
  async fetch () {
    await this.$axios.get('/api/google-directories/get-groups-and-members')
      .then((data) => {
        // eslint-disable-next-line no-console
        console.log(data.data.groups)
        this.groups = data.data.groups
      }).catch(
        (e) => {
        // eslint-disable-next-line no-console
          console.log(e)
        }
      )
  },
  data () {
    return {
      groups: [],
      modals: {
        createUser: false
      },
      form: {
        new: true
      },
      user: {
        password: '',
        primaryEmail: '',
        name: {
          familyName: '',
          givenName: ''
        }
      }
    }
  },
  computed: {
    users () {
      const users = []
      const result = []

      this.groups.map((group) => {
        return group.members.filter((member) => {
          if (member.isAMember === true) {
            member.primaryEmail = member.email
            member.groups = [{
              id: group.id,
              name: group.name,
              email: group.email,
              userRole: member.role
            }]
            delete member.role
            users.push(member)
          }
        })
      })

      function checkDuplicate (email, obj) {
        let index
        obj.forEach((o, i) => {
          if (o.email === email) {
            index = i
          }
        })
        return index
      }

      function mergeUser (from, to) {
        from.groups.map((f) => {
          to.groups.push(f)
        })
        return to
      }

      users.forEach((user) => {
        const isDuplicate = checkDuplicate(user.email, result)
        if (isDuplicate !== undefined) {
          const toMerge = result[isDuplicate]
          result[isDuplicate] = mergeUser(user, toMerge)
        } else {
          result.push(user)
        }
      })

      return result
    },
    usersCount () {
      return this.users.length
    }
  },
  methods: {
    clearForm () {
      this.user = {
        index: 0,
        password: '',
        primaryEmail: '',
        name: {
          familyName: '',
          givenName: ''
        }
      }
    },
    saveUser () {
      this.$axios.$post('/api/google-directories/users', {
        password: this.user.password,
        primaryEmail: this.user.primaryEmail,
        givenName: this.user.name.givenName,
        familyName: this.user.name.familyName
      })
        .then((data) => {
          console.log(data)
          this.modals.createUser = false
          this.users.push(
            {
              password: '',
              primaryEmail: data.primaryEmail,
              name: {
                familyName: data.name.familyName,
                givenName: data.name.givenName
              }
            }
          )
          this.clearForm()
        }).catch((e) => {
          console.log(e)
        })
    },
    deleteUser () {
      this.$axios.$delete('/api/google-directories/users/' + this.user.primaryEmail, this.user)
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
.left {
  margin-left: -40px;
}

.no-bullet {
  list-style-type: none;
}

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
