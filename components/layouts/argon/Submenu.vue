<template>
  <div class="row pt-3 sidemenu-layout" style="margin-right: 0.625em!important">
    <div class="slide-element">
      <div class="col-lg-12" style="margin-bottom: 3.125em;padding-top:1.6875em">
        <div class="row" style="margin-right:  -1.5625em">
          <div class="col-lg-11" style="margin-right: -1.2em">
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
          <div :id="generateElementId([form.type, form.name])" class="list-group" role="tablist">
            <a href="#" class="list-item row">
              <div class="col-lg-10">
                <nuxt-link :to="form.link"><p class="list-text">{{ form.name }}</p></nuxt-link>
              </div>
              <div class="col-lg-1" style="margin-left:-1em">
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
  },
  methods: {
    generateElementId (arr) {
      return arr.map((a) => {
        return a.replace(/\s/g, '-')
      }).join('-').toLowerCase()
    }
  }
}
</script>
<style scoped>
  .slide-element {
    background-color: #5fa03f14;
    width: 15.625em;
    height: 100%;
    margin-left: -0.9375em;
    margin-top: -0.9375em;
    margin-bottom: 0.9375em;
      display: none;
  }

  div.card {
    border: none;
  }

  .most-access div.card {
    border: none;
    width: 10.625em;
    font-size: 0.875em;
  }

  .over-stat div.card {
    border: none;
    font-size: 0.875em;
  }

  .list-item {
    margin-bottom: 0.5em;
  }

  .list-text {
    color: #2E4823;
    font-weight: bold;
    font-size: 1em;
  }

  .subtitle {
    color: #181C3B !important;
    font-size: 1.25em;
    font-weight: bold
  }

  i.pdicon-Collapse, i.pdicon-Expand {
    font-size: 1.8em;
    cursor: pointer;
    margin-right: -1.5em !important;
  }

  i.pdicon-Chevron-Right {
    color: #2534B6;
  }

</style>
