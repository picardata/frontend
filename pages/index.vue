<template>
  <div class="row">
    <div class="p-4 col-12">
      <h3>Most Accessed Apps</h3>
      <div class="row most-access">
        <div v-for="application in mostAccessApps" :key="application.id" class="card shadow-sm mx-3">
          <div class=" p-3">
            <img class="card-img-top" :src="application.source" alt="Card image cap">
          </div>
          <div class="card-body p-1 text-center">
            <p class="bold">
              {{ application.name }}
            </p>
          </div>
        </div>
      </div>
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
</template>
<script>
import RandomLineChart from '~/components/Chart/RandomLineChart.vue'
export default {
  components: { RandomLineChart },
  auth: true,
  data () {
    return {
      mostAccessApps: [
        {
          id: 1,
          name: 'Intercom',
          source: 'https://cdn.worldvectorlogo.com/logos/intercom-2.svg'
        },
        {
          id: 2,
          name: 'Slack',
          source: 'https://cdn.freebiesupply.com/logos/large/2x/slack-logo-icon.png'
        },
        {
          id: 3,
          name: 'Twitter',
          source: 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png'
        }
      ]
    }
  }
}
</script>

<style>
  div.card {
    border: none;
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
