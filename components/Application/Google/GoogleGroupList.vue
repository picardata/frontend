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
        <div class="row">
          <ul class="list-group">
            <li v-for="(group, index) in groups" :key="index" class="list-group-item border-0">
              <a href="#" @click.prevent="updateForm(index)" class="text-dark">{{ group.name }} ({{ group.email }})</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <modal :show.sync="modals.createGroup">
      <template slot="header">
        <h5 class="modal-title">
          Add Group
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
  </div>
</template>

<script>
export default {
  name: 'GoogleGroupList',
  fetch () {
    this.$axios.get('/api/google-directories/groups')
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
        createGroup: false
      },
      form: {
        new: true
      },
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
    updateForm (index) {
      this.form.new = false
      this.group = this.groups[index]
      this.group.index = index
      this.modals.createGroup = true
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
