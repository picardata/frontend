<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-9">
          <h3>Companies</h3>
        </div>
        <div class="col-3 text-right">
          <a class="btn btn-sm btn-primary pull-right" target="_blank" href="#">Create company</a>
        </div>
      </div>
    </div>
    <div class="card-body">
      <el-table
        class="table-responsive table-flush"
        header-row-class-name="thead-light"
        :data="companies"
      >
        <el-table-column
          label="Name"
          min-width="250px"
          prop="firstname"
          sortable
        >
          <template v-slot="{row}">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="font-weight-600 name mb-0 text-sm">{{ row.name }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Phone"
          prop="phone"
          min-width="140px"
          sortable
        >
          <template v-slot="{row}">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ row.phone }}</span>
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
                <span class="name mb-0 text-sm">{{ $moment(row.createDate).calendar() }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Last Modified Date"
          min-width="250px"
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
          label="City"
          prop="city"
          min-width="200px"
          sortable
        />
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
  name: 'HubspotCompanyListWidget',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data () {
    return {
      companies: []
    }
  },
  mounted () {
    this.$axios.get('/api/hubspot/companies')
      .then((data) => {
        console.log(data.data.companies)
        this.companies = data.data.companies
      })
  }
}
</script>

<style scoped>

</style>
