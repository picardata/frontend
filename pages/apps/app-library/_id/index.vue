<template>
  <div>
    <base-header type="white" class="p-0">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <route-breadcrumb :crumbs="crumbs" />
          </nav>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt-3">
      <ApplicationDetail
        :logo="data.logo"
        :name="data.name"
        :instruction="data.detail"
        :detail-page="false"
        :with-integration="false"
      />
    </div>
  </div>
</template>

<script>
import ApplicationDetail from '@/components/Application/ApplicationDetail'

export default {
  name: 'IndexVue',
  layout: 'argon',
  components: { ApplicationDetail },
  async asyncData (context) {
    return await context.app.$axios.get('/api/applications/' + context.route.params.id)
      .then((data) => {
        return {
          data: data.data,
          crumbs: [
            {
              name: 'Apps',
              path: '/apps'
            },
            {
              name: 'App Library',
              path: '/apps/app-library'
            },
            {
              name: data.data.name,
              path: '/apps/integrated-apps'
            }
          ]
        }
      })
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
