<template>
  <div class="mr-3">
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <div class="all-form-title bold-text form-field field-group">
          <span class="text-label">Contract Compliance</span>
        </div>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep2.salaryFrequency" name="Payment Frequency">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Do you want to use Globelise’s locally compliant contract? <br>You can choose to upload your own contract that has been already signed.</span>
            <select v-model="contractStep5.typeOfContractDocument" class="form-control form-input" @change="toggleCustomContract($event)">
              <option v-for="(typeOfContractDocument, key) in typeOfContractDocumentOptions" :key="typeOfContractDocument + key" :value="typeOfContractDocument.id">
                {{ typeOfContractDocument.name }}
              </option>
            </select>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <div v-if="showCustomContract" :key="showCustomContractDivKey" class="all-form-title bold-text form-field mb-4">
          <ValidationProvider
            ref="customContract"
            v-slot="{ errors }"
            name="image"
          >
            <span class="text-label">Use my own contract</span><br>
            <span class="text-label-desc">
              Please make sure the PDF contract has already been signed before uploading.
            </span>
            <input
              id="customContract"
              ref="customContract"
              type="file"
              class="btn btn-sm btn-secondary btn-add-doc"
              accept="application/pdf"
              @change="handleCustomContractUpload($event)"
            >

            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep2.salaryFrequency" name="Payment Frequency">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Where is the contractor's tax residence?</span>
            <country-select v-model="contractStep5.contractorTaxResidence" :country="country" top-country="SG" class="form-control form-input" />

            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import 'vue-country-region-select'

export default {
  name: 'Step4',
  auth: true,
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: [
    'contract'
  ],
  data () {
    return {
      contractStep5: {
        customContract: this.contract.customContract,
        contractorTaxResidence: this.contract.contractorTaxResidence,
        typeOfContractDocument: this.contract.typeOfContractDocument
      },
      crumbs: [
        {
          name: 'Create Contract',
          path: '/contracts'
        }
      ],
      typeOfContractDocumentOptions: [
        {
          name: 'Use Globelise Contract',
          id: 0
        },
        {
          name: 'Use My Contract',
          id: 1
        }
      ],
      country: '',
      showCustomContract: false,
      showCustomContractDivKey: 0,
      submenu: true
    }
  },
  methods: {
    onFormChange () {

    },
    toggleCustomContract (event) {
      const typeOfDocument = event.target.value

      if (typeOfDocument === '1') {
        this.showCustomContract = true
      } else {
        this.showCustomContract = false
      }

      this.showCustomContractDivKey++
    },
    handleCustomContractUpload (event) {
      this.contractStep5.customContract = event.target.files[0]
    },
    async post () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.contract.customContract = this.contractStep5.customContract
      this.contract.contractorTaxResidence = this.contractStep5.contractorTaxResidence
      this.contract.typeOfContractDocument = this.contractStep5.typeOfContractDocument

      return isValid
    }
  }
}
</script>

<style lang="scss">
  .checkbox-wrapper {
    width: 100%;
    height: 30px;
    margin-top: 10px;

    .custom-toggle {
      float: left;
    }
    .text-label-desc {
      color: black !important;
    }
  }
  .btn-offer-stock {
    margin-top: 10px;
  }
  .btn-add-doc {
    margin-top: 10px;
  }
  .modal-stock-option {
    .modal-body {
      padding: 0 1.5rem;
    }

    h3 {
      font-size: 22px !important;
    }

    .form-field {
      margin-bottom: 10px;
    }

    .two-collumns {
      height: 110px;
      display: block;
    }

    .currency-field-wrapper {
      width: 35%;
      display: block;
      float: left;
      margin-bottom: 10px;
      padding-right: 5px;
    }

    .aggregate-value-field-wrapper {
      width: 65%;
      display: block;
      float: right;
      margin-bottom: 10px;
    }

    .total-month-vesting-field-wrapper {
      width: 49%;
      display: block;
      float: left;
      margin-bottom: 10px;
      padding-right: 5px;
    }

    .cliff-month-vesting-field-wrapper {
      width: 50%;
      display: block;
      float: right;
      margin-bottom: 10px;
    }

    .information-text-wrapper {
      background-color: #e8f1fe;
      margin-bottom: 20px;
      padding: 18px;
      border-radius: 8px;

      span {
        color: #7c8286;
      }
    }
  }

</style>
