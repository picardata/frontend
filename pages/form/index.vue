<template>
  <div class="mt-5">
    <div class="form-list">
      <div class="row">
        <div class="col-4">
          <h1>Forms</h1>
        </div>
        <div class="col-8">
          <span class="align-middle float-right">
            <nuxt-link to="/form/new" class="btn btn-lg btn-primary btn-add">Add blank form</nuxt-link>
          </span>
        </div>
      </div>
    </div>
    <div class="form-search mt-5">
      <div class="row">
        <div class="form-group col-12">
          <input type="search" class="form-control search-box" placeholder="Search created forms">
        </div>
      </div>
    </div>
    <div class="form-search mt-5">
      <div class="row">
        <h4>All forms</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index.vue'
}
</script>

<style scoped>
h1 {
  font-size: 36px;
  font-weight: bolder;
}

.btn-add {
  height: 56px;
  border-radius: 40px;
  font-weight: normal;
  font-size: 16px;
  padding: 15px 30px;
}

.search-box {
  height: 62px;
  border-radius: 16px
}

</style>
