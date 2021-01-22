<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8 mt-5">
        <div class="card align-self-center">
          <h5 class="card-header">Edit Book</h5>
          <div class="card-body">
            <AdminPostForm :post="postedData" @submit="onSubmitted"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Book/BookForm'

export default {
  components: {
    AdminPostForm
  },
  async asyncData (context) {
    return await context.app.$axios.get('http://api.local.picardata.com/api/books/' + context.route.params.id)
      .then((data) => {
        // console.log(context.app.$store.token)
        return {
          postedData: {
            id: data.data.id,
            isbn: data.data.isbn,
            title: data.data.title,
            description: data.data.description
          }
        }
      })
  },
  methods: {
    onSubmitted (postData) {
      // eslint-disable-next-line no-console
      console.log(postData)
      const id = postData.id
      delete postData.id
      this.$axios.put('http://api.local.picardata.com/api/books/' + id, postData)
        .then(() => this.$router.push('/books'))
        .catch(() => this.$router.push('/books'))
    }
  }
}
</script>
