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
                        class="form-control app-search"
                        placeholder="Search created forms"
                        type="text"
                        v-model="search"
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
                <div v-if="totalForms > 0" class="card">
                  <div class="card-header">
                    <div class="row">
                      <div class="col-6">
                        <input
                          id="check-all"
                          v-model="selectAllCheckbox"
                          :indeterminate.prop="indeterminateCheckbox"
                          type="checkbox"
                          class="form-checkbox d-inline"
                          @click="selectAllForms()"
                        >
                        <label class="d-inline" for="check-all">Select all forms</label>
                      </div>
                      <div class="col-6">
                        <div class="float-right">
                          <div class="btn-card btn-duplicate d-inline">
                            <i class="pd-icon icon-Duplicate" />Duplicate
                          </div>
                          <span style="opacity: 0.4">|</span>
                          <div class="btn-card btn-remove d-inline" @click="removeSelectedForms()">
                            <i class="pd-icon icon-Delete" />Remove
                          </div>
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
                      min-width="40px"
                    >
                      <template v-slot="{row}">
                        <input v-model="row.checkbox" type="checkbox" class="form-checkbox">
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
                        <nuxt-link :id="'button-edit-forms-'+row.id" class="font-weight-bold" :to="'/forms/' + row.id">
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
    totalForms () {
      return this.tableData.length
    },
    selectAllCheckbox () {
      const totalChecked = this.forms.filter((form) => {
        return !!form.checkbox && !form.deleted
      }).length

      if (totalChecked === this.totalForms) {
        return true
      } else {
        return false
      }
    },
    indeterminateCheckbox () {
      const totalChecked = this.forms.filter((form) => {
        return !!form.checkbox && !form.deleted
      }).length

      if (totalChecked > 0 && totalChecked < this.totalForms) {
        return true
      } else {
        return false
      }
    },
    tableData () {
      return this.forms.filter((form) => {
        const rgx = new RegExp(this.search, 'i')
        if(form.deleted === false) {
          if(form.name.search(rgx) !== -1) 
            return form
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
i {
  margin-right: 15px;
}

.btn-card {
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
  margin-left: 8px;
}

.btn-duplicate {
  color: #2534B6;
  cursor: pointer;
}

.btn-remove {
  color: #8B8B8D;
  cursor: pointer;
}

.card, .card-header {
  border-bottom: none!important;
  box-shadow: none!important;
}

.form-checkbox {
  width: 16px;
  height: 16px;
  font-size: 16px;
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  line-height: 1;
  vertical-align: middle;
}

/deep/tr.el-table__row {
  border: 1px solid #E0E0E0!important;
  border-radius: 5px!important;
}

/deep/.thead-light > th {
  color: #8B8B8D;
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
