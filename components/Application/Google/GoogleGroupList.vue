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
        <div class="row">
          <ul class="list-group">
            <li v-for="(group, index) in groups" :key="index" class="list-group-item border-0">
              <a href="#" class="text-dark">{{ group.name }} ({{ group.email }})</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
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
      groups: []
    }
  }
}
</script>
<style scoped>
.card-title h4  {
  font-size: 28px;
}
</style>
