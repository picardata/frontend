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
              <div v-if="!isCompanyAdmin" class="row">
                <div class="col-8">
                  <div class="card border">
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
                                <NuxtLink :to="`/contracts/preview-contract/pay-as-you-go/${contract.uuid}`">
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
                              <td>There is no contract</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <Paging
                        style="width: 100%"
                        :data="myContracts"
                        :get-total-page="getMyContractTotalPage"
                        :get-current-page="getMyContractCurrentPage"
                        :set-current-page="setMyContractCurrentPage"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="card border p-4">
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
                  <div class="card border p-4">
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
                  <div class="card border p-4">
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
    const [profile, payAsYouGoContracts, milestoneContracts, fullTimeEmployeeContracts] = await Promise.all([
      context.app.$axios.get('/api/user-profiles/' + contractorUserProfile + '/employees/me'),
      context.app.$axios.get('/api/pay/as/you/go/contract/?order[updatedAt]=asc&page_number=1&items_per_page=999&contractorUserProfile=' + contractorUserProfile),
      context.app.$axios.get('/api/milestone/contract/?order[updatedAt]=asc&page_number=1&items_per_page=999&contractorUserProfile=' + contractorUserProfile),
      context.app.$axios.get('/api/full/time/employee/contract/?order[updatedAt]=asc&page_number=1&items_per_page=999&contractorUserProfile=' + contractorUserProfile)
    ])

    return {
      profile: profile.data,
      payAsYouGoContracts: payAsYouGoContracts.data,
      milestoneContracts: milestoneContracts.data,
      fullTimeEmployeeContracts: fullTimeEmployeeContracts.data
    }
  },
  data () {
    return {
      submenu: true,
      isCompanyAdmin: this.$auth.user.userProfile.employees[0].isCompanyAdmin,
      myContracts: [],
      myContractsTotalPage: 1,
      myContractsCurrentPage: 1,
      payAsYouGoContractSalaryFrequencies: [
        {
          name: 'Hour',
          id: 1
        },
        {
          name: 'Day',
          id: 2
        },
        {
          name: 'Week',
          id: 3
        },
        {
          name: 'Task',
          id: 4
        }
      ]
    }
  },
  computed: {
  },
  mounted () {
    const contracts = []
    const payAsYouGoSalaryFrequencies = this.payAsYouGoContractSalaryFrequencies
    this.payAsYouGoContracts.forEach(function (payAsYouGoContract) {
      const contract = {
        uuid: payAsYouGoContract.uuid,
        contractName: payAsYouGoContract.contractName,
        contractType: 'PAY AS YOU GO',
        contractStatus: payAsYouGoContract.contractStatus,
        salaryCurrency: payAsYouGoContract.salaryCurrency,
        salaryAmount: payAsYouGoContract.salaryAmount,
        salaryPaymentType: payAsYouGoSalaryFrequencies[payAsYouGoContract.salaryFrequency].name

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
        salaryPaymentType: ''

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
        salaryPaymentType: 'Monthly'

      }

      contracts.push(contract)
    })

    this.myContracts = contracts
  },
  methods: {
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
      font-weight: bolder;
      font-size: 24px;
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
      font-weight: 600;
      font-size: 20px;
      color: #14142B;
    }
    .role{
      font-weight: 500;
      color: #14142B;
      margin-top: 8px;
    }
  }
</style>
