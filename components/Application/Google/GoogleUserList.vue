<template>
  <div class="card col-12 mt-3">
    <div v-show="messages.createUserMessage === true" class="message-wrapper col-12">
      <div class="message-body">
        <base-alert class="inner-message" dismissible type="default" icon="ni ni-like-2">
          <strong>Yay!</strong> a new user added!
          <template v-slot:dismiss-icon>
            <button
              type="button"
              class="close"
              @click="messages.createUserMessage = false"
            >
              <span>&times;</span>
            </button>
          </template>
        </base-alert>
      </div>
    </div>
    <div class="card-body">
      <div class="card-title">
        <div class="row">
          <div class="col-6">
            <h4 id="users">
              Users ({{ users.length }})
            </h4>
          </div>
          <div class="col-6">
            <a
              class="nav-link fa-pull-right manage-app-add-button"
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
            autocomplete="off"
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
            autocomplete="off"
          >
        </div>
        <div>
          <h4 v-if="!form.new">
            Joined Groups
          </h4>
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
    try {
      const data = await this.$axios.get('/api/integration-groups/')

      this.groups = data.data.map((group) => {
        group.id = group.groupId
        delete group.groupId
        group.members = group.integrationGroupMembers.map((member) => {
          member.id = member.integrationUser.userId
          member.email = member.integrationUser.email
          member.name = {
            familyName: member.integrationUser.familyName,
            fullName: member.integrationUser.fullName,
            givenName: member.integrationUser.givenName
          }
          member.role = member.role ? member.role : 'MEMBER'
          member.isAMember = true
          delete member.integrationUser
          delete member.integrationGroup
          return member
        })
        delete group.integrationGroupMembers
        return group
      })
    } catch (e) {}
  },
  data () {
    return {
      groups: [],
      modals: {
        createUser: false
      },
      messages: {
        createUserMessage: false
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
          member.primaryEmail = member.email
          member.groups = member.isAMember ? [{
            id: group.id,
            name: group.name,
            email: group.email,
            userRole: member.role
          }] : []
          delete member.role
          users.push(member)
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
    }
  },
  mounted () {
    this.disableAutoComplete()
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
      if (this.form.new) {
        this.$axios.$post('/api/google-directories/users', {
          password: this.user.password,
          primaryEmail: this.user.primaryEmail,
          givenName: this.user.name.givenName,
          familyName: this.user.name.familyName
        })
          .then((data) => {
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
            this.messages.createUserMessage = true
          })
      } else {
        const id = this.users[this.user.index].id
        this.$axios.$put(`/api/google-directories/users/${id}`, {
          primaryEmail: this.user.primaryEmail,
          givenName: this.user.name.givenName,
          familyName: this.user.name.familyName
        })
          .then(() => {
            this.modals.createUser = false
            this.clearForm()
          })
      }
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
    },
    disableAutoComplete () {
      const elements = document.querySelectorAll('[autocomplete="off"]')

      if (!elements) {
        return
      }

      elements.forEach((element) => {
        element.setAttribute('readonly', 'readonly')
        // element.style.backgroundColor = "inherit";

        setTimeout(() => {
          element.removeAttribute('readonly')
        }, 500)
      })
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

.message-wrapper {
    position: fixed;
    top: 0;
    left: 5%;
    right: 0;
    max-width: 95%;
    z-index: 1000;
}

.message-body {
  padding: 5px
}

.inner-message {
    margin: 0 auto;
}
</style>
