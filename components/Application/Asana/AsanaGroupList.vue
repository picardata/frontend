<template>
  <div class="card col-12 mt-3">
    <div class="card-body">
      <div class="card-title">
        <div class="row">
          <div class="col-6">
            <h4 id="teams">
              Teams ({{ teams.length }})
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
              Create New Team</a>
          </div>
        </div>
      </div>
      <div class="card-text">
        <div class="row">
          <ul class="list-team">
            <li v-for="(team, index) in teams" :key="index" class="list-group-item border-0">
              <a href="#" class="text-dark" @click.prevent="updateForm(index)">{{ team.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <modal :show.sync="modals.createTeam">
      <template slot="header">
        <h5 class="modal-title">
          Add Team
        </h5>
      </template>
      <div>
        <div class="form-team">
          <input
            id="name"
            v-model="team.name"
            type="text"
            name="name"
            class="form-control"
            placeholder="Team Name"
            required="required"
          >
        </div>
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="modals.createTeam = false">
          Cancel
        </base-button>
        <base-button type="primary" @click.prevent="saveTeam">
          Save
        </base-button>
      </template>
    </modal>
  </div>
</template>
<script>
export default {
  name: 'AsanaTeamList',
  fetch () {
    this.$axios.get('/api/asana/teams')
      .then((data) => {
        // eslint-disable-next-line no-console
        this.teams = data.data
      }).catch(
        (e) => {
        // eslint-disable-next-line no-console
          console.log(e)
        }
      )
  },
  data () {
    return {
      teams: [],
      modals: {
        createTeam: false
      },
      form: {
        new: true
      },
      team: {
        index: 0,
        name: ''
      }
    }
  },
  methods: {
    clearForm () {
      this.team = {
        index: 0,
        name: ''
      }
    },
    saveTeam () {
      this.$axios.$post('/api/asana/teams', {
        name: this.team.name
      })
        .then((data) => {
          this.modals.createTeam = false
          console.log(data.name)
          this.teams.push(
            {
              name: data.name
            }
          )
          this.clearForm()
          console.log(data)
        }).catch((e) => {
          console.log(e)
        })
    },
    openForm () {
      this.form.new = true
      this.clearForm()
      this.modals.createTeam = true
    },
    updateForm (index) {
      this.form.new = false
      this.team = this.teams[index]
      this.team.index = index
      this.modals.createTeam = true
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
