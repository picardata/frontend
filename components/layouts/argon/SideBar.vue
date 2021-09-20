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
              <img  :src="require(`/assets/menu_icons/${item.icon}`)">
              <div class="nav-link-text">
                {{ item.displayName }}
              </div>
            </nuxt-link>

            <a
              v-else
              @click.prevent="modals.logout = true"
              :class="[`sidebar-menu-item`, `text-center`, {active: isActive(item.name)}]"
            >
              <img  :src="require(`/assets/menu_icons/${item.icon}`)">
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
          icon: 'Home.png',
          link: '/'
        },
        {
          name: 'create-contract',
          displayName: 'Create a Contract',
          icon: 'Create_contract.png',
          link: '/contracts/create-contract'
        },
        {
          name: 'contracts',
          displayName: 'Contracts',
          icon: 'Contracts.png',
          link: '/contracts'
        },
        {
          name: 'reports',
          displayName: 'Reports',
          icon: 'Reports.png',
          link: '#'
        },
        {
          name: 'compliance-documents',
          displayName: 'Compliance Documents',
          icon: 'Compliance_document.png',
          link: '#'
        },
        {
          name: 'invoices-receipts',
          displayName: 'Invoices & Receipts',
          icon: 'Invoices_Receipts.png',
          link: '#'
        },
        {
          name: 'taxes',
          displayName: 'Taxes',
          icon: 'Taxes.png',
          link: '#'
        },
        {
          name: 'team-settings',
          displayName: 'Team Settings',
          icon: 'Team_setting.png',
          link: '#'
        },
        {
          name: 'benefits',
          displayName: 'Benefits',
          icon: 'Perks.png',
          link: '#'
        },
        {
          name: 'user-settings',
          displayName: 'User Settings',
          icon: 'User_setting.png',
          link: '#'
        },
        {
          name: 'payments',
          displayName: 'Payments',
          icon: 'Payment_methods.png',
          link: '#'
        },
        {
          name: 'profile',
          displayName: 'Profile',
          icon: 'User.png',
          link: '#'
        },
        {
          name: 'logout',
          displayName: 'Logout',
          icon: 'Log_out.png',
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
