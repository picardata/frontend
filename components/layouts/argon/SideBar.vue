<template>
  <div class="navbar navbar-vertical fixed-left navbar-light bg-white sidebar-picardata">
    <div class="scrollbar-inner">
      <div class="sidenav-header d-flex align-items-center">
        <a class="navbar-brand text-white" href="/"><img src="~/assets/text_logo.png" alt="Globelise Logo"></a>
      </div>
      <div class="navbar-inner">
        <ul v-if="isGlobeliseAdmin === true" class="navbar-nav mt-5">
          <li
            v-for="(item, key) in globeliseAdminMenus"
            :key="item.name + key"
            :class="[`nav-item`, `text-center`, {active: isActive(item.name)}]"
          >
            <nuxt-link
              v-if="item.name !== 'logout'"
              :to="item.link"
              :class="[`sidebar-menu-item`, `text-center`, {active: isActive(item.name)}]"
            >
              <img :src="require(`/assets/menu_icons/${item.icon}`)">
              <div class="nav-link-text">
                {{ item.displayName }}
              </div>
            </nuxt-link>

            <a
              v-else
              :class="[`sidebar-menu-item`, `text-center`, {active: isActive(item.name)}]"
              @click.prevent="modals.logout = true"
            >
              <img :src="require(`/assets/menu_icons/${item.icon}`)">
              <div class="nav-link-text">
                {{ item.displayName }}
              </div>
            </a>
          </li>
        </ul>
        <ul v-else-if="isCompanyAdmin === true" class="navbar-nav mt-5">
          <li
            v-for="(item, key) in adminMenus"
            :key="item.name + key"
            :class="[`nav-item`, `text-center`, {active: isActive(item.name)}]"
          >
            <a
              v-if="item.name === 'logout'"
              :class="[`sidebar-menu-item`, `text-center`, {active: isActive(item.name)}]"
              @click.prevent="modals.logout = true"
            >
              <img :src="require(`/assets/menu_icons/${item.icon}`)">
              <div class="nav-link-text">
                {{ item.displayName }}
              </div>
            </a>

            <div v-else-if="item.name === 'separator'">
              <div class="border-top separator-menu" />
            </div>

            <nuxt-link
              v-else
              :to="item.link"
              :class="[`sidebar-menu-item`, `text-center`, {active: isActive(item.name)}]"
            >
              <img :src="require(`/assets/menu_icons/${item.icon}`)">
              <div class="nav-link-text">
                {{ item.displayName }}
              </div>
            </nuxt-link>
          </li>
        </ul>
        <ul v-else class="navbar-nav mt-5">
          <li
            v-for="(item, key) in employeeMenus"
            :key="item.name + key"
            :class="[`nav-item`, `text-center`, {active: isActive(item.name)}]"
          >
            <nuxt-link
              v-if="item.name !== 'logout'"
              :to="item.link"
              :class="[`sidebar-menu-item`, `text-center`, {active: isActive(item.name)}]"
            >
              <img :src="require(`/assets/menu_icons/${item.icon}`)">
              <div class="nav-link-text">
                {{ item.displayName }}
              </div>
            </nuxt-link>

            <a
              v-else
              :class="[`sidebar-menu-item`, `text-center`, {active: isActive(item.name)}]"
              @click.prevent="modals.logout = true"
            >
              <img :src="require(`/assets/menu_icons/${item.icon}`)">
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
        <h5 id="exampleModalLabel" class="modal-title">
          Are you sure want to log out from Globelise?
        </h5>
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
      user: this.$auth.user,
      isCompanyAdmin: this.$auth.user.userProfile.employees[0].isCompanyAdmin,
      isGlobeliseAdmin: this.$auth.user.userProfile.employees[0].isGlobeliseAdmin,
      employeeMenus: [
        {
          name: 'index',
          displayName: 'Home',
          icon: 'Home.png',
          link: '/'
        },
        {
          name: 'benefits',
          displayName: 'Benefits',
          icon: 'Perks.png',
          link: '/locked'
        },
        {
          name: 'insurance',
          displayName: 'Insurance',
          icon: 'Insurance.png',
          link: '/locked'
        },
        {
          name: 'wallet',
          displayName: 'Wallet',
          icon: 'Wallet.png',
          link: '/locked'
        },
        {
          name: 'user-settings',
          displayName: 'User Settings',
          icon: 'User_setting.png',
          link: '#'
        },
        {
          name: 'logout',
          displayName: 'Logout',
          icon: 'Log_out.png',
          link: '/logout'
        }
      ],
      adminMenus: [
        {
          name: 'index',
          displayName: 'Home',
          icon: 'Home.png',
          link: '/'
        },
        {
          name: 'contracts-create-contract',
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
          name: 'payslips',
          displayName: 'Payslips',
          icon: 'Invoices_Receipts.png',
          link: '/payslips'
        },
        {
          name: 'tax-documents',
          displayName: 'Tax Documents',
          icon: 'Invoices_Receipts.png',
          link: '/tax-documents'
        },
        {
          name: 'reports',
          displayName: 'Reports',
          icon: 'Reports.png',
          link: '/locked'
        },
        {
          name: 'compliance-documents',
          displayName: 'Compliance Documents',
          icon: 'Compliance_document.png',
          link: '/locked'
        },
        {
          name: 'invoices-receipts',
          displayName: 'Invoices & Receipts',
          icon: 'Invoices_Receipts.png',
          link: '/locked'
        },
        {
          name: 'taxes',
          displayName: 'Taxes',
          icon: 'Taxes.png',
          link: '/locked'
        },
        {
          name: 'team-settings',
          displayName: 'Team Settings',
          icon: 'Team_setting.png',
          link: '/locked'
        },
        {
          name: 'benefits',
          displayName: 'Benefits',
          icon: 'Perks.png',
          link: '/locked'
        },
        {
          name: 'separator',
          displayName: 'User Settings',
          icon: 'User_setting.png',
          link: '/locked'
        },
        {
          name: 'user-settings',
          displayName: 'User Settings',
          icon: 'User_setting.png',
          link: '/locked'
        },
        {
          name: 'payments',
          displayName: 'Payments',
          icon: 'Payment_methods.png',
          link: '/locked'
        },
        {
          name: 'logout',
          displayName: 'Logout',
          icon: 'Log_out.png',
          link: '/logout'
        }
      ],
      globeliseAdminMenus: [
        {
          name: 'index',
          displayName: 'Home',
          icon: 'Home.png',
          link: '/'
        },
        {
          name: 'emmployees',
          displayName: 'Employees',
          icon: 'User_setting.png',
          link: '/employees/globelise-admin/employee-list'
        },
        {
          name: 'payslips',
          displayName: 'Payslips',
          icon: 'Invoices_Receipts.png',
          link: '/payslips/globelise-admin/payslip-list'
        },
        {
          name: 'payslips-upload-payslips',
          displayName: 'Upload Payslips',
          icon: 'Invoices_Receipts.png',
          link: '/payslips/globelise-admin/upload-payslips'
        },
        {
          name: 'tax-documents',
          displayName: 'Tax Documents',
          icon: 'Invoices_Receipts.png',
          link: '/tax-documents/globelise-admin/tax-document-list'
        },
        {
          name: 'tax-documents-upload-tax-documents',
          displayName: 'Upload Tax Documents',
          icon: 'Invoices_Receipts.png',
          link: '/tax-documents/globelise-admin/upload-tax-documents'
        },
        {
          name: 'user-settings',
          displayName: 'User Settings',
          icon: 'User_setting.png',
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
  created () {
    if (Object.hasOwnProperty.call(this.$auth.user, 'isCompanyAdmin')) {
      this.isCompanyAdmin = this.$auth.user.isCompanyAdmin
    }

    if (Object.hasOwnProperty.call(this.$auth.user, 'isGlobeliseAdmin')) {
      this.isGlobeliseAdmin = this.$auth.user.isGlobeliseAdmin
    }
  },
  methods: {
    isActive (name) {
      if (this.$route && this.$route.path) {
        if (this.$route.name === name) {
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
