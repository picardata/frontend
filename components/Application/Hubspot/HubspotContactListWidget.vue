<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-9">
          <h3>Contacts</h3>
        </div>
        <div class="col-3 text-right">
          <a class="btn btn-sm btn-primary pull-right" target="_blank" href="#">Create contact</a>
        </div>
      </div>
    </div>
    <div class="card-body">
      <el-table
        class="table-responsive table-flush"
        header-row-class-name="thead-light"
        :data="contacts"
      >
        <el-table-column
          label="Name"
          min-width="310px"
          prop="firstname"
          sortable
        >
          <template v-slot="{row}">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="font-weight-600 name mb-0 text-sm">{{ row.firstname }} {{ row.lastname }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Email"
          prop="email"
          min-width="200px"
          sortable
        />
        <el-table-column
          label="Lead Status"
          prop="leadStatus"
          min-width="140px"
          sortable
        >
          <template v-slot="{row}">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="font-weight-600 name mb-0 text-sm text-capitalize">{{ row.leadStatus }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Created Date"
          min-width="250px"
          prop="createDate"
          sortable
        >
          <template v-slot="{row}">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="font-weight-600 name mb-0 text-sm">{{ $moment(row.createDate).calendar() }}</span>
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
  </div>
</template>

<script>
import { Table, TableColumn } from 'element-ui'

export default {
  name: 'HubspotContactListWidget',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data () {
    return {
      contacts: []
    }
  },
  mounted () {
    this.$axios.get('/api/hubspot/contacts')
      .then((data) => {
        console.log(data.data.contacts)
        this.contacts = data.data.contacts
      })
  }
}
</script>

<style scoped>

</style>
