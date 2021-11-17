<template>
  <div>
    <div class="row">
      <div class="col-6">
        <h1>Invoice List</h1>
      </div>
      <div class="col-6">
        <button class="btn btn-lg btn-outline-primary btn-round float-right">
          Download All PDF Invoices
        </button>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(invoice, index) in invoices" :key="index + invoice.date">
              <td>Invoice {{ invoice.date }}</td>
              <td>
                <span v-if="invoice.type === 'paid'" class="badge badge-paid">{{ invoice.type }}</span>
                <span v-else-if="invoice.type === 'posted'" class="badge badge-posted">{{ invoice.type }}</span>
              </td>
              <td><a href="#">Download PDF</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InvoiceList",
  data () {
    return {
      invoices: [],
      invoicesPage1: [
        {
          date: '2021-05',
          type: 'posted',
        },
        {
          date: '2021-05',
          type: 'paid',
        },
        {
          date: '2021-05',
          type: 'posted',
        },
        {
          date: '2021-05',
          type: 'paid',
        },
        {
          date: '2021-05',
          type: 'posted',
        },
        {
          date: '2021-05',
          type: 'paid',
        },
        {
          date: '2021-05',
          type: 'posted',
        },
        {
          date: '2021-05',
          type: 'paid',
        },
        {
          date: '2021-05',
          type: 'posted',
        },
        {
          date: '2021-05',
          type: 'paid',
        }
      ],
      invoicesPage2: [
        {
          date: '2021-05',
          type: 'paid',
        },
        {
          date: '2021-05',
          type: 'posted',
        }
      ],
      totalPage: 2,
      currentPage: 1,
    }
  },
  created() {
    this.invoices = this.invoicesPage1
  },
  methods: {
    setCurrentPage (currentPage) {
      if (currentPage > 0 && currentPage <= this.totalPage) {
        this.currentPage = currentPage

        if (currentPage === 1) {
          this.invoices = this.invoicesPage1
        } else {
          this.invoices = this.invoicesPage2
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
.btn-round {
  height: 56px;
  border-radius: 40px;
  font-weight: normal;
  font-size: 14px;
  padding: 10px 14px;
  color: #3E4EDD;
}

.btn-outline-primary{
  color: #3E4EDD;

  &:hover{
    color: #FFFFFF;
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