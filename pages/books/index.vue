<template>
  <div>
    <section class="existing-posts">
      <h1>Existing Books</h1>
      <div class="text-right">
        <AppButton
          type="button"
          class="btn btn-primary"
          @click="onCreate">Create
        </AppButton>
      </div>
      <BookList
        :books="loadedBooks"
      />
    </section>
  </div>
</template>
<script>
import BookList from '@/components/Book/BookList'

export default {
  components: { BookList },
  async asyncData (context) {
    return await context.app.$axios.get('/api/books/?order%5Bid%5D=desc&items_per_page=10&page_number=1')
      // eslint-disable-next-line no-return-assign
      .then((data) => {
        return { loadedBooks: data.data }
      }).catch(
        (e) => { console.log(e) }
      )
  },
  data () {
    return {
      loadedBooks: []
    }
  },
  methods: {
    onCreate () {
      this.$router.push('/books/new')
    }
  }
}
</script>
