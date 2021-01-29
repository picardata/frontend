<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8 mt-5">
        <div class="card align-self-center">
          <h5 class="card-header">{{ isbn }}: {{ title }}</h5>
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">{{ title }}</h6>
            <p class="card-text">{{ description }}</p>
            <AppButton
              type="button"
              style="margin-left: 10px"
              btn-style="btn-primary"
              @click="onEdit"
            >
              Edit
            </AppButton>
            <AppButton
              type="button"
              style="margin-left: 10px"
              btn-style="btn-danger"
              @click="onCancel"
            >
              Cancel
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  async asyncData (context) {
    return await context.app.$axios.get('/api/books/' + context.route.params.id)
      .then((data) => {
        return {
          id: data.data.id,
          isbn: data.data.isbn,
          title: data.data.title,
          description: data.data.description
        }
      })
  },
  methods: {
    onCancel () {
      // Navigate back
      this.$router.push('/books')
    },
    onEdit () {
      // Navigate back
      this.$router.push('/books/' + this.id + '/edit')
    }
  }
}
</script>
