<template>
  <div class="content p-0">
    <div v-if="!completedMessage.length" class="title-container">
      <div class="row">
        <div class="col-8 mx-auto">
          <div class="card mt-5 mb--3">
            <div class="card-body">
              <h1>{{ name }}</h1>
              <h3>{{ description }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-8 mx-auto">
          <div v-for="(field, index) in fields" :key="index" class="card mt-5">
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
                <div v-for="choice in field.fieldChoices" :key="choice.id" class="form-inline">
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
                <div v-for="choice in field.fieldChoices" :key="choice.id" class="form-inline">
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
                    <option v-for="choice in field.fieldChoices" :key="choice.id" :value="choice.name">
                      {{ choice.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="mt-5">
      <h3>{{ completedMessage }}</h3>
    </div>
    <div v-if="!completedMessage.length" class="footer bg-white fixed-bottom p-2">
      <div class="row">
        <div class="col-12">
          <button class="mr-3 btn btn-lg btn-primary float-right btn-submit" @click="submit">
            Send Response
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  auth: false,
  layout: 'argon-navless',
  middleware ({ store, redirect, route }) {
    // Force login if user got link from email
    if (!store.state.auth.loggedIn && route.query.account === 'picardata') {
      return redirect('/')
    }
  },
  async asyncData (context) {
    return await context.app.$axios.$get('/api/form-respondents/public/' + context.route.params.id)
      .then((data) => {
        data.form.id = data.id
        data.form.email = data.email
        data.form.answers = []
        data.form.fields = data.form.fields.filter((field) => {
          field.errors = []
          field.fieldChoices = field.fieldChoices.filter((choice) => {
            return choice.status === 1
          })
          return field.status === 1
        })

        data.form.fields.map((field) => {
          if (field.type === 3) {
            data.form.answers.push({
              fieldId: field.id,
              name: [],
              other: ''
            })
          } else if (field.type === 4) {
            data.form.answers.push({
              fieldId: field.id,
              name: field.fieldChoices[0].name
            })
          } else {
            data.form.answers.push({
              fieldId: field.id,
              name: '',
              other: ''
            })
          }
        })

        return data.form
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
            formRespondent: this.$route.params.id,
            field: this.fields[i].id
          })
            .then(() => {
              this.$router.push('/forms/survey/thank-you?form=' + this.id)
            })
            .catch(res => console.log(res))
        })
      }
    },
    checkRequiredFields () {
      let warning = 0
      for (const i in this.fields) {
        if (this.falsyValue(this.answers[i].name) && this.fields[i].required) {
          this.fields[i].errors.push('This form is required')
          warning++
        }
      }
      return warning
    },
    falsyValue (value) {
      if (typeof value === 'object') {
        return !value.map(x => x).length
      } else {
        return !value
      }
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

.content {
  background-color: #EFF7FF !important;
}

.title-container {
  padding-bottom: 100px !important;
}

.btn-submit {
  height: 56px;
  border-radius: 40px;
  font-weight: normal;
  font-size: 16px;
  padding: 15px 30px;
}
</style>
