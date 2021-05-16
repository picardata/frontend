<template>
  <div class="col-8">
    <div class="row mt-3">
      <div class="col-sm-11">
        Allow only specific file types
      </div>
      <div class="col-sm-1 text-right pr-0">
        <b-form-checkbox
          v-model="scale.allow_spec"
          name="check-button"
          class="d-inline text-primary font-weight-600 pr-0"
          switch
          @change="submitScale(scale, question.id)"
        >
          <span class="button-required" />
        </b-form-checkbox>
      </div>
    </div>
    <div class="row mt-3 type-dropdown">
      <div class="col-sm-2">
        <button
          class="btn btn-default btn-lg text-left dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          {{ scale.from_val }}
          <font-awesome-icon :icon="['fas', 'angle-down']" class="fa-pull-right" />
        </button>
        <div class="dropdown-menu">
          <a
            v-for="nums in list_number"
            :key="nums.id"
            class="dropdown-item"
            @click="change_from(nums.id)"
          >
            {{ nums.id }}
          </a>
        </div>
      </div>
      <div class="col-sm-1 lh-55">
        to
      </div>
      <div class="col-sm-2">
        <button
          class="btn btn-default btn-lg text-left dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          {{ scale.to_val }}
          <font-awesome-icon :icon="['fas', 'angle-down']" class="fa-pull-right" />
        </button>
        <div class="dropdown-menu">
          <a
            v-for="nums in list_number"
            :key="nums.id"
            class="dropdown-item"
            @click="change_to(nums.id)"
          >
            {{ nums.id }}
          </a>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-sm-12">
        <ol>
          <li>
            <input
              v-model="scale.label_1"
              placeholder="Label 1 (Optional)"
              type="text"
              name="input-answer"
              class="form-control pcd"
              value="Label (optional)"
              @blur="submitScale(scale, question.id)"
              @keyup="submitScale(scale, question.id)"
            >
          </li>
          <li>
            <input
              v-model="scale.label_2"
              placeholder="Label 2 (Optional)"
              type="text"
              name="input-answer"
              class="form-control pcd"
              value="Label (optional)"
              @blur="submitScale(scale, question.id)"
              @keyup="submitScale(scale, question.id)"
            >
          </li>
        </ol>
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
    image_field: { type: String }
  },
  data () {
    return {
      scale: {
        allow_spec: null,
        allow_specInt: null,
        from_val: 1,
        to_val: 10,
        label_1: null,
        label_2: null
      },
      list_number: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 },
        { id: 12 },
        { id: 13 },
        { id: 14 },
        { id: 15 },
        { id: 16 },
        { id: 17 },
        { id: 18 },
        { id: 19 },
        { id: 20 }
      ]
    }
  },
  methods: {
    async submitScale (scale, fieldId) {
      await this.postScale(scale, fieldId)
    },
    async postScale (scale, fieldId) {
      const toSave = {
        allowSpecificTypes: scale.allow_spec ? 1 : 0,
        fromValue: scale.from_val,
        toValue: scale.from_val,
        label1: scale.label_1,
        label2: scale.label_2,
        field: fieldId,
        description: this.desc_field,
        image: this.image_field
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
    change_from (number) {
      this.scale.from_val = number

      this.postScale(this.scale, this.question.id)
    },
    change_to (number) {
      this.scale.to_val = number

      this.postScale(this.scale, this.question.id)
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
  border-width: 0px 0px 0px 0px;
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
