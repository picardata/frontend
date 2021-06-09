<template>
  <div>
    <div class="row mt-80">
      <div class="col-12">
        <div class="welcome">
          <img src="~/assets/nav_logo_dark.png" alt="Picardta" class="mr-4"> Welcome to Picardata!
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <p class="paragraph">
          Welcome to your Picardata! Here in Picardata you will see a bunch of benefits to view, check and maintenance your integrated app. Picardata is a tool that can help you managing your applications; either it’s to add any access to your applications or maybe other things!
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WelcomeOnboard'
}
</script>
<style scoped>
.welcome {
   font-size: 24px;
   font-weight: 700;
   color: #14142B;
   line-height: 50px;
}

.paragraph {
  color: #313131;
  font-size: 16px;
}

.mt-80{
  margin-top: 80px;
}
</style>
