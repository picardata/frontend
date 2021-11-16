<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <base-header type="grey" class="pb-6">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h2 class="form-title">
                {{ contractName }}
              </h2>
              <span class="mr-4">{{ contractStatusOptions[contractStatus].name }}</span>
              <span class="mr-4 text-bold">PAY AS YOU GO</span>
              <span>TEAM: <span class="text-bold">{{ legalEntity }}</span></span>
            </div>
          </div>
        </base-header>
        <div class="container-fluid mt--6">
          <div class="row mt-6 contract-type-wrapper">
            <div class="col-2" />
            <div class="col-8">
              <div>
                <h2 class="form-title text-left">
                  Signatures
                </h2>
              </div>
              <div v-if="contractStatus == 1" class="card border p-4">
                <div class="mr-3">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label">Client sign here </span><br>
                    <div class="contract-review-field-wrapper no-background">
                      <button type="button" class="btn btn-lg btn-primary btn-add next-btn signature-btn" @click.prevent="modals.clientSignature = true">
                        Review & Sign
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="contractStatus > 1" class="card border p-4">
                <div class="mr-3">
                  <div class="all-form-title bold-text form-field signed-signature-wrapper">
                    <div class="text-left">
                      <span class="text-label text-signature client-signature">{{ clientSignature }} </span><br>
                      <span class="text-label">{{ company.name }}</span><br>
                      <span class="">{{ company.street }}</span><br>
                      <span class="">{{ company.city }}</span><br>
                      <span class="">{{ company.postalCode }}</span>
                    </div>
                    <div class="text-right">
                      <span class="text-label">Signed by Client</span><br>
                      <span>Date: {{ $moment(clientSignedDate).format("ll") }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="contractStatus == 1 || contractStatus == 2" class="card border p-4">
                <div class="mr-3">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label">Contractor sign here </span><br>
                    <div class="contract-review-field-wrapper no-background">
                      <button type="button" class="btn btn-lg btn-primary btn-add next-btn signature-btn" :disabled="disableInvitationButton" @click.prevent="modals.contractorEmailInvitation = true">
                        Invite contractor
                      </button>

                      <button type="button" class="btn btn-lg btn-primary btn-add next-btn signature-btn" :disabled="disableInvitationButton" @click.prevent="modals.contractorSignature = true">
                        Review & Sign
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="contractStatus > 2" class="card border p-4">
                <div class="mr-3">
                  <div class="all-form-title bold-text form-field signed-signature-wrapper">
                    <div class="text-left">
                      <span class="text-label text-signature client-signature">{{ contractorSignature }} </span><br>
                      <span class="text-label">{{ company.name }}</span><br>
                      <span class="">{{ company.street }}</span><br>
                      <span class="">{{ company.city }}</span><br>
                      <span class="">{{ company.postalCode }}</span>
                    </div>
                    <div class="text-right">
                      <span class="text-label">Signed by Contractor</span><br>
                      <span>Date: {{ $moment(contractorSignedDate).format("ll") }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 class="form-title text-left">
                  Review the contract details
                </h2>
              </div>
              <div class="card border p-4">
                <div class="mr-3">
                  <div v-if="typeOfContractDocument === '1'" class="all-form-title bold-text form-field">
                    <img class="contract-type-img mr-4 text-right" src="~/assets/contract/pay_as_you_go_contract.png" alt="Pay as you go contract">

                    <span>This deal is using custom contract </span>

                    <a href="#" @click.prevent="downloadPdf">
                      <img class="text-right float-right download-contract-link" src="~/assets/menu_icons/Download02.png" alt="Download contract">
                    </a>
                  </div>
                  <div v-else class="all-form-title bold-text form-field">
                    <img class="contract-type-img mr-4 text-right" src="~/assets/contract/pay_as_you_go_contract.png" alt="Pay as you go contract">

                    <span>This deal is using the standard Globelise contract</span>

                    <a href="#" @click.prevent="downloadPdf">
                      <img class="text-right float-right download-contract-link" src="~/assets/menu_icons/Download02.png" alt="Download contract">
                    </a>
                  </div>
                </div>
              </div>
              <div class="card border p-4">
                <div class="mr-3">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label"> Contract details </span><br>
                    <div class="contract-review-field-wrapper">
                      <span class="text-left">Contractor's start date</span>
                      <span class="text-right text-date">{{ $moment(startDate).format("ll") }}</span>
                    </div>
                    <div class="contract-review-field-wrapper">
                      <span class="text-left">Contractor Type</span>
                      <span class="text-right text-date">Pay as you go</span>
                    </div>
                    <div class="contract-review-field-wrapper">
                      <span class="text-left">Entity Name</span>
                      <span class="text-right text-date">{{ legalEntity }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card border p-4">
                <div class="mr-3">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label"> Job Role </span>
                    <button v-if="contractStatus === '1'" type="button" class="btn btn-sm btn-tertiary float-right mr-0" @click.prevent="modals.jobRole = true">
                      Edit
                    </button><br>
                    <div class="contract-review-field-wrapper">
                      <span class="text-left">Job Title</span>
                      <span class="text-right text-date">{{ jobTitle }}</span>
                    </div>
                    <div class="contract-review-field-wrapper">
                      <span class="text-left">Seniority Level</span>
                      <span class="text-right text-date">{{ this.seniorityLevels[seniorityLevel].name }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card border p-4">
                <div class="mr-3">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label">Payment Details </span>
                    <button v-if="contractStatus === '1'" type="button" class="btn btn-sm btn-tertiary float-right mr-0" @click.prevent="modals.paymentDetails = true">
                      Edit
                    </button>
                    <br>
                    <div v-if="salaryFrequency !== null" class="contract-review-field-wrapper">
                      <span class="text-left">Rate</span>
                      <span class="text-right text-date">{{ salaryCurrency }} {{ salaryAmount }} per {{ this.salaryFrequencies[salaryFrequency].name }}</span>
                    </div>
                    <div v-if="invoiceCycleEnds !== null" class="contract-review-field-wrapper">
                      <span class="text-left">Invoice cycle ends</span>
                      <span class="text-right text-date">{{ this.invoiceCycleEndsOptions[invoiceCycleEnds].name }}</span>
                    </div>
                    <div v-if="invoiceCycleEnds !== null && invoicePaymentDue !== null" class="contract-review-field-wrapper">
                      <span class="text-left">Payment due</span>
                      <span class="text-right text-date">{{ this.invoicePaymentDueOptions[invoicePaymentDue].name }}</span>
                    </div>
                    <div v-if="invoiceCycleEnds !== null && isInvoicePaymentPayAheadOfTheWeekend !== null" class="contract-review-field-wrapper">
                      <span class="text-left">Pay ahead of the weekend</span><br>
                      <span class="text-left" style="font-size: 13px;">If the payment due is on a weekend, pay on Friday</span>
                      <span v-if="isInvoicePaymentPayAheadOfTheWeekend === true" class="text-right text-date">On</span>
                      <span v-else class="text-right text-date">Off</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card border p-4">
                <div class="mr-3">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label">First payment </span>
                    <button v-if="contractStatus === '1'" type="button" class="btn btn-sm btn-tertiary float-right mr-0" @click.prevent="modals.firstPayment = true">
                      Edit
                    </button><br>
                    <div class="contract-review-field-wrapper">
                      <span class="text-left">Date</span>
                      <span class="text-right text-date">{{ $moment(firstPaymentDate).format("ll") }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card border p-4">
                <div class="mr-3">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label">Stock options </span>
                    <button v-if="contractStatus === '1'" type="button" class="btn btn-sm btn-tertiary float-right mr-0" @click.prevent="modals.stockOffer = true">
                      Edit
                    </button><br>
                    <div v-if="stockOptionAggregateValue !== null" class="contract-review-field-wrapper">
                      <span class="text-left">Stock options</span>
                      <span class="text-right">${{ stockOptionAggregateValue }}</span><br>
                      <span class="text-left">To be offered</span>
                      <span class="text-right">{{ stockOptionCurrency }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card border p-4">
                <div class="mr-3">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label"> Scope </span>
                    <button v-if="contractStatus === '1'" type="button" class="btn btn-sm btn-tertiary float-right mr-0" @click.prevent="modals.scope = true">
                      Edit
                    </button><br>
                    <div class="contract-review-field-wrapper">
                      <span class="text-left">{{ scopeOfWork }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card border p-4">
                <div class="mr-3">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label">Country compliance </span>
                    <button v-if="contractStatus === '1'" type="button" class="btn btn-sm btn-tertiary float-right mr-0" @click.prevent="modals.countryCompliance = true">
                      Edit
                    </button><br>
                    <div v-if="contractorTaxResidence !== null" class="contract-review-field-wrapper">
                      <span class="text-left">Contractor's Country</span>
                      <span class="text-right text-date">{{ contractorTaxResidence }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card border p-4">
                <div class="mr-3">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label">Other specifics</span>
                    <button v-if="contractStatus === '1'" type="button" class="btn btn-sm btn-tertiary float-right mr-0" @click.prevent="modals.otherSpecific = true">
                      Edit
                    </button><br>
                    <div v-if="additionalDocumentFilename !== null" class="contract-review-field-wrapper">
                      <img class="contract-type-img mr-4 text-right" src="~/assets/contract/pay_as_you_go_contract.png" alt="Pay as you go contract">

                      <span>This deal is using additional document</span>

                      <a href="#" @click.prevent="downloadAdditionalDocument">
                        <img class="text-right float-right download-contract-link" src="~/assets/menu_icons/Download02.png" alt="Download contract">
                      </a>
                    </div>

                    <div v-if="specialClause !== null" class="contract-review-field-wrapper">
                      <span class="text-left mb-2 full-width">Special Clause</span><br>
                      <span class="text-left">{{ specialClause }}</span>
                    </div>

                    <div class="contract-review-field-wrapper">
                      <span class="text-left mb-2 full-width">Who can add work</span><br>
                      <span v-if="canClientSubmitWork === true && canContractorSubmitWork === true" class="text-left">Both parties</span>
                      <span v-else-if="canClientSubmitWork === true && canContractorSubmitWork === false" class="text-left">Client only</span>
                      <span v-else-if="canClientSubmitWork === false && canContractorSubmitWork === true" class="text-left">Contractor only</span>
                      <span v-else class="text-left">Not applicable</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card border p-4">
                <div class="mr-3">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label">End of contract </span>
                    <button v-if="contractStatus === '1'" type="button" class="btn btn-sm btn-tertiary float-right mr-0" @click.prevent="modals.endOfContract = true">
                      Edit
                    </button><br>
                    <div class="contract-review-field-wrapper">
                      <span class="text-left">End date</span>
                      <span v-if="terminationDate !== null" class="text-right text-date">{{ $moment(terminationDate).format("ll") }}</span>
                      <span v-else class="text-right text-date">This contract doesn't have an end date.</span>
                    </div>
                    <div class="contract-review-field-wrapper">
                      <span class="text-left">Notice period</span>
                      <span class="text-right text-date">{{ noticePeriod }} days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :show.sync="modals.clientSignature" size="lg" modal-classes="modal-contract-details">
      <template slot="header" />
      <div class="full-contract-details-wrapper">
        <div class="mr-3">
          <div class="all-form-title bold-text form-field">
            <h3 class="contract-main-title mb-5">
              CONTRACTOR AGREEMENT
            </h3>

            <p>This Contractor Agreement <b>(“Agreement”)</b> is entered into as of {{ currentDate }} (the <b>“Effective Date”</b>), between:</p>

            <p>
              {{ company.name }}, Incorporation having its principal place of business at {{ company.street }} {{ company.city }} {{ company.postalCode }}, email address: <b>(“Client”)</b>, and
              [Contractor name], having its principal place of business at [street address, city,
              state, zip], registered under the number [Registration Number] and email
              address: [email], <b>(“Contractor”)</b>.
            </p>

            <p>
              Client and Contractor desire to have Contractor perform services for Client,
              subject to and in accordance with the terms and conditions of this Agreement.
              NOW, THEREFORE, the parties agree as follows:
            </p>

            <p><b>1. SERVICES</b></p>
            <p>
              <b>1.1. Statements of Work.</b> From time to time, Client and Contractor may execute
              one or more statement(s) of work, substantially in the form attached hereto as
              Exhibit A, detailing the specific services to be performed by Contractor (as
              executed, a <b>“Statement of Work”</b>). Each Statement of Work will expressly refer to
              this Agreement, will form a part of this Agreement, and will be subject to the terms
              and conditions contained herein. A Statement of Work may be amended only by a
              signed (by each party’s authorized signatory) and written agreement of the
              parties.
            </p>

            <p>
              <b>1.2. Performance of Services.</b> Contractor will perform the services described in
              each Statement of Work (the <b>“Services”</b>) in accordance with the terms and
              conditions set forth in each Statement of Work and this Agreement. Unless
              otherwise agreed by Client, Contractor will determine, in Contractor’s sole
              discretion, the manner and means by which the Services are accomplished,
              subject to the requirement that Contractor will at all times comply with applicable
              law and any compliance policies drawn to Contractors’ attention insofar as they
              are applicable to independent contractors.
            </p>

            <p>
              <b>1.3. Equipment and Facilities.</b> Unless otherwise provided in a Statement of Work,
              Contractor will perform the Services at Contractor’s offices or facilities, using
              Contractor’s instruments, equipment and tools. Contractor will determine the time,
              place and order in which Contractor will perform the Services in accordance with
              any milestones and/or timeline set forth in a Statement of Work.
            </p>

            <p>
              <b>1.4. Subcontractors.</b> Contractor may appoint a suitably skilled substitute in
              replacement of the initial personnel and shall be entitled to subcontract the
              performance of the Consultancy Services, provided that Client is satisfied that the
              sub-contractor possesses the necessary skills, expertise and resources to
              perform those elements of the Services and that Contractor ensures the
              substitute or subcontractor will abide by the same obligations Contractor is
              subject to under the terms of this Agreement regarding confidentiality, intellectual
              property, data protection, anti-bribery, anti-corruption, anti-tax avoidance; if so
              required, Contractor will ensure that the subcontractor or substitute enters into
              direct undertakings with Contractor regarding these obligations. Contractor will
              continue to be bound by all the obligations in this Agreement and will invoice
              Client and be responsible for the remuneration of the substitute or subcontractor.
              Contractor will keep Client fully and effectively indemnified against any
              reasonable costs, claims or expenses that may be incurred by it as a result of the
              use of such subcontractors including the reasonable cost of all instruction
              (necessitated by the subcontracting) for the sub-contractor.
            </p>

            <p><b>2. PAYMENT</b></p>

            <p>
              <b>2.1. Fees.</b> As Contractor’s sole compensation for the performance of Services,
              Client will pay Contractor the fees specified in each Statement of Work in
              accordance with the terms set forth therein. Contractor acknowledges and
              agrees that, if specified in a Statement of Work, Client’s payment obligation will be
              expressly subject to Contractor’s completion of Services provided therein or
              achievement of certain milestones to Client’s reasonable satisfaction.
            </p>

            <p>
              <b>2.2. Expenses.</b> Unless otherwise provided in the Statement of Work, Client will
              reimburse Contractor for reasonable travel and related expenses incurred in the
              course of performing the Services hereunder, provided, however, that any such
              expenses will be approved in advance in writing by Client. As a condition to
              receipt of reimbursement, Contractor will submit to Client reasonable evidence
              that the amount involved was both reasonable and necessary to the Services
              provided under this Agreement.
            </p>

            <p>
              <b>2.3. Payment Terms.</b> The payment terms will be set forth in the Statement of
              Work. The parties will use their respective commercially reasonable efforts to
              promptly resolve any payment disputes.
            </p>

            <p>
              <b>2.4.</b> Client acknowledges that Contractor has appointed Deel. Inc, a Delaware
              registered company having its headquarters at 650 2nd St, 94107, San
              Francisco, California, United States <b>(“Deel”)</b> as Contractor's limited payment
              agent for the purpose of facilitating the receipt of payments made by Client for
              services provided in connection with this Agreement and each Statement of Work
              using a payment method supported by Deel or by one of Deel's Payment Service
              Providers, and the disbursement of those payments to Contractor.
            </p>

            <p>
              <b>2.5.</b> Client agrees to make all payments to Contractor using one of the payment
              methods supported by the Deel platform. Client and Contractor represent and
              warrant that they have carefully read, understood and accepted the Deel
              platform terms and conditions (the <b>“Deel Terms and Conditions”</b>) available on
              the Deels’ website ( www.letsdeel.com/terms). In the event of any conflict
              between this Agreement and the Deel Terms and Conditions, this Agreement will
              govern. Both parties acknowledge that acceptance of the Deel Terms and
              Conditions by each party is a precondition to entering into this Agreement.
              Client will collect and process Contractor’s Personal Data in accordance with its
              privacy notice and applicable laws.
            </p>

            <p><b>3. RELATIONSHIP OF THE PARTIES</b></p>

            <p>
              <b>3.1. Independent Contractor.</b> Contractor’s relationship with Client will be that of
              an independent contractor acting as a service provider to Client, and not that of
              an employee, worker, agent or partner of Client. Contractor will not be entitled to
              any statutory benefits payable to employees or workers by law, or otherwise any
              benefits paid or made available by Client to its employees or workers, including,
              without limitation, any retirement or pension benefits, Employment Insurance,
              Canada Pension Plan, or provincial parental insurance plan contributions;
              participation in any plans, arrangements or distributions made by Client pertaining
              to any bonus, stock options, profit sharing, insurance or similar benefits; or any
              other end-of-service benefits payable to an employee or worker.
            </p>

            <p>
              <b>3.2. No Authority.</b> Contractor will have no authority to enter into agreements that
              bind Client or create obligations on the part of Client without the prior written
              authorization of Client. Contractor will not hold itself out as being an employee,
              agent, partner or assignee of Client, as having any authority to bind Client or to
              incur any liability on behalf of Client, and will make such absence of authority
              clear in its dealings with any third parties.
            </p>

            <p>
              <b>3.3. Status.</b> This contract is one for the provision of services and not a contract of
              employment and accordingly, Contractor will be solely responsible for(a)
              payment of all taxes, salaries, benefits, Employment Insurance and provincial
              parental insurance premiums, Canada Pension Plan contributions, withholding
              taxes, workers’ compensation, and disability insurance, and any other liability,
              deduction, contribution, assessment or claim arising from or made in connection
              with the performance of the Services required by any government agency; and
              (b) compliance with all applicable labour and employment requirements with
              respect to Contractor’s self-employment, sole proprietorship or other form of
              business organization. Contractor will report to all applicable government
              agencies as income all compensation received by Client pursuant to this
              Agreement. Contractor will ensure that none of its employees hold themselves out
              as being the employees of Client or having any authority at any time to bind
              Client, or otherwise attempt to claim any employment or other relationship with
              Client.
            </p>

            <p>
              <b>3.4. Liability.</b> Contractor will be liable for and will indemnify Client for any loss,
              liability, costs, (including reasonable fees and expenses of attorneys and other
              professionals), penalties, damages and expenses arising from any breach of the
              terms of this Agreement and/or any applicable Statement of Work (including its
              data protection provisions) by Contractor or by a subcontractor engaged by
              Contractor of the terms of this Agreement (including in relation to data protection
              obligations) or any other action or inaction by or for or on behalf of Contractor.
              Contractor will accordingly maintain in force suitable insurance policies.
              Contractor acknowledges that Client will not carry any liability insurance on behalf
              of Contractor. Contractor will provide promptly copies of such insurance obtained
              on reasonable request.
            </p>

            <p>
              <b>3.5. Indemnification by Contractor.</b> Tax Liability Indemnification by Contractor.
              Contractor will indemnify and hold Client harmless from and against all damages,
              liabilities, losses, penalties, fines, expenses and costs (including reasonable fees
              and expenses of attorneys and other professionals) arising out of or relating to
              any obligation imposed by law on Client to pay any withholding taxes,
              Employment Insurance or provincial parental insurance premiums, Canada
              Pension Plan contributions or similar items in connection with compensation
              received by Contractor pursuant to this Agreement. In the event of any violation
              by Contractor of applicable law related to this Section 3.5, Contractor will
              indemnify Client for and in respect of:
            </p>

            <p class="sub-point">
              a. payment of all taxes, salaries, benefits, Employment Insurance and Quebec
              Parental Insurance premiums, Quebec Pension Plan contributions,
              withholding taxes, workers’ compensation, and any other liability,
              deduction, contribution, assessment or claim arising from or made in
              connection with the performance of the Services required by any
              government agency; except where recovery by Client pursuant to this
              Section 3.5 is prohibited by law; and all reasonable costs, expenses,
              penalties, fines or interest incurred or payable by Client in connection with
              or in consequence of Contractor’s failure to pay any amounts due and
              owing to any government agency; except where Contractor’s failure to pay
              arose out of, was caused by, or was related to Client's negligence or
              intentional misconduct; and
            </p>

            <p class="sub-point">
              b. any liability arising from any employment-related claim or any claim based
              on worker status (including reasonable fees and expenses of attorneys and
              other professionals) brought by Contractor or any subcontractor against
              Client arising out of or in connection with the provision of the Services.
            </p>

            <p>
              <b>3.6. Set-off.</b> Client may, in its sole discretion, satisfy any of the indemnities set
              forth in Section 3.5 (in whole or in part) by way of deduction from any payments
              due to Contractor.
            </p>

            <p>
              <b>3.7. No expectation of renewal.</b> Contractor agrees that they have no expectation
              that this Agreement will be renewed at the expiry of the Contract Period and no
              representation regarding the renewal shall be valid and binding on Client unless
              recorded in writing and signed by both Parties.
            </p>

            <p><b>4. OWNERSHIP</b></p>

            <p>
              <b>4.1. Disclosure of Work Product.</b> Contractor will, as an integral part of the
              performance of Services, disclose in writing to Client all inventions, products,
              designs, drawings, notes, documents, information, documentation, improvements,
              works of authorship, processes, techniques, know-how, algorithms, specifications,
              biological or chemical specimens or samples, hardware, circuits, computer
              programs, databases, user interfaces, encoding techniques, and other materials
              of any kind that Contractor (or any subcontractor) may make, conceive, develop
              or reduce to practice, alone or jointly with others, or learned, in whole or in part,
              by or for or on behalf of Contractor during the term of this Agreement that relate
              to the subject matter of or arise out of or in connection with performing Services,
              or that result from or that are related to such Services, whether or not they are
              eligible for patent, copyright, mask work, trade secret, trademark or other legal
              protection (collectively, <b>“Contractor Work Product”</b>). Contractor Work Product
              includes all deliverables that Contractor has undertaken to provide Client in the
              course of performing the Services
            </p>

            <p>
              <b>4.2. Ownership of Contractor Work Product.</b> Contractor agrees that all
              Contractor Work Product will be the sole and exclusive property of Client.
              Contractor hereby irrevocably transfers and assigns to Client, and agrees to
              irrevocably transfer and assign to Client, all right, title and interest in and to
              Contractor Work Product, including all worldwide patent rights (including patent
              applications and disclosures), copyright rights, mask work rights, trademarks,
              trade secret rights, know-how, and any and all other intellectual property or
              proprietary rights (collectively, <b>“Intellectual Property”</b>) therein. At Client’s request
              and expense, during and after the term of this Agreement, Contractor will assist
              and cooperate with Client in all respects, and will execute documents, and will
              take such further acts reasonably requested by Client to enable Client to acquire,
              transfer, maintain, perfect and enforce its Intellectual Property and other legal
              protections for Contractor Work Product. Contractor hereby appoints the officers
              of Client as Contractor’s attorney-in-fact to execute documents on behalf of
              Contractor for this limited purpose, and agrees to execute a separate power of
              attorney for this purpose if instructed to do so by Client.
            </p>

            <p>
              <b>4.3. Moral Rights.</b> To the fullest extent permitted by applicable law, Contractor
              also hereby irrevocably transfers and assigns to Client, and agrees to irrevocably
              transfer and assign to Client, and waives and agrees never to assert, any and all
              Moral Rights (as defined below) that Contractor may have in or with respect to
              any Contractor Work Product, during and after the term of this Agreement.
              <b>“Moral Rights”</b> mean any right to which Contractor is now or may be at any future
              time be entitled to claim authorship of a work, to object to or prevent the
              modification or destruction of a work, to withdraw from circulation or control the
              publication or distribution of a work, and any similar right, existing under judicial
              or statutory law of any country in the world, or under any treaty, regardless of
              whether or not such right is called or generally referred to as a <b>“moral right.”</b>
            </p>

            <p>
              <b>4.4. Related Rights.</b> To the extent that Contractor owns or controls (in the present
              or in the future) any patent rights, copyright rights, mask work rights, trade secret
              rights, trademarks or any other intellectual property or proprietary rights that may
              block or interfere with, or may otherwise be required for, the exercise by Client of
              the rights assigned to Client under this Agreement (collectively, <b>“Related Rights”</b>),
              Contractor hereby grants or will cause to be granted to Client a non-exclusive,
              royalty-free, irrevocable, perpetual, transferable, worldwide license (with the right
              to sublicense) to make, have made, use, offer to sell, sell, import, copy, modify,
              create derivative works based upon, distribute, sublicense, display, perform and
              transmit any products, software, hardware, methods or materials of any kind that
              are covered by such Related Rights, to the extent necessary to enable Client to
              exercise all of the rights assigned to Client under this Agreement.
            </p>

            <p>
              <b>4.5.</b> Contractor acknowledges that except as provided by law, no further fees or
              compensation other than those provided for in this Agreement are due or may
              become due to Contractor in respect of the performance of the obligations under
              this section 4.
            </p>

            <p>
              <b>4.6.</b> Nothing contained in this Agreement will be construed to preclude Client from
              exercising any and all of its rights and privileges as sole and exclusive owner of all
              of the Intellectual Property owned by or assigned to Client under this Agreement.
              Client, in exercising such rights and privileges with respect to any particular item
              of Intellectual Property, may decide not to file any patent application or any
              copyright registration on such Intellectual Property, may decide to maintain such
              Intellectual Property as secret and confidential, or may decide to abandon such
              Intellectual Property, or dedicate it to the public. Contractor will have no authority
              to exercise any rights or privileges with respect to the Intellectual Property owned
              by or assigned to Client under this Agreement.
            </p>

            <p>
              <b>4.7. Exploitation.</b> If any part of the Services or Intellectual Property or information
              provided hereunder is based on, incorporates, or is an improvement or derivative
              of, or cannot be reasonably and fully made, used, reproduced, distributed and
              otherwise exploited (collectively, “Exploited”) without using or violating
              technology or intellectual property rights owned by or licensed to Contractor (or
              any person involved in the Services) and not assigned hereunder, Contractor
              hereby grants Client and its successors a perpetual, irrevocable, worldwide
              royalty-free, non-exclusive, sublicensable right and license to fully Exploit and
              exercise all such technology and intellectual property rights in support Client’s
              exercise or exploitation of the Services, Intellectual Property, other work or
              information performed or provided hereunder, or any assigned rights (including
              any modifications, improvements and derivatives of any of them).
            </p>

            <p><b>5. CONFIDENTIAL INFORMATION</b></p>

            <p>
              <b>5.1. Definition of Confidential Information.</b> For purposes of this Agreement, all
              information Client provides to Contractor whether or not such information is
              marked “confidential”, all information pertaining to the Services performed by
              Contractor, all Contractor Work Product, Client’s Intellectual Property, this
              Agreement, and all information regarding Client’s business, including, without
              limitation, the identity of Client, will be deemed and treated as strictly confidential,
              non-public information (“Confidential Information”) unless and until Client
              specifically authorizes Contractor in writing that any such information may be
              treated as public. Except as specifically required by law, Contractor may disclose
              Confidential Information only with Client’s prior written consent. Contractor will
              have no authority to disclose Confidential Information except in accordance with
              this section. Information already or generally available to the public (other than as
              a result of Contractor’s breach of these provisions) will not be considered
              Confidential Information.
            </p>

            <p>
              <b>5.2. Economic Value of Confidential Information.</b> Contractor acknowledges that
              Confidential Information has independent economic value, actual or potential, that
              is not generally known to the public or to others who could obtain economic value
              from its disclosure or use, and that the Confidential Information is subject to a
              reasonable effort by Client to maintain its secrecy and confidentiality. Except as
              essential to Contractor’s obligations under this Agreement, Contractor will not
              disclose any information pertaining to this Agreement, the terms of this
              Agreement, or any of the Confidential Information. Except as essential to
              Contractor's obligations pursuant to its relationship with Client, Contractor will not
              make any duplication or other copy of Client’s Confidential Information.
            </p>

            <p>
              <b>5.3. Non-Use and Non-Disclosure.</b> Contractor and/or its employees and/or any
              third party affected by the Contractor to the services will not, during or
              subsequent to the term of this Agreement, use Client’s Confidential Information for
              any purpose whatsoever other than the performance of the Services on behalf of
              Client. Contractor and/or its employees and/or any third party affected by the
              Contractor to the services will neither deliver, reveal, nor report any Confidential
              Information obtained or created pursuant to this Agreement, to any federal,
              provincial or local government body or agency, or to any other person or entity,
              public or private, without (i) express prior written permission of Client, or (ii) a
              court or administrative order requiring disclosure. In the event that Contractor
              forms the opinion that it is required by applicable law to disclose any of Client’s
              Confidential Information, or is served with a witness summons, subpoena, or court
              or administrative order requiring disclosure of any Confidential Information,
              Contractor will, prior to making such disclosure, immediately notify Client in
              writing, and will, in accordance with Client’s direction, respond, appeal or
              challenge such witness summons, subpoena, or court administrative order, prior
              to disclosure, and will cooperate fully with Client in responding to, appealing or
              challenging any such witness summons, subpoena, or court or administrative
              order; except that this Section 5.3 will not apply where Contractor is required by
              law to disclose Client’s Confidential Information without notice to Client. Neither
              Contractor nor Contractor’s related entities, or subcontractors, nor their
              respective employees will disclose any Confidential Information to any third party,
              nor will they use or allow the use of any Confidential Information, to further any
              private interest other than as contemplated by this Agreement. Contractor will
              take appropriate measures to ensure the confidentiality and protection of all
              Confidential Information and to prevent its disclosure or its inappropriate use by
              Contractor or its subcontractors, or by Contractor’s or its subcontractors’
              respective employees or related entities. Contractor’s obligations under this
              Section shall survive the expiration or termination of this Agreement.
            </p>

            <p>
              <b>5.4. Former or Concurrent Client’s Confidential Information.</b> Contractor agrees
              that Contractor and/or its employees and/or any third party affected by the
              Contractor to the services will not, during the term of this Agreement, improperly
              use, disclose, or induce Client to use any confidential information of any third
              party including, but not limited to, any former or concurrent client of Contractor
              and/or its employees and/or any third party affected by the Contractor to the
              services. Contractor and/or its employees and/or any third party affected by the
              Contractor to the services will not bring onto the premises or devices of Client any
              confidential information belonging to any third party. Contractor and/or its
              employees and/or any third party affected by the Contractor to the services will
              indemnify Client and hold it harmless from and against all claims, liabilities,
              damages and expenses (including reasonable legal fees, expenses and costs)
              arising out of or in connection with any violation or claimed violation of a third
              party’s rights resulting in whole or in part from the Client’s use of such third party’s
              confidential information by Contractor and/or its employees and/or any third party
              affected by the Contractor to the services in connection with Contractor’s
              fulfillment of its obligations under this Agreement.
            </p>

            <p>
              <b>5.5. Third Party Confidential Information.</b> Contractor recognizes that Client has
              received and may receive in the future, confidential information of third parties
              subject to a duty on the Client’s part to maintain the confidentiality of such
              information and to use it only for certain limited purposes. Contractor agrees:
            </p>

            <p class="sub-point">
              a. that Contractor and/or its employees and/or any third party affected by the
              Contractor to the services owes Client and any such third party, during the
              term of this Agreement and thereafter, a duty to hold all such confidential or
              proprietary information in the strictest confidence;
            </p>

            <p class="sub-point">
              b. to treat any such third-party confidential information as if it was Client’s
              Confidential Information; and
            </p>

            <p class="sub-point">
              c. not to disclose it to any person, firm, corporation or other entity or to use it
              except as necessary in carrying out the Services for Client consistent with
              Client’s agreement with such third party.
            </p>

            <p>
              <b>5.6. Return of Materials.</b> All documents and other tangible objects containing or
              representing Confidential Information and all copies thereof that are in the
              possession of Contractor will be and remain the property of Client, and Contractor
              will promptly return such Confidential Information and all copies thereof (including
              electronic copies) to Client upon termination or/and expiration of this Agreement
              or upon Client’s earlier request, whichever the earlier. Contractor shall not keep
              any copies of the above materials, and once returned to Client in full, Contractor
              shall delete or destroy any copies which have remained in its possession.
            </p>

            <p><b>6. DATA PROTECTION</b></p>

            <p>
              <b>6.1.</b> To the extent that the nature of the Services requires Contractor to process
              Personal Information (as defined below), Contractor will (and procures that any
              substitute will) process all Personal Information in accordance with, where and as
              applicable, the Personal Information Protection and Electronic Documents Act
              (Canada) (<b>“PIPEDA”</b>), the General Data Protection Regulation 2016/679 under
              European Union law (<b>“GDPR”</b>) on data protection and privacy, and all other
              applicable data protection laws (collectively, the “Data Protection Laws”).
              “Personal Information” will have the meaning set forth in section 2 of PIPEDA, or
              as such term is defined under the laws of any territory with jurisdiction over this
              Agreement related to the protection of Personal Information.
            </p>

            <p>
              <b>6.2.</b> Contractor will fully comply with any reasonable instructions from and on
              behalf of Client regarding the processing of that Personal Information. The parties
              will inform each other immediately of any suspected or confirmed Personal
              Information breaches or unauthorised or unlawful processing, loss, or destruction
              of, or damage to Personal Information processed by a party in connection with
              Contractor’s provision of the Services. To the extent that the Services consist of
              the development of software, Contractor will develop the software in compliance
              with Data Protection Laws.
            </p>

            <p>
              <b>6.3.</b> Without prejudice to the generality of this clause relating to data protection,
              Contractor will and ensures that its subcontractors and employees will:
            </p>

            <p class="sub-point">
              a. cooperate fully with Client in order to enable Client to comply with its
              obligations under Data Protection Laws (including in relation to subject
              access requests, security, breach notifications, privacy impact
              assessments, consultations with supervisory authority or regulators);
            </p>

            <p class="sub-point">
              b. implement and maintain appropriate technical and organisational measures
              against unauthorised and unlawful processing of Personal Information and
              against accidental loss and destruction of or damage to Personal
              Information;
            </p>

            <p class="sub-point">
              c. process any Personal Information disclosed to Contractor by or on behalf of
              Client only
            </p>

            <p class="sub-sub-point">
              i. for the purposes of providing the Services; and
            </p>
            <p class="sub-sub-point">
              ii. for the purposes for which that Personal Information was obtained
              and is processed by Client;
            </p>

            <p class="sub-point">
              d. immediately provide such evidence of Contractor’s compliance with
              Contractor’s obligations under Data Protection Laws as Client may from
              time to time reasonably request; and
            </p>

            <p class="sub-point">
              e. immediately upon notification by Client, take all appropriate action to
              enable Client to properly comply with any request from a data subject in
              relation to access to and/or rectification or erasure of Personal Information.
            </p>

            <p>
              <b>6.4.</b> Contractor understands and agrees that Client may carry out monitoring of
              its premises and the usage of its communications facilities (including use by
              Contractor of Client’s email, phone, mobile phone and computer communication)
              to monitor, prevent, detect or investigate any possible unauthorized use of
              Client’s communications systems, wrongdoing or non-compliance with Client’s
              practices and procedures by Contractor, its employees or subcontractors.
            </p>

            <p>
              <b>6.5.</b> Client will collect and process Contractor’s Personal Information in
              accordance with its privacy notice and applicable laws.
            </p>

            <p><b>7. WARRANTIES</b></p>

            <p>
              <b>7.1. No Pre-existing Obligations.</b> Contractor represents and warrants that
              Contractor (and any subcontractor) has no pre-existing obligations or
              commitments (and will not assume or otherwise undertake any obligations or
              commitments) that would be in conflict or inconsistent with or that would hinder
              Contractor’s performance of Contractor’s obligations under this Agreement.
            </p>

            <p>
              <b>7.2. Performance Standard and Compliance.</b> Contractor covenants that
              Contractor (and any subcontractor) will perform the Services in a thorough and
              professional manner, consistent with high professional and industry standards by
              individuals with the requisite training, background, experience, technical
              knowledge and skills to perform Services. Any deviation in the quality of the
              Services will be remedied by Contractor upon written notice to this effect by
              Client. Contractor will (and will ensure that any subcontractor will):
            </p>

            <p class="sub-point">
              a. comply with all applicable laws, regulations, codes and sanctions relating to
              anti-bribery and anti-corruption;
            </p>

            <p class="sub-point">
              b. promptly report to Client any request or demand for any undue financial or
              other advantage of any kind received by Contractor in connection with the
              performance of this Agreement;
            </p>

            <p class="sub-point">
              c. not engage in any activity, practice or conduct which would constitute
              either a tax evasion facilitation offence or a foreign tax evasion facilitation
              offence;
            </p>

            <p class="sub-point">
              d. promptly report to Client any request or demand from a third party to
              facilitate the evasion of tax or any suspected tax evasion offence or
              facilitation of tax evasion offences whether under local law or under the law
              of any foreign country, in connection with the performance of this
              Agreement; and
            </p>

            <p class="sub-point">
              e. comply with all applicable laws and policies notified to Contractor regarding
              a prohibition against discrimination, harassment and bullying; and
            </p>

            <p class="sub-point">
              f. as required, certify to Client in writing Contractor’s compliance with this
              clause.
            </p>

            <p>
              <b>7.3. Non-infringement.</b> Contractor represents and warrants that Contractor Work
              Product does not, and will not infringe, misappropriate or violate the proprietary
              rights of any third party, including, without limitation, any Intellectual Property or
              any rights of privacy or rights of publicity, except to the extent any portion of
              Contractor Work Product is created, developed or supplied by Client or by a third
              party on behalf of Client.
            </p>

            <p>
              <b>7.4. Competitive Activities.</b> Client acknowledges that Contractor provides
              services to other clients. Notwithstanding the foregoing, Contractor agrees that
              during the term of this Agreement, Contractor will not, directly or indirectly,
              engage or participate in or provide services to any business that is competitive
              with the types and kinds of business being conducted by Client without the prior
              written agreement of Client; except that this Section 7.4 will not apply where
              prohibited by law.
            </p>

            <p>
              <b>7.5. Non-Solicitation of Personnel.</b> During the term of this Agreement and for a
              period of one (1) year thereafter, Contractor will not directly or indirectly solicit the
              services of any of Client’s employees, workers or contractors for Contractor’s own
              benefit or for the benefit of any other person or entity. Client will not directly or
              indirectly solicit Contractor’s employees for Client’s own benefit or for the benefit
              of any other person or entity or attempt to induce such employees, workers or
              contractors to terminate their employment/contract (whichever relevant) with
              Client.
            </p>

            <p><b>8. TERM AND TERMINATION</b></p>

            <p>
              <b>8.1. Term.</b> This Agreement will commence on the Effective Date and will remain in
              full force and effect for two (2) calendar years from the Effective Date and shall
              be automatically renewed for each subsequent calendar year, unless terminated
              earlier in accordance with the terms of this Agreement or a Statement of Work, or
              this Section 8. This Agreement may be renewed an unlimited number of times.
            </p>

            <p>
              <b>8.2. Termination for Breach.</b> Except as provided below, either party may
              terminate this Agreement (including all Statements of Work) if the other party
              breaches any material term of this Agreement and fails to cure such breach within
              ten (10) days following a written notice thereof from the non-breaching party.
              Client may terminate this Agreement (including all Statements of Work) with
              immediate notice and with no liability to make any further payments to Contractor
              (other than in respect of amounts accrued before the Termination Date) if at any
              time Contractor:
            </p>

            <p class="sub-point">
              a. commits (or any of its subcontractors commits) any gross negligence or
              intentional misconduct affecting the business of Client, including but not
              limited to acts of fraud or dishonesty, material breaches of Client’s code of
              conduct-related rules and policies insofar as they are applicable to
              independent contractors (including relating to bribery, corruption, tax
              evasion, data protection, equality and diversity, and health and safety);
            </p>

            <p class="sub-point">
              b. commits (or any of its subcontractors commits) any bribery offense;
            </p>

            <p class="sub-point">
              c. commits (or any of its subcontractors commits) a local or foreign tax
              evasion facilitation offense;
            </p>

            <p class="sub-point">
              d. is wound-up or declared bankrupt or makes arrangements with or for the
              benefit of Contractor’s creditors or has a court administration order made
              against Contractor for the reimbursement of Contractor’s creditors.
            </p>

            <p>
              <b>8.3. Termination for Convenience.</b> Either party may terminate this Agreement
              (including all Statements of Work) at any time, without assigning any reason, upon
              at least ten (10) days written notice to the other party. Client may also terminate
              an individual Statement of Work at any time, without assigning any reason, upon
              at least ten (10) days written notice to Contractor.
            </p>

            <p>
              <b>8.4. Termination of Deel Terms and Conditions.</b> This Agreement will
              automatically terminate upon termination of the Deel Terms and Conditions by
              either party, or in the event that Deel terminates Client’s or Contractor’s use of the
              Deel platform for any reason.
            </p>

            <p>
              <b>8.5. Effect of Termination.</b> Upon the expiration or termination of this Agreement
              for any reason: (i) Contractor will promptly deliver to Client all Contractor Work
              Product, including all work in progress on any Contractor Work Product not
              previously delivered to Client, if any, including any electronic copies thereof; (ii)
              Contractor will promptly deliver to Client all Confidential Information in
              Contractor’s possession or control, including any electronic copies thereof; and
              (iii) Client will pay Contractor any accrued but unpaid fees due and payable to
              Contractor pursuant to Section 2.
            </p>

            <p>
              <b>8.6. Survival.</b> The rights and obligations of the parties under Sections 2, 3.2, 4, 5,
              6, 7.3, 7.4, 8, 9.5, 9.6, 10 and 11 will survive the expiration, new statements of
              work or termination of this Agreement to the maximum period granted under the
              applicable law.
            </p>

            <p><b>9. LIMITATION OF LIABILITY</b></p>

            <p>
              <b>9.1.</b> Nothing in this Agreement will exclude or limit either party’s liability for losses
              incurred by the other party resulting from: death or personal injury due to the
              willful intent, gross negligence of the other party or that of their employees,
              affiliates or subcontractors; a party’s fraud or fraudulent misrepresentation; a
              contractor breach of the warranty of non infringement under Section 7.3; or a
              party’s breach of applicable law.
            </p>

            <p>
              <b>9.2.</b> Subject to the provisions above, neither party will be liable in contract, tort
              (including, without limitation, negligence), pre-contract or other representations
              (other than fraudulent misrepresentation) or otherwise arising out of or in
              connection with this Agreement for:
            </p>

            <p class="sub-point">
              a. any economic losses (including, without limitation, loss of revenues, profits,
              contracts, data, business, anticipated savings or cost of substitute
              services);
            </p>

            <p class="sub-point">
              b. any loss of goodwill or reputation; or
            </p>

            <p class="sub-point">
              c. any special, indirect or consequential losses suffered or incurred by a party
              arising out of or in connection with the provisions of, or any matter under
              the Agreement; whether or not such losses were within the contemplation of
              the parties on the Effective Date.
            </p>

            <p>
              <b>IN NO EVENT WILL EITHER PARTY BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
                PUNITIVE, EXEMPLARY OR CONSEQUENTIAL DAMAGES OF ANY KIND IN
                CONNECTION WITH THIS AGREEMENT, EVEN IF THE PARTY HAS BEEN
                INFORMED IN ADVANCE OF THE POSSIBILITY OF SUCH DAMAGES. EXCEPT AS
                OTHERWISE SET FORTH IN THIS SECTION 9, EACH PARTY’S MAXIMUM
                LIABILITY WILL NOT EXCEED THE UNDISPUTED OUTSTANDING BALANCES
                OWED TO CONTRACTOR.</b>
            </p>

            <p><b>10. GENERAL</b></p>

            <p>
              <b>10.1. Assignment.</b> Contractor may not assign, transfer or delegate this
              Agreement or any of the Services, in whole or in part, without Client’s express
              prior written consent. Any attempt by Contractor to assign or transfer this
              Agreement, without such consent, will be void. Subject to the foregoing, this
              Agreement will bind and benefit the parties and their respective successors and
              assigns.
            </p>

            <p>
              <b>10.2. No Election of Remedies.</b> Except as expressly set forth in this Agreement,
              the exercise by Client of any of its remedies under this Agreement will not be
              deemed an election of remedies and will be without prejudice to its other
              remedies under this Agreement or available at law or in equity or otherwise.
            </p>

            <p>
              <b>10.3. Equitable Remedies.</b> Because the Services are personal and unique and
              because Contractor will have access to Confidential Information of Client, Client
              will have the right to enforce this Agreement and any of its provisions by
              injunction, specific performance or other equitable relief, to the extent permissible
              by law, without having to post a bond or other consideration, in addition to all
              other remedies that Client may have for a breach of this Agreement at law or
              otherwise.
            </p>

            <p>
              <b>10.4. Attorneys’ Fees.</b> If any action is necessary to enforce the terms of this
              Agreement, the substantially prevailing party will be entitled to reasonable
              attorneys’ fees, costs and expenses in addition to any other relief to which such
              prevailing party may be entitled.
            </p>

            <p>
              <b>10.5. GOVERNING LAW.</b> THIS AGREEMENT WILL BE GOVERNED BY AND
              CONSTRUED IN ACCORDANCE WITH THE LAWS OF SINGAPORE. EXCLUDING
              ITS BODY OF LAW CONTROLLING CONFLICT OF LAWS. ANY LEGAL ACTION OR
              PROCEEDING ARISING UNDER THIS AGREEMENT WILL BE BROUGHT
              EXCLUSIVELY IN THE FEDERAL OR STATE COURTS LOCATED IN SINGAPORE
              AND THE PARTIES IRREVOCABLY CONSENT TO THE PERSONAL JURISDICTION
              AND VENUE THEREIN.
            </p>

            <p>
              <b>10.6. Severability.</b> If any provision of this Agreement is held invalid or
              unenforceable by a court of competent jurisdiction, the remaining provisions of
              this Agreement will remain in full force and effect, and the provision affected will
              be construed so as to be enforceable to the maximum extent permissible by law.
            </p>

            <p>
              <b>10.7. Waiver.</b> The failure by either party to enforce any provision of this
              Agreement will not constitute a waiver of future enforcement of that or any other
              provision.
            </p>

            <p>
              <b>10.8. Notices.</b> All notices required or permitted under this Agreement will be in
              writing, will reference this Agreement, and will be deemed given when delivered
              via e-mail. All such notices will be sent to the e-mail addresses set forth above or
              to such other e-mail address as may be specified by either party to the other
              party in accordance with this Section 10.8.
            </p>

            <p>
              <b>10.9. Entire Agreement.</b> This Agreement, together with all Statements of Work,
              constitutes the complete and exclusive understanding and agreement of the
              parties with respect to its subject matter and supersedes all prior understandings
              and agreements, whether written or oral, with respect to its subject matter. Each
              party acknowledges that in entering into this Agreement it does not rely on any
              statement, representation, assurance or warranty that is not set out in this
              Agreement (including any Statement of Work). No term of any Statement of Work
              will be deemed to amend the terms of this Agreement unless a Statement of Work
              references a specific provision in this Agreement and provides that the Statement
              of Work is amending only that specific provision of this Agreement and only with
              respect to Services performed pursuant to such Statement of Work. Any waiver,
              modification or amendment of any provision of this Agreement will be effective
              only if in writing and signed by the parties hereto. Each party agrees that it will
              have no claim for innocent or negligent misrepresentation based on any provision
              of this Agreement.
            </p>

            <p><b>10.10. No Partnership.</b> This Agreement does not create a partnership or jointventure relationship.</p>

            <p>
              <b>10.11. Counterparts.</b> This Agreement may be executed in counterparts, each of
              which will be deemed an original, but all of which together will constitute one and
              the same instrument.
            </p>

            <p>
              <b>10.12. Modifications.</b> This Agreement may be modified only by a contract in
              writing executed by the parties to this Agreement against whom enforcement of
              such modification is sought.
            </p>

            <p>
              <b>10.13. Third-Party Rights.</b> The parties do not intend that any term of this
              Agreement will be enforceable by any person who is not a party to this
              Agreement.
            </p>

            <p>
              <b>10.14. Electronic Signatures.</b> Except where prohibited by law, the parties
              consent to use Deel’s electronic signature service to execute this Agreement and
              agree that such signatures are valid and binding on the parties.
            </p>

            <p>
              IN WITNESS WHEREOF, the parties have executed this Agreement as of the
              Effective Date.
            </p>
          </div>
        </div>
      </div>
      <template slot="footer">
        <div class="signature-wrapper">
          <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(post)">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="clientSignature" name="Client signature">
                <div class="all-form-title bold-text form-field float-left">
                  <span class="text-label">Client signature</span><br>
                  <span class="text-label-desc">Enter your full name (Client Signature)</span>
                  <input v-model="clientSignature" type="text" class="form-input form-control form-signature text-signature" :placeholder="[[ clientSignature ]]">
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </form>
          </ValidationObserver>

          <div class="all-form-title bold-text form-field float-right">
            <span class="text-label">Contractor signature</span><br><br>
            <input type="text" class="form-input form-control form-signature text-signature" placeholder="" disabled>
          </div>
        </div>
        <div class="button-wrapper">
          <base-button type="primary" @click.prevent="sendClientSignature">
            Agree and Sign
          </base-button>
        </div>
        <div class="button-wrapper">
          <base-button type="primary" @click.prevent="downloadPdf">
            Download PDF
          </base-button>
        </div>
      </template>
    </modal>
    <modal :show.sync="modals.contractorSignature" size="lg" modal-classes="modal-contract-details">
      <template slot="header" />
      <div class="full-contract-details-wrapper">
        <div class="mr-3">
          <div class="all-form-title bold-text form-field">
            <h3 class="contract-main-title mb-5">
              CONTRACTOR AGREEMENT
            </h3>

            <p>This Contractor Agreement <b>(“Agreement”)</b> is entered into as of {{ currentDate }} (the <b>“Effective Date”</b>), between:</p>

            <p>
              {{ company.name }}, Incorporation having its principal place of business at {{ company.street }} {{ company.city }} {{ company.postalCode }}, email address: <b>(“Client”)</b>, and
              [Contractor name], having its principal place of business at [street address, city,
              state, zip], registered under the number [Registration Number] and email
              address: [email], <b>(“Contractor”)</b>.
            </p>

            <p>
              Client and Contractor desire to have Contractor perform services for Client,
              subject to and in accordance with the terms and conditions of this Agreement.
              NOW, THEREFORE, the parties agree as follows:
            </p>

            <p><b>1. SERVICES</b></p>
            <p>
              <b>1.1. Statements of Work.</b> From time to time, Client and Contractor may execute
              one or more statement(s) of work, substantially in the form attached hereto as
              Exhibit A, detailing the specific services to be performed by Contractor (as
              executed, a <b>“Statement of Work”</b>). Each Statement of Work will expressly refer to
              this Agreement, will form a part of this Agreement, and will be subject to the terms
              and conditions contained herein. A Statement of Work may be amended only by a
              signed (by each party’s authorized signatory) and written agreement of the
              parties.
            </p>

            <p>
              <b>1.2. Performance of Services.</b> Contractor will perform the services described in
              each Statement of Work (the <b>“Services”</b>) in accordance with the terms and
              conditions set forth in each Statement of Work and this Agreement. Unless
              otherwise agreed by Client, Contractor will determine, in Contractor’s sole
              discretion, the manner and means by which the Services are accomplished,
              subject to the requirement that Contractor will at all times comply with applicable
              law and any compliance policies drawn to Contractors’ attention insofar as they
              are applicable to independent contractors.
            </p>

            <p>
              <b>1.3. Equipment and Facilities.</b> Unless otherwise provided in a Statement of Work,
              Contractor will perform the Services at Contractor’s offices or facilities, using
              Contractor’s instruments, equipment and tools. Contractor will determine the time,
              place and order in which Contractor will perform the Services in accordance with
              any milestones and/or timeline set forth in a Statement of Work.
            </p>

            <p>
              <b>1.4. Subcontractors.</b> Contractor may appoint a suitably skilled substitute in
              replacement of the initial personnel and shall be entitled to subcontract the
              performance of the Consultancy Services, provided that Client is satisfied that the
              sub-contractor possesses the necessary skills, expertise and resources to
              perform those elements of the Services and that Contractor ensures the
              substitute or subcontractor will abide by the same obligations Contractor is
              subject to under the terms of this Agreement regarding confidentiality, intellectual
              property, data protection, anti-bribery, anti-corruption, anti-tax avoidance; if so
              required, Contractor will ensure that the subcontractor or substitute enters into
              direct undertakings with Contractor regarding these obligations. Contractor will
              continue to be bound by all the obligations in this Agreement and will invoice
              Client and be responsible for the remuneration of the substitute or subcontractor.
              Contractor will keep Client fully and effectively indemnified against any
              reasonable costs, claims or expenses that may be incurred by it as a result of the
              use of such subcontractors including the reasonable cost of all instruction
              (necessitated by the subcontracting) for the sub-contractor.
            </p>

            <p><b>2. PAYMENT</b></p>

            <p>
              <b>2.1. Fees.</b> As Contractor’s sole compensation for the performance of Services,
              Client will pay Contractor the fees specified in each Statement of Work in
              accordance with the terms set forth therein. Contractor acknowledges and
              agrees that, if specified in a Statement of Work, Client’s payment obligation will be
              expressly subject to Contractor’s completion of Services provided therein or
              achievement of certain milestones to Client’s reasonable satisfaction.
            </p>

            <p>
              <b>2.2. Expenses.</b> Unless otherwise provided in the Statement of Work, Client will
              reimburse Contractor for reasonable travel and related expenses incurred in the
              course of performing the Services hereunder, provided, however, that any such
              expenses will be approved in advance in writing by Client. As a condition to
              receipt of reimbursement, Contractor will submit to Client reasonable evidence
              that the amount involved was both reasonable and necessary to the Services
              provided under this Agreement.
            </p>

            <p>
              <b>2.3. Payment Terms.</b> The payment terms will be set forth in the Statement of
              Work. The parties will use their respective commercially reasonable efforts to
              promptly resolve any payment disputes.
            </p>

            <p>
              <b>2.4.</b> Client acknowledges that Contractor has appointed Deel. Inc, a Delaware
              registered company having its headquarters at 650 2nd St, 94107, San
              Francisco, California, United States <b>(“Deel”)</b> as Contractor's limited payment
              agent for the purpose of facilitating the receipt of payments made by Client for
              services provided in connection with this Agreement and each Statement of Work
              using a payment method supported by Deel or by one of Deel's Payment Service
              Providers, and the disbursement of those payments to Contractor.
            </p>

            <p>
              <b>2.5.</b> Client agrees to make all payments to Contractor using one of the payment
              methods supported by the Deel platform. Client and Contractor represent and
              warrant that they have carefully read, understood and accepted the Deel
              platform terms and conditions (the <b>“Deel Terms and Conditions”</b>) available on
              the Deels’ website ( www.letsdeel.com/terms). In the event of any conflict
              between this Agreement and the Deel Terms and Conditions, this Agreement will
              govern. Both parties acknowledge that acceptance of the Deel Terms and
              Conditions by each party is a precondition to entering into this Agreement.
              Client will collect and process Contractor’s Personal Data in accordance with its
              privacy notice and applicable laws.
            </p>

            <p><b>3. RELATIONSHIP OF THE PARTIES</b></p>

            <p>
              <b>3.1. Independent Contractor.</b> Contractor’s relationship with Client will be that of
              an independent contractor acting as a service provider to Client, and not that of
              an employee, worker, agent or partner of Client. Contractor will not be entitled to
              any statutory benefits payable to employees or workers by law, or otherwise any
              benefits paid or made available by Client to its employees or workers, including,
              without limitation, any retirement or pension benefits, Employment Insurance,
              Canada Pension Plan, or provincial parental insurance plan contributions;
              participation in any plans, arrangements or distributions made by Client pertaining
              to any bonus, stock options, profit sharing, insurance or similar benefits; or any
              other end-of-service benefits payable to an employee or worker.
            </p>

            <p>
              <b>3.2. No Authority.</b> Contractor will have no authority to enter into agreements that
              bind Client or create obligations on the part of Client without the prior written
              authorization of Client. Contractor will not hold itself out as being an employee,
              agent, partner or assignee of Client, as having any authority to bind Client or to
              incur any liability on behalf of Client, and will make such absence of authority
              clear in its dealings with any third parties.
            </p>

            <p>
              <b>3.3. Status.</b> This contract is one for the provision of services and not a contract of
              employment and accordingly, Contractor will be solely responsible for(a)
              payment of all taxes, salaries, benefits, Employment Insurance and provincial
              parental insurance premiums, Canada Pension Plan contributions, withholding
              taxes, workers’ compensation, and disability insurance, and any other liability,
              deduction, contribution, assessment or claim arising from or made in connection
              with the performance of the Services required by any government agency; and
              (b) compliance with all applicable labour and employment requirements with
              respect to Contractor’s self-employment, sole proprietorship or other form of
              business organization. Contractor will report to all applicable government
              agencies as income all compensation received by Client pursuant to this
              Agreement. Contractor will ensure that none of its employees hold themselves out
              as being the employees of Client or having any authority at any time to bind
              Client, or otherwise attempt to claim any employment or other relationship with
              Client.
            </p>

            <p>
              <b>3.4. Liability.</b> Contractor will be liable for and will indemnify Client for any loss,
              liability, costs, (including reasonable fees and expenses of attorneys and other
              professionals), penalties, damages and expenses arising from any breach of the
              terms of this Agreement and/or any applicable Statement of Work (including its
              data protection provisions) by Contractor or by a subcontractor engaged by
              Contractor of the terms of this Agreement (including in relation to data protection
              obligations) or any other action or inaction by or for or on behalf of Contractor.
              Contractor will accordingly maintain in force suitable insurance policies.
              Contractor acknowledges that Client will not carry any liability insurance on behalf
              of Contractor. Contractor will provide promptly copies of such insurance obtained
              on reasonable request.
            </p>

            <p>
              <b>3.5. Indemnification by Contractor.</b> Tax Liability Indemnification by Contractor.
              Contractor will indemnify and hold Client harmless from and against all damages,
              liabilities, losses, penalties, fines, expenses and costs (including reasonable fees
              and expenses of attorneys and other professionals) arising out of or relating to
              any obligation imposed by law on Client to pay any withholding taxes,
              Employment Insurance or provincial parental insurance premiums, Canada
              Pension Plan contributions or similar items in connection with compensation
              received by Contractor pursuant to this Agreement. In the event of any violation
              by Contractor of applicable law related to this Section 3.5, Contractor will
              indemnify Client for and in respect of:
            </p>

            <p class="sub-point">
              a. payment of all taxes, salaries, benefits, Employment Insurance and Quebec
              Parental Insurance premiums, Quebec Pension Plan contributions,
              withholding taxes, workers’ compensation, and any other liability,
              deduction, contribution, assessment or claim arising from or made in
              connection with the performance of the Services required by any
              government agency; except where recovery by Client pursuant to this
              Section 3.5 is prohibited by law; and all reasonable costs, expenses,
              penalties, fines or interest incurred or payable by Client in connection with
              or in consequence of Contractor’s failure to pay any amounts due and
              owing to any government agency; except where Contractor’s failure to pay
              arose out of, was caused by, or was related to Client's negligence or
              intentional misconduct; and
            </p>

            <p class="sub-point">
              b. any liability arising from any employment-related claim or any claim based
              on worker status (including reasonable fees and expenses of attorneys and
              other professionals) brought by Contractor or any subcontractor against
              Client arising out of or in connection with the provision of the Services.
            </p>

            <p>
              <b>3.6. Set-off.</b> Client may, in its sole discretion, satisfy any of the indemnities set
              forth in Section 3.5 (in whole or in part) by way of deduction from any payments
              due to Contractor.
            </p>

            <p>
              <b>3.7. No expectation of renewal.</b> Contractor agrees that they have no expectation
              that this Agreement will be renewed at the expiry of the Contract Period and no
              representation regarding the renewal shall be valid and binding on Client unless
              recorded in writing and signed by both Parties.
            </p>

            <p><b>4. OWNERSHIP</b></p>

            <p>
              <b>4.1. Disclosure of Work Product.</b> Contractor will, as an integral part of the
              performance of Services, disclose in writing to Client all inventions, products,
              designs, drawings, notes, documents, information, documentation, improvements,
              works of authorship, processes, techniques, know-how, algorithms, specifications,
              biological or chemical specimens or samples, hardware, circuits, computer
              programs, databases, user interfaces, encoding techniques, and other materials
              of any kind that Contractor (or any subcontractor) may make, conceive, develop
              or reduce to practice, alone or jointly with others, or learned, in whole or in part,
              by or for or on behalf of Contractor during the term of this Agreement that relate
              to the subject matter of or arise out of or in connection with performing Services,
              or that result from or that are related to such Services, whether or not they are
              eligible for patent, copyright, mask work, trade secret, trademark or other legal
              protection (collectively, <b>“Contractor Work Product”</b>). Contractor Work Product
              includes all deliverables that Contractor has undertaken to provide Client in the
              course of performing the Services
            </p>

            <p>
              <b>4.2. Ownership of Contractor Work Product.</b> Contractor agrees that all
              Contractor Work Product will be the sole and exclusive property of Client.
              Contractor hereby irrevocably transfers and assigns to Client, and agrees to
              irrevocably transfer and assign to Client, all right, title and interest in and to
              Contractor Work Product, including all worldwide patent rights (including patent
              applications and disclosures), copyright rights, mask work rights, trademarks,
              trade secret rights, know-how, and any and all other intellectual property or
              proprietary rights (collectively, <b>“Intellectual Property”</b>) therein. At Client’s request
              and expense, during and after the term of this Agreement, Contractor will assist
              and cooperate with Client in all respects, and will execute documents, and will
              take such further acts reasonably requested by Client to enable Client to acquire,
              transfer, maintain, perfect and enforce its Intellectual Property and other legal
              protections for Contractor Work Product. Contractor hereby appoints the officers
              of Client as Contractor’s attorney-in-fact to execute documents on behalf of
              Contractor for this limited purpose, and agrees to execute a separate power of
              attorney for this purpose if instructed to do so by Client.
            </p>

            <p>
              <b>4.3. Moral Rights.</b> To the fullest extent permitted by applicable law, Contractor
              also hereby irrevocably transfers and assigns to Client, and agrees to irrevocably
              transfer and assign to Client, and waives and agrees never to assert, any and all
              Moral Rights (as defined below) that Contractor may have in or with respect to
              any Contractor Work Product, during and after the term of this Agreement.
              <b>“Moral Rights”</b> mean any right to which Contractor is now or may be at any future
              time be entitled to claim authorship of a work, to object to or prevent the
              modification or destruction of a work, to withdraw from circulation or control the
              publication or distribution of a work, and any similar right, existing under judicial
              or statutory law of any country in the world, or under any treaty, regardless of
              whether or not such right is called or generally referred to as a <b>“moral right.”</b>
            </p>

            <p>
              <b>4.4. Related Rights.</b> To the extent that Contractor owns or controls (in the present
              or in the future) any patent rights, copyright rights, mask work rights, trade secret
              rights, trademarks or any other intellectual property or proprietary rights that may
              block or interfere with, or may otherwise be required for, the exercise by Client of
              the rights assigned to Client under this Agreement (collectively, <b>“Related Rights”</b>),
              Contractor hereby grants or will cause to be granted to Client a non-exclusive,
              royalty-free, irrevocable, perpetual, transferable, worldwide license (with the right
              to sublicense) to make, have made, use, offer to sell, sell, import, copy, modify,
              create derivative works based upon, distribute, sublicense, display, perform and
              transmit any products, software, hardware, methods or materials of any kind that
              are covered by such Related Rights, to the extent necessary to enable Client to
              exercise all of the rights assigned to Client under this Agreement.
            </p>

            <p>
              <b>4.5.</b> Contractor acknowledges that except as provided by law, no further fees or
              compensation other than those provided for in this Agreement are due or may
              become due to Contractor in respect of the performance of the obligations under
              this section 4.
            </p>

            <p>
              <b>4.6.</b> Nothing contained in this Agreement will be construed to preclude Client from
              exercising any and all of its rights and privileges as sole and exclusive owner of all
              of the Intellectual Property owned by or assigned to Client under this Agreement.
              Client, in exercising such rights and privileges with respect to any particular item
              of Intellectual Property, may decide not to file any patent application or any
              copyright registration on such Intellectual Property, may decide to maintain such
              Intellectual Property as secret and confidential, or may decide to abandon such
              Intellectual Property, or dedicate it to the public. Contractor will have no authority
              to exercise any rights or privileges with respect to the Intellectual Property owned
              by or assigned to Client under this Agreement.
            </p>

            <p>
              <b>4.7. Exploitation.</b> If any part of the Services or Intellectual Property or information
              provided hereunder is based on, incorporates, or is an improvement or derivative
              of, or cannot be reasonably and fully made, used, reproduced, distributed and
              otherwise exploited (collectively, “Exploited”) without using or violating
              technology or intellectual property rights owned by or licensed to Contractor (or
              any person involved in the Services) and not assigned hereunder, Contractor
              hereby grants Client and its successors a perpetual, irrevocable, worldwide
              royalty-free, non-exclusive, sublicensable right and license to fully Exploit and
              exercise all such technology and intellectual property rights in support Client’s
              exercise or exploitation of the Services, Intellectual Property, other work or
              information performed or provided hereunder, or any assigned rights (including
              any modifications, improvements and derivatives of any of them).
            </p>

            <p><b>5. CONFIDENTIAL INFORMATION</b></p>

            <p>
              <b>5.1. Definition of Confidential Information.</b> For purposes of this Agreement, all
              information Client provides to Contractor whether or not such information is
              marked “confidential”, all information pertaining to the Services performed by
              Contractor, all Contractor Work Product, Client’s Intellectual Property, this
              Agreement, and all information regarding Client’s business, including, without
              limitation, the identity of Client, will be deemed and treated as strictly confidential,
              non-public information (“Confidential Information”) unless and until Client
              specifically authorizes Contractor in writing that any such information may be
              treated as public. Except as specifically required by law, Contractor may disclose
              Confidential Information only with Client’s prior written consent. Contractor will
              have no authority to disclose Confidential Information except in accordance with
              this section. Information already or generally available to the public (other than as
              a result of Contractor’s breach of these provisions) will not be considered
              Confidential Information.
            </p>

            <p>
              <b>5.2. Economic Value of Confidential Information.</b> Contractor acknowledges that
              Confidential Information has independent economic value, actual or potential, that
              is not generally known to the public or to others who could obtain economic value
              from its disclosure or use, and that the Confidential Information is subject to a
              reasonable effort by Client to maintain its secrecy and confidentiality. Except as
              essential to Contractor’s obligations under this Agreement, Contractor will not
              disclose any information pertaining to this Agreement, the terms of this
              Agreement, or any of the Confidential Information. Except as essential to
              Contractor's obligations pursuant to its relationship with Client, Contractor will not
              make any duplication or other copy of Client’s Confidential Information.
            </p>

            <p>
              <b>5.3. Non-Use and Non-Disclosure.</b> Contractor and/or its employees and/or any
              third party affected by the Contractor to the services will not, during or
              subsequent to the term of this Agreement, use Client’s Confidential Information for
              any purpose whatsoever other than the performance of the Services on behalf of
              Client. Contractor and/or its employees and/or any third party affected by the
              Contractor to the services will neither deliver, reveal, nor report any Confidential
              Information obtained or created pursuant to this Agreement, to any federal,
              provincial or local government body or agency, or to any other person or entity,
              public or private, without (i) express prior written permission of Client, or (ii) a
              court or administrative order requiring disclosure. In the event that Contractor
              forms the opinion that it is required by applicable law to disclose any of Client’s
              Confidential Information, or is served with a witness summons, subpoena, or court
              or administrative order requiring disclosure of any Confidential Information,
              Contractor will, prior to making such disclosure, immediately notify Client in
              writing, and will, in accordance with Client’s direction, respond, appeal or
              challenge such witness summons, subpoena, or court administrative order, prior
              to disclosure, and will cooperate fully with Client in responding to, appealing or
              challenging any such witness summons, subpoena, or court or administrative
              order; except that this Section 5.3 will not apply where Contractor is required by
              law to disclose Client’s Confidential Information without notice to Client. Neither
              Contractor nor Contractor’s related entities, or subcontractors, nor their
              respective employees will disclose any Confidential Information to any third party,
              nor will they use or allow the use of any Confidential Information, to further any
              private interest other than as contemplated by this Agreement. Contractor will
              take appropriate measures to ensure the confidentiality and protection of all
              Confidential Information and to prevent its disclosure or its inappropriate use by
              Contractor or its subcontractors, or by Contractor’s or its subcontractors’
              respective employees or related entities. Contractor’s obligations under this
              Section shall survive the expiration or termination of this Agreement.
            </p>

            <p>
              <b>5.4. Former or Concurrent Client’s Confidential Information.</b> Contractor agrees
              that Contractor and/or its employees and/or any third party affected by the
              Contractor to the services will not, during the term of this Agreement, improperly
              use, disclose, or induce Client to use any confidential information of any third
              party including, but not limited to, any former or concurrent client of Contractor
              and/or its employees and/or any third party affected by the Contractor to the
              services. Contractor and/or its employees and/or any third party affected by the
              Contractor to the services will not bring onto the premises or devices of Client any
              confidential information belonging to any third party. Contractor and/or its
              employees and/or any third party affected by the Contractor to the services will
              indemnify Client and hold it harmless from and against all claims, liabilities,
              damages and expenses (including reasonable legal fees, expenses and costs)
              arising out of or in connection with any violation or claimed violation of a third
              party’s rights resulting in whole or in part from the Client’s use of such third party’s
              confidential information by Contractor and/or its employees and/or any third party
              affected by the Contractor to the services in connection with Contractor’s
              fulfillment of its obligations under this Agreement.
            </p>

            <p>
              <b>5.5. Third Party Confidential Information.</b> Contractor recognizes that Client has
              received and may receive in the future, confidential information of third parties
              subject to a duty on the Client’s part to maintain the confidentiality of such
              information and to use it only for certain limited purposes. Contractor agrees:
            </p>

            <p class="sub-point">
              a. that Contractor and/or its employees and/or any third party affected by the
              Contractor to the services owes Client and any such third party, during the
              term of this Agreement and thereafter, a duty to hold all such confidential or
              proprietary information in the strictest confidence;
            </p>

            <p class="sub-point">
              b. to treat any such third-party confidential information as if it was Client’s
              Confidential Information; and
            </p>

            <p class="sub-point">
              c. not to disclose it to any person, firm, corporation or other entity or to use it
              except as necessary in carrying out the Services for Client consistent with
              Client’s agreement with such third party.
            </p>

            <p>
              <b>5.6. Return of Materials.</b> All documents and other tangible objects containing or
              representing Confidential Information and all copies thereof that are in the
              possession of Contractor will be and remain the property of Client, and Contractor
              will promptly return such Confidential Information and all copies thereof (including
              electronic copies) to Client upon termination or/and expiration of this Agreement
              or upon Client’s earlier request, whichever the earlier. Contractor shall not keep
              any copies of the above materials, and once returned to Client in full, Contractor
              shall delete or destroy any copies which have remained in its possession.
            </p>

            <p><b>6. DATA PROTECTION</b></p>

            <p>
              <b>6.1.</b> To the extent that the nature of the Services requires Contractor to process
              Personal Information (as defined below), Contractor will (and procures that any
              substitute will) process all Personal Information in accordance with, where and as
              applicable, the Personal Information Protection and Electronic Documents Act
              (Canada) (<b>“PIPEDA”</b>), the General Data Protection Regulation 2016/679 under
              European Union law (<b>“GDPR”</b>) on data protection and privacy, and all other
              applicable data protection laws (collectively, the “Data Protection Laws”).
              “Personal Information” will have the meaning set forth in section 2 of PIPEDA, or
              as such term is defined under the laws of any territory with jurisdiction over this
              Agreement related to the protection of Personal Information.
            </p>

            <p>
              <b>6.2.</b> Contractor will fully comply with any reasonable instructions from and on
              behalf of Client regarding the processing of that Personal Information. The parties
              will inform each other immediately of any suspected or confirmed Personal
              Information breaches or unauthorised or unlawful processing, loss, or destruction
              of, or damage to Personal Information processed by a party in connection with
              Contractor’s provision of the Services. To the extent that the Services consist of
              the development of software, Contractor will develop the software in compliance
              with Data Protection Laws.
            </p>

            <p>
              <b>6.3.</b> Without prejudice to the generality of this clause relating to data protection,
              Contractor will and ensures that its subcontractors and employees will:
            </p>

            <p class="sub-point">
              a. cooperate fully with Client in order to enable Client to comply with its
              obligations under Data Protection Laws (including in relation to subject
              access requests, security, breach notifications, privacy impact
              assessments, consultations with supervisory authority or regulators);
            </p>

            <p class="sub-point">
              b. implement and maintain appropriate technical and organisational measures
              against unauthorised and unlawful processing of Personal Information and
              against accidental loss and destruction of or damage to Personal
              Information;
            </p>

            <p class="sub-point">
              c. process any Personal Information disclosed to Contractor by or on behalf of
              Client only
            </p>

            <p class="sub-sub-point">
              i. for the purposes of providing the Services; and
            </p>
            <p class="sub-sub-point">
              ii. for the purposes for which that Personal Information was obtained
              and is processed by Client;
            </p>

            <p class="sub-point">
              d. immediately provide such evidence of Contractor’s compliance with
              Contractor’s obligations under Data Protection Laws as Client may from
              time to time reasonably request; and
            </p>

            <p class="sub-point">
              e. immediately upon notification by Client, take all appropriate action to
              enable Client to properly comply with any request from a data subject in
              relation to access to and/or rectification or erasure of Personal Information.
            </p>

            <p>
              <b>6.4.</b> Contractor understands and agrees that Client may carry out monitoring of
              its premises and the usage of its communications facilities (including use by
              Contractor of Client’s email, phone, mobile phone and computer communication)
              to monitor, prevent, detect or investigate any possible unauthorized use of
              Client’s communications systems, wrongdoing or non-compliance with Client’s
              practices and procedures by Contractor, its employees or subcontractors.
            </p>

            <p>
              <b>6.5.</b> Client will collect and process Contractor’s Personal Information in
              accordance with its privacy notice and applicable laws.
            </p>

            <p><b>7. WARRANTIES</b></p>

            <p>
              <b>7.1. No Pre-existing Obligations.</b> Contractor represents and warrants that
              Contractor (and any subcontractor) has no pre-existing obligations or
              commitments (and will not assume or otherwise undertake any obligations or
              commitments) that would be in conflict or inconsistent with or that would hinder
              Contractor’s performance of Contractor’s obligations under this Agreement.
            </p>

            <p>
              <b>7.2. Performance Standard and Compliance.</b> Contractor covenants that
              Contractor (and any subcontractor) will perform the Services in a thorough and
              professional manner, consistent with high professional and industry standards by
              individuals with the requisite training, background, experience, technical
              knowledge and skills to perform Services. Any deviation in the quality of the
              Services will be remedied by Contractor upon written notice to this effect by
              Client. Contractor will (and will ensure that any subcontractor will):
            </p>

            <p class="sub-point">
              a. comply with all applicable laws, regulations, codes and sanctions relating to
              anti-bribery and anti-corruption;
            </p>

            <p class="sub-point">
              b. promptly report to Client any request or demand for any undue financial or
              other advantage of any kind received by Contractor in connection with the
              performance of this Agreement;
            </p>

            <p class="sub-point">
              c. not engage in any activity, practice or conduct which would constitute
              either a tax evasion facilitation offence or a foreign tax evasion facilitation
              offence;
            </p>

            <p class="sub-point">
              d. promptly report to Client any request or demand from a third party to
              facilitate the evasion of tax or any suspected tax evasion offence or
              facilitation of tax evasion offences whether under local law or under the law
              of any foreign country, in connection with the performance of this
              Agreement; and
            </p>

            <p class="sub-point">
              e. comply with all applicable laws and policies notified to Contractor regarding
              a prohibition against discrimination, harassment and bullying; and
            </p>

            <p class="sub-point">
              f. as required, certify to Client in writing Contractor’s compliance with this
              clause.
            </p>

            <p>
              <b>7.3. Non-infringement.</b> Contractor represents and warrants that Contractor Work
              Product does not, and will not infringe, misappropriate or violate the proprietary
              rights of any third party, including, without limitation, any Intellectual Property or
              any rights of privacy or rights of publicity, except to the extent any portion of
              Contractor Work Product is created, developed or supplied by Client or by a third
              party on behalf of Client.
            </p>

            <p>
              <b>7.4. Competitive Activities.</b> Client acknowledges that Contractor provides
              services to other clients. Notwithstanding the foregoing, Contractor agrees that
              during the term of this Agreement, Contractor will not, directly or indirectly,
              engage or participate in or provide services to any business that is competitive
              with the types and kinds of business being conducted by Client without the prior
              written agreement of Client; except that this Section 7.4 will not apply where
              prohibited by law.
            </p>

            <p>
              <b>7.5. Non-Solicitation of Personnel.</b> During the term of this Agreement and for a
              period of one (1) year thereafter, Contractor will not directly or indirectly solicit the
              services of any of Client’s employees, workers or contractors for Contractor’s own
              benefit or for the benefit of any other person or entity. Client will not directly or
              indirectly solicit Contractor’s employees for Client’s own benefit or for the benefit
              of any other person or entity or attempt to induce such employees, workers or
              contractors to terminate their employment/contract (whichever relevant) with
              Client.
            </p>

            <p><b>8. TERM AND TERMINATION</b></p>

            <p>
              <b>8.1. Term.</b> This Agreement will commence on the Effective Date and will remain in
              full force and effect for two (2) calendar years from the Effective Date and shall
              be automatically renewed for each subsequent calendar year, unless terminated
              earlier in accordance with the terms of this Agreement or a Statement of Work, or
              this Section 8. This Agreement may be renewed an unlimited number of times.
            </p>

            <p>
              <b>8.2. Termination for Breach.</b> Except as provided below, either party may
              terminate this Agreement (including all Statements of Work) if the other party
              breaches any material term of this Agreement and fails to cure such breach within
              ten (10) days following a written notice thereof from the non-breaching party.
              Client may terminate this Agreement (including all Statements of Work) with
              immediate notice and with no liability to make any further payments to Contractor
              (other than in respect of amounts accrued before the Termination Date) if at any
              time Contractor:
            </p>

            <p class="sub-point">
              a. commits (or any of its subcontractors commits) any gross negligence or
              intentional misconduct affecting the business of Client, including but not
              limited to acts of fraud or dishonesty, material breaches of Client’s code of
              conduct-related rules and policies insofar as they are applicable to
              independent contractors (including relating to bribery, corruption, tax
              evasion, data protection, equality and diversity, and health and safety);
            </p>

            <p class="sub-point">
              b. commits (or any of its subcontractors commits) any bribery offense;
            </p>

            <p class="sub-point">
              c. commits (or any of its subcontractors commits) a local or foreign tax
              evasion facilitation offense;
            </p>

            <p class="sub-point">
              d. is wound-up or declared bankrupt or makes arrangements with or for the
              benefit of Contractor’s creditors or has a court administration order made
              against Contractor for the reimbursement of Contractor’s creditors.
            </p>

            <p>
              <b>8.3. Termination for Convenience.</b> Either party may terminate this Agreement
              (including all Statements of Work) at any time, without assigning any reason, upon
              at least ten (10) days written notice to the other party. Client may also terminate
              an individual Statement of Work at any time, without assigning any reason, upon
              at least ten (10) days written notice to Contractor.
            </p>

            <p>
              <b>8.4. Termination of Deel Terms and Conditions.</b> This Agreement will
              automatically terminate upon termination of the Deel Terms and Conditions by
              either party, or in the event that Deel terminates Client’s or Contractor’s use of the
              Deel platform for any reason.
            </p>

            <p>
              <b>8.5. Effect of Termination.</b> Upon the expiration or termination of this Agreement
              for any reason: (i) Contractor will promptly deliver to Client all Contractor Work
              Product, including all work in progress on any Contractor Work Product not
              previously delivered to Client, if any, including any electronic copies thereof; (ii)
              Contractor will promptly deliver to Client all Confidential Information in
              Contractor’s possession or control, including any electronic copies thereof; and
              (iii) Client will pay Contractor any accrued but unpaid fees due and payable to
              Contractor pursuant to Section 2.
            </p>

            <p>
              <b>8.6. Survival.</b> The rights and obligations of the parties under Sections 2, 3.2, 4, 5,
              6, 7.3, 7.4, 8, 9.5, 9.6, 10 and 11 will survive the expiration, new statements of
              work or termination of this Agreement to the maximum period granted under the
              applicable law.
            </p>

            <p><b>9. LIMITATION OF LIABILITY</b></p>

            <p>
              <b>9.1.</b> Nothing in this Agreement will exclude or limit either party’s liability for losses
              incurred by the other party resulting from: death or personal injury due to the
              willful intent, gross negligence of the other party or that of their employees,
              affiliates or subcontractors; a party’s fraud or fraudulent misrepresentation; a
              contractor breach of the warranty of non infringement under Section 7.3; or a
              party’s breach of applicable law.
            </p>

            <p>
              <b>9.2.</b> Subject to the provisions above, neither party will be liable in contract, tort
              (including, without limitation, negligence), pre-contract or other representations
              (other than fraudulent misrepresentation) or otherwise arising out of or in
              connection with this Agreement for:
            </p>

            <p class="sub-point">
              a. any economic losses (including, without limitation, loss of revenues, profits,
              contracts, data, business, anticipated savings or cost of substitute
              services);
            </p>

            <p class="sub-point">
              b. any loss of goodwill or reputation; or
            </p>

            <p class="sub-point">
              c. any special, indirect or consequential losses suffered or incurred by a party
              arising out of or in connection with the provisions of, or any matter under
              the Agreement; whether or not such losses were within the contemplation of
              the parties on the Effective Date.
            </p>

            <p>
              <b>IN NO EVENT WILL EITHER PARTY BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
                PUNITIVE, EXEMPLARY OR CONSEQUENTIAL DAMAGES OF ANY KIND IN
                CONNECTION WITH THIS AGREEMENT, EVEN IF THE PARTY HAS BEEN
                INFORMED IN ADVANCE OF THE POSSIBILITY OF SUCH DAMAGES. EXCEPT AS
                OTHERWISE SET FORTH IN THIS SECTION 9, EACH PARTY’S MAXIMUM
                LIABILITY WILL NOT EXCEED THE UNDISPUTED OUTSTANDING BALANCES
                OWED TO CONTRACTOR.</b>
            </p>

            <p><b>10. GENERAL</b></p>

            <p>
              <b>10.1. Assignment.</b> Contractor may not assign, transfer or delegate this
              Agreement or any of the Services, in whole or in part, without Client’s express
              prior written consent. Any attempt by Contractor to assign or transfer this
              Agreement, without such consent, will be void. Subject to the foregoing, this
              Agreement will bind and benefit the parties and their respective successors and
              assigns.
            </p>

            <p>
              <b>10.2. No Election of Remedies.</b> Except as expressly set forth in this Agreement,
              the exercise by Client of any of its remedies under this Agreement will not be
              deemed an election of remedies and will be without prejudice to its other
              remedies under this Agreement or available at law or in equity or otherwise.
            </p>

            <p>
              <b>10.3. Equitable Remedies.</b> Because the Services are personal and unique and
              because Contractor will have access to Confidential Information of Client, Client
              will have the right to enforce this Agreement and any of its provisions by
              injunction, specific performance or other equitable relief, to the extent permissible
              by law, without having to post a bond or other consideration, in addition to all
              other remedies that Client may have for a breach of this Agreement at law or
              otherwise.
            </p>

            <p>
              <b>10.4. Attorneys’ Fees.</b> If any action is necessary to enforce the terms of this
              Agreement, the substantially prevailing party will be entitled to reasonable
              attorneys’ fees, costs and expenses in addition to any other relief to which such
              prevailing party may be entitled.
            </p>

            <p>
              <b>10.5. GOVERNING LAW.</b> THIS AGREEMENT WILL BE GOVERNED BY AND
              CONSTRUED IN ACCORDANCE WITH THE LAWS OF SINGAPORE. EXCLUDING
              ITS BODY OF LAW CONTROLLING CONFLICT OF LAWS. ANY LEGAL ACTION OR
              PROCEEDING ARISING UNDER THIS AGREEMENT WILL BE BROUGHT
              EXCLUSIVELY IN THE FEDERAL OR STATE COURTS LOCATED IN SINGAPORE
              AND THE PARTIES IRREVOCABLY CONSENT TO THE PERSONAL JURISDICTION
              AND VENUE THEREIN.
            </p>

            <p>
              <b>10.6. Severability.</b> If any provision of this Agreement is held invalid or
              unenforceable by a court of competent jurisdiction, the remaining provisions of
              this Agreement will remain in full force and effect, and the provision affected will
              be construed so as to be enforceable to the maximum extent permissible by law.
            </p>

            <p>
              <b>10.7. Waiver.</b> The failure by either party to enforce any provision of this
              Agreement will not constitute a waiver of future enforcement of that or any other
              provision.
            </p>

            <p>
              <b>10.8. Notices.</b> All notices required or permitted under this Agreement will be in
              writing, will reference this Agreement, and will be deemed given when delivered
              via e-mail. All such notices will be sent to the e-mail addresses set forth above or
              to such other e-mail address as may be specified by either party to the other
              party in accordance with this Section 10.8.
            </p>

            <p>
              <b>10.9. Entire Agreement.</b> This Agreement, together with all Statements of Work,
              constitutes the complete and exclusive understanding and agreement of the
              parties with respect to its subject matter and supersedes all prior understandings
              and agreements, whether written or oral, with respect to its subject matter. Each
              party acknowledges that in entering into this Agreement it does not rely on any
              statement, representation, assurance or warranty that is not set out in this
              Agreement (including any Statement of Work). No term of any Statement of Work
              will be deemed to amend the terms of this Agreement unless a Statement of Work
              references a specific provision in this Agreement and provides that the Statement
              of Work is amending only that specific provision of this Agreement and only with
              respect to Services performed pursuant to such Statement of Work. Any waiver,
              modification or amendment of any provision of this Agreement will be effective
              only if in writing and signed by the parties hereto. Each party agrees that it will
              have no claim for innocent or negligent misrepresentation based on any provision
              of this Agreement.
            </p>

            <p><b>10.10. No Partnership.</b> This Agreement does not create a partnership or jointventure relationship.</p>

            <p>
              <b>10.11. Counterparts.</b> This Agreement may be executed in counterparts, each of
              which will be deemed an original, but all of which together will constitute one and
              the same instrument.
            </p>

            <p>
              <b>10.12. Modifications.</b> This Agreement may be modified only by a contract in
              writing executed by the parties to this Agreement against whom enforcement of
              such modification is sought.
            </p>

            <p>
              <b>10.13. Third-Party Rights.</b> The parties do not intend that any term of this
              Agreement will be enforceable by any person who is not a party to this
              Agreement.
            </p>

            <p>
              <b>10.14. Electronic Signatures.</b> Except where prohibited by law, the parties
              consent to use Deel’s electronic signature service to execute this Agreement and
              agree that such signatures are valid and binding on the parties.
            </p>

            <p>
              IN WITNESS WHEREOF, the parties have executed this Agreement as of the
              Effective Date.
            </p>
          </div>
        </div>
      </div>
      <template slot="footer">
        <div class="signature-wrapper">
          <div class="all-form-title bold-text form-field float-left">
            <span class="text-label">Client signature</span><br><br>
            <input type="text" class="form-input form-control form-signature text-signature" :placeholder="[[ clientSignature ]]" disabled>
          </div>

          <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(post)">
              <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractorSignature" name="Contractor signature">
                <div class="all-form-title bold-text form-field float-left">
                  <span class="text-label">Contractor signature</span><br>
                  <span class="text-label-desc">Enter your full name (Contractor Signature)</span>
                  <input v-model="contractorSignature" type="text" class="form-input form-control form-signature text-signature" :placeholder="[[ contractorSignature ]]">
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </form>
          </ValidationObserver>
        </div>
        <div class="button-wrapper">
          <base-button type="primary" @click.prevent="sendContractorSignature">
            Agree and Sign
          </base-button>
        </div>
        <div class="button-wrapper">
          <base-button type="primary" @click.prevent="downloadPdf">
            Download PDF
          </base-button>
        </div>
      </template>
    </modal>
    <modal :show.sync="modals.contractorEmailInvitation" size="lg" modal-classes="modal-contractor-invitation">
      <template slot="header" />
      <div class="full-contract-details-wrapper">
        <div class="mr-3">
          <div class="all-form-title bold-text form-field">
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(post)">
                <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractorEmailAddress" name="Contractor email address">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label">Contractor email</span><br>
                    <input v-model="contractorEmailAddress" type="text" class="form-input form-control" :placeholder="[[ contractorEmailAddress ]]">
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractorEmailAddress" name="Contractor email address">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label">Message for contractor</span><br>
                    <textarea v-model="contractorEmailInvitationContent" type="text" class="form-input form-control" placeholder="" />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </form>
            </ValidationObserver>

            <div class="button-wrapper">
              <base-button type="primary" @click.prevent="sendContractorInvitation">
                Send Invite
              </base-button>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer" />
    </modal>
    <modal :show.sync="modals.paymentDetails" size="lg" modal-classes="modal-contractor-details">
      <template slot="header" />
      <div class="full-contract-details-wrapper">
        <div class="mr-3">
          <div class="all-form-title bold-text form-field">
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(post)">
                <div class="all-form-title bold-text form-field field-group">
                  <span class="text-label">Define the rate</span>
                </div>

                <div class="multiple-fields-wrapper">
                  <div v-if="showElement.salaryAmounts" :key="'salaryAmounts-'+key.salaryAmounts" class="all-form-title bold-text form-field two-colls first-coll mb-4">
                    <ValidationProvider v-slot="{ errors }" mode="passive" rules="required|numeric" vid="salaryAmount" name="Salary Amount">
                      <span class="text-label">How much?</span>
                      <input v-model="salaryAmount" type="text" class="form-input form-control" placeholder="0.00">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="salaryCurrency" name="Payment Currency">
                    <div class="all-form-title bold-text form-field two-colls mb-4">
                      <span class="text-label">Currency</span>
                      <select v-model="salaryCurrency" class="form-control form-input">
                        <option v-for="(salaryCurrency, key) in salaryCurrencies" :key="salaryCurrency + key" :value="salaryCurrency.id">
                          {{ salaryCurrency.name }}
                        </option>
                      </select>
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>

                <div v-if="showElement.salaryFrequency" :key="'salaryFrequency-'+key.salaryFrequency" class="all-form-title bold-text form-field mb-4">
                  <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep2.salaryFrequency" name="Payment Frequency">
                    <span class="text-label">Per</span>
                    <select v-model="salaryFrequency" class="form-control form-input">
                      <option v-for="(salaryFrequency, key) in salaryFrequencies" :key="salaryFrequency + key" :value="salaryFrequency.id">
                        {{ salaryFrequency.name }}
                      </option>
                    </select>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>

                <div class="all-form-title form-field field-group">
                  <span class="text-label Invoicing">Invoicing</span>
                </div>

                <ValidationProvider v-slot="{ errors }" mode="passive" vid="invoiceCycle" name="">
                  <div class="all-form-title bold-text form-field mb-4">
                    <span class="text-label">Invoice cycle</span>
                    <select v-model="invoiceCycle" class="form-control form-input">
                      <option v-for="(invoiceCycleOption, key) in invoiceCycleOptions" :key="invoiceCycleOption + key" :value="invoiceCycleOption.id">
                        {{ invoiceCycleOption.name }}
                      </option>
                    </select>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" mode="passive" vid="invoiceCycleEnds" name="">
                  <div class="all-form-title bold-text form-field mb-4">
                    <span class="text-label">Invoice cycle ends</span>
                    <select v-model="invoiceCycleEnds" class="form-control form-input">
                      <option v-for="(invoiceCycleEndsOption, key) in invoiceCycleEndsOptions" :key="invoiceCycleEndsOption + key" :value="invoiceCycleEndsOption.id">
                        {{ invoiceCycleEndsOption.name }}
                      </option>
                    </select>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" mode="passive" vid="invoicePaymentDue" name="">
                  <div class="all-form-title bold-text form-field mb-4">
                    <span class="text-label">Payment due</span>
                    <select v-model="invoicePaymentDue" class="form-control form-input">
                      <option v-for="(invoicePaymentDueOption, key) in invoicePaymentDueOptions" :key="invoicePaymentDueOption + key" :value="invoicePaymentDueOption.id">
                        {{ invoicePaymentDueOption.name }}
                      </option>
                    </select>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" mode="passive" vid="isInvoicePaymentPayAheadOfTheWeekend" name="">
                  <div class="all-form-title bold-text form-field mb-4">
                    <span class="text-label">Pay ahead of the weekend</span>
                    <span class="text-label-desc">If the payment due is on a weekend, pay on Friday</span>

                    <base-switch v-model="isInvoicePaymentPayAheadOfTheWeekend" class="mr-1 form-checkbox" on-text="Yes" off-text="No" :disabled="isDisabled" />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </form>
            </ValidationObserver>

            <div class="button-wrapper">
              <base-button type="primary" @click.prevent="updatePaymentDetails">
                Update
              </base-button>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer" />
    </modal>
    <modal :show.sync="modals.firstPayment" size="lg" modal-classes="modal-contractor-details">
      <template slot="header" />
      <div class="full-contract-details-wrapper">
        <div class="mr-3">
          <div class="all-form-title bold-text form-field">
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(post)">
                <div class="all-form-title bold-text form-field field-group">
                  <span class="text-label">Define first payment date</span>
                </div>

                <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="firstPaymentDate" name="First payment date">
                  <div class="all-form-title bold-text form-field mb-4">
                    <base-input class="text-label" label="First payment date">
                      <flat-picker
                        v-model="firstPaymentDate"
                        slot-scope="{focus, blur}"
                        :config="firstPaymentDateconfig"
                        class="form-control form-input datepicker"
                        @on-open="focus"
                        @on-close="blur"
                      />
                    </base-input>

                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </form>
            </ValidationObserver>

            <div class="button-wrapper">
              <base-button type="primary" @click.prevent="updateFirstPaymentDate">
                Update
              </base-button>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer" />
    </modal>
    <modal :show.sync="modals.jobRole" size="lg" modal-classes="modal-contractor-details">
      <template slot="header" />
      <div class="full-contract-details-wrapper">
        <div class="mr-3">
          <div class="all-form-title bold-text form-field">
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(post)">
                <div class="all-form-title bold-text form-field field-group">
                  <span class="text-label">Define job role</span>
                </div>

                <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep1.jobTitle" name="Job Title">
                  <div class="all-form-title bold-text form-field mb-4">
                    <span class="text-label">Job Title</span>
                    <input v-model="jobTitle" type="text" class="form-input form-control" placeholder="">
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep1.seniorityLevel" name="Seniority Level">
                  <div class="all-form-title bold-text form-field mb-4">
                    <span class="text-label">Seniority Level</span>
                    <select v-model="seniorityLevel" class="form-control form-input">
                      <option value="0" selected>
                        Choose Seniority Level
                      </option>
                      <option v-for="(seniorityLevel, key) in seniorityLevels" :key="seniorityLevel + key" :value="seniorityLevel.id">
                        {{ seniorityLevel.name }}
                      </option>
                    </select>
                    <span class="text-danger">{{ errors.email }}</span>
                  </div>
                </ValidationProvider>
              </form>
            </ValidationObserver>

            <div class="button-wrapper">
              <base-button type="primary" @click.prevent="updateJobRole">
                Update
              </base-button>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer" />
    </modal>
    <modal :show.sync="modals.countryCompliance" size="lg" modal-classes="modal-contractor-details">
      <template slot="header" />
      <div class="full-contract-details-wrapper">
        <div class="mr-3">
          <div class="all-form-title bold-text form-field">
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(post)">
                <div class="all-form-title bold-text form-field field-group">
                  <span class="text-label">Define country compliance</span>
                </div>

                <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractorTaxResidence" name="Contractor Tax Residence">
                  <div class="all-form-title bold-text form-field mb-4">
                    <span class="text-label">Where is the contractor's tax residence?</span>
                    <country-select v-model="contractorTaxResidence" :country="contractorTaxResidence" top-country="SG" class="form-control form-input" />

                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </form>
            </ValidationObserver>

            <div class="button-wrapper">
              <base-button type="primary" @click.prevent="updateCountryCompliance">
                Update
              </base-button>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer" />
    </modal>
    <modal :show.sync="modals.endOfContract" size="lg" modal-classes="modal-contractor-details">
      <template slot="header" />
      <div class="full-contract-details-wrapper">
        <div class="mr-3">
          <div class="all-form-title bold-text form-field">
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(post)">
                <div class="all-form-title bold-text form-field field-group">
                  <span class="text-label">Define contract ending condition</span>
                </div>

                <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="terminationDate" name="Termination date">
                  <div class="all-form-title bold-text form-field mb-4">
                    <span class="text-label">Termination date</span><br>
                    <span class="text-label-desc">The client will pay the contractor until the contract has been terminated.</span>
                    <base-input class="text-label">
                      <flat-picker
                        v-model="terminationDate"
                        slot-scope="{focus, blur}"
                        :config="terminationDateconfig"
                        class="form-control form-input datepicker"
                        @on-open="focus"
                        @on-close="blur"
                      />
                    </base-input>

                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" mode="passive" rules="required|numeric" vid="noticePeriod" name="Notice period">
                  <div class="all-form-title bold-text form-field mb-4">
                    <span class="text-label">Notice period</span><br>
                    <span class="text-label-desc">Either party may terminate within the days of notice based on the agreement, after which the contract will be terminated.</span>
                    <input v-model="noticePeriod" type="text" class="form-input form-control" placeholder="">
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </form>
            </ValidationObserver>

            <div class="button-wrapper">
              <base-button type="primary" @click.prevent="updateEndOfContract">
                Update
              </base-button>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer" />
    </modal>
    <modal :show.sync="modals.otherSpecific" size="lg" modal-classes="modal-contractor-details">
      <template slot="header" />
      <div class="full-contract-details-wrapper">
        <div class="mr-3">
          <div class="all-form-title bold-text form-field">
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(post)">
                <div class="all-form-title bold-text form-field field-group">
                  <span class="text-label">Other specifics</span>
                </div>

                <div class="all-form-title bold-text form-field mb-4">
                  <span class="text-label">Who can submit work?</span>

                  <ValidationProvider mode="passive" vid="canClientSubmitWork" name="Can client submit work">
                    <div class="checkbox-wrapper">
                      <base-switch v-model="canClientSubmitWork" class="mr-1" on-text="Yes" off-text="No" />
                      <span class="text-label-desc">Client</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider mode="passive" vid="canContractorSubmitWork" name="Can contractor submit work">
                    <div class="checkbox-wrapper">
                      <base-switch v-model="canContractorSubmitWork" class="mr-1" on-text="Yes" off-text="No" />
                      <span class="text-label-desc">Contractor</span>
                    </div>
                  </ValidationProvider>
                </div>

                <ValidationProvider v-slot="{ errors }" mode="passive" rules="" vid="specialClause" name="Special Clause">
                  <div class="all-form-title bold-text form-field mb-4">
                    <span class="text-label">Special Clause</span><br>
                    <span class="text-label-desc">You may want a special clause on the contract to outline terms of a special scenario.</span>

                    <textarea v-model="specialClause" type="text" class="form-input form-control" placeholder="" />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </form>
            </ValidationObserver>

            <div class="button-wrapper">
              <base-button type="primary" @click.prevent="updateOtherSpecific">
                Update
              </base-button>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer" />
    </modal>
    <modal :show.sync="modals.stockOffer" size="lg" modal-classes="modal-stock-option">
      <template slot="header" />
      <div class="full-contract-details-wrapper">
        <div class="mr-3">
          <div class="all-form-title bold-text form-field">
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(post)">
                <div class="all-form-title bold-text form-field field-group">
                  <span class="text-label">Offer stock options</span>
                </div>

                <div class="information-text-wrapper">
                  <span>
                    Stock options need to be approved by the Board of Directors, and a separate form of contract will be required for the options to be granted.
                  </span>
                </div>

                <div class="all-form-title bold-text form-field two-collumns">
                  <span class="text-label">What is the value of the option you wish to offer?</span><br>

                  <ValidationProvider v-slot="{ errors }" mode="passive" vid="stockOptionCurrency" name="Stock Option Currency">
                    <div class="currency-field-wrapper">
                      <select v-model="stockOptionCurrency" class="form-control form-input">
                        <option v-for="(salaryCurrency, key) in salaryCurrencies" :key="salaryCurrency + key" :value="salaryCurrency.id">
                          {{ salaryCurrency.name }}
                        </option>
                      </select>
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider v-slot="{ errors }" mode="passive" rules="numeric" vid="stockOptionAggregateValue" name="Aggregate option value">
                    <div class="aggregate-value-field-wrapper">
                      <input v-model="stockOptionAggregateValue" type="text" class="form-input form-control" placeholder="Aggregate option value">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>

                <ValidationProvider v-slot="{ errors }" mode="passive" vid="stockOptionTotalNumber" name="Number of stock options">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label d-block">Specify the number of stock options this represents?</span>

                    <input v-model="stockOptionTotalNumber" rules="numeric" type="text" class="form-input form-control" placeholder="Number of stock options">
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" mode="passive" vid="stockOptionVestingStartDate" name="Vesting start date">
                  <div class="all-form-title bold-text form-field mb-4">
                    <span class="text-label">When does the vesting start?</span><br>
                    <base-input class="text-label" label="">
                      <flat-picker
                        v-model="stockOptionVestingStartDate"
                        slot-scope="{focus, blur}"
                        :config="stockOptionVestingStartDateConfig"
                        class="form-control form-input datepicker"
                        @on-open="focus"
                        @on-close="blur"
                      />
                    </base-input>

                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <div class="all-form-title bold-text form-field two-collumns">
                  <span class="text-label">What is the monthly vesting schedule?</span><br>

                  <ValidationProvider v-slot="{ errors }" mode="passive" rules="numeric" vid="stockOptionTotalVestingMonth" name="Total vesting months">
                    <div class="total-month-vesting-field-wrapper">
                      <input v-model="stockOptionTotalVestingMonth" type="text" class="form-input form-control" placeholder="Total months">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider v-slot="{ errors }" mode="passive" rules="numeric" vid="stockOptionVestingCliffMonth" name="Cliff vesting months">
                    <div class="cliff-month-vesting-field-wrapper">
                      <input v-model="stockOptionVestingCliffMonth" type="text" class="form-input form-control" placeholder="Cliff months">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
              </form>
            </ValidationObserver>

            <div class="button-wrapper">
              <base-button type="primary" @click.prevent="updateStockOffer">
                Update
              </base-button>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer" />
    </modal>
    <modal :show.sync="modals.scope" size="lg" modal-classes="modal-contractor-details">
      <template slot="header" />
      <div class="full-contract-details-wrapper">
        <div class="mr-3">
          <div class="all-form-title bold-text form-field">
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(post)">
                <div class="all-form-title bold-text form-field field-group">
                  <span class="text-label">Define scope of work</span>
                </div>

                <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="contractStep1.scopeOfWork" name="Scope of Work">
                  <div class="all-form-title bold-text form-field mb-4">
                    <span class="text-label">Scope of Work</span>
                    <textarea v-model="scopeOfWork" rows="6" type="text" class="form-input form-control" placeholder="Describe the project scope here..." />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </form>
            </ValidationObserver>

            <div class="button-wrapper">
              <base-button type="primary" @click.prevent="updateScope">
                Update
              </base-button>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer" />
    </modal>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import flatPicker from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import 'vue-country-region-select'

export default {
  layout: 'argon',
  auth: true,
  components: {
    ValidationObserver,
    ValidationProvider,
    flatPicker
  },
  async asyncData (context) {
    return await context.app.$axios.$get('/api/pay/as/you/go/contract/' + context.route.params.id)
      .then((data) => {
        return data
      })
      .catch(e => console.log(e))
  },
  data () {
    return {
      firstPaymentDateconfig: {
        allowInput: true,
        altFormat: 'j F Y',
        altInput: true
      },
      terminationDateconfig: {
        allowInput: true,
        altFormat: 'j F Y',
        altInput: true
      },
      stockOptionVestingStartDateConfig: {
        allowInput: true,
        altFormat: 'j F Y',
        altInput: true
      },
      contractStatusOptions: [
        { name: '' },
        { name: 'DRAFT' },
        { name: 'WAITING FOR CONTRACTOR SIGNATURE' },
        { name: 'SIGNED BY BOTH PARTIES' }
      ],
      paymentPackageTypeOptions: [
        {
          name: 'Fixed rate',
          id: 0
        },
        {
          name: 'Task',
          id: 1
        }
      ],
      invoicePaymentDueOptions: [
        {
          name: 'Same day',
          id: 0
        },
        {
          name: '5 Days later',
          id: 1
        },
        {
          name: '7 Days later',
          id: 2
        },
        {
          name: '15 Days later',
          id: 3
        },
        {
          name: '30 Days later',
          id: 4
        },
        {
          name: '60 Days later',
          id: 5
        },
        {
          name: '90 Days later',
          id: 6
        }
      ],
      invoiceCycleOptions: [
        {
          name: 'Weekly',
          id: 0
        },
        {
          name: 'Every other week',
          id: 1
        },
        {
          name: 'Twice a month',
          id: 2
        },
        {
          name: 'Monthly',
          id: 3
        }
      ],
      invoiceCycleEndsOptions: [
        {
          name: '1st of the month',
          id: 0
        },
        {
          name: '2nd of the month',
          id: 1
        },
        {
          name: '3rd of the month',
          id: 2
        },
        {
          name: '4th of the month',
          id: 3
        },
        {
          name: '5th of the month',
          id: 4
        },
        {
          name: '6th of the month',
          id: 5
        },
        {
          name: '7th of the month',
          id: 6
        },
        {
          name: '8th of the month',
          id: 7
        },
        {
          name: '9th of the month',
          id: 8
        },
        {
          name: '10th of the month',
          id: 9
        },
        {
          name: '11th of the month',
          id: 10
        },
        {
          name: '12th of the month',
          id: 11
        },
        {
          name: '13th of the month',
          id: 12
        },
        {
          name: '14th of the month',
          id: 13
        },
        {
          name: '15th of the month',
          id: 14
        },
        {
          name: '16th of the month',
          id: 15
        },
        {
          name: '17th of the month',
          id: 16
        },
        {
          name: '18th of the month',
          id: 17
        },
        {
          name: '19th of the month',
          id: 18
        },
        {
          name: '20th of the month',
          id: 19
        },
        {
          name: '21st of the month',
          id: 20
        },
        {
          name: '22nd of the month',
          id: 21
        },
        {
          name: '23rd of the month',
          id: 22
        },
        {
          name: '24th of the month',
          id: 23
        },
        {
          name: '25th of the month',
          id: 24
        },
        {
          name: '26th of the month',
          id: 25
        },
        {
          name: '27th of the month',
          id: 26
        },
        {
          name: '28th of the month',
          id: 27
        },
        {
          name: '29th of the month',
          id: 28
        },
        {
          name: '30th of the month',
          id: 29
        },
        {
          name: 'Last day of the month',
          id: 30
        }
      ],
      salaryCurrencies: [
        { name: 'SGD - Singapore Dollar', id: 'SGD' },
        { name: 'AED - United Emirate Arabs Dirham', id: 'AED' },
        { name: 'ALL - Albanian Lek', id: 'ALL' },
        { name: 'AMD - Armenian Dram', id: 'AMD' },
        { name: 'ARS - Argentine Peso', id: 'ARS' },
        { name: 'AUD - Australian Dollar', id: 'AUD' },
        { name: 'AZN - Azerbaijani Manat', id: 'AZN' },
        { name: 'BAM - Bosnia and Herzegovina Convertible Mark', id: 'BAM' },
        { name: 'BBD - Barbadian Dollar', id: 'BBD' },
        { name: 'BDT - Bangladeshi Taka', id: 'BDT' },
        { name: 'BGN - Bulgarian Lev', id: 'BGN' },
        { name: 'BHD - Bahraini Dinar', id: 'BHD' },
        { name: 'BMD - Bermudian Dollar', id: 'BMD' },
        { name: 'BND - Brunei Dinar', id: 'BND' },
        { name: 'BOB - Bolivian Boliviano', id: 'BOB' },
        { name: 'BRL - Brazilian Real', id: 'BRL' },
        { name: 'BSD - Bahamian Dollar', id: 'BSD' },
        { name: 'BWP - Pula', id: 'BWP' },
        { name: 'BYN - Belarusian Ruble', id: 'BYN' },
        { name: 'BZD - Belize Dollar', id: 'BZD' },
        { name: 'CAD - Canadian Dollar', id: 'CAD' },
        { name: 'CDF - Congolese Franc', id: 'CDF' },
        { name: 'CHF - Swiss Franc', id: 'CHF' },
        { name: 'CLP - Chilean Peso', id: 'CLP' },
        { name: 'CNY - Chinese Yuan', id: 'CNY' },
        { name: 'COP - Colombian Peso', id: 'COP' },
        { name: 'CRC - Costa Rican Colon', id: 'CRC' },
        { name: 'CUP - Cuban Peso', id: 'CUP' },
        { name: 'CVE - Cape Verdean Escudo', id: 'CVE' },
        { name: 'CZK - Czech Koruna', id: 'CZK' },
        { name: 'DJF - Djiboutian Franc', id: 'DJF' },
        { name: 'DKK - Danish Krone', id: 'DKK' },
        { name: 'DOP - Dominican Peso', id: 'DOP' },
        { name: 'DZD - Algerian Dinar', id: 'DZD' },
        { name: 'EGP - Egyptian Pound', id: 'EGP' },
        { name: 'ETP - Ethiopian Birr', id: 'ETP' },
        { name: 'EUR - Euro', id: 'EUR' },
        { name: 'FJD - Fijian Dollar', id: 'FJD' },
        { name: 'GBP - British Pound', id: 'GBP' },
        { name: 'GEL - Georgian Lari', id: 'GEL' },
        { name: 'GHS - Ghanian Cedi', id: 'GHS' },
        { name: 'GIP - Gibraltar Pound', id: 'GIP' },
        { name: 'GMD - Gambian Dalasi', id: 'GMD' },
        { name: 'GNF - Guinea Franc', id: 'GNF' },
        { name: 'GTQ - Guatemalan Quetzal', id: 'GTQ' },
        { name: 'GYD - Guyanes Dollar', id: 'GYD' },
        { name: 'HKD - Hong Kong Dollar', id: 'HKD' },
        { name: 'HNL - Honduran Lempira', id: 'HNL' },
        { name: 'HRK - Croatian Kuna', id: 'HRK' },
        { name: 'HTG - Haitian Gourde', id: 'HTG' },
        { name: 'HUF - Hungarian Forint', id: 'HUF' },
        { name: 'IDR - Indonesian Rupiah', id: 'IDR' },
        { name: 'ILS - Israeli New Shekel', id: 'ILS' },
        { name: 'INR - Indian Rupee', id: 'INR' },
        { name: 'ISK - Icelandic Króna', id: 'ISK' },
        { name: 'JMD - Jamaican Dollar', id: 'JMD' },
        { name: 'JOD - Jordanian Dinar', id: 'JOD' },
        { name: 'JPY - Japanese Yen', id: 'JPY' },
        { name: 'KES - Kenyan Shilling', id: 'KES' },
        { name: 'KGS - Kyrgyzstani Som', id: 'KGS' },
        { name: 'KHR - Cambodian Riel', id: 'KHR' },
        { name: 'KMF - Comorian Franc', id: 'KMF' },
        { name: 'KRW - South Korean Won', id: 'KRW' },
        { name: 'KWD - Kuwaiti Dinar', id: 'KWD' },
        { name: 'KYD - Cayman Island Dollar', id: 'KYD' },
        { name: 'KZT - Kazakhstani Tenge', id: 'KZT' },
        { name: 'LAK - KIP', id: 'LAK' },
        { name: 'LBP - Lebanese Pound', id: 'LBP' },
        { name: 'LKR - Sri Lankan Rupee', id: 'LKR' },
        { name: 'LSL - Lesotho Loti', id: 'LSL' },
        { name: 'LVL - Latvian Lats', id: 'LVL' },
        { name: 'MAD - Moroccan Dirham', id: 'MAD' },
        { name: 'MGA - Malagasy Ariary', id: 'MGA' },
        { name: 'MMK - Burmese Kyat', id: 'MMK' },
        { name: 'MNT - Mongolian Togrog', id: 'MNT' },
        { name: 'MOP - Macanese Pataca', id: 'MOP' },
        { name: 'MRO - Mauritanian Ouguiya', id: 'MRO' },
        { name: 'MUR - Mauritian Rupee', id: 'MUR' },
        { name: 'MVR - Maldivian Rufiyaa', id: 'MVR' },
        { name: 'MWK - Malawian Kwacha', id: 'MWK' },
        { name: 'MXN - Mexican Peso', id: 'MXN' },
        { name: 'MYR - Malaysian Ringgit', id: 'MYR' },
        { name: 'MZN - Mozambican Metical', id: 'MZN' },
        { name: 'NAD - Namibia Dollar', id: 'NAD' },
        { name: 'NGN - Nigerian Naira', id: 'NGN' },
        { name: 'NIO - Nicaraguan Cordoba', id: 'NIO' },
        { name: 'NOK - Norwegian Krone', id: 'NOK' },
        { name: 'NPR - Nepalese Rupee', id: 'NPR' },
        { name: 'NZD - New Zealand Dollar', id: 'NZD' },
        { name: 'OMR - Omani Rial', id: 'OMR' },
        { name: 'PAB - Panamanian Balboa', id: 'PAB' },
        { name: 'PEN - Peruvian Sol', id: 'PEN' },
        { name: 'PGK - Kina', id: 'PGK' },
        { name: 'PHP - Philippine Peso', id: 'PHP' },
        { name: 'PKR - Pakistani Rupee', id: 'PKR' },
        { name: 'PLN - Polish Zloty', id: 'PLN' },
        { name: 'PYG - Paraguayan Guarani', id: 'PYG' },
        { name: 'QAR - Qatari Riyal', id: 'QAR' },
        { name: 'RON - Romanian Leu', id: 'RON' },
        { name: 'RSD - Serbian Dinar', id: 'RSD' },
        { name: 'RUB - Russian Ruble', id: 'RUB' },
        { name: 'RWF - Rwandan Franc', id: 'RWF' },
        { name: 'SAR - Saudi Riyal ', id: 'SAR' },
        { name: 'SEK - Swedish Krona', id: 'SEK' },
        { name: 'SLL - Sierra Leonean Leone', id: 'SLL' },
        { name: 'SRD - Surinamese Dollar', id: 'SRD' },
        { name: 'SVC - Salvadoran Colon', id: 'SVC' },
        { name: 'SZL - Swazi Lilangeni', id: 'SZL' },
        { name: 'THB - Thai Baht', id: 'THB' },
        { name: 'TJS - Tajikstani Somoni', id: 'TJS' },
        { name: 'TMT - Turmenikstan Manat', id: 'TMT' },
        { name: 'TND - Tunisian Dinar', id: 'TND' },
        { name: 'TRY - Turkish Lira', id: 'TRY' },
        { name: 'TTD - Trinidad and Tobago Dollar', id: 'TTD' },
        { name: 'TWD - Taiwan Dollar', id: 'TWD' },
        { name: 'UAH - Ukranian Hryvnia', id: 'UAH' },
        { name: 'UGX - Ugandan Shilling', id: 'UGX' },
        { name: 'USD - US Dollar', id: 'USD' },
        { name: 'UYU - Uruguayan Peso', id: 'UYU' },
        { name: 'VND - Vietnamese Dong', id: 'VND' },
        { name: 'WST - Samoan Tala', id: 'WST' },
        { name: 'ZAR - South African Rand', id: 'ZAR' }
      ],
      salaryFrequencies: [
        {
          name: 'Hour',
          id: 0
        },
        {
          name: 'Day',
          id: 1
        },
        {
          name: 'Week',
          id: 2
        },
        {
          name: 'Task',
          id: 3
        }
      ],
      seniorityLevels: [
        {
          name: 'Not applicable',
          id: 0
        },
        {
          name: 'Junior',
          id: 1
        },
        {
          name: 'Mid',
          id: 2
        },
        {
          name: 'Senior',
          id: 3
        },
        {
          name: 'Lead',
          id: 4
        },
        {
          name: 'Principal / Staff',
          id: 5
        },
        {
          name: 'Director',
          id: 6
        },
        {
          name: 'Head of Department',
          id: 7
        },
        {
          name: 'Vice President',
          id: 8
        },
        {
          name: 'Senior Vice President',
          id: 9
        },
        {
          name: 'C-level Executive',
          id: 10
        }
      ],
      showElement: {
        salaryAmounts: true,
        salaryFrequency: true
      },
      key: {
        salaryAmounts: 0,
        salaryFrequency: 0
      },
      modals: {
        clientSignature: false,
        contractorSignature: false,
        contractorEmailInvitation: false,
        paymentDetails: false,
        scope: false,
        endOfContract: false,
        firstPayment: false,
        jobRole: false,
        stockOffer: false,
        countryCompliance: false,
        otherSpecific: false
      },
      submenu: true,
      currentDate: new Date(),
      disableInvitationButton: true,
      contractId: this.$route.params.id,
      contractorEmailInvitationContent: 'Hey! We are so excited to work with you. This is an invitation to your Globelise contract where you\'ll find all the details we discussed. Globelise is also the platform we use for compliance and payments.'
    }
  },
  computed: {
    isDisabled () {
      return !this.isInvoiceSettingsCustomisable
    }
  },
  mounted () {
    if (this.contractStatus > 1) {
      this.disableInvitationButton = false
    }

    if (this.paymentPackageType === '0') {
      this.showElement.salaryAmounts = true
      this.showElement.salaryFrequency = true
    } else {
      this.showElement.salaryAmounts = false
      this.showElement.salaryFrequency = false
    }
  },
  methods: {
    handleAdditionalDocumentUpload (event) {
      this.additionalDocument = event.target.files[0]
    },
    async sendClientSignature () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.clientSignedDate = new Date()

      this.$axios.$patch('/api/pay/as/you/go/contract/' + this.contractId, {
        legalEntity: this.legalEntity,
        contractName: this.contractName,
        contractorName: this.contractorName,
        contractorEmailAddress: this.contractorEmailAddress,
        jobTitle: this.jobTitle,
        seniorityLevel: this.seniorityLevel,
        scopeOfWork: this.scopeOfWork,
        startDate: this.startDate,
        paymentPackageType: this.paymentPackageType,
        salaryAmount: this.salaryAmount,
        salaryCurrency: this.salaryCurrency,
        salaryFrequency: this.salaryFrequency,
        invoiceCycle: this.invoiceCycle,
        invoiceCycleEnds: this.invoiceCycleEnds,
        invoicePaymentDue: this.invoicePaymentDue,
        isInvoicePaymentPayAheadOfTheWeekend: this.isInvoicePaymentPayAheadOfTheWeekend,
        firstPaymentDate: this.firstPaymentDate,
        canClientSubmitWork: this.canClientSubmitWork,
        canContractorSubmitWork: this.canContractorSubmitWork,
        terminationDate: this.terminationDate,
        noticePeriod: this.noticePeriod,
        specialClause: this.specialClause,
        contractStatus: 2,
        company: this.company.id,
        clientSignature: this.clientSignature,
        clientSignedDate: this.clientSignedDate,
        contractorSignature: '',
        contractorSignedDate: '',
        stockOptionCurrency: this.stockOptionCurrency,
        stockOptionAggregateValue: this.stockOptionAggregateValue,
        stockOptionTotalNumber: this.stockOptionTotalNumber,
        stockOptionTotalVestingMonth: this.stockOptionTotalVestingMonth,
        stockOptionVestingCliffMonth: this.stockOptionVestingCliffMonth,
        stockOptionVestingStartDate: this.stockOptionVestingStartDate,
        additionalDocument: '',
        additionalDocumentFilename: this.additionalDocumentFilename,
        customContract: '',
        customContractFilename: this.customContractFilename,
        contractorTaxResidence: this.contractorTaxResidence,
        typeOfContractDocument: this.typeOfContractDocument,
        clientUserProfile: this.$auth.user.userProfile.id
      }).then((data) => {
        this.clientUserProfile = data.clientUserProfile
        this.modals.clientSignature = false
        this.contractStatus = 2
        this.disableInvitationButton = false
        return true
      }).catch((e) => {
        const errors = {}

        Object.entries(e.response.data.errors).forEach(function (value) {
          const key = value[0]
          errors[key] = value[1]
        })

        this.$refs.form.setErrors(errors)
        return false
      })
    },
    async sendContractorSignature () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.contractorSignedDate = new Date()

      this.$axios.$patch('/api/pay/as/you/go/contract/' + this.contractId, {
        legalEntity: this.legalEntity,
        contractName: this.contractName,
        contractorName: this.contractorName,
        contractorEmailAddress: this.contractorEmailAddress,
        jobTitle: this.jobTitle,
        seniorityLevel: this.seniorityLevel,
        scopeOfWork: this.scopeOfWork,
        startDate: this.startDate,
        paymentPackageType: this.paymentPackageType,
        salaryAmount: this.salaryAmount,
        salaryCurrency: this.salaryCurrency,
        salaryFrequency: this.salaryFrequency,
        invoiceCycle: this.invoiceCycle,
        invoiceCycleEnds: this.invoiceCycleEnds,
        invoicePaymentDue: this.invoicePaymentDue,
        isInvoicePaymentPayAheadOfTheWeekend: this.isInvoicePaymentPayAheadOfTheWeekend,
        firstPaymentDate: this.firstPaymentDate,
        canClientSubmitWork: this.canClientSubmitWork,
        canContractorSubmitWork: this.canContractorSubmitWork,
        terminationDate: this.terminationDate,
        noticePeriod: this.noticePeriod,
        specialClause: this.specialClause,
        contractStatus: 3,
        company: this.company.id,
        clientSignature: this.clientSignature,
        clientSignedDate: new Date(),
        contractorSignature: this.contractorSignature,
        contractorSignedDate: this.contractorSignedDate,
        stockOptionCurrency: this.stockOptionCurrency,
        stockOptionAggregateValue: this.stockOptionAggregateValue,
        stockOptionTotalNumber: this.stockOptionTotalNumber,
        stockOptionTotalVestingMonth: this.stockOptionTotalVestingMonth,
        stockOptionVestingCliffMonth: this.stockOptionVestingCliffMonth,
        stockOptionVestingStartDate: this.stockOptionVestingStartDate,
        additionalDocument: '',
        additionalDocumentFilename: this.additionalDocumentFilename,
        customContract: '',
        customContractFilename: this.customContractFilename,
        contractorTaxResidence: this.contractorTaxResidence,
        typeOfContractDocument: this.typeOfContractDocument,
        contractorUserProfile: this.$auth.user.userProfile.id,
        clientUserProfile: this.clientUserProfile.id
      }).then((data) => {
        this.contractorUserProfile = data.contractorUserProfile
        this.modals.contractorSignature = false
        this.contractStatus = 3
        this.disableInvitationButton = false
        return true
      }).catch((e) => {
        const errors = {}

        Object.entries(e.response.data.errors).forEach(function (value) {
          const key = value[0]
          errors[key] = value[1]
        })

        this.$refs.form.setErrors(errors)
        return false
      })
    },
    async sendContractorInvitation () {
      if (this.company.name === null) {
        this.company.name = ''
      }

      await this.$axios.$post('/api/fixed/rate/contract/contractor/invitation', {
        contractorEmailAddress: this.contractorEmailAddress,
        contractorEmailInvitationContent: this.contractorEmailInvitationContent,
        uuId: this.uuid,
        hostUrl: location.protocol + '//' + window.location.hostname,
        contractType: 2,
        companyName: this.company.name
      }).then(() => {
        this.modals.contractorEmailInvitation = false
        this.contractStatus = 2
        this.disableInvitationButton = false
        return true
      }).catch((e) => {
        const errors = {}

        Object.entries(e.response.data.errors).forEach(function (value) {
          const key = value[0]
          errors[key] = value[1]
        })

        this.$refs.form.setErrors(errors)
        return false
      })
    },
    async updatePaymentDetails () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.$axios.$patch('/api/pay/as/you/go/contract/' + this.contractId, {
        legalEntity: this.legalEntity,
        contractName: this.contractName,
        contractorName: this.contractorName,
        contractorEmailAddress: this.contractorEmailAddress,
        jobTitle: this.jobTitle,
        seniorityLevel: this.seniorityLevel,
        scopeOfWork: this.scopeOfWork,
        startDate: this.startDate,
        paymentPackageType: this.paymentPackageType,
        salaryAmount: this.salaryAmount,
        salaryCurrency: this.salaryCurrency,
        salaryFrequency: this.salaryFrequency,
        invoiceCycle: this.invoiceCycle,
        invoiceCycleEnds: this.invoiceCycleEnds,
        invoicePaymentDue: this.invoicePaymentDue,
        isInvoicePaymentPayAheadOfTheWeekend: this.isInvoicePaymentPayAheadOfTheWeekend,
        firstPaymentDate: this.firstPaymentDate,
        canClientSubmitWork: this.canClientSubmitWork,
        canContractorSubmitWork: this.canContractorSubmitWork,
        terminationDate: this.terminationDate,
        noticePeriod: this.noticePeriod,
        specialClause: this.specialClause,
        contractStatus: this.contractStatus,
        company: this.company.id,
        clientSignature: this.clientSignature,
        clientSignedDate: this.clientSignedDate,
        contractorSignature: this.clientSignedDate,
        contractorSignedDate: this.contractorSignedDate,
        stockOptionCurrency: this.stockOptionCurrency,
        stockOptionAggregateValue: this.stockOptionAggregateValue,
        stockOptionTotalNumber: this.stockOptionTotalNumber,
        stockOptionTotalVestingMonth: this.stockOptionTotalVestingMonth,
        stockOptionVestingCliffMonth: this.stockOptionVestingCliffMonth,
        stockOptionVestingStartDate: this.stockOptionVestingStartDate,
        additionalDocument: '',
        additionalDocumentFilename: this.additionalDocumentFilename,
        customContract: '',
        customContractFilename: this.customContractFilename,
        contractorTaxResidence: this.contractorTaxResidence,
        typeOfContractDocument: this.typeOfContractDocument
      }).then(() => {
        this.modals.paymentDetails = false
        return true
      }).catch((e) => {
        const errors = {}

        Object.entries(e.response.data.errors).forEach(function (value) {
          const key = value[0]
          errors[key] = value[1]
        })

        this.$refs.form.setErrors(errors)
        return false
      })
    },
    async updateFirstPaymentDate () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.$axios.$patch('/api/pay/as/you/go/contract/' + this.contractId, {
        legalEntity: this.legalEntity,
        contractName: this.contractName,
        contractorName: this.contractorName,
        contractorEmailAddress: this.contractorEmailAddress,
        jobTitle: this.jobTitle,
        seniorityLevel: this.seniorityLevel,
        scopeOfWork: this.scopeOfWork,
        startDate: this.startDate,
        paymentPackageType: this.paymentPackageType,
        salaryAmount: this.salaryAmount,
        salaryCurrency: this.salaryCurrency,
        salaryFrequency: this.salaryFrequency,
        invoiceCycle: this.invoiceCycle,
        invoiceCycleEnds: this.invoiceCycleEnds,
        invoicePaymentDue: this.invoicePaymentDue,
        isInvoicePaymentPayAheadOfTheWeekend: this.isInvoicePaymentPayAheadOfTheWeekend,
        firstPaymentDate: this.firstPaymentDate,
        canClientSubmitWork: this.canClientSubmitWork,
        canContractorSubmitWork: this.canContractorSubmitWork,
        terminationDate: this.terminationDate,
        noticePeriod: this.noticePeriod,
        specialClause: this.specialClause,
        contractStatus: this.contractStatus,
        company: this.company.id,
        clientSignature: this.clientSignature,
        clientSignedDate: this.clientSignedDate,
        contractorSignature: this.clientSignedDate,
        contractorSignedDate: this.contractorSignedDate,
        stockOptionCurrency: this.stockOptionCurrency,
        stockOptionAggregateValue: this.stockOptionAggregateValue,
        stockOptionTotalNumber: this.stockOptionTotalNumber,
        stockOptionTotalVestingMonth: this.stockOptionTotalVestingMonth,
        stockOptionVestingCliffMonth: this.stockOptionVestingCliffMonth,
        stockOptionVestingStartDate: this.stockOptionVestingStartDate,
        additionalDocument: '',
        additionalDocumentFilename: this.additionalDocumentFilename,
        customContract: '',
        customContractFilename: this.customContractFilename,
        contractorTaxResidence: this.contractorTaxResidence,
        typeOfContractDocument: this.typeOfContractDocument
      }).then(() => {
        this.modals.firstPayment = false
        return true
      }).catch((e) => {
        const errors = {}

        Object.entries(e.response.data.errors).forEach(function (value) {
          const key = value[0]
          errors[key] = value[1]
        })

        this.$refs.form.setErrors(errors)
        return false
      })
    },
    async updateScope () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.$axios.$patch('/api/pay/as/you/go/contract/' + this.contractId, {
        legalEntity: this.legalEntity,
        contractName: this.contractName,
        contractorName: this.contractorName,
        contractorEmailAddress: this.contractorEmailAddress,
        jobTitle: this.jobTitle,
        seniorityLevel: this.seniorityLevel,
        scopeOfWork: this.scopeOfWork,
        startDate: this.startDate,
        paymentPackageType: this.paymentPackageType,
        salaryAmount: this.salaryAmount,
        salaryCurrency: this.salaryCurrency,
        salaryFrequency: this.salaryFrequency,
        invoiceCycle: this.invoiceCycle,
        invoiceCycleEnds: this.invoiceCycleEnds,
        invoicePaymentDue: this.invoicePaymentDue,
        isInvoicePaymentPayAheadOfTheWeekend: this.isInvoicePaymentPayAheadOfTheWeekend,
        firstPaymentDate: this.firstPaymentDate,
        canClientSubmitWork: this.canClientSubmitWork,
        canContractorSubmitWork: this.canContractorSubmitWork,
        terminationDate: this.terminationDate,
        noticePeriod: this.noticePeriod,
        specialClause: this.specialClause,
        contractStatus: this.contractStatus,
        company: this.company.id,
        clientSignature: this.clientSignature,
        clientSignedDate: this.clientSignedDate,
        contractorSignature: this.clientSignedDate,
        contractorSignedDate: this.contractorSignedDate,
        stockOptionCurrency: this.stockOptionCurrency,
        stockOptionAggregateValue: this.stockOptionAggregateValue,
        stockOptionTotalNumber: this.stockOptionTotalNumber,
        stockOptionTotalVestingMonth: this.stockOptionTotalVestingMonth,
        stockOptionVestingCliffMonth: this.stockOptionVestingCliffMonth,
        stockOptionVestingStartDate: this.stockOptionVestingStartDate,
        additionalDocument: '',
        additionalDocumentFilename: this.additionalDocumentFilename,
        customContract: '',
        customContractFilename: this.customContractFilename,
        contractorTaxResidence: this.contractorTaxResidence,
        typeOfContractDocument: this.typeOfContractDocument
      }).then(() => {
        this.modals.scope = false
        return true
      }).catch((e) => {
        const errors = {}

        Object.entries(e.response.data.errors).forEach(function (value) {
          const key = value[0]
          errors[key] = value[1]
        })

        this.$refs.form.setErrors(errors)
        return false
      })
    },
    async updateJobRole () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.$axios.$patch('/api/pay/as/you/go/contract/' + this.contractId, {
        legalEntity: this.legalEntity,
        contractName: this.contractName,
        contractorName: this.contractorName,
        contractorEmailAddress: this.contractorEmailAddress,
        jobTitle: this.jobTitle,
        seniorityLevel: this.seniorityLevel,
        scopeOfWork: this.scopeOfWork,
        startDate: this.startDate,
        paymentPackageType: this.paymentPackageType,
        salaryAmount: this.salaryAmount,
        salaryCurrency: this.salaryCurrency,
        salaryFrequency: this.salaryFrequency,
        invoiceCycle: this.invoiceCycle,
        invoiceCycleEnds: this.invoiceCycleEnds,
        invoicePaymentDue: this.invoicePaymentDue,
        isInvoicePaymentPayAheadOfTheWeekend: this.isInvoicePaymentPayAheadOfTheWeekend,
        firstPaymentDate: this.firstPaymentDate,
        canClientSubmitWork: this.canClientSubmitWork,
        canContractorSubmitWork: this.canContractorSubmitWork,
        terminationDate: this.terminationDate,
        noticePeriod: this.noticePeriod,
        specialClause: this.specialClause,
        contractStatus: this.contractStatus,
        company: this.company.id,
        clientSignature: this.clientSignature,
        clientSignedDate: this.clientSignedDate,
        contractorSignature: this.clientSignedDate,
        contractorSignedDate: this.contractorSignedDate,
        stockOptionCurrency: this.stockOptionCurrency,
        stockOptionAggregateValue: this.stockOptionAggregateValue,
        stockOptionTotalNumber: this.stockOptionTotalNumber,
        stockOptionTotalVestingMonth: this.stockOptionTotalVestingMonth,
        stockOptionVestingCliffMonth: this.stockOptionVestingCliffMonth,
        stockOptionVestingStartDate: this.stockOptionVestingStartDate,
        additionalDocument: '',
        additionalDocumentFilename: this.additionalDocumentFilename,
        customContract: '',
        customContractFilename: this.customContractFilename,
        contractorTaxResidence: this.contractorTaxResidence,
        typeOfContractDocument: this.typeOfContractDocument
      }).then(() => {
        this.modals.jobRole = false
        return true
      }).catch((e) => {
        const errors = {}

        Object.entries(e.response.data.errors).forEach(function (value) {
          const key = value[0]
          errors[key] = value[1]
        })

        this.$refs.form.setErrors(errors)
        return false
      })
    },
    async updateCountryCompliance () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.$axios.$patch('/api/pay/as/you/go/contract/' + this.contractId, {
        legalEntity: this.legalEntity,
        contractName: this.contractName,
        contractorName: this.contractorName,
        contractorEmailAddress: this.contractorEmailAddress,
        jobTitle: this.jobTitle,
        seniorityLevel: this.seniorityLevel,
        scopeOfWork: this.scopeOfWork,
        startDate: this.startDate,
        paymentPackageType: this.paymentPackageType,
        salaryAmount: this.salaryAmount,
        salaryCurrency: this.salaryCurrency,
        salaryFrequency: this.salaryFrequency,
        invoiceCycle: this.invoiceCycle,
        invoiceCycleEnds: this.invoiceCycleEnds,
        invoicePaymentDue: this.invoicePaymentDue,
        isInvoicePaymentPayAheadOfTheWeekend: this.isInvoicePaymentPayAheadOfTheWeekend,
        firstPaymentDate: this.firstPaymentDate,
        canClientSubmitWork: this.canClientSubmitWork,
        canContractorSubmitWork: this.canContractorSubmitWork,
        terminationDate: this.terminationDate,
        noticePeriod: this.noticePeriod,
        specialClause: this.specialClause,
        contractStatus: this.contractStatus,
        company: this.company.id,
        clientSignature: this.clientSignature,
        clientSignedDate: this.clientSignedDate,
        contractorSignature: this.clientSignedDate,
        contractorSignedDate: this.contractorSignedDate,
        stockOptionCurrency: this.stockOptionCurrency,
        stockOptionAggregateValue: this.stockOptionAggregateValue,
        stockOptionTotalNumber: this.stockOptionTotalNumber,
        stockOptionTotalVestingMonth: this.stockOptionTotalVestingMonth,
        stockOptionVestingCliffMonth: this.stockOptionVestingCliffMonth,
        stockOptionVestingStartDate: this.stockOptionVestingStartDate,
        additionalDocument: '',
        additionalDocumentFilename: this.additionalDocumentFilename,
        customContract: '',
        customContractFilename: this.customContractFilename,
        contractorTaxResidence: this.contractorTaxResidence,
        typeOfContractDocument: this.typeOfContractDocument
      }).then(() => {
        this.modals.countryCompliance = false
        return true
      }).catch((e) => {
        const errors = {}

        Object.entries(e.response.data.errors).forEach(function (value) {
          const key = value[0]
          errors[key] = value[1]
        })

        this.$refs.form.setErrors(errors)
        return false
      })
    },
    async updateEndOfContract () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.$axios.$patch('/api/pay/as/you/go/contract/' + this.contractId, {
        legalEntity: this.legalEntity,
        contractName: this.contractName,
        contractorName: this.contractorName,
        contractorEmailAddress: this.contractorEmailAddress,
        jobTitle: this.jobTitle,
        seniorityLevel: this.seniorityLevel,
        scopeOfWork: this.scopeOfWork,
        startDate: this.startDate,
        paymentPackageType: this.paymentPackageType,
        salaryAmount: this.salaryAmount,
        salaryCurrency: this.salaryCurrency,
        salaryFrequency: this.salaryFrequency,
        invoiceCycle: this.invoiceCycle,
        invoiceCycleEnds: this.invoiceCycleEnds,
        invoicePaymentDue: this.invoicePaymentDue,
        isInvoicePaymentPayAheadOfTheWeekend: this.isInvoicePaymentPayAheadOfTheWeekend,
        firstPaymentDate: this.firstPaymentDate,
        canClientSubmitWork: this.canClientSubmitWork,
        canContractorSubmitWork: this.canContractorSubmitWork,
        terminationDate: this.terminationDate,
        noticePeriod: this.noticePeriod,
        specialClause: this.specialClause,
        contractStatus: this.contractStatus,
        company: this.company.id,
        clientSignature: this.clientSignature,
        clientSignedDate: this.clientSignedDate,
        contractorSignature: this.clientSignedDate,
        contractorSignedDate: this.contractorSignedDate,
        stockOptionCurrency: this.stockOptionCurrency,
        stockOptionAggregateValue: this.stockOptionAggregateValue,
        stockOptionTotalNumber: this.stockOptionTotalNumber,
        stockOptionTotalVestingMonth: this.stockOptionTotalVestingMonth,
        stockOptionVestingCliffMonth: this.stockOptionVestingCliffMonth,
        stockOptionVestingStartDate: this.stockOptionVestingStartDate,
        additionalDocument: '',
        additionalDocumentFilename: this.additionalDocumentFilename,
        customContract: '',
        customContractFilename: this.customContractFilename,
        contractorTaxResidence: this.contractorTaxResidence,
        typeOfContractDocument: this.typeOfContractDocument
      }).then(() => {
        this.modals.endOfContract = false
        return true
      }).catch((e) => {
        const errors = {}

        Object.entries(e.response.data.errors).forEach(function (value) {
          const key = value[0]
          errors[key] = value[1]
        })

        this.$refs.form.setErrors(errors)
        return false
      })
    },
    async updateOtherSpecific () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.$axios.$patch('/api/pay/as/you/go/contract/' + this.contractId, {
        legalEntity: this.legalEntity,
        contractName: this.contractName,
        contractorName: this.contractorName,
        contractorEmailAddress: this.contractorEmailAddress,
        jobTitle: this.jobTitle,
        seniorityLevel: this.seniorityLevel,
        scopeOfWork: this.scopeOfWork,
        startDate: this.startDate,
        paymentPackageType: this.paymentPackageType,
        salaryAmount: this.salaryAmount,
        salaryCurrency: this.salaryCurrency,
        salaryFrequency: this.salaryFrequency,
        invoiceCycle: this.invoiceCycle,
        invoiceCycleEnds: this.invoiceCycleEnds,
        invoicePaymentDue: this.invoicePaymentDue,
        isInvoicePaymentPayAheadOfTheWeekend: this.isInvoicePaymentPayAheadOfTheWeekend,
        firstPaymentDate: this.firstPaymentDate,
        canClientSubmitWork: this.canClientSubmitWork,
        canContractorSubmitWork: this.canContractorSubmitWork,
        terminationDate: this.terminationDate,
        noticePeriod: this.noticePeriod,
        specialClause: this.specialClause,
        contractStatus: this.contractStatus,
        company: this.company.id,
        clientSignature: this.clientSignature,
        clientSignedDate: this.clientSignedDate,
        contractorSignature: this.clientSignedDate,
        contractorSignedDate: this.contractorSignedDate,
        stockOptionCurrency: this.stockOptionCurrency,
        stockOptionAggregateValue: this.stockOptionAggregateValue,
        stockOptionTotalNumber: this.stockOptionTotalNumber,
        stockOptionTotalVestingMonth: this.stockOptionTotalVestingMonth,
        stockOptionVestingCliffMonth: this.stockOptionVestingCliffMonth,
        stockOptionVestingStartDate: this.stockOptionVestingStartDate,
        additionalDocument: '',
        additionalDocumentFilename: this.additionalDocumentFilename,
        customContract: '',
        customContractFilename: this.customContractFilename,
        contractorTaxResidence: this.contractorTaxResidence,
        typeOfContractDocument: this.typeOfContractDocument
      }).then(() => {
        this.modals.otherSpecific = false
        return true
      }).catch((e) => {
        const errors = {}

        Object.entries(e.response.data.errors).forEach(function (value) {
          const key = value[0]
          errors[key] = value[1]
        })

        this.$refs.form.setErrors(errors)
        return false
      })
    },
    async updateStockOffer () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.$axios.$patch('/api/pay/as/you/go/contract/' + this.contractId, {
        legalEntity: this.legalEntity,
        contractName: this.contractName,
        contractorName: this.contractorName,
        contractorEmailAddress: this.contractorEmailAddress,
        jobTitle: this.jobTitle,
        seniorityLevel: this.seniorityLevel,
        scopeOfWork: this.scopeOfWork,
        startDate: this.startDate,
        paymentPackageType: this.paymentPackageType,
        salaryAmount: this.salaryAmount,
        salaryCurrency: this.salaryCurrency,
        salaryFrequency: this.salaryFrequency,
        invoiceCycle: this.invoiceCycle,
        invoiceCycleEnds: this.invoiceCycleEnds,
        invoicePaymentDue: this.invoicePaymentDue,
        isInvoicePaymentPayAheadOfTheWeekend: this.isInvoicePaymentPayAheadOfTheWeekend,
        firstPaymentDate: this.firstPaymentDate,
        canClientSubmitWork: this.canClientSubmitWork,
        canContractorSubmitWork: this.canContractorSubmitWork,
        terminationDate: this.terminationDate,
        noticePeriod: this.noticePeriod,
        specialClause: this.specialClause,
        contractStatus: this.contractStatus,
        company: this.company.id,
        clientSignature: this.clientSignature,
        clientSignedDate: this.clientSignedDate,
        contractorSignature: this.clientSignedDate,
        contractorSignedDate: this.contractorSignedDate,
        stockOptionCurrency: this.stockOptionCurrency,
        stockOptionAggregateValue: this.stockOptionAggregateValue,
        stockOptionTotalNumber: this.stockOptionTotalNumber,
        stockOptionTotalVestingMonth: this.stockOptionTotalVestingMonth,
        stockOptionVestingCliffMonth: this.stockOptionVestingCliffMonth,
        stockOptionVestingStartDate: this.stockOptionVestingStartDate,
        additionalDocument: '',
        additionalDocumentFilename: this.additionalDocumentFilename,
        customContract: '',
        customContractFilename: this.customContractFilename,
        contractorTaxResidence: this.contractorTaxResidence,
        typeOfContractDocument: this.typeOfContractDocument
      }).then(() => {
        this.modals.stockOffer = false
        return true
      }).catch((e) => {
        const errors = {}

        Object.entries(e.response.data.errors).forEach(function (value) {
          const key = value[0]
          errors[key] = value[1]
        })

        this.$refs.form.setErrors(errors)
        return false
      })
    },
    downloadPdf () {
      const apiHost = this.$axios.defaults.baseURL

      if (this.typeOfContractDocument === '1') {
        window.open(apiHost + '/uploads/pay_as_you_go_contract_custom_contract/' + this.customContractFilename, '_blank')
      } else {
        window.open(apiHost + '/generate/contract/' + this.contractId, '_blank')
      }
    },
    downloadAdditionalDocument () {
      const apiHost = this.$axios.defaults.baseURL

      window.open(apiHost + '/uploads/pay_as_you_go_contract_additional_document/' + this.additionalDocumentFilename, '_blank')
    },
    togglePaymentPackage (event) {
      const paymentPackageType = event.target.value

      if (paymentPackageType === '0') {
        this.showElement.salaryAmounts = true
        this.showElement.salaryFrequency = true
      } else {
        this.showElement.salaryAmounts = false
        this.showElement.salaryFrequency = false
        this.salaryAmount = 0
        this.salaryFrequency = 0
      }
    }
  }
}
</script>

<style scoped>
    .card {
        height: auto;
    }
    h1 {
        font-size: 36px;
        font-weight: bolder;
    }
    .form-title {
        font-family: 'Roboto Condensed';
        font-style: normal;
        font-weight: bold;
        font-size: 28px;
        line-height: 54px;
        /* identical to box height */
        letter-spacing: 0.75px;
        /* Body Text */
        color: #2e4823;
    }
    .bold-text{
        font-weight:700 !important;
    }
    .contract-type-wrapper {
        text-align: center;
    }
</style>
<style lang="scss">
  .full-width {
    width: 100%;
  }

  .checkbox-wrapper {
    width: 100%;
    height: 30px;
    margin-top: 10px;

    .custom-toggle {
      float: left;
    }
    .text-label-desc {
      color: black !important;
    }
  }

  .multiple-fields-wrapper {
    display: inline-table;
    width: 100%;
  }
  .download-contract-link {
    margin-top: 35px;
  }

  .contract-type-img {
    height: 100px;
  }
  .text-bold {
    font-weight: 900;
    color: #2e4823;
  }
    .hide-btn {
        display: block;
    }
    .form-title-wrapper {
        text-align: center;
        span {
            display: block;
        }
    }
  .modal-stock-option {
    .modal-body {
      padding: 0 1.5rem;
    }

    h3 {
      font-size: 22px !important;
    }

    .form-field {
      margin-bottom: 10px;
    }

    .two-collumns {
      height: 110px;
      display: block;
    }

    .currency-field-wrapper {
      width: 35%;
      display: block;
      float: left;
      margin-bottom: 10px;
      padding-right: 5px;
    }

    .aggregate-value-field-wrapper {
      width: 65%;
      display: block;
      float: right;
      margin-bottom: 10px;
    }

    .total-month-vesting-field-wrapper {
      width: 49%;
      display: block;
      float: left;
      margin-bottom: 10px;
      padding-right: 5px;
    }

    .cliff-month-vesting-field-wrapper {
      width: 50%;
      display: block;
      float: right;
      margin-bottom: 10px;
    }

    .information-text-wrapper {
      background-color: #e8f1fe;
      margin-bottom: 20px;
      padding: 18px;
      border-radius: 8px;

      span {
        color: #7c8286;
      }
    }
  }
    .modal-contract-details {
        .full-contract-details-wrapper {
            height: 380px;
            overflow: auto;

            .form-field {
                color: #6a6969;

                .contract-main-title {
                    text-align: center;
                }

                .sub-point {
                    margin-left: 25px;
                }

                .sub-sub-point {
                    margin-left: 50px;
                }

                b {
                    color: black;
                    font-weight: 900;
                }
            }
        }
        .modal-footer {
            display: block !important;
            width: 100%;

            .signature-wrapper {
                width: 100%;
            }

            .button-wrapper {
                padding: 10px 0;
                width: 100%;
                display: grid;
            }
        }
    }
    .modal-contractor-invitation {
        .full-contract-details-wrapper {
            .form-field {
                color: #6a6969;
                margin-bottom: 20px;
            }

            textarea {
                height: 100px;
            }

            .btn {
                width: 100%;
            }
        }

        .modal-footer {
            display: block !important;
            width: 100%;

            .signature-wrapper {
                width: 100%;
            }

            .button-wrapper {
                padding: 10px 0;
                width: 100%;
                display: grid;
            }
        }
    }

    .contract-type-actions-wrapper {
        margin-bottom: 20px;

        .next-btn {
            width: 100%;
            margin-bottom: 5px;
        }

        .back-btn {
            margin-top: 0;
            background-color: transparent;
            border: 0px;
            box-shadow: none;
            color: #525f7f;
            float: left;
            padding-left: 0px;

            .fa {
                margin-right: 5px;
            }

            &.btn-primary:hover, &.btn-primary:active {
                background-color: transparent;
                border: 0px;
                box-shadow: none !important;
                color: #525f7f;
            }
        }
    }
    .signature-wrapper {
        .form-field {
            width: 45%;
            margin-left: 20px;
        }
    }
    .all-form-title {
        font-family: 'Roboto Condensed';
        font-style: normal;
        color: #313131;
        text-align: center;
        /*margin-bottom: 30px;*/

        &.form-field {
            text-align: left;
        }

        &.two-colls {
            &.first-coll {
                padding-right: 10px;
            }
            float: left;
            display: block;
            width: 50%;
        }

        &.field-group {
            .text-label {
                font-size: 18px;
            }
            margin-bottom: 10px;
        }

        h3 {
            font-size: 18px;
        }

        .text-label {
            font-size: 16px;
            font-weight: 800 !important;
            color: #313131;
        }

        .text-label-desc {
            display: block;
            font-size: 14px;
            color: darkgrey;
        }

        .form-checkbox {
            display: block;
            float: right;
            margin-top: -40px;
        }

        .form-control-label {
            font-size: 16px;
            font-weight: 800 !important;
            color: #313131;
        }

        .text-label-desc {
            .form-control-label {
                display: block;
                font-size: 14px;
                color: darkgrey;
            }
        }

        .form-input {
            margin: 10px 0 5px 0;
            width: 100%;
            height: 100%;
            outline: none;
            font-size: 16px;
            line-height: 24px;
            color: var(--black);
        }

        .form-signature {
            border: none;
            border-bottom: 1px solid #eee;
        }

        .text-signature {
            font-family: 'Birthstone', cursive;
            color: black;
            font-size: 24px;

            &.client-signature {
                font-size: 32px;
            }
        }

        &.signed-signature-wrapper {
            width: 100%;
            display: inline-table;

            .text-left {
                float: left;
            }

            .text-right {
                display: block;
                float: right;
                margin-top: 16px;
            }
        }

        .contract-review-field-wrapper {
            background-color: #f4f3f5;
            padding: 10px 10px;
            height: 40px;
            margin: 10px 0 0 0;
            display: inline-table;
            width: 100%;

            &.no-background {
                background-color: #ffffff !important;
                padding-left: 0px;
            }

            .text-left {
                float: left;
            }

            .text-right {
                float: right;
                font-weight: bold !important;
            }

            .signature-btn {
                width: 150px;
            }
        }
    }
    .list-packages{
        padding-left: 0px;

        li{
            list-style: none;
        }
    }
    .list-item-packages{
        li{
            list-style: inside;
            font-family: 'Roboto Condensed';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 28px;
            letter-spacing: 0.75px;
            /* Body Text */
            color: #000;
        }
    }
    hr{
        &.black-line{
            width: 100%;
            color: #E0E0E0;
            background-color: #E0E0E0;
            margin:1em auto;
        }
    }
    .cards-info{
        span{
            letter-spacing: 0.75px;
            margin-rigt: 6px;
        }
    }
    div{
        &.divider{
            border-left: 1px solid #EFF7FF !important;
        }
    }
</style>
