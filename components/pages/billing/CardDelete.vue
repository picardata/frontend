<template>
    <modal :show.sync="modals.delete" :show-close="false" class="picardata-delete-modal">
    <template slot="header">
      <div>
        <div class="row back-arrow-parent">
          <div class="col-md-12">
            <a class="pd-icon pdicon-Back-Arrow back-arrow" 
               @click="handleClose" 
               style="color: #14142B;font-size: 200%;cursor: pointer;"/>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <h5 class="parent-title">
                <span class="first-title" style="font-size: 20px;">Are you sure want to delete this card?</span>
            </h5>
          </div>
        </div>
      </div>
    </template>
      <div>
        This cannot be undone, but you can always set up a new card.
      </div>
      <template slot="footer">
        <div class="modal-footer-delete">
          <base-button @click="deleteUser" class="delete-button">
            Delete Card
          </base-button>
          <base-button @click="modals.delete = false" type="primary" class="cancel-button">
            Cancel
          </base-button>
        </div>
      </template>
    </modal>
</template>

<script>
export default {
  name: "InvoiceList",
  props: ['modals', 'cardId'],
  methods: {
    async deleteUser () {
      this.modals.delete = false
      await this.$axios.delete(`/api/billings/cards/${this.cardId}`)
      this.$emit('onDelete')
    },
    handleClose() {
      this.modals.delete = false
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-footer-delete {
  margin: auto;
}

button {
  width: 200px;
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
  border-color: #2534B6;
}
</style>