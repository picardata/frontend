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
      :data="integrations"
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
    <Paging 
      style="margin-top: 2%"
      :isLastForNext="isLastForNext" 
      :setNext="setNext" 
      :isCurrentPage="isCurrentPage" 
      :getTotalPage="getTotalPage" 
      :isLastForPrev="isLastForPrev"
      :setPrevious="setPrevious"
      :setCurrentPage="setCurrentPage" />
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
    const dataResult = await this.$axios.$get('/api/facebook/page-posts')
      // .then((data) => {
        dataResult.map((v) => {
          v.formattedDate = moment(v.created_time.date).format('DD/MM/YYYY')
        })
        this.posts = dataResult
        console.log(dataResult)
      // })

        this.totalIntegrations = dataResult
        this.integrations = dataResult
        // this.totalPage = 5;
        this.totalPage = Math.ceil(this.totalIntegrations.length / this.size)
        this.setCurrentPage(1)
    // const data =  await this.$axios.get('/api/integrations/?order%5Bid%5D=desc')
    //   // eslint-disable-next-line no-return-assign
    //   // .then((data) => {
    //     console.log(data)
    //     this.totalIntegrations = data.data.filter(x => x.status === 1)
    //     console.log('total integration = ')

    //     this.integrations = [...this.totalIntegrations]
    //     // this.totalPage = 5;
    //     this.totalPage = Math.ceil(this.totalIntegrations.length / 5)
    //     this.setCurrentPage(1)
      // }).catch(
      // // eslint-disable-next-line no-console
      //   (e) => {
      //     console.log(e)
      //   }
      // )
  },
  data () {
    return {
      currentPage: 1,
      posts: [],
      totalPage: 1,
      currentPage: 1,
      size: 10,
      totalIntegrations: [],
      integrations: []
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
    },


    isCurrentPage (n) {
      // return this.$emit('isCurrentPage', n)

      return this.currentPage === n
    },

    setCurrentPage (currentPage) {
      // this.$emit('setCurrentPage', currentPage)
      if (currentPage > 0 && currentPage <= this.totalPage) {
        console.log('current page = ')
        console.log(currentPage)
        this.currentPage = currentPage

        // const newIntegrations = this.integrations;
        const startIndex = ((this.currentPage * this.size) - this.size)
        const finishIndex = this.currentPage * this.size

        console.log('start index = ')
        console.log(startIndex)

        console.log('finish index = ')
        console.log(finishIndex)

        // console.log('start form = ');
        // console.log(startForm);

        // console.log('size = ');
        // console.log(size);

        const newIntegrations = []
        for (let i = startIndex; i < finishIndex; i++) {
          if (typeof this.totalIntegrations[i] !== 'undefined') {
            newIntegrations.push(this.totalIntegrations[i])
          }
        }

        console.log('new integrations = ')
        console.log(newIntegrations)

        this.integrations = newIntegrations
        // this.setIntegration(newIntegrations);
      }
    },

    setNext () {
      // this.$emit('setNext')
      this.setCurrentPage(this.currentPage + 1)
    },

    isLastForPrev () {
      // console.log('current page = ');
      // console.log(n);
      // return this.$emit('isLastForPrev')
      return this.currentPage === 1
    },

    isLastForNext () {
      // return this.$emit('isLastForNext')
      return this.currentPage === this.totalPage
    },

    setPrevious () {
      // this.$emit('setPrevious')
      this.setCurrentPage(this.currentPage - 1)
    },

    getTotalPage() {
      // return this.$emit('getTotalPage')
      return this.totalPage
    }
  }
}
</script>
