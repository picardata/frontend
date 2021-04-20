<template>
  <div>
    <base-header type="white" class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <route-breadcrumb :crumbs="crumbs"/>
          </nav>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <prev-page/>
      <div class="row title-container mt-3">
        <div class="col-12 mx-auto">
          <h1>{{ name }}</h1>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-4">
          <nav class="nav">
            <a class="nav-link disabled" href="#">Summary</a>
          </nav>
        </div>
        <div class="col-8">
          <b-form-checkbox
            v-model="acceptingResponses"
            name="check-button"
            class="d-inline text-primary ml-2 font-weight-600 float-right"
            switch
            @change="submitAcceptingResponses"
          >
            {{ acceptingResponses ? 'Still accepting responses' : 'Not accepting responses' }}
          </b-form-checkbox>
          <br><br>
          <div v-if="!acceptingResponses">
            <label for="">Message for respondents</label>
            <input v-model="completedMessage" type="text" class="form-control" @change="submitAcceptingResponses">
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <div v-for="(field,index) in chartData" :key="index" class="row">
            <div v-if="field.type === 0 || field.type === 1" class="col-xl-12">
              <div class="card mt-5">
                <div class="card-body">
                  <h5 class="h2 mb-0">
                    {{ field.name }}
                  </h5>
                  <div v-for="answer in field.fieldAnswers" :key="answer.id">
                    <font-awesome-icon :icon="['fas', 'dot-circle']" class="d-inline"/>
                    <h4 style="font-size: 15px" class="d-inline">
                      {{ answer.name }}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="field.type === 2 || field.type === 4" class="col-xl-12">
              <card>
                <template slot="header">
                  <h5 class="h2 mb-0">
                    {{ field.name }}
                  </h5>
                </template>
                <div class="chart">
                  <pie-chart
                    :height="350"
                    :chart-data="field.chartData"
                  />
                </div>
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
              </card>
            </div>
            <div v-if="field.type === 3" class="col-xl-12">
              <card>
                <template slot="header">
                  <h5 class="h2 mb-0">
                    {{ field.name }}
                  </h5>
                </template>
                <div class="chart-area">
                  <bar-chart
                    :height="350"
                    :chart-data="field.chartData"
                  />
                </div>
              </card>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h2>Total respondents: {{ totalRespondents }}</h2>
              <div v-for="(respondent,index) in formRespondents" :key="index">
                <font-awesome-icon :icon="['fas', 'dot-circle']" class="d-inline"/>
                <h4 style="font-size: 15px" class="d-inline">
                  {{ respondent.email }}
                </h4>
              </div>
            </div>
          </div>
        </div>
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
  data () {
    return {
      crumbs: [
        {
          name: 'Forms',
          path: '/form'
        },
        {
          name: 'Edit Form',
          path: '/form/' + this.$route.params.id
        },
        {
          name: 'Form Result',
          path: '/form/' + this.$route.params.id
        }
      ]
    }
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
    },
    testt () {
      console.log(this.groupRespondents)
    }
  }
}
</script>
<style scoped>
input.form-control {
  border-width: 0 0 2px 0;
  border-radius: 0;
  box-shadow: none;
}

h1 {
  font-size: 36px;
  font-weight: bolder;
}

input.form-control:focus {
  border-color: var(--primary);
}

nav a.disabled {
  color: #14142B;
  font-weight: 600;
}
</style>
