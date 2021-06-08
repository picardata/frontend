<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-5">
      <div>
        <base-header type="white" class="pb-6">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                <route-breadcrumb :crumbs="crumbs" />
              </nav>
            </div>
          </div>
        </base-header>
        <div class="container-fluid mt--6">
          <div class="row">
            <a id="app" class="col-sm-12 pd-icon pdicon-Back-Arrow picardata-arrow" href="/" />
          </div>
          <div class="row mt-3">
            <div class="col-12">
              <span class="form-title">Manage Tasks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loaderMixin from '~/mixins/loader'

export default {
  name: 'IndexVue',
  layout: 'argon',
  auth: true,
  components: { },
  mixins: [
    loaderMixin
  ],
  data () {
    return {
      crumbs: [
        {
          name: 'Tasks',
          path: '/tasks'
        }
      ],
      submenu: true
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 36px;
  font-weight: bolder;
}
.picardata-arrow {
  color: #14142B;
  font-size: 200%;
}

.form-title {
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 54px;
  /* identical to box height */

  letter-spacing: 0.75px;

  /* Body Text */

  color: #313131;
}
</style>

<style lang="scss">
.list-packages{
  padding-left: 0px;

  li{
    list-style: none;
  }
}
.list-item-packages{
  li{
    list-style: inside;
    font-family: Poppins;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    letter-spacing: 0.75px;

    /* Body Text */

    color: #000;
  }
}
hr{
  &.black-line{
    width: 100%;
    color: #E0E0E0;
    background-color: #E0E0E0;
    margin:1em auto;
  }
}
.cards-info{
  span{
    letter-spacing: 0.75px;
    margin-rigt: 6px;
  }
}
div{
  &.divider{
    border-left: 1px solid #EFF7FF !important;
  }
}
</style>
