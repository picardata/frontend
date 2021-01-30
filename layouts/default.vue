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
</template>
<script lang="ts">
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import Navigation from '~/components/Navigation.vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export default Vue.extend({
  components: { Navigation }
})
</script>
