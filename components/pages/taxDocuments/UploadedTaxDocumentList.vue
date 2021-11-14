<template>
  <div>
    <div class="row mt-3">
      <div class="col-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Employee</th>
              <th class="contract-amount-wrapper" scope="col">Filename</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(uploadedTaxDocument, index) in uploadedTaxDocuments" :key="index">
              <td>
                <span class="contract-name">{{ uploadedTaxDocument.name }}</span>
              </td>
              <td>
                <span class="contract-name">{{ uploadedTaxDocument.employee }}</span>
              </td>
              <td class="contract-amount-wrapper">
                <a :href="`${uploadedTaxDocument.url}`" target="_blank">
                  <span class="contract-name">{{ uploadedTaxDocument.filename }}</span>
                </a>
              </td>
              <td>
                <button :id="'tax-document-' + index" class="btn btn-gray-light delete-payslip-btn" @click="deleteTaxDocument(uploadedTaxDocument, index)">
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
  name: "TaxDocumentList",
  props: [
    'uploadedTaxDocuments'
  ],
  data () {
    return {
      totalPage: 1,
      currentPage: 1,
    }
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
    },
      deleteTaxDocument (taxDocument, index) {
          this.$axios.$patch('/api/tax/document/' + taxDocument.uuid,
              {
                  status: 0,
                  name: taxDocument.name,
                  employee: taxDocument.employeeId,
                  company: taxDocument.companyId,
                  type: 'Upload'
              },
          ).then((data) => {
              this.uploadedTaxDocuments.splice(index, 1)
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