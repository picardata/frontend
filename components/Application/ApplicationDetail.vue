<template>
  <div class="mt-5">
    <div class="row">
      <div class="col-12">
        <img class="logo" :src="logo" alt="Logo">
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-8">
        <h1>{{ name }}</h1>
      </div>
      <div v-if="detailPage" class="col-4">
        <nuxt-link :to="manageLink" class="text-primary fa-pull-right btn">
          <font-awesome-icon :icon="['fas', 'cogs']" />
          Manage app
        </nuxt-link>
      </div>
    </div>
    <div class="row mt-3">
      <p class="text-default mt-2 mr-2">
        <font-awesome-icon class="text-success" :icon="['fas', 'check']" />
        Data appear on Dashboard
      </p>
      <div class="vl" />
      <nuxt-link to="#" class="text-primary btn">
        <font-awesome-icon :icon="['fas', 'plus']" />
        Add chart to Dashboard
      </nuxt-link>
    </div>
    <div class="row mt-3">
      <p>{{ detail }}</p>
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
    detailPage: {
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
