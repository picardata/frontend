<template>
    <modal :show.sync="modals.createGroup" class="picardata-std-modal">
        <template slot="close-button">
        <div class="close-button" v-on:click="closeForm"><span class="pd-icon pdicon-Cross"></span></div>
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
                <div v-if="form.new"><span class="first-title">Adding <slot name="first-title"></slot> for </span><span class="second-title">Hubspot</span></div>
                <div v-else>Contact Information</div>
                </h5>
            </div>
            </div>
        </div>
        </template>
        <div class="picardata-std-form-input">
            <slot name="content"></slot>
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
  props: ["modals", "closeForm", "form", "href", "saveGroup"]
}
</script>