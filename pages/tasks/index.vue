<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-5 mb-5">
      <div>
        <base-header type="white" class="pb-6">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                <route-breadcrumb :crumbs="crumbs" />
              </nav>
            </div>
          </div>
        </base-header>
        <div class="container-fluid mt--6">
          <div class="row">
            <a id="app" class="col-sm-12 pd-icon pdicon-Back-Arrow picardata-arrow" href="/" />
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <span class="form-title">Manage Tasks</span>
            </div>
            <div class="col-sm-6 text-right">
              <base-input
                id="goto-datepick"
                type="date"
                :input-classes="'goto-datepick'"
                @change="goToDate"
              />
              <span class="goto-span">Go to day</span>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-12">
              <WeeklySlideCalendar :swipe-space="1" :choosed-date="choosedDate" :trigger-change="triggerChange" />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-sm-12 divider-bg">
              <div class="row">
                <div class="text-center divider-text">
                  <span>Reorder the list</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-sm-12">
              <div class="row">
                <div class="col-sm-2">
                  <div class="dash-item-cover">
                    <div class="dash-item-content">
                      <div><i class="fa fa-plus" /></div>
                      <div class="mt-2">
                        Add new list
                      </div>
                    </div>
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
import WeeklySlideCalendar from '~/components/widgets/WeeklySlideCalendar'

export default {
  name: 'IndexVue',
  layout: 'argon',
  auth: true,
  components: { WeeklySlideCalendar },
  mixins: [
    loaderMixin
  ],
  data () {
    return {
      triggerChange: false,
      choosedDate: new Date(),
      crumbs: [
        {
          name: 'Tasks',
          path: '/tasks'
        }
      ],
      submenu: true
    }
  },
  methods: {
    goToDate (evt) {
      const value = evt.target.value
      this.choosedDate = value
      this.triggerChange = !this.triggerChange
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

.form-title {
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 54px;
  /* identical to box height */

  letter-spacing: 0.75px;

  /* Body Text */

  color: #313131;
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
    font-family: Poppins;
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
.goto-datepick{
  border: none;
  width: 70px;

  &:focus,
  &:hover{
    box-shadow: none;
  }
}
.goto-span{
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.75px;
  color: #313131;
}
#goto-datepick{
  div{
    &.form-group{
      width:70px;
      display: inline-block;
    }
  }
}
.divider-bg{
  background: #F5F5F5;

  .divider-text{
    margin:8px auto;
    padding:4px;
    border:solid 1px #8d95d6;
    border-radius: 4px;
    text-align: center;
    color:#181C3B;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    width: 118px;
  }
}
.dash-item-cover{
  height: 442px;
  border: 2px dashed #707070;
  border-radius: 8px;
  text-align: center;
  position: relative;
  cursor: pointer;

  &:hover{
    border-width: 3px;
  }

  .dash-item-content{
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    margin: 0;
    position: absolute;
    width: 100%;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.75px;
  }
}
</style>
