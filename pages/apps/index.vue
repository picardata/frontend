<template>
  <div>
    <base-header type="white" class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <route-breadcrumb />
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">
            New
          </base-button>
          <base-button size="sm" type="neutral">
            Filters
          </base-button>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-xl-3">
          <card>
            <form
              id="navbar-search-main"
              class="navbar-search form-inline mr-sm-3"
              :class="{'navbar-search-light': type === 'default', 'navbar-search-dark': type === 'light'}"
            >
              <div class="form-group mb-0">
                <div class="input-group input-group-alternative input-group-merge">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-search" /></span>
                  </div>
                  <input class="form-control" placeholder="Search" type="text">
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
          </card>
        </div>
        <div class="col-xl-9">
          <card>
            <h5 slot="header" class="h3 mb-0">
              Team members
            </h5>
            <user-list />
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Index',
  layout: 'argon',
  components: {}
}
</script>

<style scoped>

</style>
