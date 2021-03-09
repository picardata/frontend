<template>
  <div class="mt-5">
    <PrevPage />
    <div class="row mt-5">
      <div class="col-6">
        <h1>Create blank form</h1>
        <div class="rox pl-1">
          <p>Last Modified {{ formattedUpdatedAt }}</p>
        </div>
      </div>
      <div class="col-6">
        <span class="align-middle float-right">
          <nuxt-link to="/form/new" class="btn btn-lg  btn-create">Create other blank form</nuxt-link>
        </span>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-4">
        <h5><b>Questions</b></h5>
      </div>
      <div class="col-8">
        <span class="align-middle float-right">
          <nuxt-link to="/form/share" class="btn btn-lg bg-default btn-preview">
            <font-awesome-icon :icon="['fas', 'eye']" />
            Preview form</nuxt-link>
          <nuxt-link to="/form/share" class="btn btn-lg btn-primary btn-share">Share form</nuxt-link>
        </span>
      </div>
    </div>
    <div class="row mt-5">
      <form>
        <div class="card">
          <div class="card-body">
            <div>
              <hr class="header-break">
            </div>
            <div class="form-group">
              <input
                v-model="name"
                type="text"
                name="name"
                class="form-control title"
                placeholder="Untitled form"
                required="required"
                @change="submit"
              >
            </div>
            <div class="form-group">
              <input
                v-model="description"
                type="text"
                name="description"
                class="form-control description"
                placeholder="Form description"
                @change="submit"
              >
            </div>
          </div>
        </div>
        <Field :questions="questions" :add_field="addField" :change_type="changeType" :copy_field="copyField" :delete_field="deleteField" />
      </form>
    </div>
    <div class="stick-bottom">
      <button
        class="btn btn-primary btn-md "
        type="button"
        @click="newField"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
      </button>
    </div>
  </div>
</template>

<script>
import PrevPage from '@/components/PrevPage'
import Field from '@/components/Field/Field'
export default {
  name: 'IndexVue',
  components: { PrevPage, Field },
  async asyncData (context) {
    return await context.app.$axios.get('/api/forms/' + context.route.params.id).then((data) => {
      data.data.questions = data.data.fields.filter((x) => {
        x.fieldChoice = x.fieldChoice.filter((y) => {
          y.edit = false
          return y.status === 1
        })
        x.fieldChoice.push({
          id: undefined,
          order: 0,
          type: 1,
          name: 'Add option',
          edit: false
        })

        return x.status === 1
      })

      return data.data
    })
  },
  computed: {
    formattedUpdatedAt () {
      console.log(this.updatedAt)
      return this.$moment(this.updatedAt).calendar()
    }
  },
  methods: {
    submitField (index, formId) {
      const fieldId = this.questions[index].id ? this.questions[index].id : undefined
      const toSave = {
        name: this.questions[index].name,
        type: this.questions[index].type,
        required: this.questions[index].required,
        form: formId
      }
      let axios

      if (fieldId) {
        axios = this.$axios.$put('/api/fields/' + fieldId, toSave)
      } else {
        axios = this.$axios.$post('/api/fields/', toSave)
      }

      axios.then((data) => {
        this.questions[index].id = data.id
        if (!this.id) {
          this.id = data.form.id
          history.pushState(
            {},
            null,
            this.$route.path.replace('new', data.form.id)
          )
        }
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
    },
    addField (index) {
      this.submitField(index, this.id)
    },
    changeType (questionId, typeId) {
      this.questions[questionId].type = typeId
      this.bulkDeleteFieldChoice(questionId)
      this.addField(questionId)
    },
    bulkDeleteFieldChoice (questionId) {
      this.questions[questionId].fieldChoice.map((x) => {
        if (x.id) {
          this.$axios.$delete('/api/field-choices/' + x.id)
        }
      })

      this.questions[questionId].fieldChoice = [
        {
          id: undefined,
          order: 0,
          type: 1,
          name: 'Add option',
          edit: true
        },
        {
          id: undefined,
          order: 0,
          type: 1,
          name: 'Add option',
          edit: false
        }
      ]
    },
    newField () {
      this.questions.push({
        id: undefined,
        name: '',
        type: 0,
        required: false,
        fieldChoice: [
          {
            id: undefined,
            order: 0,
            type: 1,
            name: 'Add option',
            edit: true
          },
          {
            id: undefined,
            order: 0,
            type: 1,
            name: 'Add option',
            edit: false
          }
        ]
      })
    },
    copyField (index) {
      const toCopy = this.questions[index]
      const copied = {
        id: undefined,
        name: toCopy.name,
        type: toCopy.type,
        required: toCopy.required,
        fieldChoice: toCopy.fieldChoice
      }
      this.questions.splice(index + 1, 0, copied)
      this.addField(index + 1)
    },
    deleteField (index) {
      this.$axios.$delete('/api/fields/' + this.questions[index].id)
      this.questions.splice(index, 1)
    },
    submit () {
      this.$axios
        .$patch('/api/forms/' + this.id, {
          name: this.name,
          description: this.description
        })
        .then((data) => {
          // eslint-disable-next-line no-console
          console.log(data)
          this.id = data.id
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
.stick-bottom {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 240px;
    margin-bottom: 70px;
}

h1 {
  font-size: 36px;
  font-weight: bolder;
}

.btn-create, .btn-share, .btn-preview {
  height: 56px;
  border-radius: 40px;
  font-weight: 600;
  font-size: 16px;
  padding: 15px 15px;
  border-width: 2px;
}

.btn-preview {
  color: var(--primary);
}

.btn-create {
  border-color: var(--primary);
  color: var(--primary);
  padding: 15px 15px;
}

.btn-share {
  padding: 15px 30px;
}

form {
  width: 100%;
}

.form-control {
  color: black;
}

input.description, input.title {
  border-width: 0;
}

input.title {
  font-size: 48px;
}

input.description {
  font-size: 18px;
}

input.question:focus {
  border-color: var(--primary);
}

.type-dropdown {
  padding: 0;
}

.type-dropdown .btn {
  height: 56px;
  text-align: left;
  border-radius: 15px;
  background-color: #EFF0F7;
  font-size: 16px;
}

input.question {
  font-size: 24px;
  border-width: 0 0 2px 0;
  border-radius: 0;
}

.form-control:focus {
  box-shadow: none;
}

hr.header-break {
  border-top: 8px solid var(--blue);
  margin-left: 15px;
  width: 130px;
}

.dropdown-toggle::after {
  display: none;
}

</style>
