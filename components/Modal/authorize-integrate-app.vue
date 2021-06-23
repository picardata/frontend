<template>
  <div>
    <header class="modal-header">
      <h5 id="exampleModalLabel" class="modal-title" />
      <button type="button" data-dismiss="modal" aria-label="Close" class="close" @click="$emit('dismissModal')">
        <span class="pd-icon pdicon-Cross" />
      </button>
    </header>
    <div>
      <img
        slot="image"
        class="card-img-top card-img-logo"
        :src="app.logo"
        alt="Card image cap"
      >
      <p class="mt-3 notify-text font-weight-bolder title-text">
        Picardata wants to access your <span class="text-primary">{{ app.name }}</span> account
      </p>
      <p class="content-text">
        This will allow Picardata to:
      </p>
      <ul class="content-text">
        <li>View and access your data <i class="pd-icon pdicon-Alert-info" /></li>
      </ul>
    </div>
    <footer slot="modal-footer">
      <div class="w-100 mr-4 text-right">
        <base-button tag="a" type="primary" target="_blank" :href="app.oauthUrl">
          Integrate now
        </base-button>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'AuthorizeIntegrateModal',
  props: {
    app: Object,
    dismissModal: Function
  }
}
</script>
