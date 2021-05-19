<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0">
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
                            <div class="all-form-title">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Submenu from '~/components/layouts/argon/Submenu'
import loaderMixin from '~/mixins/loader'

export default {
  name: 'IndexVue',
  layout: 'argon',
  auth: true,
  components: { Submenu },
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
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.75px;

  /* Body Text */

  color: #313131;
}
.card-title {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.75px;

  /* Body Text */

  color: #313131;
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

.all-form-title {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  /* identical to box height */

  letter-spacing: 0.75px;

  /* Body Text */

  color: #313131;
}
.btn-round {
  height: 56px;
  border-radius: 40px;
  font-weight: normal;
  font-size: 16px;
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
</style>
