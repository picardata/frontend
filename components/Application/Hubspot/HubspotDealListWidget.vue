<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-9">
          <h3>Deals</h3>
        </div>
        <div class="col-3 text-right">
          <a class="btn btn-sm btn-primary pull-right" href="#" @click.prevent="openForm">Create deal</a>
        </div>
      </div>
    </div>
    <div class="card-body">
      <el-table
        class="table-responsive table-flush"
        header-row-class-name="thead-light"
        :data="deals"
      >
        <el-table-column
          label="Deal name"
          min-width="150px"
          prop="dealName"
          sortable
        >
          <template v-slot="{row}">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="font-weight-600 name mb-0 text-sm">{{ row.dealName }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Deal stage"
          prop="dealStageDisplay"
          min-width="140px"
          sortable
        >
          <template v-slot="{row}">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ row.dealStageDisplay }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Deal owner"
          min-width="250px"
          prop="ownerName"
          sortable
        >
          <template v-slot="{row}">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ createOwnerName(row) }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Last Modified Date"
          min-width="200px"
          prop="lastModifiedDate"
          sortable
        >
          <template v-slot="{row}">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ $moment(row.lastModifiedDate).calendar() }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Amount"
          prop="amount"
          min-width="100px"
          sortable
        >
          <template v-slot="{row}">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ row.amount }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Actions"
        >
          <template v-slot="{ row }">
            <div class="media align-items-center">
              <div class="media-body">
                <a :href="row.url" class="btn btn-sm btn-secondary" target="_blank">View</a>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <AddModal :modals="modals" :close-form="closeForm" :form="form" :href="href" :save-group="saveGroup">
      <template slot="first-title">
        Deal
      </template>
      <template slot="content">
        <div class="form-group">
          <input
            id="amount"
            v-model="group.amount"
            type="text"
            onfocus="(this.type='number')"
            onfocusout="(this.type='text')"
            name="amount"
            class="form-control"
            placeholder="Deal Amount"
            required="required"
          >
        </div>
        <div class="form-group">
          <input
            id="deal"
            v-model="group.dealname"
            type="text"
            name="deal"
            class="form-control"
            placeholder="Deal name"
            required="required"
          >
        </div>
        <div class="form-group">
          <input
            id="closedate"
            v-model="group.closedate"
            type="text"
            onfocus="(this.type='date')"
            onfocusout="(this.type='text')"
            name="closedate"
            class="form-control"
            placeholder="Close date, format: mm/dd/yyyy"
            required="required"
          >
        </div>
      </template>
    </AddModal>
  </div>
</template>

<script>
import { Table, TableColumn } from 'element-ui'

export default {
  name: 'HubspotDealListWidget',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data () {
    return {
      deals: [],
      groups: [],
      modals: {
        createGroup: false,
        addUser: false
      },
      form: {
        new: true
      },
      groupUsers: {},
      group: {
        index: 0,
        amount: '',
        dealname: '',
        closedate: ''
      },
      href: '/apps/integrated-apps'
    }
  },
  mounted () {
    this.$axios.get('/api/hubspot/deals')
      .then((data) => {
        this.deals = data.data.deals
      })
  },
  methods: {
    createOwnerName (owner) {
      if (owner.ownerName && owner.ownerEmail) {
        return `${owner.ownerName} ( ${owner.ownerEmail} )`
      } else if (owner.ownerName) {
        return owner.ownerName
      } else if (owner.ownerEmail) {
        return owner.ownerEmail
      } else {
        return ''
      }
    },
    async saveGroup () {
      try {
        if (this.group.closedate && this.group.amount && this.group.dealname) {
          const newCloseDate = new Date(this.group.closedate).toISOString()
          const data = await this.$axios.$post('/api/hubspot/deals', {
            amount: this.group.amount,
            closedate: newCloseDate,
            dealname: this.group.dealname
          })

          this.modals.createGroup = false
          this.groups.push(
            {
              amount: data.amount,
              closedate: data.closedate,
              dealname: data.dealname
            }
          )
          window.open(data.url, '_blank').focus()
          this.clearForm()
        }
      } catch (e) {
        console.log('Failed')
      }
    },
    clearForm () {
      this.group = {
        index: 0,
        amount: '',
        closedate: '',
        dealname: ''
      }
    },
    openForm () {
      this.form.new = true
      this.clearForm()
      this.modals.createGroup = true
    },
    closeForm () {
      this.form.new = false
      // this.clearForm()
      this.modals.createGroup = false
    }
  }
}
</script>

<style scoped>

</style>
