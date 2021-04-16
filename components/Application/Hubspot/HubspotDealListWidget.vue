<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-9">
          <h3>Deals</h3>
        </div>
        <div class="col-3 text-right">
          <a class="btn btn-sm btn-primary pull-right" @click.prevent="openForm" href="#">Create deal</a>
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
                <span class="name mb-0 text-sm">{{ row.ownerName }} ({{ row.ownerEmail }})</span>
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
    <modal :show.sync="modals.createGroup">
      <template slot="header">
        <h5 class="modal-title">
          <span v-if="form.new">Add Company</span>
          <span v-else>Company Information</span>
        </h5>
      </template>
      <div>
        <div class="form-group">
          <input
            id="name"
            v-model="group.amount"
            type="text"
            name="number"
            class="form-control"
            placeholder="Amount"
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
            type="date"
            name="closedate"
            class="form-control"
            placeholder="Close date"
            required="required"
          >
        </div>
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="modals.createGroup = false">
          Cancel
        </base-button>
        <base-button v-if="form.new === false" type="secondary" @click.prevent="deleteGroup">
          Delete
        </base-button>
        <base-button type="primary" @click.prevent="saveGroup">
          Save
        </base-button>
      </template>
    </modal>
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
      }
    }
  },
  mounted () {
    this.$axios.get('/api/hubspot/deals')
      .then((data) => {
        console.log(data.data)
        this.deals = data.data
      })
  },
    methods: {
    async saveGroup () {
      try {
        console.log('close date = ');
        console.log(new Date(this.group.closedate));
        if(this.group.closedate) {
          const newCloseDate =  new Date(this.group.closedate).toISOString()
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
        amount: 0,
        closedate: '',
        dealname: ''
      }
    },
    openForm () {
      this.form.new = true
      this.clearForm()
      this.modals.createGroup = true
    }
  }
}
</script>

<style scoped>

</style>
