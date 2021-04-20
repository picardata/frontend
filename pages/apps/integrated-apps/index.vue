<template>
  <div>
    <base-header type="white" class="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <route-breadcrumb :crumbs="crumbs" />
          </nav>
        </div>
      </div>
    </base-header>
    <div class="container min-vh-80">
      <div class="row">
        <div class="col-xl-10 p-4">
          <form
            id="navbar-search-main"
            class="navbar-search form-inline"
            :class="{'navbar-search-light': type === 'default', 'navbar-search-dark': type === 'light'}"
          >
            <div class="form-group mb-0">
              <div class="input-group input-group-alternative input-group-merge search-button">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-search" /></span>
                </div>
                <input class="form-control app-search" placeholder="Search app" type="text">
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
          <div v-if="false" class="row pt-3">
            <div class="col-xl-12">
              <ul class="list-group">
                <li class="list-group-item">
                  <a href="#" data-filter="all">All applications</a>
                </li>
                <li class="list-group-item">
                  <a href="#" data-filter="">Collaboration Tools</a>
                </li>
                <li class="list-group-item">
                  <a href="#" data-filter="">Customer Support</a>
                </li>
                <li class="list-group-item">
                  <a href="#" data-filter="">Design</a>
                </li>
                <li class="list-group-item">
                  <a href="#" data-filter="">Finance</a>
                </li>
                <li class="list-group-item">
                  <a href="#" data-filter="">Human Resource</a>
                </li>
                <li class="list-group-item">
                  <a href="#" data-filter="">Sales & Marketing</a>
                </li>
                <li class="list-group-item">
                  <a href="#" data-filter="">Social Media</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="row ml-1 mb-5">
        <div class="col">
          <base-button type="primary">
            All
          </base-button>
          <base-button outline type="primary">
            Collaboration
          </base-button>
          <base-button outline type="primary">
            Design
          </base-button>
          <base-button outline type="primary">
            Financial
          </base-button>
          <base-button outline type="primary">
            Human Resource
          </base-button>
        </div>
      </div>
      <ItegratedAppsList class-added="ml-1 col-xl-10" app-class="col-4" :totalPage="totalPage" @setTotalPage="setTotalPage"/>
      <div class="row" style="margin-bottom: 2%;"> 
        <div class="col-md-12 ">  
          <div class="picardata-paging float-right">
            <div class="col-sm">
              <span class="pd-icon pdicon-Chevron-Left"></span>
            </div>
            <span v-for="n in this.totalPage" class="col-sm">{{ n }} </span>
            <div class="col-sm"><span class="pd-icon pdicon-Chevron-Right"></span></div>
          </div>
        </div>
      </div>
    </div>
 

  </div>
</template>

<script>

import ItegratedAppsList from '@/components/Application/IntegratedAppsList'
export default {
  name: 'Index',
  layout: 'argon',
  components: { ItegratedAppsList },
  data () {
    return {
      crumbs: [
        {
          name: 'Apps',
          path: '/apps'
        },
        {
          name: 'Integrated Apps',
          path: '/apps/integrated-apps'
        }
      ],
      totalPage: 1
    }
  },
  methods: {
    setTotalPage (totalPage) {
      console.log('Mantab !');
      this.totalPage = totalPage;
    }
  }
}
</script>

<style scoped>
form, .input-group, .form-group {
  width: 100% !important;
}

li.list-group-item {
  padding: 1rem 0 1rem 0;
  border: none;
}

li.list-group-item a {
  color: black;
}
div.search-button {
  background-color: #EFF0F7;
}

.picardata-paging {
  /* Frame 266 */


  /* Auto Layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  cursor: pointer;
  position: static;
  width: atuo;
  /*height: 60px;
  left: 689px;
  top: 2066px; */

  background: #FAFAFA;
  border-radius: 8px;

  /* Inside Auto Layout */

  flex: none;
  order: 6;
  align-self: flex-end;
  flex-grow: 0;
  /* margin: 56px 0px; */
  font-family: picardata;
}
</style>
