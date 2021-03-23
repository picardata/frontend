<template>
  <div class="mt-5">
    <div class="card-body">
      <ul class="list-group">
        <li v-for="(choice, index) in question.fieldChoices" :key="index" class="list-group-item">
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
                v-show="choice.edit === true"
                ref="choices"
                v-model="choice.name"
                type="text"
                class="form-control choice"
                placeholder="Add option"
                @keyup="checkDuplicate(choice)"
                @keyup.esc="cancelEdit(choice)"
                @change="doneEdit(choice, index, question.id)"
              >
              <span v-show="choice.edit === false" :class="{'last-choice' : index == lastIndex}" @click="addChoice(index, 1)" @dblclick="edit(choice, index)">{{ choice.name }}</span>
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
      beforeEditCache: '',
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
      return this.question.fieldChoices.length > 2
    },
    otherInChoice () {
      return this.question.fieldChoices.filter(x => x.type === 2).length
    },
    lastIndex () {
      return this.question.fieldChoices.length - 1
    },
    totalChoices () {
      return this.question.fieldChoices.length
    },
    highestDefaultChoice () {
      let h = 0
      const temp = this.question.fieldChoices
      for (const x in temp) {
        if (/Option \d/.test(temp[x].name)) {
          const i = parseInt(temp[x].name.replace('Option ', ''))
          h = h >= i ? h : i
        }
      }
      return h + 1
    },
    defaultChoice () {
      return 'Option ' + this.highestDefaultChoice
    }
  },
  mounted () {
    if (this.question.type === 4) {
      this.question.fieldChoices = this.question.fieldChoices.filter(x => x.type === 1)
    }
  },
  methods: {
    findDuplicate (choice) {
      let exist = -1
      this.question.fieldChoices.map((x) => {
        if (x.name.trim() === choice.name.trim() && x.name !== 'Add option') {
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
    edit (choice, index) {
      if (choice.type === 1) {
        if (choice.name) {
          this.beforeEditCache = choice.name
        } else {
          this.beforeEditCache = this.defaultChoice
        }
        choice.edit = true
        this.$nextTick(() => {
          this.$refs.choices[index].focus()
        })
      }
    },
    async doneEdit (choice, key, fieldId) {
      if (choice.name.trim().length === 0) {
        choice.name = this.beforeEditCache
      }

      if (this.findDuplicate(choice) > 0) {
        choice.name = this.beforeEditCache
        choice.alert = ''
      }

      await this.submitChoice(choice, key, fieldId)
      choice.edit = false
    },
    cancelEdit (choice) {
      choice.name = this.beforeEditCache
      choice.edit = false
      choice.alert = ''
    },
    async addChoice (index, type) {
      if (this.totalChoices < 2 || this.lastIndex === index) {
        let targetInput
        const choice = {
          id: undefined,
          type: 1,
          name: 'Add option',
          edit: !!this.otherInChoice,
          alert: ''
        }

        if (this.otherInChoice) {
          choice.edit = true
          choice.name = this.defaultChoice
          this.question.fieldChoices.splice(this.lastIndex - 1, 0, choice)
          this.beforeEditCache = this.question.fieldChoices[this.lastIndex - 2].name
          targetInput = this.lastIndex - 2
        } else {
          this.question.fieldChoices.push(choice)
          this.question.fieldChoices[index].edit = true
          this.question.fieldChoices[index].name = this.defaultChoice
          this.beforeEditCache = this.question.fieldChoices[index].name
          targetInput = index
        }

        if (type === 2) {
          this.question.fieldChoices[index] = {
            id: undefined,
            type: 2,
            name: 'Other',
            edit: false,
            alert: ''
          }
        }
        await this.submitChoice(this.question.fieldChoices[index], index, this.question.id)
        this.$nextTick(() => {
          this.$refs.choices[targetInput].focus()
        })
      }
    },
    removeChoice (index) {
      if (this.question.fieldChoices[index].id) {
        this.$axios.$delete('/api/field-choices/' + this.question.fieldChoices[index].id)
      }
      this.question.fieldChoices.splice(index, 1)
      this.reIndexChoices()
    },
    async submitChoice (choice, key, fieldId) {
      const toSave = {
        name: choice.name,
        type: choice.type,
        field: fieldId,
        choice_order: key
      }
      let axios

      if (choice.id) {
        axios = this.$axios.$put('/api/field-choices/' + choice.id, toSave)
      } else {
        axios = this.$axios.$post('/api/field-choices/', toSave)
      }

      await axios.then((res) => {
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

      this.reIndexChoices()
    },
    reIndexChoices () {
      this.question.fieldChoices.map((choice, key) => {
        if (choice.id !== undefined) {
          this.$axios.$put('/api/field-choices/' + choice.id, {
            name: choice.name,
            type: choice.type,
            field: this.question.id,
            choice_order: key
          })
        }
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
