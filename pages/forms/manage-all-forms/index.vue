<template>
  <div class="row picardata-form-index">
    <transition name="slide" @after-leave="submenuAfterLeave" @after-enter="submenuAfterEnter">
      <submenu v-show="submenu" class="col-xl-2" :submenu-data="formSubmenu">
        <template v-slot:breadcrumb>
          <div class="manual-crumb">
            Forms
          </div>
        </template>
        <template v-if="submenu" v-slot:collapse>
          <i :class="['pd-icon pdicon-Collapse']" @click="submenu = false" />
        </template>
        <template v-else v-slot:expand>
          <i :class="['pd-icon pdicon-Expand']" @click="submenu = true" />
        </template>
      </submenu>
    </transition>
    <transition name="slide" @after-leave="submenuAfterLeave" @after-enter="submenuAfterEnter">
      <div v-show="submenu" class="col-xl-10">
        <div>
          <base-header type="white" class="pb-6">
            <div class="row align-items-center py-4">
              <div class="col-lg-6 col-7">
                <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                  <route-breadcrumb :crumbs="crumbs" />
                </nav>
              </div>
            </div>
          </base-header>
          <div class="container-fluid mt--6">
            <prev-page style="margin-bottom: 1.3em" />
            <div class="row">
              <div class="page-title col-12">
                Manage All Forms
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <form
                  id="navbar-search-main"
                  class="navbar-search form-inline navbar-search-light"
                >
                  <div class="form-group" style="margin-top: 4%; margin-bottom: 4%;width: 100%">
                    <div
                      class="input-group input-group-alternative input-group-merge search-button"
                      style="background: #EFF0F7;border-radius: 12px;border: none; width: 100%"
                    >
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-search" /></span>
                      </div>
                      <input
                        :id="'input-text-search-forms'"
                        v-model="search"
                        class="form-control form-search"
                        placeholder="Search created forms"
                        type="text"
                      >
                    </div>
                  </div>
                  <button
                    type="button"
                    class="close"
                    data-action="search-close"
                    data-target="#navbar-search-main"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </form>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <div class="row">
                      <div class="col-6" style="margin-left:-10px">
                        <input
                          id="check-all"
                          v-model="selectAllCheckbox"
                          :indeterminate.prop="indeterminateCheckbox"
                          type="checkbox"
                          style="margin-bottom: 2px;"
                          @click="selectAllForms()"
                        >
                        <label class="checkmark" style="margin-left:9px;margin-bottom: -9px" for="check-all" />
                        <div class="d-inline" style="margin-left: 10px; color: #313131;">
                          Select all forms
                        </div>
                      </div>
                      <div v-if="indeterminateCheckbox || selectAllCheckbox" class="col-6">
                        <div class="float-right">
                          <base-button icon type="primary btn-duplicate">
                            <span class="btn-inner--icon"><i class="pd-icon icon-Duplicate" /></span>
                            <span class="btn-inner--text">Duplicate</span>
                          </base-button>
                          <span style="opacity:0.5">|</span>
                          <base-button icon type="primary btn-remove" @click="removeSelectedForms()">
                            <span class="btn-inner--icon"><i class="pd-icon icon-Delete" /></span>
                            <span class="btn-inner--text">Remove</span>
                          </base-button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <el-table
                    class="table-responsive table-flush"
                    header-row-class-name="thead-light"
                    row-key="id"
                    :data="tableData"
                  >
                    <el-table-column
                      label=""
                      min-width="50px"
                    >
                      <template v-slot="{row}">
                        <input :id="'checbox-form-'+row.id" v-model="row.checkbox" type="checkbox">
                        <label :for="'checbox-form-'+row.id" class="checkmark" />
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="File Name"
                      min-width="220px"
                      prop="name"
                      sortable
                    >
                      <template v-slot="{row}">
                        <b :id="'text-title-form-'+row.id">{{ row.name }}</b>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Created"
                      prop="createdAt"
                      width="170px"
                      min-width="140px"
                      sortable
                    >
                      <template v-slot="{row}">
                        <b>{{ createdDateFormat(row.createdAt) }}</b>
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="Last Opened"
                      min-width="180px"
                      prop="updatedAt"
                      sortable
                    >
                      <template v-slot="{row}">
                        <b>{{ lastUpdateFormat(row.updatedAt) }}</b>
                      </template>
                    </el-table-column>

                    <el-table-column
                      min-width="120px"
                      label="Respondents"
                      prop="name"
                      sortable
                    >
                      <template v-slot="{row}">
                        <b>{{ row.formRespondents.length }}</b>
                      </template>
                    </el-table-column>

                    <el-table-column
                      min-width="120px"
                      label="Actions"
                    >
                      <template v-slot="{row}">
                        <nuxt-link :id="'button-edit-forms-'+row.id" class="font-weight-bold edit-form" :to="'/forms/' + row.id">
                          Edit Form
                        </nuxt-link>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { Table, TableColumn } from 'element-ui'
import PrevPage from '@/components/PrevPage'
import loaderMixin from '~/mixins/loader'

export default {
  layout: 'argon',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    PrevPage
  },
  mixins: [
    loaderMixin
  ],
  async fetch () {
    await this.loadDefaultData()
  },
  data () {
    return {
      allFormsSelected: false,
      search: '',
      forms: [],
      crumbs: [
        {
          name: 'Forms',
          path: '/forms'
        },
        {
          name: 'Manage All Forms',
          path: '/forms/manage-all-forms'
        }
      ],
      submenu: true,
      formSubmenu: [
        {
          name: 'Create Form',
          type: 'subtitle'
        },
        {
          link: '/forms/new',
          name: 'Create a Blank Form',
          type: 'item'
        },
        {
          name: 'Your Forms',
          type: 'subtitle'
        },
        {
          link: '/forms',
          name: 'All Forms',
          type: 'item'
        },
        {
          link: '/forms/manage-all-forms',
          name: 'Manage All Forms',
          type: 'item'
        }
      ]
    }
  },
  computed: {
    isNotDeletedForms () {
      return this.forms.filter(form => form.deleted === false).length
    },
    totalForms () {
      return this.tableData.length
    },
    selectAllCheckbox () {
      const totalChecked = this.forms.filter((form) => {
        if (form.deleted === false) { return !!form.checkbox && !form.deleted }
      }).length

      if (totalChecked === this.isNotDeletedForms && this.isNotDeletedForms !== 0) {
        return true
      } else {
        return false
      }
    },
    indeterminateCheckbox () {
      const totalChecked = this.forms.filter((form) => {
        if (form.deleted === false) { return !!form.checkbox && !form.deleted }
      }).length

      if (totalChecked > 0 && totalChecked < this.isNotDeletedForms) {
        return true
      } else {
        return false
      }
    },
    tableData () {
      return this.forms.filter((form) => {
        const rgx = new RegExp(this.search, 'i')
        if (form.deleted === false) {
          if (form.name.search(rgx) !== -1) { return form }
        }
      })
    }
  },
  methods: {
    async loadDefaultData () {
      const data = await this.$axios.$get('/api/forms/', { params: { 'order[updatedAt]': 'desc', page_number: 1, items_per_page: '999' } })

      const dataResult = data.map((form) => {
        form.checkbox = false
        form.deleted = false
        return form
      })
      this.forms = dataResult
    },
    submenuAfterLeave (el) {
      el.style.display = 'block'
      el.style.left = '-14.6em'
    },
    submenuAfterEnter (el) {
      el.style.display = 'block'
      el.style.left = '0em'
    },
    lastUpdateFormat (date) {
      return this.$moment(date).calendar()
    },
    createdDateFormat (date) {
      return this.$moment(date).format('DD MMM YYYY')
    },
    selectAllForms () {
      this.allFormsSelected = !this.selectAllCheckbox

      this.forms.map((form) => {
        form.checkbox = this.allFormsSelected
        return form
      })
    },
    async removeSelectedForms () {
      await this.forms.filter((form, index) => {
        if (form.checkbox === true) {
          this.$axios.$delete('/api/forms/' + form.id)
          this.forms[index].deleted = true
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.float-right {
  margin-top: -0.625em;
  margin-bottom: -0.625em
}

.pd-icon {
  font-size: 24px;
}

.col-6 {
  padding-top: 0.9375em;
}

.checkmark {
  display:inline-block;
  border: 1px solid black;
  border-radius: 3px;
  width: 30px;
  height:30px;
  margin-bottom: -2px;
  cursor: pointer;
}

input[type="checkbox"] { display: none; }

.checkmark:before {
  content: '';
  position: absolute;
  background-color:transparent;
  left:31px;
  top:17px;
}

input[type="checkbox"]:checked + .checkmark:before,
input[type="checkbox"]:checked + .checkmark:after {
  width:10px;
  height:18px;
  background-color:transparent;
  border-right: 2px solid #2534B6;
  border-bottom: 2px solid #2534B6;
  left:34px;
  top:19px;
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

input[type="checkbox"]:indeterminate + .checkmark:before,
input[type="checkbox"]:indeterminate + .checkmark:after {
  width:20px;
  height:2px;
  background-color:transparent;
  border-bottom: 2px solid #2534B6;
  left:28.5px;
  top:30px;
}

b {
  font-size: 16px;
}

.edit-form {
  text-decoration: underline;
  font-size: 16px;
  color: #2534B6;
}

.form-search::placeholder {
  color: #A0A3BD;
  font-size: 16px;
}

i {
  margin-right: 15px;
}

.btn-inner--icon {
  margin-right: -20px;
  margin-left: -10px;
}

.btn-card {
  font-size: 16px;
  font-weight: 600;
  margin-right: 14px;
  margin-left: 14px;
  display: inline-block;
}

.btn-duplicate {
  color: #2534B6;
  background-color: transparent;
  border: none;
  box-shadow: none;
  margin-right: -5px;
}

.btn-remove {
  color: #8B8B8D;
  background-color: transparent;
  border: none;
  box-shadow: none;
  margin-right: -5px;
}

.card, .card-header {
  border-bottom: none!important;
  box-shadow: none!important;
}

/deep/tr.el-table__row {
  border: 1px solid #E0E0E0!important;
  border-radius: 5px!important;

}

/deep/.thead-light > th {
  color: #313131;
  opacity: 0.4;
  font-style: Poppins;
  font-weight: 600;
  font-size: 16px;
  background-color: white;
  text-transform: capitalize;
}

/deep/.caret-wrapper {
  display: none;
}

/deep/thead th {
  border: 0px;
  .cell {
    min-height: 64px!important;
  }
}

.page-title {
  font-weight: 700;
  font-size: 36px;
  color: #313131;
}

.slide-enter-active {
  animation: slide .2s reverse;
}

.slide-leave-active {
  animation: slide .2s;
}

@keyframes slide {
  from { left: 0em; }
  to { left: -14.6em; }
}

.manual-crumb {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  letter-spacing: 1px;
  color: #14142B;
}

.picardata-arrow {
  color: #14142B;
  font-size: 200%;
}

.search-box {
  height: 62px;
  border-radius: 16px;
  background-color: #EFF0F6;
  padding-left: 0px;
}
</style>
