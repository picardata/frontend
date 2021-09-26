<template>
  <div class="mr-3">
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <div class="all-form-title bold-text form-field field-group">
          <span class="text-label">Define the rate</span>
        </div>
        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep2.salaryAmount" name="Payment Amount">
          <div class="all-form-title bold-text form-field two-colls first-coll">
            <span class="text-label">How much?</span>
            <input v-model="contractStep2.salaryAmount" type="text" class="form-input form-control" placeholder="0">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep2.salaryCurrency" name="Payment Currency">
          <div class="all-form-title bold-text form-field two-colls">
            <span class="text-label">Currency</span>
            <select v-model="contractStep2.salaryCurrency" class="form-control form-input">
              <option v-for="(salaryCurrency, key) in salaryCurrencies" :key="salaryCurrency + key" :value="salaryCurrency.id">
                {{ salaryCurrency.name }}
              </option>
            </select>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep2.salaryFrequency" name="Payment Frequency">
          <div class="all-form-title bold-text form-field">
            <span class="text-label">Per</span>
            <select v-model="contractStep2.salaryFrequency" class="form-control form-input">
              <option v-for="(salaryFrequency, key) in salaryFrequencies" :key="salaryFrequency + key" :value="salaryFrequency.id">
                {{ salaryFrequency.name }}
              </option>
            </select>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <div class="all-form-title form-field field-group">
          <span class="text-label Invoicing">Invoicing</span>
        </div>

        <ValidationProvider v-slot="{ errors }" mode="passive" vid="contractStep2.salaryAmount" name="Salary Amount">
          <div class="all-form-title bold-text form-field">
            <span class="text-label">Customize invoice settings?</span>
            <span class="text-label-desc">Toggle on to change from default values.</span>

            <base-switch class="mr-1 form-checkbox" on-text="Yes" off-text="No" v-model="contractStep2.isInvoiceSettingsCustomisable"></base-switch>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" vid="contractStep2.invoiceCycleEnds" name="">
          <div class="all-form-title bold-text form-field">
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
          <div class="all-form-title bold-text form-field">
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
          <div class="all-form-title bold-text form-field">
            <span class="text-label">Pay ahead of the weekend</span>
            <span class="text-label-desc">If the payment due is on a weekend, pay on Friday</span>

            <base-switch class="mr-1 form-checkbox" on-text="Yes" off-text="No" v-model="contractStep2.isInvoicePaymentPayAheadOfTheWeekend"></base-switch>
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
  name: 'step2',
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
      contractStep2: {
        salaryAmount: this.contract.salaryAmount,
        salaryCurrency: this.contract.salaryCurrency,
        salaryFrequency: this.contract.salaryFrequency,
        isInvoiceSettingsCustomisable: this.contract.isInvoiceSettingsCustomisable,
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
      invoiceCycleEndsOptions: [
        {
          name: '1st of the month',
          id: 1
        },
        {
          name: '2nd of the month',
          id: 2
        },
        {
          name: '3rd of the month',
          id: 3
        },
        {
          name: '4th of the month',
          id: 4
        },
        {
          name: '5th of the month',
          id: 5
        },
        {
          name: '6th of the month',
          id: 6
        },
        {
          name: '7th of the month',
          id: 7
        },
        {
          name: '8th of the month',
          id: 8
        },
        {
          name: '9th of the month',
          id: 9
        },
        {
          name: '10th of the month',
          id: 10
        },
        {
          name: '11th of the month',
          id: 11
        },
        {
          name: '12th of the month',
          id: 12
        },
        {
          name: '13th of the month',
          id: 13
        },
        {
          name: '14th of the month',
          id: 14
        },
        {
          name: '15th of the month',
          id: 15
        },
        {
          name: '16th of the month',
          id: 16
        },
        {
          name: '17th of the month',
          id: 17
        },
        {
          name: '18th of the month',
          id: 18
        },
        {
          name: '19th of the month',
          id: 19
        },
        {
          name: '20th of the month',
          id: 20
        },
        {
          name: '21st of the month',
          id: 21
        },
        {
          name: '22nd of the month',
          id: 22
        },
        {
          name: '23rd of the month',
          id: 23
        },
        {
          name: '24th of the month',
          id: 24
        },
        {
          name: '25th of the month',
          id: 25
        },
        {
          name: '26th of the month',
          id: 26
        },
        {
          name: '27th of the month',
          id: 27
        },
        {
          name: '28th of the month',
          id: 28
        },
        {
          name: '29th of the month',
          id: 29
        },
        {
          name: '30th of the month',
          id: 30
        },
        {
          name: 'Last day of the month',
          id: 31
        }
      ],
      invoicePaymentDueOptions: [
        {
          name: 'Same day',
          id: 1
        },
        {
          name: '5 Days later',
          id: 2
        },
        {
          name: '7 Days later',
          id: 3
        },
        {
          name: '15 Days later',
          id: 4
        },
        {
          name: '30 Days later',
          id: 5
        },
        {
          name: '60 Days later',
          id: 6
        },
        {
          name: '90 Days later',
          id: 7
        }
      ],
      salaryCurrencies: [
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
        { name: 'SGD - Singaporan Dollar', id: 'SGD' },
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
          name: 'Week',
          id: 1
        },
        {
          name: 'Every other week',
          id: 2
        },
        {
          name: 'Twice a month',
          id: 3
        },
        {
          name: 'Month',
          id: 4
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
    onFormChange () {
    },
    async post () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.contract.salaryAmount = this.contractStep2.salaryAmount
      this.contract.salaryCurrency = this.contractStep2.salaryCurrency
      this.contract.salaryFrequency = this.contractStep2.salaryFrequency
      this.contract.isInvoiceSettingsCustomisable = this.contractStep2.isInvoiceSettingsCustomisable
      this.contract.invoiceCycleEnds = this.contractStep2.invoiceCycleEnds
      this.contract.invoicePaymentDue = this.contractStep2.invoicePaymentDue
      this.contract.isInvoicePaymentPayAheadOfTheWeekend = this.contractStep2.isInvoicePaymentPayAheadOfTheWeekend
      return isValid
    }
  }
}
</script>
