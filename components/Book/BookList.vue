<template>
  <section class="post-list">
    <div class="row">
      <BookPreview
        v-for="book in books"
        :key="book.id"
        :id="book.id"
        :isbn="book.isbn"
        :title="book.title"
        :description="book.description"
      />
    </div>
  </section>
</template>

<script>
import BookPreview from '@/components/Book/BookPreview'

export default {
  components: {
    BookPreview
  },
  props: {
    books: {
      type: Array,
      required: true
    }
  }
}
</script>
