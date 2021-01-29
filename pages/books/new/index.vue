<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8 mt-5">
        <div class="card align-self-center">
          <h5 class="card-header">New Book</h5>
          <div class="card-body">
            <section class="new-post-form">
              <AdminPostForm @submit="onSubmitted"/>
            </section>
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
  methods: {
    onSubmitted (postData) {
      // eslint-disable-next-line no-console
      this.$axios.post('/api/books/', postData)
        .then(() => this.$router.push('/books'))
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>
