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
            <div class="col-12">
              <span class="form-title">Upload Payslips</span>
            </div>
          </div>
          <div class="row mt-3 mb-4">
            <div class="col-12">
              <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
                <form @submit.prevent="handleSubmit(post)">
                  <ValidationProvider
                    ref="additionalDocument"
                    name="image"
                  >
                    <div class="all-form-title bold-text form-field mb-4">
                      <span class="text-label" /><br>
                      <span class="text-label-desc">
                        This feature allows you to upload payslip files for company and employees. You may upload 100 files at a time and each file should be not more than 2MB in size. To upload payslips for employees, files should follow the following pattern format:
                      </span><br><br>
                      <span style="font-weight: 800;font-size: 16px;"><b>companyID_employeeID_filename.pdf</b></span><br>
                      <span style="font-weight: 800;font-size: 16px;">
                        <b>Example: 34_29_SEP2022.pdf</b>
                      </span><br><br>
                      <input
                        id="additionalDocument"
                        ref="additionalDocument"
                        type="file"
                        class="btn btn-sm btn-secondary btn-add-doc"
                        accept="application/pdf"
                        multiple
                        @change="handlePayslipUpload($event)"
                      >
                    </div>

                    <span id="successfullMessage" ref="successfullMessage" style="display: none;">Payslips are uploaded successfully</span><br><br>
                  </ValidationProvider>
                </form>
              </ValidationObserver>
              <button type="button" class="btn btn-lg btn-primary btn-add next-btn" @click.prevent="uploadPayslip">
                Upload
              </button>
            </div>
          </div>
          <hr class="blue-divider">
          <div class="row mt-3 mb-4">
            <div class="col-12">
              <!--              <PayslipList :key="id" :uploaded-payslips="uploadedPayslips" />-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import loaderMixin from '~/mixins/loader'

export default {
  name: 'IndexVue',
  layout: 'argon',
  auth: true,
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [
    loaderMixin
  ],
  data () {
    return {
      id: 1,
      uploadedPayslips: [],
      newUploadedPayslips: [],
      crumbs: [
        {
          name: 'Payslip List',
          path: '/payslips/upload-payslips'
        }
      ],
      submenu: true
    }
  },
  methods: {
    onFormChange () {
    },
    handlePayslipUpload (event) {
      this.newUploadedPayslips = event.target.files
    },
    uploadPayslip () {
      if (this.newUploadedPayslips.length > 0) {
        const axiosCall = this.$axios
        const apiHost = this.$config.axios.baseURL
        const payslips = []

        this.newUploadedPayslips.forEach(function (newUploadedPayslip) {
          const originalFileName = newUploadedPayslip.name.replace(/\.[^/.]+$/, '')
          const originalFileNameArr = originalFileName.split('_')

          const formData = new FormData()
          formData.append('payslipDocument', newUploadedPayslip)
          formData.append('name', originalFileNameArr[2])
          formData.append('type', 'Upload')
          formData.append('company', originalFileNameArr[0])
          formData.append('employee', originalFileNameArr[1])

          axiosCall.$post('/api/payslip/',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then((data) => {
            const payslip = {
              name: data.name,
              filename: data.filename,
              employee: data.employee.userProfile.firstname,
              url: apiHost + '/uploads/payslip_document/' + data.filename
            }

            payslips.push(payslip)
          }).catch(() => {
            return false
          })
        })
        this.uploadedPayslips = payslips
        this.$refs.successfullMessage.style.display = 'block'
      }
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
