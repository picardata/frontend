<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <div class="container-fluid pt-6">
          <div class="row mt-3">
            <div class="col-12 form-title-wrapper">
              <span class="form-title page-header">Payslip</span>
            </div>
          </div>
          <div class="row mt-6 contract-type-wrapper">
            <div class="col-12">
              <div class="row">
                <div class="col-2" />
                <div class="col-8">
                  <div>
                    <div class="card border p-4">
                      <div class="mr-3">
                        <div class="all-form-title bold-text form-field mb-4">
                          <span class="text-label page-header payitem-title-label">Basic Information</span>
                        </div>
                        <div class="all-form-title bold-text form-field mb-4">
                          <span class="text-label">Employee Name:</span>
                          <span class="text-label float-right">{{ employeeName }}</span>
                        </div>
                        <div class="all-form-title bold-text form-field mb-4">
                          <span class="text-label">Payslip Title:</span>
                          <span class="text-label float-right">{{ name }}</span>
                        </div>
                        <div class="all-form-title bold-text form-field mb-4">
                          <span class="text-label">Currency:</span>
                          <span class="text-label float-right">{{ currency }}</span>
                        </div>
                        <div class="all-form-title bold-text form-field">
                          <span class="text-label">Total Net Pay:</span>
                          <span class="text-label float-right">{{ netPay }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-6">
                        <div :key="payitemAdditionsKey" class="card border p-4">
                          <div>
                            <div class="row">
                              <div class="all-form-title bold-text form-field mb-2 col-12 mb-4">
                                <span class="text-label payitem-title-label page-header">Pay Item - Addition</span>
                              </div>
                            </div>
                          </div>
                          <div v-for="(payitemAddition, index) in payitemAdditions" :key="'payitemAdditions' + index">
                            <div class="row">
                              <div class="all-form-title bold-text form-field mb-2 col-6">
                                <span class="text-label">{{ payitemAddition.name }}</span>
                              </div>
                              <div class="all-form-title bold-text form-field mb-2 col-6">
                                <span class="text-label float-right">{{ payitemAddition.amount }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-6">
                        <div :key="payitemDeductionsKey" class="card border p-4">
                          <div>
                            <div class="row">
                              <div class="all-form-title bold-text form-field mb-2 col-12 mb-4">
                                <span class="text-label payitem-title-label page-header">Pay Item - Deduction</span>
                              </div>
                            </div>
                          </div>
                          <div v-for="(payitemDeduction, index) in payitemDeductions" :key="'payitemDeductions' + index">
                            <div class="row">
                              <div class="all-form-title bold-text form-field mb-2 col-6">
                                <span class="text-label">{{ payitemDeduction.name }}</span>
                              </div>
                              <div class="all-form-title bold-text form-field mb-2 col-6">
                                <span class="text-label float-right">{{ payitemDeduction.amount }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-12">
                        <div :key="payItemEmployerKey" class="card border p-4">
                          <div>
                            <div class="row">
                              <div class="all-form-title bold-text form-field mb-2 col-12 mb-4">
                                <span class="text-label payitem-title-label page-header">Pay Item - Employer Contribution</span>
                              </div>
                            </div>
                          </div>
                          <div v-for="(payitemEmployer, index) in payitemEmployers" :key="'payitemEmployers' + index">
                            <div class="row">
                              <div class="all-form-title bold-text form-field mb-2 col-6">
                                <span class="text-label">{{ payitemEmployer.name }}</span>
                              </div>
                              <div class="all-form-title bold-text form-field mb-2 col-6">
                                <span class="text-label float-right">{{ payitemEmployer.amount }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default {
  layout: 'argon',
  auth: true,
  async asyncData (context) {
    return await context.app.$axios.$get('/api/payslip/' + context.route.params.id)
      .then((data) => {
        console.log(data)
        return data
      })
      .catch(e => console.log(e))
  },

  data () {
    return {
      submenu: true,
      payitemAdditions: [],
      payitemDeductions: [],
      payitemEmployers: [],
      employeeName: '',
      payitemAdditionsKey: 0,
      payitemDeductionsKey: 0,
      payitemEmployerKey: 0,
      netPay: 0

    }
  },
  created () {
    this.employeeName = this.employee.userProfile.firstname + ' ' + this.employee.userProfile.lastname
    this.getPayItems()
  },
  methods: {
    getPayItems () {
      this.$axios.get('/api/payslip-payitem/?order[updatedAt]=asc&page_number=1&items_per_page=999&status=1&payslip=' + this.id)
        .then((payitemsData) => {
          console.log(payitemsData)
          const payitemAdditions = []
          const payitemDeductions = []
          const payitemEmployer = []
          let netPay = 0

          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          })

          if (payitemsData.data.length > 0) {
            payitemsData.data.forEach(function (payitemData) {
              let amount = payitemData.amount
              amount = parseInt(amount)

              if (payitemData.type === '1') {
                netPay = netPay + amount
              } else if (payitemData.type === '2') {
                netPay = netPay - amount
              }

              amount = formatter.format(amount)

              const payItem = {
                name: payitemData.name,
                amount,
                type: payitemData.type
              }

              if (payitemData.type === '1') {
                payitemAdditions.push(payItem)
              } else if (payitemData.type === '2') {
                payitemDeductions.push(payItem)
              } else if (payitemData.type === '3') {
                payitemEmployer.push(payItem)
              }
            })
          }

          this.payitemAdditions = payitemAdditions
          this.payitemAdditionsKey++

          this.payitemDeductions = payitemDeductions
          this.payitemDeductionsKey++

          this.payitemEmployers = payitemEmployer
          this.payitemEmployerKey++

          this.netPay = formatter.format(netPay)
        }).catch(() => {
          return false
        })
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
