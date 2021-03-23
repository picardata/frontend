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
      <AppLibraryList />
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

</style>
