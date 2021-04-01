<template>
  <div class="card">
    <div class="border-0 card-header">
      <h3 class="d-inline mb-0">
        Posts
      </h3>
      <button class="btn btn-default d-inline float-right">
        Create Post
      </button>
    </div>

    <el-table
      class="table-responsive table-flush"
      header-row-class-name="thead-light"
      :data="posts"
    >
      <el-table-column
        label="Date"
        min-width="40px"
        prop="formattedDate"
        sortable
      >
        <template v-slot="{row}">
          <div class="media align-items-center">
            <span class="font-weight-600 name mb-0 text-sm">{{ row.formattedDate }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Type"
        min-width="40px"
        prop="type"
        sortable
      >
        <template v-slot="{row}">
          <div class="media align-items-center">
            <font-awesome-icon :icon="['fas', icon(row.status_type)]" />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Post"
        min-width="310px"
        prop="post"
        sortable
      >
        <template v-slot="{row}">
          <div v-if="row.status_type === 'added_photos' || row.status_type === 'added_video'" class="media align-items-center">
            <div class="avatar square mr-3">
              <img alt="Image placeholder" :src="row.picture">
            </div>
            <div class="media-body">
              <span class="font-weight-600 name mb-0 text-sm">
                <a :href="'https://www.facebook.com/' + row.id" target="_blank">{{ !row.message ? row.story : row.message }}</a>
              </span>
            </div>
          </div>
          <span v-else class="font-weight-600 name mb-0 text-sm">
            <a :href="'https://www.facebook.com/' + row.id" target="_blank">{{ row.message }}</a>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="Promote"
        min-width="60px"
        prop="promote"
        sortable
      >
        <template>
          <button class="btn btn-md btn-default d-inline">
            Boost Post
          </button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown } from 'element-ui'
import moment from 'moment'

export default {
  name: 'PostList',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu
  },
  async fetch () {
    await this.$axios.$get('/api/facebook/page-posts')
      .then((data) => {
        data.map((v) => {
          v.formattedDate = moment(v.created_time.date).format('DD/MM/YYYY')
        })
        this.posts = data
        console.log(data)
      })
  },
  data () {
    return {
      currentPage: 1,
      posts: []
    }
  },
  methods: {
    icon (type) {
      const icons = [
        {
          type: 'status',
          icon: 'clone'
        },
        {
          type: 'photo',
          icon: 'image'
        },
        {
          type: 'video',
          icon: 'video'
        }
      ]

      return icons.filter((v) => {
        if (type.search(v.type) > 0) {
          return v
        }
      })[0].icon
    }
  }
}
</script>
