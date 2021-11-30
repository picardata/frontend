<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <div class="container-fluid pt-6">
          <div class="row profile mt--1 mb-5">
            <div class="image">
              <img src="~/assets/dashboard-img/ic_no_image_placeholder.png" alt="">
            </div>
            <div>
              <div class="name">
                Welcome, {{ profile.userProfile.firstname }}
              </div>
            </div>
          </div>
          <div class="row contract-type-wrapper full-contract-details">
            <div class="col-12">
              <div class="card border p-4">
                <div>
                  <div class="all-form-title bold-text form-field text-center">
                    <span class="form-title page-header" style="font-weight: 900 !important;">Currently unavailable<br>Please contact administrator</span><br><br>
                    <img height="300" src="~/assets/menu_icons/unavailable.png" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'argon',
  auth: true,
  components: {
  },
  async asyncData (context) {
    const contractorUserProfile = context.app.$auth.user.userProfile.id
    const employeeId = context.app.$auth.user.userProfile.employees[0].id

    const [profile, payAsYouGoContracts, milestoneContracts, fullTimeEmployeeContracts, uploadedPayslips, uploadedTaxDocuments] = await Promise.all([
      context.app.$axios.get('/api/user-profiles/' + contractorUserProfile + '/employees/me'),
      context.app.$axios.get('/api/pay/as/you/go/contract/?order[updatedAt]=asc&page_number=1&items_per_page=999&contractorUserProfile=' + contractorUserProfile),
      context.app.$axios.get('/api/milestone/contract/?order[updatedAt]=asc&page_number=1&items_per_page=999&contractorUserProfile=' + contractorUserProfile),
      context.app.$axios.get('/api/full/time/employee/contract/?order[updatedAt]=asc&page_number=1&items_per_page=999&contractorUserProfile=' + contractorUserProfile),
      context.app.$axios.get('/api/payslip/?order[updatedAt]=asc&page_number=1&items_per_page=999&employee=' + employeeId),
      context.app.$axios.get('/api/tax/document/?order[updatedAt]=asc&page_number=1&items_per_page=999&employee=' + employeeId)
    ])

    return {
      profile: profile.data,
      payAsYouGoContracts: payAsYouGoContracts.data,
      milestoneContracts: milestoneContracts.data,
      fullTimeEmployeeContracts: fullTimeEmployeeContracts.data,
      uploadedPayslips: uploadedPayslips.data,
      uploadedTaxDocuments: uploadedTaxDocuments.data
    }
  },
  data () {
    return {
      submenu: true
    }
  }

}
</script>

<style scoped>
  .card {
    height: auto;
  }

  h1 {
    font-size: 36px;
    font-weight: bolder;
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
  .contract-type-wrapper {
    text-align: center;
  }
</style>

<style lang="scss">
  .profile{
    display: flex;
    align-items: center;
    margin-top: 20px;

    .image{
      margin-right: 24px;
    }
    .name{
      font-family: 'Roboto', sans-serif;
      font-weight: 600;
      font-size: 28px;
      color: #2E4823;
    }
    .role{
      font-weight: 500;
      color: #14142B;
      margin-top: 8px;
    }
  }

  .cv-right-menu {
    a {
      display: block;

      span {
        vertical-align: bottom;
      }

      img {
        height: 24px;
      }

      .description {
        font-size: 14px;
        padding-left: 35px;
        padding-top: 10px;
      }
    }
  }

  .multiple-fields-wrapper {
    display: inline-table;
    width: 100%;
  }

  .form-title-wrapper {
    text-align: center;
    span {
      display: block;
    }
  }

  .full-contract-details {
    .form-field {
      color: #6a6969;

      .contract-main-title {
        text-align: center;
      }

      .sub-point {
        margin-left: 25px;
      }

      .sub-sub-point {
        margin-left: 50px;
      }

      b {
        color: black;
        font-weight: 900;
      }

      .fs-14 {
        font-size: 14px;
      }

      .fs-16 {
        font-size: 16px;
      }

      .fs-18 {
        font-size: 18px;
      }

      .fs-20 {
        font-size: 20px;
      }

      .fs-22 {
        font-size: 22px;
      }

      .fs-24 {
        font-size: 24px;
      }

      .ff-roboto {
        font-family: 'Roboto', sans-serif;
      }

    }
  }
  .contract-type-actions-wrapper {
    margin-bottom: 20px;

    .next-btn {
      width: 100%;
      margin-bottom: 5px;
    }

    .back-btn {
      margin-top: 0;
      background-color: transparent;
      border: 0px;
      box-shadow: none;
      color: #525f7f;
      float: left;
      padding-left: 0px;

      .fa {
        margin-right: 5px;
      }

      &.btn-primary:hover, &.btn-primary:active {
        background-color: transparent;
        border: 0px;
        box-shadow: none !important;
        color: #525f7f;
      }
    }
  }

  .signature-wrapper {
    .form-field {
      width: 40%;
    }
  }
  .img-btn {
    background-color: transparent;
  }

  .all-form-title {
    font-family: 'Roboto Condensed';
    font-style: normal;
    color: #313131;
    text-align: center;
    /*margin-bottom: 30px;*/

    &.form-field {
      text-align: left;
    }

    &.two-colls {
      &.first-coll {
        padding-right: 10px;
      }
      float: left;
      display: block;
      width: 50%;
    }

    &.field-group {
      .text-label {
        font-size: 18px;
        color: #2E4823 !important;
      }
      margin-bottom: 10px;
    }

    h3 {
      font-size: 18px;
    }

    .text-label {
      font-size: 16px;
      font-weight: 800 !important;
      color: #2E4823 !important;

      &.text-label-secondary {
        color: #6BB745 !important;
      }
    }
    .entity-name {
      font-size: 20px !important;
      margin: 10px 0;
      display: block;
    }

    .text-label-desc {
      display: block;
      font-size: 14px;
      color: darkgrey;
    }

    .form-checkbox-left {
      display: block;
      float: left;
      margin-top: 0;
    }

    .form-control-label {
      font-size: 16px;
      font-weight: 800 !important;
      color: #313131;
    }

    .text-label-desc {
      .form-control-label {
        display: block;
        font-size: 14px;
        color: darkgrey;
      }
    }

    .form-input {
      margin: 10px 0 5px 0;
      width: 100%;
      height: 100%;
      outline: none;
      font-size: 16px;
      line-height: 24px;
      color: var(--black);
    }

    .form-signature {
      border: none;
      border-bottom: 1px solid #eee;
      font-family: 'Birthstone', cursive;
      color: black;
      font-size: 24px;
    }

    .contract-review-field-wrapper {
      background-color: #f4f3f5;
      padding: 10px 10px;
      height: 40px;
      margin: 10px 0 0 0;
      display: inline-table;
      width: 100%;

      .text-left {
        float: left;
      }

      .text-right {
        float: right;
        font-weight: bold !important;
      }
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
