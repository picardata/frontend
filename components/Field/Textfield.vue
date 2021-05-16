<template>
  <div class="col-8">
    <div>
      <textarea
        v-model="text.desc"
        name="text-desc"
        class="form-control pcd mt-3"
        @blur="submitText(text, question.id)"
        @keyup="submitText(text, question.id)"
      />
      <div v-if="!question.imageDesc && question.desc" class="clearfix mt-3">
        <button type="button" class="btn btn-lg bg-white text-primary btn-trash-field" @click="question.imageDesc = !question.imageDesc">
          <font-awesome-icon :icon="['fas', 'image']" />
          <span>Add image</span>
        </button>
      </div>
      <div v-if="question.imageDesc && question.desc" class="clearfix mt-3">
        <div class="col-sm-8 mt-3">
          <dropzone-file-upload v-model="fileSingle" />
        </div>
      </div>
      <input
        v-model="text.answer"
        type="text"
        name="input-answer"
        class="form-control pcd mt-3"
        placeholder="Short-answer text"
        @blur="submitText(text, question.id)"
        @keyup="submitText(text, question.id)"
      >
    </div>
  </div>
</template>

<script>
import DropzoneFileUpload from '@/components/argon-core/Inputs/DropzoneFileUpload'

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
      text: {
        desc: null,
        answer: null,
        image: null
      },
      type_id: 0,
      first_trigger: true
    }
  },
  methods: {
    submitText (text, fieldId) {
      if (this.first_trigger) { this.change_type(this.q_key, this.type_id) }
      this.first_trigger = false

      this.postText(text, fieldId)
    },
    async postText (text, fieldId) {
      const toSave = {
        description: text.desc,
        image: text.image,
        shortAnswer: text.answer,
        field: fieldId
      }
      let axios

      if (text.id) {
        axios = this.$axios.$put('/api/field-texts/' + text.id, toSave)
      } else {
        axios = this.$axios.$post('/api/field-texts/', toSave)
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
