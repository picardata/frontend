<template>
  <div>
    <header class="modal-header">
      <h5 id="modalIntegrated1" class="modal-title" />
      <button type="button" data-dismiss="modal" aria-label="Close" class="close" @click="$emit('dismissModal')">
        <span class="pd-icon pdicon-Cross" />
      </button>
    </header>
    <section class="modal-body">
      <div>
        <p class="mt-3 notify-text font-weight-bolder title-text">
          Integrate <span class="text-primary">{{ app.name }}</span> to Picardata
        </p>
        <p class="content-text">
          You can monitor your integrated app.
          You’re going to integrate “{{ app.name }}”. Click the button below to continue.
        </p>
      </div>
    </section>
    <footer class="modal-footer">
      <div class="w-100 mr-4 text-right">
        <base-button tag="a" type="primary" target="_blank" style="color:white" @click="$emit('appClick')">
          Integrate now
        </base-button>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'IntegrateAppModal',
  props: {
    dismissModal: Function,
    appClick: Function,
    app: Object
  }
}
</script>
