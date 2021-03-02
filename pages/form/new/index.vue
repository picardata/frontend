<template>
  <div class="mt-5">
    <PrevPage />
    <div class="row mt-5">
      <div class="col-6">
        <h1>Create blank form</h1>
      </div>
      <div class="col-6">
        <span class="align-middle float-right">
          <nuxt-link to="/form/new" class="btn btn btn-outline-primary btn-create">Create other blank form</nuxt-link>
        </span>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-4">
        <h5><b>Questions</b></h5>
      </div>
      <div class="col-8">
        <span class="align-middle float-right">
          <nuxt-link to="/form/share" class="btn btn-lg bg-default text-primary btn-share">
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
                class="form-control title mat border-0"
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
                class="form-control description mat border-0"
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
  data () {
    return {
      id: '',
      name: 'Untitled form',
      description: '',
      questions: [
        {
          id: undefined,
          name: '',
          type: 0,
          required: false
        }
      ]
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
      if (this.id === '') {
        this.submit().then(() => {
          this.submitField(index, this.id)
        })
      } else {
        this.submitField(index, this.id)
      }
    },
    changeType (question_id, type_id) {
      this.questions[question_id].type = type_id
      this.addField(question_id)
    },
    newField () {
      this.questions.push({
        id: undefined,
        name: '',
        type: 0,
        required: false
      })
    },
    copyField (index) {
      const toCopy = this.questions[index]
      const copied = {
        id: undefined,
        name: toCopy.name,
        type: toCopy.type,
        required: toCopy.required
      }
      this.questions.splice(index + 1, 0, copied)
      this.addField(index + 1)
    },
    deleteField (index) {
      this.$axios.$delete('/api/fields/' + this.questions[index].id)
      this.questions.splice(index, 1)
    },
    async submit () {
      if (this.id === '') {
        await this.$axios
          .$post('/api/forms/', {
            name: this.name,
            description: this.description
          })
          .then((data) => {
            // eslint-disable-next-line no-console
            console.log(data)
            this.id = data.id
            history.pushState(
              {},
              null,
              this.$route.path.replace('new', this.id)
            )
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
      } else {
        await this.$axios
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

.btn-create, .btn-share {
  height: 56px;
  border-radius: 40px;
  border-width: 2px;
  font-size: 16px;
  padding: 15px 15px;
}

.btn-create {
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

.form-control:focus {
  box-shadow: none;
}
</style>
