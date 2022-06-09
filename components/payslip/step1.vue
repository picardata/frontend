<template>
  <div>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <div class="card border p-4">
          <div class="mr-3">
            <div class="all-form-title bold-text form-field mb-4">
              <span class="text-label">Employee Name:</span>
              <span class="text-label">{{ payslipStep1.employeeName }}</span>
            </div>
            <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="payslipStep1.name" name="Payslip Title">
              <div class="all-form-title bold-text form-field mb-4">
                <span class="text-label">Payslip Title</span>
                <input v-model="payslipStep1.name" type="text" class="form-input form-control" placeholder="">
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="payslipStep1.currency" name="Salary Currency">
              <div class="all-form-title bold-text form-field mb-4">
                <span class="text-label">Currency</span>
                <select v-model="payslipStep1.currency" class="form-control form-input">
                  <option v-for="(salaryCurrency, key) in salaryCurrencies" :key="salaryCurrency + key" :value="salaryCurrency.id">
                    {{ salaryCurrency.name }}
                  </option>
                </select>
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <div class="card border p-4">
              <div>
                <div class="row">
                  <div class="all-form-title bold-text form-field mb-2 col-6 mb-4">
                    <span class="text-label payitem-title-label">Addition Pay Item</span>
                  </div>
                </div>
              </div>
              <div v-for="(payitemAddition, index) in payslipStep1.payitemAdditions" :key="'payitemAdditions' + index">
                <div class="row">
                  <div class="all-form-title bold-text form-field mb-2 col-6">
                    <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" :vid="'payItemAdditionsName-' + index" name="Name">
                      <span class="text-label">Name</span>
                      <input v-model="payitemAddition.name" type="text" class="form-input form-control payitem" placeholder="">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="all-form-title bold-text form-field mb-2 col-4">
                    <ValidationProvider v-slot="{ errors }" mode="passive" rules="required|numeric" :vid="'payItemAdditionAmount-' + index" name="Amount">
                      <span class="text-label">Amount</span>
                      <input v-model="payitemAddition.amount" type="text" class="form-input form-control payitem" placeholder="">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <div class="mb-2 col-2">
                    <button type="button" class="btn btn-sm btn-secondary btn-offer-stock mt-5" @click.prevent="removePayItemAddition($event, index)">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <button type="button" class="btn btn-sm btn-secondary btn-add-milestone p-2 mb-4 mt-4" @click.prevent="addPayItem(1)">
                  Add Pay Item
                </button>
              </div>
            </div>
          </div>

          <div class="col-6">
            <div class="card border p-4">
              <div>
                <div class="row">
                  <div class="all-form-title bold-text form-field mb-2 col-6 mb-4">
                    <span class="text-label payitem-title-label">Deduction Pay Item</span>
                  </div>
                </div>
              </div>
              <div v-for="(payitemDeduction, index) in payslipStep1.payitemDeductions" :key="'payitemAdditions' + index">
                <div class="row">
                  <div class="all-form-title bold-text form-field mb-2 col-6">
                    <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" :vid="'payItemDeductionsName-' + index" name="Name">
                      <span class="text-label">Name</span>
                      <input v-model="payitemDeduction.name" type="text" class="form-input form-control payitem" placeholder="">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="all-form-title bold-text form-field mb-2 col-4">
                    <ValidationProvider v-slot="{ errors }" mode="passive" rules="required|numeric" :vid="'payItemDeductionsAmount-' + index" name="Amount">
                      <span class="text-label">Amount</span>
                      <input v-model="payitemDeduction.amount" type="text" class="form-input form-control payitem" placeholder="">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <div class="mb-2 col-2">
                    <button type="button" class="btn btn-sm btn-secondary btn-offer-stock mt-5" @click.prevent="removePayItemDeduction($event, index)">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <button type="button" class="btn btn-sm btn-secondary btn-add-milestone p-2 mb-4 mt-4" @click.prevent="addPayItem(2)">
                  Add Pay Item
                </button>
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="card border p-4">
              <div>
                <div class="row">
                  <div class="all-form-title bold-text form-field mb-2 col-6 mb-4">
                    <span class="text-label payitem-title-label">Employer Contribution Pay Item</span>
                  </div>
                </div>
              </div>
              <div v-for="(payitemEmployer, index) in payslipStep1.payitemEmployer" :key="'payitemAdditions' + index">
                <div class="row">
                  <div class="all-form-title bold-text form-field mb-2 col-6">
                    <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" :vid="'payitemEmployerName-' + index" name="Name">
                      <span class="text-label">Name</span>
                      <input v-model="payitemEmployer.name" type="text" class="form-input form-control payitem" placeholder="">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="all-form-title bold-text form-field mb-2 col-4">
                    <ValidationProvider v-slot="{ errors }" mode="passive" rules="required|numeric" :vid="'payitemEmployerAmount-' + index" name="Amount">
                      <span class="text-label">Amount</span>
                      <input v-model="payitemEmployer.amount" type="text" class="form-input form-control payitem" placeholder="">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <div class="mb-2 col-2">
                    <button type="button" class="btn btn-sm btn-secondary btn-offer-stock mt-5" @click.prevent="removePayItemEmployer($event, index)">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <button type="button" class="btn btn-sm btn-secondary btn-add-milestone p-2 mb-4 mt-4" @click.prevent="addPayItem(3)">
                  Add Pay Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import 'vue-country-region-select'

export default {
  name: 'Step',
  auth: true,
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: [
    'payslip'
  ],
  data () {
    return {
      payslipStep1: {
        name: this.payslip.name,
        company: this.payslip.company,
        employeeName: this.payslip.employeeName,
        employeeId: this.payslip.employeeId,
        filename: this.payslip.filename,
        type: this.payslip.type,
        currency: this.payslip.currency,
        payitemAdditions: this.payslip.payitemAdditions,
        payitemDeductions: this.payslip.payitemDeductions,
        payitemEmployer: this.payslip.payitemEmployer
      },
      startDateconfig: {
        allowInput: true,
        altFormat: 'j F Y',
        altInput: true
      },
      payItemAdditionsKey: 1000,
      payItemDeductionsKey: 1000,
      payItemEmployerKey: 1000,
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
      submenu: true
    }
  },
  computed: {
    isDisabled () {
      return !this.contractStep2.isInvoiceSettingsCustomisable
    }
  },
  methods: {
    onFormChange () {
    },
    async post () {
      const isValid = await this.$refs.form.validate()

      if (!isValid) {
        return false
      }

      this.payslip.name = this.payslipStep1.name
      this.payslip.company = this.payslipStep1.company
      this.payslip.employeeId = this.payslipStep1.employeeId
      this.payslip.filename = this.payslipStep1.filename
      this.payslip.type = this.payslipStep1.type
      this.payslip.currency = this.payslipStep1.currency
      this.payslip.payitemAdditions = this.payslipStep1.payitemAdditions
      this.payslip.payitemDeductions = this.payslipStep1.payitemDeductions
      this.payslip.payitemEmployer = this.payslipStep1.payitemEmployer

      console.log('###############')
      console.log(this.payslip)

      return isValid
    },
    addPayItem (type) {
      const newPayItem = {
        name: '',
        amount: '',
        type
      }

      if (type === 1) {
        this.payslipStep1.payitemAdditions.push(newPayItem)
        this.payslipStep1.payItemAdditionsKey++
      } else if (type === 2) {
        this.payslipStep1.payitemDeductions.push(newPayItem)
        this.payslipStep1.payItemDeductionsKey++
      } else if (type === 3) {
        this.payslipStep1.payitemEmployer.push(newPayItem)
        this.payslipStep1.payItemEmployerKey++
      }
    },
    removePayItemAddition (index) {
      this.payslipStep1.payitemAdditions.splice(index, 1)
    },
    removePayItemDeduction (index) {
      this.payslipStep1.payitemDeductions.splice(index, 1)
    },
    removePayItemEmployer (index) {
      this.payslipStep1.payitemEmployer.splice(index, 1)
    }
  }
}
</script>

<style lang="scss">

</style>
