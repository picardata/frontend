<template>
  <div class="card-list">
    <div class="row">
      <div class="col-6">
        <h1>Manage Cards</h1>
      </div>
      <div class="col-6">
        <button class="btn btn-lg btn-primary btn-round float-right" @click="modals.add = true">
          Add New Card
        </button>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Card Number</th>
              <th scope="col">Expired Month/Year</th>
              <th scope="col">Card Type</th>
              <th scope="col" width="10%">Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="showAll">
              <tr v-for="(card, index) in cards" :key="card.id">
                <td>{{ card.brand }}</td>
                <td> {{ card.expired }} </td>
                <td>
                  <img v-if="card.brand === 'MasterCard' " src="img/billing/mastercard.png" alt="Mastercard-Logo" class="brand-logo">
                  <img v-if="card.brand === 'Visa' " src="img/billing/visa_logo.svg" alt="Visa-Logo" class="brand-logo">
                  <img v-if="card.brand === 'American Express' " src="img/billing/amex.png" alt="American-Express-Logo" class="brand-logo">
                  <img v-if="card.brand === 'UnionPay' " src="img/billing/unionpay.png" alt="Unionpay-Logo" class="brand-logo">
                </td>
                <td>
                  <span v-if="card.isDefault" class="card-default">Default card</span>
                  <span v-else class="card-option">
                  <a class="color-primary" href="#">Set as default</a>
                  |
                  <a class="delete-icon" href="#" @click.prevent="showModalDelete(card.id)"><i class="far fa-trash-alt"></i></a>
                </span>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="card in this.totalToDisplay" :key="card">
                <td>{{ cards[card - 1].brand }}</td>
                <td> {{ cards[card - 1].expired }} </td>
                <td>
                  <img v-if="cards[card-1].brand === 'MasterCard' " src="img/billing/mastercard.png" alt="Mastercard-Logo" class="brand-logo">
                  <img v-if="cards[card-1].brand === 'Visa' " src="img/billing/visa_logo.svg" alt="Visa-Logo" class="brand-logo">
                  <img v-if="cards[card-1].brand === 'American Express' " src="img/billing/amex.png" alt="American-Express-Logo" class="brand-logo">
                  <img v-if="cards[card-1].brand === 'UnionPay' " src="img/billing/unionpay.png" alt="Unionpay-Logo" class="brand-logo">
                </td>
                <td>
                  <span v-if="cards[card - 1].isDefault" class="card-default">Default card</span>
                  <span v-else class="card-option">
                  <a class="color-primary" href="#">Set as default</a>
                  |
                  <a class="delete-icon" href="#" @click.prevent="showModalDelete(cards[card - 1].id)"><i class="far fa-trash-alt"></i></a>
                </span>
                </td>
              </tr>
            </template>
            <tr v-if="!showAll && cards.length > 3">
              <td><a href="#" @click.prevent="showAll = true"> See {{ cards.length - 3 }} cards more </a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <CardDelete :modals="modals" :cardId="selectedCard" @onDelete="deleteCreditCard"/>

    <CardAdd :modals="modals" @onAdd="addCreditCard"/>
  </div>
</template>

<script>
import CardDelete from "@/components/pages/billing/CardDelete"
import CardAdd from "@/components/pages/billing/CardAdd"

export default {
  name: "InvoiceList",
  async fetch () {
    await this.updateData();
  },
  components: {
    CardDelete,
    CardAdd
  },
  data () {
    return {
      cards: [],
      totalToDisplay: 0,
      modals: {
        delete: false,
        add: false
      },
      showAll: false,
      selectedCard: 0
    }
  },
  methods: {
    async deleteCreditCard() {
      await this.updateData();
      this.$notifySuccess('Card successfully deleted');
    },
    async addCreditCard() {
      await this.updateData();
      this.$notifySuccess('Card successfully added');
    },
    showModalDelete (id) {
      this.modals.delete = true
      this.selectedCard = id
    },
    deleteUser () {
      this.cards.splice(this.selectedCard, 1)
      this.modals.delete = false
    },
    async updateData() {
      const cardsRaw = await this.$axios.get('/api/billings/cards')

      // console.log('cards raw = ')
      const cards = cardsRaw.data.cards

      const newCards = []
      for(let i=0;i<cards.length;i++) {
        const card = cards[i]

        newCards.push({
          id: card.id,
          number: `****${card.last4}`,
          expired: `${card.exp_month}/${card.exp_year}`,
          isDefault: false,
          brand: card.brand
        })
      }

      if(newCards.length > 0) {
        newCards[0].isDefault = true;
      }

      this.cards = newCards
      if (newCards.length <= 3) {
        this.totalToDisplay = newCards.length
      } else if(newCards.length > 3) {
        this.totalToDisplay = 3;
      }
    },
  }
}
</script>

<style lang="scss" scoped>

h1{
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: 0.75px;
  text-align: left;
}
.btn-round {
  height: 56px;
  border-radius: 40px;
  font-weight: normal;
  font-size: 14px;
  padding: 10px 24px;
  letter-spacing: 0.75px;
}

table{
  thead{
    th{
      border-top: none;
      border-bottom: none;
      color: #313131;
      font-weight: 600;
      font-size: 16px;
      padding-left: 0;
      text-transform: capitalize;
    }
  }
  tbody{
    td{
      color: #313131;
      font-weight: normal;
      font-size: 16px;
      letter-spacing: 0.75px;
      border: none;
      padding-left: 0;
    }
  }
  .badge{
    color: #000000;
    letter-spacing: 0.75px;
    font-weight: 600;
    font-size: 12px;
    border-radius: 4px;
    &.badge-posted{
      background-color: #FFDD63;
    }
    &.badge-paid{
       background-color: #DAE6FF;
    }
  }
}

.card-default{
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.75px;
  color: #ACACAC;
}

.card-option{
  color: #BDBDBD;

  .color-primary{
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.75px;
    color: #2534B6;
    margin-right: 12px;
  }

  .delete-icon{
    color: #7B7B7D;
    font-size: 20px;
    margin-left: 12px;
  }
}

.brand-logo{
  width: 38px;
}
</style>