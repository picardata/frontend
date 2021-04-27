<template>
  <div class="app-integrated-app-manage"> 
    <base-header type="white" class="p-0">
      <div class="row align-items-center py-4">
        <div class="col-lg-12 col-12">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <route-breadcrumb :crumbs="crumbs" />
          </nav>
        </div>
      </div>
    </base-header>
    <ApplicationDetail
        :logo="data.application.logo"
        :name="data.application.name"
        :detail="data.application.detail"
        :instruction="data.application.instruction"
        :detail-page="false"
        :detail-manage-page="true"
    />
  </div>
</template>
<script>
export default {
  name: 'ApplicationManageDetail',
  props: ["crumbs", "data"]
}
</script>