<template>
  <div class="col-8">
    <div v-for="(text, index) in question.fieldTexts" :key="index">
      <input
        v-model="text.shortAnswer"
        type="text"
        name="input-answer"
        class="form-control pcd mt-3"
        placeholder="Short-answer text"
        disabled=""
        @blur="submitText(text, question.id)"
        @keyup="submitText(text, question.id)"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Textfield',
  props: {
    question: {
      type: Object
    },
    q_key: { type: Number },
    change_type: { type: Function }
  },
  data () {
    return {
      fileSingle: [],
      type_id: 0,
      firstTrigger: true
    }
  },
  methods: {
    submitText (text, fieldId) {
      if (text.first_trigger && !this.question.id) {
        this.change_type(this.q_key, this.type_id)
        text.first_trigger = false
      }

      this.postText(text, fieldId)
    },
    async postText (text, fieldId) {
      const toSave = {
        description: text.description,
        image: text.image,
        shortAnswer: text.shortAnswer,
        field: fieldId
      }
      let axios

      if (text.id) {
        axios = this.$axios.$put('/api/field-texts/' + text.id, toSave)
      } else {
        if (this.firstTrigger) {
          this.firstTrigger = false
          axios = this.$axios.$post('/api/field-texts/', toSave)
        }
      }

      await axios.then((res) => {
        text.id = res.id
      })
        .catch((e) => {
          this.errors = []
          for (const field of ['username', 'password']) {
            const errors = e.response.data.errors[field]
            if (errors !== undefined) {
              this.errors = this.errors.concat(errors)
            }
          }
          return false
        })
    }
  }
}
</script>

<style scoped>
textarea.pcd,input.pcd{
  border-width: 0 0 2px 0;
  border-radius: 0;
  padding-left: 5px;
  font-size: 16px;
  color:#313131;
}
textarea.pcd:focus,input.pcd:focus {
  border-color: var(--primary);
  box-shadow: none;
}
</style>
