<template>
    <modal :show.sync="modals.add" :show-close="false" class="picardata-delete-modal">
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
                <span class="first-title" style="font-size: 24px;">Add New Card</span>
            </h5>
          </div>
        </div>
      </div>
    </template>
      <div>
        <div id="card-element"></div>
        <div class="mt-4">
          <input type="text" class="form-control" v-model="name" placeholder="Name on card">
        </div>
      </div>
      <template slot="footer">
        <div class="modal-footer-delete">
          <base-button @click="modals.add = false" class="cancel-button">
            Cancel
          </base-button>
          <base-button @click="addCard" type="primary" :disabled="formDisabled">
            Add New Card
          </base-button>
        </div>
      </template>
    </modal>
</template>

<script>
let stripe = {
  elements: undefined,
  card: undefined
}

export default {
  name: "InvoiceList",
  props: ['modals', 'cardId'],
  data() {
    return{
      formDisabled: true,
      name: '',
      token: '',
      card: false
    }
  },
  mounted() {
    this.insertStripe()
  },
  watch: {
    name: function (newVal, oldVal) {
      this.validateCard()
    },
    card: function (newVal, oldVal) {
      this.validateCard()
    },
  },
  methods: {
    handleClose() {
      this.modals.add = false
    },
    insertStripe() {
      stripe.elements = this.$stripe.elements();
      stripe.card = stripe.elements.create('card',{
        style: {
          base: {
            color: '#313131',
            fontWeight: '500',
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
          },
        },
      })
      stripe.card.mount('#card-element');

      let self = this
      stripe.card.on('change', function(event) {
        if (event.complete) {
          self.card = true
        } else if (event.error) {
          self.formDisabled = true
          self.card = false
        }
      });
    },
    async addCard() {
      let token = await this.$stripe.createToken(stripe.card)

      if (!token.hasOwnProperty('token')) {
        this.$notify({type: 'danger', message: 'This credit card type is not supported yet, try another credit card', timeout: 50000})
        return
      }

      this.handleClose()

      await this.$axios.post('/api/billings/cards', {
        token: token.token.id,
        name: this.name
      })

      this.$emit('onAdd')
      stripe.card.clear()
      this.name = ''

    },
    validateCard() {
      if (this.name && this.card) {
        this.formDisabled = false
        return
      }

      this.formDisabled = true
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-footer-delete {
  margin: auto;
}

button {
  width: 200px;
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
  margin-right: -6%;
}

.cancel-button {
  background: #FFFFFF;
  color: #2534B6;
  border-color: #2534B6;
}

#card-element{
  border: 1px solid #A4A4A4;
  padding: 24px;
  border-radius: 16px;
}

.form-control-label{
  color: #313131;
  font-size: 16px;
  font-weight: normal;
}

.form-control{
  background: #EFF0F6;
  padding: 18px 24px;
  color: #313131;
  font-size: 16px;
  border-radius: 16px;
  min-height: 64px;

  ::placeholder{
    color: #A0A3BD;
  }
}
</style>