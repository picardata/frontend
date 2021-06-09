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

    <AddModal :modals="modals" :close-form="closeForm" :form="form" :save-group="saveGroup" :disableButton="disabledButtonSave">
      <template slot="first-title">
        Contact
      </template>
      <template slot="content">
        <ValidationObserver ref="observer" @keyup="onFormChange">
          <ValidationProvider v-slot="{ errors }" mode="lazy" rules="required|email" name="email">
            <div class="form-group">
              <input
                id="email"
                v-model="group.email"
                type="email"
                name="email"
                class="form-control"
                placeholder="Email"
              >
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" mode="lazy" rules="required" name="firstname">
            <div class="form-group">
              <input
                id="firstname"
                v-model="group.firstname"
                type="text"
                name="firstname"
                class="form-control"
                placeholder="Firstname"
              >
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" mode="lazy" rules="required" name="lastname">
            <div class="form-group">
              <input
                id="lastname"
                v-model="group.lastname"
                type="text"
                name="lastname"
                class="form-control"
                placeholder="Lastname"
              >
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" mode="lazy" rules="required" name="phone">
            <div class="form-group">
              <input
                id="phone"
                v-model="group.phone"
                type="text"
                name="phone"
                class="form-control"
                placeholder="Phone"
              >
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </ValidationObserver>
      </template>
    </AddModal>
  </div>
</template>

<script>
import { Table, TableColumn } from 'element-ui'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
// import AddModal from '../../Custom/AddModal';
export default {
  name: 'HubspotContactListWidget',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      contacts: [],
      modals: {
        createGroup: false
      },
      form: {
        new: true
      },
      group: {
        index: 0,
        email: '',
        firstname: '',
        lastname: '',
        phone: ''
      },
      disabledButtonSave: true
    }
  },
  computed: {
    generateParentPath () {
      const currentPath = this.$route.path.split('/')
      currentPath.pop()
      return '/apps/integrated-apps'
    }
  },
  mounted () {
    this.$axios.get('/api/hubspot/contacts')
      .then((data) => {
        this.contacts = data.data.contacts
      })
  },
  methods: {
    async saveGroup () {
      try {
        if (this.group.email &&
           this.group.firstname &&
           this.group.lastname &&
           this.group.phone) {
          const data = await this.$axios.$post('/api/hubspot/contacts', {
            email: this.group.email,
            firstname: this.group.firstname,
            lastname: this.group.lastname,
            phone: this.group.phone
          })

          this.modals.createGroup = false
          this.contacts.push(
            {
              email: data.email,
              firstname: data.firstname,
              lastname: data.lastname,
              phone: data.phone
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
        email: '',
        firstname: '',
        lastname: '',
        phone: ''
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
    },
    async onFormChange () {
      let isComplete = true
      for (const name in this.group) {
        if (!this.group[name] && name !== 'index') {
          isComplete = false
        }
      }

      if (!isComplete) {
        return
      }

      const valid = await this.$refs.observer.validate()
      if (valid) {
        this.disabledButtonSave = false
      } else {
        this.disabledButtonSave = true
      }
    }
  }
}
</script>
