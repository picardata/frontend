<template>
  <div class="row pt-3 sidemenu-layout" style="margin-right: 10px!important">
    <div class="slide-element">
      <div class="col-lg-12" style="margin-bottom: 50px;padding-top:27px">
        <div class="row" style="margin-right: -25px">
          <div class="col-lg-10">
            <slot name="breadcrumb" />
          </div>
          <div class="col-lg-1">
            <slot name="collapse" />
            <slot name="expand" />
          </div>
        </div>
      </div>
      <div v-for="form,index in submenuData" :key="index">
        <div v-if="form.type === 'subtitle'" class="col-xl-8">
          <p class="subtitle">
            {{ form.name }}
          </p>
        </div>
        <div v-else class="col-xl-12">
          <div id="list-tab" class="list-group" role="tablist">
            <a href="#" class="list-item row">
              <div class="col-lg-10">
                <nuxt-link :to="form.link"><p class="list-text">{{ form.name }}</p></nuxt-link>
              </div>
              <div class="col-lg-1">
                <i :class="['pd-icon pdicon-Chevron-Right']" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <slot name="content" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Submenu',
  props: {
    submenuData: {
      type: Array
    }
  }
}
</script>
<style scoped>
  .slide-element {
    background-color: #F4F9FF;
    width: 250px;
    height: 100%;
    margin-left: -15px;
    margin-top: -15px;
    margin-bottom: 15px;
  }

  div.card {
    border: none;
  }

  .most-access div.card {
    border: none;
    width: 170px;
    font-size: 14px;
  }

  .over-stat div.card {
    border: none;
    font-size: 14px;
  }
</style>
