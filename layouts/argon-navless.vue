<template>
  <div class="wrapper">
    <notifications/>
    <div class="main-content">
      <nuxt/>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

import DashboardNavbar from '~/components/layouts/argon/DashboardNavbar.vue'
import ContentFooter from '~/components/layouts/argon/ContentFooter.vue'

function hasElement (className) {
  return document.getElementsByClassName(className).length > 0
}

function initScrollbar (className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`)
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className)
    }, 100)
  }
}

export default {
  components: {
    DashboardNavbar,
    ContentFooter
  },
  mounted () {
    this.initScrollbar()
  },
  methods: {
    initScrollbar () {
      const isWindows = navigator.platform.startsWith('Win')
      if (isWindows) {
        initScrollbar('scrollbar-inner')
      }
    }
  }
}
</script>
<style lang="scss">
</style>
