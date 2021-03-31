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
        :logo="data.application.logo"
        :name="data.application.name"
        :detail="data.application.detail"
        :instruction="data.application.instruction"
      />
      <div class="row">
        <h3 class="mt-3 ml-4 col">
          View Statistic
        </h3>
      </div>
      <div class="row mt-3">
        <div class="col-3 ">
          <stats-card>
            <!-- Card body -->
            <div class="row">
              <div class="col">
                <h5 class="card-title text-uppercase text-muted mb-0">
                  Total traffic
                </h5>
                <span class="h2 font-weight-bold mb-0">350,897</span>
              </div>
              <div class="col-auto">
                <div class="icon icon-shape bg-red text-white rounded-circle shadow">
                  <i class="ni ni-delivery-fast" />
                </div>
              </div>
            </div>
            <p class="mt-3 mb-0 text-sm">
              <span class="text-success mr-2"><i class="fa fa-arrow-up" /> 3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </p>
          </stats-card>
        </div>
        <div class="col-3">
          <stats-card>
            <!-- Card body -->
            <div class="row">
              <div class="col">
                <h5 class="card-title text-uppercase text-muted mb-0">
                  New users
                </h5>
                <span class="h2 font-weight-bold mb-0">2,356</span>
              </div>
              <div class="col-auto">
                <div class="icon icon-shape bg-orange text-white rounded-circle shadow">
                  <i class="ni ni-chart-pie-35" />
                </div>
              </div>
            </div>
            <p class="mt-3 mb-0 text-sm">
              <span class="text-success mr-2"><i class="fa fa-arrow-up" /> 3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </p>
          </stats-card>
        </div>
        <div class="col-3">
          <stats-card>
            <!-- Card body -->
            <div class="row">
              <div class="col">
                <h5 class="card-title text-uppercase text-muted mb-0">
                  Total traffic
                </h5>
                <span class="h2 font-weight-bold mb-0">350,897</span>
              </div>
              <div class="col-auto">
                <div class="icon icon-shape bg-red text-white rounded-circle shadow">
                  <i class="ni ni-delivery-fast" />
                </div>
              </div>
            </div>
            <p class="mt-3 mb-0 text-sm">
              <span class="text-success mr-2"><i class="fa fa-arrow-up" /> 3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </p>
          </stats-card>
        </div>
        <div class="col-3">
          <stats-card>
            <!-- Card body -->
            <div class="row">
              <div class="col">
                <h5 class="card-title text-uppercase text-muted mb-0">
                  New users
                </h5>
                <span class="h2 font-weight-bold mb-0">2,356</span>
              </div>
              <div class="col-auto">
                <div class="icon icon-shape bg-orange text-white rounded-circle shadow">
                  <i class="ni ni-chart-pie-35" />
                </div>
              </div>
            </div>
            <p class="mt-3 mb-0 text-sm">
              <span class="text-success mr-2"><i class="fa fa-arrow-up" /> 3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </p>
          </stats-card>
        </div>
        <div class="col-3">
          <PageViews />
        </div>
        <div class="col-3">
          <PageLikes />
        </div>
        <div class="col-3">
          <PageFollowers />
        </div>
        <div class="col-3">
          <PostReach />
        </div>
        <div class="col-3">
          <VideosViews />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApplicationDetail from '~/components/Application/ApplicationDetail'
import PageViews from '~/components/Application/Facebook/Widgets/PageViews'
import PageLikes from '~/components/Application/Facebook/Widgets/PageLikes'
import PageFollowers from '~/components/Application/Facebook/Widgets/PageFollowers'
import PostReach from '~/components/Application/Facebook/Widgets/PostReach'
import VideosViews from '~/components/Application/Facebook/Widgets/VideosViews'

export default {
  layout: 'argon',
  components: {
    ApplicationDetail,
    PageViews,
    PageLikes,
    PageFollowers,
    PostReach,
    VideosViews
  },
  async asyncData (context) {
    return await context.app.$axios.get('/api/integrations/' + context.route.params.id)
      .then((data) => {
        return {
          data: data.data
        }
      })
  },
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
        },
        {
          name: 'Google',
          path: '/apps/integrated-apps'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
