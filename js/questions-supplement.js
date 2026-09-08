// ============================================================================
// SUPPLEMENT BANK — built from the official PSI content outline (lif26.pdf,
// "WASHINGTON LIFE PRODUCER, 100 Items - 150 Minutes") and Aubrey's 08/17/2026
// score report. Every question here fills a topic the main 300-question bank
// did NOT cover, weighted toward the areas he lost the most points in.
//
// Format matches questions.js: {id, ch, q, opts, correct, exp} plus `area`
// (the official PSI content area). IDs start at 301 to avoid collisions.
//
// DESIGN INVARIANTS (keep these on any future edit):
//   - all four options within a few words of each other (no length tell)
//   - never let the correct answer be the standout longest
//   - WA numeric questions use near-miss number distractors
//   - option order is shuffled at render by app.js shuffleOptions()
// ============================================================================

var SUPPLEMENT = [

// ══════════ FEDERAL LAWS AND REGULATIONS (2 items on exam — bank had ZERO) ══════════
{id:301,ch:6,area:"Federal",q:"Under 18 USC 1033, a person convicted of a felony involving dishonesty or breach of trust may work in the business of insurance only if that person first obtains:",
opts:["A fidelity bond filed with the insurer","Written consent from the state regulator","A federal insurance license renewal","A waiver granted by the NAIC board"],correct:1,
exp:"18 USC 1033 bars anyone convicted of a felony involving dishonesty or breach of trust from the business of insurance unless they obtain a letter of written consent (a 1033 waiver) from the state insurance commissioner."},

{id:302,ch:6,area:"Federal",q:"Violating 18 USC 1033 by engaging in the business of insurance without the required consent can result in:",
opts:["A written warning only","Federal fines and imprisonment","Loss of commissions for one year","A state-level reprimand"],correct:1,
exp:"18 USC 1034 gives the U.S. Attorney General civil enforcement authority, and 1033 violations carry federal criminal penalties including fines and imprisonment — this is federal law, not just a state licensing matter."},

{id:303,ch:6,area:"Federal",q:"18 USC 1033 applies to persons who are:",
opts:["Only individually licensed producers","Anyone engaged in the insurance business","Only officers of an insurance company","Only federally chartered insurance firms"],correct:1,
exp:"The prohibition reaches anyone engaged in the business of insurance affecting interstate commerce — producers, employees, and company personnel alike — not just licensed producers."},

{id:304,ch:6,area:"Federal",q:"A producer wants to make sales calls to consumers he has no prior relationship with. Federal law requires him to first check the:",
opts:["Medical Information Bureau file","National Do Not Call Registry","state insurance department roster","federal producer database"],correct:1,
exp:"The National Do Not Call Registry prohibits telemarketing calls to registered numbers. Producers must scrub call lists against it; violations carry significant per-call federal penalties."},

{id:305,ch:6,area:"Federal",q:"Which caller is generally permitted to contact a number listed on the National Do Not Call Registry?",
opts:["Any currently licensed insurance producer","A firm with an established relationship","Any caller phoning before 9:00 p.m.","Any caller offering a no-cost quote"],correct:1,
exp:"An established business relationship is a recognized exception — an insurer may contact its own existing customers. A registry listing otherwise blocks unsolicited telemarketing calls."},

{id:306,ch:6,area:"Federal",q:"A consumer asks a producer to stop calling him. Under Do Not Call rules, the producer must:",
opts:["Continue until the consumer registers","Honor the request and record it","Call back only on weekdays","Refer the consumer to the insurer"],correct:1,
exp:"Beyond the national registry, callers must maintain an internal do-not-call list and honor a specific request to stop calling — regardless of whether the number is nationally registered."},

// ══════════ GENERAL INSURANCE CONCEPTS (9 items — he scored 3/9; bank had only 9) ══════════
{id:307,ch:1,area:"Concepts",q:"An individual decides not to go skydiving because of the danger involved. Which method of handling risk is this?",
opts:["Avoidance","Retention","Reduction","Transfer"],correct:0,
exp:"Avoidance means eliminating exposure entirely by not engaging in the activity. The five methods are Sharing, Transfer, Avoidance, Retention, and Reduction (STARR)."},

{id:308,ch:1,area:"Concepts",q:"Choosing a higher deductible so you pay the first portion of any loss yourself is an example of risk:",
opts:["Avoidance","Retention","Transfer","Sharing"],correct:1,
exp:"Retention means knowingly keeping all or part of a risk yourself — deductibles and self-insurance are retention."},

{id:309,ch:1,area:"Concepts",q:"Buying an insurance policy is best described as which method of handling risk?",
opts:["Retention","Transfer","Avoidance","Reduction"],correct:1,
exp:"Insurance transfers the financial consequences of a loss from the insured to the insurer in exchange for a premium — the classic risk transfer."},

{id:310,ch:1,area:"Concepts",q:"Installing smoke detectors and a sprinkler system is an example of risk:",
opts:["Reduction","Avoidance","Transfer","Retention"],correct:0,
exp:"Reduction lowers the frequency or severity of a loss without eliminating the exposure. The risk remains, but the expected loss is smaller."},

{id:311,ch:1,area:"Concepts",q:"In insurance terminology, a 'peril' is best defined as:",
opts:["The chance of loss occurring","The cause of a loss","A condition increasing loss odds","The dollar amount of a loss"],correct:1,
exp:"A peril is the actual cause of loss (fire, illness, death). Risk is the chance of loss, a hazard increases the chance of loss, and loss is the reduction in value."},

{id:312,ch:1,area:"Concepts",q:"A condition that increases the likelihood or severity of a loss is called a:",
opts:["Peril","Hazard","Risk","Loss"],correct:1,
exp:"A hazard increases the chance that a peril will cause a loss. Physical hazards are tangible conditions; moral hazards involve dishonesty; morale hazards involve carelessness."},

{id:313,ch:1,area:"Concepts",q:"An applicant who intentionally conceals a serious illness in order to obtain coverage presents which kind of hazard?",
opts:["Physical hazard","Moral hazard","Morale hazard","Speculative hazard"],correct:1,
exp:"A moral hazard arises from dishonesty or a character tendency toward fraud. A morale hazard is carelessness or indifference, not deliberate deceit."},

{id:314,ch:1,area:"Concepts",q:"Which of the following is a requirement of an insurable risk?",
opts:["The loss must be catastrophic in scale","The loss must be definite and measurable","The risk must be purely speculative","The loss must be caused intentionally"],correct:1,
exp:"Insurable risks must involve losses that are definite, measurable, accidental, and not catastrophic to the insurer, drawn from a large homogeneous group of exposures."},

{id:315,ch:1,area:"Concepts",q:"A speculative risk differs from a pure risk in that a speculative risk:",
opts:["Involves a chance of gain","Is always insurable","Involves only loss","Applies only to life insurance"],correct:0,
exp:"Speculative risk (gambling, business ventures) carries a chance of gain and is not insurable. Insurance covers only pure risk, where the outcomes are loss or no loss."},

{id:316,ch:1,area:"Concepts",q:"An insurer owned by its policyholders, who may receive dividends, is a:",
opts:["Stock insurer","Mutual insurer","Reciprocal insurer","Fraternal insurer"],correct:1,
exp:"Mutual insurers are owned by policyholders and typically issue participating policies that pay policy dividends. Stock insurers are owned by shareholders and usually issue nonparticipating policies."},

{id:317,ch:1,area:"Concepts",q:"An insurer formed under the laws of Washington and transacting business in Washington is considered a(n):",
opts:["Domestic insurer","Foreign insurer","Alien insurer","Admitted insurer"],correct:0,
exp:"Domicile is judged from the state you are standing in: domestic = formed in this state, foreign = formed in another U.S. state, alien = formed in another country."},

{id:318,ch:1,area:"Concepts",q:"An insurer incorporated in Oregon that sells insurance in Washington is, from Washington's perspective, a(n):",
opts:["Domestic insurer","Foreign insurer","Alien insurer","Unauthorized insurer"],correct:1,
exp:"A foreign insurer is one formed under the laws of another U.S. state. An insurer formed outside the United States is an alien insurer."},

{id:319,ch:1,area:"Concepts",q:"An insurer that has received a certificate of authority from the Washington Insurance Commissioner is referred to as:",
opts:["Admitted (authorized)","Nonadmitted (unauthorized)","Domestic by default","A surplus lines carrier"],correct:0,
exp:"A certificate of authority makes an insurer admitted (authorized) to transact insurance in the state. Insurers without one are nonadmitted or unauthorized."},

{id:320,ch:1,area:"Concepts",q:"Which of the following is NOT one of the four required elements of a legal contract?",
opts:["Offer and acceptance","Competent parties","Legal purpose","Notarized signature"],correct:3,
exp:"A valid contract requires offer and acceptance, consideration, competent parties, and a legal purpose. Notarization is not required for an insurance contract."},

{id:321,ch:1,area:"Concepts",q:"In a life insurance contract, the applicant's consideration consists of:",
opts:["The insurer's promise to pay a claim","The premium and application statements","The cash value the policy builds","The commission paid to the producer"],correct:1,
exp:"Consideration is what each party gives up. The applicant provides the initial premium plus the representations in the application; the insurer provides its promise to pay benefits."},

{id:322,ch:1,area:"Concepts",q:"An agent's authority that is specifically written into the agency contract with the insurer is called:",
opts:["Express authority","Implied authority","Apparent authority","Assumed authority"],correct:0,
exp:"Express authority is granted explicitly in writing. Implied authority covers acts reasonably necessary to carry it out, and apparent authority arises from how things appear to the public."},

{id:323,ch:1,area:"Concepts",q:"A producer whose appointment was terminated still carries business cards and forms from the insurer, and a client reasonably believes he still represents it. This illustrates:",
opts:["Express authority","Implied authority","Apparent authority","Fiduciary authority"],correct:2,
exp:"Apparent authority arises when an insurer's own conduct or materials lead a reasonable third party to believe the producer is authorized — and the insurer can be bound by it."},

{id:324,ch:1,area:"Concepts",q:"Under the law of agency, the acts and knowledge of a producer acting within the scope of authority are:",
opts:["Attributed to the insurer","Attributed to the applicant","Legally unenforceable","Binding only in writing"],correct:0,
exp:"A producer legally represents the insurer, so the producer's knowledge and authorized acts are imputed to the insurer — which is why an insurer is bound by what its producer knew."},

{id:325,ch:1,area:"Concepts",q:"The doctrine of reasonable expectations holds that policy language should be interpreted:",
opts:["Strictly as the insurer intended it","As an ordinary insured would read it","According to industry custom and use","In favor of the party that drafted it"],correct:1,
exp:"Because insurance contracts are contracts of adhesion drafted solely by the insurer, ambiguities are resolved in line with what a reasonable insured would expect, i.e. against the drafter."},

{id:326,ch:1,area:"Concepts",q:"The principle of indemnity states that an insured should be:",
opts:["Restored to their pre-loss position","Paid somewhat more than the loss","Paid whether or not a loss occurs","Reimbursed for partial losses only"],correct:0,
exp:"Indemnity restores the insured to the same financial condition as before the loss, without profit. Life insurance is a valued contract rather than a strict indemnity contract."},

{id:327,ch:1,area:"Concepts",q:"Statements made by an applicant that are believed to be true to the best of their knowledge are:",
opts:["Warranties","Representations","Concealments","Guarantees"],correct:1,
exp:"Application answers are representations, not warranties. A material misrepresentation can allow the insurer to rescind the policy during the contestable period."},

{id:328,ch:1,area:"Concepts",q:"The deliberate withholding of a known material fact from the insurer is called:",
opts:["Concealment","Misrepresentation","Waiver","Estoppel"],correct:0,
exp:"Concealment is silence about a known material fact. If material, it gives the insurer grounds to void the contract, just as an affirmative misrepresentation would."},

{id:329,ch:1,area:"Concepts",q:"An insurance contract in which one party writes the terms and the other must accept or reject them as written is a contract of:",
opts:["Adhesion","Indemnity","Aleatory exchange","Utmost good faith"],correct:0,
exp:"Insurance policies are contracts of adhesion — take it or leave it. That is precisely why ambiguous wording is construed against the insurer that drafted it."},

// ══════════ WASHINGTON LAWS (30 items — he scored 17/30; these fill uncovered topics) ══════════
{id:330,ch:7,area:"WA",q:"Which of the following is within the Washington Insurance Commissioner's broad statutory powers?",
opts:["Setting federal income tax policy","Adopting rules and holding hearings","Licensing attorneys in the state","Approving every death claim filed"],correct:1,
exp:"Under RCW 48.02, the Commissioner administers the insurance code — adopting rules, holding hearings, investigating complaints, and enforcing compliance."},

{id:331,ch:7,area:"WA",q:"The Washington Insurance Commissioner may examine the books and records of an insurer:",
opts:["Only after a consumer files a complaint","Whenever the Commissioner deems necessary","Only once every ten calendar years","Only with the insurer's written consent"],correct:1,
exp:"RCW 48.03 authorizes the Commissioner to examine insurers' records as often as deemed necessary, and domestic insurers must be examined on a regular cycle."},

{id:332,ch:7,area:"WA",q:"Under Washington's filing requirements, a life insurance policy form generally may be used only after it has been:",
opts:["Printed and distributed by the insurer","Filed with and approved by the OIC","Reviewed by the NAIC model board","Registered with the SEC in advance"],correct:1,
exp:"Washington uses a file-and-approve system under RCW 48.18 — forms must be filed with the OIC and approved before being issued in the state."},

{id:333,ch:7,area:"WA",q:"A Washington temporary producer license may be issued to continue the business of a producer who has died or become disabled, and is valid for a maximum of:",
opts:["30 days","90 days","180 days","1 year"],correct:2,
exp:"A temporary license runs up to 180 days (6 months) and is intended to keep an existing book of business serviced. It is a once-per-lifetime license per line of authority."},

{id:334,ch:7,area:"WA",q:"Which activity would NOT require an insurance producer license in Washington?",
opts:["Soliciting an application for compensation","Clerical work not involving solicitation","Negotiating policy terms for a fee","Selling annuities for commission"],correct:1,
exp:"Licensing exemptions cover clerical and administrative staff who neither solicit, negotiate, nor sell insurance. Compensation tied to soliciting or selling triggers the license requirement."},

{id:335,ch:7,area:"WA",q:"A licensed business entity in Washington must name a Designated Responsible Licensed Person (DRLP) in order to:",
opts:["Be exempt from continuing education","Be accountable for entity compliance","Avoid producer appointment rules","Waive the entity license renewal fee"],correct:1,
exp:"The DRLP is the individually licensed person accountable for the agency's compliance with the insurance code — a required designation on an entity producer license."},

{id:336,ch:7,area:"WA",q:"A producer who accepts a premium payment from an applicant is required to:",
opts:["Deposit it into a personal account","Issue a proper written receipt","Hold it until the policy is issued","Forward it directly to the OIC"],correct:1,
exp:"WAC 284-30-550 requires producers to issue proper receipts for premiums collected. Failing to do so is an unfair practice, and premiums are held in a fiduciary capacity."},

{id:337,ch:7,area:"WA",q:"When the Washington Insurance Commissioner sends a producer a written inquiry about a consumer complaint, the producer must:",
opts:["Reply promptly as the statute requires","Respond only through legal counsel","Ignore it unless formally subpoenaed","Wait for the insurer to respond first"],correct:0,
exp:"RCW 48.17.475 requires a licensee to reply promptly in writing to inquiries from the Commissioner. Failure to respond is itself grounds for disciplinary action."},

{id:338,ch:7,area:"WA",q:"Before placing business with an insurer, a Washington producer has the burden of determining that the insurer is:",
opts:["Authorized to transact in the state","Rated A+ by a national agency","Domiciled within Washington State","Organized as a mutual company"],correct:0,
exp:"RCW 48.17.067 places the burden on the producer to determine that the insurer holds a certificate of authority. Placing business with an unauthorized insurer exposes the producer to personal liability."},

{id:339,ch:7,area:"WA",q:"Washington law requires a licensed producer to:",
opts:["Display the license at its business office","Mail a license copy to every client","File the license with the county clerk","Post the license number on all ads"],correct:0,
exp:"RCW 48.17.460 requires the license to be displayed in the licensee's place of business so the public can verify licensure."},

{id:340,ch:7,area:"WA",q:"Under Washington's life insurance disclosure rules, an applicant must generally be given a Buyer's Guide and a policy summary:",
opts:["No later than the policy delivery","Only upon the applicant's request","Within one year after issuance","Only when a term policy is sold"],correct:0,
exp:"Disclosure rules under WAC 284-23 require delivery of a Buyer's Guide and policy summary no later than policy delivery, so the consumer can evaluate the purchase during the free-look period."},

{id:341,ch:7,area:"WA",q:"Before a Washington producer may solicit or sell annuity products, the producer must complete:",
opts:["A one-time annuity training course","A securities licensing examination","An extra 24 hours of ethics CE","A federal annuity registration"],correct:0,
exp:"WAC 284-17-265 requires a one-time annuity suitability training course before selling annuities, in addition to ongoing CE. Suitability rules require matching the product to the consumer's needs."},

{id:342,ch:7,area:"WA",q:"A limitation of liability provision in a Washington life insurance policy:",
opts:["Voids the policy after any claim","Limits the payout in stated cases","Removes the policy grace period","Cancels the incontestable clause"],correct:1,
exp:"RCW 48.23.260 permits limitation of liability provisions that restrict the amount payable in specified circumstances, such as certain aviation or military deaths, when properly disclosed."},

{id:343,ch:7,area:"WA",q:"Transacting insurance in Washington without a required license is:",
opts:["Permitted if supervised","A violation subject to penalties","Allowed for one policy per year","Legal for annuities only"],correct:1,
exp:"RCW 48.17.063 prohibits unlicensed transaction of insurance. The Commissioner may impose fines and pursue enforcement, and unlicensed persons may not be paid commissions."},

{id:344,ch:7,area:"WA",q:"A Washington producer whose license has lapsed for failure to renew on time may typically:",
opts:["Reinstate within the allowed period","Never hold a license again","Keep selling for another 90 days","Transfer the license to a peer"],correct:0,
exp:"WAC 284-17-490 provides a reinstatement path for a late renewal, generally requiring outstanding CE and additional fees. The producer may not transact insurance while lapsed."},

// ══════════ LIFE INSURANCE BASICS (13 items — he scored 9/13) ══════════
{id:345,ch:4,area:"Basics",q:"The approach that measures life insurance need by calculating the insured's future earnings lost to the family is the:",
opts:["Human life value approach","Needs approach","Estate settlement approach","Capital retention approach"],correct:0,
exp:"Human life value estimates the present value of the insured's future income lost to dependents. The needs approach instead totals specific obligations like debts, income, and final expenses."},

{id:346,ch:4,area:"Basics",q:"The needs approach to determining the amount of life insurance focuses primarily on:",
opts:["The future earnings of the insured","The actual obligations of survivors","The insured's age at application","The insurer's underwriting limits"],correct:1,
exp:"The needs approach adds up what survivors will actually require — final expenses, debts, income replacement, and education — rather than valuing the insured's earning power."},

{id:347,ch:4,area:"Basics",q:"A policyowner who pays monthly rather than annually will generally pay:",
opts:["A lower total annual cost","A higher total annual cost","Exactly the same total","No policy fees"],correct:1,
exp:"More frequent premium modes cost more in total because the insurer loses investment earnings and incurs added billing expense. Annual mode is the least expensive."},

{id:348,ch:4,area:"Basics",q:"A Statement of Good Health signed at policy delivery confirms that the applicant:",
opts:["Has paid all premiums due to date","Has had no health change since applying","Understands all of the policy terms","Accepts the beneficiary designation"],correct:1,
exp:"When the initial premium was not paid with the application, the producer collects a Statement of Good Health at delivery confirming no change in health since the application date."},

{id:349,ch:4,area:"Basics",q:"One of the principal personal uses of life insurance is to provide liquidity, which means:",
opts:["Guaranteed growth of the investment","Immediate cash when the insured dies","Premiums that are tax-deductible","Built-in protection from inflation"],correct:1,
exp:"Liquidity refers to readily available cash. Death proceeds provide immediate funds to pay final expenses, taxes, and debts without forcing a sale of estate assets."},

{id:350,ch:4,area:"Basics",q:"Under an executive bonus (Section 162) plan, the employer:",
opts:["Owns the policy and its cash value","Pays a bonus covering the premium","Receives the entire death benefit","Must cover all employees equally"],correct:1,
exp:"In a Section 162 executive bonus plan the employee owns the policy and the employer pays a bonus covering the premium. The bonus is deductible to the employer and taxable to the employee."},

// ══════════ PROVISIONS, OPTIONS & RIDERS (20 items — he scored 6/20) ══════════
{id:351,ch:2,area:"Provisions",q:"A rider that provides level term coverage on the insured's spouse and children under one policy is called a:",
opts:["Family term rider","Payor benefit rider","Guaranteed insurability rider","Return of premium rider"],correct:0,
exp:"A family term rider adds term coverage on the spouse and children to the base policy, typically convertible and expiring at a stated age."},

{id:352,ch:2,area:"Provisions",q:"A children's term rider typically allows coverage to be converted to permanent insurance:",
opts:["Without evidence of insurability","Only with a new medical exam","Only if the insured parent dies","Only after the child turns 65"],correct:0,
exp:"Children's term riders generally permit conversion to a permanent policy at a specified age without proving insurability, which protects a child who has become uninsurable."},

{id:353,ch:2,area:"Provisions",q:"Under the one-year term dividend option, the policy dividend is used to:",
opts:["Purchase one-year term insurance","Reduce the next premium due","Buy paid-up whole life additions","Accumulate at interest"],correct:0,
exp:"Sometimes called the fifth dividend option, it buys one-year term insurance, often equal to the policy's cash value, increasing the total death benefit for that year."},

{id:354,ch:2,area:"Provisions",q:"A policyowner elects to apply annual dividends toward the amount owed at the next billing. This is the:",
opts:["Reduction of premium option","Paid-up additions option","Accumulation at interest option","Cash payment option"],correct:0,
exp:"The reduction of premium option applies the dividend against the next premium due, lowering the policyowner's out-of-pocket cost."},

{id:355,ch:2,area:"Provisions",q:"When a life insurance beneficiary is designated as 'my children' rather than by name, this is a designation by:",
opts:["Class","Estate","Trust","Assignment"],correct:0,
exp:"A class designation names a group instead of individuals, so the proceeds are shared by whoever qualifies at the insured's death without needing to update names."},

{id:356,ch:2,area:"Provisions",q:"Naming a minor as the direct beneficiary of a life insurance policy is generally discouraged because:",
opts:["Insurers rarely pay a minor directly","The proceeds become fully taxable","The policy would become contestable","The death benefit would be reduced"],correct:0,
exp:"Insurers generally will not pay proceeds directly to a minor, so a court-appointed guardian or trust is needed. Naming a trust or custodian avoids the delay and expense."},

// ══════════ ANNUITIES (8 items — he scored 6/8) ══════════
{id:357,ch:3,area:"Annuities",q:"A guaranteed minimum withdrawal benefit (GMWB) on an annuity provides the owner:",
opts:["A guaranteed rate of investment return","A guaranteed withdrawal despite losses","Free withdrawals in every contract year","A waiver of all surrender charges"],correct:1,
exp:"A GMWB rider guarantees the owner can withdraw a specified amount annually even if poor market performance reduces the contract value."},

{id:358,ch:3,area:"Annuities",q:"An annuity used to distribute the proceeds of a lawsuit settlement over time is best described as a:",
opts:["A structured settlement annuity","A deferred variable annuity","A group retirement annuity","An equity indexed annuity"],correct:0,
exp:"A lump sum such as a legal settlement or life insurance death benefit can be placed into an annuity to create a guaranteed income stream rather than a single payment."},

{id:359,ch:3,area:"Annuities",q:"An annuity certain differs from a life contingency option in that an annuity certain:",
opts:["Pays for a set period regardless","Pays only while the annuitant lives","Requires evidence of insurability","Has no named beneficiary at all"],correct:0,
exp:"Annuities certain (period certain or amount certain) pay for a set period or until a set amount is exhausted, whether or not the annuitant survives. Life contingency options depend on survival."},

{id:360,ch:3,area:"Annuities",q:"A pure life (straight life) annuity payout option provides:",
opts:["The largest payment, none to heirs","A refund of any unpaid principal","Payments for a 20-year minimum","Payments covering two annuitants"],correct:0,
exp:"Pure life pays the highest periodic income because payments stop at the annuitant's death with no refund or survivor benefit — the insurer keeps any unpaid balance."},

];

// Merge into the main bank if it is already loaded (questions.js must load first).
if (typeof QUESTIONS !== 'undefined') {
  QUESTIONS = QUESTIONS.concat(SUPPLEMENT);
  if (typeof window !== 'undefined') { window.QUESTIONS = QUESTIONS; }
}
if (typeof window !== 'undefined') { window.SUPPLEMENT = SUPPLEMENT; }
