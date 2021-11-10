<template>
  <div class="mr-3">
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <div class="all-form-title bold-text form-field field-group">
          <span class="text-label">Define the rate</span>
        </div>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep2.paymentPackageType" name="Payment Package Type">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Client will pay</span>
            <select v-model="contractStep2.paymentPackageType" class="form-control form-input" @change="togglePaymentPackage($event)">
              <option v-for="(paymentPackageTypeOption, key) in paymentPackageTypeOptions" :key="paymentPackageTypeOption + key" :value="paymentPackageTypeOption.id">
                {{ paymentPackageTypeOption.name }}
              </option>
            </select>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <div class="multiple-fields-wrapper">
          <div v-if="showElement.salaryAmounts" :key="'salaryAmounts-'+key.salaryAmounts" class="all-form-title bold-text form-field two-colls first-coll mb-4">
            <ValidationProvider v-slot="{ errors }" mode="passive" rules="required|numeric" vid="contractStep2.salaryAmounts" name="Salary Amount">
              <span class="text-label">How much?</span>
              <input v-model="contractStep2.salaryAmounts" type="text" class="form-input form-control" placeholder="0.00">
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep2.salaryCurrency" name="Payment Currency">
            <div class="all-form-title bold-text form-field two-colls mb-4">
              <span class="text-label">Currency</span>
              <select v-model="contractStep2.salaryCurrency" class="form-control form-input">
                <option v-for="(salaryCurrency, key) in salaryCurrencies" :key="salaryCurrency + key" :value="salaryCurrency.id">
                  {{ salaryCurrency.name }}
                </option>
              </select>
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>

        <div v-if="showElement.salaryFrequency" :key="'salaryFrequency-'+key.salaryFrequency" class="all-form-title bold-text form-field mb-4">
          <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep2.salaryFrequency" name="Payment Frequency">
            <span class="text-label">Per</span>
            <select v-model="contractStep2.salaryFrequency" class="form-control form-input">
              <option v-for="(salaryFrequency, key) in salaryFrequencies" :key="salaryFrequency + key" :value="salaryFrequency.id">
                {{ salaryFrequency.name }}
              </option>
            </select>
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="all-form-title form-field field-group">
          <span class="text-label Invoicing">Invoicing</span>
        </div>

        <ValidationProvider v-slot="{ errors }" mode="passive" vid="contractStep2.invoiceCycle" name="">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Invoice cycle</span>
            <select v-model="contractStep2.invoiceCycle" class="form-control form-input">
              <option v-for="(invoiceCycleOption, key) in invoiceCycleOptions" :key="invoiceCycleOption + key" :value="invoiceCycleOption.id">
                {{ invoiceCycleOption.name }}
              </option>
            </select>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" vid="contractStep2.invoiceCycleEnds" name="">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Invoice cycle ends</span>
            <select v-model="contractStep2.invoiceCycleEnds" class="form-control form-input">
              <option v-for="(invoiceCycleEndsOption, key) in invoiceCycleEndsOptions" :key="invoiceCycleEndsOption + key" :value="invoiceCycleEndsOption.id">
                {{ invoiceCycleEndsOption.name }}
              </option>
            </select>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" vid="contractStep2.invoicePaymentDue" name="">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Payment due</span>
            <select v-model="contractStep2.invoicePaymentDue" class="form-control form-input">
              <option v-for="(invoicePaymentDueOption, key) in invoicePaymentDueOptions" :key="invoicePaymentDueOption + key" :value="invoicePaymentDueOption.id">
                {{ invoicePaymentDueOption.name }}
              </option>
            </select>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" vid="contractStep2.isInvoicePaymentPayAheadOfTheWeekend" name="">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Pay ahead of the weekend</span>
            <span class="text-label-desc">If the payment due is on a weekend, pay on Friday</span>

            <base-switch v-model="contractStep2.isInvoicePaymentPayAheadOfTheWeekend" class="mr-1 form-checkbox" on-text="Yes" off-text="No" :disabled="isDisabled" />
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
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
  name: 'Step2',
  auth: true,
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: [
    'contract'
  ],
  data () {
    let displaySalaryAmounts = true
    let displaySalaryFrequency = true

    if (this.contract.paymentPackageType === 1) {
      displaySalaryAmounts = false
      displaySalaryFrequency = false
    }

    return {
      contractStep2: {
        paymentPackageType: this.contract.paymentPackageType,
        salaryAmounts: this.contract.salaryAmount,
        salaryCurrency: this.contract.salaryCurrency,
        salaryFrequency: this.contract.salaryFrequency,
        invoiceCycle: this.contract.invoiceCycle,
        invoiceCycleEnds: this.contract.invoiceCycleEnds,
        invoicePaymentDue: this.contract.invoicePaymentDue,
        isInvoicePaymentPayAheadOfTheWeekend: this.contract.isInvoicePaymentPayAheadOfTheWeekend
      },
      startDateconfig: {
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
      paymentPackageTypeOptions: [
        {
          name: 'Fixed rate',
          id: 0
        },
        {
          name: 'Task',
          id: 1
        }
      ],
      invoiceCycleOptions: [
        {
          name: 'Weekly',
          id: 0
        },
        {
          name: 'Every other week',
          id: 1
        },
        {
          name: 'Twice a month',
          id: 2
        },
        {
          name: 'Monthly',
          id: 3
        }
      ],
      invoiceCycleEndsOptions: [
        {
          name: '1st of the month',
          id: 0
        },
        {
          name: '2nd of the month',
          id: 1
        },
        {
          name: '3rd of the month',
          id: 2
        },
        {
          name: '4th of the month',
          id: 3
        },
        {
          name: '5th of the month',
          id: 4
        },
        {
          name: '6th of the month',
          id: 5
        },
        {
          name: '7th of the month',
          id: 6
        },
        {
          name: '8th of the month',
          id: 7
        },
        {
          name: '9th of the month',
          id: 8
        },
        {
          name: '10th of the month',
          id: 9
        },
        {
          name: '11th of the month',
          id: 10
        },
        {
          name: '12th of the month',
          id: 11
        },
        {
          name: '13th of the month',
          id: 12
        },
        {
          name: '14th of the month',
          id: 13
        },
        {
          name: '15th of the month',
          id: 14
        },
        {
          name: '16th of the month',
          id: 15
        },
        {
          name: '17th of the month',
          id: 16
        },
        {
          name: '18th of the month',
          id: 17
        },
        {
          name: '19th of the month',
          id: 18
        },
        {
          name: '20th of the month',
          id: 19
        },
        {
          name: '21st of the month',
          id: 20
        },
        {
          name: '22nd of the month',
          id: 21
        },
        {
          name: '23rd of the month',
          id: 22
        },
        {
          name: '24th of the month',
          id: 23
        },
        {
          name: '25th of the month',
          id: 24
        },
        {
          name: '26th of the month',
          id: 25
        },
        {
          name: '27th of the month',
          id: 26
        },
        {
          name: '28th of the month',
          id: 27
        },
        {
          name: '29th of the month',
          id: 28
        },
        {
          name: '30th of the month',
          id: 29
        },
        {
          name: 'Last day of the month',
          id: 30
        }
      ],
      invoicePaymentDueOptions: [
        {
          name: 'Same day',
          id: 0
        },
        {
          name: '5 Days later',
          id: 1
        },
        {
          name: '7 Days later',
          id: 2
        },
        {
          name: '15 Days later',
          id: 3
        },
        {
          name: '30 Days later',
          id: 4
        },
        {
          name: '60 Days later',
          id: 5
        },
        {
          name: '90 Days later',
          id: 6
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
      salaryFrequencies: [
        {
          name: 'Hour',
          id: 0
        },
        {
          name: 'Day',
          id: 1
        },
        {
          name: 'Week',
          id: 2
        },
        {
          name: 'Task',
          id: 3
        }
      ],
      submenu: true,
      conditionalDisabled: {
        invoicing: 1
      },
      showElement: {
        salaryAmounts: displaySalaryAmounts,
        salaryFrequency: displaySalaryFrequency
      },
      key: {
        salaryAmounts: 0,
        salaryFrequency: 0
      }
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
    togglePaymentPackage (event) {
      const paymentPackageType = event.target.value

      if (paymentPackageType === '0') {
        this.showElement.salaryAmounts = true
        this.showElement.salaryFrequency = true
      } else {
        this.showElement.salaryAmounts = false
        this.showElement.salaryFrequency = false
        this.contractStep2.salaryAmounts = ''
        this.contractStep2.salaryFrequency = ''
      }

      this.showCustomContractDivKey++
    },
    async post () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.contract.paymentPackageType = this.contractStep2.paymentPackageType
      this.contract.salaryAmount = this.contractStep2.salaryAmounts
      this.contract.salaryCurrency = this.contractStep2.salaryCurrency
      this.contract.salaryFrequency = this.contractStep2.salaryFrequency
      this.contract.invoiceCycle = this.contractStep2.invoiceCycle
      this.contract.invoiceCycleEnds = this.contractStep2.invoiceCycleEnds
      this.contract.invoicePaymentDue = this.contractStep2.invoicePaymentDue
      this.contract.isInvoicePaymentPayAheadOfTheWeekend = this.contractStep2.isInvoicePaymentPayAheadOfTheWeekend
      return isValid
    }
  }
}
</script>
