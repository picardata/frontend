<template>
  <div>
    <div class="row mt-3">
      <div class="col-12 card border pr-0 pl-0">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Contract</th>
              <th scope="col">Status</th>
              <th class="contract-amount-wrapper" scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>

            <tr v-for="(contract, index) in contracts" :key="index">
              <td>
                <NuxtLink :to="`${contract.url}`">
                  <span class="contract-name">{{ contract.contractName }}</span> <br/>
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
                <span class="contract-amount">{{ contract.salaryCurrency }} {{ formatPrice(contract.salaryAmount) }}</span><br/>
                <span class="contract-payment-type">{{ contract.salaryPaymentType }}</span>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Paging
          style="width: 100%"
          :data="contracts"
          :get-total-page="getTotalPage"
          :get-current-page="getCurrentPage"
          :set-current-page="setCurrentPage"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ContractList",
  props: [
    'milestoneContracts',
    'fullTimeEmployeeContracts',
    'payAsYouGoContracts',
  ],
  data () {
    return {
      contracts: [],
      totalPage: 1,
      currentPage: 1,
      payAsYouGoSalaryFrequencies: [
          {
              name: 'Default',
          },
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
        ],
    }
  },
  mounted () {
    let contracts = []
    const payAsYouGoSalaryFrequencies = this.payAsYouGoSalaryFrequencies
    this.payAsYouGoContracts.forEach(function (payAsYouGoContract, index) {
      const contract = {
        uuid: payAsYouGoContract.uuid,
        contractName: payAsYouGoContract.contractName,
        contractType: 'PAY AS YOU GO',
        contractStatus: payAsYouGoContract.contractStatus,
        salaryCurrency: payAsYouGoContract.salaryCurrency,
        salaryAmount: payAsYouGoContract.salaryAmount,
        salaryPaymentType: payAsYouGoSalaryFrequencies[payAsYouGoContract.salaryFrequency].name,
        url: '/contracts/preview-contract/pay-as-you-go/' + payAsYouGoContract.uuid
      }
      contracts.push(contract)
    });

    this.milestoneContracts.forEach(function (milestoneContract, index) {
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
    });

    this.fullTimeEmployeeContracts.forEach(function (fullTimeEmployeeContract, index) {
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
    });

    this.contracts = contracts
  },
  methods: {
    setCurrentPage (currentPage) {
      if (currentPage > 0 && currentPage <= this.totalPage) {
        this.currentPage = currentPage
      }
    },
    formatPrice(value) {
      let val = (value/1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    getTotalPage () {
      return this.totalPage
    },
    getCurrentPage () {
      return this.currentPage
    }
  }
}
</script>

<style lang="scss" scoped>
h1{
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: 0.75px;
  text-align: left;
}

table{
  thead{
    th{
      border-top: none;
      border-bottom: none;
      color: #313131;
      font-weight: 600;
      font-size: 16px;
      padding-left: 0;
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
      padding-left: 0;
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
</style>