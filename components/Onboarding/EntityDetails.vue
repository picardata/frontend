<template>
  <div class="onboarding-complete-profile pb-5">
    <div class="row mt-80">
      <div class="col-12">
        <div class="title">
          <p style="font-size: 24px;color: #2E4823; font-weight: bolder;">Hey {{ profile.username }}, welcome to Globelise</p><br/>
          <p>To get started please provide your company information accurately.
            <br/> It will be used for all your document on Globelise.</p>
        </div>
      </div>
    </div>
    <div>
      <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
        <form @submit.prevent="handleSubmit(post)">
          <div class="row">

            <div class="col-6 ">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="company.name" name="Entity Name">
                <input v-model="profile.name" type="text" class="login-credential-input form-control" placeholder="Legal Entity Name">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="company.registrationNumber" name="Registration Number">
                <input v-model="profile.workRegistrationNumber" type="text" class="login-credential-input form-control" placeholder="Registration Number">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="company.entityType" name="Entity Type">
                <select v-model="profile.workEntityType" class="form-control login-credential-input">
                  <option value="0" selected>
                    Choose Entity Type
                  </option>
                  <option v-for="(entityType, key) in entityTypes" :key="entityType + key" :value="entityType.id">
                    {{ entityType.name }}
                  </option>
                </select>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" mode="passive" vid="company.street" name="Address">
                <input v-model="profile.workStreet" type="text" class="login-credential-input form-control" placeholder="Address">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="col-6 pl-5">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="company.country" name="Country" >
                <country-select v-model="profile.workCountry" :country="country" topCountry="SG"  class="form-control login-credential-input"/>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" mode="passive" vid="company.vatID" name="VAT ID">
                <input v-model="profile.workVatID" type="text" class="login-credential-input form-control" placeholder="VAT ID (Optional)">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" mode="passive" vid="company.city" name="City">
                <input v-model="profile.workCity" type="text" class="login-credential-input form-control" placeholder="City">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" mode="passive" vid="company.postalCode" name="Postal Code">
                <input v-model="profile.workPostalCode" type="text" class="login-credential-input form-control" placeholder="Postal Code">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import 'vue-country-region-select'

export default {
  name: 'EntityDetails',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: [
    'employee'
  ],
  data () {
    return {
      country: '',
      entityTypes: [
        {
          name: 'Branch of a foreign company',
          id: 1
        },
        {
          name: 'Company limited by guarantee',
          id: 2
        },
        {
          name: 'Incorporation',
          id: 3
        },
        {
          name: 'General partnership',
          id: 4
        },
        {
          name: 'Joint stock companies',
          id: 5
        },
        {
          name: 'Limited liability company (LLC)',
          id: 6
        },
        {
          name: 'Limited liability partnership',
          id: 7
        },
        {
          name: 'Limited partnership',
          id: 8
        },
        {
          name: 'Non profit corporation',
          id: 9
        },
        {
          name: 'Private company limited by shares',
          id: 10
        },
        {
          name: 'Private liability company (LTD)',
          id: 11
        },
        {
          name: 'Public company limited by shares',
          id: 12
        },
        {
          name: 'Public liability company',
          id: 13
        },
        {
          name: 'Sole proprietor/sole trader',
          id: 14
        },
        {
          name: 'Trusts',
          id: 15
        },
        {
          name: 'Unlimited company',
          id: 16
        },
        {
          name: 'Registered individual',
          id: 17
        },
        {
          name: 'Unregisterad individual',
          id: 18
        },
        {
          name: 'Sole Trader',
          id: 19
        },
        {
          name: 'Other',
          id: 20
        }
      ],
      profile: {
        username: this.$auth.user.userProfile.firstname,
        email: this.$auth.user.username,
        name: this.employee.company.name,
        workLocation: this.employee.company.location,
        workStreet: this.employee.company.street,
        workCity: this.employee.company.city,
        workPostalCode: this.employee.company.postalCode,
        workEntityType: this.employee.company.entityType,
        workVatID: this.employee.company.vatID,
        workRegistrationNumber: this.employee.company.registrationNumber,
        workCountry: this.employee.company.country,
        isCompanyAdmin: this.employee.isCompanyAdmin
      }
    }
  },
  mounted () {
    // this.stylingInputPhone()
  },
  methods: {
    // stylingInputPhone () {
    //   const inputTel = document.getElementsByClassName('input-tel__input')[0]
    //   inputTel.style.borderTopRightRadius = '16px'
    //   inputTel.style.borderBottomRightRadius = '16px'
    //
    //   const countryInput = document.getElementsByClassName('country-selector__input')[0]
    //   countryInput.style.borderTopLeftRadius = '16px'
    //   countryInput.style.borderBottomLeftRadius = '16px'
    // },
    async post () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.employee.company.name = this.profile.name
      this.employee.company.location = this.profile.workLocation
      this.employee.company.street = this.profile.workStreet
      this.employee.company.city = this.profile.workCity
      this.employee.company.postalCode = this.profile.workPostalCode
      this.employee.company.entityType = this.profile.workEntityType
      this.employee.company.vatID = this.profile.workVatID
      this.employee.company.registrationNumber = this.profile.workRegistrationNumber
      this.employee.company.country = this.profile.workCountry
      this.employee.isCompanyAdmin = true

      return isValid
    },
    onFormChange () {
      let isComplete = true
      for (const name in this.profile) {
        if (!this.profile[name]) {
          isComplete = false
        }
      }

      this.$emit('formProfileChange', isComplete)
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  align-items: center;
  text-align: center;
  color: #000000;

  div{
    text-align: center;
    font-weight: 600;
    margin-left: 30px;
  }
}
.text-link{
  font-size: 16px;
  color: #2E4823;
  font-weight: 600;
  display: block;
  text-decoration: underline;
  margin-top: 16px;
}

.sub-title{
  font-size: 18px;
  font-weight: 600;
  color: #313131;
}
.login-credential-input{
  margin-top: 40px;
  &::placeholder{
    color: #A0A3BD;
    font-size: 16px;
  }
}
.phonenumber-custom{
  margin-top: 40px;
}
select.login-credential-input{
  appearance: none;

  + span{
    position: absolute;
    /*right: 40px;*/
    /*top: 20%;*/
  }
}

.text-danger{
  position: absolute;
}

.mt-80{
  margin-top: 80px;
}
</style>
