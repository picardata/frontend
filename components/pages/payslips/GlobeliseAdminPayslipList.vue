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
              <th class="contract-amount-wrapper" scope="col">Action</th>

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
              <td>
                <button :id="'payslip-' + index" class="btn btn-gray-light delete-payslip-btn" @click="deletePayslip(payslip)">
                  <span class="share-open">Delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
      payslips: []
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
              url: apiHost + '/uploads/payslip_document/' + uploadedPayslip.filename,
              uuid: uploadedPayslip.uuid,
              employeeId: uploadedPayslip.employee.id,
              companyId: uploadedPayslip.company.id
          }

          payslips.push(payslip)
      });
      this.payslips = payslips
  },
  methods: {
      deletePayslip (payslip, index) {
          this.$axios.$patch('/api/payslip/' + payslip.uuid,
              {
                  status: 0,
                  name: payslip.name,
                  employee: payslip.employeeId,
                  company: payslip.companyId,
                  type: 'Upload'
              },
          ).then((data) => {
              this.uploadedPayslips.splice(index, 1)
          }).catch(() => {
              return false
          })
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