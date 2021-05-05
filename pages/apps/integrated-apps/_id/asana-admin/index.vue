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
    <div>
      <ApplicationDetail
        :logo="data.application.logo"
        :name="data.application.name"
        :detail="data.application.detail"
        :instruction="data.application.instruction"
        :detail-integrated-page="true"
      />
      <div class="row">
        <h3 class="mt-3 ml-4 col">
          View Statistic
        </h3>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <AsanaTasksWidget />
        </div>
        <div class="col-6">
          <AsanaProjectWidget />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AsanaTasksWidget from '@/components/Application/Asana/AsanaTaskWidget'
import AsanaProjectWidget from '@/components/Application/Asana/AsanaProjectWidget'
import ApplicationDetail from '~/components/Application/ApplicationDetail'

export default {
  layout: 'argon',
  components: { AsanaProjectWidget, AsanaTasksWidget, ApplicationDetail },
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
          path: '/apps/integrated-apps'
        },
        {
          name: 'Integrated Apps',
          path: '/apps/integrated-apps'
        },
        {
          name: 'Asana',
          path: '/apps/integrated-apps'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
