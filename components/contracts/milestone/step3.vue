<template>
  <div class="mr-3">
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="contractStep3.terminationDate" name="Termination date">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Termination date</span><br>
            <span class="text-label-desc">The client will pay the contractor until the contract has been terminated.</span>
            <base-input class="text-label">
              <flat-picker
                v-model="contractStep3.terminationDate"
                slot-scope="{focus, blur}"
                :config="terminationDateconfig"
                class="form-control form-input datepicker"
                @on-open="focus"
                @on-close="blur"
              />
            </base-input>

            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="numeric" vid="contractStep3.noticePeriod" name="Notice period">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Notice period</span><br>
            <span class="text-label-desc">Either party may terminate within the days of notice based on the agreement, after which the contract will be terminated.</span>
            <input v-model="contractStep3.noticePeriod" type="text" class="form-input form-control" placeholder="">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <div class="all-form-title bold-text form-field mb-4">
          <span class="text-label">Stock options offer</span><br>
          <span class="text-label-desc">
            Make stock option offers and track grants using Deel. Please be aware that establishing an international stock option plan, and making stock option grants typically requires legal counsel and approval from the company board of directors. A separate form of contract should be signed and prepared off platform to grant equity.
          </span>

          <button type="button" class="btn btn-sm btn-secondary btn-offer-stock" @click.prevent="modals.stockOption = true">
            Offer Stock Options
          </button>
        </div>

        <modal :show.sync="modals.stockOption" size="lg" modal-classes="modal-stock-option">
          <template slot="header" />
          <div class="full-contract-details-wrapper">
            <div class="mr-3">
              <div class="all-form-title bold-text form-field">
                <h3 class="text-center">
                  Offer stock options
                </h3>
                <span class="text-center d-block">For Fixed rate</span><br>
                <div class="information-text-wrapper">
                  <span>
                    Stock options need to be approved by the Board of Directors, and a separate form of contract will be required for the options to be granted.
                  </span>
                </div>

                <div class="all-form-title bold-text form-field two-collumns">
                  <span class="text-label">What is the value of the option you wish to offer?</span><br>

                  <ValidationProvider v-slot="{ errors }" mode="passive" vid="contractStep3.stockOptionCurrency" name="Stock Option Currency">
                    <div class="currency-field-wrapper">
                      <select v-model="contractStep3.stockOptionCurrency" class="form-control form-input">
                        <option v-for="(salaryCurrency, key) in salaryCurrencies" :key="salaryCurrency + key" :value="salaryCurrency.id">
                          {{ salaryCurrency.name }}
                        </option>
                      </select>
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider v-slot="{ errors }" mode="passive" rules="numeric" vid="contractStep3.stockOptionAggregateValue" name="Aggregate option value">
                    <div class="aggregate-value-field-wrapper">
                      <input v-model="contractStep3.stockOptionAggregateValue" type="text" class="form-input form-control" placeholder="Aggregate option value">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>

                <ValidationProvider v-slot="{ errors }" mode="passive" vid="contractStep3.stockOptionTotalNumber" name="Number of stock options">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label d-block">Specify the number of stock options this represents?</span>

                    <input v-model="contractStep3.stockOptionTotalNumber" rules="numeric" type="text" class="form-input form-control" placeholder="Number of stock options">
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" mode="passive" vid="contractStep3.stockOptionVestingStartDate" name="Vesting start date">
                  <div class="all-form-title bold-text form-field mb-4">
                    <span class="text-label">When does the vesting start?</span><br>
                    <base-input class="text-label" label="">
                      <flat-picker
                        v-model="contractStep3.stockOptionVestingStartDate"
                        slot-scope="{focus, blur}"
                        :config="stockOptionVestingStartDateConfig"
                        class="form-control form-input datepicker"
                        @on-open="focus"
                        @on-close="blur"
                      />
                    </base-input>

                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <div class="all-form-title bold-text form-field two-collumns">
                  <span class="text-label">What is the monthly vesting schedule?</span><br>

                  <ValidationProvider v-slot="{ errors }" mode="passive" rules="numeric" vid="contractStep3.stockOptionTotalVestingMonth" name="Total vesting months">
                    <div class="total-month-vesting-field-wrapper">
                      <input v-model="contractStep3.stockOptionTotalVestingMonth" type="text" class="form-input form-control" placeholder="Total months">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider v-slot="{ errors }" mode="passive" rules="numeric" vid="contractStep3.stockOptionVestingCliffMonth" name="Cliff vesting months">
                    <div class="cliff-month-vesting-field-wrapper">
                      <input v-model="contractStep3.stockOptionVestingCliffMonth" type="text" class="form-input form-control" placeholder="Cliff months">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="button-wrapper">
                  <base-button type="primary" @click.prevent="addStockOption">
                    Add Equity Offer
                  </base-button>
                  <base-button type="primary" @click.prevent="modals.stockOption = false">
                    Close
                  </base-button>
                </div>
              </div>
            </div>
          </div>
          <template slot="footer" />
        </modal>

        <ValidationProvider
          ref="additionalDocument"
          v-slot="{ errors }"
          name="image"
        >
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Additional Document</span><br>
            <span class="text-label-desc">
              Additional Document: Attach any additional document you may require for the contract. Attach a .zip for multiple documents.
            </span>
            <input
              id="additionalDocument"
              ref="additionalDocument"
              type="file"
              class="btn btn-sm btn-secondary btn-add-doc"
              accept="application/pdf"
              @change="handleAdditionalDocumentUpload($event)"
            >
          </div>

          <span>{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="contractStep3.specialClause" name="Special Clause">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Special Clause</span><br>
            <span class="text-label-desc">You may want a special clause on the contract to outline terms of a special scenario.</span>

            <textarea v-model="contractStep3.specialClause" type="text" class="form-input form-control" placeholder="" />
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
import flatPicker from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'Step4',
  auth: true,
  components: {
    ValidationObserver,
    ValidationProvider,
    flatPicker
  },
  props: [
    'contract'
  ],
  data () {
    return {
      contractStep3: {
        terminationDate: this.contract.terminationDate,
        noticePeriod: this.contract.noticePeriod,
        specialClause: this.contract.specialClause,
        stockOptionCurrency: this.contract.stockOptionCurrency,
        stockOptionAggregateValue: this.contract.stockOptionAggregateValue,
        stockOptionTotalNumber: this.contract.stockOptionTotalNumber,
        stockOptionVestingStartDate: this.contract.stockOptionVestingStartDate,
        stockOptionTotalVestingMonth: this.contract.stockOptionTotalVestingMonth,
        stockOptionVestingCliffMonth: this.contract.stockOptionVestingCliffMonth,
        additionalDocument: this.contract.additionalDocument
      },
      startDateconfig: {
        allowInput: true,
        altFormat: 'j F Y',
        altInput: true
      },
      firstPaymentDateconfig: {
        allowInput: true,
        altFormat: 'j F Y',
        altInput: true
      },
      terminationDateconfig: {
        allowInput: true,
        altFormat: 'j F Y',
        altInput: true
      },
      stockOptionVestingStartDateConfig: {
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
      salaryCurrencies: [
        { name: 'SGD - Singapore Dollar', id: 'SGD' },
        { name: 'AED - United Emirate Arabs Dirham', id: 'AED' },
        { name: 'ALL - Albanian Lek', id: 'ALL' },
        { name: 'AMD - Armenian Dram', id: 'AMD' },
        { name: 'ARS - Argentine Peso', id: 'ARS' },
        { name: 'AUD - Australian Dollar', id: 'AUD' },
        { name: 'AZN - Azerbaijani Manat', id: 'AZN' },
        { name: 'BAM - Bosnia and Herzegovina Convertible Mark', id: 'BAM' },
        { name: 'BBD - Barbadian Dollar', id: 'BBD' },
        { name: 'BDT - Bangladeshi Taka', id: 'BDT' },
        { name: 'BGN - Bulgarian Lev', id: 'BGN' },
        { name: 'BHD - Bahraini Dinar', id: 'BHD' },
        { name: 'BMD - Bermudian Dollar', id: 'BMD' },
        { name: 'BND - Brunei Dinar', id: 'BND' },
        { name: 'BOB - Bolivian Boliviano', id: 'BOB' },
        { name: 'BRL - Brazilian Real', id: 'BRL' },
        { name: 'BSD - Bahamian Dollar', id: 'BSD' },
        { name: 'BWP - Pula', id: 'BWP' },
        { name: 'BYN - Belarusian Ruble', id: 'BYN' },
        { name: 'BZD - Belize Dollar', id: 'BZD' },
        { name: 'CAD - Canadian Dollar', id: 'CAD' },
        { name: 'CDF - Congolese Franc', id: 'CDF' },
        { name: 'CHF - Swiss Franc', id: 'CHF' },
        { name: 'CLP - Chilean Peso', id: 'CLP' },
        { name: 'CNY - Chinese Yuan', id: 'CNY' },
        { name: 'COP - Colombian Peso', id: 'COP' },
        { name: 'CRC - Costa Rican Colon', id: 'CRC' },
        { name: 'CUP - Cuban Peso', id: 'CUP' },
        { name: 'CVE - Cape Verdean Escudo', id: 'CVE' },
        { name: 'CZK - Czech Koruna', id: 'CZK' },
        { name: 'DJF - Djiboutian Franc', id: 'DJF' },
        { name: 'DKK - Danish Krone', id: 'DKK' },
        { name: 'DOP - Dominican Peso', id: 'DOP' },
        { name: 'DZD - Algerian Dinar', id: 'DZD' },
        { name: 'EGP - Egyptian Pound', id: 'EGP' },
        { name: 'ETP - Ethiopian Birr', id: 'ETP' },
        { name: 'EUR - Euro', id: 'EUR' },
        { name: 'FJD - Fijian Dollar', id: 'FJD' },
        { name: 'GBP - British Pound', id: 'GBP' },
        { name: 'GEL - Georgian Lari', id: 'GEL' },
        { name: 'GHS - Ghanian Cedi', id: 'GHS' },
        { name: 'GIP - Gibraltar Pound', id: 'GIP' },
        { name: 'GMD - Gambian Dalasi', id: 'GMD' },
        { name: 'GNF - Guinea Franc', id: 'GNF' },
        { name: 'GTQ - Guatemalan Quetzal', id: 'GTQ' },
        { name: 'GYD - Guyanes Dollar', id: 'GYD' },
        { name: 'HKD - Hong Kong Dollar', id: 'HKD' },
        { name: 'HNL - Honduran Lempira', id: 'HNL' },
        { name: 'HRK - Croatian Kuna', id: 'HRK' },
        { name: 'HTG - Haitian Gourde', id: 'HTG' },
        { name: 'HUF - Hungarian Forint', id: 'HUF' },
        { name: 'IDR - Indonesian Rupiah', id: 'IDR' },
        { name: 'ILS - Israeli New Shekel', id: 'ILS' },
        { name: 'INR - Indian Rupee', id: 'INR' },
        { name: 'ISK - Icelandic Króna', id: 'ISK' },
        { name: 'JMD - Jamaican Dollar', id: 'JMD' },
        { name: 'JOD - Jordanian Dinar', id: 'JOD' },
        { name: 'JPY - Japanese Yen', id: 'JPY' },
        { name: 'KES - Kenyan Shilling', id: 'KES' },
        { name: 'KGS - Kyrgyzstani Som', id: 'KGS' },
        { name: 'KHR - Cambodian Riel', id: 'KHR' },
        { name: 'KMF - Comorian Franc', id: 'KMF' },
        { name: 'KRW - South Korean Won', id: 'KRW' },
        { name: 'KWD - Kuwaiti Dinar', id: 'KWD' },
        { name: 'KYD - Cayman Island Dollar', id: 'KYD' },
        { name: 'KZT - Kazakhstani Tenge', id: 'KZT' },
        { name: 'LAK - KIP', id: 'LAK' },
        { name: 'LBP - Lebanese Pound', id: 'LBP' },
        { name: 'LKR - Sri Lankan Rupee', id: 'LKR' },
        { name: 'LSL - Lesotho Loti', id: 'LSL' },
        { name: 'LVL - Latvian Lats', id: 'LVL' },
        { name: 'MAD - Moroccan Dirham', id: 'MAD' },
        { name: 'MGA - Malagasy Ariary', id: 'MGA' },
        { name: 'MMK - Burmese Kyat', id: 'MMK' },
        { name: 'MNT - Mongolian Togrog', id: 'MNT' },
        { name: 'MOP - Macanese Pataca', id: 'MOP' },
        { name: 'MRO - Mauritanian Ouguiya', id: 'MRO' },
        { name: 'MUR - Mauritian Rupee', id: 'MUR' },
        { name: 'MVR - Maldivian Rufiyaa', id: 'MVR' },
        { name: 'MWK - Malawian Kwacha', id: 'MWK' },
        { name: 'MXN - Mexican Peso', id: 'MXN' },
        { name: 'MYR - Malaysian Ringgit', id: 'MYR' },
        { name: 'MZN - Mozambican Metical', id: 'MZN' },
        { name: 'NAD - Namibia Dollar', id: 'NAD' },
        { name: 'NGN - Nigerian Naira', id: 'NGN' },
        { name: 'NIO - Nicaraguan Cordoba', id: 'NIO' },
        { name: 'NOK - Norwegian Krone', id: 'NOK' },
        { name: 'NPR - Nepalese Rupee', id: 'NPR' },
        { name: 'NZD - New Zealand Dollar', id: 'NZD' },
        { name: 'OMR - Omani Rial', id: 'OMR' },
        { name: 'PAB - Panamanian Balboa', id: 'PAB' },
        { name: 'PEN - Peruvian Sol', id: 'PEN' },
        { name: 'PGK - Kina', id: 'PGK' },
        { name: 'PHP - Philippine Peso', id: 'PHP' },
        { name: 'PKR - Pakistani Rupee', id: 'PKR' },
        { name: 'PLN - Polish Zloty', id: 'PLN' },
        { name: 'PYG - Paraguayan Guarani', id: 'PYG' },
        { name: 'QAR - Qatari Riyal', id: 'QAR' },
        { name: 'RON - Romanian Leu', id: 'RON' },
        { name: 'RSD - Serbian Dinar', id: 'RSD' },
        { name: 'RUB - Russian Ruble', id: 'RUB' },
        { name: 'RWF - Rwandan Franc', id: 'RWF' },
        { name: 'SAR - Saudi Riyal ', id: 'SAR' },
        { name: 'SEK - Swedish Krona', id: 'SEK' },
        { name: 'SLL - Sierra Leonean Leone', id: 'SLL' },
        { name: 'SRD - Surinamese Dollar', id: 'SRD' },
        { name: 'SVC - Salvadoran Colon', id: 'SVC' },
        { name: 'SZL - Swazi Lilangeni', id: 'SZL' },
        { name: 'THB - Thai Baht', id: 'THB' },
        { name: 'TJS - Tajikstani Somoni', id: 'TJS' },
        { name: 'TMT - Turmenikstan Manat', id: 'TMT' },
        { name: 'TND - Tunisian Dinar', id: 'TND' },
        { name: 'TRY - Turkish Lira', id: 'TRY' },
        { name: 'TTD - Trinidad and Tobago Dollar', id: 'TTD' },
        { name: 'TWD - Taiwan Dollar', id: 'TWD' },
        { name: 'UAH - Ukranian Hryvnia', id: 'UAH' },
        { name: 'UGX - Ugandan Shilling', id: 'UGX' },
        { name: 'USD - US Dollar', id: 'USD' },
        { name: 'UYU - Uruguayan Peso', id: 'UYU' },
        { name: 'VND - Vietnamese Dong', id: 'VND' },
        { name: 'WST - Samoan Tala', id: 'WST' },
        { name: 'ZAR - South African Rand', id: 'ZAR' }
      ],
      modals: {
        stockOption: false
      },
      submenu: true
    }
  },
  methods: {
    onFormChange () {

    },
    handleAdditionalDocumentUpload (event) {
      this.contractStep3.additionalDocument = event.target.files[0]
    },
    addStockOption () {
      const errors = {
        'contractStep3.stockOptionCurrency': '',
        'contractStep3.stockOptionVestingStartDate': '',
        'contractStep3.stockOptionTotalNumber': '',
        'contractStep3.stockOptionTotalVestingMonth': '',
        'contractStep3.stockOptionVestingCliffMonth': ''
      }
      this.$refs.form.setErrors(errors)

      let isValid = true

      if (isNaN(this.contractStep3.stockOptionAggregateValue)) {
        const key = 'contractStep3.stockOptionAggregateValue'
        errors[key] = 'Aggregate Value may only contain numeric characters'
        isValid = false
      }

      if (this.contractStep3.stockOptionCurrency === '') {
        const key = 'contractStep3.stockOptionCurrency'
        errors[key] = 'Stock option currency is required'
        isValid = false
      }

      if (this.contractStep3.stockOptionVestingStartDate === '') {
        const key = 'contractStep3.stockOptionVestingStartDate'
        errors[key] = 'Stock option vesting start date is required'
        isValid = false
      }

      if (this.contractStep3.stockOptionTotalNumber === '') {
        const key = 'contractStep3.stockOptionTotalNumber'
        errors[key] = 'Stock option total number is required'
        isValid = false
      } else if (isNaN(this.contractStep3.stockOptionTotalNumber)) {
        const key = 'contractStep3.stockOptionTotalNumber'
        errors[key] = 'Stock option total number may only contain numeric characters'
        isValid = false
      }

      if (this.contractStep3.stockOptionTotalVestingMonth === '') {
        const key = 'contractStep3.stockOptionTotalVestingMonth'
        errors[key] = 'Stock option total vesting month is required'
        isValid = false
      } else if (isNaN(this.contractStep3.stockOptionTotalVestingMonth)) {
        const key = 'contractStep3.stockOptionTotalVestingMonth'
        errors[key] = 'Total vesting month may only contain numeric characters'
        isValid = false
      }

      if (this.contractStep3.stockOptionVestingCliffMonth === '') {
        const key = 'contractStep3.stockOptionVestingCliffMonth'
        errors[key] = 'Stock option cliff month is required'
        isValid = false
      } else if (isNaN(this.contractStep3.stockOptionVestingCliffMonth)) {
        const key = 'contractStep3.stockOptionVestingCliffMonth'
        errors[key] = 'Clift month may only contain numeric characters'
        isValid = false
      }

      if (isValid) {
        this.modals.stockOption = false
      } else {
        this.$refs.form.setErrors(errors)
        return false
      }
    },
    async post () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.contract.terminationDate = this.contractStep3.terminationDate
      this.contract.noticePeriod = this.contractStep3.noticePeriod
      this.contract.specialClause = this.contractStep3.specialClause
      this.contract.stockOptionCurrency = this.contractStep3.stockOptionCurrency
      this.contract.stockOptionAggregateValue = this.contractStep3.stockOptionAggregateValue
      this.contract.stockOptionTotalNumber = this.contractStep3.stockOptionTotalNumber
      this.contract.stockOptionVestingStartDate = this.contractStep3.stockOptionVestingStartDate
      this.contract.stockOptionTotalVestingMonth = this.contractStep3.stockOptionTotalVestingMonth
      this.contract.stockOptionVestingCliffMonth = this.contractStep3.stockOptionVestingCliffMonth
      this.contract.additionalDocument = this.contractStep3.additionalDocument

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
