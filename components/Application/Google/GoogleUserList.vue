<template>
  <div>
    <div class="table-responsive">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            First
          </th>
          <th scope="col">
            Last
          </th>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Actions
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <th scope="row">
            {{ index }}
          </th>
          <td>{{ user.name.givenName }}</td>
          <td>{{ user.name.familyName }}</td>
          <td>{{ user.primaryEmail }}</td>
          <td>
            <a class="btn btn-sm btn-primary">edit</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoogleUserList',
  data () {
    return {
      users: []
    }
  },
  fetch () {
    this.$axios.get('/api/google-directories/users')
      .then((data) => {
        console.log(data.data.users)
        this.users = data.data.users
      }).catch(
      (e) => {
        console.log(e)
      }
    )
  }
}
</script>
