<template>
  <div class="wrapper">
    <notifications />
    <StoreSideBar />
    <div class="main-content">
      <div class="content" @click="$sidebar.displaySidebar(false)">
        <div v-if="isLoading" class="overlay">
          <div class="lds-ellipsis">
            <div /><div /><div /><div />
          </div>
        </div>
        <nuxt />
      </div>
      <!-- <content-footer v-if="!$route.meta.hideFooter" /> -->
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import { mapState } from 'vuex'

import StoreSideBar from '~/components/layouts/argon/StoreSideBar.vue'
// import ContentFooter from '~/components/layouts/argon/ContentFooter.vue'

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
    StoreSideBar
  },
  mounted () {
    this.initScrollbar()
  },
  computed: {
    ...mapState('loader', ['isLoading', 'refCount'])
  },
  middleware: 'onboarding',
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
@import url('~/assets/sass/custom/_loading.scss');

.content {
  padding-left: 30px;
  padding-right: 30px;
}
</style>
