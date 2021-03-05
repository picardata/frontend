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
              <font-awesome-icon :icon="['fas', typesOfQuestion[q.type].icon]" />&nbsp;{{ typesOfQuestion[q.type].name }}
              <font-awesome-icon :icon="['fas', 'angle-down']" class="fa-pull-right" />
            </button>
            <div class="dropdown-menu">
              <a v-for="(t, t_key) in typesOfQuestion" :key="t_key" class="dropdown-item" @click="change_type(q_key, t_key)">
                <font-awesome-icon :icon="['fas', t.icon]" />&nbsp;{{ t.name }}</a>
            </div>
          </div>
        </div>
        <Choice v-if="q.type >= 2" :question="questions[q_key]" />
        <hr>
        <div class="col-12 ">
          <div class="float-right">
            <div>
              <button type="button" class="btn btn-lg bg-default text-primary btn-trash-field" @click="copy_field(q_key)">
                <font-awesome-icon :icon="['fas', 'copy']" />
              </button>
              <button type="button" class="btn btn-lg bg-default text-primary btn-copy-field" @click="delete_field(q_key)">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
              <b-form-checkbox
                v-model="q.required"
                name="check-button"
                class="d-inline"
                switch
                @change="add_field(q_key)"
                @click="q.required = !q.required"
              >
                Required
              </b-form-checkbox>
            </div>
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

.btn-create, .btn-share {
  height: 56px;
  border-radius: 40px;
  border-width: 2px;
  font-size: 16px;
  padding: 15px 15px;
}

.btn-create {
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
  border-top: 8px solid var(--blue);
  margin-left: 15px;
  width: 130px;
}

.dropdown-toggle::after {
  display: none;
}

.form-control:focus {
  box-shadow: none;
}
</style>
