<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <div class="container-fluid">
          <div class="row profile mt-6">
            <div class="image">
              <img src="~/assets/dashboard-img/ic_no_image_placeholder.png" alt="">
            </div>
            <div>
              <div class="name">
                Welcome, {{ profile.userProfile.firstname }}
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-12">
              <div v-if="isGlobeliseAdmin === true" class="row">
                <div class="col-6">
                  <div class="card border table-primary p-4">
                    <div class="mr-3">
                      <div class="all-form-title bold-text row">
                        <div class="col-6">
                          <h3 style="text-align: left; padding: 0.87rem 0 0 0;">
                            No payments due
                          </h3>
                        </div>
                        <div class="col-6">
                          <nuxt-link to="/contracts/create-contract" class="btn btn-lg btn-primary btn-round">
                            Create Contract
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="card border table-primary p-4">
                    <div class="mr-3">
                      <div class="all-form-title bold-text">
                        <div>
                          <h2 style="text-align: left;">
                            Payment history
                          </h2>
                          <img class="mt-3" style="" src="~/assets/contract/fixed_rate_contract.png" alt="Fixed rate contract">
                        </div>
                        <div class="mt-3">
                          You’ll see beautiful graphs after your first payment!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="isCompanyAdmin === true" class="row">
                <div class="col-6">
                  <div class="card border table-primary p-4">
                    <div class="mr-3">
                      <div class="all-form-title bold-text row">
                        <div class="col-6">
                          <h3 style="text-align: left; padding: 0.87rem 0 0 0;">
                            No payments due
                          </h3>
                        </div>
                        <div class="col-6">
                          <nuxt-link to="/contracts/create-contract" class="btn btn-lg btn-primary btn-round">
                            Create Contract
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="card border table-primary p-4">
                    <div class="mr-3">
                      <div class="all-form-title bold-text">
                        <div>
                          <h2 style="text-align: left;">
                            Payment history
                          </h2>
                          <img class="mt-3" style="" src="~/assets/contract/fixed_rate_contract.png" alt="Fixed rate contract">
                        </div>
                        <div class="mt-3">
                          You’ll see beautiful graphs after your first payment!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="row">
                <div class="col-6">
                  <div class="card border table-primary">
                    <div class="">
                      <div class="">
                        <div class="border-0 card-header">
                          <h2 class="mb-0">
                            My Contracts
                          </h2>
                        </div>
                        <table class="table table-striped my-contracts-table">
                          <thead>
                            <tr>
                              <th scope="col">
                                Contract
                              </th>
                              <th scope="col">
                                Status
                              </th>
                              <th class="contract-amount-wrapper" scope="col">
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody v-if="myContracts.length">
                            <tr v-for="(contract, index) in myContracts" :key="index">
                              <td>
                                <NuxtLink :to="`${contract.url}`" class="">
                                  <span class="contract-name">{{ contract.contractName }}</span> <br>
                                  <span class="contract-type">{{ contract.contractType }}</span>
                                </NuxtLink>
                              </td>
                              <td>
                                <span v-if="contract.contractStatus == 1" class="badge badge-1">DRAFT</span>
                                <span v-else-if="contract.contractStatus == 2" class="badge badge-2">WAITING FOR CONTRACTOR SIGNATURE</span>
                                <span v-else-if="contract.contractStatus == 3" class="badge badge-3">SIGNED BY BOTH PARTIES</span>
                                <span v-else class="badge badge-0">UNDEFINED</span>
                              </td>
                              <td class="contract-amount-wrapper">
                                <span class="contract-amount">{{ contract.salaryCurrency }} {{ formatPrice(contract.salaryAmount) }}</span><br>
                                <span class="contract-payment-type">{{ contract.salaryPaymentType }}</span>
                              </td>
                            </tr>
                          </tbody>
                          <tbody v-else>
                            <tr>
                              <td colspan="3" class="no-data">
                                <img src="~/assets/menu_icons/Not_found.png" alt="No data"><br><br>
                                <span>There is no contract</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="card border table-primary">
                    <div class="">
                      <div class="">
                        <div class="border-0 card-header">
                          <h2 class="mb-0">
                            My CV
                          </h2>
                        </div>

                        <table class="table table-striped my-contracts-table">
                          <tbody>
                            <tr>
                              <td colspan="3" class="no-data">
                                <img class="mb-4" style="height: 150px" src="~/assets/onboarding/individual.png" alt="Edit CV"><br>
                                <button type="button" class="btn btn-lg btn-tertiary mr-0 pl-4 pr-4" @click.prevent="goToEditCVPage">
                                  View
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="card border table-primary">
                    <div class="">
                      <div class="">
                        <div class="border-0 card-header">
                          <h2 class="mb-0">
                            My Payslips
                          </h2>
                        </div>
                        <table class="table table-striped my-contracts-table">
                          <thead>
                            <tr>
                              <th scope="col">
                                Name
                              </th>
                              <th scope="col">
                                Employee
                              </th>
                              <th class="contract-amount-wrapper" scope="col">
                                Filename
                              </th>
                            </tr>
                          </thead>
                          <tbody v-if="myPayslips.length">
                            <tr v-for="(payslip, index) in myPayslips" :key="index">
                              <td>
                                <span class="contract-name">{{ payslip.name }}</span>
                              </td>
                              <td>
                                <span class="contract-name">{{ payslip.employee }}</span>
                              </td>
                              <td class="contract-amount-wrapper">
                                <a :href="`${payslip.url}`" target="_blank">
                                  <span class="contract-name file-url">{{ payslip.filename }}</span>
                                </a>
                              </td>
                            </tr>
                          </tbody>
                          <tbody v-else>
                            <tr>
                              <td colspan="3" class="no-data">
                                <img src="~/assets/menu_icons/Not_found.png" alt="No data"><br><br>
                                <span>There is no payslip</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="card border table-primary">
                    <div class="">
                      <div class="">
                        <div class="border-0 card-header">
                          <h2 class="mb-0">
                            My Tax Documents
                          </h2>
                        </div>
                        <table class="table table-striped my-contracts-table">
                          <thead>
                            <tr>
                              <th scope="col">
                                Name
                              </th>
                              <th scope="col">
                                Employee
                              </th>
                              <th class="contract-amount-wrapper" scope="col">
                                Filename
                              </th>
                            </tr>
                          </thead>
                          <tbody v-if="myTaxDocuments.length">
                            <tr v-for="(taxDocument, index) in myTaxDocuments" :key="index">
                              <td>
                                <span class="contract-name">{{ taxDocument.name }}</span>
                              </td>
                              <td>
                                <span class="contract-name">{{ taxDocument.employee }}</span>
                              </td>
                              <td class="contract-amount-wrapper">
                                <a :href="`${taxDocument.url}`" target="_blank">
                                  <span class="contract-name file-url">{{ taxDocument.filename }}</span>
                                </a>
                              </td>
                            </tr>
                          </tbody>
                          <tbody v-else>
                            <tr>
                              <td colspan="3" class="no-data">
                                <img src="~/assets/menu_icons/Not_found.png" alt="No data"><br><br>
                                <span>There is no tax document</span>
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
    </div>
  </div>
</template>
<script>
import { Select, Option } from 'element-ui'
import loaderMixin from '~/mixins/loader'
import hubspotMixin from '~/mixins/hubspot'

export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
  auth: true,
  layout: 'argon',
  mixins: [
    loaderMixin,
    hubspotMixin
  ],
  async asyncData (context) {
    const contractorUserProfile = context.app.$auth.user.userProfile.id
    const employeeId = context.app.$auth.user.userProfile.employees[0].id

    const [profile, payAsYouGoContracts, milestoneContracts, fullTimeEmployeeContracts, uploadedPayslips, uploadedTaxDocuments] = await Promise.all([
      context.app.$axios.get('/api/user-profiles/' + contractorUserProfile + '/employees/me'),
      context.app.$axios.get('/api/pay/as/you/go/contract/?order[updatedAt]=asc&page_number=1&items_per_page=999&contractorUserProfile=' + contractorUserProfile),
      context.app.$axios.get('/api/milestone/contract/?order[updatedAt]=asc&page_number=1&items_per_page=999&contractorUserProfile=' + contractorUserProfile),
      context.app.$axios.get('/api/full/time/employee/contract/?order[updatedAt]=asc&page_number=1&items_per_page=999&contractorUserProfile=' + contractorUserProfile),
      context.app.$axios.get('/api/payslip/?order[updatedAt]=asc&page_number=1&items_per_page=999&status=1&employee=' + employeeId),
      context.app.$axios.get('/api/tax/document/?order[updatedAt]=asc&page_number=1&items_per_page=999&status=1&employee=' + employeeId)
    ])

    return {
      profile: profile.data,
      payAsYouGoContracts: payAsYouGoContracts.data,
      milestoneContracts: milestoneContracts.data,
      fullTimeEmployeeContracts: fullTimeEmployeeContracts.data,
      uploadedPayslips: uploadedPayslips.data,
      uploadedTaxDocuments: uploadedTaxDocuments.data
    }
  },
  data () {
    return {
      submenu: true,
      isCompanyAdmin: this.$auth.user.userProfile.employees[0].isCompanyAdmin,
      isGlobeliseAdmin: this.$auth.user.userProfile.employees[0].isGlobeliseAdmin,
      myContracts: [],
      myPayslips: [],
      myTaxDocuments: [],

      myPayslipsTotalPage: 1,
      myPayslipsCurrentPage: 1,
      myTaxDocumentsTotalPage: 1,
      myTaxDocumentsCurrentPage: 1,
      myContractsTotalPage: 1,
      myContractsCurrentPage: 1,
      payAsYouGoContractSalaryFrequencies: [
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
      ]
    }
  },
  computed: {
  },
  created () {
    if (Object.hasOwnProperty.call(this.$auth.user, 'isCompanyAdmin')) {
      this.isCompanyAdmin = this.$auth.user.isCompanyAdmin
    }
    if (Object.hasOwnProperty.call(this.$auth.user, 'isGlobeliseAdmin')) {
      this.isGlobeliseAdmin = this.$auth.user.isGlobeliseAdmin
    }
  },
  mounted () {
    const contracts = []
    const payAsYouGoSalaryFrequencies = this.payAsYouGoContractSalaryFrequencies
    this.payAsYouGoContracts.forEach(function (payAsYouGoContract) {
      let salaryFrequency = ''
      if (payAsYouGoContract.salaryFrequency !== null) {
        salaryFrequency = payAsYouGoSalaryFrequencies[payAsYouGoContract.salaryFrequency].name
      }

      const contract = {
        uuid: payAsYouGoContract.uuid,
        contractName: payAsYouGoContract.contractName,
        contractType: 'PAY AS YOU GO',
        contractStatus: payAsYouGoContract.contractStatus,
        salaryCurrency: payAsYouGoContract.salaryCurrency,
        salaryAmount: payAsYouGoContract.salaryAmount,
        salaryPaymentType: salaryFrequency,
        url: '/contracts/preview-contract/pay-as-you-go/' + payAsYouGoContract.uuid
      }
      contracts.push(contract)
    })

    this.milestoneContracts.forEach(function (milestoneContract) {
      const contract = {
        uuid: milestoneContract.uuid,
        contractName: milestoneContract.contractName,
        contractType: 'MILESTONE',
        contractStatus: milestoneContract.contractStatus,
        salaryCurrency: '',
        salaryAmount: '',
        salaryPaymentType: '',
        url: '/contracts/preview-contract/milestone/' + milestoneContract.uuid
      }
      contracts.push(contract)
    })

    this.fullTimeEmployeeContracts.forEach(function (fullTimeEmployeeContract) {
      const contract = {
        uuid: fullTimeEmployeeContract.uuid,
        contractName: fullTimeEmployeeContract.employeeFirstName + ' ' + fullTimeEmployeeContract.employeeLastName,
        contractType: 'FULL TIME EMPLOYEE',
        contractStatus: fullTimeEmployeeContract.contractStatus,
        salaryCurrency: fullTimeEmployeeContract.salaryCurrency,
        salaryAmount: fullTimeEmployeeContract.salaryAmount,
        salaryPaymentType: 'Monthly',
        url: '/contracts/preview-contract/full-time-employee/' + fullTimeEmployeeContract.uuid

      }

      contracts.push(contract)
    })

    this.myContracts = contracts

    const payslips = []
    const apiHost = this.$config.axios.baseURL

    this.uploadedPayslips.forEach(function (uploadedPayslip) {
      const payslip = {
        name: uploadedPayslip.name,
        filename: uploadedPayslip.filename,
        employee: uploadedPayslip.employee.userProfile.firstname,
        url: apiHost + '/uploads/payslip_document/' + uploadedPayslip.filename
      }
      payslips.push(payslip)
    })
    this.myPayslips = payslips

    const taxDocuments = []
    this.uploadedTaxDocuments.forEach(function (uploadedTaxDocument) {
      const taxDocument = {
        name: uploadedTaxDocument.name,
        filename: uploadedTaxDocument.filename,
        employee: uploadedTaxDocument.employee.userProfile.firstname,
        url: apiHost + '/uploads/tax_document/' + uploadedTaxDocument.filename
      }
      taxDocuments.push(taxDocument)
    })
    this.myTaxDocuments = taxDocuments
  },
  methods: {
    goToEditCVPage () {
      window.location.href = '/cv'
    },
    setMyContractCurrentPage (currentPage) {
      if (currentPage > 0 && currentPage <= this.myContractsTotalPage) {
        this.myContractsCurrentPage = currentPage
      }
    },
    formatPrice (value) {
      const val = (value / 1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    getMyContractTotalPage () {
      return this.myContractsTotalPage
    },
    getMyContractCurrentPage () {
      return this.myContractsTotalPage
    }
  }
}
</script>
<style scoped lang="scss">
  .table-primary {
    color: #2E4823 !important;

    td {
      border-color: #e9ecef;
    }
    th, td {
      color: #2E4823 !important;
      font-weight: 900 !important;
      letter-spacing: 0;
    }

    .file-url {
      color: #6BB745 !important;
    }

    .no-data {
      text-align: center;

      img {
        width: 120px;
      }
    }
  }
  .my-contracts-table {
    font-family: 'Roboto Condensed';

    th {
      font-size: 14px;
      font-weight: 800;
    }
    td {
      font-size: 14px;
      color: black;
    }
    .contract-amount-wrapper {
      text-align: right;
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
  }
  .all-form-title {
    font-family: 'Roboto Condensed';
    font-style: normal;
    color: #313131;
    text-align: center;
    h3 {
      font-size: 18px;
    }
    span {
      font-size: 14px;
      font-weight: normal !important;
    }
  }

  .slide-enter-active {
    animation: slide .2s reverse;
  }

  .slide-leave-active {
    animation: slide .2s;
  }

  @keyframes slide {
    from { left: 0em; }
    to { left: -14.6em; }
  }

  .manual-crumb {
    color: #181C3B;
    font-size: 1.125em;
    font-weight: 600;
  }

  .box {
    margin: 0.625em 0.625em 0.625em 0.625em;
    width: 10.625em;
    height: 20em;
    background-color: #2E4823;
    border-radius: 1.0625em;
  }

  hr {
    width: 3.125em;
    color: white;
    background-color: white;
    border: 0.09375em solid white;
    border-radius: 0.3125em;
  }

  .box-text {
    color: white;
  }

  .box-number {
    font-size: 50px;
    font-weight: bold;
  }

  .right-content{
    padding: 80px 40px 40px 0;
  }

  .profile{
    display: flex;
    align-items: center;
    margin-top: 20px;

    .image{
      margin-right: 24px;
    }
    .name{
      font-family: 'Roboto', sans-serif;
      font-weight: 600;
      font-size: 28px;
      color: #2E4823;
    }
    .role{
      font-weight: 500;
      color: #14142B;
      margin-top: 8px;
    }
  }

  .right-content{
    padding: 80px 0 80px 40px;
  }

  .profile{
    display: flex;
    align-items: center;
    .image{
      margin-right: 24px;
    }
    .name{
      font-family: 'Roboto', sans-serif;
      font-weight: 600;
      font-size: 28px;
      color: #2E4823;
    }
    .role{
      font-weight: 500;
      color: #14142B;
      margin-top: 8px;
    }
  }
</style>
