<template>
  <div class="wrapper">
    <div class="main-content">
      <nuxt />
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

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
