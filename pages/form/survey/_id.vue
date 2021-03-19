<template>
  <div class="mt-5">
    <div class="card mt-5">
      <div class="card-body">
        <h1>{{ name }}</h1>
        <h3>{{ description }}</h3>
      </div>
    </div>
    <div v-for="field, index in fields" :key="index" class="card mt-5">
      <div class="card-body">
        <ul class="text-danger">
          <li v-for="error in field.errors" :key="error">
            {{ error }}
          </li>
        </ul>
        <h3 class="d-inline">
          {{ field.name }}
        </h3>
        <h3 v-if="field.required == 1" class="d-inline" style="color: red">
          *
        </h3>
        <div v-if="field.type === 0" class="form-group">
          <input
            v-model="answers[index].name"
            type="text"
            class="form-control"
            :maxlength="1000"
          >
        </div>
        <div v-if="field.type === 1" class="form-group">
          <input
            v-model="answers[index].name"
            type="text"
            class="form-control"
            :maxlength="5000"
          >
        </div>
        <div v-if="field.type === 2" class="form-group">
          <div v-for="choice in field.fieldChoice" :key="choice.id" class="form-inline">
            <input
              :id="choice.id"
              v-model="answers[index].name"
              class="form-check-input"
              type="radio"
              :name="formName(field.name)"
              :value="choice.name"
            >
            <label :for="choice.id" class="form-check-label">{{ choice.name }}</label><br><br>
            <input
              v-if="choice.name === 'Other'"
              v-model="answers[index].other"
              class="form-control"
              type="text"
              @focus="answers[index].name = 'Other'"
            >
          </div>
        </div>
        <div v-if="field.type === 3" class="form-group">
          <div v-for="choice in field.fieldChoice" :key="choice.id" class="form-inline">
            <input
              :id="choice.id"
              v-model="answers[index].name"
              class="form-check-input"
              type="checkbox"
              :name="formName(field.name)"
              :value="choice.name"
            >
            <label :for="choice.id" class="form-check-label">{{ choice.name }}</label><br><br>
            <input
              v-if="choice.name === 'Other'"
              v-model="answers[index].other"
              class="form-control"
              type="text"
              @focus="answers[index].name.push('Other')"
            >
          </div>
        </div>
        <div v-if="field.type === 4" class="form-group">
          <div>
            <br>
            <select v-model="answers[index].name" class="form-select" :name="formName(field.name)">
              <option v-for="choice in field.fieldChoice" :key="choice.id" :value="choice.name">
                {{ choice.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-lg btn-primary" @click="submit">
      Submit
    </button>
  </div>
</template>
<script>
export default {
  async asyncData (context) {
    return await context.app.$axios.$get('/api/forms/' + context.route.params.id)
      .then((data) => {
        data.answers = []
        data.fields = data.fields.filter((field) => {
          field.errors = []
          field.fieldChoice = field.fieldChoice.filter((choice) => {
            return choice.status === 1
          })
          return field.status === 1
        })

        data.fields.map((field) => {
          if (field.type === 3) {
            data.answers.push({ fieldId: field.id, name: [], other: '' })
          } else if (field.type === 4) {
            data.answers.push({ fieldId: field.id, name: field.fieldChoice[0].name })
          } else {
            data.answers.push({ fieldId: field.id, name: '', other: '' })
          }
        })

        return data
      })
      .catch(e => console.log(e))
  },
  methods: {
    extractChoiceObject (choice) {
      return choice.map(value => value.name)
    },
    formName (name) {
      return name.trim().toLowerCase()
    },
    async submit () {
      const errors = this.checkRequiredFields()
      if (errors === 0) {
        await this.answers.map((v, i) => {
          let name = v.name
          if (typeof name === 'object') {
            name = name.map((a) => {
              if (a === 'Other') {
                return v.other
              } else {
                return a
              }
            })
          } else {
            name = name === 'Other' ? v.other : name
          }

          this.$axios.$post('/api/field-answers/', {
            name: typeof name === 'object' ? name.join(',') : name,
            email: this.$auth.user.username,
            field: this.fields[i].id
          })
            .then(() => {
              this.$router.push('/form/survey/thank-you?form=' + this.id)
            })
            .catch(res => console.log(res))
        })
      }
    },
    checkRequiredFields () {
      let warning = 0
      for (const i in this.fields) {
        if (this.fields[i].required && !this.answers[i].name) {
          this.fields[i].errors.push('This form is required')
          warning++
        }
      }
      return warning
    }
  }
}
</script>
<style scoped>
input.form-control {
  border-width: 0 0 2px 0;
  border-radius: 0;
  box-shadow: none;
}

input.form-control:focus {
  border-color: var(--primary);
}

.question {
  font-size: 15px;
}
</style>
