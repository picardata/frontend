<template>
  <div class="row picardata-form-index">
    <div v-show="submenu" class="col-xl-12 pl-0 mt-4">
      <div>
        <base-header type="grey" class="pb-6">
          <div class="row align-items-center py-4">
            <div class="">
              <div class="">
                <h2 class="form-title">
                  {{ employeeFirstName }} {{ employeeLastName }} - {{ jobTitle }}
                </h2>
                <span class="mr-4">{{ contractStatusOptions[contractStatus].name }}</span>
                <span class="mr-4 text-bold">PAY AS YOU GO</span>
                <span>TEAM: <span class="text-bold">{{ legalEntity }}</span></span>
              </div>
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
                  <div class="all-form-title bold-text form-field">
                    This deal is using the standard Globelise contractaa
                  </div>
                </div>
              </div>
              <div class="card border p-4">
                <div class="mr-3">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label"> Contract details </span><br>

                    <div class="contract-review-field-wrapper">
                      <span class="text-left">Contractor's start date</span>
                      <span class="text-right text-date">{{ $moment(employmentStartDate).format("ll") }}</span>
                    </div>

                    <div class="contract-review-field-wrapper">
                      <span class="text-left">Contractor Type</span>
                      <span class="text-right text-date">Full time employee</span>
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
                    <span class="text-label"> Scope </span><br>
                    <div class="contract-review-field-wrapper">
                      <span class="text-left">{{ scopeOfWork }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card border p-4">
                <div class="mr-3">
                  <div class="all-form-title bold-text form-field">
                    <span class="text-label">Payment Details </span><br>
                    <div class="contract-review-field-wrapper">
                      <span class="text-left">Currency</span>
                      <span class="text-right text-date">{{ salaryCurrency }}</span>
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
                <div class="all-form-title bold-text form-field float-left" style="margin-left: 20px;">
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
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  layout: 'argon',
  auth: true,
  components: {
    ValidationObserver,
    ValidationProvider
  },
  async asyncData (context) {
    return await context.app.$axios.$get('/api/full/time/employee/contract/' + context.route.params.id)
      .then((data) => {
        console.log(data)
        return data
      })
      .catch(e => console.log(e))
  },
  data () {
    return {
      contractStatusOptions: [
        { name: '' },
        { name: 'DRAFT' },
        { name: 'WAITING FOR CONTRACTOR SIGNATURE' },
        { name: 'SIGNED BY BOTH PARTIES' }
      ],
      salaryFrequencies: [
        {
          name: 'Default'
        },
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
          name: 'Default'
        },
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
      ],
      modals: {
        clientSignature: false,
        contractorSignature: false,
        contractorEmailInvitation: false
      },
      submenu: true,
      currentDate: new Date(),
      disableInvitationButton: true,
      contractId: this.$route.params.id,
      contractorEmailInvitationContent: 'Hey! We are so excited to work with you. This is an invitation to your Globelise contract where you\'ll find all the details we discussed. Globelise is also the platform we use for compliance and payments.'
    }
  },
  mounted () {
    if (this.contractStatus > 1) {
      this.disableInvitationButton = false
    }
  },
  methods: {
    async sendClientSignature () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }
      this.clientSignedDate = new Date()

      this.$axios.$patch('/api/full/time/employee/contract/' + this.contractId, {
        legalEntity: this.legalEntity,
        employeeFirstName: this.employeeFirstName,
        employeeLastName: this.employeeLastName,
        employeePersonalEmailAddress: this.employeePersonalEmailAddress,
        employeeNationality: this.employeeNationality,
        employeeWorkingCountry: this.employeeWorkingCountry,
        employeeWorkingState: this.employeeWorkingState,
        isEmployeeNeedWorkingVisa: this.isEmployeeNeedWorkingVisa,
        employeeWorkEligibilityDocFilename: this.employeeWorkEligibilityDocFilename,
        seniorityLevel: this.seniorityLevel,
        jobTitle: this.jobTitle,
        scopeOfWork: this.scopeOfWork,
        salaryAmount: this.salaryAmount,
        salaryCurrency: this.salaryCurrency,
        anySigningBonus: this.anySigningBonus,
        grossSigningBonusAmount: this.grossSigningBonusAmount,
        anyVariableCompensation: this.anyVariableCompensation,
        variableCompensationAmount: this.variableCompensationAmount,
        employmentType: this.employmentType,
        partTimeTotalWorkingDaysPerWeek: this.partTimeTotalWorkingDaysPerWeek,
        partTimeTotalWorkingHoursPerDay: this.partTimeTotalWorkingHoursPerDay,
        partTimeTotalWorkingHoursPerWeek: this.partTimeTotalWorkingHoursPerWeek,
        employmentStartDate: this.employmentStartDate,
        timeOffType: this.timeOffType,
        timeOffPaidVacationDays: this.timeOffPaidVacationDays,
        timeOffSickDays: this.timeOffSickDays,
        contractTermType: this.contractTermType,
        contractEndDate: this.contractEndDate,
        probationPeriodType: this.probationPeriodType,
        probationPeriodTotalDays: this.probationPeriodTotalDays,
        healthBenefitType: this.healthBenefitType,
        healthBenefitAmount: this.healthBenefitAmount,
        stockOptionCurrency: this.stockOptionCurrency,
        stockOptionAggregateValue: this.stockOptionAggregateValue,
        stockOptionTotalNumber: this.stockOptionTotalNumber,
        stockOptionTotalVestingMonth: this.stockOptionTotalVestingMonth,
        stockOptionVestingCliffMonth: this.stockOptionVestingCliffMonth,
        stockOptionVestingStartDate: this.stockOptionVestingStartDate,
        contractStatus: 2,
        contractorName: this.contractorName,
        contractorEmailAddress: this.contractorEmailAddress,
        contractorJobTitle: this.contractorJobTitle,
        clientSignature: this.clientSignature,
        clientSignedDate: this.clientSignedDate,
        contractorSignature: this.contractorSignature,
        contractorSignedDate: this.contractorSignedDate,
        company: this.company.id,
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

      this.$axios.$patch('/api/full/time/employee/contract/' + this.contractId, {
        legalEntity: this.legalEntity,
        employeeFirstName: this.employeeFirstName,
        employeeLastName: this.employeeLastName,
        employeePersonalEmailAddress: this.employeePersonalEmailAddress,
        employeeNationality: this.employeeNationality,
        employeeWorkingCountry: this.employeeWorkingCountry,
        employeeWorkingState: this.employeeWorkingState,
        isEmployeeNeedWorkingVisa: this.isEmployeeNeedWorkingVisa,
        employeeWorkEligibilityDocFilename: this.employeeWorkEligibilityDocFilename,
        seniorityLevel: this.seniorityLevel,
        jobTitle: this.jobTitle,
        scopeOfWork: this.scopeOfWork,
        salaryAmount: this.salaryAmount,
        salaryCurrency: this.salaryCurrency,
        anySigningBonus: this.anySigningBonus,
        grossSigningBonusAmount: this.grossSigningBonusAmount,
        anyVariableCompensation: this.anyVariableCompensation,
        variableCompensationAmount: this.variableCompensationAmount,
        employmentType: this.employmentType,
        partTimeTotalWorkingDaysPerWeek: this.partTimeTotalWorkingDaysPerWeek,
        partTimeTotalWorkingHoursPerDay: this.partTimeTotalWorkingHoursPerDay,
        partTimeTotalWorkingHoursPerWeek: this.partTimeTotalWorkingHoursPerWeek,
        employmentStartDate: this.employmentStartDate,
        timeOffType: this.timeOffType,
        timeOffPaidVacationDays: this.timeOffPaidVacationDays,
        timeOffSickDays: this.timeOffSickDays,
        contractTermType: this.contractTermType,
        contractEndDate: this.contractEndDate,
        probationPeriodType: this.probationPeriodType,
        probationPeriodTotalDays: this.probationPeriodTotalDays,
        healthBenefitType: this.healthBenefitType,
        healthBenefitAmount: this.healthBenefitAmount,
        stockOptionCurrency: this.stockOptionCurrency,
        stockOptionAggregateValue: this.stockOptionAggregateValue,
        stockOptionTotalNumber: this.stockOptionTotalNumber,
        stockOptionTotalVestingMonth: this.stockOptionTotalVestingMonth,
        stockOptionVestingCliffMonth: this.stockOptionVestingCliffMonth,
        stockOptionVestingStartDate: this.stockOptionVestingStartDate,
        contractStatus: 3,
        contractorName: this.contractorName,
        contractorEmailAddress: this.contractorEmailAddress,
        contractorJobTitle: this.contractorJobTitle,
        clientSignature: this.clientSignature,
        clientSignedDate: this.clientSignedDate,
        contractorSignature: this.contractorSignature,
        contractorSignedDate: this.contractorSignedDate,
        company: this.company.id,
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
        contractType: 4,
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
    downloadPdf () {
      window.open('http://api.local.globelise.com/generate/contract/' + this.contractId, '_blank')
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
