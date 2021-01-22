<template>
  <div class="col-4 p-2">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ isbn }}: {{ title }}</h6>
        <p class="card-text">{{ description }}</p>
        <nuxt-link :to="bookLink" class="card-link">Details</nuxt-link>
        <nuxt-link :to="editLink" class="card-link">Edit</nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BookPreview',
  props: {
    id: {
      type: Number,
      required: true
    },
    isbn: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  computed: {
    bookLink () {
      return '/books/' + this.id
    },
    editLink () {
      return '/books/' + this.id + '/edit'
    }

  }
}
</script>
