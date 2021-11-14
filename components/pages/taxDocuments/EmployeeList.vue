<template>
  <div>
    <div class="row">
      <div class="col-12">
        <form
          id="navbar-search-main"
          class="navbar-search form-inline navbar-search-light"
          >
            <div class="form-group" style="width: 100%">
              <div class="input-group input-group-alternative company-search-bar">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-search" /></span>
                </div>

                <select v-model="selectedCompany" class="form-control form-input" @change="getEmployeeList($event)">
                  <option v-if="company.name !== null" v-for="(company, key) in companies" :key="company.uuid + key" :value="company.id">
                    {{ company.name }} (REGISTRATION NO.: {{ company.registrationNumber}}, COUNTRY: {{ company.country}})
                  </option>
                </select>
              </div>
            </div>
        </form>
      </div>
      <div class="col-12 mt-4">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Company ID</th>
              <th scope="col">Name</th>
              <th scope="col">Employee ID</th>
              <th scope="col">Tax Document filename format</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employee, index) in employeeList" :key="index">
              <td>
                <span class="contract-name">{{ employee.companyId }}</span>
              </td>
              <td>
                <span class="contract-name">{{ employee.name }}</span>
              </td>
              <td>
                <span class="contract-name">{{ employee.employeeId }}</span>
              </td>

              <td>
                <span class="contract-name">{{ employee.filename }}</span>
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
  name: "EmployeeList",
  props: [
    'companies'
  ],
  data () {
    return {
      selectedCompany: '',
      employeeList: [],
      totalPage: 1,
      currentPage: 1,
    }
  },
  methods: {
      getEmployeeList(event) {
        let employees = []
        this.selectedCompany = event.target.value
        this.$axios.get('/api/employees/?order[id]=asc&page_number=1&items_per_page=999&status=1&company=' + this.selectedCompany)
          .then((employeeDatas) => {
            let employees = []
            if (employeeDatas.data.length > 0) {
              employeeDatas.data.forEach(function (employeeData) {
                const employee = {
                    name: employeeData.userProfile.firstname,
                    filename: employeeData.company.id + '_' + employeeData.id + '_tax-document-name.pdf',
                    employeeId: employeeData.id,
                    uuid: employeeData.uuid,
                    companyId: employeeData.company.id
                }
                console.log(employee)
                employees.push(employee)
              })
            }


            this.employeeList = employees
            console.log(this)
          }).catch(() => {
            return false
          })
        console.log(this)
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
.company-search-bar {
  background: #EFF0F7;
  border-radius: 0px;
  border: none;
  width: 100%;

  select {
    margin-right: 10px;
  }
}
table{
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
</style>