<template>
  <div class="content test">
    <nav class="fixed-top navbar-light bg-white  p-2">
      <div class="row">
        <div class="col-6 crumbs-col">
          <route-breadcrumb :crumbs="crumbs" />
        </div>
        <div class="col-6">
          <nuxt-link class="mr-3 btn btn-lg btn-outline-primary float-right btn-submit close-preview" :to="'/forms/' + $route.params.id">
            Close Preview
          </nuxt-link>
        </div>
      </div>
    </nav>
    <div class="row title-container">
      <div class="col-8 mx-auto">
        <div class="card mt-5">
          <div class="card-body">
            <hr class="title-hr float-left"><br>
            <h1>{{ name }}</h1>
            <h3>{{ description }}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="row list-question">
      <div class="col-8 mx-auto">
        <div v-for="(field, index) in fields" :key="index" class="card mt-5">
          <div class="card-body">
            <ul class="text-danger">
              <li v-for="error in field.errors" :key="error">
                {{ error }}
              </li>
            </ul>
            <div class="border-question col-lg-7">
              <h3 class="d-inline">
                {{ field.name }}
              </h3>
              <h3 v-if="field.required == 1" class="d-inline" style="color: red">
                *
              </h3>
              <label v-if="shortField[index].description !== ''" class="d-block text-muted" style="font-size: 12px;">{{ shortField[index].description }}</label>
            </div><br>
            <div v-if="field.type === 0" class="form-group scroll-horizontal">
              <input
                v-model="answers[index].name"
                type="text"
                class="form-control question"
                :maxlength="1000"
                placeholder="Short-answer text"
                style="width:42.5em"
              >
            </div>
            <div v-if="field.type === 1" class="form-group scroll-horizontal">
              <input
                v-model="answers[index].name"
                type="text"
                class="form-control question"
                :maxlength="5000"
                placeholder="Paragraph answer"
                style="width:42.5em"
              >
            </div>
            <div v-if="field.type === 2" class="form-group">
              <div v-for="choice in field.fieldChoices" :key="choice.id" class="form-inline border-choice col-7">
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
              <div v-for="choice in field.fieldChoices" :key="choice.id" class="form-inline border-choice col-7">
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
              <div style="width:25em">
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
                    multiple=""
                    @change="setFiles(index)"
                  >
                  <label class="custom-file-label" for="customFileLang">
                    {{ label }}
                  </label>
                </div>
                <label v-if="shortField[index].uploads.checkboxValue.length > 0" class="mt-2 text-muted ">Allowing types is</label>
                <ul class="list-type text-muted ">
                  <li v-for="(checkbox, check_key) in shortField[index].uploads.checkboxValue" :key="check_key" class="text-muted ">
                    {{ types[checkbox-1].name }} <span v-if="check_key < (shortField[index].uploads.checkboxValue.length - 1)">,</span>
                  </li>
                </ul>
                <div>
                  <label v-if="shortField[index].uploads.maxSize > 0" class="mt-2 text-muted "> Max file size is {{ shortField[index].uploads.maxSize }}mb </label>
                </div>
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
      <div class="col-lg-12 text-center">
        <h3>This form is created using <span class="blue-color">Picardata.</span></h3>
      </div>
      <br><br><br>
    </div>
    <footer class="fixed-bottom footer-light bg-white  p-2">
      <div class="row">
        <div class="col-6">
          <div class="card-body complete-question">
            Complete question {{ answeredQuestion }}/{{ fields.length }}
          </div>
        </div>
        <div class="col-6">
          <button class="btn btn-lg btn-primary btn-submit float-right send-response" @click="sendResponse()">
            Send Response
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import loaderMixin from '~/mixins/loader'

export default {
  layout: 'argon-navless',
  mixins: [
    loaderMixin
  ],
  async asyncData (context) {
    return await context.app.$axios.$get('/api/forms/' + context.route.params.id)
      .then((data) => {
        data.answers = []
        data.shortField = []
        data.fields = data.fields.filter((field) => {
          field.errors = []
          field.fieldChoices = field.fieldChoices ? field.fieldChoices.filter((choice) => {
            return choice.status === 1
          }) : []
          field.fieldTexts = field.fieldTexts ? field.fieldTexts.filter((y) => {
            return y.status === 1
          }) : []
          field.fieldUploads = field.fieldUploads ? field.fieldUploads.filter((y) => {
            y.checkboxValue = JSON.parse(y.checkboxValue)
            return y.status === 1
          }) : []
          field.fieldLinearScales = field.fieldLinearScales ? field.fieldLinearScales.filter((y) => {
            return y.status === 1
          }) : []
          field.fieldDates = field.fieldDates ? field.fieldDates.filter((y) => {
            return y.status === 1
          }) : []
          return field.status === 1
        })

        data.fields.map((field) => {
          if (field.type === 0 || field.type === 1) {
            data.answers.push({
              fieldId: field.id,
              type: field.type,
              name: '',
              other: '',
              files: '',
              scale: '',
              date: '',
              time: ''
            })
            data.shortField.push({
              description: null,
              image: null
            })
          } else if (field.type === 3) {
            data.answers.push({
              fieldId: field.id,
              type: field.type,
              name: [],
              other: '',
              files: '',
              scale: '',
              date: '',
              time: ''
            })
            data.shortField.push({
              description: '',
              image: ''
            })
          } else if (field.type === 4) {
            data.answers.push({
              fieldId: field.id,
              type: field.type,
              name: field.fieldChoices[0].name,
              files: '',
              scale: '',
              date: '',
              time: ''
            })
            data.shortField.push({
              description: '',
              image: ''
            })
          } else if (field.type === 5) {
            data.answers.push({
              fieldId: field.id,
              type: field.type,
              name: '',
              other: '',
              files: '',
              scale: '',
              date: '',
              time: ''
            })
            data.shortField.push({
              uploads: field.fieldUploads[0],
              description: field.fieldUploads[0].description,
              image: field.fieldUploads[0].image
            })
          } else if (field.type === 6) {
            data.answers.push({
              fieldId: field.id,
              type: field.type,
              name: '',
              other: '',
              files: '',
              scale: '',
              date: '',
              time: ''
            })
            data.shortField.push({
              linear: field.fieldLinearScales[0],
              description: field.fieldLinearScales[0].description,
              image: field.fieldLinearScales[0].image
            })
          } else if (field.type === 7 || field.type === 8) {
            data.answers.push({
              fieldId: field.id,
              type: field.type,
              name: '',
              other: '',
              files: '',
              scale: '',
              date: '',
              time: ''
            })
            data.shortField.push({
              date: field.fieldDates[0],
              description: field.fieldDates[0].description,
              image: field.fieldDates[0].image
            })
          } else {
            data.answers.push({
              fieldId: field.id,
              type: field.type,
              name: '',
              other: '',
              files: '',
              scale: '',
              date: '',
              time: ''
            })
            data.shortField.push({
              description: '',
              image: ''
            })
          }
        })
        return data
      })
      .catch(e => console.log(e))
  },
  data () {
    return {
      crumbs: [
        {
          name: 'Forms',
          path: '/forms'
        },
        {
          name: 'Preview',
          path: '/forms/' + this.$route.params.id
        }
      ],
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
    answeredQuestion () {
      return this.answers ? this.answers.filter((v) => {
        if (v.type < 5) {
          if (typeof v.name === 'object') {
            return !!v.name.map(x => x).length
          } else {
            return !!v.name
          }
        } else if (v.type === 5) { return !!v.files } else if (v.type === 6) { return !!v.scale } else if (v.type === 7) { return !!v.date } else if (v.type === 8) { return !!v.time }
      }).length : 0
    },
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
    checkRequiredFields () {
      let warning = 0
      for (const i in this.fields) {
        if (this.whichField(this.fields[i].type, i) && this.fields[i].required) {
          if (this.fields[i].errors.length <= 0) {
            this.fields[i].errors.push('This form is required')
          }
          warning++
        } else {
          this.fields[i].errors = []
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
      } else if (type === 5 && typeof value === 'object' && value[0] && value[0].length > 0) {
        return !value
      } else {
        return !value
      }
    },
    sendResponse () {
      this.checkRequiredFields()
    },
    setFiles (index) {
      this.files = [...new Set(event.target.files)]
      this.isFileNumberLimited(index)
      this.isFileSizeLimited(index)
      this.answers[index].files = this.files
    },
    isFileNumberLimited (index) {
      if (this.files.length > this.shortField[index].uploads.maxNumber) {
        this.files = []
        this.notifyVue('danger', 'You can only upload a maximum of ' + this.shortField[index].uploads.maxNumber + ' files')
        return false
      }
      return true
    },
    isFileSizeLimited (index) {
      let returns = true
      this.files.map((file) => {
        if (file.size > (this.shortField[index].uploads.maxSize * 1048576)) {
          returns = false
        }
      })
      if (!returns) {
        this.files = []
        this.notifyVue('danger', 'Maximum file size is ' + this.shortField[index].uploads.maxSize + 'mb')
      }
      return returns
    },
    notifyVue (type = 'default', message) {
      this.$notify({
        message,
        timeout: 5000,
        type
      })
    }
  }
}
</script>
<style scoped>
input.form-control.question {
  padding-left: 0px !important;
}

input.form-control {
  border-width: 0 0 0 0;
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
  max-width: 100%;
  overflow-x: hidden;
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

.crumbs-col{
  line-height: 55px;
}

.blue-color {
  color: #3E4EDD
}

.title-hr {
  height:4px;
  width: 100px;
  border-radius: 30px;
  color:#3E4EDD;
  background-color:#3E4EDD;
  margin-bottom:0 !important;
  margin-top:0 !important;
}

.border-question {
  border-style: none none solid none;
  border-bottom-color: #3E4EDD;
  border-width: 0px 0px 2px 0px;
  padding-left: 0px !important
}

.complete-question {
  font-weight: bold;
  color: black;
}

.list-question {
 min-height: 95%;
 margin-bottom: 5em;
 clear: both;
}

.send-response {
  margin: 10px 10px 0px 0px
}

.border-choice {
  border-bottom: 1.5px solid #ccc;
}

.close-preview {
  border: 2px solid #2A00A2;
  font-weight: 600;
  color: #2A00A2;
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
