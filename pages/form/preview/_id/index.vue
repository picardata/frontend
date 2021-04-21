<template>
  <div class="content test">
    <nav class="fixed-top navbar-light bg-white  p-2">
      <div class="row">
        <div class="col-12">
          <nuxt-link class="mr-3 btn btn-lg btn-outline-primary float-right btn-submit" :to="'/form/' + $route.params.id">
            Close Preview
          </nuxt-link>
        </div>
      </div>
    </nav>
    <div class="row title-container">
      <div class="col-8 mx-auto">
        <div class="card mt-5">
          <div class="card-body">
            <h1>{{ name }}</h1>
            <h3>{{ description }}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-8 mx-auto">
        <div v-for="(field, index) in fields" :key="index" class="card mt-3">
          <div class="card-body">
            <h3 class="d-inline">
              {{ field.name }}
            </h3>
            <h3 v-if="field.required == 1" class="d-inline" style="color: red">
              *
            </h3>
            <div v-if="field.type === 0" class="form-group">
              <input
                type="text"
                class="form-control question"
              >
            </div>
            <div v-if="field.type === 1" class="form-group">
              <input
                type="text"
                class="form-control question"
              >
            </div>
            <div v-if="field.type === 2" class="form-group">
              <div v-for="choice in field.fieldChoices" :key="choice.id" class="form-inline">
                <input
                  :id="choice.id"
                  class="form-check-input"
                  type="radio"
                  :name="formName(field.name)"
                  :value="choice.name"
                >
                <label :for="choice.id" class="form-check-label">{{ choice.name }}</label><br><br>
                <input v-if="choice.name === 'Other'" class="form-control" type="text">
              </div>
            </div>
            <div v-if="field.type === 3" class="form-group">
              <div v-for="choice in field.fieldChoices" :key="choice.id" class="form-inline">
                <input
                  :id="choice.id"
                  class="form-check-input"
                  type="checkbox"
                  :name="formName(field.name)"
                  :value="choice.name"
                >
                <label :for="choice.id" class="form-check-label">{{ choice.name }}</label><br><br>
                <input v-if="choice.name === 'Other'" class="form-control" type="text">
              </div>
            </div>
            <div v-if="field.type === 4" class="form-group">
              <div>
                <br>
                <select class="form-select" :name="formName(field.name)">
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
</template>
<script>
export default {
  layout: 'argon-navless',
  async asyncData (context) {
    return await context.app.$axios.$get('/api/forms/' + context.route.params.id)
      .then((data) => {
        data.answers = []
        data.fields = data.fields.filter((field) => {
          field.fieldChoices = field.fieldChoices.filter((choice) => {
            return choice.status === 1
          })
          data.answers.push({
            fieldId: field.id,
            name: ''
          })
          return field.status === 1
        })
        console.log(data)
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
  padding-top: 100px !important;
}

.btn-submit {
  height: 56px;
  border-radius: 40px;
  font-weight: normal;
  font-size: 16px;
  padding: 15px 30px;
}
</style>
