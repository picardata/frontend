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
              <span class="form-title">Manage Billing</span>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-12">
              <ul class="list-packages">
                <li>
                  <div class="row">
                    <div class="col-sm-7">
                      <div class="card border border-primary p-4">
                        <div class="d-flex">
                          <div class="mr-3">
                            <div class="all-form-title bold-text">
                              Package: Pro
                            </div>
                          </div>
                          <div class="mt-1">
                            <div class="divider d-inline" />
                            <span class="span-desc">SINCE APRIL 2020</span>
                          </div>
                        </div>
                        <div class="d-flex mt-2">
                          <div class="mr-5">
                            <ul class="pl-0 list-item-packages">
                              <li>3 Integrations</li>
                              <li>2 subsidiary accounts</li>
                              <li>Software Stack Management</li>
                            </ul>
                          </div>
                          <div>
                            <ul class="pl-0 list-item-packages">
                              <li>User Management</li>
                              <li>Dashboard Management</li>
                              <li>Survey Management</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-5 text-right">
                      <nuxt-link to="/billing" class="btn btn-lg btn-primary btn-round">
                        Add or Upgrade Subscription
                      </nuxt-link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <hr class="black-line">
          <div class="row mt-4 mb-4">
            <div class="col-12">
              <span class="all-form-title">Billing</span>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-sm-12 mt-3">
                  <span class="card-text">Your next billing date is June 1, 2021.</span>
                </div>
                <div class="col-sm-12 mt-3">
                  <div class="d-flex">
                    <div class="ml-2 mr-4">
                      <img src="img/billing/visa_logo.svg" alt="Visa-Logo">
                    </div>
                    <div class="cards-info">
                      <span>&bullet;&bullet;&bullet;&bullet;</span>
                      <span>&bullet;&bullet;&bullet;&bullet;</span>
                      <span>&bullet;&bullet;&bullet;&bullet;</span>
                      <span>1256</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr class="blue-divider">
          <div class="row mt-3 mb-4">
            <div class="col-12">
              <CardList />
            </div>
          </div>

          <hr class="blue-divider">
          <div class="row mt-3 mb-4">
            <div class="col-12">
              <InvoiceList />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loaderMixin from '~/mixins/loader'
import InvoiceList from '~/components/pages/billing/InvoiceList'
import CardList from '~/components/pages/billing/CardList'

export default {
  name: 'IndexVue',
  layout: 'argon',
  auth: true,
  components: {
    InvoiceList,
    CardList
  },
  mixins: [
    loaderMixin
  ],
  data () {
    return {
      crumbs: [
        {
          name: 'Billing',
          path: '/billing'
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
  font-size: 36px;
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
  height: 56px;
  border-radius: 40px;
  font-weight: normal;
  font-size: 14px;
  padding: 15px 30px;
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
