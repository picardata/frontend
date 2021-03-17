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
        <h3 class="d-inline">
          {{ field.name }}
        </h3>
        <h3 v-if="field.required == 1" class="d-inline" style="color: red">
          *
        </h3>
        <div v-show="field.type === 0" class="form-group">
          <input
            type="text"
            class="form-control question"
          >
        </div>
        <div v-show="field.type === 1" class="form-group">
          <input
            type="text"
            class="form-control question"
          >
        </div>
        <div v-show="field.type === 2" class="form-group">
          <div v-for="choice in field.fieldChoice" :key="choice.id" class="form-inline">
            <input :id="choice.id" class="form-check-input" type="radio" :name="formName(field.name)" :value="choice.name">
            <label :for="choice.id" class="form-check-label">{{ choice.name }}</label><br><br>
            <input v-show="choice.name === 'Other'" class="form-control" type="text">
          </div>
        </div>
        <div v-show="field.type === 3" class="form-group">
          <div v-for="choice in field.fieldChoice" :key="choice.id" class="form-inline">
            <input :id="choice.id" class="form-check-input" type="checkbox" :name="formName(field.name)" :value="choice.name">
            <label :for="choice.id" class="form-check-label">{{ choice.name }}</label><br><br>
            <input v-show="choice.name === 'Other'" class="form-control" type="text">
          </div>
        </div>
        <div v-show="field.type === 4" class="form-group">
          <div>
            <br>
            <select class="form-select" :name="formName(field.name)">
              <option v-for="choice in field.fieldChoice" :key="choice.id" :value="choice.name">
                {{ choice.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData (context) {
    return await context.app.$axios.$get('/api/forms/' + context.route.params.id)
      .then((data) => {
        data.answers = []
        data.fields = data.fields.filter((field) => {
          field.fieldChoice = field.fieldChoice.filter((choice) => {
            return choice.status === 1
          })
          data.answers.push({ fieldId: field.id, name: '' })
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
</style>
