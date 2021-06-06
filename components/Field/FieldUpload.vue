<template>
  <div class="col-8">
    <div v-for="(uploads, index) in question.fieldUploads" :key="index">
      <div class="row mt-3">
        <div class="col-sm-11">
          Allow only specific file types
        </div>
        <div class="col-sm-1 text-right pr-0">
          <b-form-checkbox
            :id="elementId.allow_specInput + '-' + q_key"
            v-model="uploads.allow_spec"
            name="check-button"
            class="d-inline text-primary font-weight-600 pr-0"
            switch
            @change="submitUpload(uploads, question.id)"
          >
            <span class="button-required" />
          </b-form-checkbox>
        </div>
      </div>
      <div v-if="uploads.allow_spec">
        <div class="row mt-3">
          <div class="col-sm-4 pl-0">
            <ul class="list-checks">
              <li v-for="type in types" :key="type.id">
                <div v-if="type.id <= 4" class="custom-control custom-checkbox mb-3">
                  <input
                    :id="elementId.option_name + '-' + q_key + '-' + type.id"
                    v-model="uploads.checkboxValue"
                    :value="type.id"
                    type="checkbox"
                    class="custom-control-input"
                    @change="submitUpload(uploads, question.id)"
                  >
                  <label :for="elementId.option_name + '-' + q_key + '-' + type.id" class="custom-control-label">
                    {{ type.name }}
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-sm-4 pl-0">
            <ul class="list-checks">
              <li v-for="type in types" :key="type.id">
                <div v-if="type.id > 4" class="custom-control custom-checkbox mb-3">
                  <input
                    :id="elementId.option_name + '-' + q_key + '-' + type.id"
                    v-model="uploads.checkboxValue"
                    :value="type.id"
                    type="checkbox"
                    class="custom-control-input"
                    @change="submitUpload(uploads, question.id)"
                  >
                  <label :for="elementId.option_name + '-' + q_key + '-' + type.id" class="custom-control-label">
                    {{ type.name }}
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row mt-3 type-dropdown">
        <button
          :id="elementId.max_numberToggle + '-' + q_key"
          class="btn btn-default btn-lg text-left dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          Choose max. number of files
          <font-awesome-icon :icon="['fas', 'angle-down']" class="fa-pull-right" />
          <span>{{ uploads.maxNumber }}</span>
        </button>
        <div class="dropdown-menu">
          <a
            v-for="(n,n_key) in 20"
            :id="elementId.max_numberSelect+'-'+q_key+'-'+n"
            :key="n_key"
            class="dropdown-item"
            @click="change_number(uploads, n)"
          >
            {{ n }}
          </a>
        </div>
      </div>
      <div class="row mt-3 type-dropdown">
        <button
          :id="elementId.max_sizeToggle + '-' + q_key"
          class="btn btn-default btn-lg text-left dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          Choose max. file sizes
          <font-awesome-icon :icon="['fas', 'angle-down']" class="fa-pull-right" />
          <span>{{ uploads.maxSize }} MB</span>
        </button>
        <div class="dropdown-menu">
          <a
            v-for="(n,n_key) in 20"
            :id="elementId.max_sizeSelect+'-'+q_key+'-'+n"
            :key="n_key"
            class="dropdown-item"
            @click="change_size(uploads, n)"
          >
            {{ n }} MB
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldUpload',
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
        allow_specInput: 'allowSpecInput',
        option_name: 'optionName',
        max_numberToggle: 'maxNumberDropdownToggle',
        max_numberSelect: 'maxNumberDropdownSelect',
        max_sizeToggle: 'maxSizeDropdownToggle',
        max_sizeSelect: 'maxSizeDropdownSelect'
      },
      types: [
        {
          name: 'Document',
          id: 1
        },
        {
          name: 'PDF',
          id: 2
        },
        {
          name: 'Drawing',
          id: 3
        },
        {
          name: 'Video',
          id: 4
        },
        {
          name: 'Spreadsheet',
          id: 5
        },
        {
          name: 'Presentation',
          id: 6
        },
        {
          name: 'Image',
          id: 7
        },
        {
          name: 'Audio',
          id: 8
        }
      ]
    }
  },
  methods: {
    async submitUpload (uploads, fieldId) {
      await this.postUpload(uploads, fieldId)
    },
    async postUpload (uploads, fieldId) {
      const toSave = {
        allowSpecificTypes: uploads.allow_spec ? 1 : 0,
        checkboxValue: JSON.stringify(uploads.checkboxValue),
        maxNumber: uploads.maxNumber,
        maxSize: uploads.maxSize,
        field: fieldId,
        description: this.question.descText,
        image: uploads.image
      }
      let axios

      if (uploads.id) {
        axios = this.$axios.$put('/api/field-uploads/' + uploads.id, toSave)
      } else {
        axios = this.$axios.$post('/api/field-uploads/', toSave)
      }

      await axios.then((res) => {
        uploads.id = res.id
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
    change_number (uploads, number) {
      uploads.maxNumber = number

      this.submitUpload(uploads, this.question.id)
    },
    change_size (uploads, number) {
      uploads.maxSize = number

      this.submitUpload(uploads, this.question.id)
    }
  }
}
</script>

<style>
.list-checks .custom-control-label::before,
.list-checks .custom-control-label::after{
  width: 30px;
  top: 0px;
  height: 30px;
  left: -2.75rem !important;
}
</style>
<style scoped>
  .list-checks{
    padding-left: 25px;
  }
  .list-checks li{
    list-style: none;
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
    border-width: 0px 0px 1px 0px;
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
</style>
