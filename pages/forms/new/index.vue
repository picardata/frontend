<template>
  <div>
    <base-header type="white" class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <route-breadcrumb :crumbs="crumbs" />
          </nav>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <prev-page />
      <div class="row mt-3">
        <div class="col-6">
          <h1>Create blank form</h1>
        </div>
        <div class="col-6">
          <span class="align-middle float-right">
            <nuxt-link to="/forms/new" class="btn btn btn-outline-primary btn-create">Create other blank form</nuxt-link>
          </span>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-4">
          <span>Questions</span>
        </div>
        <div class="col-8">
          <span class="align-middle float-right">
            <nuxt-link :to="id ? '/forms/preview/' + id : ''" class="btn btn-lg  text-primary btn-preview">
              <font-awesome-icon :icon="['fas', 'eye']" />
              Preview form</nuxt-link>
            <button class="btn btn-lg btn-primary btn-share" @click="shareModal">Share form</button>
            <nuxt-link :to="id ? '/forms/result/' + id : ''" class="btn btn-lg  text-primary btn-preview">
              <font-awesome-icon :icon="['fas', 'poll']" />
              Survey results</nuxt-link>
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
          <Field
            :questions="questions"
            :add_field="addField"
            :change_type="changeType"
            :copy_field="copyField"
            :delete_field="deleteField"
            :new_field="newField"
            :submit_field="submitField"
            :fId="id"
          />
        </form>
      </div>
    </div>
    <modal :show.sync="modals.modal0">
      <div class="modal-header">
        <h3>Share form {{ name }}</h3>
      </div>
      <div class="modal-body">
        <div>
          <label for="">Send to</label>
          <input v-model="formRecipient" type="text" class="form-control">
          <label for="">Subject</label>
          <input v-model="subject" type="text" class="form-control">
          <label for="">Message</label>
          <input v-model="content" type="text" class="form-control">
        </div>
      </div>
      <div class="modal-footer">
        <base-button tag="button" type="primary" @click="sendForm">
          Send form
        </base-button>
      </div>
    </modal>
  </div>
</template>

<script>
import PrevPage from '@/components/PrevPage'
import Field from '@/components/Field/Field'

const falseLoader = {
  loader: false
}

export default {
  name: 'IndexVue',
  layout: 'argon',
  components: {
    PrevPage,
    Field
  },
  data () {
    return {
      id: '',
      name: 'Untitled form',
      crumbs: [
        {
          name: 'Forms',
          path: '/forms'
        },
        {
          name: 'New Form',
          path: '/forms/new'
        }
      ],
      description: '',
      questions: [
        {
          id: undefined,
          name: '',
          type: 0,
          desc: false,
          descText: null,
          imageDesc: false,
          required: false,
          fieldChoices: [
            {
              id: undefined,
              type: 1,
              name: 'Option 1',
              edit: false,
              alert: ''
            },
            {
              id: undefined,
              type: 1,
              name: 'Add option',
              edit: false,
              alert: ''
            }
          ],
          fieldDates: [
            {
              id: undefined,
              description: null,
              shortAnswer: null,
              image: null,
              first_trigger: true
            }
          ],
          fieldUploads: [
            {
              id: undefined,
              allowSpecificTypes: null,
              allow_spec: false,
              checkboxValue: [],
              maxNumber: 0,
              maxSize: 0,
              description: null,
              image: null
            }
          ],
          fieldLinearScales: [
            {
              id: undefined,
              allowSpecificTypes: null,
              allow_spec: false,
              fromValue: 1,
              toValue: 5,
              label1: null,
              label2: null,
              description: null,
              image: null
            }
          ],
          fieldTexts: [
            {
              id: undefined,
              description: null,
              shortAnswer: null,
              first_trigger: true
            }
          ]
        }
      ],
      modals: {
        modal0: false
      },
      formRecipient: '',
      subject: '',
      content: ''
    }
  },
  computed:
    {
      questionsLength () {
        return this.questions.length
      }
    },
  methods: {
    shareModal () {
      this.modals.modal0 = true
    },
    dismissModal () {
      this.modals.modal0 = false
    },
    sendForm () {
      this.formRecipient.split(',').map((v) => {
        this.$axios.$post('/api/form-respondents/', {
          subject: this.subject,
          content: this.content,
          formRespondent: {
            email: v.trim(),
            form: this.id
          }
        })
          .then(res => console.log(res))
          .catch(err => console.log(err))
      })
    },
    async submitField (index, formId) {
      const fieldId = this.questions[index].id ? this.questions[index].id : undefined
      const toSave = {
        name: this.questions[index].name ? this.questions[index].name : 'Question',
        type: this.questions[index].type,
        required: this.questions[index].required,
        form: formId
      }
      let axios

      if (fieldId) {
        axios = this.$axios.$put('/api/fields/' + fieldId, toSave, falseLoader)
      } else {
        axios = this.$axios.$post('/api/fields/', toSave, falseLoader)
      }

      await axios.then((data) => {
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
    async addField (index) {
      if (this.id === '') {
        await this.submit().then(() => {
          this.submitField(index, this.id)
        })
      } else {
        await this.submitField(index, this.id)
      }
    },
    changeType (questionId, typeId) {
      this.questions[questionId].type = typeId
      this.bulkDeleteFieldChoices(questionId)
      this.bulkDeleteFieldTexts(questionId)
      this.bulkDeleteFieldUploads(questionId)
      this.bulkDeleteFieldDates(questionId)
      this.bulkDeleteFieldScales(questionId)

      this.submit().then(() => {
        this.submitField(questionId, this.id).then(() => {
          if (typeId > 1 && typeId < 5) {
            this.addChoices(questionId)
          }else if(typeId === 5){
            this.addUploads(questionId)
          }else if(typeId === 6){
            this.addScales(questionId)
          }else if(typeId === 7 || typeId === 8){
            this.addDates(questionId)
          }else{
            this.addTexts(questionId)
          }
        })
      })
    },
    bulkDeleteFieldChoices (questionId) {
      this.questions[questionId].fieldChoices.map((x) => {
        if (x.id) {
          this.$axios.$delete('/api/field-choices/' + x.id)
        }
      })

      this.questions[questionId].fieldChoices = [
        {
          id: undefined,
          type: 1,
          name: 'Option 1',
          edit: false,
          alert: ''
        },
        {
          id: undefined,
          type: 1,
          name: 'Add option',
          edit: false,
          alert: ''
        }
      ]
    },
    newField (index) {
      this.questions.splice(index + 1, 0, {
        id: undefined,
        name: '',
        type: 0,
        desc: false,
        imageDesc: false,
        required: false,
        fieldChoices: [
          {
            id: undefined,
            order: 0,
            type: 1,
            name: 'Option 1',
            edit: false,
            alert: ''
          },
          {
            id: undefined,
            type: 1,
            name: 'Add option',
            edit: false,
            alert: ''
          }
        ],
        fieldDates: [
          {
            id: undefined,
            description: null,
            shortAnswer: null,
            image: null,
            first_trigger: true
          }
        ],
        fieldUploads: [
          {
            id: undefined,
            allowSpecificTypes: null,
            checkboxValue: [],
            maxNumber: 0,
            maxSize: 0,
            description: null,
            image: null
          }
        ],
        fieldLinearScales: [
          {
            id: undefined,
            allowSpecificTypes: null,
            fromValue: 1,
            toValue: 5,
            label1: null,
            label2: null,
            description: null,
            image: null
          }
        ],
        fieldTexts: [
          {
            id: undefined,
            description: null,
            shortAnswer: null
          }
        ]
      })
      this.submitField(this.questionsLength - 1, this.id).then(() => {
        if (this.questions[this.questionsLength - 1].type > 1) {
          this.addChoices(this.questionsLength - 1)
        }
      })
    },
    copyField (index) {
      const toCopy = this.questions[index]
      const copied = {
        id: undefined,
        name: toCopy.name,
        desc: toCopy.desc,
        descText: toCopy.descText,
        imageDesc: toCopy.imageDesc,
        type: toCopy.type,
        required: toCopy.required,
        fieldChoices: this.copyChoices(toCopy.fieldChoices),
        fieldDates: this.copyDates(toCopy.fieldDates),
        fieldUploads: this.copyUploads(toCopy.fieldUploads),
        fieldLinearScales: this.copyScales(toCopy.fieldLinearScales),
        fieldTexts: this.copyTexts(toCopy.fieldTexts)
      }
      this.questions.splice(index + 1, 0, copied)
      this.addField(index + 1).then(() => {
        if (copied.type > 1) {
          this.addChoices(index + 1)
        }
      })
    },
    copyChoices (choices) {
      return choices.map((v) => {
        return {
          id: undefined,
          type: v.type,
          name: v.name,
          edit: false,
          alert: v.alert
        }
      })
    },
    copyDates (dates) {
      return dates.map((v) => {
        return {
          id: undefined,
          dateValue: v.dateValue,
          timeValue: v.timeValue,
          description: v.description,
          image: v.image
        }
      })
    },
    copyUploads (uploads) {
      return uploads.map((v) => {
        return {
          id: undefined,
          allowSpecificTypes: v.allowSpecificTypes,
          allow_spec: v.allow_spec,
          checkboxValue: v.checkboxValue,
          maxNumber: v.maxNumber,
          maxSize: v.maxSize,
          description: v.description,
          image: v.image
        }
      })
    },
    copyScales (scales) {
      return scales.map((v) => {
        return {
          id: undefined,
          allowSpecificTypes: v.allowSpecificTypes,
          fromValue: v.fromValue,
          toValue: v.toValue,
          label1: v.label1,
          label2: v.label2,
          description: v.description,
          image: v.image
        }
      })
    },
    copyTexts (texts) {
      return texts.map((v) => {
        return {
          id: undefined,
          shortAnswer: v.shortAnswer,
          description: v.description,
          image: v.image
        }
      })
    },
    addChoices (index) {
      const lastIndex = this.questions[index].fieldChoices.length - 1
      this.questions[index]
        .fieldChoices
        .map((v, i) => {
          if (i < lastIndex) {
            this.$axios.$post('/api/field-choices/', {
              name: v.name,
              type: v.type,
              field: this.questions[index].id,
              choice_order: i
            })
              .then((res) => {
                v.id = res.id
              })
          }
        })
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
          }, falseLoader)
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
          }, falseLoader)
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

.btn-create, .btn-share, .btn-preview {
  height: 56px;
  border-radius: 40px;
  border-width: 2px;
  font-size: 16px;
  padding: 15px 15px;
}

.btn-create {
  padding: 15px 15px;
}

.btn-share, .btn-preview {
  padding: 15px 30px;
}

form {
  width: 100%;
}

.form-control {
  color: #313131;
  font-weight: 600;
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
  background:  var(--blue);
  margin-left: 15px;
  width: 130px;
  border-radius: 40px !important;
  height: 8px;
}

.dropdown-toggle::after {
  display: none;
}

.form-control:focus {
  box-shadow: none;
}
</style>
