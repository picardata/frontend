<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <div class="container-fluid pt-6">
          <div class="row mt-3">
            <div class="col-12 form-title-wrapper">
              <span class="form-title page-header">Upload Payslips</span>
            </div>
          </div>
          <div class="row mt-3 contract-type-wrapper">
            <div class="col-3" />
            <div class="col-7">
              <div class="all-form-title mb-4">
                <div class="text-label-desc-special p-4">
                  Sample Format <br>
                  Files should follow the following format <br>
                  (This is so the system can identify the unique company/employee ID so that payslips will be uploaded in the correct designation)<br><br>

                  <span class="special-mention">companyID_employeeID_filename.pdf</span><br>
                  <span class="special-mention">Example: 34_29_SEP2022.pdf</span>
                </div>
              </div>

              <div class="card border p-4">
                <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
                  <form @submit.prevent="handleSubmit(post)">
                    <ValidationProvider
                      ref="additionalDocument"
                      name="image"
                    >
                      <div class="all-form-title bold-text form-field field-group">
                        <span class="text-label">Upload payslip</span>
                      </div>
                      <div class="all-form-title bold-text form-field">
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

                      <span id="successfullMessage" ref="successfullMessage" class="mt-4" style="display: none;">Payslis are uploaded successfully</span>
                    </ValidationProvider>
                  </form>
                </ValidationObserver>
              </div>
              <button type="button" class="btn btn-lg btn-secondary btn-add next-btn" @click.prevent="uploadPayslip">
                Upload
              </button>
              <button type="button" class="btn btn-lg btn-secondary btn-add next-btn" @click.prevent="modals.employeeList = true">
                Get Company ID
              </button>
              <button type="button" class="btn btn-lg btn-secondary btn-add next-btn" @click.prevent="modals.uploadedPayslips = true">
                View Uploaded Payslips
              </button>
            </div>
          </div>
          <hr class="blue-divider">
          <div class="row mt-3 mb-4">
            <div class="col-12" />
          </div>
          <modal :show.sync="modals.uploadedPayslips" size="lg" modal-classes="modal-contract-details">
            <template slot="header">
              <h2 class="mb-0">
                Uploaded Payslips
              </h2>
            </template>
            <UploadedPayslipList :uploaded-payslips-key="uploadedPayslipsKey" :uploaded-payslips="uploadedPayslips" />
            <template slot="footer">
              <button type="button" class="btn btn-lg btn-primary btn-add next-btn" @click.prevent="modals.uploadedPayslips = false">
                <span>Close</span>
              </button>
            </template>
          </modal>
          <modal :show.sync="modals.employeeList" size="lg" modal-classes="modal-contract-details">
            <template slot="header">
              <h2 class="mb-0">
                Employee List
              </h2>
            </template>
            <EmployeeList :employee-list-key="employeeListKey" :companies="companies" />
            <template slot="footer">
              <button type="button" class="btn btn-lg btn-primary btn-add next-btn" @click.prevent="modals.employeeList = false">
                <span>Close</span>
              </button>
            </template>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import loaderMixin from '~/mixins/loader'
import UploadedPayslipList from '~/components/pages/payslips/UploadedPayslipList'
import EmployeeList from '~/components/pages/payslips/EmployeeList'

export default {
  name: 'IndexVue',
  layout: 'argon',
  auth: true,
  components: {
    ValidationObserver,
    ValidationProvider,
    UploadedPayslipList,
    EmployeeList
  },
  mixins: [
    loaderMixin
  ],
  async asyncData (context) {
    const [companies] = await Promise.all([
      context.app.$axios.get('/api/companies/?order[name]=asc&page_number=1&items_per_page=999&status=1')
    ])

    return {
      companies: companies.data
    }
  },
  data () {
    return {
      uploadedPayslipsKey: 1,
      employeeListKey: 1,
      uploadedPayslips: [],
      newUploadedPayslips: [],
      crumbs: [
        {
          name: 'Upload Payslip',
          path: '/payslips/upload-payslips'
        }
      ],
      modals: {
        uploadedPayslips: false,
        employeeList: false
      },
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
        const payslips = this.uploadedPayslips

        this.newUploadedPayslips.forEach(function (newUploadedPayslip) {
          const originalFileName = newUploadedPayslip.name.replace(/\.[^/.]+$/, '')
          const originalFileNameArr = originalFileName.split('_')

          const formData = new FormData()
          formData.append('payslipDocument', newUploadedPayslip)
          formData.append('name', originalFileNameArr[2])
          formData.append('type', 'Upload')
          formData.append('company', originalFileNameArr[0])
          formData.append('employee', originalFileNameArr[1])
          formData.append('status', 1)

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
              employeeId: data.employee.id,
              url: apiHost + '/uploads/payslip_document/' + data.filename,
              uuid: data.uuid,
              companyId: data.company.id
            }

            payslips.push(payslip)
          }).catch(() => {
            return false
          })
        })
        this.uploadedPayslips = payslips
        this.$refs.successfullMessage.style.display = 'block'
        this.modals.uploadedPayslips = true
      }

      this.uploadedPayslipsKey++
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

    .text-label-desc-special {
      display: block;
      font-size: 14px;
      color: #2E4823;
      background-color: #eaf1d2;
      text-align: left;
      line-height: 20px;
      .special-mention {
        font-family: 'Roboto', sans-serif;
      }
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
