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
          <h1>{{ name }}</h1>
          <div class="rox pl-1">
            <p>Last Modified {{ formattedUpdatedAt }}</p>
          </div>
        </div>
        <div class="col-6">
          <span class="align-middle float-right">
            <nuxt-link to="/forms/new" class="btn btn-lg  btn-create">Create other blank form</nuxt-link>
          </span>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-4">
          <nav class="nav">
            <a class="nav-link disabled" href="#">Questions</a>
            <nuxt-link class="nav-link" :to="'/forms/result/' + id">
              View Responses
            </nuxt-link>
          </nav>
        </div>
        <div class="col-8">
          <span class="align-middle float-right">
            <nuxt-link :to="'/forms/preview/' + id" class="btn btn-lg bg-white btn-preview">
              <font-awesome-icon :icon="['fas', 'eye']" />
              Preview form</nuxt-link>
            <button class="btn btn-lg btn-primary btn-share" @click="shareModal">Share form</button>
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
          <Field
            :questions="questions"
            :add_field="addField"
            :change_type="changeType"
            :copy_field="copyField"
            :delete_field="deleteField"
            :new_field="newField"
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
    <div class="stick-bottom">
      <button
        class="btn btn-primary btn-md "
        type="button"
        @click="newField"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
      </button>
    </div>

    <ModalShare :id="id" :share-form="modals.shareForm" :title="name" @closeShareForm="modals.shareForm = false" />
  </div>
</template>

<script>
import PrevPage from '@/components/PrevPage'
import Field from '@/components/Field/Field'
import ModalShare from '@/components/pages/forms/ModalShareForm'
import loaderMixin from '~/mixins/loader'

export default {
  name: 'IndexVue',
  layout: 'argon',
  components: { PrevPage, Field, ModalShare },
  mixins: [
    loaderMixin
  ],
  async asyncData (context) {
    return await context.app.$axios.get('/api/forms/' + context.route.params.id).then((data) => {
      data.data.questions = data.data.fields.filter((x) => {
        x.fieldChoices = x.fieldChoices.filter((y) => {
          y.edit = false
          y.alert = ''
          return y.status === 1
        }).sort((a, b) => a.choiceOrder - b.choiceOrder)

        x.fieldChoices.push({
          id: undefined,
          type: 1,
          name: 'Add option',
          edit: false,
          alert: ''
        })

        x.fieldTexts = x.fieldTexts.filter((y) => {
          return y.status === 1
        })

        if (!x.fieldTexts.length > 0) {
          x.fieldTexts.push({
            id: undefined,
            description: null,
            shortAnswer: null,
            image: null,
            first_trigger: true
          })
        }

        x.fieldUploads = x.fieldUploads.filter((y) => {
          y.allow_spec = y.allowSpecificTypes === 1
          y.checkboxValue = JSON.parse(y.checkboxValue)
          return y.status === 1
        })

        if (!x.fieldUploads.length > 0) {
          x.fieldUploads.push({
            id: undefined,
            allowSpecificTypes: null,
            checkboxValue: [],
            maxNumber: 0,
            maxSize: 0,
            description: null,
            image: null
          })
        }

        x.fieldLinearScales = x.fieldLinearScales.filter((y) => {
          y.allow_spec = y.allowSpecificTypes === 1
          return y.status === 1
        })

        if (!x.fieldLinearScales.length > 0) {
          x.fieldLinearScales.push({
            id: undefined,
            allowSpecificTypes: null,
            fromValue: 1,
            toValue: 5,
            label1: null,
            label2: null,
            description: null,
            image: null
          })
        }

        x.fieldDates = x.fieldDates.filter((y) => {
          return y.status === 1
        })

        if (!x.fieldDates.length > 0) {
          x.fieldDates.push({
            id: undefined,
            dateValue: null,
            timeValue: null,
            description: null,
            image: null
          })
        }

        return x.status === 1
      })

      data.data.questions.filter((b) => {
        b.desc = false
        b.imageDesc = false

        if (b.type === 0 || b.type === 1) {
          b.descText = b.fieldTexts[0].description
        } else if (b.type === 5) {
          b.descText = b.fieldUploads[0].description
        } else if (b.type === 6) {
          b.descText = b.fieldLinearScales[0].description
        } else if (b.type > 6) {
          b.descText = b.fieldDates[0].description
        } else {
          b.descText = null
        }
      })
      return data.data
    })
  },
  data () {
    return {
      crumbs: [
        {
          name: 'Forms',
          path: '/forms'
        },
        {
          name: 'Edit Form',
          path: '/forms/id/' + this.$route.params.id
        }
      ],
      modals: {
        shareForm: false
      }
    }
  },
  computed: {
    formattedUpdatedAt () {
      return this.$moment(this.updatedAt).calendar()
    },
    questionsLength () {
      return this.questions.length
    }
  },
  methods: {
    shareModal () {
      this.modals.shareForm = true
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
        axios = this.$axios.$put('/api/fields/' + fieldId, toSave)
      } else {
        axios = this.$axios.$post('/api/fields/', toSave)
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
    addField (index) {
      this.submitField(index, this.id)
    },
    changeType (questionId, typeId) {
      this.questions[questionId].type = typeId
      this.bulkDeleteFieldChoices(questionId)
      this.bulkDeleteFieldTexts(questionId)
      this.bulkDeleteFieldUploads(questionId)
      this.bulkDeleteFieldDates(questionId)
      this.bulkDeleteFieldScales(questionId)
      this.submitField(questionId, this.id).then(() => {
        if (typeId > 1) {
          this.addChoices(questionId)
        }
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
    bulkDeleteFieldTexts (questionId) {
      this.questions[questionId].fieldTexts.map((x) => {
        if (x.id) {
          this.$axios.$delete('/api/field-texts/' + x.id)
        }
      })

      this.questions[questionId].fieldTexts = [
        {
          id: undefined,
          description: null,
          shortAnswer: null,
          image: null
        }
      ]
    },
    bulkDeleteFieldUploads (questionId) {
      this.questions[questionId].fieldUploads.map((x) => {
        if (x.id) {
          this.$axios.$delete('/api/field-uploads/' + x.id)
        }
      })

      this.questions[questionId].fieldUploads = [
        {
          id: undefined,
          allowSpecificTypes: null,
          checkboxValue: [],
          maxNumber: 0,
          maxSize: 0,
          description: null,
          image: null
        }
      ]
    },
    bulkDeleteFieldScales (questionId) {
      this.questions[questionId].fieldLinearScales.map((x) => {
        if (x.id) {
          this.$axios.$delete('/api/field-linear-scales/' + x.id)
        }
      })

      this.questions[questionId].fieldLinearScales = [
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
      ]
    },
    bulkDeleteFieldDates (questionId) {
      this.questions[questionId].fieldDates.map((x) => {
        if (x.id) {
          this.$axios.$delete('/api/field-dates/' + x.id)
        }
      })

      this.questions[questionId].fieldDates = [
        {
          id: undefined,
          dateValue: null,
          timeValue: null,
          description: null,
          image: null
        }
      ]
    },
    newField () {
      this.questions.push({
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
            order: 0,
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
        type: toCopy.type,
        required: toCopy.required,
        fieldChoices: this.copyChoices(toCopy.fieldChoices),
        fieldDates: this.copyDates(toCopy.fieldDates),
        fieldUploads: this.copyUploads(toCopy.fieldUploads),
        fieldLinearScales: this.copyScales(toCopy.fieldLinearScales),
        fieldTexts: this.copyTexts(toCopy.fieldTexts)
      }
      this.questions.splice(index + 1, 0, copied)
      this.submitField(index + 1, this.id).then(() => {
        if (copied.type === 0 || copied.type === 1) {
          this.addTexts(index + 1)
        } else if (copied.type === 2 || copied.type === 3 || copied.type === 4) {
          this.addChoices(index + 1)
        } else if (copied.type === 5) {
          this.addUploads(index + 1)
        } else if (copied.type === 6) {
          this.addScales(index + 1)
        } else if (copied.type > 6) {
          this.addDates(index + 1)
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
    addTexts (index) {
      this.questions[index]
        .fieldTexts
        .map((v) => {
          this.$axios.$post('/api/field-texts/', {
            description: v.description,
            image: v.image,
            shortAnswer: v.shortAnswer,
            field: this.questions[index].id
          })
            .then((res) => {
              v.id = res.id
            })
        })
    },
    addUploads (index) {
      this.questions[index]
        .fieldUploads
        .map((v) => {
          this.$axios.$post('/api/field-uploads/', {
            allowSpecificTypes: v.allowSpecificTypes,
            checkboxValue: JSON.stringify(v.checkboxValue),
            maxNumber: v.maxNumber,
            maxSize: v.maxSize,
            field: this.questions[index].id,
            description: v.description,
            image: v.image
          })
            .then((res) => {
              v.id = res.id
            })
        })
    },
    addScales (index) {
      this.questions[index]
        .fieldLinearScales
        .map((v) => {
          this.$axios.$post('/api/field-linear-scales/', {
            allowSpecificTypes: v.allowSpecificTypes,
            fromValue: v.fromValue,
            toValue: v.toValue,
            label1: v.label1,
            label2: v.label2,
            field: this.questions[index].id,
            description: v.description,
            image: v.image
          })
            .then((res) => {
              v.id = res.id
            })
        })
    },
    addDates (index) {
      this.questions[index]
        .fieldDates
        .map((v) => {
          this.$axios.$post('/api/field-dates/', {
            dateValue: v.dateValue,
            timeValue: v.timeValue,
            field: this.questions[index].id,
            description: v.description_field,
            image: v.image_field
          })
            .then((res) => {
              v.id = res.id
            })
        })
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
          console.log(data.updatedAt)
          this.updatedAt = data.updatedAt
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
  font-size: 36px;
  font-weight: 600;
  color: #313131;
  line-height: 48px;
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
  border-radius: 20px;
  border-top: 8px solid var(--blue);
  margin-left: 15px;
  margin-top: 15px;
  margin-bottom: 0;
  width: 130px;
}

.dropdown-toggle::after {
  display: none;
}

nav a.disabled {
  color: #14142B;
  font-weight: 600;
}

</style>
