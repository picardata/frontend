<template>
  <div>
    <div class="row mt-3">
      <div class="col-12 card border pr-0 pl-0">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Employee</th>
              <th class="contract-amount-wrapper" scope="col">Filename</th>
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
              <td class="contract-amount-wrapper">
                <a :href="`${payslip.url}`" target="_blank">
                  <span class="contract-name">{{ payslip.filename }}</span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Paging
          style="width: 100%"
          :data="payslips"
          :get-total-page="getTotalPage"
          :get-current-page="getCurrentPage"
          :set-current-page="setCurrentPage"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "PayslipList",
  props: [
    'uploadedPayslips'
  ],
  data () {
    return {
      payslips: [],
      totalPage: 1,
      currentPage: 1,
    }
  },
    created () {
        let payslips = []
        const apiHost = this.$config.axios.baseURL

        this.uploadedPayslips.forEach(function (uploadedPayslip, index) {
            const payslip = {
                name: uploadedPayslip.name,
                filename: uploadedPayslip.filename,
                employee: uploadedPayslip.employee.userProfile.firstname,
                url: apiHost + '/uploads/payslip_document/' + uploadedPayslip.filename
            }
            payslips.push(payslip)
        });
        this.payslips = payslips
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