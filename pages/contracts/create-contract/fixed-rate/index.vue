<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <base-header type="grey" class="pb-6">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                <route-breadcrumb :crumbs="crumbs" />
              </nav>
            </div>
          </div>
        </base-header>
        <div class="container-fluid mt--6">
          <div class="row mt-3">
            <div class="col-12 form-title-wrapper">
              <span class="form-title">Creating a fixed contract</span>
              <span>For contracts that have a fixed rate on every payment cycle</span>
            </div>
          </div>
          <div class="row mt-6 contract-type-wrapper">
            <div class="col-3"></div>
            <div class="col-6">
              <div class="row">
                <div class="col-12">
                  <div class="card border p-4" v-if="step === 1">
                    <step1 :contract = "contract" ref="step1" @finishSaveProfile="next" @formProfileChange="changeFormComplete($event)" />
                  </div>
                  <div class="card border p-4" v-if="step === 2">
                    <step2 :contract = "contract" ref="step2" @finishSaveProfile="next" @formProfileChange="changeFormComplete($event)" />
                  </div>
                  <div class="card border p-4" v-if="step === 3">
                    <step3 :contract = "contract" ref="step3" @finishSaveProfile="next" @formProfileChange="changeFormComplete($event)" />
                  </div>
                  <div class="card border p-4" v-if="step === 4">
                    <step4 :contract = "contract" ref="step4" @finishSaveProfile="next" @formProfileChange="changeFormComplete($event)" />
                  </div>

                  <div v-if="step === 5">
                    <step5 :contract = "contract" ref="step5"/>
                  </div>

                  <div class="contract-type-actions-wrapper">
                    <button v-if="step < 5" type="button" class="btn btn-lg btn-primary btn-add next-btn" @click.prevent="next">
                      Next
                    </button>

                    <button v-if="step > 1 && step < 5" type="button" class="btn btn-lg btn-primary btn-add back-btn" @click.prevent="back">
                      <i class="fas fa-arrow-left"></i>
                      Back
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
import step1 from '@/components/contracts/fixedRate/step1'
import step2 from '@/components/contracts/fixedRate/step2'
import step3 from '@/components/contracts/fixedRate/step3'
import step4 from '@/components/contracts/fixedRate/step4'
import step5 from '@/components/contracts/fixedRate/step5'

export default {
  layout: 'argon',
  auth: true,
  components: {
    step1,
    step2,
    step3,
    step4,
    step5
  },
  data () {
    return {
      step: 1,
      contract: {
        legalEntity: '',
        contractName: '',
        jobTitle: '',
        seniorityLevel: '',
        scopeOfWork: '',
        startDate: new Date(),
        salaryAmount: '',
        salaryCurrency: '',
        salaryFrequency: '',
        isInvoiceSettingsCustomisable: false,
        invoiceCycleEnds: '',
        invoicePaymentDue: '',
        isInvoicePaymentPayAheadOfTheWeekend: false,
        firstPaymentDate: new Date(),
        firstPaymentType: '',
        firstPaymentAmount: '',
        terminationDate: new Date(),
        noticePeriod: '',
        specialClause: '',
        contractStatus: 1
      },
      contractorStartDateconfig: {
        allowInput: true,
        altFormat: 'j F Y',
        altInput: true
      },
      crumbs: [
        {
          name: 'Create Contract',
          path: '/contracts'
        }
      ],
      seniorityLevels: [
        {
          name: 'Not applicable',
          id: 1
        },
        {
          name: 'Junior',
          id: 2
        },
        {
          name: 'Mid',
          id: 3
        },
        {
          name: 'Senior',
          id: 4
        },
        {
          name: 'Lead',
          id: 5
        },
        {
          name: 'Principal / Staff',
          id: 6
        },
        {
          name: 'Director',
          id: 7
        },
        {
          name: 'Head of Department',
          id: 8
        },
        {
          name: 'Vice President',
          id: 9
        },
        {
          name: 'Senior Vice President',
          id: 10
        },
        {
          name: 'C-level Executive',
          id: 11
        }
      ],
      submenu: true
    }
  },
  methods: {
    onFormChange () {},
    changeFormComplete (complete) {
      this.isProfileCompleted = complete
    },
    async next () {
      if (this.step === 1) {
        const result = await this.$refs.step1.post()

        if (result) {
          this.step++
        }
      } else if (this.step === 2) {
        const result = await this.$refs.step2.post()

        if (result) {
          this.step++
        }
      } else if (this.step === 3) {
        const result = await this.$refs.step3.post()

        if (result) {
          this.step++
        }
      } else if (this.step === 4) {
        const isValid = await this.$refs.step4.post()

        if (!isValid) {
          return false
        }

        const userMe = await this.$axios.get('/api/users/me')

        const result = this.$axios.$post('/api/fixed/rate/contract/', {
          legalEntity: this.contract.legalEntity,
          contractName: this.contract.contractName,
          jobTitle: this.contract.jobTitle,
          seniorityLevel: this.contract.seniorityLevel,
          scopeOfWork: this.contract.scopeOfWork,
          startDate: this.contract.startDate,
          salaryAmount: this.contract.salaryAmount,
          salaryCurrency: this.contract.salaryCurrency,
          salaryFrequency: this.contract.salaryFrequency,
          isInvoiceSettingsCustomisable: this.contract.isInvoiceSettingsCustomisable,
          invoiceCycleEnds: this.contract.invoiceCycleEnds,
          invoicePaymentDue: this.contract.invoicePaymentDue,
          isInvoicePaymentPayAheadOfTheWeekend: this.contract.isInvoicePaymentPayAheadOfTheWeekend,
          firstPaymentDate: this.contract.firstPaymentDate,
          firstPaymentType: this.contract.firstPaymentType,
          firstPaymentAmount: this.contract.firstPaymentAmount,
          terminationDate: this.contract.terminationDate,
          noticePeriod: this.contract.noticePeriod,
          specialClause: this.contract.specialClause,
          contractStatus: this.contract.contractStatus,
          company: userMe.data.employees[0].company.id
        }).then(() => {
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

        if (result) {
          this.step++
        }
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

    .form-input {
      margin: 10px 0 5px 0;
      width: 100%;
      height: 100%;
      outline: none;
      font-size: 16px;
      line-height: 24px;
      color: var(--black);
    }

    .contract-review-field-wrapper {
      background-color: #f1eeee;
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
