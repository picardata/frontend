<template>
  <div class="row mt-5">
    <a class="btn" @click.prevent="$router.go(-1)">
      <font-awesome-icon fixed-width size="2x" class="text-default" :icon="['fas', 'arrow-left']" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'PrevPage'
}
</script>

<style scoped>

</style>
