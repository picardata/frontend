<template>
  <div>
    <div v-for="(q, q_key) in questions" :key="q_key" class="card mt-5">
      <div class="card-body">
        <div class=" col-8">
          <input
            v-model="q.name"
            type="text"
            name="question"
            class="form-control question"
            placeholder="Question 1"
            @change="add_field(q_key)"
          >
          <div class="btn-group type-dropdown col-12 mt-5">
            <button
              class="btn btn-default btn-lg text-left dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
            >
              <font-awesome-icon :icon="['fas', typesOfQuestion[q.type].icon]" />&nbsp;{{ typesOfQuestion[q.type].name }}
              <font-awesome-icon :icon="['fas', 'angle-down']" class="fa-pull-right" />
            </button>
            <div class="dropdown-menu">
              <a
                v-for="(t, t_key) in typesOfQuestion"
                :key="t_key"
                class="dropdown-item"
                @click="change_type(q_key, t_key)"
              >
                <font-awesome-icon :icon="['fas', t.icon]" />&nbsp;{{ t.name }}</a>
            </div>
          </div>
        </div>
        <div v-if="q.desc">
          <div v-if="q.type != 0 && q.type != 1" class="clearfix">
            <div class="col-sm-8 mt-3">
              <textarea
                v-model="description_field"
                name="text-desc"
                class="form-control pcd mt-3"
                placeholder="Description"
              />
            </div>
          </div>
          <div v-if="!q.imageDesc" class="clearfix mt-3">
            <button type="button" class="btn btn-lg bg-white text-primary btn-trash-field" @click="q.imageDesc = !q.imageDesc">
              <font-awesome-icon :icon="['fas', 'image']" />
              <span>Add image</span>
            </button>
          </div>
          <div v-if="q.imageDesc" class="clearfix mt-3">
            <div class="col-sm-8 mt-3">
              <dropzone-file-upload v-model="fileSingle" />
            </div>
          </div>
        </div>
        <Choice v-if="q.type == 2 || q.type == 3" :question="questions[q_key]" />
        <Textfield v-if="q.type == 0 || q.type == 1" />
        <FieldUpload v-if="q.type == 4" :question="questions[q_key]" :desc_field="description_field" :image_field="image_field" />
        <LinearScale v-if="q.type == 5" :question="questions[q_key]" :desc_field="description_field" :image_field="image_field" />
        <div v-if="q.type == 6">
          <div class="col-sm-8 mt-3">
            <base-input
              id="example-date-input"
              v-model="dates.date"
              type="date"
              placeholder="Day, month, year"
              @blur="submitDate(dates, q.id)"
            />
          </div>
        </div>
        <div v-if="q.type == 7">
          <div class="col-sm-8 mt-3">
            <base-input
              id="example-time-input"
              v-model="dates.time"
              type="time"
              value="10:30:00"
              @blur="submitDate(dates, q.id)"
            />
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-9 pl-5">
            <div class="d-flex">
              <div class="p-0 mr-3">
                <b-form-checkbox
                  v-model="q.required"
                  name="check-button"
                  class="d-inline text-primary font-weight-600"
                  switch
                  @change="add_field(q_key)"
                  @click="q.required = !q.required"
                >
                  <span class="button-required">Required</span>
                </b-form-checkbox>
              </div>
              <div class="divider p-0 pr-1" />
              <div class="p-0 mr-1">
                <button type="button" class="btn btn-lg bg-white text-primary btn-trash-field" @click="q.desc = !q.desc">
                  <font-awesome-icon :icon="['fas', 'plus']" />
                  <span>Add description/image</span>
                </button>
              </div>
              <div class="divider p-0 pr-1" />
              <div class="p-0 mr-1">
                <button type="button" class="btn btn-lg bg-white text-primary btn-trash-field" @click="copy_field(q_key)">
                  <font-awesome-icon :icon="['fas', 'copy']" />
                  <span>Duplicate</span>
                </button>
              </div>
              <div class="divider p-0 pr-1" />
              <div class="p-0">
                <button type="button" class="btn btn-lg delete-button bg-white btn-copy-field" @click="delete_field(q_key)">
                  <font-awesome-icon :icon="['fas', 'trash']" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
          <div class="col-3 text-right">
            <base-button outline type="primary" class="btn-prim" @click="new_field">
              Add question
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DropzoneFileUpload from '@/components/argon-core/Inputs/DropzoneFileUpload'
import Choice from '~/components/Field/Choice'
import Textfield from '~/components/Field/Textfield'
import FieldUpload from '~/components/Field/FieldUpload'
import LinearScale from '~/components/Field/LinearScale'

export default {
  name: 'Field',
  components: { Choice, Textfield, FieldUpload, LinearScale, DropzoneFileUpload },
  props: {
    questions: {
      type: Array,
      default () {
        return []
      }
    },
    add_field: { type: Function },
    change_type: { type: Function },
    copy_field: { type: Function },
    delete_field: { type: Function },
    new_field: { type: Function }
  },
  data () {
    return {
      description_field: null,
      image_field: null,
      dates: {
        date: null,
        time: null
      },
      fileSingle: [],
      typesOfQuestion: [
        {
          type: 0,
          name: 'Short answer',
          icon: 'grip-lines'
        },
        {
          type: 1,
          name: 'Paragraph',
          icon: 'align-left'
        },
        {
          type: 2,
          name: 'Multiple Choice',
          icon: 'dot-circle'
        },
        {
          type: 3,
          name: 'Checkboxes',
          icon: 'check-square'
        },
        {
          type: 4,
          name: 'File upload',
          icon: 'cloud-upload-alt'
        },
        {
          type: 5,
          name: 'Linear scale',
          icon: 'ellipsis-h'
        },
        {
          type: 6,
          name: 'Date',
          icon: 'calendar'
        },
        {
          type: 7,
          name: 'Time',
          icon: 'clock'
        }
      ]
    }
  },
  methods: {
    async submitDate (dates, fieldId) {
      await this.postDate(dates, fieldId)
    },
    async postDate (dates, fieldId) {
      const toSave = {
        dateValue: dates.date,
        timeValue: dates.time,
        field: fieldId,
        description: this.description_field,
        image: this.image_field
      }
      let axios

      if (dates.id) {
        axios = this.$axios.$put('/api/field-dates/' + dates.id, toSave)
      } else {
        axios = this.$axios.$post('/api/field-dates/', toSave)
      }

      await axios.then((res) => {
        dates.id = res.id
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

.btn-copy-field {
  margin-top: -12px;
}

.btn-trash-field {
  margin-top: -12px;
}

h1 {
  font-size: 36px;
  font-weight: bolder;
}

form {
  width: 100%;
}

.form-control {
  color: black;
}

input.question:focus,textarea.pcd:focus {
  border-color: var(--primary);
}
textarea.pcd,input.pcd{
  border-width: 0 0 2px 0;
  border-radius: 0;
  padding-left: 5px;
  font-size: 16px;
  color:#313131;
}
textarea.pcd:focus,input.pcd:focus {
  border-color: var(--primary);
  box-shadow: none;
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
  padding-left: 5px;
}

.form-control:focus {
  box-shadow: none;
}

.dropdown-toggle::after {
  display: none;
}

.dropdown-toggle:hover {
  color: #172b4d;
}

.form-control:focus {
  box-shadow: none;
}

button {
  border-width: 0;
  color: #14142B;
}

button span {
  font-size: 1rem;
}

span.button-required {
  margin-left: -15px;
}
.custom-control-label::before {
  top: 6px;
}
.custom-switch .custom-control-label::after {
  top: 6px;
}
.delete-button{
  color: #8B8B8D !important;
}
.btn-prim{
  border: 2px solid #2534B6;
  border-radius: 40px;
  text-align: center;
  color: #2534B6;
}
.btn-prim:hover{
  color: white;
}
</style>
<style>
input[type="date"],
input[type="time"]{
  border-width:0px 0px 1px 0px;
  border-radius: 0px;
}
</style>
