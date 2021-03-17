<template>
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
      <div class="row">
        <div class="col-xl-3">
          <card>
            <div class="row">
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
            </div>
            <div class="row pt-3">
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
          </card>
        </div>
        <AppLibraryList />
      </div>
    </div>
  </div>
</template>

<script>

import AppLibraryList from '@/components/Application/AppLibraryList'

export default {
  name: 'Index',
  layout: 'argon',
  components: { AppLibraryList },
  data () {
    return {
      crumbs: [
        {
          name: 'Apps',
          path: '/apps'
        },
        {
          name: 'App Library',
          path: '/apps/app-library'
        }
      ]
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
</style>
