<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <div class="container-fluid pt-6">
          <div class="row mt-3">
            <div class="col-12">
              <span class="form-title page-header">Partner Listing</span>
            </div>
          </div>
          <div class="row mt-3 mb-4">
            <div class="col-12">
              <div>
                <div class="row mt-3">
                  <div class="col-8 mb-4 pl-0">
                    <form id="navbar-search-main" :key="partnerSearchKey" class="navbar-search form-inline navbar-search-light">
                      <div class="form-group" style="width: 100%">
                        <div class="input-group input-group-alternative company-search-bar">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-search" /></span>
                          </div>
                            <input class="form-control form-input" v-model="partnerSearchKeyword" placeholder="Search partner name here..." @change="getPartnerList($event)">

                          <!-- <select v-model="selectedCompany" class="form-control form-input" @change="getPayslipList($event)">
                            <option v-for="(company, key) in companyArr" :key="company.uuid + key" :value="company.id">
                              {{ company.name }} (REGISTRATION NO.: {{ company.registrationNumber }}, COUNTRY: {{ company.country }})
                            </option>
                          </select> -->
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="col-2 mb-4 pr-0">
                    <button type="button" class="btn btn-lg btn-primary btn-add next-btn float-right" @click.prevent="getAllPartnerList()">
                      <span>Clear Search</span>
                    </button>
                  </div>

                  <div class="col-2 mb-4 pr-0">
                    <button type="button" class="btn btn-lg btn-primary btn-add next-btn float-right" @click.prevent="modals.partnerEmailInvitation = true">
                      <span>Invite New Partner</span>
                    </button>
                  </div>
                  <div class="col-12 card border pr-0 pl-0">
                    <table :key="partnerKey" class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">
                            Name
                          </th>
                          <th scope="col">
                            Country
                          </th>
                          <th scope="col">
                            Business Registration Number
                          </th>
                          <th scope="col">
                            Industry
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(partner, index) in partners" :key="index">
                          <td>
                            <a :href="`${partner.url}`" target="_blank">
                              <span class="contract-name">{{ partner.name }}</span>
                            </a>
                          </td>
                          <td>
                            <span class="contract-name">{{ partner.country }}</span>
                          </td>
                          <td>
                            <span class="contract-name">{{ partner.registrationNumber }}</span>
                          </td>
                          <td>
                            <span class="contract-name">{{ partner.industry }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :show.sync="modals.partnerEmailInvitation" size="lg" modal-classes="modal-partner-invitation">
      <template slot="header" />
      <div class="full-contract-details-wrapper">
        <div class="mr-3">
          <div class="all-form-title bold-text form-field">
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(post)">
                <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="partnerEmailAddress" name="Partner email address">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label">Partner email</span><br>
                    <input v-model="partnerEmailAddress" type="text" class="form-input form-control" placeholder="">
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="partnerEmailAddress" name="Email Content">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label">Invitation Message</span><br>
                    <textarea v-model="partnerEmailInvitationContent" type="text" class="form-input form-control" placeholder="" />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </form>
            </ValidationObserver>

            <div class="button-wrapper">
              <base-button type="primary" @click.prevent="sendPartnerInvitation">
                Send Invite
              </base-button>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer" />
    </modal>
  </div>
</template>

<script>
import loaderMixin from '~/mixins/loader'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import flatPicker from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'IndexVue',
  layout: 'storeLayout',
  auth: true,
  components: {
    ValidationObserver,
    ValidationProvider,
    flatPicker
  },
  mixins: [
    loaderMixin
  ],
  async asyncData (context) {
    const [partnersRawData] = await Promise.all([
      context.app.$axios.get('/api/marketplace/partner/?order[name]=asc&page_number=1&items_per_page=999&status=1')
    ])

    return {
      partnersRawData: partnersRawData.data
    }
  },
  data () {
    return {
      crumbs: [
        {
          name: 'Partner List',
          path: '/payslips/globelise-admin/payslip-list'
        }
      ],
      modals: {
        partnerEmailInvitation: false,
      },
      submenu: true,
      partnerKey: 0,
      partnerSearchKey: 0,
      selectedCompany: '',
      partners: '',
      partnerSearchKeyword: '',
      partnerEmailInvitationContent: 'We are so excited to work with you. This is a partnership invitation with Globelise. Online platform to market and sell your product.',
      partnerEmailAddress: ''
    }
  },
  created () {
    const partners = []
    const apiHost = this.$config.axios.baseURL

    this.partnersRawData.forEach(function (partnersRaw) {
      if (partnersRaw.name != null && partnersRaw.name != '') {
        const partner = {
          name: partnersRaw.name,
          country: partnersRaw.country,
          registrationNumber: partnersRaw.registrationNumber,
          uuid: partnersRaw.uuid,
          industry: partnersRaw.industry,
          url: '/store/partners/' + partnersRaw.uuid,
        }

        partners.push(partner)
      }
    })
    this.partners = partners

  },
  methods: {
    getPartnerList (event) {
      this.partnerSearchKeyword = event.target.value
      var nameParameter = '' 
      
      if (this.partnerSearchKeyword != '') {
        nameParameter = '&name=' + this.partnerSearchKeyword
      }

      this.$axios.get('/api/marketplace/partner/?order[name]=asc&page_number=1&items_per_page=999&status=1' + nameParameter)
        .then((partnerDatas) => {
          const partners = []
          const apiHost = this.$config.axios.baseURL
          if (partnerDatas.data.length > 0) {
            partnerDatas.data.forEach(function (partnerData) {
              if (partnerData.name != null && partnerData.name != '') {
                const partner = {
                  name: partnerData.name,
                  country: partnerData.country,
                  registrationNumber: partnerData.registrationNumber,
                  uuid: partnerData.uuid,
                  industry: partnerData.industry,
                  url: '/store/partners/' + partnerData.uuid,
                }

                partners.push(partner)
              }
            })
          }

          this.partners = partners
          this.partnerKey++
        }).catch(() => {
          return false
        })
    },
    getAllPartnerList () {
      this.$axios.get('/api/marketplace/partner/?order[name]=asc&page_number=1&items_per_page=999&status=1')
        .then((partnerDatas) => {
          const partners = []
          const apiHost = this.$config.axios.baseURL
          if (partnerDatas.data.length > 0) {
            partnerDatas.data.forEach(function (partnerData) {
              if (partnerData.name != null && partnerData.name != '') {
                const partner = {
                  name: partnerData.name,
                  country: partnerData.country,
                  registrationNumber: partnerData.registrationNumber,
                  uuid: partnerData.uuid,
                  industry: partnerData.industry,
                  url: '/store/partners/' + partnerData.uuid,
                }

                partners.push(partner)
              }
            })
          }
          this.selectedCompany = ''
          this.partners = partners
          this.partnerKey++
          this.partnerSearchKey++
        }).catch(() => {
          return false
        })
    },
    async sendPartnerInvitation () {
      await this.$axios.$post('/api/marketplace/partner/marketplace/partner/invitation', {
        partnerEmailAddress: this.partnerEmailAddress,
        partnerEmailInvitationContent: this.partnerEmailInvitationContent,
        hostUrl: location.protocol + '//' + window.location.hostname
      }).then(() => {
        this.modals.partnerEmailInvitation = false
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
    },
  }

}
</script>

<style scoped>
  h1 {
    font-size: 36px;
    font-weight: bolder;
  }
  .picardata-arrow {
    color: #14142B;
    font-size: 200%;
  }
  .span-desc{
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.75px;
    /* Body Text */
    color: #313131;
  }
  .card-title {
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.75px;
    /* Body Text */
    color: #313131;
  }
  .card-text {
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.75px;
    /* Body Text */
    color: #000000;
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
  .all-form-title {
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    /* identical to box height */
    letter-spacing: 0.75px;
    /* Body Text */
    color: #313131;
  }
  .bold-text{
    font-weight:700 !important;
  }
  .btn-round {
    border-radius: 5px;
    font-weight: normal;
    font-size: 14px;
    padding: 10px 20px;
  }
</style>

<style lang="scss">
  h1{
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 30px;
    letter-spacing: 0.75px;
    text-align: left;
  }

  .company-search-bar {
    background: #EFF0F7;
    border-radius: 0px !important;
    border: none !important;
    width: 100% !important;
    height: 51px;

    select {
      margin-right: 10px !important;
      height: 51px;
    }
  }

  .modal-partner-invitation {
    .full-contract-details-wrapper {
        .form-field {
            color: #6a6969;
            margin-bottom: 20px;
        }

        textarea {
            height: 100px;
        }

        .btn {
            width: 100%;
        }
    }

    .modal-footer {
        display: block !important;
        width: 100%;

        .signature-wrapper {
            width: 100%;
        }

        .button-wrapper {
            padding: 10px 0;
            width: 100%;
            display: grid;
        }
    }
  }

  .table{
    thead{
      th{
        border-top: none;
        border-bottom: none;
        color: #313131;
        font-weight: 600;
        font-size: 16px;
        padding-left: 5px;
        padding-right: 5px;
      }
    }
    tbody{
      tr:nth-of-type(odd){
        background: linear-gradient(0deg, #FAFAFA, #FAFAFA), linear-gradient(0deg,#FAFAFA,#FAFAFA),#FAFAFA;
      }
      td{
        color: #313131;
        font-weight: normal;
        font-size: 16px;
        letter-spacing: 0.75px;
        border: none;
        padding-left: 5px;
      }
    }
    .contract-name {
      font-weight: 800;
    }
    .contract-type {
      font-size: 12px;
      color: black;
    }
    .contract-amount-wrapper {
      text-align: right;
    }
    .contract-amount {
      font-weight: 800;
    }
    .contract-payment-type {
      font-size: 12px;
      color: black;
    }
    .delete-payslip-btn {
      margin-top: -10px;
    }
    .badge{
      color: #000000;
      letter-spacing: 0.75px;
      font-weight: 600;
      font-size: 12px;
      border-radius: 4px;
      &.badge-0{
        background-color: #ff6842;
      }
      &.badge-1{
        background-color: #DAE6FF;
      }
      &.badge-2{
        background-color: #FFDD63;
      }
      &.badge-3{
        background-color: #aaff86d9;
      }
    }
    a{
      color: #3E4EDD;
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
