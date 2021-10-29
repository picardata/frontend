<template>
  <div class="mr-3">
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <div class="all-form-title bold-text form-field field-group">
          <span class="text-label">Compensation</span>
        </div>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep3.salaryCurrency" name="Payment Currency">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Currency</span>
            <select v-model="contractStep3.salaryCurrency" class="form-control form-input">
              <option v-for="(salaryCurrency, key) in salaryCurrencies" :key="salaryCurrency + key" :value="salaryCurrency.id">
                {{ salaryCurrency.name }}
              </option>
            </select>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required|numeric" vid="contractStep3.salaryAmount" name="Gross annual base salary">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Gross annual base salary</span>
            <input v-model="contractStep3.salaryAmount" type="text" class="form-input form-control" placeholder="0.00">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" vid="contractStep3.anySigningBonus" name="">
          <div class="all-form-title bold-text form-field mb-4">

            <base-checkbox class="mr-1" on-text="Yes" off-text="No" v-model="contractStep3.anySigningBonus">
              <span class="text-label">There will be a signing bonus</span>
            </base-checkbox>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required|numeric" vid="contractStep3.grossSigningBonusAmount" name="Gross signing bonus">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Gross signing bonus</span>
            <input v-model="contractStep3.grossSigningBonusAmount" type="text" class="form-input form-control" placeholder="0.00">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" vid="contractStep3.anyVariableCompensation" name="">
          <div class="all-form-title bold-text form-field mb-4">
            <base-checkbox class="mr-1" on-text="Yes" off-text="No" v-model="contractStep3.anyVariableCompensation">
              <span class="text-label">There will be variable compensation</span>
            </base-checkbox>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required|numeric" vid="contractStep3.variableCompensationAmount" name="Yearly Variable Compensation">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Yearly Variable Compensation</span>
            <input v-model="contractStep3.variableCompensationAmount" type="text" class="form-input form-control" placeholder="0.00">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <div class="all-form-title bold-text form-field field-group">
          <span class="text-label">Job Information</span>
        </div>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="contractStep3.employmentStartDate" name="Start Date">
          <div class="all-form-title bold-text form-field mb-4">
            <base-input class="text-label" label="Employment Start Date">
              <flat-picker
                slot-scope="{focus, blur}"
                @on-open="focus"
                @on-close="blur"
                :config="startDateconfig"
                class="form-control form-input datepicker"
                v-model="contractStep3.employmentStartDate">
              </flat-picker>
            </base-input>

            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep3.employmentType" name="">
          <div class="all-form-title bold-text form-field mb-4">
            <span class="text-label">Employment Type</span>
            <select v-model="contractStep3.employmentType" class="form-control form-input">
              <option v-for="(employmentTypeOption, key) in employmentTypeOptions" :key="employmentTypeOption + key" :value="employmentTypeOption.id">
                {{ employmentTypeOption.name }}
              </option>
            </select>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required|numeric" vid="contractStep3.partTimeTotalWorkingDaysPerWeek" name="Total working days per week">
          <div class="all-form-title bold-text form-field mb-4">
            <input v-model="contractStep3.partTimeTotalWorkingDaysPerWeek" type="text" class="form-input form-control" placeholder="Total working days per week">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required|numeric" vid="contractStep3.partTimeTotalWorkingHoursPerDay" name="Total working hours per day">
          <div class="all-form-title bold-text form-field mb-4">
            <input v-model="contractStep3.partTimeTotalWorkingHoursPerDay" type="text" class="form-input form-control" placeholder="Total working hours per day">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required|numeric" vid="contractStep3.partTimeTotalWorkingHoursPerWeek" name="Total working hours per week">
          <div class="all-form-title bold-text form-field mb-4">
            <input v-model="contractStep3.partTimeTotalWorkingHoursPerWeek" type="text" class="form-input form-control" placeholder="Total working hours per week">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <div class="all-form-title bold-text form-field field-group">
          <span class="text-label">Time Off</span>
        </div>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep3.timeOffType" name="">
          <div class="all-form-title bold-text form-field mb-4">
            <select v-model="contractStep3.timeOffType" class="form-control form-input">
              <option v-for="(timeOffTypeOption, key) in timeOffTypeOptions" :key="timeOffTypeOption + key" :value="timeOffTypeOption.id">
                {{ timeOffTypeOption.name }}
              </option>
            </select>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required|numeric" vid="contractStep3.timeOffPaidVacationDays" name="Paid vacation days">
          <div class="all-form-title bold-text form-field mb-4">
            <input v-model="contractStep3.timeOffPaidVacationDays" type="text" class="form-input form-control" placeholder="Paid vacation days">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required|numeric" vid="contractStep3.partTimeTotalWorkingHoursPerWeek" name="Sick off days">
          <div class="all-form-title bold-text form-field mb-4">
            <input v-model="contractStep3.timeOffSickDays" type="text" class="form-input form-control" placeholder="Sick off days">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <div class="all-form-title bold-text form-field field-group">
          <span class="text-label">Contract Term</span>
        </div>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep3.contractTermType" name="">
          <div class="all-form-title bold-text form-field mb-4">
            <select v-model="contractStep3.contractTermType" class="form-control form-input">
              <option v-for="(contractTermTypeOption, key) in contractTermTypeOptions" :key="contractTermTypeOption + key" :value="contractTermTypeOption.id">
                {{ contractTermTypeOption.name }}
              </option>
            </select>
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="contractStep3.contractEndDate" name="Contract End Date">
          <div class="all-form-title bold-text form-field mb-4">
            <base-input class="text-label" label="Contract End Date">
              <flat-picker
                slot-scope="{focus, blur}"
                @on-open="focus"
                @on-close="blur"
                :config="contractEndDateconfig"
                class="form-control form-input datepicker"
                v-model="contractStep3.contractEndDate">
              </flat-picker>
            </base-input>

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
  name: 'step1',
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
        salaryAmount: this.contract.salaryAmount,
        salaryCurrency: this.contract.salaryCurrency,
        anySigningBonus: this.contract.anySigningBonus,
        grossSigningBonusAmount: this.contract.grossSigningBonusAmount,
        anyVariableCompensation: this.contract.anyVariableCompensation,
        variableCompensationAmount: this.contract.variableCompensationAmount,
        employmentType: this.contract.employmentType,
        partTimeTotalWorkingDaysPerWeek: this.contract.partTimeTotalWorkingDaysPerWeek,
        partTimeTotalWorkingHoursPerDay: this.contract.partTimeTotalWorkingHoursPerDay,
        partTimeTotalWorkingHoursPerWeek: this.contract.partTimeTotalWorkingHoursPerWeek,
        employmentStartDate: this.contract.employmentStartDate,
        timeOffType: this.contract.timeOffType,
        timeOffPaidVacationDays: this.contract.timeOffPaidVacationDays,
        timeOffSickDays: this.contract.timeOffSickDays,
        contractTermType: this.contract.contractTermType,
        contractEndDate: this.contract.contractEndDate
      },
      startDateconfig: {
        allowInput: true,
        altFormat: 'j F Y',
        altInput: true
      },
      contractEndDateconfig: {
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
      employmentTypeOptions: [
        {
          name: 'Full-time',
          id: 0
        },
        {
          name: 'Part-time',
          id: 1
        }
      ],
      timeOffTypeOptions: [
        {
          name: 'Standard',
          id: 0
        },
        {
          name: 'Specific',
          id: 1
        }
      ],
      contractTermTypeOptions: [
        {
          name: 'Indefinite',
          id: 0
        },
        {
          name: 'Definite',
          id: 1
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

      this.contract.salaryAmount = this.contractStep3.salaryAmount
      this.contract.salaryCurrency = this.contractStep3.salaryCurrency
      this.contract.anySigningBonus = this.contractStep3.anySigningBonus
      this.contract.grossSigningBonusAmount = this.contractStep3.grossSigningBonusAmount
      this.contract.anyVariableCompensation = this.contractStep3.anyVariableCompensation
      this.contract.variableCompensationAmount = this.contractStep3.variableCompensationAmount
      this.contract.employmentType = this.contractStep3.employmentType
      this.contract.partTimeTotalWorkingDaysPerWeek = this.contractStep3.partTimeTotalWorkingDaysPerWeek
      this.contract.partTimeTotalWorkingHoursPerDay = this.contractStep3.partTimeTotalWorkingHoursPerDay
      this.contract.partTimeTotalWorkingHoursPerWeek = this.contractStep3.partTimeTotalWorkingHoursPerWeek
      this.contract.employmentStartDate = this.contractStep3.employmentStartDate
      this.contract.timeOffType = this.contractStep3.timeOffType
      this.contract.timeOffPaidVacationDays = this.contractStep3.timeOffPaidVacationDays
      this.contract.timeOffSickDays = this.contractStep3.timeOffSickDays
      this.contract.contractTermType = this.contractStep3.contractTermType
      this.contract.contractEndDate = this.contractStep3.contractEndDate

      return isValid
    }
  }
}
</script>
