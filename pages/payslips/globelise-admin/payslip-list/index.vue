<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <div class="container-fluid pt-6">
          <div class="row mt-3">
            <div class="col-12">
              <span class="form-title page-header">Payslips</span>
            </div>
          </div>
          <div class="row mt-3 mb-4">
            <div class="col-12">
              <div>
                <div class="row mt-3">
                  <div class="col-10 mb-4 pl-0">
                    <form id="navbar-search-main" :key="payslipSearchKey" class="navbar-search form-inline navbar-search-light">
                      <div class="form-group" style="width: 100%">
                        <div class="input-group input-group-alternative company-search-bar">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-search" /></span>
                          </div>

                          <select v-model="selectedCompany" class="form-control form-input" @change="getPayslipList($event)">
                            <option v-for="(company, key) in companyArr" :key="company.uuid + key" :value="company.id">
                              {{ company.name }} (REGISTRATION NO.: {{ company.registrationNumber }}, COUNTRY: {{ company.country }})
                            </option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="col-2 mb-4 pr-0">
                    <button type="button" class="btn btn-lg btn-primary btn-add next-btn float-right" @click.prevent="getAllPayslipList()">
                      <span>Clear Search</span>
                    </button>
                  </div>
                  <div class="col-12 card border pr-0 pl-0">
                    <table :key="payslipKey" class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">
                            Payslip Name
                          </th>
                          <th scope="col">
                            Employee
                          </th>
                          <th scope="col">
                            Filename
                          </th>
                          <th scope="col">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(payslip, index) in payslips" :key="index">
                          <td>
                            <span class="contract-name">{{ payslip.name }}</span>
                          </td>
                          <td>
                            <span class="contract-name">{{ payslip.employee }}</span>
                          </td>
                          <td>
                            <a :href="`${payslip.url}`" target="_blank">
                              <span class="contract-name">{{ payslip.filename }}</span>
                            </a>
                          </td>
                          <td>
                            <button :id="'payslip-' + index" class="btn btn-gray-light delete-payslip-btn" @click="deletePayslip(payslip, index)">
                              <span class="share-open">Delete</span>
                            </button>
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
  </div>
</template>

<script>
import loaderMixin from '~/mixins/loader'
export default {
  name: 'IndexVue',
  layout: 'argon',
  auth: true,
  mixins: [
    loaderMixin
  ],
  async asyncData (context) {
    const [uploadedPayslips, companiesRawData] = await Promise.all([
      context.app.$axios.get('/api/payslip/?order[updatedAt]=asc&page_number=1&items_per_page=999&status=1'),
      context.app.$axios.get('/api/companies/?order[name]=asc&page_number=1&items_per_page=999&status=1')
    ])

    return {
      uploadedPayslips: uploadedPayslips.data,
      companiesRawData: companiesRawData.data
    }
  },
  data () {
    return {
      crumbs: [
        {
          name: 'Payslip List',
          path: '/payslips'
        }
      ],
      submenu: true,
      payslipKey: 0,
      payslipSearchKey: 0,
      selectedCompany: '',
      companyArr: []
    }
  },
  created () {
    const payslips = []
    const apiHost = this.$config.axios.baseURL

    this.uploadedPayslips.forEach(function (uploadedPayslip) {
      const payslip = {
        name: uploadedPayslip.name,
        filename: uploadedPayslip.filename,
        employee: uploadedPayslip.employee.userProfile.firstname,
        url: apiHost + '/uploads/payslip_document/' + uploadedPayslip.filename,
        uuid: uploadedPayslip.uuid,
        employeeId: uploadedPayslip.employee.id,
        companyId: uploadedPayslip.company.id
      }

      payslips.push(payslip)
    })
    this.payslips = payslips

    const companies = []
    this.companiesRawData.forEach(function (companyRaw) {
      if (companyRaw.name !== null) {
        const company = {
          name: companyRaw.name,
          uuid: companyRaw.uuid,
          id: companyRaw.id,
          country: companyRaw.country,
          registrationNumber: companyRaw.registrationNumber
        }

        companies.push(company)
      }
    })

    this.companyArr = companies
  },
  methods: {
    getPayslipList (event) {
      this.selectedCompany = event.target.value
      this.$axios.get('/api/payslip/?order[updatedAt]=asc&page_number=1&items_per_page=999&status=1&company=' + this.selectedCompany)
        .then((payslipDatas) => {
          const payslips = []
          const apiHost = this.$config.axios.baseURL
          if (payslipDatas.data.length > 0) {
            payslipDatas.data.forEach(function (payslipData) {
              const payslip = {
                name: payslipData.name,
                filename: payslipData.filename,
                employee: payslipData.employee.userProfile.firstname,
                url: apiHost + '/uploads/payslip_document/' + payslipData.filename,
                uuid: payslipData.uuid,
                employeeId: payslipData.employee.id,
                companyId: payslipData.company.id
              }

              payslips.push(payslip)
            })
          }

          this.payslips = payslips
          console.log(this)
          this.payslipKey++
        }).catch(() => {
          return false
        })
    },
    getAllPayslipList () {
      this.$axios.get('/api/payslip/?order[updatedAt]=asc&page_number=1&items_per_page=999&status=1')
        .then((payslipDatas) => {
          const payslips = []
          const apiHost = this.$config.axios.baseURL
          if (payslipDatas.data.length > 0) {
            payslipDatas.data.forEach(function (payslipData) {
              const payslip = {
                name: payslipData.name,
                filename: payslipData.filename,
                employee: payslipData.employee.userProfile.firstname,
                url: apiHost + '/uploads/payslip_document/' + payslipData.filename,
                uuid: payslipData.uuid,
                employeeId: payslipData.employee.id,
                companyId: payslipData.company.id
              }

              payslips.push(payslip)
            })
          }
          this.selectedCompany = ''
          this.payslips = payslips
          this.payslipKey++
          this.payslipSearchKey++
        }).catch(() => {
          return false
        })
    },

    deletePayslip (payslip, index) {
      this.$axios.$patch('/api/payslip/' + payslip.uuid,
        {
          status: 0,
          name: payslip.name,
          employee: payslip.employeeId,
          company: payslip.companyId,
          type: 'Upload'
        }
      ).then(() => {
        this.payslips.splice(index, 1)
        this.payslipKey++
      }).catch(() => {
        return false
      })
    }
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
