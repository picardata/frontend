<template>
  <div class="card col-12 mt-3">
    <div class="card-body">
      <div class="card-title">
        <div class="row">
          <div class="col-6">
            <h4 id="pages">
              Pages ({{ pages.length }})
            </h4>
          </div>
          <div class="col-6">
            <a
              class="nav-link fa-pull-right manage-app-add-button"
              href="#users"
              @click.prevent="createNewPage"
            >
              <font-awesome-icon
                fixed-width
                :icon="['fas', 'plus']"
              />
              Create New Page</a>
          </div>
        </div>
      </div>
      <div class="card-text">
        <div class="row">
          <ul class="list-page">
            <li v-for="(page, index) in pages" :key="index" class="list-page-item border-0">
              <a :href="page.publishedUrl" class="text-dark">{{ page.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HubspotPageList',
  fetch () {
    this.$axios.get('/api/hubspot/pages')
      .then((data) => {
        // eslint-disable-next-line no-console
        this.pages = data.data
      }).catch(
        (e) => {
        // eslint-disable-next-line no-console
          console.log(e)
        }
      )
  },
  data () {
    return {
      pages: []
    }
  }
}
</script>
<style scoped>
.card-title h4 {
  font-size: 28px;
}
</style>
