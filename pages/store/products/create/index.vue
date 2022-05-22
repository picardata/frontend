<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <div class="container-fluid pt-6">
          <div class="row mt-3">
            <div class="col-12 form-title-wrapper">
              <span class="form-title page-header">Product Creation Form</span>
            </div>
          </div>
          <div class="row mt-6 contract-type-wrapper">
            <div class="col-1" />
            <div class="col-10">
              <div class="row">
                <div class="col-12">
                  <div v-if="step === 1">
                    <step1 ref="step1" :product="product" :partnerArr="partnerArr" :isGlobeliseAdmin="isGlobeliseAdmin" @finishSaveProfile="next" @formProfileChange="changeFormComplete($event)" />
                  </div>
                  
                  <div class="contract-type-actions-wrapper row">
                    <div v-if="isGlobeliseAdmin === true" class="col-3"></div>
                    <div v-else class="col-6"></div>
                    <div class="col-3">
                      <button type="button" class="btn btn-lg btn-secondary btn-add next-btn" @click.prevent="next">
                        Save as Draft
                      </button>
                    </div>

                    <div class="col-3">
                      <button type="button" class="btn btn-lg btn-secondary btn-add next-btn" @click.prevent="submitForApproval">
                        Submit for Approval
                      </button>
                    </div>
                    <!-- <div v-if="isGlobeliseAdmin === true" class="col-3">
                      <button type="button" class="btn btn-lg btn-secondary btn-add next-btn" @click.prevent="approve">
                        Approve
                      </button>
                    </div> -->
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
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import 'vue-country-region-select'
import step1 from '@/components/store/products/create/step1'

export default {
  layout: 'storeLayout',
  auth: true,
  components: {
    step1
  },
  async asyncData (context) {
    return await context.app.$axios.$get('/api/users/me')
      .then((data) => {
        console.log(data)
        return data
      })
      .catch(e => console.log(e))
  },

  data () {
    return {
      step: 1,
      product: {
        name: '',
        category: '',
        listingStartDate: '',
        listingExpiryDate: '',
        price: '',
        description: '', 
        offering: '',
        termAndCondition: '',
        callToAction: '',
        currency: '',
        marketplaceProductMarketplacePartner: '',
        mainImage: '',
        productStatus: '1',
        creatorRole: 'partner'
      },
      createdProduct: '',
      crumbs: [],
      submenu: true,
      isGlobeliseAdmin: this.$auth.user.userProfile.employees[0].isGlobeliseAdmin,
      partnerArr: []
    }
  },
  created () {
    if (Object.hasOwnProperty.call(this.$auth.user, 'isGlobeliseAdmin')) {
      this.isGlobeliseAdmin = this.$auth.user.isGlobeliseAdmin
    }

    if (this.isGlobeliseAdmin) {
      this.product.creatorRole = 'globelise_admin'
    }
      
    this.$axios.get('/api/marketplace/partner/?order[name]=asc&page_number=1&items_per_page=999&status=1')
      .then((partnerRawsData) => {
        const partners = []

        partnerRawsData.data.forEach(function (partnerRaw) {
          if (partnerRaw.name != null) {
            const partner = {
              name: partnerRaw.name,
              uuid: partnerRaw.uuid,
              id: partnerRaw.id,
            }

            partners.push(partner)
          }
        })

        this.partnerArr = partners
      }).catch(() => {
        return false
      })
  },
  methods: {
    changeFormComplete (complete) {
      this.isProfileCompleted = complete
    },
    submitForApproval() {
      this.product.productStatus = '2'
      this.next()
    },
    approve() {
      this.product.productStatus = '3'
      this.next()
    },
    async next () {
      if (this.step === 1) {
        const isValid = await this.$refs.step1.post()

        if (!isValid) {
          return false
        }

        if (this.product.marketplaceProductMarketplacePartner == '') {
          const userMe = await this.$axios.get('/api/users/me')
          this.product.marketplaceProductMarketplacePartner = userMe.data.employees[0].company.companyMarketplacePartner.id
        }
        
        const formData = new FormData()
        formData.append('name', this.product.name)
        formData.append('category', this.product.category)
        formData.append('listingStartDate', this.product.listingStartDate)
        formData.append('listingExpiryDate', this.product.listingExpiryDate)
        formData.append('price', this.product.price)
        formData.append('description', this.product.description)
        formData.append('offering', this.product.offering)
        formData.append('termAndCondition', this.product.termAndCondition)
        formData.append('currency', this.product.currency)
        formData.append('callToAction', this.product.callToAction)
        formData.append('mainImage', this.product.mainImage)
        formData.append('productStatus', this.product.productStatus)
        formData.append('creatorRole', this.product.creatorRole)
        formData.append('marketplaceProductMarketplacePartner', this.product.marketplaceProductMarketplacePartner)

        this.$axios.$post('/api/marketplace/product/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((data) => {
          this.createdProduct = data

          this.$router.push('/store/products/' + this.createdProduct.uuid)
          return true
        }).catch((e) => {
          const errors = {}

          Object.entries(e.response.data.errors).forEach(function (value) {
            const key = value[0]
            errors[key] = value[1]
          })

          this.$refs.form.setErrors(errors)
          return false
        })
      }
    },
    back () {
      this.step--
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

    h3 {
      font-size: 18px;
    }

    .text-label {
      font-size: 16px;
      font-weight: 800 !important;
      color: #313131;
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
