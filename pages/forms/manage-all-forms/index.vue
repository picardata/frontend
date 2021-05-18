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
                        class="form-control app-search"
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
                <checkbox-table>
                  <template v-slot:table-header>
                    <div />
                  </template>
                  <template v-slot:table>
                    <el-table
                      class="table-responsive table-flush"
                      header-row-class-name="thead-light"
                      row-key="id"
                      :data="forms"
                    >
                      <el-table-column
                        type="selection"
                        align="left"
                        min-width="120px"
                      />

                      <el-table-column
                        label="File Name"
                        min-width="220px"
                        prop="name"
                        sortable
                      >
                        <template v-slot="{row}">
                          <b>{{ row.name }}</b>
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
                        align="center"
                      >
                        <template v-slot="{row}">
                          <b>{{ row.formRespondents.length }}</b>
                        </template>
                      </el-table-column>

                      <el-table-column
                        min-width="120px"
                        label="Action"
                        prop=""
                        sortable
                        align="center"
                      >
                        <template v-slot="{row}">
                          <nuxt-link class="font-weight-bold" :to="'/forms/' + row.id">
                            Edit Form
                          </nuxt-link>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </checkbox-table>
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
import CheckboxTable from '~/components/tables/RegularTables/CheckboxTable'
import loaderMixin from '~/mixins/loader'

export default {
  layout: 'argon',
  components: {
    CheckboxTable,
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
      users: [
        {
          id: 1,
          name: 'Nungguin Ya',
          image: 'img/theme/team-1.jpg',
          createdAt: '10/09/2018',
          product: 'Argon Dashboard PRO',
          active: true
        },
        {
          id: 2,
          name: 'Nungguin Ya',
          image: 'img/theme/team-2.jpg',
          createdAt: '08/09/2018',
          product: 'Argon Design System',
          active: false
        },
        {
          id: 3,
          name: 'Nungguin Ya',
          image: 'img/theme/team-3.jpg',
          createdAt: '30/08/2018',
          product: 'Black Dashboard',
          active: false
        },
        {
          id: 4,
          name: 'Nungguin Ya',
          image: 'img/theme/team-1.jpg',
          createdAt: '10/09/2018',
          product: 'Argon Dashboard PRO',
          active: true
        },
        {
          id: 5,
          name: 'Nungguin Ya',
          image: 'img/theme/team-2.jpg',
          createdAt: '30/09/2018',
          product: 'Vue Argon Dashboard',
          active: true
        }
      ],
      forms: [],
      crumbs: [
        {
          name: 'Forms',
          path: '/forms'
        },
        {
          name: 'Manage All Forms',
          path: '/forms'
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
          link: '/manage-all-forms',
          name: 'Manage All Forms',
          type: 'item'
        }
      ]
    }
  },
  methods: {
    async loadDefaultData () {
      const data = await this.$axios.$get('/api/forms/', { params: { 'order[updatedAt]': 'desc', page_number: 1, items_per_page: '999' } })

      const dataResult = data
      this.forms = dataResult
      console.log(this.forms)
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
    }
  }
}
</script>
<style scoped>
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
