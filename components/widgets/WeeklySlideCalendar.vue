<template>
  <div
      class="horizontal-calendar"
  >
    <div class="row mb-4">
      <div class="col-sm-6">
        <div class="d-flex">
          <div class="prev-next-week-button">
            <i v-on:click="dateFlip(-1, 7)" class="icon-Collapse"></i>
          </div>
          <div v-on:click="dateFlip(-1, swipeSpace)" class="prev-next-day-button ml-2">
            <i class="icon-Chevron-Left"></i>
          </div>
          <div class="ml-3 span-text">
            <span>
              Previous days
            </span>
          </div>
        </div>
      </div>
      <div class="col-sm-6 text-right">
        <div class="d-flex" style="float:right">
          <div class="span-text">
            <span>
              Next days
            </span>
          </div>
          <div v-on:click="dateFlip(1, swipeSpace)" class="prev-next-day-button next ml-3">
            <i class="icon-Chevron-Right"></i>
          </div>
          <div class="ml-2 prev-next-week-button">
            <i v-on:click="dateFlip(1, 7)" class="icon-Expand"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="date-list">
      <div
          class="date-list-scroll"
          :style="{'transform': 'translateX('+translateX+'px)','transition-duration': transitionDuration}"
      >
        <div
            class="date-item"
            v-for="(day,index) in dateList"
            v-bind:key="index"
            v-bind:class="{'choosed-day': day.dateFormat == choosedDay.dateFormat,'today':day.dateFormat == today.dateFormat, 'date-item-weekend': day.isWeekend, 'past-date':day.isPastDay}"
        >
          <div>
            <p class="date-item-day">{{day.day}}</p>
            <p class="date-item-date">{{day.dateFormat}}</p>
          </div>
          <div class="first-day" v-if="day.date == 1">
            <p>{{day.month}}</p>
          </div>
          <div class="mt-4">
            <div class="form-group">
              <ul class="list-task">
                <li v-for="(n,n_key) in 10" :key="n_key">
                  <base-input
                      :id="'input-text'+n"
                      :type="'text'"
                  />
                </li>
              </ul>
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
export default {
  name: "WeeklySlideCalendar",
  props: {
    choosedDate: {
      type: [String, Date],
      required: false,
      default: () => {
        return new Date();
      }
    },

    swipeSpace: {
      type: [String, Number],
      required: false,
      default: 7
    },

    choosedDatePos: {
      type: String,
      required: false,
      default: "left"
    },

    minDate: {
      type: [String, Date],
      required: false,
      default: ""
    },

    maxDate: {
      type: [String, Date],
      required: false,
      default: ""
    },

    choosedItemColor: {
      type: String,
      required: false,
      default: "rgb(13, 141, 224)"
    },

    todayItemColor: {
      type: String,
      required: false,
      default: "rgba(13, 141, 224,.1)"
    },

    sundayText: {
      type: String,
      required: false,
      default: "日"
    },

    showBorderTop: {
      type: Boolean,
      required: false,
      default: true
    },

    resizeable: {
      type: Boolean,
      required: false,
      default: true
    },

    lang: {
      type: String,
      required: false,
      default: "en"
    },

    triggerChange: {
      type: Boolean
    },

    initFirstSunday: {
      type: Boolean
    }
  },
  data() {
    return {
      firstDay: {},
      visibleDay: "",
      changeCount: Number(this.swipeSpace),
      choosedDay: {},
      dateList: [],
      today: {},
      translateX: -this.changeCount * 165,
      transitionDuration: "300ms",
      domWidth: 0,
      swipeLeftMore: true,
      swipeRightMore: true
    };
  },
  mounted() {
    this.init();
    this.$emit("change", this.choosedDay);

    if (this.resizeable) {
      let a = 1;
      window.onresize = () => {
        a++;
        let b = a;
        setTimeout(() => {
          if (b == a) {
            this.init();
          }
        }, 200);
      };
    }
  },
  methods: {
    init() {
      this.domWidth = this.$el.scrollWidth;
      let n = (this.domWidth - 60) / 165;
      if (n % 1 != 0) {
        n = parseInt(n) + 1;
      }
      this.visibleDay = n;

      if(this.changeCount > this.visibleDay){
        this.changeCount = this.visibleDay;
      }

      this.today = this.formatOneDay(new Date());
      this.choosedDay = this.formatOneDay(this.choosedDate);

      // get sunday in this week
      var currentDate = new Date();
      var thisSunday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())).toUTCString();
      let firstDay = this.initFirstSunday ? this.formatOneDay(thisSunday) : this.formatOneDay(this.choosedDate);

      if (this.choosedDatePos === "center") {
        let ts1 =
            firstDay.timestamp -
            parseInt(this.visibleDay / 2) * 1000 * 60 * 60 * 24;
        this.firstDay = this.formatOneDay(ts1);
      } else if(this.choosedDatePos === "right"){
        let ts2 =
            firstDay.timestamp -
            parseInt(this.visibleDay-1) * 1000 * 60 * 60 * 24;
        this.firstDay = this.formatOneDay(ts2);
      } else {
        this.firstDay = firstDay;
      }
      this.creatList();

      this.$emit("firstDayChange", this.firstDay);
    },
    creatList() {
      let list = [];
      let firstDayTime = this.firstDay.timestamp;
      for (let i = 0; i < this.visibleDay; i++) {
        let timestamp = firstDayTime + 1000 * 60 * 60 * 24 * i;
        let info = this.formatOneDay(new Date(timestamp));
        list.push(info);
      }
      this.dateList = list;
      this.translateX = 0;

      this.swipeLeftMore = true;
      this.swipeRightMore = true;
    },

    dateFlip(type, swipingDay) {
      let beforeChangeX = this.translateX;
      let beforeChangeLen = this.dateList.length;
      if (type === -1) {
        if (this.translateX <= -165 * swipingDay) {
          this.translateX = this.translateX + 165 * swipingDay;

        } else if (!this.swipeLeftMore) {
          this.translateX = 0;
          this.$emit("swipeToEnd", "left");
        } else {
          let fdt = this.dateList[0].timestamp;
          let list = [];
          let i;
          for (i = 0; i < swipingDay; i++) {
            let timestamp = fdt - 1000 * 60 * 60 * 24 * (i + 1);
            let info = this.formatOneDay(new Date(timestamp));
            if (this.minDate && info.timestamp < this.minDateTimestamp) {
              this.swipeLeftMore = false;
              break;
            } else {
              list.unshift(info);
            }
          }
          this.transitionDuration = "0ms";
          this.dateList.unshift(...list);
          this.translateX = this.translateX - 165 * i;

          setTimeout(() => {
            this.transitionDuration = "300ms";
            this.translateX = this.translateX + 165 * i;
          }, 1);
        }
      } else if (type === 1) {
        // let hasSpace =
        //     this.dateList.length * 165 - this.domWidth + this.translateX;

        // still dont know what the purpose of this condition
        // if (hasSpace > 165 * swipingDay) {
        if(false){
          this.translateX = this.translateX - 10 * swipingDay;
        } else {

          if (!this.swipeRightMore) {
            this.translateX = (this.dateList.length - this.visibleDay) * -165;
            this.$emit("swipeToEnd", "right");
            return;
          }
          let fdt = this.dateList[this.dateList.length - 1].timestamp;
          let i;
          for (i = 0; i < swipingDay; i++) {
            let timestamp = fdt + 1000 * 60 * 60 * 24 * (i + 1);
            let info = this.formatOneDay(new Date(timestamp));
            if (this.maxDate && info.timestamp > this.maxDateTimestamp) {
              this.swipeRightMore = false;
              break;
            } else {
              this.dateList.push(info);
            }
          }
          if (i < swipingDay) {
            this.translateX = (this.dateList.length - this.visibleDay) * -165 * i;
          } else {
            this.translateX = this.translateX - 165 * i;
          }
        }
      }

      setTimeout(() => {

        let afterChangeX = this.translateX;
        let afterChangeLen = this.dateList.length;

        if (beforeChangeX === afterChangeX) {
          let changeDay = afterChangeLen - beforeChangeLen;

          if (changeDay === 0) return;
          this.firstDay = this.formatOneDay(
              this.formatDateTime(
                  this.firstDay.timestamp - 3600 * 1000 * 24 * changeDay
              )
          );
        } else {
          let changeDay = (afterChangeX - beforeChangeX) / 50;
          this.firstDay = this.formatOneDay(
              this.formatDateTime(
                  this.firstDay.timestamp - 3600 * 1000 * 24 * changeDay
              )
          );
        }

        this.$emit("firstDayChange", this.firstDay);
      }, 300);


      this.$emit("swipeClick", type===1?'right':'left');
    },

    formatOneDay(day) {
      let timestamp = new Date(day).getTime();
      let date = this.formatDateTime(timestamp);
      let dateArray = date.split("/");
      let dateNow = new Date(day);
      let now = new Date();
      now.setHours(0,0,0,0);

      for (const key in dateArray) {
        if (dateArray[key].indexOf("0") == 0) {
          dateArray[key] = dateArray[key].substr(1, 1);
        }
      }
      let week = new Date(timestamp).getDay();
      return {
        dateFormat: date,
        year: dateArray[0],
        month: dateArray[1],
        date: dateArray[2],
        timestamp: new Date(date).getTime(),
        day: this.getWeekName(week),
        isWeekend: week == 0 || week == 6,
        isPastDay: this.isPastDate(dateNow,now)
      };
    },

    isPastDate(firstDate, secondDate) {
      if (firstDate.setHours(0, 0, 0, 0) < secondDate.setHours(0, 0, 0, 0)) {
        return true;
      }

      return false;
    },

    getWeekName(day) {
      const dirt_en = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
      };

      return dirt_en[day];
    },
    getMonthName(month){
      const monthNames = {
        1:"January",
        2:"February",
        3:"March",
        4:"April",
        5:"May",
        6:"June",
        7:"July",
        8:"August",
        9:"September",
        10:"October",
        11:"November",
        12:"Decembers"
      };

      month = month < 10 ? month.replace(0,"") : month
      return monthNames[month]
    },

    formatDateTime(timestamp) {
      if (!timestamp) return "";
      timestamp = parseInt(timestamp);
      let fdt = new Date(timestamp);
      let arr = [fdt.getMonth() + 1, fdt.getDate()];
      for (let key in arr) {
        if (arr[key] < 10) {
          arr[key] = "0" + arr[key];
        }
      }
      arr.unshift(fdt.getFullYear());
      return this.getMonthName(arr[1]) + " " + arr[2] + ", " + arr[0];
    }
  },
  computed: {

    minDateTimestamp() {
      if (this.minDate) {
        let day = this.formatOneDay(this.minDate);
        return day.timestamp;
      }
      return null;
    },

    maxDateTimestamp() {
      if (this.maxDate) {
        let day = this.formatOneDay(this.maxDate);
        return day.timestamp;
      }
      return null;
    }
  },
  watch:{
    lang(n){
      this.lang = n;
      this.creatList();
    },
    triggerChange() {
      this.init()
    }
  }
};
</script>

<style>
.horizontal-calendar {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  user-select: none;
}

.horizontal-calendar * {
  margin: 0;
  padding: 0;
}

.horizontal-calendar div {
  box-sizing: border-box;
}

.horizontal-calendar .icon-Expand,
.horizontal-calendar .icon-Collapse{
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  font-size: 38px;
  color:  #2534B6;
  cursor: pointer;
}

.horizontal-calendar .prev-next-day-button{
  width: 40px;
  height: 40px;
  line-height: 43px;
  padding-left: 10px;
  border-radius: 50%;
  background: #2534B6;
  color: white;
  cursor: pointer;
}

.horizontal-calendar .prev-next-day-button.next{
  padding-right: 10px;
}

.horizontal-calendar .prev-next-day-button i{
  font-size: 16px;
}

.horizontal-calendar .span-text{
  line-height: 40px;
  color: #313131;
  letter-spacing: 0.75px;
}

.horizontal-calendar .date-list {
  display: inline-block;
  vertical-align: top;
  width: 100%;
  overflow: hidden;
  position: relative;
  text-align: left;
}

.horizontal-calendar .date-list-scroll {
  width: 60000px;
  height: auto;
  position: relative;
  transition: transform 0.3s ease-in-out;
  transform: translateX(0);
}

.horizontal-calendar .date-item {
  position: relative;
  display: inline-block;
  width: 165px;
  height: 50auto;
  padding: 5px 2px;
  line-height: 20px;
  background-color: #fff;
  font-size: 14px;
  text-align: center;
}

.horizontal-calendar .date-item.past-date p{
  color:#adadad !important;
}

.horizontal-calendar .first-day p {
  color: #fff;
  font-size: 12px;
  width: 54%;
  text-align: center;
  line-height: 16px;
  transform: scale(0.9);
}

.horizontal-calendar .date-item-day {
  color: #313131;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.75px;
  line-height: 36px;
  margin-bottom: 16px;
}

.horizontal-calendar .date-item-date {
  color: #313131;
  font-size: 16px;
  font-weight: normal;
  letter-spacing: 0.75px;
  line-height: 24px;
}

.horizontal-calendar .today .date-item-date,
.horizontal-calendar .today .date-item-day{
  color: #3E4EDD;
}

.horizontal-calendar .choosed-day .date-item-date,
.horizontal-calendar .choosed-day .date-item-day {
  color: #3E4EDD;
}

.horizontal-calendar .month {
  flex: 0 0 19px;
  height: 50px;
  background-color: #aaa;
  color: #fff;
  border-right: 1px solid #f2f2f2;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  display: flexbox;
  box-sizing: border-box;
  padding: 5px 0;
}

</style>

<style lang="scss">
.horizontal-calendar{
  .date-item{
    &.past-date{
      .list-task {
        li {
          input {
            border-color: #adadad;
          }
        }
      }
    }
    .list-task {
      li {
        list-style: none;

        input {
          border-width: 0px 0px 1px 0px;
          border-radius: 0;
          width: 90%;
          margin: 0 auto;
          border-color: #E0E0E0;

          &:hover,
          &:focus {
            box-shadow: none;
          }
        }
      }
    }
  }
}
</style>