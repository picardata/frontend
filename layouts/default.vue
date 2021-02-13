<template>
  <div>
    <Navigation />
    <div id="wrapper">
      <div id="content-wrapper">
        <div class="container container-fluid">
          <Nuxt />
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>vue-country-region-select
<script lang="ts">
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Navigation from '~/components/Navigation.vue'
const vueCountryRegionSelect = require('vue-country-region-select')
Vue.use(vueCountryRegionSelect)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export default Vue.extend({
  components: { Navigation }
})
</script>
