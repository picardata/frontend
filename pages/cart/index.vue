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
                      <span class="contract-name">{{ product.quantity }}</span>
                    </td>

                    <td class="text-right">
                      <span class="contract-name">{{ toCurrencyString(product.totalPrice) }}</span>
                    </td>

                    <td>
                      <span class="contract-name"></span>
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
    const [productsInTheCartArrData] = await Promise.all([
      context.app.$axios.get('/api/marketplace/shopping/cart/?order[product]=asc&page_number=1&items_per_page=999&status=1&createdBy=2')
    ])

    return {
      productsInTheCartArr: productsInTheCartArrData.data
    }
  },
  data () {
    return {
      submenu: true,
      productKey: 0,
      selectedCompany: '',
      products: '',
    }
  },
  created () {
    const products = []
    const apiHost = this.$config.axios.baseURL

    this.productsInTheCartArr.forEach(function (productInTheCart) {      
      console.log(productInTheCart)

      if (productInTheCart.product.name != null && productInTheCart.product.name != '') {
        var partnerName = ''
        var partnerUrl = ''
        var partnerId = ''
        if (productInTheCart.product.marketplaceProductMarketplacePartner != null) {
          partnerName = productInTheCart.product.marketplaceProductMarketplacePartner.name
          partnerUrl = '/store/partners/' + productInTheCart.product.marketplaceProductMarketplacePartner.uuid
          partnerId = productInTheCart.product.marketplaceProductMarketplacePartner.id
        }

        var totalPrice = 0
        var quantity = Number(productInTheCart.quantity)
        var unitPrice = Number(productInTheCart.unitPrice)

        if (typeof unitPrice == 'number' && typeof quantity == 'number') {
          quantity = productInTheCart.quantity
          unitPrice = productInTheCart.unitPrice
          totalPrice = quantity * unitPrice
        }

        const product = {
          name: productInTheCart.product.name,
          partnerName: partnerName,
          uuid: productInTheCart.product.uuid,
          unitPrice: unitPrice,
          quantity: quantity,
          productUrl: '/store/products/' + productInTheCart.product.uuid,
          partnerUrl: partnerUrl,
          partnerId: partnerId,
          totalPrice: totalPrice,
        }

        products.push(product)
      }
    })
    this.products = products

  },
  methods: {
    approveProduct(paramUuid, paramIndex, paramPartnerId) {

      const formData = new FormData()
      formData.append('marketplaceProductMarketplacePartner', paramPartnerId)
      formData.append('productStatus', 3)
      
      this.$axios.$post('/api/marketplace/product/' + paramUuid,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((data) => {
          const currentProducts = this.products
          const products = []
          

          currentProducts.forEach(function (product) {
            
            if (product.uuid == paramUuid) {
              product.productStatus = 3
            }

            products.push(product)
          })

          this.products = products
          this.productKey++
        return true
      }).catch((e) => {
        return false
      })

    },
    goToAddProductPage () {
      window.location.href = '/store/products/create'
    },
    getProductList (event) {
      console.log('getProductList')
      this.productSearchKeyword = event.target.value
      var nameParameter = '' 
      
      if (this.partnerSearchKeyword != '') {
        nameParameter = '&name=' + this.productSearchKeyword
      }

      this.$axios.get('/api/marketplace/product/?order[name]=asc&page_number=1&items_per_page=999&productStatus=3&status=1' + nameParameter)
        .then((partnerDatas) => {
          const products = []
          const apiHost = this.$config.axios.baseURL

          if (partnerDatas.data.length > 0) {
            partnerDatas.data.forEach(function (partnerData) {
        
              if (partnerData.name != null && partnerData.name != '') {
                var partnerName = '';
                var partnerUrl = '';
                var partnerId = '';

                if (partnerData.marketplaceProductMarketplacePartner != null) {
                  partnerName = partnerData.marketplaceProductMarketplacePartner.name
                  partnerUrl = '/store/partners/' + partnerData.marketplaceProductMarketplacePartner.uuid
                  partnerId = partnerData.marketplaceProductMarketplacePartner.id
                }

                const product = {
                  name: partnerData.name,
                  category: partnerData.category,
                  productStatus: partnerData.productStatus,
                  uuid: partnerData.uuid,
                  description: partnerData.description.slice(0, 100),
                  price: partnerData.price,
                  productUrl: '/store/products/' + partnerData.uuid,
                  productImageUrl: apiHost + '/uploads/marketplace_product_main_image/' + partnerData.mainImageFilename,
                  partnerName: partnerName,
                  partnerUrl: partnerUrl,
                  partnerId: partnerId
                }

                products.push(product)
              }
            })
          }

          this.products = products
          this.productKey++
        }).catch(() => {
          return false
        })
    },
    getAllProductList () {
      this.$axios.get('/api/marketplace/product/?order[name]=asc&page_number=1&items_per_page=999&status=1')
        .then((partnerDatas) => {
          const products = []
          const apiHost = this.$config.axios.baseURL
          if (partnerDatas.data.length > 0) {
            partnerDatas.data.forEach(function (partnerData) {
              if (partnerData.name != null && partnerData.name != '') {
                var partnerName = '';
                var partnerUrl = '';
                var partnerId = '';

                if (partnerData.marketplaceProductMarketplacePartner != null) {
                  partnerName = partnerData.marketplaceProductMarketplacePartner.name
                  partnerUrl = '/store/partners/' + partnerData.marketplaceProductMarketplacePartner.uuid
                  partnerId = partnerData.marketplaceProductMarketplacePartner.id
                }

                const product = {
                  name: partnerData.name,
                  category: partnerData.category,
                  productStatus: partnerData.productStatus,
                  uuid: partnerData.uuid,
                  description: partnerData.description.slice(0, 100),
                  price: partnerData.price,
                  productUrl: '/store/products/' + partnerData.uuid,
                  productImageUrl: apiHost + '/uploads/marketplace_product_main_image/' + partnerData.mainImageFilename,
                  partnerName: partnerName,
                  partnerUrl: partnerUrl,
                  partnerId: partnerId
                }

                products.push(product)
              }
            })
          }
          this.selectedCompany = ''
          this.products = products
          this.productKey++
          this.productSearchKey++
        }).catch(() => {
          return false
        })
    },
    toCurrencyString(number){
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
      margin-rigt: 6px;
    }
  }
  div{
    &.divider{
      border-left: 1px solid #EFF7FF !important;
    }
  }
</style>
