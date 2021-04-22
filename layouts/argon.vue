<template>
  <div class="wrapper">
    <notifications />
    <Sidebar />
    <div class="main-content">
      <div class="content" @click="$sidebar.displaySidebar(false)">
        <nuxt />
      </div>
      <content-footer v-if="!$route.meta.hideFooter" />
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

import ContentFooter from '~/components/layouts/argon/ContentFooter.vue'
import Sidebar from '~/components/layouts/argon/SideBar.vue'

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
    ContentFooter,
    Sidebar
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
<style scoped>
.content {
  padding-left: 30px;
  padding-right: 30px;
}
</style>
