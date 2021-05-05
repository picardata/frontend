<template>
  <div class="row" style="margin-bottom: 2%;">
    <div class="col-md-12 ">
      <div class="picardata-paging float-right">
        <div class="col-sm" @click="setPrevious()">
          <span
            v-if="isLastForPrev()"
            class="pd-icon pdicon-Chevron-Left nav-last picardata-nav picardata-nav-inactive"
          />
          <span
            v-else
            class="pd-icon pdicon-Chevron-Left picardata-nav"
          />
        </div>
        <span
          v-for="n in getTotalPage()"
          :key="n"
          class="col-sm picardata-paging-text"
          @click="setCurrentPage(n)"
        >
          <span
            v-if="isCurrentPage(n)"
            class="picardata-paging-active"
          >
            {{ n }}
          </span>
          <span v-else>{{ n }}</span>
        </span>
        <div class="col-sm" @click="setNext()">
          <span v-if="isLastForNext()" class="pd-icon pdicon-Chevron-Right nav-last picardata-nav picardata-nav-inactive" />
          <span v-else class="pd-icon pdicon-Chevron-Right picardata-nav" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// import ItegratedAppsList from '@/components/Application/IntegratedAppsList'
export default {
  name: 'Paging',
  layout: 'argon',
  // components: { ItegratedAppsList },
  data () {
    return {
      // crumbs: [
      //   {
      //     name: 'Apps',
      //     path: '/apps'
      //   },
      //   {
      //     name: 'Integrated Apps',
      //     path: '/apps/integrated-apps'
      //   }
      // ],
      // totalPage: 1,
      // currentPage: 1,
      // size: 5,
      // modals: {
      //   modal0: false
      // },
      // totalIntegrations: [],
      // integrations: []
    }
  },
  props: [
      "isLastForNext", 
      "setNext", 
      "isCurrentPage", 
      "getTotalPage", 
      "isLastForPrev",
      "setPrevious",
      "setCurrentPage"
  ],
  mounted () {
    // this.$axios.get('/api/integrations/?order%5Bid%5D=desc')
    //   // eslint-disable-next-line no-return-assign
    //   .then((data) => {
    //     console.log(data)
    //     this.totalIntegrations = data.data.filter(x => x.status === 1)
    //     console.log('total integration = ')

    //     this.integrations = [...this.totalIntegrations]
    //     // this.totalPage = 5;
    //     this.totalPage = Math.ceil(this.totalIntegrations.length / 5)
    //     this.setCurrentPage(1)
    //   }).catch(
    //   // eslint-disable-next-line no-console
    //     (e) => {
    //       console.log(e)
    //     }
    //   )
  },
  methods: {
    // isCurrentPage (n) {
    //   return this.$emit('is-current-page', n)

    //   // return this.currentPage === n
    // },

    // setCurrentPage (currentPage) {
    //   this.$emit('set-current-page', currentPage)
    //   // if (currentPage > 0 && currentPage <= this.totalPage) {
    //   //   console.log('current page = ')
    //   //   console.log(currentPage)
    //   //   this.currentPage = currentPage

    //   //   // const newIntegrations = this.integrations;
    //   //   const startIndex = ((this.currentPage * this.size) - this.size)
    //   //   const finishIndex = this.currentPage * this.size

    //   //   console.log('start index = ')
    //   //   console.log(startIndex)

    //   //   console.log('finish index = ')
    //   //   console.log(finishIndex)

    //   //   // console.log('start form = ');
    //   //   // console.log(startForm);

    //   //   // console.log('size = ');
    //   //   // console.log(size);

    //   //   const newIntegrations = []
    //   //   for (let i = startIndex; i < finishIndex; i++) {
    //   //     if (typeof this.totalIntegrations[i] !== 'undefined') {
    //   //       newIntegrations.push(this.totalIntegrations[i])
    //   //     }
    //   //   }

    //   //   console.log('new integrations = ')
    //   //   console.log(newIntegrations)

    //   //   this.integrations = newIntegrations
    //   //   // this.setIntegration(newIntegrations);
    //   // }
    // },

    // setNext () {
    //   this.$emit('set-next')
    //   // this.setCurrentPage(this.currentPage + 1)
    // },

    // isLastForPrev () {
    //   // console.log('current page = ');
    //   // console.log(n);
    //   return this.$emit('is-last-for-prev')
    //   // return this.currentPage === 1
    // },

    // isLastForNext () {
    //   return this.$emit('is-last-for-next')
    //   // return this.currentPage === this.totalPage
    // },

    // setPrevious () {
    //   this.$emit('set-previous')
    //   // this.setCurrentPage(this.currentPage - 1)
    // },

    // getTotalPage() {
    //   return this.$emit('get-total-page')
    //   // return this.totalPage
    // }
  },
}
</script>

<style scoped>
.picardata-paging-active {
  color: #3E4EDD;
}

.picardata-nav {
  /* position: absolute; */
  /* left: 25%;
  right: 25%;
  top: 8.33%;
  bottom: 8.33%; */
  /* font-family: Poppins !important; */
  margin: auto;
  /* Neutral / N-800 Tundora */
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0.75px;
  text-align: center;

  /* background: #404040; */
}

.picardata-nav-inactive {
  /* position: absolute; */
  /* left: 25%;
  right: 25%;
  top: 8.33%;
  bottom: 8.33%; */
  font-weight: 400;

  /* background: #404040; */
}

.picardata-paging-text {
  position: static;
  /* width: 13px; */
  /* height: 28px; */
  left: 143px;
  top: 0px;

  /* font-family: Poppins; */
  font-style: normal;
  font-weight: normal;
  font-weight: bold;
  margin: auto;
  /* font-size: 20px; */
  /* line-height: 28px; */
  /* identical to box height, or 140% */

  display: flex;
  align-items: center;
  text-align: center;
  font-size: 20px;
  letter-spacing: 0.75px;

  /* Body Text */

  color: #313131;
}
.picardata-paging {
  /* Frame 266 */

  /* Auto Layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  cursor: pointer;
  position: static;
  width: auto;
  /*height: 60px;
  left: 689px;
  top: 2066px; */

  background: #FAFAFA;
  border-radius: 8px;
  color: #404040;
  /* Inside Auto Layout */

  flex: none;
  order: 6;
  align-self: flex-end;
  flex-grow: 0;
  /* margin: 56px 0px; */
  /* font-family: picardata; */
}
</style>