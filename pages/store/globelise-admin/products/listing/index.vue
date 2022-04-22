<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <div class="container-fluid pt-6">
          <div class="row mt-3">
            <div class="col-12">
              <span class="form-title page-header">Product Listing</span>
            </div>
          </div>
          <div class="row mt-3 mb-4">
            <div class="col-12">
              <div>
                <div class="row mt-3">
                  <div class="col-8 mb-4 pl-0">
                    <form id="navbar-search-main" :key="productSearchKey" class="navbar-search form-inline navbar-search-light">
                      <div class="form-group" style="width: 100%">
                        <div class="input-group input-group-alternative company-search-bar">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-search" /></span>
                          </div>
                            <input class="form-control form-input" v-model="productSearchKeyword" placeholder="Type Product Name here..." @change="getProductList($event)">
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="col-2 mb-4 pr-0">
                    <button type="button" class="btn btn-lg btn-primary btn-add next-btn float-right" @click.prevent="getAllProductList()">
                      <span>Clear Search</span>
                    </button>
                  </div>

                  <div class="col-2 mb-4 pr-0">
                    <button type="button" class="btn btn-lg btn-primary btn-add next-btn float-right" @click.prevent="goToAddProductPage()">
                      <span>Add New Product</span>
                    </button>
                  </div>
                  <div class="col-12 card border pr-0 pl-0">
                    <table :key="productKey" class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">
                            Name
                          </th>
                          <th scope="col">
                            Partner Name
                          </th>
                          <th scope="col">
                            Category
                          </th>
                          <th scope="col">
                            Status
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
                          <td>
                            <span class="contract-name">{{ product.category }}</span>
                          </td>
                          <td>
                              <span v-if="product.productStatus == 3" class="contract-name">Approved</span>
                              <span v-else-if="product.productStatus == 2" class="contract-name">Pending for Approval</span>
                              <span v-else class="contract-name">Draft</span>
                          </td>
                          <td>
                            <div v-if="product.productStatus != 3">
                              <button type="button" class="btn btn-sm btn-secondary btn-add next-btn float-left" @click.prevent="approveProduct(product.uuid, index, product.partnerId)">
                                <span>Approve</span>
                              </button>
                            </div>
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
    const [productsRawData] = await Promise.all([
      context.app.$axios.get('/api/marketplace/product/?order[name]=asc&page_number=1&items_per_page=999&status=1')
    ])

    return {
      productsRawData: productsRawData.data
    }
  },
  data () {
    return {
      crumbs: [
        {
          name: 'Product List',
          path: '/payslips/globelise-admin/payslip-list'
        }
      ],
      submenu: true,
      productKey: 0,
      productSearchKey: 0,
      selectedCompany: '',
      products: '',
      productSearchKeyword: ''
    }
  },
  created () {
    const products = []
    const apiHost = this.$config.axios.baseURL

    this.productsRawData.forEach(function (productsRaw) {
      if (productsRaw.name != null && productsRaw.name != '') {

        var partnerName = '';
        var partnerUrl = '';
        var partnerId = '';
        if (productsRaw.marketplaceProductMarketplacePartner != null) {
          partnerName = productsRaw.marketplaceProductMarketplacePartner.name
          partnerUrl = '/store/partners/' + productsRaw.marketplaceProductMarketplacePartner.uuid
          partnerId = productsRaw.marketplaceProductMarketplacePartner.id
        }

        const product = {
          name: productsRaw.name,
          category: productsRaw.category,
          productStatus: productsRaw.productStatus,
          uuid: productsRaw.uuid,
          description: productsRaw.description,
          productUrl: '/store/products/' + productsRaw.uuid,
          partnerName: partnerName,
          partnerUrl: partnerUrl,
          partnerId: partnerId
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

      this.$axios.get('/api/marketplace/product/?order[name]=asc&page_number=1&items_per_page=999&status=1' + nameParameter)
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
                  description: partnerData.description,
                  productUrl: '/store/products/' + partnerData.uuid,
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
                  description: partnerData.description,
                  productUrl: '/store/products/' + partnerData.uuid,
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
