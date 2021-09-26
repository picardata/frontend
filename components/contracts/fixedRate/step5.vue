<template>
  <div>
    <div class="card border p-4">
      <div class="mr-3">
        <div class="all-form-title bold-text form-field">
          <span class="text-label"> Contract has been created </span><br/>
        </div>
      </div>
    </div>

    <div class="card border p-4">
      <div class="mr-3">
        <div class="all-form-title bold-text form-field">
          <span class="text-label"> Contract details </span><br/>

          <div class="contract-review-field-wrapper">
            <span class="text-left">Contractor's start date</span>
            <span class="text-right text-date">27 September 2021</span>
          </div>

          <div class="contract-review-field-wrapper">
            <span class="text-left">Contractor Type</span>
            <span class="text-right text-date">Fixed Rate</span>
          </div>

          <div class="contract-review-field-wrapper">
            <span class="text-left">Entity Name</span>
            <span class="text-right text-date">{{contract.legalEntity}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card border p-4">
      <div class="mr-3">
        <div class="all-form-title bold-text form-field">
          <span class="text-label"> Job Role </span><br/>

          <div class="contract-review-field-wrapper">
            <span class="text-left">Job Title</span>
            <span class="text-right text-date">{{contract.jobTitle}}</span>
          </div>

          <div class="contract-review-field-wrapper">
            <span class="text-left">Seniority Level</span>
            <span class="text-right text-date">{{this.seniorityLevels[contract.seniorityLevel].name}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card border p-4">
      <div class="mr-3">
        <div class="all-form-title bold-text form-field">
          <span class="text-label"> Scope </span><br/>

          <div class="contract-review-field-wrapper">
            <span class="text-left">{{contract.scopeOfWork}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card border p-4">
      <div class="mr-3">
        <div class="all-form-title bold-text form-field">
          <span class="text-label"> Payment Details </span><br/>

          <div class="contract-review-field-wrapper">
            <span class="text-left">Rate</span>
            <span class="text-right text-date">{{contract.salaryCurrency}} {{contract.salaryAmount}} per {{this.salaryFrequencies[contract.salaryFrequency].name}}</span>
          </div>

          <div class="contract-review-field-wrapper">
            <span class="text-left">Invoice cycle ends</span>
            <span class="text-right text-date">{{this.invoiceCycleEndsOptions[contract.invoiceCycleEnds].name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'step5',
  auth: true,
  components: {},
  props: [
    'contract'
  ],
  data () {
    return {
      invoicePaymentDueOptions: [
        {
          name: 'Same day',
          id: 1
        },
        {
          name: '5 Days later',
          id: 2
        },
        {
          name: '7 Days later',
          id: 3
        },
        {
          name: '15 Days later',
          id: 4
        },
        {
          name: '30 Days later',
          id: 5
        },
        {
          name: '60 Days later',
          id: 6
        },
        {
          name: '90 Days later',
          id: 7
        }
      ],
      invoiceCycleEndsOptions: [
        {
          name: '1st of the month',
          id: 1
        },
        {
          name: '2nd of the month',
          id: 2
        },
        {
          name: '3rd of the month',
          id: 3
        },
        {
          name: '4th of the month',
          id: 4
        },
        {
          name: '5th of the month',
          id: 5
        },
        {
          name: '6th of the month',
          id: 6
        },
        {
          name: '7th of the month',
          id: 7
        },
        {
          name: '8th of the month',
          id: 8
        },
        {
          name: '9th of the month',
          id: 9
        },
        {
          name: '10th of the month',
          id: 10
        },
        {
          name: '11th of the month',
          id: 11
        },
        {
          name: '12th of the month',
          id: 12
        },
        {
          name: '13th of the month',
          id: 13
        },
        {
          name: '14th of the month',
          id: 14
        },
        {
          name: '15th of the month',
          id: 15
        },
        {
          name: '16th of the month',
          id: 16
        },
        {
          name: '17th of the month',
          id: 17
        },
        {
          name: '18th of the month',
          id: 18
        },
        {
          name: '19th of the month',
          id: 19
        },
        {
          name: '20th of the month',
          id: 20
        },
        {
          name: '21st of the month',
          id: 21
        },
        {
          name: '22nd of the month',
          id: 22
        },
        {
          name: '23rd of the month',
          id: 23
        },
        {
          name: '24th of the month',
          id: 24
        },
        {
          name: '25th of the month',
          id: 25
        },
        {
          name: '26th of the month',
          id: 26
        },
        {
          name: '27th of the month',
          id: 27
        },
        {
          name: '28th of the month',
          id: 28
        },
        {
          name: '29th of the month',
          id: 29
        },
        {
          name: '30th of the month',
          id: 30
        },
        {
          name: 'Last day of the month',
          id: 31
        }
      ],
      salaryFrequencies: [
        {
          name: 'Week',
          id: 1
        },
        {
          name: 'Every other week',
          id: 2
        },
        {
          name: 'Twice a month',
          id: 3
        },
        {
          name: 'Month',
          id: 4
        }
      ],
      seniorityLevels: [
        {
          name: 'Not applicable',
          id: 1
        },
        {
          name: 'Junior',
          id: 2
        },
        {
          name: 'Mid',
          id: 3
        },
        {
          name: 'Senior',
          id: 4
        },
        {
          name: 'Lead',
          id: 5
        },
        {
          name: 'Principal / Staff',
          id: 6
        },
        {
          name: 'Director',
          id: 7
        },
        {
          name: 'Head of Department',
          id: 8
        },
        {
          name: 'Vice President',
          id: 9
        },
        {
          name: 'Senior Vice President',
          id: 10
        },
        {
          name: 'C-level Executive',
          id: 11
        }
      ]
    }
  },
  methods: {
  }
}
</script>
