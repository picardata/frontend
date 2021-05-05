<template>
  <div class="row" v-if="data.length > 0">
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

export default {
  name: 'Paging',
  layout: 'argon',
  props: [
    "data",
    "setCurrentPage",
    "getTotalPage", 
    "getCurrentPage"
  ],
  methods: {
    setNext () {
      this.setCurrentPage(this.getCurrentPage() + 1)
    },

    isLastForPrev () {
      return this.getCurrentPage() === 1
    },

    isLastForNext () {
      return this.getCurrentPage() === this.getTotalPage()
    },

    setPrevious () {
      this.setCurrentPage(this.getCurrentPage() - 1)
    },
    
    isCurrentPage (n) {
      return this.getCurrentPage() === n
    },
  }
}
</script>

<style scoped>
.nav-last {
  opacity: 0.3;
}

.picardata-paging-active {
  color: #3E4EDD;
}

.picardata-nav {
  margin: auto;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0.75px;
  text-align: center;
}

.picardata-nav-inactive {
  font-weight: 400;
}

.picardata-paging-text {
  position: static;
  left: 143px;
  top: 0px;
  font-style: normal;
  font-weight: normal;
  font-weight: bold;
  margin: auto;

  display: flex;
  align-items: center;
  text-align: center;
  font-size: 20px;
  letter-spacing: 0.75px;


  color: #313131;
}
.picardata-paging {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  cursor: pointer;
  position: static;
  width: auto;


  background: #FAFAFA;
  border-radius: 8px;
  color: #404040;

  flex: none;
  order: 6;
  align-self: flex-end;
  flex-grow: 0;
}
</style>