<template>
  <div>
    <base-header type="white" class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-12 col-7">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <route-breadcrumb :crumbs="getCrumbs" />
          </nav>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row">
        <a class="col-sm-1 pd-icon pdicon-Back-Arrow picardata-arrow cursor-pointer" @click.prevent="$router.go(-1)" />
      </div>
      <div class="row title-container mt-3">
        <div class="col-12 mx-auto">
          <h1>{{ name }}</h1>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-6">
          <nav class="nav">
            <a class="nav-link disabled" href="#">
              <div>
                Summary
              </div>
              <div class="text-center"><i class="fa fa-circle dot" /></div>
            </a>
            <a class="nav-link" href="#">Individual Questions</a>
          </nav>
        </div>
        <div class="col-6 text-right">
          <label class="ml-auto mb-0 mr-3 label-check">{{ acceptingResponses ? 'Still accepting responses' : 'Not accepting responses' }}</label>
          <b-form-checkbox
            v-model="acceptingResponses"
            name="check-button"
            class="d-inline text-primary ml-4 font-weight-600 float-right"
            switch
            @change="submitAcceptingResponses"
          />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <h1>{{ totalRespondents }} Responses</h1>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <div class="card">
            <div class="card-body p-30">
              <h3>Who has responded?</h3>
              <div class="mt-4">
                <div v-for="(respondent,index) in formRespondents" :key="respondent.id + index" class="responded mb-2 fw-500">
                  {{ respondent.email }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <div class="btn-group type-dropdown col-8">
            <button
              class="btn btn-default btn-lg text-left dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
            >
              <font-awesome-icon :icon="['fas', 'question']" />&nbsp;
              <span class="content">Choose Question</span>
              <font-awesome-icon :icon="['fas', 'angle-down']" class="fa-pull-right" />
            </button>
            <div class="dropdown-menu">
              <a
                v-for="(field, index) in fields"
                :key="field.id + index"
                class="dropdown-item cursor-pointer"
              >
                {{ field.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-for="(field,index) in chartData" :key="index" class="row mt-5">
        <div v-if="field.type === 0 || field.type === 1" class="col-xl-12">
          <div class="card">
            <div class="card-body p-30">
              <hr class="header-break">
              <h2 class="mb-0">
                {{ field.name }}
              </h2>
              <div class="fw-400 mt-3 mb-4">
                {{ field.fieldAnswers.length }} Responses
              </div>
              <div class="mt-4">
                <div v-for="(answer, ansId) in field.fieldAnswers" :key="answer.id + ansId" class="responded mb-3 fw-500">
                  {{ answer.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="field.type === 2 || field.type === 4" class="col-xl-12">
          <div class="card">
            <div class="card-body p-30">
              <hr class="header-break">
              <h2 class="mb-0">
                {{ field.name }}
              </h2>
              <div class="fw-400 mt-3 mb-4">
                {{ field.fieldAnswers.length }} Responses
              </div>
              <div class="row">
                <div class="col-8">
                  <div class="chart">
                    <pie-chart
                      :height="350"
                      :chart-data="field.chartData"
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="legends">
                    <div v-for="label, index in field.chartData.labels" :key="index">
                      <div class="justify-content: space-between;">
                        <div
                          :style="{
                            'color': field.chartData.colors[index],
                            'width': '12px',
                            'height': '12px'}"
                        />
                        <font-awesome-icon
                          :style="{'color': field.chartData.colors[index]}"
                          :icon="['fas', 'circle']"
                        />
                        <span>
                          {{ label }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="field.type === 3" class="col-xl-12">
          <div class="card">
            <div class="card-body p-30">
              <hr class="header-break">
              <h2 class="mb-0">
                {{ field.name }}
              </h2>
              <div class="fw-400 mt-3 mb-4">
                {{ field.fieldAnswers.length }} Responses
              </div>
              <div class="mt-4">
                <div class="chart-area">
                  <bar-chart
                    :height="350"
                    :chart-data="field.chartData"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <!--        <div class="row mt-5">-->
        <!--          <div class="col-4">-->
        <!--            <nav class="nav">-->
        <!--              <a class="nav-link disabled" href="#">Summary</a>-->
        <!--            </nav>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div class="row mt-5">-->
        <!--          <div class="col-12">-->
        <!--            <div class="card">-->
        <!--              <div class="card-body">-->
        <!--                <h2>Total respondents: {{ totalRespondents }}</h2>-->
        <!--                <div v-for="(respondent,index) in formRespondents" :key="index">-->
        <!--                  <font-awesome-icon :icon="['fas', 'dot-circle']" class="d-inline" />-->
        <!--                  <h4 style="font-size: 15px" class="d-inline">-->
        <!--                    {{ respondent.email }}-->
        <!--                  </h4>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
import BarChart from '~/components/argon-core/Charts/BarChart'
import PieChart from '~/components/argon-core/Charts/PieChart'

function getRandomColor (i) {
  return 'hsl(' + (i + 15) * 360 * Math.random() + ',' +
    (25 + 70 * Math.random()) + '%,' +
    (55 + 10 * Math.random()) + '%)'
}

function pieChartData (field) {
  const answers = {}
  field.fieldAnswers.forEach((v) => {
    if (!Object.prototype.hasOwnProperty.call(answers, v.name)) {
      answers[v.name] = 1
    } else {
      answers[v.name]++
    }
  })

  field.fieldChoices.map((v) => {
    if (!Object.prototype.hasOwnProperty.call(answers, v.name)) {
      answers[v.name] = 0
    }
  })
  return answers
}

function barChartData (field) {
  const answers = {}
  field.fieldAnswers.forEach((v) => {
    const options = v.name.split(',')
    options.forEach((o) => {
      if (!Object.prototype.hasOwnProperty.call(answers, o)) {
        answers[o] = 1
      } else {
        answers[o]++
      }
    })
  })
  return answers
}

export default {
  layout: 'argon',
  components: {
    PieChart,
    BarChart
  },
  async asyncData (context) {
    return await context.app.$axios.$get('/api/forms/' + context.route.params.id)
      .then((data) => {
        data.fields.map((v) => {
          if (v.type === 0) {
            v.chart = 'list'
          } else if (v.type === 1) {
            v.chart = 'list'
          } else if (v.type === 2) {
            v.chart = 'pie'
          } else if (v.type === 3) {
            v.chart = 'bar'
          } else {
            v.chart = 'pie'
          }
        })
        data.acceptingResponses = !data.completedMessage
        return data
      })
      .catch(e => console.log(e))
  },
  data () {
    return {}
  },
  computed: {
    chartData () {
      return this.fields.filter((field) => {
        if (field.chart === 'pie') {
          const data = pieChartData(field)
          const colors = [...Array(Object.keys(data).length).keys()].map(i => getRandomColor(i + 1))
          field.chartData = {
            labels: Object.keys(data),
            datasets: [{
              label: field.name,
              data: Object.keys(data).map(i => data[i]),
              backgroundColor: colors
            }],
            colors
          }
        }

        if (field.chart === 'bar') {
          const data = barChartData(field)
          field.chartData = {
            labels: Object.keys(data),
            datasets: [{
              label: field.name,
              data: Object.keys(data).map(i => data[i])
            }]
          }
        }

        return field.status === 1
      })
    },
    totalRespondents () {
      return this.formRespondents.length
    },
    getCrumbs () {
      const
        crumbs = [
          {
            name: 'Forms',
            path: '/forms'
          },
          {
            name: this.name,
            path: '/forms/' + this.$route.params.id
          },
          {
            name: 'Summary',
            path: '/forms/' + this.$route.params.id
          }
        ]
      return crumbs
    }
  },
  methods: {
    async submitAcceptingResponses () {
      this.completedMessage = !this.completedMessage ? 'The form is no longer accepting responses' : this.completedMessage
      return await this.$axios.$put('/api/forms/' + this.$route.params.id, {
        name: this.name,
        completedMessage: this.acceptingResponses ? '' : this.completedMessage
      })
        .then((res) => {
          this.completedMessage = res.completedMessage
        })
        .catch(e => console.log(e))
    }
  }
}
</script>
<style scoped lang="scss">
input.form-control {
  border-width: 0 0 2px 0;
  border-radius: 0;
  box-shadow: none;
}

h1 {
  font-size: 32px;
  font-weight: 700;
}

input.form-control:focus {
  border-color: var(--primary);
}

nav a.disabled {
  color: #14142B;
  font-weight: 600;
}

.picardata-arrow{
  font-size: 32px;
  color: #14142B;
}
.label-check{
  font-weight: 600;
  font-size: 20px;
  color: #2534B6;
  position: relative;
  bottom: 4px;
}

.fa-circle.dot{
  font-size: 8px;
}

.p-30{
  padding: 30px;
}

.card-body{
  h2{
    font-weight: 600;
    font-size: 28px;
    color: #313131;
  }
  h3{
    font-weight: 600;
    font-size: 24px;
    color: #313131;
  }

  .responded{
    padding: 10px;
    color: #313131;
    font-size: 16px;
    font-weight: 500;
    background: #FAFAFA;
    border-radius: 4px;
  }
}

.dropdown-toggle::after {
  display: none;
}

.type-dropdown {
  .btn {
    display: flex;
    align-items: center;
    max-width: 100%;
    height: 56px;
    text-align: left;
    border-radius: 15px;
    background-color: #EFF0F7;
    font-weight: 400;
    font-size: 16px;
    border-width: 0;
    color: #14142B;

    &:active {
      background-color: #EFF0F7;
      border-width: 0;
      color: #14142B;
    }

    .content {
      display: block;
      text-overflow: ellipsis;
      overflow-x: hidden;
      padding-right: 10px;
    }

    .fa-pull-right{
      margin-left: auto;
    }
  }

  .dropdown-menu {
    max-width: 95%;
    min-width: 95%;

    .dropdown-item {
      text-overflow: ellipsis;
      overflow-x: hidden;
      padding-right: 10px;
    }
  }
}

hr.header-break {
  border-radius: 20px;
  border-top: 8px solid var(--blue);
  margin: 0 0 36px;
  width: 130px;
}
</style>
