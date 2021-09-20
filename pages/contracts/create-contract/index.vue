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
                        <div class="col-12 form-title-wrapper">
                            <span class="form-title">Contract Type</span>
                            <span>Start creating your contract by selecting the most relevant type.
                            </span>
                        </div>
                    </div>
                    <div class="row mt-6 contract-type-wrapper">
                        <div class="col-3">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="card border p-4">
                                        <div class="mr-3">
                                            <div class="all-form-title bold-text">
                                                <div>
                                                    <img style="" src="~/assets/contract/fixed_rate_contract.svg" alt="Fixed rate contract">
                                                    <h3>
                                                        Fixed Rate
                                                    </h3>

                                                    <span>
                                                        For contracts that have a fixed rate on every payment cycle
                                                    </span>
                                                </div>
                                                <div class="mt-5 float-right">
                                                    <nuxt-link to="/billing" class="btn btn-lg btn-primary btn-round">
                                                        Create Contract
                                                    </nuxt-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-5 text-right"></div>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="card border p-4">
                                        <div class="mr-3">
                                            <div class="all-form-title bold-text">
                                                <div>
                                                    <img style="" src="~/assets/contract/pay_as_you_go_contract.svg" alt="Pay as you go contract">
                                                    <h3>
                                                        Pay As You Go
                                                    </h3>

                                                    <span>
                                                        For contracts with time sheets or submitted work every payment cycle
                                                    </span>
                                                </div>
                                                <div class="mt-4 float-right">
                                                    <nuxt-link to="/billing" class="btn btn-lg btn-primary btn-round">
                                                        Create Contract
                                                    </nuxt-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-5 text-right"></div>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="card border p-4">
                                        <div class="mr-3">
                                            <div class="all-form-title bold-text">
                                                <div>
                                                    <img style="" src="~/assets/contract/milestone_contract.svg" alt="Milestone contract">
                                                    <h3>
                                                        Milestone
                                                    </h3>

                                                    <span>
                                                        For contracts with milestones that are paid as they get completed
                                                    </span>
                                                </div>
                                                <div class="mt-4 float-right">
                                                    <nuxt-link to="/billing" class="btn btn-lg btn-primary btn-round">
                                                        Create Contract
                                                    </nuxt-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-5 text-right"></div>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="card border p-4">
                                        <div class="mr-3">
                                            <div class="all-form-title bold-text">
                                                <div>
                                                    <img style="" src="~/assets/contract/full_time_employee_contract.svg" alt="Full-time employee contract">
                                                    <h3>
                                                        Full-time Employee
                                                    </h3>

                                                    <span>
                                                        Employ as full-time employee compliantly anywhere in the world
                                                    </span>
                                                </div>
                                                <div class="mt-4 float-right">
                                                    <nuxt-link to="/billing" class="btn btn-lg btn-primary btn-round">
                                                        Create Contract
                                                    </nuxt-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-5 text-right"></div>
                            </div>
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
  components: {},
  mixins: [
    loaderMixin
  ],
  data () {
    return {
      crumbs: [
        {
          name: 'Create Contract',
          path: '/contracts'
        }
      ],
      submenu: true
    }
  }
}
</script>

<style scoped>
    .card {
        height: 380px;
    }

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

    .bold-text{
        font-weight:700 !important;
    }
    .btn-round {
        border-radius: 5px;
        font-weight: normal;
        font-size: 14px;
        padding: 10px 20px;
    }

    .contract-type-wrapper {
        text-align: center;
    }
</style>

<style lang="scss">
    .form-title-wrapper {
        text-align: center;
        span {
            display: block;
        }
    }

    .all-form-title {
        font-family: 'Roboto Condensed';
        font-style: normal;
        color: #313131;
        h3 {
            font-size: 18px;
        }
        span {
            font-size: 14px;
            font-weight: normal !important;
        }
    }

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
