<template>
  <div class="card col-12 mt-3">
    <div class="card-body">
      <div class="card-title">
        <div class="row">
          <div class="col-6">
            <h4 id="users">
              Pages ({{ pageCount }})
            </h4>
          </div>
        </div>
      </div>
      <div class="card-text">
        <div class="row">
          <ul class="list-group">
            <li v-for="(page, index) in pages" :key="index" class="list-group-item border-0">
              <a href="#" class="text-dark">{{ page.name }} ({{ page.category }})</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FacebookPageList',
  fetch () {
    this.$axios.get('/api/facebook/pages')
      .then((data) => {
        // eslint-disable-next-line no-console
        this.pages = data.data
        console.log(this.pages)
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
  },
  computed: {
    pageCount () {
      return this.pages.length
    }
  }
}
</script>

<style scoped>
.card-title h4  {
  font-size: 28px;
}
</style>
