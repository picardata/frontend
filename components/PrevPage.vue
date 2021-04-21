<template>
  <div class="row prev">
    <div class="col-12">
      <a class="btn p-0" href="#" @click.prevent="$router.go(-1)">
        <font-awesome-icon fixed-width size="2x" class="text-default p-0" :icon="['fas', 'arrow-left']" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrevPage'
}
</script>

<style scoped>
.btn:hover {
  box-shadow: none;
}
</style>
