<template>
  <div class="card col-12 mt-3">
    <div class="card-body">
      <div class="card-title">
        <div class="row">
          <div class="col-6">
            <h4 id="groups">
              Groups ({{ groups.length }})
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
              Create New Group</a>
          </div>
        </div>
      </div>
      <div class="card-text">
        <div class="row col-12">
          <ul class="list-group list-group-flush list">
            <li v-for="(group, index) in groups" :key="index" class="list-group-item border-0">
              <div class="row align-items-center">
                <div class="col-9">
                  <a href="#" class="text-dark" @click.prevent="updateForm(index)">{{ group.name }} ({{
                    group.email
                  }})</a>
                </div>
                <div class="col-3 text-right">
                  <a href="#" class="btn btn-sm btn-outline-primary" @click.prevent="updateForm(index)">
                    <font-awesome-icon
                      fixed-width
                      :icon="['fas', 'pen']"
                    />
                    View</a>
                  <a href="#" class="btn btn-sm btn-outline-primary" @click.prevent="openAddUser(index)">
                    <font-awesome-icon
                      fixed-width
                      :icon="['fas', 'plus']"
                    />
                    Add User</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <modal :show.sync="modals.createGroup">
      <template slot="header">
        <h5 class="modal-title">
          <span v-if="form.new">Add Group</span>
          <span v-else>Group Information</span>
        </h5>
      </template>
      <div>
        <div class="form-group">
          <input
            id="name"
            v-model="group.name"
            type="text"
            name="name"
            class="form-control"
            placeholder="Group Name"
            required="required"
          >
        </div>
        <div class="form-group">
          <input
            id="primaryEmail"
            v-model="group.email"
            type="email"
            name="email"
            class="form-control"
            placeholder="Email"
            required="required"
          >
        </div>
        <div class="form-group">
          <input
            id="description"
            v-model="group.description"
            type="text"
            name="description"
            class="form-control"
            placeholder="Description"
            required="required"
          >
        </div>
        <div>
          <h4>Group Members</h4>
          <table>
            <tr v-for="member,index in group.members" :key="index">
              <td>{{ member.name.fullName }}</td>
            </tr>
          </table>
        </div>
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="modals.createGroup = false">
          Cancel
        </base-button>
        <base-button v-if="form.new === false" type="secondary" @click.prevent="deleteGroup">
          Delete
        </base-button>
        <base-button type="primary" @click.prevent="saveGroup">
          Save
        </base-button>
      </template>
    </modal>
    <modal size="lg" :show.sync="modals.addUser">
      <template slot="header">
        <h5 class="modal-title">
          <span>Add user to {{ group.name }}</span>
        </h5>
      </template>
      <div>
        <di class="row">
          <div class="col-12">
            <ul class="list-group list-group-flush list">
              <li v-for="(user, index) in groupUsers" :key="index" class="list-group-item border-0">
                <div class="row align-items-center">
                  <div class="col-9">
                    <span href="#" class="text-dark">{{ user.name }}</span>
                    <small>{{ user.email }}</small>
                  </div>
                  <div class="col-3 text-right">
                    <a v-if="user.isAMember" href="#" class="btn btn-sm btn-outline-danger" @click.prevent="removeUserToGroup(index)">
                      <font-awesome-icon
                        fixed-width
                        :icon="['fas', 'plus']"
                      />
                      Remove</a>
                    <a v-else href="#" class="btn btn-sm btn-outline-primary" @click.prevent="addUserToGroup(index)">
                      <font-awesome-icon
                        fixed-width
                        :icon="['fas', 'plus']"
                      />
                      Add</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </di>
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="modals.addUser = false">
          Close
        </base-button>
      </template>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'GoogleGroupList',
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
        createGroup: false,
        addUser: false
      },
      form: {
        new: true
      },
      groupUsers: {},
      group: {
        index: 0,
        name: '',
        email: '',
        description: ''
      }
    }
  },
  methods: {
    clearForm () {
      this.group = {
        index: 0,
        name: '',
        email: '',
        description: ''
      }
    },
    saveGroup () {
      this.$axios.$post('/api/google-directories/groups', {
        name: this.group.name,
        email: this.group.email,
        description: this.group.description
      })
        .then((data) => {
          this.modals.createGroup = false
          this.groups.push(
            {
              name: data.name,
              email: data.email,
              description: data.description
            }
          )
          this.clearForm()
          console.log(data)
        }).catch((e) => {
          console.log(e)
        })
    },
    deleteGroup () {
      this.$axios.$delete('/api/google-directories/groups/' + this.group.email, this.group)
        .then((data) => {
          this.modals.createGroup = false
          const index = this.group.index
          this.clearForm()
          this.groups.splice(index, 1)
          console.log(data)
        }).catch((e) => {
          console.log(e)
        })
    },
    openForm () {
      this.form.new = true
      this.clearForm()
      this.modals.createGroup = true
    },
    openAddUser (index) {
      this.group = this.groups[index]
      this.$axios.get('/api/google-directories/groups/' + this.group.email + '/users')
        .then((data) => {
          // eslint-disable-next-line no-console
          console.log(data.data)
          this.groupUsers = data.data
          this.modals.addUser = true
        }).catch(
          (e) => {
          // eslint-disable-next-line no-console
            console.log(e)
            this.modals.addUser = false
          }
        )
    },
    updateForm (index) {
      this.form.new = false
      this.group = this.groups[index]
      this.group.index = index
      this.modals.createGroup = true
    },
    addUserToGroup (index) {
      const user = this.groupUsers[index]
      this.$axios.post('/api/google-directories/groups/' + this.group.email + '/users', {
        userEmail: user.email
      })
        .then((data) => {
          this.groupUsers[index].isAMember = true
          // eslint-disable-next-line no-console
          console.log(data.data)
        }).catch(
          (e) => {
          // eslint-disable-next-line no-console
            console.log(e)
            this.modals.addUser = false
          }
        )
    },
    removeUserToGroup (index) {
      const user = this.groupUsers[index]
      this.$axios.delete('/api/google-directories/groups/' + this.group.email + '/users/' + user.email)
        .then((data) => {
          this.groupUsers[index].isAMember = false
          // eslint-disable-next-line no-console
          console.log(data.data)
        }).catch(
          (e) => {
          // eslint-disable-next-line no-console
            console.log(e)
            this.modals.addUser = false
          }
        )
    }
  }
}
</script>
<style scoped>
.card-title h4 {
  font-size: 28px;
}

.list-group, .list-group li {
  width: 100%;
}

input {
  border-width: 0 0 2px 0;
  border-radius: 0;
  border-color: var(--primary);
  padding-left: 0;
}

</style>
