<template>
  <div class="row ml-2">
    <div class="col-12">
      <img class="logo" :src="logo" alt="Logo">
    </div>
    <div :class="{ 'col-8': detailPage, 'col-12': !detailPage }">
      <h1>{{ name }}</h1>
    </div>
    <div v-if="detailPage" class="col-4">
      <nuxt-link :to="manageLink" class="text-primary fa-pull-right btn">
        <font-awesome-icon :icon="['fas', 'cogs']" />
        Manage app
      </nuxt-link>
    </div>
    <div v-if="detailPage" class="row mt-3 ml-3">
      <p class="text-default mt-2 mr-2">
        <font-awesome-icon class="text-success" :icon="['fas', 'check']" />
        Data appear on Dashboard
      </p>
      <div class="divider" />
      <nuxt-link to="#" class="text-primary btn">
        <font-awesome-icon :icon="['fas', 'plus']" />
        Add chart to Dashboard
      </nuxt-link>
    </div>
    <div class="col-12">
      <p v-if="detailPage">
        {{ detail }}
      </p>
      <p v-else>
        {{ instruction }}
      </p>
    </div>
    <div v-if="detailPage" class="col-12">
      <div class="card-profile-stats d-flex">
        <div class="p-0">
          <span class="heading"><i class="fa fa-download" /> 22</span>
        </div>
        <div class="divider" />
        <div class="p-0">
          <span class="heading"><i class="fa fa-heart text-danger" /> 10</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApplicationDetail',
  props: {
    logo: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    detail: {
      type: String,
      default: ''
    },
    instruction: {
      type: String,
      default: ''
    },
    detailPage: {
      type: Boolean,
      default: true
    },
    withIntegration: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    manageLink () {
      return this.$route.path + '/manage'
    }
  }
}
</script>

<style scoped>
img.logo {
  width: 100px;
}
</style>
