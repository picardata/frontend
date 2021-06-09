<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-9">
          <h3>Companies</h3>
        </div>
        <div class="col-3 text-right">
          <a class="btn btn-sm btn-primary pull-right" href="#" @click.prevent="openForm">Create company</a>
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
    <AddModal :modals="modals" :close-form="closeForm" :form="form" :save-group="saveGroup">
      <template slot="first-title">
        Company
      </template>
      <template slot="content">
        <div class="form-group">
          <input
            id="name"
            v-model="group.name"
            type="text"
            name="name"
            class="form-control"
            placeholder="Company Name"
            required="required"
          >
        </div>
        <div class="form-group">
          <input
            id="domain"
            v-model="group.domain"
            type="url"
            name="domain"
            class="form-control"
            placeholder="Domain, ex: test.com"
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
  name: 'HubspotCompanyListWidget',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data () {
    return {
      companies: [],
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
        name: '',
        domain: ''
      }
    }
  },
  mounted () {
    this.$axios.get('/api/hubspot/companies')
      .then((data) => {
        this.companies = data.data.companies
        // this.modals.createGroup = false;
      })
  },
  methods: {
    async saveGroup () {
      try {
        const data = await this.$axios.$post('/api/hubspot/companies', {
          name: this.group.name,
          domain: this.group.domain
        })

        this.modals.createGroup = false
        this.companies.push(
          {
            name: data.name,
            domain: data.domain
          }
        )
        window.open(data.url, '_blank').focus()
        this.clearForm()
      } catch (e) {
        console.log('Failed')
      }
    },
    clearForm () {
      this.group = {
        index: 0,
        name: '',
        domain: ''
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
