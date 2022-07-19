<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <div class="container-fluid pt-6">
          <div class="row">
            <div class="col-12">
              <span class="form-title page-header"></span>
            </div>
          </div>

          <div class="row">
            <div class="col-12 mb-4">
              <span class="form-title page-header">Purchase Order</span>
            </div>
          </div>

          <div class="row">
            <div class="col-12 card border pr-0 pl-0">
              <table :key="orderKey" class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">
                      Order ID
                    </th>
                    <th scope="col">
                      Product
                    </th>
                    <th scope="col">
                      Company
                    </th>
                    <th scope="col" class="text-right">
                      Date
                    </th>
                    <th scope="col" class="text-right">
                      Status
                    </th>
                    <th scope="col" class="text-right">
                      Transaction <br/>Value
                    </th>
                    <th scope="col" class="text-right">
                      Actual <br/> Transaction <br/>Value
                    </th>
                    <th scope="col" class="text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(order, index) in orders" :key="index">
                    <td>
                      <a :href="`${order.orderUrl}`" target="_blank">
                        <span class="contract-name">{{ order.orderId }}</span>
                      </a>
                    </td>
                    <td>
                      <a :href="`${order.productUrl}`" target="_blank">
                        <span class="contract-name">{{ order.name }}</span>
                      </a>
                    </td>
                    <td>
                      <a :href="`${order.partnerUrl}`" target="_blank">
                        <span class="contract-name">{{ order.partnerName }}</span>
                      </a>
                    </td>
                    <td>
                      <span class="contract-name">{{ $moment(order.creationDate).format("ll") }}</span>
                    </td>
                    <td>
                      
                      <span v-if="order.status == 1" class="contract-name">Order <br/>Received</span>
                      <span v-if="order.status == 2" class="contract-name">Order <br/>in Process</span>
                      <span v-if="order.status == 3" class="contract-name">Order <br/>Rejected</span>
                      <span v-if="order.status == 4" class="contract-name">Order <br/>Cancelled</span>
                      <span v-if="order.status == 5" class="contract-name">Order <br/>Completed</span>
                    </td>
                    <td class="text-right">
                      <span class="contract-name">{{ toCurrencyString(order.totalPrice) }}</span>
                    </td>
                    <td class="text-right">
                      <span class="contract-name">{{ toCurrencyString(order.actualTotalPrice) }}</span>
                    </td>

                    <td>
                      <!-- <button type="button" class="btn btn-sm btn-secondary btn-add next-btn float-left" @click.prevent="removeFromCart(product.productInTheCartUuid, product.productId, index)">
                        <span>Remove</span>
                      </button> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loaderMixin from '~/mixins/loader'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import flatPicker from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'IndexVue',
  layout: 'storeLayout',
  auth: true,
  components: {
    ValidationObserver,
    ValidationProvider,
    flatPicker
  },
  mixins: [
    loaderMixin
  ],
  async asyncData (context) {
    const [ordersArr] = await Promise.all([
      context.app.$axios.get('/api/marketplace/order/?order[product]=asc&page_number=1&items_per_page=999&status=1')
    ])

    return {
      ordersArr: ordersArr.data
    }
  },
  data () {
    return {
      submenu: true,
      orderKey: 0,
      orders: '',
    }
  },
  created () {
    const orders = []
    const apiHost = this.$config.axios.baseURL

    this.ordersArr.forEach(function (orderItem) {    

      var partnerName = ''
      var partnerUrl = ''
      var partnerId = ''
      if (orderItem.product.marketplaceProductMarketplacePartner != null) {
        partnerName = orderItem.product.marketplaceProductMarketplacePartner.name
        partnerUrl = '/store/partners/' + orderItem.product.marketplaceProductMarketplacePartner.uuid
        partnerId = orderItem.product.marketplaceProductMarketplacePartner.id
      }

      const order = {
        orderId: orderItem.orderId,
        orderUrl: '/store/orders/' + orderItem.uuid,
        name: orderItem.product.name,
        partnerName: partnerName,
        partnerUrl: partnerUrl,
        partnerId: partnerId,
        creationDate: orderItem.createdAt,
        status: orderItem.orderStatus,
        totalPrice: orderItem.totalPrice,
        actualTotalPrice: orderItem.actualTotalPrice,

        orderUuid: orderItem.uuid,
        productId: orderItem.product.id,
        productUrl: '/store/products/' + orderItem.product.uuid,
      }

      orders.push(order)
    })

    this.orders = orders
    console.log(this.orders)

  },
  methods: {
    isNumber(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        evt.preventDefault();;
      } else {
        return true;
      }
    },
    toCurrencyString(number) {
      return number.toLocaleString('en-UK', { style: 'currency', currency: 'SGD' })
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
  h1{
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 30px;
    letter-spacing: 0.75px;
    text-align: left;
  }

  .company-search-bar {
    background: #EFF0F7;
    border-radius: 0px !important;
    border: none !important;
    width: 100% !important;
    height: 51px;

    select {
      margin-right: 10px !important;
      height: 51px;
    }
  }

  .product-card-mode {
    font-family: 'Roboto Condensed';
    font-style: normal;
    color: #313131;
    text-align: left;
    h3 {
      font-size: 18px;
    }
    span {
      font-size: 14px;
      font-weight: normal !important;
    }
    .text-area {
        height: 320px;
    }

    img {
      text-align: center;
    }
  }

  .modal-partner-invitation {
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

  .table{
    thead{
      th{
        border-top: none;
        border-bottom: none;
        color: #313131;
        font-weight: 600;
        font-size: 16px;
        padding-left: 5px;
        padding-right: 5px;
      }
    }
    tbody{
      tr:nth-of-type(odd){
        background: linear-gradient(0deg, #FAFAFA, #FAFAFA), linear-gradient(0deg,#FAFAFA,#FAFAFA),#FAFAFA;
      }
      td{
        color: #313131;
        font-weight: normal;
        font-size: 16px;
        letter-spacing: 0.75px;
        border: none;
        padding-left: 5px;
      }
    }

    .quantity-input {
      width: 100px;
      margin-right: 10px;
    }

    .contract-name {
      font-weight: 800;
    }
    .contract-type {
      font-size: 12px;
      color: black;
    }
    .contract-amount-wrapper {
      text-align: right;
    }
    .contract-amount {
      font-weight: 800;
    }
    .contract-payment-type {
      font-size: 12px;
      color: black;
    }
    .delete-payslip-btn {
      margin-top: -10px;
    }
    .badge{
      color: #000000;
      letter-spacing: 0.75px;
      font-weight: 600;
      font-size: 12px;
      border-radius: 4px;
      &.badge-0{
        background-color: #ff6842;
      }
      &.badge-1{
        background-color: #DAE6FF;
      }
      &.badge-2{
        background-color: #FFDD63;
      }
      &.badge-3{
        background-color: #aaff86d9;
      }
    }
    a{
      color: #3E4EDD;
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
      margin-right: 6px;
    }
  }
  div{
    &.divider{
      border-left: 1px solid #EFF7FF !important;
    }
  }
</style>
