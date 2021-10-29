<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <base-header type="grey" class="pb-6">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                <route-breadcrumb :crumbs="crumbs" />
              </nav>
            </div>
          </div>
        </base-header>
        <div class="container-fluid mt--6">
          <div class="row mt-3">
            <div class="col-12">
              <span class="form-title">Contracts</span>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-12">
              <ul class="list-packages">
                <li>
                  <div class="row">
                    <div class="col-sm-7">
                      <div class="card border p-4">
                        <div class="mr-3">
                          <div class="all-form-title bold-text">
                            <div>
                              No payments due
                            </div>
                            <div class="mt-5 float-right">
                              <nuxt-link to="/contracts/create-contract" class="btn btn-lg btn-primary btn-round">
                                Create Contract
                              </nuxt-link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-5 text-right"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <hr class="blue-divider">
          <div class="row mt-3 mb-4">
            <div class="col-12">
              <ContractList />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loaderMixin from '~/mixins/loader'
import ContractList from '~/components/pages/contracts/ContractList'
export default {
  name: 'IndexVue',
  layout: 'argon',
  auth: true,
  components: {
    ContractList
  },
  mixins: [
    loaderMixin
  ],
  data () {
    return {
      crumbs: [
        {
          name: 'Contract List',
          path: '/contracts'
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
  .span-desc{
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.75px;
    /* Body Text */
    color: #313131;
  }
  .card-title {
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.75px;
    /* Body Text */
    color: #313131;
  }
  .card-text {
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.75px;
    /* Body Text */
    color: #000000;
  }
  .form-title {
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 54px;
    /* identical to box height */
    letter-spacing: 0.75px;
    /* Body Text */
    color: #313131;
  }
  .all-form-title {
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    /* identical to box height */
    letter-spacing: 0.75px;
    /* Body Text */
    color: #313131;
  }
  .bold-text{
    font-weight:700 !important;
  }
  .btn-round {
    border-radius: 5px;
    font-weight: normal;
    font-size: 14px;
    padding: 10px 20px;
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
      font-family: 'Roboto Condensed';
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
