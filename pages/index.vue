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
        <div class="col-12">
          <h3>Overall Statistics</h3>
          <div class="row over-stat">
            <div class="card shadow-sm mx-3 col-4">
              <div class="card-body p-1 text-center">
                <RandomLineChart />
              </div>
            </div>
            <div class="card shadow-sm mx-3 col-4">
              <div class="card-body p-1 text-center">
                <RandomLineChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RandomLineChart from '~/components/Chart/RandomLineChart.vue'
export default {
  components: { RandomLineChart },
  auth: true,
  layout: 'argon'
}
</script>
<style>
  div.card {
    border: none;
  }

  .most-access div.card {
    border: none;
    width: 170px;
    font-size: 14px;
  }

  .over-stat div.card {
    border: none;
    font-size: 14px;
  }

</style>
