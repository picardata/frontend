<template>
  <div class="mt-5">
    <div class="card-body">
      <ul class="list-group">
        <li v-for="(choice, index) in question.fieldChoice" :key="index" class="list-group-item">
          <div class="row">
            <div class="col-1">
              <font-awesome-icon class="list-icon" :icon="['fas', findIcon(question.type)]" />
            </div>
            <div
              :class="{
                'col-2': index === lastIndex,
                'col-9': index !== lastIndex
              }"
              class="col-text"
            >
              <input
                v-if="choice.edit == true"
                v-model="choice.name"
                type="text"
                class="form-control choice"
                placeholder="Add option"
                @keyup="checkDuplicate(choice)"
                @keyup.esc="cancelEdit(choice)"
                @keyup.enter="doneEdit(choice, question.id)"
                @blur="doneEdit(choice, question.id)"
              >
              <span v-else :class="{'last-choice' : index == lastIndex}" @click="addChoice(index, 1)" @dblclick="edit(choice)">{{ choice.name }}</span>
            </div>
            <div
              v-if="question.type !== 4 &&
                index === lastIndex &&
                otherInChoice == false"
              class="col-5"
            >
              <span style="margin-left:-72px">or <a class="btn-add-other" @click="addChoice(lastIndex, 2)">add "other"</a></span>
            </div>
            <div class="col-1 col-btn">
              <font-awesome-icon
                v-if="minimumChoices &&
                  index !== lastIndex"
                class="list-icon remove-icon"
                :icon="['fas', 'times']"
                @click="removeChoice(index)"
              />
            </div>
            <div v-if="index !== lastIndex && choice.alert !== ''" class="col-1">
              <font-awesome-icon
                v-b-tooltip.hover
                :title="choice.alert"
                :icon="['fas', 'exclamation-triangle']"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Choice',
  props: {
    question: {
      type: Object
    }
  },
  data () {
    return {
      beforeEditCache: 'Add option',
      icons: [
        {
          type: 2,
          icon: 'dot-circle'
        },
        {
          type: 3,
          icon: 'check-square'
        },
        {
          type: 4,
          icon: 'caret-square-down'
        }
      ]
    }
  },
  computed: {
    minimumChoices () {
      return this.question.fieldChoice.length > 2
    },
    otherInChoice () {
      return this.question.fieldChoice.filter(x => x.type === 2).length
    },
    lastIndex () {
      return this.question.fieldChoice.length - 1
    },
    totalChoices () {
      return this.question.fieldChoice.length
    }
  },
  mounted () {
    if (this.question.type === 4) {
      this.question.fieldChoice = this.question.fieldChoice.filter(x => x.type === 1)
    }
  },
  methods: {
    findDuplicate (choice) {
      let exist = -1
      this.question.fieldChoice.map((x) => {
        if (x.name === choice.name && x.name !== 'Add option') {
          exist++
        }
      })
      return exist
    },
    checkDuplicate (choice) {
      const check = this.findDuplicate(choice)
      if (check > 0) {
        choice.alert = 'duplicate options not supported'
      } else {
        choice.alert = ''
      }
    },
    findIcon (type) {
      return this.icons.filter(x => x.type === type)[0].icon
    },
    edit (choice) {
      if (choice.type === 1) {
        if (choice.name) {
          this.beforeEditCache = choice.name
        } else {
          this.beforeEditCache = 'Add option'
        }

        choice.edit = true
      }
    },
    doneEdit (choice, fieldId) {
      if (choice.name.trim().length === 0) {
        choice.name = this.beforeEditCache
      }

      if (this.findDuplicate(choice) > 0) {
        choice.name = this.beforeEditCache
        choice.alert = ''
      }

      this.submitChoice(choice, fieldId)
      choice.edit = false
    },
    cancelEdit (choice) {
      choice.name = this.beforeEditCache
      choice.edit = false
    },
    addChoice (index, type) {
      if (this.totalChoices < 2 || this.lastIndex === index) {
        const choice = {
          id: undefined,
          order: this.otherInChoice ? this.lastIndex - 2 : this.lastIndex + 1,
          type: 1,
          name: 'Add option',
          edit: !!this.otherInChoice
        }

        if (this.otherInChoice) {
          this.question.fieldChoice.splice(this.lastIndex - 1, 0, choice)
        } else {
          this.question.fieldChoice.push(choice)
          this.question.fieldChoice[index].edit = true
        }

        if (type === 2) {
          this.question.fieldChoice[index] = {
            id: undefined,
            order: this.lastIndex,
            type: 2,
            name: 'Other',
            edit: false,
            alert: ''
          }
        }

        this.submitChoice(this.question.fieldChoice[index], this.question.id)
      }
    },
    removeChoice (index) {
      if (this.question.fieldChoice[index].id) {
        this.$axios.$delete('/api/field-choices/' + this.question.fieldChoice[index].id)
      }
      this.question.fieldChoice.splice(index, 1)
    },
    submitChoice (choice, fieldId) {
      const toSave = {
        name: choice.name,
        type: choice.type,
        field: fieldId
      }
      let axios

      if (choice.id) {
        axios = this.$axios.$put('/api/field-choices/' + choice.id, toSave)
      } else {
        axios = this.$axios.$post('/api/field-choices/', toSave)
      }

      axios.then((res) => {
        choice.id = res.id
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
.col-btn {
  margin-left: 50px
}

.last-choice {
  cursor: pointer;
  color: #0337a8;
}

.btn-add-other {
  cursor: pointer;
  color: #0337a8!important;
}

.remove-icon {
  cursor: pointer;
}

.col-text {
  margin-left: -50px;
}

form {
  width: 100%;
}

.form-control {
  color: black;
}

input.choice:focus {
  border-color: var(--primary);
}

.form-control:focus {
  box-shadow: none;
}

input.choice {
  font-size: 17px;
  border-width: 0 0 2px 0;
  border-radius: 0;
  margin-top: -10px;
}
</style>
