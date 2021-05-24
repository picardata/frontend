<template>
  <div class="navbar navbar-vertical fixed-left navbar-light bg-white sidebar-picardata">
    <div class="scrollbar-inner">
      <div class="sidenav-header d-flex align-items-center">
        <a class="navbar-brand text-white" href="/"><img src="~/assets/logo.png" alt="Picardata Logo"></a>
      </div>
      <div class="navbar-inner">
        <ul class="navbar-nav mt-5">
          <li
            v-for="(item, key) in menus"
            :key="item.name + key"
            :class="[`nav-item`, `text-center`, {active: isActive(item.name)}]"
          >
            <nuxt-link
              :to="item.link"
              :class="[`sidebar-menu-item`, `text-center`, {active: isActive(item.name)}]"
            >
              <i :class="[`pd-icon ${item.icon}`]" />
              <div class="nav-link-text">
                {{ item.displayName }}
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      menus: [
        {
          name: 'index',
          displayName: 'Dashboard',
          icon: 'pdicon-Home',
          link: '/'
        },
        {
          name: 'apps',
          displayName: 'Apps',
          icon: 'pdicon-Apps',
          link: '/apps/integrated-apps'
        },
        {
          name: 'forms',
          displayName: 'Forms',
          icon: 'pdicon-Forms',
          link: '/forms'
        },
        {
          name: 'billing',
          displayName: 'Billing',
          icon: 'icon-Billing',
          link: '/billing'
        },
        {
          name: 'profile',
          displayName: 'Profile',
          icon: 'pdicon-Profile',
          link: '/profile/me'
        },
        {
          name: 'setting',
          displayName: 'Setting',
          icon: 'pdicon-Settings',
          link: '#'
        },
        {
          name: 'support',
          displayName: 'Support',
          icon: 'pdicon-Alert-info',
          link: '#'
        },
        {
          name: 'logout',
          displayName: 'Logout',
          icon: 'pdicon-Logout',
          link: '/logout'
        }
      ]
    }
  },
  methods: {
    isActive (name) {
      if (this.$route && this.$route.path) {
        const matchingRoute = this.$route.name.startsWith(name)
        if (matchingRoute) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style lang="scss">
.navbar-nav{
  margin-top: 3rem !important;;
  li{
    &:first-child{
      margin-top: 1.5rem !important;
    }
  }
}
</style>