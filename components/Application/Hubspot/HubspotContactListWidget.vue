<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-9">
          <h3>Contacts</h3>
        </div>
        <div class="col-3 text-right">
          <a class="btn btn-sm btn-primary pull-right" href="#" @click.prevent="openForm">Create contact</a>
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
    <modal :show.sync="modals.createGroup" class="picardata-std-modal">
      <template slot="close-button">
        <div class="close-button" v-on:click="closeForm"><span class="pd-icon pdicon-Cross"></span></div>
      </template>
      <template slot="header">
        <div>
          <div class="row"> 
            <div class="col-md-12">
              <a class="pd-icon pdicon-Back-Arrow back-arrow" :href="generateParentPath" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <h5 class="parent-title">
                <div v-if="form.new"><span class="first-title">Adding Contact for </span><span class="second-title">Hubspot</span></div>
                <div v-else>Contact Information</div>
              </h5>
            </div>
          </div>
        </div>
      </template>
      <div class="picardata-std-form-input">
        <div class="form-group">
          <input
            id="company"
            v-model="group.company"
            type="text"
            name="company"
            class="form-control"
            placeholder="Company Name"
            required="required"
          >
        </div>
        <div class="form-group">
          <input
            id="email"
            v-model="group.email"
            type="email"
            name="email"
            class="form-control"
            placeholder="Email"
            required="required"
          >
        </div>
        <div class="form-group">
          <input
            id="firstname"
            v-model="group.firstname"
            type="firstname"
            name="firstname"
            class="form-control"
            placeholder="Firstname"
            required="required"
          >
        </div>
        <div class="form-group">
          <input
            id="lastname"
            v-model="group.lastname"
            type="lastname"
            name="lastname"
            class="form-control"
            placeholder="Lastname"
            required="required"
          >
        </div>
        <div class="form-group">
          <input
            id="phone"
            v-model="group.phone"
            type="phone"
            name="phone"
            class="form-control"
            placeholder="Phone"
            required="required"
          >
        </div>
        <div class="form-group">
          <input
            id="website"
            v-model="group.website"
            type="website"
            name="website"
            class="form-control"
            placeholder="Website, ex: test.com"
            required="required"
          >
        </div>
      </div>
      <template slot="footer">
        <!-- <base-button type="secondary" @click="modals.createGroup = false">
          Cancel
        </base-button> -->
        <base-button v-if="form.new === false" type="secondary" @click.prevent="deleteGroup">
          Delete
        </base-button>
        <base-button type="primary" @click.prevent="saveGroup">
          Finish adding data
        </base-button>
      </template>
    </modal>
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
      contacts: [],
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
        company: '',
        email: '',
        firstname: '',
        lastname: '',
        phone: '',
        website: ''
      }
    }
  },
  mounted () {
    this.$axios.get('/api/hubspot/contacts')
      .then((data) => {
        console.log(data.data.contacts)
        this.contacts = data.data.contacts
      })
  },
  methods: {
    async saveGroup () {
      try {
        if (this.group.company &&
           this.group.email &&
           this.group.firstname &&
           this.group.lastname &&
           this.group.phone &&
           this.group.website) {
          const data = await this.$axios.$post('/api/hubspot/contacts', {
            company: this.group.company,
            email: this.group.email,
            firstname: this.group.firstname,
            lastname: this.group.lastname,
            phone: this.group.phone,
            website: this.group.website
          })

          this.modals.createGroup = false
          this.groups.push(
            {
              company: data.company,
              email: data.email,
              firstname: data.firstname,
              lastname: data.lastname,
              phone: data.phone,
              website: data.website
            })
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
        company: '',
        email: '',
        firstname: '',
        lastname: '',
        phone: '',
        website: ''
      }
    },
    openForm () {
      this.form.new = true
      this.clearForm()
      this.modals.createGroup = true
    },
    closeForm() {
      this.form.new = false
      // this.clearForm()
      this.modals.createGroup = false
    }
  },
  computed: {
    generateParentPath () {
      const currentPath = this.$route.path.split('/')
      currentPath.pop()
      console.log('parent path = ')
      console.log(currentPath)
      const newPath = currentPath.join('/')
      console.log('new path = ')
      console.log(newPath)
      return '/apps/integrated-apps'
    }
  }
}
</script>
