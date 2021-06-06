<template>
  <div class="col-12">
    <div v-for="(dates, index) in question.fieldDates" :key="index">
      <div v-if="question.type == 7">
        <div class="col-sm-8 mt-3">
          <base-input
            :id="elementId.date_input + '-' + q_key"
            v-model="dates.dateValue"
            type="date"
            placeholder="Day, month, year"
            disabled="disabled"
            @blur="submitDate(dates, question.id)"
          />
        </div>
      </div>
      <div v-if="question.type == 8">
        <div class="col-sm-8 mt-3">
          <base-input
            :id="elementId.time_input + '-' + q_key"
            v-model="dates.timeValue"
            type="time"
            value="10:30:00"
            disabled="disabled"
            @blur="submitDate(dates, question.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldDate',
  props: {
    question: {
      type: Object
    },
    q_key: { type: Number }
  },
  data () {
    return {
      elementId:{
        date_input: 'inputDate',
        time_input: 'inputTime',
      }
    }
  },
  methods: {
    async submitDate (dates, fieldId) {
      await this.postDate(dates, fieldId)
    },
    async postDate (dates, fieldId) {
      const toSave = {
        dateValue: dates.dateValue,
        timeValue: dates.timeValue,
        field: fieldId,
        description: this.question.descText,
        image: dates.image_field
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
</style>
