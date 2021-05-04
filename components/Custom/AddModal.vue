<template>
  <modal :show.sync="modals.createGroup" class="picardata-std-modal">
    <template slot="close-button">
      <div class="close-button" @click="closeForm">
        <span class="pd-icon pdicon-Cross" />
      </div>
    </template>
    <template slot="header">
      <div>
        <div class="row back-arrow-parent">
          <div class="col-md-12">
            <a class="pd-icon pdicon-Back-Arrow back-arrow" :href="href" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <h5 class="parent-title">
              <div v-if="form.new">
                <span class="first-title">Creating <slot name="first-title" /> for </span><span class="second-title">Hubspot</span>
              </div>
              <div v-else>
                Contact Information
              </div>
            </h5>
          </div>
        </div>
      </div>
    </template>
    <div class="picardata-std-form-input">
      <slot name="content" />
    </div>
    <template slot="footer">
      <base-button type="primary" @click.prevent="saveGroup">
        Finish adding data
      </base-button>
    </template>
  </modal>
</template>

<script>

export default {
  name: 'AddModal',
  props: ['modals', 'closeForm', 'form', 'href', 'saveGroup']
}
</script>
<style scoped lang="scss">

button {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
  margin-right: -6%;
}
</style>
