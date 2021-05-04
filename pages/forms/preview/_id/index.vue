<template>
  <div class="content test">
    <nav class="fixed-top navbar-light bg-white  p-2">
      <div class="row">
        <div class="col-6 crumbs-col">
          <route-breadcrumb :crumbs="crumbs" />
        </div>
        <div class="col-6">
          <nuxt-link class="mr-3 btn btn-lg btn-outline-primary float-right btn-submit" :to="'/forms/' + $route.params.id">
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
            </div><br>
            <div v-if="field.type === 0" class="form-group">
              <input
                v-model="answers[index].name"
                type="text"
                class="form-control question"
                :maxlength="1000"
                placeholder="Short-answer text"
                style="width:42.5em"
              >
            </div>
            <div v-if="field.type === 1" class="form-group">
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
              <div style="width:25em">
                <br>
                <select v-model="answers[index].name" class="form-control form-select" :name="formName(field.name)">
                  <option v-for="choice in field.fieldChoices" :key="choice.id" :value="choice.name">
                    {{ choice.name }}
                  </option>
                </select>
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
export default {
  layout: 'argon-navless',
  async asyncData (context) {
    return await context.app.$axios.$get('/api/forms/' + context.route.params.id)
      .then((data) => {
        data.answers = []
        data.fields = data.fields.filter((field) => {
          field.errors = []
          field.fieldChoices = field.fieldChoices.filter((choice) => {
            return choice.status === 1
          })
          return field.status === 1
        })

        data.fields.map((field) => {
          if (field.type === 3) {
            data.answers.push({
              fieldId: field.id,
              name: [],
              other: ''
            })
          } else if (field.type === 4) {
            data.answers.push({
              fieldId: field.id,
              name: field.fieldChoices[0].name
            })
          } else {
            data.answers.push({
              fieldId: field.id,
              name: '',
              other: ''
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
      ]
    }
  },
  computed: {
    answeredQuestion () {
      return this.answers.filter((v) => {
        if (typeof v.name === 'object') {
          return !!v.name.map(x => x).length
        } else {
          return !!v.name
        }
      }).length
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
    },
    sendResponse () {
      this.checkRequiredFields()
      console.log(this.answers)
    }
  }
}
</script>
<style scoped>
input.form-control.question {
  padding-left: 0px !important;
}

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
</style>
