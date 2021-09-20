<template>
  <div>
    <div class="row">
      <div class="col-6">
        <h1>Contracts List</h1>
      </div>
      <div class="col-6">
        <nuxt-link to="/billing" class="btn btn-lg btn-primary btn-round float-right">
          Download All PDFs
        </nuxt-link>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Contract</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(contract, index) in contracts" :key="index">
              <td>{{ contract.title }}</td>
              <td>{{ contract.amount }}</td>
              <td>
                <span v-if="contract.status === 0" class="badge badge-paid">WAITING FOR CLIENT SIGN</span>
                <span v-else-if="contract.status === 1" class="badge badge-posted">SIGNED</span>
              </td>
              <td>
                <a href="#">Download PDF</a></td>
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
  data () {
    return {
      contracts: [],
      contractsPage1: [
        {
          title: 'Sales Exec Full Time SG\n' +
                  'FULL TIME',
          amount: 'SGD 3,500 MONTHLY',
          status: 0,
        },
        {
          title: 'Data Analyst Internship SG\n' +
                  'FIXED RATE',
          amount: 'SGD 800 MONTHLY',
          status: 1,
        }
      ],
      totalPage: 1,
      currentPage: 1,
    }
  },
  created() {
    this.contracts = this.contractsPage1
  },
  methods: {
    setCurrentPage (currentPage) {
      if (currentPage > 0 && currentPage <= this.totalPage) {
        this.currentPage = currentPage

        if (currentPage === 1) {
          this.contracts = this.contractsPage1
        }
      }
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
  .badge{
    color: #000000;
    letter-spacing: 0.75px;
    font-weight: 600;
    font-size: 12px;
    border-radius: 4px;
    &.badge-posted{
      background-color: #FFDD63;
    }
    &.badge-paid{
       background-color: #DAE6FF;
    }
  }
  a{
    color: #3E4EDD;
  }
}
</style>