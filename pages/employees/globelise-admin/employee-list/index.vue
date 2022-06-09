<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <div class="container-fluid pt-6">
          <div class="row mt-3">
            <div class="col-12">
              <span class="form-title page-header">Employees</span>
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

                          <select v-model="selectedCompany" class="form-control form-input" @change="getEmployeeList($event)">
                            <option v-for="(company, key) in companyArr" :key="company.uuid + key" :value="company.id">
                              {{ company.name }} (REGISTRATION NO.: {{ company.registrationNumber }}, COUNTRY: {{ company.country }})
                            </option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="col-2 mb-4 pr-0">
                    <button type="button" class="btn btn-lg btn-primary btn-add next-btn float-right" @click.prevent="getAllEmployeeList()">
                      <span>Clear Search</span>
                    </button>
                  </div>
                  <div class="col-12 card border pr-0 pl-0">
                    <table :key="employeeKey" class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">
                            Employee
                          </th>
                          <th scope="col">
                            Company
                          </th>
                          <th scope="col">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(employee, index) in employees" :key="index">
                          <td>
                            <span class="contract-name">{{ employee.fullName }}</span>
                          </td>
                          <td>
                            <span class="contract-name">{{ employee.company }}</span>
                          </td>
                          <td>
                            <button type="button" class="btn btn-sm btn-secondary btn-add next-btn float-left" @click.prevent="createPayslip(employee.url)">
                              <span>Create Payslip</span>
                            </button>
                          </td><td />
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
    const [employeesRawData, companiesRawData] = await Promise.all([
      context.app.$axios.get('/api/employees/?order[updatedAt]=asc&page_number=1&items_per_page=999&status=1'),
      context.app.$axios.get('/api/companies/?order[name]=asc&page_number=1&items_per_page=999&status=1')
    ])

    return {
      employeesRawData: employeesRawData.data,
      companiesRawData: companiesRawData.data
    }
  },
  data () {
    return {
      crumbs: [],
      submenu: true,
      employeeKey: 0,
      employeeSearchKey: 0,
      selectedCompany: '',
      companyArr: []
    }
  },
  created () {
    const employees = []

    this.employeesRawData.forEach(function (employeeRawData) {
      if (employeeRawData.company !== null && employeeRawData.company.name !== null && employeeRawData.isGlobeliseAdmin === false) {
        const employee = {
          fullName: employeeRawData.userProfile.firstname + ' ' + employeeRawData.userProfile.lastname,
          company: employeeRawData.company.name,
          uuid: employeeRawData.uuid,
          employeeId: employeeRawData.id,
          url: '/payslips/globelise-admin/create-payslip/' + employeeRawData.id
        }

        employees.push(employee)
      }
    })
    this.employees = employees

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
    createPayslip (url) {
      this.$router.push(url)
    },
    getEmployeeList (event) {
      this.selectedCompany = event.target.value
      this.$axios.get('/api/employees/?order[updatedAt]=asc&page_number=1&items_per_page=999&status=1&company=' + this.selectedCompany)
        .then((employeeDatas) => {
          const employees = []
          if (employeeDatas.data.length > 0) {
            employeeDatas.data.forEach(function (employeeRawData) {
              if (employeeRawData.company !== null && employeeRawData.company.name !== null && employeeRawData.isGlobeliseAdmin === false) {
                const employee = {
                  fullName: employeeRawData.userProfile.firstname + ' ' + employeeRawData.userProfile.lastname,
                  company: employeeRawData.company.name,
                  uuid: employeeRawData.uuid,
                  employeeId: employeeRawData.id,
                  url: '/payslips/globelise-admin/create-payslip/' + employeeRawData.id
                }

                employees.push(employee)
              }
            })
          }

          this.employees = employees
          console.log(this)
          this.employeeKey++
        }).catch(() => {
          return false
        })
    },
    getAllEmployeeList () {
      this.$axios.get('/api/employees/?order[updatedAt]=asc&page_number=1&items_per_page=999&status=1')
        .then((employeeDatas) => {
          const employees = []
          if (employeeDatas.data.length > 0) {
            employeeDatas.data.forEach(function (employeeRawData) {
              if (employeeRawData.company !== null && employeeRawData.company.name !== null && employeeRawData.isGlobeliseAdmin === false) {
                const employee = {
                  fullName: employeeRawData.userProfile.firstname + ' ' + employeeRawData.userProfile.lastname,
                  company: employeeRawData.company.name,
                  uuid: employeeRawData.uuid,
                  employeeId: employeeRawData.id,
                  url: '/payslips/globelise-admin/create-payslip/' + employeeRawData.id
                }

                employees.push(employee)
              }
            })
          }
          this.selectedCompany = ''
          this.employees = employees
          this.employeeKey++
          this.employeeSearchKey++
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
