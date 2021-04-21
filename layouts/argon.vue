<template>
  <div class="wrapper">
    <notifications />
    <side-bar>
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboards',
            icon: 'ni ni-shop text-primary',
          }"
        >
          <sidebar-item
            :link="{ name: 'Dashboard', path: '/' }"
          />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Apps',
            icon: 'ni ni-ungroup text-orange'
          }"
        >
          <sidebar-item :link="{ name: 'Integrated Apps', path: '/apps/integrated-apps' }" />
          <sidebar-item :link="{ name: 'Manage All Apps', path: '/app/integrated-apps' }" />
          <sidebar-item :link="{ name: 'App Library', path: '/apps/app-library' }" />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Forms',
            icon: 'ni ni-ui-04 text-info'
          }"
        >
          <sidebar-item :link="{ name: 'Create a blank Form', path: '/form/new' }" />
          <sidebar-item :link="{ name: 'All forms', path: '/form' }" />
          <sidebar-item :link="{ name: 'Manage all forms', path: '/form' }" />
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Profile',
            icon: 'ni ni-single-copy-04 text-pink'
          }"
        >
          <sidebar-item :link="{ name: 'My Profile', path: '/profile/me' }" />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Settings',
            icon: 'ni ni-align-left-2 text-default'
          }"
        >
          <sidebar-item :link="{ name: 'App Setting', path: '/setting/app' }" />
          <sidebar-item :link="{ name: 'Company Setting', path: '/setting/company' }" />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Support',
            icon: 'ni ni-map-big text-primary'
          }"
        >
          <sidebar-item :link="{ name: 'FAQ', path: '/support/faq' }" />
          <sidebar-item :link="{ name: 'Create Support ticket', path: '/support/ticket/new' }" />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Logout',
            icon: 'ni ni-user-run text-primary',
            path: '/logout'
          }"
        >
          <!-- <sidebar-item :link="{ name: 'FAQ', path: '/support/faq' }" />
          <sidebar-item :link="{ name: 'Create Support ticket', path: '/support/ticket/new' }" /> -->
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-content">
      <!-- <dashboard-navbar type="default" /> -->
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

// import DashboardNavbar from '~/components/layouts/argon/DashboardNavbar.vue'
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
    // DashboardNavbar,
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
<style scoped>
.content {
  padding-left: 30px;
  padding-right: 30px;
}
</style>
