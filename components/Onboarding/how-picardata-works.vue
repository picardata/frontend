<template>
  <div>
    <div class="row mt-5">
      <div class="col-12 main-title">
        <img src="~/assets/nav_logo_dark.png" alt="Picardata"> How Picardata works?
      </div>
    </div>
    <div class="row mt-5">
      <div class="card-deck">
        <div class="card">
          <div class="card-body p-4">
            <div class="card-title title">
              YOUR APPS
            </div>
            <p class="card-text">
              You probably have a tons of app to manage. Social media, design tools, sales and marketing and much more.
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-body p-4">
            <div class="card-title title">
              HANDLE YOUR APPS
            </div>
            <p class="card-text">
              How do you manage your apps precisely? Picardata can do that for you to monitor and view how they work.
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-body p-4">
            <div class="card-title title">
              INTEGRATE YOUR APP
            </div>
            <p class="card-text">
              Firstly you have to integrate them. You can add, revoke and view data and access within your app.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HowPicardataWorks'
}
</script>
<style>
.title {
  color: #3E4EDD;
  font-weight: bold;
  font-size: 18px;
}

.main-title {
   font-size: 24px;
   font-weight: 700;
   color: #14142B;
   line-height: 50px;
}
</style>
