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
    <ApplicationDetail
      :logo="data.logo"
      :name="data.name"
      :instruction="data.detail"
      :detail-page="false"
      :detail-library-page="true"
      :oauth-url="data.oauthUrl"
      :is-integrated="isIntegrated"
      :detail="data.detail"
      :custom-manage-url="`/apps/integrated-apps/${integrationId}/${data.name}-admin/manage`"
    />
  </div>
</template>

<script>
import ApplicationDetail from '@/components/Application/ApplicationDetail'

export default {
  name: 'IndexVue',
  layout: 'argon',
  components: { ApplicationDetail },
  async asyncData (context) {
    const data = await context.app.$axios.get('/api/applications/' + context.route.params.id)

    console.log('data = ')
    console.log(data)

    const allIntegrationsRaw = await context.app.$axios.get('/api/integrations/?order%5Bid%5D=desc')
    const allIntegrations = allIntegrationsRaw.data

    console.log('all integrations = ')
    console.log(allIntegrations)

    const filteredIntegrations = allIntegrations.filter(function (integration) {
      console.log('integration ')
      console.log(integration)

      console.log('data')
      console.log(data)

      return integration.application.id === data.data.id
    })

    const isIntegrated = filteredIntegrations.length > 0

    console.log('filtered integrations = ')
    console.log(filteredIntegrations)

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
      ],
      isIntegrated, 
      integrationId: filteredIntegrations.length > 0 ? filteredIntegrations[0].id : 0
    }
  }
}
</script>

<style scoped>

</style>
