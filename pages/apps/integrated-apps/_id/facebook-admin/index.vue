<template>
  <div>
    <base-header type="white" class="p-0">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <route-breadcrumb :crumbs="crumbs" />
          </nav>
        </div>
      </div>
    </base-header>
    <div>
      <ApplicationDetail
        :logo="data.application.logo"
        :name="data.application.name"
        :detail="data.application.detail"
        :instruction="data.application.instruction"
        :detail-integrated-page="true"
      />
      <div class="row">
        <h3 class="mt-3 ml-4 col">
          View Statistic
        </h3>
      </div>
      <div class="row mt-3">
        <div class="col-5">
          <PageViews
            v-if="this.pageViewsChart.loaded === true"
            :chartdata="this.pageViewsChart.chartdata"
            :options="this.pageViewsChart.extraOptions"
          />
        </div>
        <div class="col-5">
          <PageLikes
            v-if="this.pageLikesChart.loaded === true"
            :chartdata="this.pageLikesChart.chartdata"
            :options="this.pageLikesChart.extraOptions"
          />
        </div>
        <div class="col-5">
          <PageFollowers
            v-if="this.pageFollowersChart.loaded === true"
            :chartdata="this.pageFollowersChart.chartdata"
            :options="this.pageFollowersChart.extraOptions"
          />
        </div>
        <div class="col-5">
          <PostReach
            v-if="this.postReachChart.loaded === true"
            :chartdata="this.postReachChart.chartdata"
            :options="this.postReachChart.extraOptions"
          />
        </div>
        <div class="col-5">
          <VideosViews
            v-if="this.videosViewsChart.loaded === true"
            :chartdata="this.videosViewsChart.chartdata"
            :options="this.videosViewsChart.extraOptions"
          />
        </div>
        <div class="col-5">
          <PostEngagements
            v-if="this.postEngagementsChart.loaded === true"
            :chartdata="this.postEngagementsChart.chartdata"
            :options="this.postEngagementsChart.extraOptions"
          />
        </div>
        <div class="col-12">
          <PostList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import ApplicationDetail from '~/components/Application/ApplicationDetail'
import PageViews from '~/components/Application/Facebook/Widgets/PageViews'
import PageLikes from '~/components/Application/Facebook/Widgets/PageLikes'
import PageFollowers from '~/components/Application/Facebook/Widgets/PageFollowers'
import PostReach from '~/components/Application/Facebook/Widgets/PostReach'
import VideosViews from '~/components/Application/Facebook/Widgets/VideosViews'
import PostList from '~/components/Application/Facebook/Widgets/PostList'
import PostEngagements from '~/components/Application/Facebook/Widgets/PostEngagements'
import * as chartConfigs from '~/components/argon-core/Charts/config'
import loaderMixin from '~/mixins/loader'

export default {
  layout: 'argon',
  components: {
    ApplicationDetail,
    PageViews,
    PageLikes,
    PageFollowers,
    PostReach,
    VideosViews,
    PostList,
    PostEngagements
  },
  mixins: [
    loaderMixin
  ],
  async asyncData (context) {
    return await context.app.$axios.get('/api/integrations/' + context.route.params.id)
      .then((data) => {
        return {
          data: data.data
        }
      })
  },
  data () {
    return {
      postReachChart: {
        chartdata: null,
        loaded: false,
        extraOptions: chartConfigs.blueChartOptions
      },
      pageViewsChart: {
        chartdata: null,
        loaded: false,
        extraOptions: chartConfigs.blueChartOptions
      },
      pageLikesChart: {
        chartdata: null,
        loaded: false,
        extraOptions: chartConfigs.blueChartOptions
      },
      pageFollowersChart: {
        chartdata: null,
        loaded: false,
        extraOptions: chartConfigs.blueChartOptions
      },
      videosViewsChart: {
        chartdata: null,
        loaded: false,
        extraOptions: chartConfigs.blueChartOptions
      },
      postEngagementsChart: {
        chartdata: null,
        loaded: false,
        extraOptions: chartConfigs.blueChartOptions
      },
      crumbs: [
        {
          name: 'Apps',
          path: '/apps/integrated-apps'
        },
        {
          name: 'Integrated Apps',
          path: '/apps/integrated-apps'
        },
        {
          name: 'Facebook',
          path: '/apps/integrated-apps'
        }
      ]
    }
  },
  mounted () {
    this.getPostReach()
    this.getPageViews()
    this.getPageLikes()
    this.getPageFollowers()
    this.getVideosViews()
    this.getPostEngagements()
  },
  methods: {
    async getPostReach () {
      await this.$axios.$get('/api/facebook/post-reach')
        .then((data) => {
          this.postReachChart.chartdata = {
            labels: data.filter(d => d.period === 'day')[0].values
              .map(date => moment(date.end_time.date).format('MMM DD')),
            datasets: [{
              data: data.filter(d => d.period === 'day')[0].values
                .map(reach => reach.value)
            }]
          }
          this.postReachChart.loaded = true
        })
    },
    async getPageViews () {
      await this.$axios.$get('/api/facebook/page-views')
        .then((data) => {
          this.pageViewsChart.chartdata = {
            labels: data.filter(d => d.period === 'day')[0].values
              .map(date => moment(date.end_time.date).format('MMM DD')),
            datasets: [{
              data: data.filter(d => d.period === 'day')[0].values
                .map(view => view.value)
            }]
          }
          this.pageViewsChart.loaded = true
        })
    },
    async getPageLikes () {
      await this.$axios.$get('/api/facebook/page-likes')
        .then((data) => {
          this.pageLikesChart.chartdata = {
            labels: data.filter(d => d.period === 'day')[0].values
              .map(date => moment(date.end_time.date).format('MMM DD')),
            datasets: [{
              data: data.filter(d => d.period === 'day')[0].values
                .map(like => like.value)
            }]
          }
          console.log(this.pageLikesChart.chartdata)
          this.pageLikesChart.loaded = true
        })
    },
    async getPageFollowers () {
      await this.$axios.$get('/api/facebook/page-followers')
        .then((data) => {
          this.pageFollowersChart.chartdata = {
            labels: [moment().subtract(1, 'days').format('MMM DD')],
            datasets: [{
              data: [data.followers_count]
            }]
          }

          this.pageFollowersChart.loaded = true
        })
    },
    async getVideosViews () {
      await this.$axios.$get('/api/facebook/videos-views')
        .then((data) => {
          this.videosViewsChart.chartdata = {
            labels: data.filter(d => d.period === 'day')[0].values
              .map(date => moment(date.end_time.date).format('MMM DD')),
            datasets: [{
              data: data.filter(d => d.period === 'day')[0].values
                .map(view => view.value)
            }]
          }

          this.videosViewsChart.loaded = true
        })
    },
    async getPostEngagements () {
      await this.$axios.$get('/api/facebook/post-engagements')
        .then((data) => {
          this.postEngagementsChart.chartdata = {
            labels: data.filter(d => d.period === 'day')[0].values
              .map(date => moment(date.end_time.date).format('MMM DD')),
            datasets: [{
              data: data.filter(d => d.period === 'day')[0].values
                .map(engage => engage.value)
            }]
          }
          this.postEngagementsChart.loaded = true
        })
    }
  }
}
</script>

<style scoped>

</style>
