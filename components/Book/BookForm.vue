<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedBook.isbn">
      Isbn
    </AppControlInput>
    <AppControlInput v-model="editedBook.title">
      Title
    </AppControlInput>
    <AppControlInput
      v-model="editedBook.description"
      control-type="textarea"
    >
      Content
    </AppControlInput>
    <AppButton type="submit" btn-style="btn-primary">
      Save
    </AppButton>
    <AppButton
      type="button"
      btn-style="btn-danger"
      @click="onCancel"
    >
      Cancel
    </AppButton>
  </form>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      editedBook: this.post
        ? { ...this.post }
        : {
          isbn: '',
          title: '',
          description: ''
        }
    }
  },
  methods: {
    onSave () {
      // Save the post
      this.$emit('submit', this.editedBook)
    },
    onCancel () {
      // Navigate back
      this.$router.push('/books')
    }
  }
}
</script>
