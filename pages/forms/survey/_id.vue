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
              <label v-if="shortField[index].description !== ''" class="d-block text-muted" style="font-size: 12px;">{{ shortField[index].description }}</label>
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
                  <select v-model="answers[index].name" class="form-control form-select" :name="formName(field.name)">
                    <option v-for="choice in field.fieldChoices" :key="choice.id" :value="choice.name">
                      {{ choice.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div v-if="field.type === 5" class="form-group">
                <div style="width:25em" class="file-upload">
                  <br>
                  <div class="custom-file">
                    <input
                      id="customFileLang"
                      type="file"
                      class="custom-file-input"
                      lang="en"
                      @change="setFiles(index)"
                    >
                    <label class="custom-file-label" for="customFileLang">
                      {{ label }}
                    </label>
                  </div>
                  <label class="mt-2 text-muted ">Allowing types :</label>
                  <ul class="list-type text-muted ">
                    <li v-for="(checkbox, check_key) in shortField[index].uploads.checkboxValue" :key="check_key" class="text-muted ">
                      {{ types[checkbox-1].name }} <span v-if="check_key < (shortField[index].uploads.checkboxValue.length - 1)">,</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div v-if="field.type === 6" class="form-group">
                <div style="width:32em;" class="linear-scale scroll-horizontal">
                  <br>
                  <div class="text-center">
                    <div class="d-inline">
                      {{ shortField[index].linear.label1 }}
                    </div>
                    <div v-for="(n,n_key) in shortField[index].linear.toValue" :key="n_key" class="d-inline">
                      <base-radio
                        v-model="answers[index].scale"
                        :name="n"
                        class="mb-3 d-inline"
                      >
                        {{ n }}
                      </base-radio>
                    </div>
                    <div class="d-inline ml-4">
                      {{ shortField[index].linear.label2 }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="field.type === 7" class="form-group">
                <div style="width: 25em" class="field-dates">
                  <br>
                  <base-input
                    id="example-date-input"
                    v-model="answers[index].date"
                    type="date"
                    placeholder="Day, month, year"
                  />
                </div>
              </div>
              <div v-if="field.type === 8" class="form-group">
                <div style="width: 25em" class="field-dates">
                  <br>
                  <base-input
                    id="example-time-input"
                    v-model="answers[index].time"
                    type="time"
                  />
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
import loaderMixin from '~/mixins/loader'

export default {
  auth: false,
  layout: 'argon-navless',
  mixins: [
    loaderMixin
  ],
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
        data.form.shortField = []
        data.form.fields = data.form.fields.filter((field) => {
          field.errors = []
          field.fieldChoices = field.fieldChoices.filter((choice) => {
            return choice.status === 1
          })
          field.fieldTexts = field.fieldTexts.filter((y) => {
            return y.status === 1
          })
          field.fieldUploads = field.fieldUploads.filter((y) => {
            y.checkboxValue = JSON.parse(y.checkboxValue)
            return y.status === 1
          })
          field.fieldLinearScales = field.fieldLinearScales.filter((y) => {
            return y.status === 1
          })
          field.fieldDates = field.fieldDates.filter((y) => {
            return y.status === 1
          })
          return field.status === 1
        })

        data.form.fields.map((field) => {
          if (field.type === 0 || field.type === 1) {
            data.form.answers.push({
              fieldId: field.id,
              type: field.type,
              name: '',
              other: '',
              files: '',
              scale: '',
              date: '',
              time: ''
            })
            data.form.shortField.push({
              description: field.fieldTexts[0].description,
              image: field.fieldTexts[0].image
            })
          } else if (field.type === 3) {
            data.form.answers.push({
              fieldId: field.id,
              type: field.type,
              name: [],
              other: '',
              files: '',
              scale: '',
              date: '',
              time: ''
            })
            data.form.shortField.push({
              description: '',
              image: ''
            })
          } else if (field.type === 4) {
            data.form.answers.push({
              fieldId: field.id,
              type: field.type,
              name: field.fieldChoices[0].name,
              files: '',
              scale: '',
              date: '',
              time: ''
            })
            data.form.shortField.push({
              description: '',
              image: ''
            })
          } else if (field.type === 5) {
            data.form.answers.push({
              fieldId: field.id,
              type: field.type,
              name: '',
              other: '',
              files: '',
              scale: '',
              date: '',
              time: ''
            })
            data.form.shortField.push({
              uploads: field.fieldUploads[0],
              description: field.fieldUploads[0].description,
              image: field.fieldUploads[0].image
            })
          } else if (field.type === 6) {
            data.form.answers.push({
              fieldId: field.id,
              type: field.type,
              name: '',
              other: '',
              files: '',
              scale: '',
              date: '',
              time: ''
            })
            data.form.shortField.push({
              linear: field.fieldLinearScales[0],
              description: field.fieldLinearScales[0].description,
              image: field.fieldLinearScales[0].image
            })
          } else if (field.type === 7 || field.type === 8) {
            data.form.answers.push({
              fieldId: field.id,
              type: field.type,
              name: '',
              other: '',
              files: '',
              scale: '',
              date: '',
              time: ''
            })
            data.form.shortField.push({
              date: field.fieldDates[0],
              description: field.fieldDates[0].description,
              image: field.fieldDates[0].image
            })
          } else {
            data.form.answers.push({
              fieldId: field.id,
              type: field.type,
              name: '',
              other: '',
              files: '',
              scale: '',
              date: '',
              time: ''
            })
            data.form.shortField.push({
              description: '',
              image: ''
            })
          }
        })

        return data.form
      })
      .catch(e => console.log(e))
  },
  data () {
    return {
      types: [
        {
          name: 'Document',
          id: 1
        },
        {
          name: 'PDF',
          id: 2
        },
        {
          name: 'Drawing',
          id: 3
        },
        {
          name: 'Video',
          id: 4
        },
        {
          name: 'Spreadsheet',
          id: 5
        },
        {
          name: 'Presentation',
          id: 6
        },
        {
          name: 'Image',
          id: 7
        },
        {
          name: 'Audio',
          id: 8
        }
      ],
      files: []
    }
  },
  computed: {
    label () {
      const fileNames = []
      for (const file of this.files) {
        fileNames.push(file.name)
      }
      return fileNames.length ? fileNames.join(', ') : 'Select file'
    }
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
          const files = v.files
          const scale = v.scale
          const date = v.date
          const time = v.time
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
          name = typeof name === 'object' ? [...new Set(name)] : name
          this.$axios.$post('/api/field-answers/', {
            name: typeof name === 'object' ? name.join(',') : name,
            fileName: typeof files === 'object' ? files[0].name : '',
            scale,
            date,
            time,
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
        if (this.whichField(this.fields[i].type, i) && this.fields[i].required) {
          this.fields[i].errors.push('This form is required')
          warning++
        }
      }
      return warning
    },
    whichField (type, i) {
      if (type < 5) { return this.falsyValue(this.answers[i].name, type) }
      if (type === 5) { return this.falsyValue(this.answers[i].files, type) }
      if (type === 6) { return this.falsyValue(this.answers[i].scale, type) }
      if (type === 7) { return this.falsyValue(this.answers[i].date, type) }
      if (type === 8) { return this.falsyValue(this.answers[i].time, type) }
      return false
    },
    falsyValue (value, type) {
      if (typeof value === 'object' && type !== 5) {
        return !value.map(x => x).length
      } else if (type === 5 && typeof value === 'object' && value[0].length > 0) {
        return !value
      } else {
        return !value
      }
    },
    setFiles (index) {
      this.files = event.target.files
      this.answers[index].files = this.files
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
.file-upload label.text-muted{
  font-size: 12px;
}
.file-upload .custom-file-label{
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
}
.list-type {
  display: inline;
  padding-left:5px;
}
.list-type li{
  display:inline;
  list-style: none;
  font-size: 12px;
}
.linear-scale{
  height: 85px;
}
.scroll-horizontal{
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}
</style>

<style>
.linear-scale .custom-control-label::before,
.linear-scale .custom-control-label::after{
  left: -3px !important;
  top: 25px !important;
}
</style>
