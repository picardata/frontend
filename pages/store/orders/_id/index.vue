<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <base-header type="grey" class="pb-4">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                <route-breadcrumb :crumbs="crumbs" />
              </nav>
            </div>
          </div>
        </base-header>
        <div class="container-fluid mt--6">
          <div class="row mt-6 contract-type-wrapper">
            <div class="col-12">
              <div class="p-4 row">
                <div class="col-12" :key="orderStatusKey">
                  <div class="all-form-title bold-text form-field">
                    <div>
                      <span class="entity-name"> {{orderId}} </span>

                      <div class="float-right" v-if="orderStatus == 1">
                        
                        <button type="button" class="btn btn-md btn-secondary btn-add next-btn float-right" @click.prevent="updateOrderStatus(3)">
                          <span>Reject Order</span>
                        </button>

                        <button type="button" class="btn btn-md btn-secondary btn-add next-btn float-right mr-2" @click.prevent="updateOrderStatus(2)">
                          <span>Process Order</span>
                        </button>
                      </div>

                      <div class="float-right" v-else-if="orderStatus == 2">
                        <button type="button" class="btn btn-md btn-secondary btn-add next-btn float-right" @click.prevent="updateOrderStatus(4)">
                          <span>Cancel Order</span>
                        </button>
                        <button type="button" class="btn btn-md btn-secondary btn-add next-btn float-right mr-2" @click.prevent="updateOrderStatus(5)">
                          <span>Complete Order</span>
                        </button>
                      </div>

                      <div class="float-right" v-else-if="orderStatus == 3">
                        <button type="button" class="btn btn-md btn-secondary btn-add next-btn float-right" @click.prevent="updateOrderStatus(2)">
                          <span>Process Order</span>
                        </button>
                      </div>                     

                    </div>
                    <div>
                      <span>ORDER STATUS: {{statusOptions[orderStatus].name}}</span>
                    </div>
                    <div>
                      <span></span>
                    </div>
                    <div class="mt-4">
                      <span>Partner:</span>
                      <span>{{ product.marketplaceProductMarketplacePartner.name }}</span>
                    </div>
                    <div class="mt-4">
                      <span>Order Date:</span>
                      <span>{{ $moment(createdAt).format("ll") }}</span>
                    </div>

                    <div class="mt-4">
                      <span>Product:</span>
                      <span>{{ product.name }}</span>
                    </div>

                    <div class="mt-4">
                      <span>Transaction Price:</span>
                      <span>{{ toCurrencyString(totalPrice) }}</span>
                    </div>

                    <div class="mt-4">
                      <span>Actual Price:</span>
                      <span>{{ toCurrencyString(actualTotalPrice) }}</span>
                    </div>
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
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import flatPicker from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import 'vue-country-region-select'

export default {
  layout: 'storeLayout',
  auth: true,
  components: {
    ValidationObserver,
    ValidationProvider,
    flatPicker
  },
  async asyncData (context) {
    return await context.app.$axios.$get('/api/marketplace/order/' + context.route.params.id)
      .then((data) => {
        console.log(data)
        return data
      })
      .catch(e => console.log(e))
  },
  data () {
    return {
      firstPaymentDateconfig: {
        allowInput: true,
        altFormat: 'j F Y',
        altInput: true
      },
      statusOptions: [
        {},
        { name: 'ORDER RECEIVED' },
        { name: 'ORDER IN PROCESS' },
        { name: 'ORDER REJECTED' },
        { name: 'ORDER CANCELLED' },
        { name: 'ORDER COMPLETED' },
      ],
      submenu: true,
      currentDate: new Date(),
      partnerId: this.$route.params.id,
      crumbs: [
        {
          name: 'Home',
          path: '/store'
        }
      ],
      mainImagePath: "",
      statusLogsArr: "",
      isGlobeliseAdmin: this.$auth.user.userProfile.employees[0].isGlobeliseAdmin,
      orderStatusKey: 0
    }
  },
  created () {
    console.log(this)
    if (Object.hasOwnProperty.call(this.$auth.user, 'isGlobeliseAdmin')) {
      this.isGlobeliseAdmin = this.$auth.user.isGlobeliseAdmin
    }

    if (this.isGlobeliseAdmin) {
      
    }
  },
  mounted () {
    this.crumbs.push(
      {
        name: this.name,
        path: ''
      }
    )
  
  },
  methods: {
    async updateOrderStatus(newStatus) {
      
      const orderFormData = new FormData()
      orderFormData.append('orderId', this.orderId)
      orderFormData.append('product', this.product.id)
      orderFormData.append('unitPrice', this.unitPrice)
      orderFormData.append('quantity', this.quantity)
      orderFormData.append('totalPrice', this.totalPrice)
      orderFormData.append('actualTotalPrice', this.actualTotalPrice)
      orderFormData.append('orderStatus', newStatus)
      
      this.$axios.$post('/api/marketplace/order/' + this.uuid,
        orderFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((data) => {
          this.orderStatus = newStatus
          this.orderStatusKey++ 

        return true
      }).catch((e) => {
        return false
      })

    },
    toCurrencyString(number) {
      return number.toLocaleString('en-UK', { style: 'currency', currency: 'SGD' })
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
    color: #2e4823;
  }
  .bold-text{
    font-weight:700 !important;
  }
  .contract-type-wrapper {
    text-align: center;
  }
</style>
<style lang="scss">
  .full-width {
    width: 100%;
  }

  .checkbox-wrapper {
    width: 100%;
    height: 30px;
    margin-top: 10px;

    .custom-toggle {
      float: left;
    }
    .text-label-desc {
      color: black !important;
    }
  }

  .multiple-fields-wrapper {
    display: inline-table;
    width: 100%;
  }
  .download-contract-link {
    margin-top: 35px;
  }

  .contract-type-img {
    height: 100px;
  }
  .text-bold {
    font-weight: 900;
    color: #2e4823;
  }
  .hide-btn {
    display: block;
  }
  .form-title-wrapper {
    text-align: center;
    span {
      display: block;
    }
  }
  .modal-stock-option {
    .modal-body {
      padding: 0 1.5rem;
    }

    h3 {
      font-size: 22px !important;
    }

    .form-field {
      margin-bottom: 10px;
    }

    .two-collumns {
      height: 110px;
      display: block;
    }

    .currency-field-wrapper {
      width: 35%;
      display: block;
      float: left;
      margin-bottom: 10px;
      padding-right: 5px;
    }

    .aggregate-value-field-wrapper {
      width: 65%;
      display: block;
      float: right;
      margin-bottom: 10px;
    }

    .total-month-vesting-field-wrapper {
      width: 49%;
      display: block;
      float: left;
      margin-bottom: 10px;
      padding-right: 5px;
    }

    .cliff-month-vesting-field-wrapper {
      width: 50%;
      display: block;
      float: right;
      margin-bottom: 10px;
    }

    .information-text-wrapper {
      background-color: #e8f1fe;
      margin-bottom: 20px;
      padding: 18px;
      border-radius: 8px;

      span {
        color: #7c8286;
      }
    }
  }
  .modal-contract-details {
    .full-contract-details-wrapper {
      height: 380px;
      overflow: auto;

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
      }
    }
    .modal-footer {
      display: block !important;
      width: 100%;

      .signature-wrapper {
        width: 100%;
      }

      .button-wrapper {
        padding: 10px 0;
        width: 100%;
        display: grid;
      }
    }
  }
  .modal-contractor-invitation {
    .full-contract-details-wrapper {
      .form-field {
        color: #6a6969;
        margin-bottom: 20px;
      }

      textarea {
        height: 100px;
      }

      .btn {
        width: 100%;
      }
    }

    .modal-footer {
      display: block !important;
      width: 100%;

      .signature-wrapper {
        width: 100%;
      }

      .button-wrapper {
        padding: 10px 0;
        width: 100%;
        display: grid;
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
      width: 45%;
      margin-left: 20px;
    }
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
      }
      margin-bottom: 10px;
    }

    .entity-name {
      font-size: 24px;
      font-weight: 800 !important;
      color: #2E4823 !important;
    }

    h3 {
      font-size: 18px;
    }

    .text-label {
      font-size: 16px;
      font-weight: 800 !important;
      color: #313131;
    }

    .text-label-desc {
      display: block;
      font-size: 14px;
      color: darkgrey;
    }

    .form-checkbox {
      display: block;
      float: right;
      margin-top: -40px;
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
    }

    .text-signature {
      font-family: 'Birthstone', cursive;
      color: black;
      font-size: 24px;

      &.client-signature {
        font-size: 32px;
      }
    }

    &.signed-signature-wrapper {
      width: 100%;
      display: inline-table;

      .text-left {
        float: left;
      }

      .text-right {
        display: block;
        float: right;
        margin-top: 16px;
      }
    }

    .contract-review-field-wrapper {
      background-color: #f4f3f5;
      padding: 10px 10px;
      height: 40px;
      margin: 10px 0 0 0;
      display: inline-table;
      width: 100%;

      &.no-background {
        background-color: #ffffff !important;
        padding-left: 0px;
      }

      .text-left {
        float: left;
      }

      .text-right {
        float: right;
        font-weight: bold !important;
      }

      .signature-btn {
        width: 150px;
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
