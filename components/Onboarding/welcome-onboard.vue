<template>
  <div>
    <div class="row mt-30">
      <div class="col-12">
        <div class="welcome">
          Welcome back!
        </div>
      </div>
    </div>
    <div class="row mt-24">
      <div class="col-12" style="text-align: center">
        <p class="contractor-type paragraph">
          What kind of contractor are you?
        </p>
      </div>
    </div>

    <div class="row mt-4 user-type">
      <div class="col-6 entity-wrapper">
        <div class="image-wrapper">
          <img class="mb-4" src="~/assets/onboarding/entity.png" alt="Entity">
        </div>

        <p class="paragraph">
          <b>I am an entity </b>
          <br>I am hiring on behalf of my company
          <br>I would like to include my entity's information on invoices and tax documentation.
        </p>
      </div>

      <div class="col-6 individual-wrapper">
        <div class="image-wrapper">
          <img class="mb-4" src="~/assets/onboarding/individual.png" alt="Individual">
        </div>
        <p class="paragraph">
          <b>I am an individual </b>
          <br>I am hiring independently. I would like to include my information on invoices and tax documentation.
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
<style lang="scss" scoped>
  .entity-wrapper {
    border-right: 1px solid #dfdfdf;
  }

  .entity-wrapper, .individual-wrapper {
    padding: 10px 30px;

    .paragraph {
      color: #313131;
      font-size: 14px;
      padding: 0 60px;
    }
  }

  .image-wrapper {
    text-align: center;
  }

  .welcome {
    font-size: 18px;
    font-weight: 700;
    color: #14142B;
    line-height: 50px;
    text-align: center;
  }

  .contractor-type {
    font-size: 36px;
    color: #2e4823;
    font-weight: 900;
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
