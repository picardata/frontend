<template>
  <div class="col-8">
    <div v-for="(scale, index) in question.fieldLinearScales" :key="index">
      <div class="row mt-3 type-dropdown">
        <div class="col-sm-2">
          <button
            :id="elementId.fromToggle+'-'+q_key"
            class="btn btn-default btn-lg text-left dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {{ scale.fromValue }}
            <font-awesome-icon :icon="['fas', 'angle-down']" class="fa-pull-right" />
          </button>
          <div class="dropdown-menu">
            <a
              :id="elementId.fromSelect+'-'+q_key+'-'+0"
              class="dropdown-item"
              @click="change_from(scale, 0)"
            >
              0
            </a>
            <a
              :id="elementId.fromSelect+'-'+q_key+'-'+1"
              class="dropdown-item"
              @click="change_from(scale, 1)"
            >
              1
            </a>
          </div>
        </div>
        <div class="col-sm-1 lh-55">
          to
        </div>
        <div class="col-sm-2">
          <button
            :id="elementId.toToggle+'-'+q_key"
            class="btn btn-default btn-lg text-left dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {{ scale.toValue }}
            <font-awesome-icon :icon="['fas', 'angle-down']" class="fa-pull-right" />
          </button>
          <div class="dropdown-menu">
            <a
              v-for="(n,n_key) in 10"
              :id="elementId.fromSelect+'-'+q_key+'-'+n"
              :key="n_key"
              class="dropdown-item"
              @click="change_to(scale, n)"
            >
              {{ n }}
            </a>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-sm-12">
          <ol>
            <li>
              <input
                :id="elementId.label1+'-'+q_key"
                v-model="scale.label1"
                placeholder="Label 1 (Optional)"
                type="text"
                name="input-answer"
                class="form-control pcd"
                @blur="submitScale(scale, question.id)"
                @keyup="submitScale(scale, question.id)"
              >
            </li>
            <li>
              <input
                :id="elementId.label2+'-'+q_key"
                v-model="scale.label2"
                placeholder="Label 2 (Optional)"
                type="text"
                name="input-answer"
                class="form-control pcd"
                @blur="submitScale(scale, question.id)"
                @keyup="submitScale(scale, question.id)"
              >
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinearScale',
  props: {
    question: {
      type: Object
    },
    desc_field: { type: String },
    image_field: { type: String },
    q_key: { type: Number }
  },
  data () {
    return {
      elementId: {
        fromToggle: 'maxNumberDropdownToggle',
        fromSelect: 'maxNumberDropdownSelect',
        toToggle: 'maxSizeDropdownToggle',
        toSelect: 'maxSizeDropdownSelect',
        label1: 'label1Input',
        label2: 'label2Input'
      },
      scale: {
        allow_spec: null,
        allow_specInt: null,
        fromValue: 1,
        toValue: 10,
        label_1: null,
        label_2: null
      }
    }
  },
  methods: {
    async submitScale (scale, fieldId) {
      await this.postScale(scale, fieldId)
    },
    async postScale (scale, fieldId) {
      const toSave = {
        allowSpecificTypes: scale.allow_spec ? 1 : 0,
        fromValue: scale.fromValue,
        toValue: scale.toValue,
        label1: scale.label1 === '' ? null : scale.label1,
        label2: scale.label2 === '' ? null : scale.label2,
        field: fieldId,
        description: this.question.descText,
        image: scale.image
      }
      let axios

      if (scale.id) {
        axios = this.$axios.$put('/api/field-linear-scales/' + scale.id, toSave)
      } else {
        axios = this.$axios.$post('/api/field-linear-scales/', toSave)
      }

      await axios.then((res) => {
        scale.id = res.id
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
    change_from (scale, number) {
      scale.fromValue = number

      this.postScale(scale, this.question.id)
    },
    change_to (scale, number) {
      scale.toValue = number

      this.postScale(scale, this.question.id)
    }
  }
}
</script>

<style scoped>
ol{
 padding-left: 30px;
}
ol li:not(:first-child){
  margin-top: 1.5rem;
}
.dropdown-toggle::after {
  display: none;
}

.dropdown-toggle:hover {
  color: #172b4d;
}
.type-dropdown {
  padding: 0;
}

.type-dropdown .btn {
  height: 56px;
  text-align: left;
  background-color: transparent;
  box-shadow: none;
  border: solid #dee2e6;
  border-width: 0px 0px 2px 0px;
  font-size: 16px;
  width: 100%;
  border-radius: 0px;
  font-weight: normal;
  color: #172b4d;
}
.type-dropdown .btn span{
  float: right;
  margin-right: 10px;
}
button {
  border-width: 0;
  color: #14142B;
}

button span {
  font-size: 1rem;
}
.lh-55{
  line-height: 55px;
}

input.pcd{
  border-width: 0 0 2px 0;
  border-radius: 0;
  padding-left: 5px;
  font-size: 16px;
  color:#313131;
}
input.pcd:focus {
  border-color: var(--primary);
  box-shadow: none;
}
</style>
