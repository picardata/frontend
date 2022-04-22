<template>
  <div>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <div class="card border p-4">
          <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
            <form @submit.prevent="handleSubmit(post)">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="productStep1.name" name="Name">
                <div class="all-form-title bold-text form-field mb-4">
                  <span class="text-label">Name</span>
                  <input v-model="productStep1.name" type="text" class="form-input form-control" placeholder="">
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="productStep1.category" name="Category">
                <div class="all-form-title bold-text form-field mb-4">
                  <span class="text-label">Category</span>
                  <input v-model="productStep1.category" type="text" class="form-input form-control" placeholder="">
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="productStep1.price" name="Price">
                <div class="all-form-title bold-text form-field mb-4">
                  <span class="text-label">Price</span>
                  <input v-model="productStep1.price" type="text" class="form-input form-control" placeholder="">
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="productStep1.listingStartDate" name="Listing Start Date">
                <div class="all-form-title bold-text form-field mb-4">
                  <base-input class="text-label" label="Listing Start Date">
                    <flat-picker
                      v-model="productStep1.listingStartDate"
                      slot-scope="{focus, blur}"
                      :config="dateconfig"
                      class="form-control form-input datepicker"
                      @on-open="focus"
                      @on-close="blur"
                    />
                  </base-input>

                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="productStep1.listingExpiryDate" name="Listing Expiry Date">
                <div class="all-form-title bold-text form-field mb-4">
                  <base-input class="text-label" label="Listing Expiry Date">
                    <flat-picker
                      v-model="productStep1.listingExpiryDate"
                      slot-scope="{focus, blur}"
                      :config="dateconfig"
                      class="form-control form-input datepicker"
                      @on-open="focus"
                      @on-close="blur"
                    />
                  </base-input>

                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
      
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="productStep1.description" name="Product Description">
                <div class="all-form-title bold-text form-field mb-4">
                  <span class="text-label">Product Description</span>
                  <textarea v-model="productStep1.description" rows="6" type="text" class="form-input form-control" placeholder="Describe the product here..." />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="productStep1.offering" name="Offerings">
                <div class="all-form-title bold-text form-field mb-4">
                  <span class="text-label">Offering</span>
                  <textarea v-model="productStep1.offering" rows="6" type="text" class="form-input form-control" placeholder="What will customer get from buying this product?" />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="productStep1.termAndCondition" name="Term and Condition">
                <div class="all-form-title bold-text form-field mb-4">
                  <span class="text-label">Term and Condition</span>
                  <textarea v-model="productStep1.termAndCondition" rows="6" type="text" class="form-input form-control" placeholder="Term and Condition" />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <div :key="showMainImageKey" class="all-form-title bold-text form-field mb-4">
                <ValidationProvider
                  ref="logo"
                  v-slot="{ errors }"
                >
                  <span class="text-label">Product Profile Photo</span><br>
                  <span class="text-label-desc">
                    
                  </span>
                  <input
                    id="mainImage"
                    ref="mainImage"
                    type="file"
                    class="btn btn-sm btn-secondary btn-add-doc"
                    accept="image/*"
                    @change="handleMainImageUpload($event)"
                  >

                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

               <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="productStep1.marketplaceProductMarketplacePartner" name="Partner">
                <div v-if="isGlobeliseAdmin === true" class="all-form-title bold-text form-field mb-4">
                  <span class="text-label">Partner</span>
                  <select v-model="productStep1.marketplaceProductMarketplacePartner" class="form-control form-input">
                    <option v-for="(partner, key) in partnerArr" :key="partner + key" :value="partner.id">
                      {{ partner.name }}
                    </option>
                  </select>
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

            </form>
          </ValidationObserver>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import 'vue-country-region-select'
import flatPicker from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import 'vue-country-region-select'

export default {
  name: 'StepOne',
  components: {
    ValidationObserver,
    ValidationProvider,
    flatPicker
  },
  props: [
    'product',
    'partnerArr',
    'isGlobeliseAdmin'
  ],
  data () {
    return {
      productStep1: {
        name: this.product.name,
        category: this.product.category,
        listingStartDate: this.product.listingStartDate,
        listingExpiryDate: this.product.listingExpiryDate,
        price: this.product.price,
        description: this.product.description,
        offering: this.product.offering,
        termAndCondition: this.product.termAndCondition,
        marketplaceProductMarketplacePartner: this.product.marketplaceProductMarketplacePartner,
        mainImage: this.product.mainImage
      },
      dateconfig: {
        allowInput: true,
        altFormat: 'j F Y',
        altInput: true
      },
      crumbs: [
        {
          name: 'Create Contract',
          path: '/contracts'
        }
      ],
      country: '',
      submenu: true,
      showMainImageKey: 0,
    }
  },
  methods: {
    async post () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.product.name = this.productStep1.name
      this.product.category = this.productStep1.category
      this.product.listingStartDate = this.productStep1.listingStartDate
      this.product.listingExpiryDate = this.productStep1.listingExpiryDate
      this.product.price = this.productStep1.price
      this.product.description = this.productStep1.description
      this.product.offering = this.productStep1.offering
      this.product.termAndCondition = this.productStep1.termAndCondition
      this.product.marketplaceProductMarketplacePartner = this.productStep1.marketplaceProductMarketplacePartner
      this.product.mainImage = this.productStep1.mainImage

      return isValid
    },
    handleMainImageUpload (event) {
      this.productStep1.mainImage = event.target.files[0]
    },
    onFormChange () {
    }
  }
}
</script>
