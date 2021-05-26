<template>
    <modal :show.sync="modals.delete">
      <template slot="header">
        <h5 class="modal-title">
          Delete card
        </h5>
      </template>
      <div>
        Are you sure want to delete this card?
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="modals.delete = false">
          Cancel
        </base-button>
        <base-button type="danger" @click="deleteUser">
          Delete
        </base-button>
      </template>
    </modal>
</template>

<script>
export default {
  name: "InvoiceList",
  props: ['modals', 'cardId'],
  methods: {
    async deleteUser () {
    //   this.cards.splice(this.cardId, 1)
      console.log('masuk bro !')
      console.log(this.cardId)
      this.modals.delete = false
      this.$emit('onDelete')
    }
  }
}
</script>
