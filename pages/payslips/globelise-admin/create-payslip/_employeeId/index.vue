<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <div class="container-fluid pt-6">
          <div class="row mt-3">
            <div class="col-12 form-title-wrapper">
              <span class="form-title page-header">Create payslip</span>
            </div>
          </div>
          <div class="row mt-6 contract-type-wrapper">
            <div class="col-12">
              <div class="row">
                <div class="col-12">
                  <div v-if="step === 1">
                    <step1 ref="step1" :payslip="payslip" @finishSaveProfile="next" @formProfileChange="changeFormComplete($event)" />
                  </div>

                  <div class="contract-type-actions-wrapper">
                    <button v-if="step < 5" type="button" class="btn btn-lg btn-secondary btn-add next-btn" @click.prevent="next">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import 'vue-country-region-select'
import step1 from '@/components/payslip/step1'

export default {
  layout: 'argon',
  auth: true,
  components: {
    step1
  },
  async asyncData (context) {
    return await context.app.$axios.$get('/api/employees/' + context.route.params.employeeId)
      .then((data) => {
        console.log(data)
        return data
      })
      .catch(e => console.log(e))
  },

  data () {
    return {
      step: 1,
      payslip: {
        name: '',
        company: '',
        employeeName: '',
        employeeId: '',
        filename: '',
        type: '',
        currency: 'SGD',
        payitemAdditions: [
          {
            name: '',
            amount: '',
            type: '1'
          }
        ],
        payitemDeductions: [
          {
            name: '',
            amount: '',
            type: '2'
          }
        ],
        payitemEmployer: [
          {
            name: '',
            amount: '',
            type: '3'
          }
        ]
      },
      payslipId: '',
      submenu: true
    }
  },
  created () {
    this.payslip.employeeId = this.id
    this.payslip.company = this.company.id
    this.payslip.employeeName = this.userProfile.firstname + ' ' + this.userProfile.lastname
  },
  methods: {
    changeFormComplete (complete) {
      this.isProfileCompleted = complete
    },
    async next () {
      if (this.step === 1) {
        const isValid = await this.$refs.step1.post()

        if (!isValid) {
          return false
        }

        const axiosCall = this.$axios

        const formData = new FormData()
        formData.append('company', this.payslip.company)
        formData.append('name', this.payslip.name)
        formData.append('employee', this.payslip.employeeId)
        formData.append('filename', this.payslip.filename)
        formData.append('currency', this.payslip.currency)
        formData.append('type', 'manualForm')
        formData.append('status', 1)

        this.$axios.$post('/api/payslip/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((data) => {
          this.payslipId = data.uuid
          console.log(data)

          const payItems = []
          if (this.payslip.payitemAdditions.length > 0) {
            this.payslip.payitemAdditions.forEach(function (payitemAddition) {
              payitemAddition.payslip = data.id
              payItems.push(payitemAddition)
            })
          }

          if (this.payslip.payitemDeductions.length > 0) {
            this.payslip.payitemDeductions.forEach(function (payitemDeduction) {
              payitemDeduction.payslip = data.id
              payItems.push(payitemDeduction)
            })
          }

          if (this.payslip.payitemEmployer.length > 0) {
            this.payslip.payitemEmployer.forEach(function (payitemEmployer) {
              payitemEmployer.payslip = data.id
              payItems.push(payitemEmployer)
            })
          }

          if (payItems.length > 0) {
            const payItemApiCall = []
            payItems.forEach(function (payItem) {
              const payItemFormData = new FormData()
              payItemFormData.append('name', payItem.name)
              payItemFormData.append('amount', payItem.amount)
              payItemFormData.append('type', payItem.type)
              payItemFormData.append('payslip', payItem.payslip)

              payItemApiCall.push(axiosCall.$post('/api/payslip-payitem/', payItemFormData, { headers: { 'Content-Type': 'multipart/form-data' } }))
            })
          }

          this.$router.push('/payslips/globelise-admin/view-payslip/' + this.payslipId)
          return true
        }).catch((e) => {
          const errors = {}

          Object.entries(e.response.data.errors).forEach(function (value) {
            const key = value[0]
            errors[key] = value[1]
          })

          this.$refs.form.setErrors(errors)
          return false
        })
      }
    },
    back () {
      this.step--
    }
  }
}
</script>

<style scoped>
  .card {
    height: auto;
  }

  h1 {
    font-size: 36px;
    font-weight: bolder;
  }

  .form-title {
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 54px;
    /* identical to box height */
    letter-spacing: 0.75px;
    /* Body Text */
    color: #313131;
  }

  .bold-text{
    font-weight:700 !important;
  }
  .contract-type-wrapper {
    text-align: center;
  }
</style>

<style lang="scss">
  .form-title-wrapper {
    text-align: center;
    span {
      display: block;
    }
  }

  .full-contract-details {
    .form-field {
      color: #6a6969;

      .contract-main-title {
        text-align: center;
      }

      .sub-point {
        margin-left: 25px;
      }

      .sub-sub-point {
        margin-left: 50px;
      }

      b {
        color: black;
        font-weight: 900;
      }
    }
  }
  .contract-type-actions-wrapper {
    margin-bottom: 20px;

    .next-btn {
      width: 100%;
      margin-bottom: 5px;
    }

    .back-btn {
      margin-top: 0;
      background-color: transparent;
      border: 0px;
      box-shadow: none;
      color: #525f7f;
      float: left;
      padding-left: 0px;

      .fa {
        margin-right: 5px;
      }

      &.btn-primary:hover, &.btn-primary:active {
        background-color: transparent;
        border: 0px;
        box-shadow: none !important;
        color: #525f7f;
      }
    }
  }

  .signature-wrapper {
    .form-field {
      width: 40%;
    }
  }
  .all-form-title {
    font-family: 'Roboto Condensed';
    font-style: normal;
    color: #313131;
    text-align: center;
    /*margin-bottom: 30px;*/

    &.form-field {
      text-align: left;
    }

    &.two-colls {
      &.first-coll {
        padding-right: 10px;
      }
      float: left;
      display: block;
      width: 50%;
    }

    &.field-group {
      .text-label {
        font-size: 18px;
      }
      margin-bottom: 10px;
    }

    h3 {
      font-size: 18px;
    }

    .text-label {
      font-size: 16px;
      font-weight: 800 !important;
      color: #313131;

      &.payitem-title-label {
        font-size: 18px;
      }
    }
    .entity-name {
      font-size: 20px !important;
      margin: 10px 0;
      display: block;
    }

    .text-label-desc {
      display: block;
      font-size: 14px;
      color: darkgrey;
    }

    .form-checkbox {
      display: block;
      float: right;
      margin-top: -40px;
    }

    .form-control-label {
      font-size: 16px;
      font-weight: 800 !important;
      color: #313131;
    }

    .text-label-desc {
      .form-control-label {
        display: block;
        font-size: 14px;
        color: darkgrey;
      }
    }

    .btn-remove-payitem {
      margin-top: 2.5rem !important;
    }

    .form-input {
      margin: 10px 0 5px 0;
      width: 100%;
      height: auto;
      outline: none;
      font-size: 16px;
      line-height: 24px;
      color: var(--black);

      &.payitem {
        height: auto !important;
      }
    }

    .form-signature {
      border: none;
      border-bottom: 1px solid #eee;
      font-family: 'Birthstone', cursive;
      color: black;
      font-size: 24px;
    }

    .contract-review-field-wrapper {
      background-color: #f4f3f5;
      padding: 10px 10px;
      height: 40px;
      margin: 10px 0 0 0;
      display: inline-table;
      width: 100%;

      .text-left {
        float: left;
      }

      .text-right {
        float: right;
        font-weight: bold !important;
      }
    }
  }

  .list-packages{
    padding-left: 0px;

    li{
      list-style: none;
    }
  }
  .list-item-packages{
    li{
      list-style: inside;
      font-family: 'Roboto Condensed';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      letter-spacing: 0.75px;
      /* Body Text */
      color: #000;
    }
  }
  hr{
    &.black-line{
      width: 100%;
      color: #E0E0E0;
      background-color: #E0E0E0;
      margin:1em auto;
    }
  }
  .cards-info{
    span{
      letter-spacing: 0.75px;
      margin-rigt: 6px;
    }
  }
  div{
    &.divider{
      border-left: 1px solid #EFF7FF !important;
    }
  }
</style>
