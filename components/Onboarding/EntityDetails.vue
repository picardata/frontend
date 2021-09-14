<template>
  <div class="onboarding-complete-profile pb-5">
    <div class="row mt-80">
      <div class="col-12">
        <div class="title">
          <p style="font-size: 24px;color: #2E4823; font-weight: bolder;">Hey {{ profile.name }}, welcome to Globelise</p><br/>
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
                <input v-model="profile.organization" type="text" class="login-credential-input form-control" placeholder="Legal Entity Name">
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
              <ValidationProvider v-slot="{ errors }" mode="passive" vid="company.street" name="Street">
                <input v-model="profile.workStreet" type="text" class="login-credential-input form-control" placeholder="Street">
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
  data () {
    return {
      country: '',
      entityTypes: [
        {
          name: 'Private Limited',
          id: 1
        },
        {
          name: 'Public Limited',
          id: 2
        },
        {
          name: 'Partnership',
          id: 3
        },
        {
          name: 'Sole Proprietorship',
          id: 4
        },
        {
          name: 'Others',
          id: 5
        }
      ],
      profile: {
        name: this.$auth.user.userProfile.firstname,
        email: this.$auth.user.username,
        phone: '',
        formattedPhone: '',
        location: '',
        taxID: '',
        dateOfBirth: '',
        nationality: '',
        countryOfTaxResidence: '',
        timezone: '',
        street: '',
        city: '',
        postalCode: '',
        occupation: 0,
        role: '',
        organization: '',
        workLocation: '',
        workStreet: '',
        workCity: '',
        workPostalCode: '',
        workEntityType: '',
        workVatID: '',
        workRegistrationNumber: '',
        workCountry: ''
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

      const result = this.$axios.$post('/api/employees/', {
        userProfile: this.$auth.user.userProfile.id,
        role: '',
        occupation: '',
        taxID: '',
        nationality: '',
        countryOfTaxResidence: '',
        timezone: '',
        street: '',
        city: '',
        postalCode: '',

        company: {
          name: this.profile.organization,
          location: this.profile.workLocation,
          street: this.profile.workStreet,
          city: this.profile.workCity,
          postalCode: this.profile.workPostalCode,
          entityType: this.profile.workEntityType,
          vatID: this.profile.workVatID,
          registrationNumber: this.profile.workRegistrationNumber,
          country: this.profile.workCountry
        }
      }).then((data) => {
        this.$auth.setUser(data)
        return true
      }).catch((e) => {
        const errors = {}

        if (e.response.data.errors.userProfile !== undefined) {
          Object.entries(e.response.data.errors.userProfile).forEach(function (value) {
            const key = 'profile.' + value[0]
            errors[key] = value[1]
          })
        }
        if (e.response.data.errors.company !== undefined) {
          Object.entries(e.response.data.errors.company).forEach(function (value) {
            const key = 'company.' + value[0]
            errors[key] = value[1]
          })
        }

        this.$refs.form.setErrors(errors)
        return false
      })

      return result
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
