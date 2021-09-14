<template>
  <div>
    <div class="row mt-80">
      <div class="col-12">
        <div class="welcome">
          Welcome to Globelise!
        </div>
      </div>
    </div>
    <div class="row mt-24">
      <div class="col-12" style="text-align: center">
        <p class="contractor-type paragraph" >
          What kind of contractor are you?
        </p>
      </div>
    </div>

    <div class="row mt-4 user-type">
      <div class="col-5">
        <p class="paragraph" >
          <b>I am an entity </b>
          <br/> Your entity information will be used on invoices and tax documentation
        </p>
      </div>
      <div class="col-2">
      </div>
      <div class="col-5">
        <p class="paragraph" >
          <b>I am an individual </b>
          <br/> Your full information will be used on invoices and tax documentation
        </p>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'WelcomeOnboard',

  }


</script>
<style lang="scss" scoped>
  .welcome {
    font-size: 18px;
    font-weight: 700;
    color: #14142B;
    line-height: 50px;
    text-align: center;
  }

  .paragraph {
    color: #313131;
    font-size: 16px;
  }

  .contractor-type {
    font-size: 24px;
  }

  .user-type {
    p {
      color: gray;

      b {
        color: black;
        font-size: 18px;
      }
    }
  }

  .mt-80{
    margin-top: 80px;
  }
</style>
