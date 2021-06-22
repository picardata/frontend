<template>
  <div class="col-8 mt-3">
    <div>
      <ul class="list-group">
        <li v-for="(choice, index) in question.fieldChoices" :key="index" class="list-group-item">
          <div class="row">
            <div class="col-1">
              <font-awesome-icon class="list-icon" :icon="['fas', findIcon(question.type)]" />
            </div>
            <div
              :class="{
                'col-10': index === lastIndex,
                'col-9': index !== lastIndex
              }"
              class="col-text"
            >
              <div class="d-flex">
                <div>
                  <input
                    v-show="choice.edit === true"
                    :id="elementId.option_input + '-' + index + '-' + question.id"
                    ref="choices"
                    v-model="choice.name"
                    type="text"
                    class="form-control choice"
                    placeholder="Add option"
                    @focus="select(index)"
                    @keyup="checkDuplicate(choice)"
                    @keyup.esc="cancelEdit(choice)"
                    @blur="doneEdit(choice, index, question.id)"
                  >
                  <span
                    v-if="index === lastIndex &&
                      !otherInChoice"
                    v-show="choice.edit === false"
                    :id="elementId.option_add + '-' + index + '-' + question.id"
                    :class="{'last-choice' : index == lastIndex}"
                    class="cursor-pointer"
                    @click="addChoice(index, 1)"
                    @dblclick="edit(choice, index)"
                  >{{ choice.name }}</span>
                  <span
                    v-if="index !== lastIndex"
                    v-show="choice.edit === false"
                    :id="elementId.option_name + '-' + index + '-' + question.id"
                    :class="{'last-choice' : index == lastIndex}"
                    class="cursor-pointer"
                    @click="addChoice(index, 1)"
                    @dblclick="edit(choice, index)"
                  >{{ choice.name }}</span>
                </div>
                <div
                  v-if="question.type !== 4 &&
                    index === lastIndex"
                  class="ml-1"
                >
                  <span>or <a :id="elementId.add_other + '-' + index + '-' + question.id" class="btn-add-other text-primary cursor-pointer" @click="addChoice(lastIndex, 2)">Add "Other"</a></span>
                </div>
              </div>
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
          <div v-if="show_features" class="add-image text-primary">
            <i class="fas fa-image" /> Add image
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
    },
    show_features: { type: Boolean }
  },
  data () {
    return {
      elementId: {
        option_input: 'inputOption',
        option_name: 'optionName',
        option_add: 'addOption',
        add_other: 'addOtherOption'
      },
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
    select (index) {
      event.target.setSelectionRange(0, this.question.fieldChoices[index].name.length)
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
          if (index === 1) {
            this.question.fieldChoices[index] = {
              id: undefined,
              type: 2,
              name: 'Other',
              edit: false,
              alert: ''
            }
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
  padding-left: 5px
}
.list-group-item{
  border-width: 0px 0px 2px 0px;
  border-radius: unset;
  position: relative;
}
.list-group-item .row{
  float: left;
  width: 85%;
}
.list-group-item .add-image{
  float: right;
  margin-right: -30%;
}
</style>
