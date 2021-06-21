<template>
  <div class="row prev">
    <div class="col-12">
      <a class="btn p-0" href="#" @click.prevent="onClick">
        <font-awesome-icon fixed-width size="2x" class="text-default p-0" :icon="['fas', 'arrow-left']" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrevPage',
  props: ['destination'],
  methods: {
    onClick () {
      if (this.destination) {
        window.location.href = this.destination
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped>
.btn:hover {
  box-shadow: none;
}
</style>
