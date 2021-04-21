<template>
  <div>
    <base-header type="white" class="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <route-breadcrumb :crumbs="crumbs" />
          </nav>
        </div>
      </div>
    </base-header>
    <div class="container min-vh-80">
      <div class="row">
        <div class="col-xl-10 p-4">
          <form
            id="navbar-search-main"
            class="navbar-search form-inline"
            :class="{'navbar-search-light': type === 'default', 'navbar-search-dark': type === 'light'}"
          >
            <div class="form-group mb-0">
              <div class="input-group input-group-alternative input-group-merge search-button">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-search" /></span>
                </div>
                <input class="form-control app-search" placeholder="Search app" type="text">
              </div>
            </div>
            <button
              type="button"
              class="close"
              data-action="search-close"
              data-target="#navbar-search-main"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </form>
          <div v-if="false" class="row pt-3">
            <div class="col-xl-12">
              <ul class="list-group">
                <li class="list-group-item">
                  <a href="#" data-filter="all">All applications</a>
                </li>
                <li class="list-group-item">
                  <a href="#" data-filter="">Collaboration Tools</a>
                </li>
                <li class="list-group-item">
                  <a href="#" data-filter="">Customer Support</a>
                </li>
                <li class="list-group-item">
                  <a href="#" data-filter="">Design</a>
                </li>
                <li class="list-group-item">
                  <a href="#" data-filter="">Finance</a>
                </li>
                <li class="list-group-item">
                  <a href="#" data-filter="">Human Resource</a>
                </li>
                <li class="list-group-item">
                  <a href="#" data-filter="">Sales & Marketing</a>
                </li>
                <li class="list-group-item">
                  <a href="#" data-filter="">Social Media</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="row ml-1 mb-5">
        <div class="col">
          <base-button type="primary">
            All
          </base-button>
          <base-button outline type="primary">
            Collaboration
          </base-button>
          <base-button outline type="primary">
            Design
          </base-button>
          <base-button outline type="primary">
            Financial
          </base-button>
          <base-button outline type="primary">
            Human Resource
          </base-button>
        </div>
      </div>
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
      <!-- <ItegratedAppsList 
        class-added="ml-1 col-xl-10" 
        app-class="col-4" 
        :totalPage="totalPage" 
        @setTotalPage="setTotalPage"
        :size="size"
        :currentPage="currentPage" 
        @setCurrentPage="setCurrentPage"/> -->
      <div class="row" style="margin-bottom: 2%;"> 
        <div class="col-md-12 ">  
          <div class="picardata-paging float-right">
            <div class="col-sm" v-on:click="setPrevious()">
              <span class="pd-icon pdicon-Chevron-Left"></span>
            </div>
            <span 
              v-for="n in this.totalPage" 
              class="col-sm"   
              v-on:click="setCurrentPage(n)">
              <span v-if="isCurrentPage(n)" 
                    class="picardata-paging-active">
                    {{ n }}
              </span>
              <span v-else>{{ n }}</span>
            </span>
            <div class="col-sm" v-on:click="setNext()"><span class="pd-icon pdicon-Chevron-Right"></span></div>
          </div>
        </div>
      </div>
    </div>
 

  </div>
</template>

<script>

// import ItegratedAppsList from '@/components/Application/IntegratedAppsList'
export default {
  name: 'Index',
  layout: 'argon',
  // components: { ItegratedAppsList },
  data () {
    return {
      crumbs: [
        {
          name: 'Apps',
          path: '/apps'
        },
        {
          name: 'Integrated Apps',
          path: '/apps/integrated-apps'
        }
      ],
      totalPage: 1,
      currentPage: 1,
      size: 5,
      modals: {
        modal0: false
      },
      totalIntegrations : [],
      integrations: []
    }
  },
  methods: {
    setTotalPage (totalPage, integrations, setIntegration) {
      console.log('Mantab !');
      this.totalPage = totalPage;
      this.integrations = integrations;

      console.log('this integrations = ');
      console.log(this.integrations);


      this.setIntegration = setIntegration;

      console.log('this set integration = ');
      console.log(this.setIntegration);
    },

    isCurrentPage (n) {
      return this.currentPage === n;
    },

    setCurrentPage (currentPage) {
      console.log('current page = ');
      console.log(currentPage);
      this.currentPage = currentPage;
      
      // const newIntegrations = this.integrations;
      const startIndex = ((this.currentPage*this.size)-this.size);
      const finishIndex = this.currentPage*this.size; 


      console.log('start index = ');
      console.log(startIndex);

      console.log('finish index = ');
      console.log(finishIndex);

      // console.log('start form = ');
      // console.log(startForm);

      // console.log('size = ');
      // console.log(size);

      const newIntegrations = [];
      for(let i=startIndex;i<finishIndex;i++) {
        if(typeof this.totalIntegrations[i] !== 'undefined') {
          newIntegrations.push(this.totalIntegrations[i]);
        }
      }

      console.log('new integrations = ');
      console.log(newIntegrations);

      this.integrations = newIntegrations;
      // this.setIntegration(newIntegrations);
    },

    setNext() {
      this.setCurrentPage(this.currentPage+1);
    },

    setPrevious() {
      this.setCurrentPage(this.currentPage-1);
    },
    
    appClick (index) {
      const selectedIntegration = this.integrations[index]
      this.$router.push('/apps/integrated-apps/' + selectedIntegration.id + '/' + selectedIntegration.application.appCode.replace('.', '-'))
    },
  },
  mounted () {
    this.$axios.get('/api/integrations/?order%5Bid%5D=desc')
      // eslint-disable-next-line no-return-assign
      .then((data) => {
        console.log(data)
        this.totalIntegrations = data.data.filter(x => x.status === 1);
        console.log('total integration = ');

        this.integrations = [...this.totalIntegrations];
        // this.totalPage = 5;
        this.totalPage = Math.ceil(this.totalIntegrations.length / 5);
        this.setCurrentPage(1);
      }).catch(
      // eslint-disable-next-line no-console
        (e) => {
          console.log(e)
        }
      )
  },
}
</script>

<style scoped>
form, .input-group, .form-group {
  width: 100% !important;
}

li.list-group-item {
  padding: 1rem 0 1rem 0;
  border: none;
}

li.list-group-item a {
  color: black;
}
div.search-button {
  background-color: #EFF0F7;
}

.picardata-paging-active { 
  color: #3E4EDD;
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
  width: atuo;
  /*height: 60px;
  left: 689px;
  top: 2066px; */

  background: #FAFAFA;
  border-radius: 8px;
  color: #313131;
  /* Inside Auto Layout */

  flex: none;
  order: 6;
  align-self: flex-end;
  flex-grow: 0;
  /* margin: 56px 0px; */
  font-family: picardata;
}

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
