<template>
  <div>
    <div class="row">
      <div class="col-6">
        <h1>Manage Cards</h1>
      </div>
      <div class="col-6">
        <button class="btn btn-lg btn-primary btn-round float-right">
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
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="showAll">
              <tr v-for="(card, index) in cards" :key="index + cards.date">
                <td>{{ card.number }}</td>
                <td> {{ card.expired }} </td>
                <td><img src="~/assets/visa_logo.svg" alt="Visa-Logo"></td>
                <td>
                  <span v-if="card.isDefault" class="card-default">Default card</span>
                  <span v-else class="card-option">
                  <a class="color-primary" href="#">Set as default</a>
                  |
                  <a class="delete-icon" href="#" @click.prevent="showModalDelete(index)"><i class="fa fa-trash-alt"></i></a>
                </span>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="card in 3" :key="card">
                <td>{{ cards[card - 1].number }}</td>
                <td> {{ cards[card - 1].expired }} </td>
                <td><img src="~/assets/visa_logo.svg" alt="Visa-Logo"></td>
                <td>
                  <span v-if="cards[card - 1].isDefault" class="card-default">Default card</span>
                  <span v-else class="card-option">
                  <a class="color-primary" href="#">Set as default</a>
                  |
                  <a class="delete-icon" href="#" @click.prevent="showModalDelete(card - 1)"><i class="fa fa-trash-alt"></i></a>
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
  </div>
</template>

<script>
export default {
  name: "InvoiceList",
  data () {
    return {
      cards: [
        {
          number: '****1251',
          expired: '1/2025',
          isDefault: true,
        },
        {
          number: '****1252',
          expired: '2/2025',
          isDefault: false,
        },
        {
          number: '****1253',
          expired: '3/2025',
          isDefault: false,
        },
        {
          number: '****1254',
          expired: '4/2025',
          isDefault: false,
        },
        {
          number: '****1255',
          expired: '5/2025',
          isDefault: false,
        },
        {
          number: '****1256',
          expired: '6/2025',
          isDefault: false,
        },
        {
          number: '****1257',
          expired: '7/2025',
          isDefault: false,
        },
        {
          number: '****1258',
          expired: '8/2025',
          isDefault: false,
        },
        {
          number: '****1259',
          expired: '9/2025',
          isDefault: false,
        },
        {
          number: '****1250',
          expired: '10/2025',
          isDefault: false,
        },
      ],
      modals: {
        delete: false
      },
      showAll: false,
      selectedCard: 0
    }
  },
  methods: {
    showModalDelete (id) {
      this.modals.delete = true
      this.selectedCard = id
    },
    deleteUser () {
      this.cards.splice(this.selectedCard, 1)
      this.modals.delete = false
    }
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
  padding: 10px 14px;
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
</style>