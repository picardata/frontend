<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <div class="container-fluid pt-6">
          <div class="row">
            <div class="col-12">
              <span class="form-title page-header" />
            </div>
          </div>

          <div class="row">
            <div class="col-12 mb-4">
              <span class="form-title page-header">My Cart</span>
            </div>
          </div>

          <div class="row">
            <div class="col-12 card border pr-0 pl-0">
              <table :key="productKey" class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">
                      Name
                    </th>
                    <th scope="col">
                      Company
                    </th>
                    <th scope="col" class="text-right">
                      Unit Price
                    </th>
                    <th scope="col" class="text-right">
                      Quantity
                    </th>
                    <th scope="col" class="text-right">
                      Total Price
                    </th>
                    <th scope="col">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, index) in products" :key="index">
                    <td>
                      <a :href="`${product.productUrl}`" target="_blank">
                        <span class="contract-name">{{ product.name }}</span>
                      </a>
                    </td>
                    <td>
                      <a :href="`${product.partnerUrl}`" target="_blank">
                        <span class="contract-name">{{ product.partnerName }}</span>
                      </a>
                    </td>

                    <td class="text-right">
                      <span class="contract-name">{{ toCurrencyString(product.unitPrice) }}</span>
                    </td>

                    <td class="text-right">
                      <input v-model="product.quantity" class="quantity-input" @keypress="isNumber($event)">
                      <button type="button" class="btn btn-sm btn-tertiary btn-add next-btn float-right" @click.prevent="updateQuantity(product.productInTheCartUuid, product.productId, product.quantity, index)">
                        <span>Update</span>
                      </button>
                    </td>

                    <td class="text-right">
                      <span class="contract-name">{{ toCurrencyString(product.productPrice) }}</span>
                    </td>

                    <td>
                      <button type="button" class="btn btn-sm btn-secondary btn-add next-btn float-left" @click.prevent="removeFromCart(product.productInTheCartUuid, product.productId, index)">
                        <span>Remove</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table :key="checkoutKey" class="table table-striped">
                <tbody>
                  <tr>
                    <td class="text-right" />
                    <td class="text-right" />
                    <td class="text-right" />
                    <td class="text-right">
                      <span class="contract-name">
                        Total ({{ totalItem }} item): {{ toCurrencyString(totalPrice) }}
                      </span>
                    </td>
                    <td class="text-right">
                      <button type="button" class="btn btn-md btn-primary btn-add next-btn" @click.prevent="checkout()">
                        <span>Checkout</span>
                      </button>
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

export default {
  name: 'IndexVue',
  layout: 'storeLayout',
  auth: true,
  mixins: [
    loaderMixin
  ],
  async asyncData (context) {
    const [productsInTheCartArrData] = await Promise.all([
      context.app.$axios.get('/api/marketplace/shopping/cart/?order[product]=asc&page_number=1&items_per_page=999&status=1&createdBy=' + context.$auth.user.id)
    ])

    return {
      productsInTheCartArr: productsInTheCartArrData.data
    }
  },
  data () {
    return {
      submenu: true,
      productKey: 0,
      checkoutKey: 0,
      selectedCompany: '',
      products: '',
      totalPrice: 0,
      totalItem: 0
    }
  },
  created () {
    const products = []

    let totalPrice = 0
    let totalItem = 0
    this.productsInTheCartArr.forEach(function (productInTheCart) {
      if (productInTheCart.product.name !== null && productInTheCart.product.name !== '') {
        let partnerName = ''
        let partnerUrl = ''
        let partnerId = ''
        if (productInTheCart.product.marketplaceProductMarketplacePartner !== null) {
          partnerName = productInTheCart.product.marketplaceProductMarketplacePartner.name
          partnerUrl = '/store/partners/' + productInTheCart.product.marketplaceProductMarketplacePartner.uuid
          partnerId = productInTheCart.product.marketplaceProductMarketplacePartner.id
        }

        let productPrice = 0
        let quantity = Number(productInTheCart.quantity)
        let unitPrice = Number(productInTheCart.unitPrice)

        if (typeof unitPrice === 'number' && typeof quantity === 'number') {
          quantity = productInTheCart.quantity
          unitPrice = productInTheCart.unitPrice
          productPrice = quantity * unitPrice

          totalPrice = Number(totalPrice) + productPrice
          totalItem++
        }

        const product = {
          name: productInTheCart.product.name,
          partnerName,
          productInTheCartUuid: productInTheCart.uuid,
          productId: productInTheCart.product.id,
          unitPrice,
          quantity,
          productUrl: '/store/products/' + productInTheCart.product.uuid,
          partnerUrl,
          partnerId,
          productPrice,
          id: productInTheCart.id
        }

        products.push(product)
      }
    })

    this.products = products
    this.totalPrice = totalPrice
    this.totalItem = totalItem
  },
  methods: {
    async removeFromCart (uuid, productId, paramIndex) {
      const formData = new FormData()
      formData.append('status', 0)
      formData.append('product', productId)

      await this.$axios.$post('/api/marketplace/shopping/cart/' + uuid,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(() => {
        this.products.splice(paramIndex, 1)
        this.productKey++

        this.checkoutKey++
        return true
      }).catch(() => {
        return false
      })
    },
    async updateQuantity (uuid, productId, quantity) {
      const formData = new FormData()
      formData.append('status', 1)
      formData.append('product', productId)
      formData.append('quantity', quantity)

      await this.$axios.$post('/api/marketplace/shopping/cart/' + uuid,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(() => {
        const products = []
        let totalPrice = 0
        let totalItem = 0
        this.products.forEach(function (orderItem) {
          const productPrice = orderItem.quantity * orderItem.unitPrice

          totalPrice = Number(totalPrice) + productPrice
          totalItem++

          const product = {
            name: orderItem.name,
            partnerName: orderItem.partnerName,
            productInTheCartUuid: orderItem.productInTheCartUuid,
            productId: orderItem.productId,
            unitPrice: orderItem.unitPrice,
            quantity: orderItem.quantity,
            productUrl: orderItem.productUrl,
            partnerUrl: orderItem.partnerUrl,
            partnerId: orderItem.partnerId,
            productPrice,
            id: orderItem.id
          }

          products.push(product)
        })

        this.products = products
        this.totalPrice = totalPrice
        this.totalItem = totalItem

        this.productKey++
        this.checkoutKey++
        return true
      }).catch(() => {
        return false
      })
    },
    checkout () {
      const axiosCall = this.$axios
      this.products.forEach(function (orderItem) {
        const orderId = 'PO/' + orderItem.partnerId + '/' + orderItem.id
        const orderFormData = new FormData()
        orderFormData.append('orderId', orderId)
        orderFormData.append('product', orderItem.productId)
        orderFormData.append('unitPrice', orderItem.unitPrice)
        orderFormData.append('quantity', orderItem.quantity)
        orderFormData.append('totalPrice', orderItem.productPrice)
        orderFormData.append('actualTotalPrice', orderItem.productPrice)
        orderFormData.append('orderStatus', '1')

        axiosCall.$post('/api/marketplace/order/',
          orderFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(() => {
          const productFormData = new FormData()
          productFormData.append('status', 0)
          productFormData.append('product', orderItem.productId)

          axiosCall.$post('/api/marketplace/shopping/cart/' + orderItem.productInTheCartUuid,
            productFormData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then(() => {

          }).catch(() => {
            return false
          })
        }).catch(() => {
          return false
        })
      })

      this.products = []
      this.productKey++
      this.checkoutKey++
      this.totalItem = 0
      this.totalPrice = 0
    },
    isNumber (evt) {
      evt = (evt) || window.event
      const charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    toCurrencyString (number) {
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
