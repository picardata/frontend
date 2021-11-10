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
              <span class="form-title">Creating a milestone contract</span>
            </div>
          </div>
          <div class="row mt-6 contract-type-wrapper">
            <div class="col-3" />
            <div class="col-6">
              <div class="row">
                <div class="col-12">
                  <div v-if="step === 1" class="card border p-4">
                    <step1 ref="step1" :employees="employees" :contract="contract" @finishSaveProfile="next" @formProfileChange="changeFormComplete($event)" />
                  </div>
                  <div v-if="step === 2">
                    <step2 ref="step2" :contract="contract" @finishSaveProfile="next" @formProfileChange="changeFormComplete($event)" />
                  </div>
                  <div v-if="step === 3" class="card border p-4">
                    <step3 ref="step3" :contract="contract" @finishSaveProfile="next" @formProfileChange="changeFormComplete($event)" />
                  </div>
                  <div v-if="step === 4" class="card border p-4">
                    <step4 ref="step4" :contract="contract" @finishSaveProfile="next" @formProfileChange="changeFormComplete($event)" />
                  </div>

                  <div class="contract-type-actions-wrapper">
                    <button v-if="step < 5" type="button" class="btn btn-lg btn-primary btn-add next-btn" @click.prevent="next">
                      Next
                    </button>

                    <button v-if="step > 1 && step < 5" type="button" class="btn btn-lg btn-primary btn-add back-btn" @click.prevent="back">
                      <i class="fas fa-arrow-left" />
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
import step1 from '@/components/contracts/milestone/step1'
import step2 from '@/components/contracts/milestone/step2'
import step3 from '@/components/contracts/milestone/step3'
import step4 from '@/components/contracts/milestone/step4'

export default {
  layout: 'argon',
  auth: true,
  components: {
    step1,
    step2,
    step3,
    step4
  },
  async asyncData (context) {
    return await context.app.$axios.$get('/api/users/me')
      .then((data) => {
        console.log(data)
        return data
      })
      .catch(e => console.log(e))
  },

  data () {
    return {
      step: 1,
      contract: {
        legalEntity: '',
        contractName: '',
        employmentStartDate: '',
        scopeOfWork: '',
        salaryCurrency: '',
        terminationDate: '',
        noticePeriod: '',
        specialClause: '',
        additionalDocumentFilename: '',
        additionalDocument: '',
        stockOptionCurrency: '',
        stockOptionAggregateValue: '',
        stockOptionTotalNumber: '',
        stockOptionVestingStartDate: '',
        stockOptionTotalVestingMonth: '',
        stockOptionVestingCliffMonth: '',
        contractStatus: 1,
        contractorName: '',
        contractorEmailAddress: '',
        clientSignature: '',
        contractorSignature: '',
        clientSignedDate: '',
        contractorSignedDate: '',
        company: '',
        contractorTaxResidence: '',
        typeOfContractDocument: '',
        customContract: '',
        customContractFilename: '',
        milestoneDetails: [
          {
            name: '',
            amount: '',
            filename: '',
            attachedDocument: ''
          }
        ]
      },
      contractId: '',
      crumbs: [
        {
          name: 'Create Contract',
          path: '/create-contract'
        },
        {
          name: 'Milestone',
          path: '/create-contract/milestone'
        }
      ],
      submenu: true
    }
  },
  methods: {
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

        const formData = new FormData()
        formData.append('company', userMe.data.employees[0].company.id)
        formData.append('legalEntity', this.contract.legalEntity)
        formData.append('contractName', this.contract.contractName)
        formData.append('employmentStartDate', this.contract.employmentStartDate)
        formData.append('scopeOfWork', this.contract.scopeOfWork)
        formData.append('salaryCurrency', this.contract.salaryCurrency)
        formData.append('terminationDate', this.contract.terminationDate)
        formData.append('noticePeriod', this.contract.noticePeriod)
        formData.append('specialClause', this.contract.specialClause)
        formData.append('additionalDocumentFilename', this.contract.additionalDocumentFilename)
        formData.append('additionalDocument', this.contract.additionalDocument)
        formData.append('stockOptionCurrency', this.contract.stockOptionCurrency)
        formData.append('stockOptionAggregateValue', this.contract.stockOptionAggregateValue)
        formData.append('stockOptionTotalNumber', this.contract.stockOptionTotalNumber)
        formData.append('stockOptionVestingStartDate', this.contract.stockOptionVestingStartDate)
        formData.append('stockOptionTotalVestingMonth', this.contract.stockOptionTotalVestingMonth)
        formData.append('stockOptionVestingCliffMonth', this.contract.stockOptionVestingCliffMonth)
        formData.append('contractStatus', this.contract.contractStatus)
        formData.append('contractorName', this.contract.contractorName)
        formData.append('contractorEmailAddress', this.contract.contractorEmailAddress)
        formData.append('clientSignature', this.contract.clientSignature)
        formData.append('contractorSignature', this.contract.contractorSignature)
        formData.append('clientSignedDate', this.contract.clientSignedDate)
        formData.append('contractorSignedDate', this.contract.contractorSignedDate)
        formData.append('customContract', this.contract.customContract)
        formData.append('customContractFilename', this.contract.customContractFilename)
        formData.append('contractorTaxResidence', this.contract.contractorTaxResidence)
        formData.append('typeOfContractDocument', this.contract.typeOfContractDocument)

        this.$axios.$post('/api/milestone/contract/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((data) => {
          this.contractId = data
          const milestoneContract = data
          if (this.contract.milestoneDetails.length > 0) {
            const axiosCall = this.$axios
            const milestoneDetailsApiCall = []

            this.contract.milestoneDetails.forEach(function (milestoneDetail) {
              const milestoneDetailFormData = new FormData()
              milestoneDetailFormData.append('name', milestoneDetail.name)
              milestoneDetailFormData.append('amount', milestoneDetail.amount)
              milestoneDetailFormData.append('filename', milestoneDetail.filename)

              if (milestoneDetail.attachedDocument !== '') {
                milestoneDetailFormData.append('attachedDocument', milestoneDetail.attachedDocument)
              }
              milestoneDetailFormData.append('milestoneContract', milestoneContract.id)

              milestoneDetailsApiCall.push(axiosCall.$post('/api/milestone/details/', milestoneDetailFormData, { headers: { 'Content-Type': 'multipart/form-data' } }))
            })

            console.log(milestoneDetailsApiCall)
          }

          this.$router.push('/contracts/preview-contract/milestone/' + this.contractId.uuid)
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

    .form-input {
      margin: 10px 0 5px 0;
      width: 100%;
      height: 100%;
      outline: none;
      font-size: 16px;
      line-height: 24px;
      color: var(--black);
    }

    .form-signature {
      border: none;
      border-bottom: 1px solid #eee;
      font-family: 'Birthstone', cursive;
      color: black;
      font-size: 24px;
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
