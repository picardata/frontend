<template>
    <modal :show.sync="modals.delete" :show-close="false">
      <template slot="header">
        <h5 class="modal-title">
          Delete card
        </h5>
      </template>
      <div>
        This cannot be undone, but you can always set up a new card.
      </div>
      <template slot="footer">
        <base-button @click="deleteUser" class="delete-button">
          Delete
        </base-button>
        <base-button @click="modals.delete = false" type="primary" class="cancel-button">
          Cancel
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
      await this.$axios.delete(`/api/billings/cards/${this.cardId}`)
      this.modals.delete = false
      this.$emit('onDelete')
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
  margin-right: -6%;
}

.delete-button {
  background: #FFFFFF;
  color: #2534B6;
}
</style>