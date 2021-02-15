<template>
  <div>
    <div class="row">
      <div class="p-4 col-12">
        <h3>My Applications</h3>
        <MostAccessedApplications></MostAccessedApplications>
        <h3>Applications</h3>
        <ApplicationList></ApplicationList>
        <h3 class="mt-5">
          Overall Statistics
        </h3>
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
</template>
<script>
import RandomLineChart from '~/components/Chart/RandomLineChart.vue'
import ApplicationList from '~/components/Application/ApplicationList'
import MostAccessedApplications from '~/components/Application/MostAccessedApplications'
export default {
  components: { RandomLineChart, ApplicationList, MostAccessedApplications },
  auth: true
}
</script>
<style>
  div.card {
    border: none;
  }

  .app-modal img {
    width: 100px;
  }

  .most-access div.card {
    border: none;
    width: 100px;
    font-size: 14px;
    height: 150px;
  }
  .over-stat div.card {
    border: none;
    font-size: 14px;
  }

</style>
