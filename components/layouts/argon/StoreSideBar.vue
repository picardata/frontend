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
        <ul v-else-if="isPartnerAdmin === true" class="navbar-nav mt-5">
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
      isPartnerAdmin: this.$auth.user.userProfile.employees[0].isPartnerAdmin,
      isGlobeliseAdmin: this.$auth.user.userProfile.employees[0].isGlobeliseAdmin,
      employeeMenus: [
        {
          name: 'index',
          displayName: 'Home',
          icon: 'Home.png',
          link: '/'
        },
        {
          name: 'my-carts',
          displayName: 'My Carts',
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
          name: 'product-listing',
          displayName: 'Product Listing',
          icon: 'Invoices_Receipts.png',
          link: '/locked'
        },
        {
          name: 'partner-listing',
          displayName: 'Partner Profile',
          icon: 'Invoices_Receipts.png',
          link: '/store/partners/register'
        },
        {
          name: 'user-settings',
          displayName: 'User Settings',
          icon: 'User_setting.png',
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
          name: 'product-listing',
          displayName: 'Product Listing',
          icon: 'Invoices_Receipts.png',
          link: '/locked'
        },
        {
          name: 'partner-listing',
          displayName: 'Partner Listing',
          icon: 'Invoices_Receipts.png',
          link: '/store/partners/register'
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
    // if (Object.hasOwnProperty.call(this.$auth.user.company.companyMarketplacePartner, 'uuid')) {
    //   this.markeplacePartnerUuid = this.$auth.user.company.companyMarketplacePartner.uuid
    // }

    // if (this.markeplacePartnerUuid != null) {
    //   this.adminMenus[2].link = '/store/partners/' + this.markeplacePartnerUuid
    // }
  
    console.log(this.$auth)

    if (Object.hasOwnProperty.call(this.$auth.user, 'company')) {
      const markeplacePartnerUuid = this.$auth.user.company.companyMarketplacePartner.uuid

      if (markeplacePartnerUuid != null) {
        this.adminMenus[2].link = '/store/partners/' + markeplacePartnerUuid
      }
    } else {
      const markeplacePartnerUuid = this.$auth.user.userProfile.employees[0].company.companyMarketplacePartner.uuid

      if (markeplacePartnerUuid != null) {
        this.adminMenus[2].link = '/store/partners/' + markeplacePartnerUuid
      }
    } 

    if (Object.hasOwnProperty.call(this.$auth.user, 'isPartnerAdmin')) {
      this.isPartnerAdmin = this.$auth.user.isPartnerAdmin
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
