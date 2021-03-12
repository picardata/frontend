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
      users: []
    }
  },
  computed: {
    usersCount () {
      return this.users.length
    }
  }
}
</script>
<style scoped>
.card-title h4  {
  font-size: 28px;
}
</style>
