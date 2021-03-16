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
            placeholder="Question"
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
              <font-awesome-icon :icon="['fas', typesOfQuestion[q.type].icon]"/>&nbsp;{{ typesOfQuestion[q.type].name }}
              <font-awesome-icon :icon="['fas', 'angle-down']" class="fa-pull-right"/>
            </button>
            <div class="dropdown-menu">
              <a v-for="(t, t_key) in typesOfQuestion" :key="t_key" class="dropdown-item"
                 @click="change_type(q_key, t_key)">
                <font-awesome-icon :icon="['fas', t.icon]"/>&nbsp;{{ t.name }}</a>
            </div>
          </div>
        </div>
        <Choice v-if="q.type >= 2" :question="questions[q_key]"/>
        <hr>
        <div class="col-12 ">
          <div>
            <b-form-checkbox
              v-model="q.required"
              name="check-button"
              class="d-inline text-primary font-weight-600"
              switch
              @change="add_field(q_key)"
              @click="q.required = !q.required"
            ><span class="button-required">Required</span>
            </b-form-checkbox>
            <button type="button" class="btn btn-lg bg-white text-primary btn-trash-field" @click="copy_field(q_key)">
              <font-awesome-icon :icon="['fas', 'copy']"/>
              <span>Duplicate</span>
            </button>
            <button type="button" class="btn btn-lg bg-white text-primary btn-copy-field" @click="delete_field(q_key)">
              <font-awesome-icon :icon="['fas', 'trash']"/>
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Choice from '~/components/Field/Choice'

export default {
  name: 'Field',
  components: { Choice },
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
    delete_field: { type: Function }
  },
  data () {
    return {
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
          name: 'Dropdown',
          icon: 'caret-square-down'
        }
      ]
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
</style>
