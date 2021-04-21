<template>
  <div :class="'row p-0 ' + classAdded">
    <div v-for="(integration, index) in integrations" :key="integration.id" :class="appClass">
      <card>
        <div class="text-center p-3">
          <img
            slot="image"
            class="card-img-top app-img"
            :src="integration.application.logo"
            :alt="integration.application.name"
          >
        </div>
        <h5 class="card-title">
          {{ integration.application.name }}
        </h5>
        <div class="card-body p-0">
          <div class="row">
            <div class="col-xl-2 p-3">
              <i class="fa fa-check text-success" />
            </div>
            <div class="col-xl-10 pt-3 pb-3">
              <p>
                Data Appear on Dashboard
              </p>
            </div>
          </div>
        </div>
        <div class="text-center">
          <base-button outline type="primary" @click="appClick(index)">
            View Picardata
          </base-button>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItegratedAppsList',
  props: {
    classAdded: {
      type: String,
      default: 'col-xl-9'
    },
    appClass: {
      type: String,
      default: 'col-4'
    },
    totalPage: {
      type: Number,
      default: 1
    },
    currentPage: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      modals: {
        modal0: false
      },
      totalIntegrations: [],
      integrations: []
    }
  },
  mounted () {
    this.$axios.get('/api/integrations/?order%5Bid%5D=desc')
      // eslint-disable-next-line no-return-assign
      .then((data) => {
        console.log(data)
        this.totalIntegrations = data.data.filter(x => x.status === 1)
        // this.totalPage = 5;

        // this.integrations = this.totalIntegrations;
        // this.integrations  =
        this.$emit('setTotalPage',
          Math.ceil(this.totalIntegrations.length / 5),
          this.totalIntegrations,
          this.setIntegration)
        this.$emit('setCurrentPage',
          1)
        // for(let i=)
      }).catch(
      // eslint-disable-next-line no-console
        (e) => {
          console.log(e)
        }
      )
  },
  methods: {
    appClick (index) {
      const selectedIntegration = this.integrations[index]
      this.$router.push('/apps/integrated-apps/' + selectedIntegration.id + '/' + selectedIntegration.application.appCode.replace('.', '-'))
    },
    setIntegration (integration) {
      this.integrations = integration
    }
  }
}
</script>

<style scoped>
p.notify-text {
  font-size: 24px;
}

ul li::marker {
  color: #2534B6; /* Change the color */
}

.content-text {
  font-size: 18px;
}

div.divider {
  border-left: 1px solid #C4C4C4;
  width: 1px;
  height: 14px;
  margin: 7px 0 0 0;
  padding: 0 14px 0 0;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
}

.heading {
  font-weight: 500;
}

.app-img {
  width: 80px;
}
</style>
