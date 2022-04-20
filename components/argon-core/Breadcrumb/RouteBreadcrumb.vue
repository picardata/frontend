<template>
  <no-ssr>
    <bread-crumb list-classes="breadcrumb-links breadcrumb-light">
      <!-- <BreadCrumbItem>
        <nuxt-link to="/" aria-label="Dashboard">
          {{ home }}
        </nuxt-link>
      </BreadCrumbItem> -->
      <BreadCrumbItem
        v-for="(crumb, index) in crumbs"
        :key="crumb.name"
        :active="index === crumbs.length - 1"
        style="display:inline-block"
      >
        <nuxt-link
          :to="crumb.path"
          v-if="index < crumbs.length - 1"
        >
          {{ crumb.name }}

          <i class="fa fa-chevron-right fa-xs" aria-hidden="true"></i>

        </nuxt-link>
        
        <span v-else>{{ crumb.name }}</span>


      </BreadCrumbItem>
    </bread-crumb>
  </no-ssr>
</template>

<script>
import BreadCrumb from './Breadcrumb'
import BreadCrumbItem from './BreadcrumbItem'

export default {
  name: 'RouteBreadcrumb',
  components: {
    BreadCrumb,
    BreadCrumbItem
  },
  props: {
    home: {
      type: String,
      default: 'Dashboard'
    },
    crumbs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getBreadName (route) {
      return route.name
    }
  }
}
</script>

<style scoped>
  li.breadcrumb-item a, li.breadcrumb-item span {
    text-transform: capitalize;
  }

.breadcrumb li.active {
  color: #313131;
  font-weight: 600;
}

</style>
