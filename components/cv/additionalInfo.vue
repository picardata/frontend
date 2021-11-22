<template>
  <div>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <div class="card border p-4">
          <div class="all-form-title bold-text form-field field-group">
            <span class="text-label">Job Preference</span>
          </div>

          <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="additionalInfo.jobTitle" name="Job Title">
            <div class="all-form-title bold-text form-field mb-4">
              <span class="text-label">Desired Job Title</span>
              <input v-model="additionalInfo.jobTitle" type="text" class="form-input form-control" placeholder="">
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="additionalInfo.industry" name="Industry">
            <div class="all-form-title bold-text form-field mb-4">
              <span class="text-label">Desired Industry</span>
              <input v-model="additionalInfo.industry" type="text" class="form-input form-control" placeholder="">
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="additionalInfo.yearOfExperience" name="Years of Experience">
            <div class="all-form-title bold-text form-field mb-4">
              <span class="text-label">Years of Experience</span>
              <input v-model="additionalInfo.yearOfExperience" type="text" class="form-input form-control" placeholder="">
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <div class="all-form-title bold-text form-field">
            <span class="text-label">Desired Job Type</span>
          </div>

          <div class="multiple-fields-wrapper">
            <div class="all-form-title bold-text form-field two-colls first-coll mb-4">
              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Full time</span>
                <input v-model="jobType" type="checkbox" value="Full Time" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Permanent</span>
                <input v-model="jobType" type="checkbox" value="Permanent" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Temporary</span>
                <input v-model="jobType" type="checkbox" value="Temporary" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Fresh graduate</span>
                <input v-model="jobType" type="checkbox" value="Fresh Graduate" class="mr-1 mt-1 form-checkbox-left">
              </div>
            </div>

            <div class="all-form-title bold-text form-field two-colls mb-4">
              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Part time</span>
                <input v-model="jobType" type="checkbox" value="Part Time" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Fixed time</span>
                <input v-model="jobType" type="checkbox" value="Fixed Time" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">OJT (on the job training)</span>
                <input v-model="jobType" type="checkbox" value="OJT" class="mr-1 mt-1 form-checkbox-left">
              </div>
            </div>
          </div>

          <div class="all-form-title bold-text form-field">
            <span class="text-label">Desired Work Schedule</span>
          </div>

          <div class="multiple-fields-wrapper mt-2">
            <div class="all-form-title bold-text form-field two-colls first-coll mb-4">
              <div class="">
                <span class="text-label text-label-secondary">Day Ranges</span>
              </div>
              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Monday to Friday</span>
                <input v-model="workingDays" type="checkbox" value="Monday to Friday" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-4">
                <span class="text-label ml-1">Weekends</span>
                <input v-model="workingDays" type="checkbox" value="Weekends" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="mt-6">
                <span class="text-label text-label-secondary">Day Ranges</span>
              </div>
              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Holidays</span>
                <input v-model="otherWorkArrangements" type="checkbox" value="Holidays" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Overtime</span>
                <input v-model="otherWorkArrangements" type="checkbox" value="Overtime" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">On call</span>
                <input v-model="otherWorkArrangements" type="checkbox" value="On call" class="mr-1 mt-1 form-checkbox-left">
              </div>
            </div>

            <div class="all-form-title bold-text form-field two-colls mb-4">
              <div class="">
                <span class="text-label text-label-secondary">Shifts</span>
              </div>
              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">8 hours shifts</span>
                <input v-model="shifts" type="checkbox" value="8 hours shifts" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-labe ml-1l">10 hours shifts</span>
                <input v-model="shifts" type="checkbox" value="10 hours shifts" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">12 hours shifts</span>
                <input v-model="shifts" type="checkbox" value="12 hours shifts" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Shift system</span>
                <input v-model="shifts" type="checkbox" value="Shift system" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Early shift</span>
                <input v-model="shifts" type="checkbox" value="Early Shift" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Day shift</span>
                <input v-model="shifts" type="checkbox" value="Day shift" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Afternoon shift</span>
                <input v-model="shifts" type="checkbox" value="Afternoon shift" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Evening shift</span>
                <input v-model="shifts" type="checkbox" value="Evening shift" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Late shift</span>
                <input v-model="shifts" type="checkbox" value="Late shift" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Night shift</span>
                <input v-model="shifts" type="checkbox" value="Night shift" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Flexible shift</span>
                <input v-model="shifts" type="checkbox" value="Flexible shift" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Rotational shift</span>
                <input v-model="shifts" type="checkbox" value="Rotational shift" class="mr-1 mt-1 form-checkbox-left">
              </div>

              <div class="checkbox-wrapper mb-2">
                <span class="text-label ml-1">Fixed shift</span>
                <input v-model="shifts" type="checkbox" value="Fixed shift" class="mr-1 mt-1 form-checkbox-left">
              </div>
            </div>
          </div>

          <div class="multiple-fields-wrapper">
            <div class="all-form-title bold-text form-field two-colls first-coll mb-4">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="additionalInfo.salaryCurrency" name="Salary Currency">
                <span class="text-label">Desired Salary</span>
                <select v-model="additionalInfo.salaryCurrency" class="form-control form-input">
                  <option v-for="(salaryCurrency, key) in salaryCurrencies" :key="salaryCurrency + key" :value="salaryCurrency.id">
                    {{ salaryCurrency.name }}
                  </option>
                </select>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="all-form-title bold-text form-field two-colls mt-4 mb-4">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="additionalInfo.salaryAmount" name="Salary Amount">
                <span class="text-label" />
                <input v-model="additionalInfo.salaryAmount" type="text" class="form-input form-control" placeholder="">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>

          <div class="multiple-fields-wrapper">
            <div class="all-form-title bold-text form-field two-colls first-coll mb-4">
              <ValidationProvider v-slot="{ errors }" mode="passive" vid="additionalInfo.willingToRelocate" name="Willing to relocate">
                <span class="text-label">I am willing to relocate</span>
                <base-checkbox v-model="additionalInfo.willingToRelocate" class="mr-1 form-checkbox-left" />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>

          <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="profileForm.country" name="Country">
            <div class="all-form-title bold-text form-field mb-4">
              <span class="text-label">Country of relocate</span>
              <country-select v-model="additionalInfo.countryPreference" :country="additionalInfo.countryPreference" top-country="SG" class="form-input form-control" placeholder="" />
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import 'vue-country-region-select'

export default {
  name: 'AdditionalInformations',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: [
    'additionalInfo'
  ],
  data () {
    return {
      dateFieldConfig: {
        allowInput: true,
        altFormat: 'F Y',
        altInput: true
      },
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
      jobType: [],
      workingDays: [],
      shifts: [],
      otherWorkArrangements: []
    }
  },
  created () {
    if (this.additionalInfo.jobType !== null) {
      this.jobType = this.additionalInfo.jobType
    }

    if (this.additionalInfo.workingDays !== null) {
      this.workingDays = this.additionalInfo.workingDays
    }

    if (this.additionalInfo.shifts !== null) {
      this.shifts = this.additionalInfo.shifts
    }

    if (this.additionalInfo.otherWorkArrangements !== null) {
      this.otherWorkArrangements = this.additionalInfo.otherWorkArrangements
    }
  },
  methods: {
    async post () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.additionalInfo.jobType = this.jobType
      this.additionalInfo.workingDays = this.workingDays
      this.additionalInfo.shifts = this.shifts
      this.additionalInfo.otherWorkArrangements = this.otherWorkArrangements

      return isValid
    },
    onFormChange () {
    }
  }
}
</script>
