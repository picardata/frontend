<template>
  <div class="row ml-2">
    <div v-if="detailManagePage || detailLibraryPage || detailIntegratedPage" :class="{'col-12': true, 'back-arrow-parent': true}">
      <!-- <nuxt-link :to="generateParentPath" class="back-arrow"> -->
      <a
        class="pd-icon pdicon-Back-Arrow picardata-arrow"
        :href="detailIntegratedPage ? '/apps/integrated-apps' : generateParentPath"
      />
      <!-- </nuxt-link> -->
    </div>
    <div v-if="detailPage || detailLibraryPage" :class="{'col-12': true, 'margin-top': detailLibraryPage}">
      <img class="logo" :src="logo" alt="Logo">
    </div>
    <div :class="{ 'col-8': detailPage || (detailLibraryPage && isIntegrated), 'col-12': (detailLibraryPage && !isIntegrated) || (!detailPage && !detailLibraryPage), 'detail-name-parent': detailManagePage, 'margin-top': detailLibraryPage }">
      <h1>{{ generateManage }} <span v-if="detailManagePage" class="detail-name">{{ name }}</span><span v-else>{{ name }}</span></h1>
    </div>
    <div v-if="detailPage || (detailLibraryPage && isIntegrated)" :class="{'col-4': true, 'margin-top': detailLibraryPage}">
      <nuxt-link :to="customManageUrl ? customManageUrl : manageLink" class="text-primary fa-pull-right btn">
        <font-awesome-icon :icon="['fas', 'cogs']" />
        Manage app
      </nuxt-link>
    </div>
    <div v-if="detailPage || detailManagePage || (detailLibraryPage && isIntegrated)" class="row mt-3 ml-3">
      <p class="text-default mt-2 mr-2">
        <font-awesome-icon class="text-success" :icon="['fas', 'check']" />
        Data appear on Dashboard
      </p>
      <div class="divider" style="margin-left: 14px;margin-top: 14px" />
      <nuxt-link to="#" class="text-primary btn">
        <font-awesome-icon :icon="['fas', 'plus']" />
        Add chart to Dashboard
      </nuxt-link>
    </div>
    <div v-if="withIntegrationButton || (detailLibraryPage && !isIntegrated)" class="row mt-3 ml-3">
      <a href="#" class="text-primary btn" @click.prevent="modals.modal0 = true">
        <font-awesome-icon :icon="['fas', 'plus']" />
        Add to Picardata
      </a>
    </div>
    <div class="col-12">
      <p v-if="detailPage || detailManagePage">
        {{ detail }}
      </p>
      <p v-else>
        {{ instruction }}
      </p>
    </div>
    <!-- <div v-if="detailPage || detailLibraryPage" class="col-12">
      <div class="card-profile-stats d-flex">
        <div class="p-0">
          <span class="heading"><i class="fa fa-download" /> 22</span>
        </div>
        <div class="divider" />
        <div class="p-0">
          <span class="heading"><i class="fa fa-heart text-danger" /> 10</span>
        </div>
      </div>
    </div> -->
    <modal :show.sync="modals.modal0">
      <template slot="header">
        <h5 id="exampleModalLabel" class="modal-title" />
      </template>
      <div>
        <img
          slot="image"
          class="card-img-top card-img-logo"
          :src="logo"
          alt="Card image cap"
        >
        <p class="mt-3 notify-text font-weight-bolder">
          Picardata wants to access your <span class="text-primary">{{ name }}</span> account
        </p>
        <p class="content-text">
          This will allow Picardata to:
        </p>
        <ul class="content-text">
          <li>View and access your data</li>
        </ul>
      </div>
      <template slot="footer">
        <base-button tag="a" type="primary" target="_blank" :href="oauthUrl">
          Integrate now
        </base-button>
      </template>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'ApplicationDetail',
  props: {
    logo: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    detail: {
      type: String,
      default: ''
    },
    instruction: {
      type: String,
      default: ''
    },
    customManageUrl: {
      type: String,
      default: ''
    },
    detailPage: {
      type: Boolean,
      default: true
    },
    detailManagePage: {
      type: Boolean,
      default: false
    },
    detailLibraryPage: {
      type: Boolean,
      default: false
    },
    detailIntegratedPage: {
      type: Boolean,
      default: false
    },
    isIntegrated: {
      type: Boolean,
      default: false
    },
    withIntegration: {
      type: Boolean,
      default: true
    },
    withIntegrationButton: {
      type: Boolean,
      default: false
    },
    oauthUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      modals: {
        modal0: false
      }
    }
  },
  computed: {
    manageLink () {
      return this.$route.path + '/manage'
    },
    generateParentPath () {
      const currentPath = this.$route.path.split('/')
      currentPath.pop()
      console.log('parent path = ')
      console.log(currentPath)
      const newPath = currentPath.join('/')
      console.log('new path = ')
      console.log(newPath)
      return newPath
    },
    generateManage () {
      return this.detailManagePage ? 'Manage' : ''
    }
  }
}
</script>

<style scoped>
.picardata-arrow {
  color: #14142B;
  font-size: 200%;
}

.back-arrow-parent {
  margin-top: 1%;
}

.detail-name-parent {
  margin-top: 2%;
}

img.logo {
  width: 100px;
}

.detail-name {
  color: #2534B6;
}

.margin-top {
  margin-top: 2%;
}

</style>
