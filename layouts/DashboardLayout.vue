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
            :link="{ name: 'Dashboard', path: '/argon/dashboard' }"
          />
          <sidebar-item
            :link="{ name: 'Alternative', path: '/argon/alternative' }"
          />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Examples',
            icon: 'ni ni-ungroup text-orange'
          }"
        >
          <sidebar-item :link="{ name: 'Pricing', path: '/argon/pricing' }" />
          <sidebar-item :link="{ name: 'Login', path: '/argon/login' }" />
          <sidebar-item :link="{ name: 'Register', path: '/argon/register' }" />
          <sidebar-item :link="{ name: 'Lock', path: '/argon/lock' }" />
          <sidebar-item :link="{ name: 'Timeline', path: '/argon/pages/timeline' }" />
          <sidebar-item :link="{ name: 'Profile', path: '/argon/pages/user' }" />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Components',
            icon: 'ni ni-ui-04 text-info'
          }"
        >
          <sidebar-item :link="{ name: 'Buttons', path: '/argon/components/buttons' }" />
          <sidebar-item :link="{ name: 'Cards', path: '/argon/components/cards' }" />
          <sidebar-item :link="{ name: 'Grid', path: '/argon/components/grid-system' }" />
          <sidebar-item :link="{ name: 'Notifications', path: '/argon/components/notifications' }" />
          <sidebar-item :link="{ name: 'Icons', path: '/argon/components/icons' }" />
          <sidebar-item :link="{ name: 'Typography', path: '/argon/components/typography' }" />

          <sidebar-item :link="{ name: 'Multi Level' }">
            <sidebar-item :link="{ name: 'Third level menu', path:'#' }" />
            <sidebar-item :link="{ name: 'Just another link', path:'#' }" />
            <sidebar-item :link="{ name: 'One last link', path:'#' }" />
          </sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Forms',
            icon: 'ni ni-single-copy-04 text-pink'
          }"
        >
          <sidebar-item :link="{ name: 'Elements', path: '/argon/forms/elements' }" />
          <sidebar-item :link="{ name: 'Components', path: '/argon/forms/components' }" />
          <sidebar-item :link="{ name: 'Validation', path: '/argon/forms/validation' }" />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Tables',
            icon: 'ni ni-align-left-2 text-default'
          }"
        >
          <sidebar-item :link="{ name: 'Tables', path: '/argon/tables/regular' }" />
          <sidebar-item :link="{ name: 'Sortable', path: '/argon/tables/sortable' }" />
          <sidebar-item :link="{ name: 'Paginated Tables', path: '/argon/tables/paginated' }" />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Maps',
            icon: 'ni ni-map-big text-primary'
          }"
        >
          <sidebar-item :link="{ name: 'Google', path: '/argon/maps/google' }" />
          <sidebar-item :link="{ name: 'Vector', path: '/argon/maps/vector' }" />
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Widgets',
            icon: 'ni ni-archive-2 text-green',
            path: '/argon/widgets'
          }"
        />
        <sidebar-item
          :link="{
            name: 'Charts',
            icon: 'ni ni-chart-pie-35 text-info',
            path: '/argon/charts'
          }"
        />

        <sidebar-item
          :link="{
            name: 'Calendar',
            icon: 'ni ni-calendar-grid-58 text-red',
            path: '/argon/calendar'
          }"
        />
      </template>

      <template slot="links-after">
        <hr class="my-3">
        <h6 class="navbar-heading p-0 text-muted">
          Documentation
        </h6>

        <ul class="navbar-nav mb-md-3">
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://demos.creative-tim.com/nuxt-argon-dashboard-pro/documentation"
              target="_blank"
              rel="noopener"
            >
              <i class="ni ni-spaceship" />
              <span class="nav-link-text">Getting started</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://demos.creative-tim.com/nuxt-argon-dashboard-pro/documentation/foundation/colors.html"
              target="_blank"
              rel="noopener"
            >
              <i class="ni ni-palette" />
              <span class="nav-link-text">Foundation</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://demos.creative-tim.com/nuxt-argon-dashboard-pro/documentation/components/avatars.html"
              target="_blank"
              rel="noopener"
            >
              <i class="ni ni-ui-04" />
              <span class="nav-link-text">Components</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://demos.creative-tim.com/nuxt-argon-dashboard-pro/documentation/components/plugin_datepicker.html"
              target="_blank"
              rel="noopener"
            >
              <i class="ni ni-chart-pie-35" />
              <span class="nav-link-text">Plugins</span>
            </a>
          </li>
        </ul>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.name === 'alternative' ? 'light': 'default'" />

      <div @click="$sidebar.displaySidebar(false)">
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
    // ContentFooter
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
