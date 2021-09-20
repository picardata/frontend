<template>
  <div class="navbar navbar-vertical fixed-left navbar-light bg-white sidebar-picardata">
    <div class="scrollbar-inner">
      <div class="sidenav-header d-flex align-items-center">
        <a class="navbar-brand text-white" href="/"><img src="~/assets/text_logo.png" alt="Globelise Logo"></a>
      </div>
      <div class="navbar-inner">
        <ul class="navbar-nav mt-5">
          <li
            v-for="(item, key) in menus"
            :key="item.name + key"
            :class="[`nav-item`, `text-center`, {active: isActive(item.name)}]"
          >
            <nuxt-link
              v-if="item.name !== 'logout'"
              :to="item.link"
              :class="[`sidebar-menu-item`, `text-center`, {active: isActive(item.name)}]"
            >
              <i :class="[`pd-icon ${item.icon}`]" />
              <div class="nav-link-text">
                {{ item.displayName }}
              </div>
            </nuxt-link>

            <a
              v-else
              @click.prevent="modals.logout = true"
              :class="[`sidebar-menu-item`, `text-center`, {active: isActive(item.name)}]"
            >
              <i :class="[`pd-icon ${item.icon}`]" />
              <div class="nav-link-text">
                {{ item.displayName }}
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <modal :show.sync="modals.logout">
      <template slot="header">
        <h5 id="exampleModalLabel" class="modal-title">Are you sure want to log out from Picardata?</h5>
      </template>
      <template slot="footer">
        <base-button type="secondary" @click="modals.logout = false">
          Cancel
        </base-button>
        <base-button type="primary" @click.prevent="onLogout">
          Logout
        </base-button>
      </template>
    </modal>
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
          displayName: 'Home',
          icon: 'pdicon-Home',
          link: '/'
        },
        {
          name: 'create-contract',
          displayName: 'Create a Contract',
          icon: 'pdicon-Alert-info',
          link: '/contracts/create-contract'
        },
        {
          name: 'contracts',
          displayName: 'Contracts',
          icon: 'pdicon-Forms',
          link: '/contracts'
        },
        {
          name: 'reports',
          displayName: 'Reports',
          icon: 'pdicon-Alert-info',
          link: '#'
        },
        {
          name: 'compliance-documents',
          displayName: 'Compliance Documents',
          icon: 'pdicon-Alert-info',
          link: '#'
        },
        {
          name: 'invoices-receipts',
          displayName: 'Invoices & Receipts',
          icon: 'pdicon-Alert-info',
          link: '#'
        },
        {
          name: 'taxes',
          displayName: 'Taxes',
          icon: 'pdicon-Alert-info',
          link: '#'
        },
        {
          name: 'team-settings',
          displayName: 'Team Settings',
          icon: 'pdicon-Alert-info',
          link: '#'
        },
        {
          name: 'benefits',
          displayName: 'Benefits',
          icon: 'pdicon-Alert-info',
          link: '#'
        },
        {
          name: 'user-settings',
          displayName: 'User Settings',
          icon: 'pdicon-Alert-info',
          link: '#'
        },
        {
          name: 'payments',
          displayName: 'Payments',
          icon: 'pdicon-Alert-info',
          link: '#'
        },

        // {
        //   name: 'apps',
        //   displayName: 'Apps',
        //   icon: 'pdicon-Apps',
        //   link: '/apps/integrated-apps'
        // },
        // {
        //   name: 'forms',
        //   displayName: 'Forms',
        //   icon: 'pdicon-Forms',
        //   link: '/forms'
        // },
        // {
        //   name: 'tasks',
        //   displayName: 'Tasks',
        //   icon: 'icon-Tasks',
        //   link: '/tasks'
        // },
        // {
        //   name: 'billing',
        //   displayName: 'Billing',
        //   icon: 'icon-Billing',
        //   link: '/billing'
        // },
        {
          name: 'profile',
          displayName: 'Profile',
          icon: 'pdicon-Profile',
          link: '#'
        },
        // {
        //   name: 'setting',
        //   displayName: 'Setting',
        //   icon: 'pdicon-Settings',
        //   link: '#'
        // },
        // {
        //   name: 'support',
        //   displayName: 'Support',
        //   icon: 'pdicon-Alert-info',
        //   link: '#'
        // },
        {
          name: 'logout',
          displayName: 'Logout',
          icon: 'pdicon-Logout',
          link: '/logout'
        }
      ],
      modals: {
        logout: false
      }
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
    },
    onLogout () {
      this.modals.logout = false
      this.$router.push('/logout')
    }
  }
}
</script>

<style scoped>
  .modal-title {
      font-size: 1.025rem;
  }
</style>

<style lang="scss">
.navbar-nav{
  margin-top: 0 !important;;
  li{
    &:first-child{
      margin-top: 0 !important;
    }
  }
}
</style>
