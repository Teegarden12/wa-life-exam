// Questions continuation — Chapters 4-7
// This file is loaded after questions.js and pushes into the QUESTIONS array

(function(){
const Q2 = [

// ─────────────────────────────────────────
// CHAPTER 4 — Underwriting, Application & Delivery (35 questions)
// ─────────────────────────────────────────

{id:131,ch:4,q:"The PRIMARY purpose of the application for life insurance is to:",
opts:["Establish the agent's commission","Provide the insurer with information needed to evaluate the risk and make an underwriting decision","Legally bind the insurer to issue the policy","Set the premium amount before underwriting"],correct:1,
exp:"The application is the insurer's main source of information about the proposed insured's health, lifestyle, and finances. The underwriter uses this to decide whether to offer coverage and at what rate."},

{id:132,ch:4,q:"Insurable interest in a life insurance policy must exist:",
opts:["Only at the time of the insured's death","Only at the time the policy is delivered","At the time of application (policy inception)","Throughout the entire policy period"],correct:2,
exp:"Insurable interest must exist at the time of application for life insurance. It is not required to exist at the time of the claim — unlike in property insurance."},

{id:133,ch:4,q:"Which of the following relationships does NOT automatically establish insurable interest?",
opts:["A person insuring their own life","A spouse insuring their partner","An employer insuring a key employee","A creditor insuring a stranger's life for more than the debt owed"],correct:3,
exp:"A creditor has insurable interest in a debtor's life only up to the amount of the debt. Insuring a stranger for more than the debt (or with no relationship at all) does not constitute legitimate insurable interest."},

{id:134,ch:4,q:"A conditional receipt given to an applicant at the time of application with the initial premium provides coverage:",
opts:["Unconditionally from the date of application","Only after the policy is delivered","If the applicant is found insurable on the date of application or the medical exam","From the date the insurer approves the application"],correct:2,
exp:"A conditional receipt provides interim coverage backdated to the date of application — BUT only if the applicant is found to be insurable at the class and amount applied for on that date."},

{id:135,ch:4,q:"Which type of receipt gives an applicant immediate, temporary coverage from the date of application regardless of their health status?",
opts:["Conditional receipt","Binding receipt","Acknowledgment receipt","Premium receipt"],correct:1,
exp:"A binding (unconditional) receipt provides immediate temporary coverage from the application date regardless of insurability — the insurer is 'bound' to coverage while the application is being underwritten."},

{id:136,ch:4,q:"During the underwriting process, the insurer discovers that the proposed insured has a history of heart disease not disclosed on the application. The insurer's options include all of the following EXCEPT:",
opts:["Issue the policy at a higher 'rated' premium","Issue the policy with a cardiovascular exclusion rider","Decline the application","Issue the policy at standard rates and ignore the condition"],correct:3,
exp:"An insurer cannot simply ignore material health information. Upon discovering undisclosed material information, the insurer must rate, modify, or decline — not issue at standard rates as if the condition didn't exist."},

{id:137,ch:4,q:"A 'rated' life insurance policy is one that is issued:",
opts:["At a lower premium because the insured is a preferred risk","With a higher premium because the insured represents greater-than-standard mortality risk","Only to applicants who have passed a full medical exam","At the same premium as standard but with additional restrictions"],correct:1,
exp:"A rated (substandard) policy is issued to applicants with health impairments or lifestyle risks. The extra premium compensates the insurer for the increased mortality risk."},

{id:138,ch:4,q:"The agent's role during the application process is called:",
opts:["Policy underwriting","Field underwriting","Actuarial assessment","Risk classification"],correct:1,
exp:"Field underwriting is the agent's responsibility to gather accurate information, screen applicants informally, and submit a complete, accurate application — essentially the insurer's first line of risk evaluation."},

{id:139,ch:4,q:"An applicant's responses on a life insurance application are considered legally:",
opts:["Guarantees (warranties)","Representations","Mere estimates not binding on anyone","Confidential medical records protected by HIPAA exclusively"],correct:1,
exp:"Statements on a life insurance application are representations — statements believed to be true, not absolute guarantees. Misrepresentations that are material to the risk can void the policy during the contestable period."},

{id:140,ch:4,q:"The MIB Group (Medical Information Bureau) is used in underwriting to:",
opts:["Set national premium rates for all insurers","Check whether an applicant has disclosed medical or lifestyle information that was previously submitted to other member insurers","Process life insurance death claims","Regulate agent licensing across states"],correct:1,
exp:"The MIB is a cooperative database used by member insurers to flag discrepancies between what an applicant disclosed and what they disclosed on prior applications to other member companies."},

{id:141,ch:4,q:"An Attending Physician Statement (APS) is most commonly requested by the underwriter when:",
opts:["The applicant applies for less than $50,000 in coverage","The application reveals a medical history requiring more detailed information","The agent fails to complete the application","The premium has not been collected"],correct:1,
exp:"The underwriter orders an APS from the applicant's treating physician when the application discloses health conditions that require more detailed medical information than the application or paramedical exam provides."},

{id:142,ch:4,q:"Which of the following is NOT a standard underwriting factor for life insurance?",
opts:["Age and gender","Occupation","Credit score as a primary factor","Medical history and current health"],correct:2,
exp:"While financial information may be considered, credit score is not a standard or primary life insurance underwriting factor. Age, sex, health, occupation, hobbies, and tobacco use are standard underwriting considerations."},

{id:143,ch:4,q:"When delivering a life insurance policy, the agent should obtain the policyowner's signature on a delivery receipt. This receipt confirms:",
opts:["That the insurer has issued the policy","That the policyowner has received the policy and the free-look period has started","That the agent has collected the first premium","That the beneficiary has been properly notified"],correct:1,
exp:"A delivery receipt documents that the policyowner received the actual policy, which also starts the free-look period clock. It provides evidence of delivery in case of later disputes."},

{id:144,ch:4,q:"A life insurance policy must be delivered within what period to be considered properly delivered under most states' requirements?",
opts:["10 days from approval","As soon as reasonably possible — no fixed statutory deadline in most states, but prompt delivery is required","30 days from the policy issue date only","60 days from application date"],correct:1,
exp:"Most states require prompt policy delivery but don't specify an exact number of days. Best practice (and many company guidelines) require delivery within a reasonable time — often 30 days — after approval."},

{id:145,ch:4,q:"At what point does a life insurance policy become effective (assuming a conditional receipt was NOT given)?",
opts:["The date the application is signed","The date the insurer approves the application","When the policy is delivered to the policyowner AND the first premium is paid while the insured is in good health","The date the insurer mails the policy"],correct:2,
exp:"Without a receipt, coverage is not effective until the policy is delivered to the policyowner, the initial premium is paid, and the insured remains in the same health as at the time of application."},

{id:146,ch:4,q:"An agent who intentionally submits an application with incorrect information provided by the applicant to make the application look more favorable is guilty of:",
opts:["Twisting","Rebating","Fraud","Field underwriting"],correct:2,
exp:"Knowingly submitting false information on an insurance application to deceive the insurer constitutes insurance fraud — a serious violation that can result in license revocation and criminal prosecution."},

{id:147,ch:4,q:"A life insurance applicant pays the initial premium with the application. Before the policy is issued, the applicant dies in an accident. The insurer finds the applicant would have been approved at standard rates. The insurer should:",
opts:["Refund the premium only — no coverage existed","Deny the claim because the policy was never issued","Pay the death benefit because a conditional receipt was given and the applicant was insurable","Investigate further before deciding"],correct:2,
exp:"If a conditional receipt was given with the initial premium and the applicant was insurable on the application date (which they were, based on standard approval), the insurer must pay the death benefit."},

{id:148,ch:4,q:"A 'paramedical exam' in life insurance underwriting is conducted by:",
opts:["The applicant's personal physician","A licensed medical professional (nurse or paramedic) hired by the insurer","The agent on behalf of the insurer","The MIB Group"],correct:1,
exp:"A paramedical exam is performed by a licensed nurse or paramedic on the insurer's behalf to collect blood pressure, blood/urine samples, height, weight, and other physical data needed for underwriting."},

{id:149,ch:4,q:"The 'notice of information practices' required to be provided to applicants informs them of:",
opts:["The policy's premium structure","The types of information the insurer collects and how it may be used or disclosed","The agent's commission structure","The insurer's investment strategy"],correct:1,
exp:"Under model privacy regulations, insurers must provide applicants with a notice of information practices describing what personal and health information is collected, used, and potentially shared."},

{id:150,ch:4,q:"Aviation, military service, and hazardous hobbies are life insurance underwriting factors primarily because they:",
opts:["Are regulated under RCW Title 48","Increase the probability of early death and must be accurately reflected in the premium","Are automatically excluded from all policies","Reduce the face amount the insurer is willing to offer"],correct:1,
exp:"These factors increase the risk of premature death. Underwriters may rate the policy (charge extra premium), add exclusion riders, or decline coverage depending on the degree of additional risk."},

{id:151,ch:4,q:"A 'flat extra premium' is an additional premium charge stated as:",
opts:["A percentage of the base premium","A fixed dollar amount per $1,000 of coverage, added for a specific period or permanently","A reduction in the face amount","A one-time fee paid at application"],correct:1,
exp:"A flat extra premium adds a set dollar amount per $1,000 of coverage (e.g., $5 per $1,000) to compensate for additional risk — typically for occupational hazards or recent health issues expected to improve over time."},

{id:152,ch:4,q:"A 'table rating' on a life insurance policy means the insurer has assigned the applicant to a higher mortality class and charges a premium that is a certain percentage:",
opts:["Below the standard rate","Above the standard rate","The same as the standard rate but with an additional flat fee","Based solely on the face amount"],correct:1,
exp:"Table ratings (e.g., Table B, Table 4) indicate increasing degrees of substandard risk, each adding a percentage (typically 25% per table) above the standard premium to reflect greater mortality risk."},

{id:153,ch:4,q:"When a policyowner requests reinstatement of a lapsed policy, the insurer requires evidence of insurability to protect against:",
opts:["Premium rate increases","Adverse selection — people in poor health are most likely to seek reinstatement","Regulatory penalties","Agent misconduct"],correct:1,
exp:"Adverse selection is the tendency for those in worse-than-average health to disproportionately seek insurance or reinstatement. Requiring evidence of insurability prevents the insurer from reinstating coverage for people who have become uninsurable."},

{id:154,ch:4,q:"An insurance agent who accepts an application for a policy but fails to submit it to the insurer is primarily liable for:",
opts:["Negligent underwriting","Errors and omissions — the agent's delay may leave the applicant uninsured during that period","Twisting","Rebating"],correct:1,
exp:"An agent who accepts an application (and often initial premium) but fails to promptly submit it may be liable under E&O for leaving the applicant uninsured during the delay, especially if a claim arises before the policy is issued."},

{id:155,ch:4,q:"A 'pre-existing condition' in life insurance underwriting refers to:",
opts:["Any illness the insured gets after the policy is issued","A health condition that existed before the application date","A condition listed as a policy exclusion","The insured's family medical history only"],correct:1,
exp:"Pre-existing conditions are health issues present before the policy application date. Underwriters evaluate their severity, treatment, and stability to determine the appropriate rate class or exclusion."},

{id:156,ch:4,q:"The underwriting department's decision to issue a policy at a higher rate than applied for is called a:",
opts:["Declination","Counter-offer","Standard issue","Field decision"],correct:1,
exp:"When an insurer offers to issue a policy at different terms (higher premium, exclusion rider, or lower face amount) than applied for, the offer is a counter-offer. The applicant may accept or reject it."},

{id:157,ch:4,q:"Which of the following is the MOST important purpose of the agent's report submitted with an application?",
opts:["To set the agent's commission","To give the underwriter the agent's personal observations about the applicant's lifestyle, health, and habits","To request a specific policy type","To satisfy the state's CE requirements"],correct:1,
exp:"The agent's report (or agent's statement) gives the underwriter informal observations about the applicant not captured by the formal application — demeanor, apparent health, financial stability, and reason for applying."},

{id:158,ch:4,q:"Which statement about the replacement of life insurance policies in Washington is TRUE?",
opts:["Replacement is illegal in Washington","When replacing a policy, the producer must provide the applicant with a Notice Regarding Replacement","The free-look period is 5 days for replacement policies","No additional disclosure is required for replacements"],correct:1,
exp:"Washington's replacement regulations (WAC 284-23-540 et seq.) require producers to provide applicants with a Notice Regarding Replacement whenever new life insurance will replace existing coverage, enabling informed comparison."},

{id:159,ch:4,q:"A life insurance policy application that is not signed by the proposed insured is:",
opts:["Acceptable if the agent signs in place of the insured","Not valid — the proposed insured must sign the application","Valid as long as the policyowner signs","Valid if witnessed by two people"],correct:1,
exp:"The proposed insured must sign the application for the statements within to be legally binding representations. An unsigned application is incomplete and cannot form the basis of a valid policy contract."},

{id:160,ch:4,q:"An insurer declines a life insurance application. Under federal law (FCRA), if the decision was based on information from a consumer report (such as an MIB report), the insurer must:",
opts:["Explain in detail why coverage was denied","Provide the applicant with the name and address of the reporting agency so the applicant can review and dispute the information","Destroy the consumer report immediately","Offer the applicant a substandard policy instead"],correct:1,
exp:"The Fair Credit Reporting Act (FCRA) requires insurers that take adverse action based on a consumer report to disclose the source (e.g., MIB Group) so the consumer can review and correct potential errors."},

{id:161,ch:4,q:"A 'waiver and consent' form signed by the proposed insured allows the insurer to:",
opts:["Waive the premium for the first year","Access the proposed insured's medical records from healthcare providers","Waive the incontestability clause","Assign the policy to the agent"],correct:1,
exp:"Before accessing private medical records, insurers must obtain a signed authorization (waiver and consent / HIPAA authorization) from the proposed insured permitting disclosure of their medical information."},

{id:162,ch:4,q:"Which of the following BEST describes 'insurable interest' for a corporation insuring the life of a key executive?",
opts:["The corporation has no insurable interest — only spouses and relatives do","The corporation has insurable interest because the executive's death would cause a financial loss to the business","The corporation must prove a blood relationship to the executive","Insurable interest is only required if the policy is over $1 million"],correct:1,
exp:"Businesses have an insurable interest in the lives of key executives, partners, and employees whose death would cause a quantifiable financial loss — the foundation of key person and COLI (corporate-owned life insurance) coverage."},

{id:163,ch:4,q:"The primary document that describes the specific coverage, exclusions, and terms of a life insurance policy is called the:",
opts:["Application","Policy contract (declarations page + policy form)","Agent's report","Premium notice"],correct:1,
exp:"The insurance policy itself — including its declarations, policy form, riders, and the attached application — constitutes the legal contract defining coverage, exclusions, and the rights and duties of all parties."},

{id:164,ch:4,q:"If an agent makes an error on the application and the applicant does not notice it, who is primarily responsible?",
opts:["The insurer, as the agent is its authorized representative","The applicant, because they signed the application","The state insurance department","The MIB Group"],correct:0,
exp:"An agent is the legal representative of the insurer. Errors made by the agent on the application are generally attributed to the insurer, not the applicant — because the agent was acting within their apparent authority."},

{id:165,ch:4,q:"A 'foreign national' applying for life insurance in the United States may face additional underwriting scrutiny because:",
opts:["All foreign nationals are declined for life insurance","Foreign nationals may have additional risk factors related to travel, residence, and medical records accessibility","They are not required to disclose health history","Their age cannot be verified"],correct:1,
exp:"Foreign nationals present additional underwriting considerations — access to foreign medical records is limited, travel to high-risk countries elevates mortality risk, and jurisdictional issues may complicate claims. Additional documentation is typically required."},

// ─────────────────────────────────────────
// CHAPTER 5 — Taxation & Retirement Plans (35 questions)
// ─────────────────────────────────────────

{id:166,ch:5,q:"Under IRC Section 101(a)(1), life insurance death benefits paid to a beneficiary are generally:",
opts:["Fully taxable as ordinary income","Tax-free (excluded from gross income)","Subject to capital gains tax","Taxable only if the benefit exceeds $500,000"],correct:1,
exp:"Life insurance death benefits are generally excluded from the beneficiary's gross income under IRC § 101(a)(1), making them income-tax-free — one of the most significant tax advantages of life insurance."},

{id:167,ch:5,q:"A policyowner surrenders a whole life policy for its cash surrender value of $80,000. The policyowner paid $50,000 in premiums over the years. The taxable gain is:",
opts:["$80,000","$50,000","$30,000","$0 — life insurance surrenders are always tax-free"],correct:2,
exp:"On surrender, the gain (cash surrender value minus the policyowner's cost basis — i.e., total premiums paid minus dividends received) is taxable as ordinary income. $80,000 − $50,000 = $30,000 taxable gain."},

{id:168,ch:5,q:"A Modified Endowment Contract (MEC) is triggered when:",
opts:["A policy is surrendered within the first 7 years","Cumulative premiums paid in the first 7 years exceed the 7-pay limit (the net level premium for a paid-up policy)","The policy's cash value exceeds the face amount","The policy is converted from term to whole life"],correct:1,
exp:"A policy becomes a MEC if total premiums paid in the first 7 policy years exceed what would be needed to pay the policy up in 7 level payments (the 7-pay limit). Once a MEC, always a MEC."},

{id:169,ch:5,q:"Which of the following tax consequences applies to a policy classified as a Modified Endowment Contract (MEC)?",
opts:["Death benefits become taxable","Loans and withdrawals are taxed LIFO (earnings first) and subject to a 10% penalty if taken before age 59½","All premiums are non-deductible","The policy loses its death benefit entirely"],correct:1,
exp:"MECs lose the favorable tax treatment of regular life insurance policies. Loans and surrenders are taxed LIFO (gains out first as ordinary income) and subject to a 10% penalty tax before age 59½ — similar to annuity treatment."},

{id:170,ch:5,q:"Policy dividends paid to a policyowner of a participating whole life policy are generally:",
opts:["Taxable as ordinary income when received","Considered a return of premium and not taxable until dividends exceed premiums paid","Subject to capital gains tax","Deductible as a business expense"],correct:1,
exp:"Dividends on personal life insurance policies are a return of excess premiums, not taxable income — until cumulative dividends exceed total premiums paid, at which point the excess is taxable."},

{id:171,ch:5,q:"An employer pays premiums for group term life insurance providing $75,000 of coverage for an employee. The cost of coverage ABOVE $50,000 is:",
opts:["Deductible by the employer only","Taxable income to the employee based on the IRS Table I cost","Tax-free to the employee in all circumstances","Deductible by the employee"],correct:1,
exp:"Under IRC § 79, employer-provided group term life coverage up to $50,000 is tax-free to the employee. The cost of coverage above $50,000 is taxable income to the employee, calculated using IRS Table I rates."},

{id:172,ch:5,q:"A corporation owns and is the beneficiary of a life insurance policy on a key employee. The premium payments are:",
opts:["Tax-deductible to the corporation","Not tax-deductible to the corporation","Deductible to the employee","Tax-free to both the corporation and employee"],correct:1,
exp:"Corporate-owned life insurance (COLI) premiums are NOT tax-deductible. However, the death benefit is generally received income-tax-free, making COLI a tax-efficient funding vehicle for key person and executive benefit programs."},

{id:173,ch:5,q:"Which of the following life insurance uses generates personally owned life insurance where the death benefit IS income-tax-free to the beneficiary but the premiums ARE tax-deductible to the payor?",
opts:["Key person insurance","Alimony-related divorce decrees issued before 2019","Executive bonus (Section 162) plans","Buy-sell funding"],correct:1,
exp:"Under pre-2019 alimony rules (divorce agreements before January 1, 2019), life insurance premiums on the payor's life required by the divorce decree could be deductible. The death benefit remains income-tax-free."},

{id:174,ch:5,q:"A Section 162 executive bonus plan uses life insurance. The employer pays a bonus to the executive, who then pays the premium. The bonus is:",
opts:["Tax-free to the executive","Taxable income to the executive, but deductible by the employer","Deductible by the executive","Neither deductible nor taxable"],correct:1,
exp:"In a Section 162 plan, the employer's bonus payment is a tax-deductible business expense. The executive includes the bonus in taxable income, then uses it to pay policy premiums — giving the executive full ownership of the policy."},

{id:175,ch:5,q:"In a qualified retirement plan, life insurance may be included but is limited by what rule?",
opts:["Life insurance cannot be included in qualified plans","The incidental death benefit rule — the cost of pure insurance must be incidental to retirement savings","Life insurance premiums are limited to 25% of the executive's salary","Only term insurance may be included"],correct:1,
exp:"The IRS 'incidental benefit' rule limits life insurance inside qualified plans: for whole life, premiums must be less than 50% of total employer contributions; for term, less than 25% — ensuring the plan's primary purpose remains retirement savings."},

{id:176,ch:5,q:"An individual withdraws $20,000 from a non-qualified annuity at age 55. The policy has $15,000 in earnings (gain). The withdrawal is:",
opts:["All tax-free because of the exclusion ratio","$15,000 taxable ordinary income + $1,500 penalty (10% of $15,000)","$20,000 fully taxable","$15,000 taxable at capital gains rates only"],correct:1,
exp:"LIFO tax treatment means earnings come out first: $15,000 is taxable as ordinary income. The 10% early withdrawal penalty applies to the taxable portion ($15,000 × 10% = $1,500) because the owner is under age 59½."},

{id:177,ch:5,q:"A traditional IRA contribution may be tax-deductible depending on the taxpayer's:",
opts:["Age and years of employment","Income level and whether they (or their spouse) are covered by a workplace retirement plan","Number of dependents","Beneficiary designation"],correct:1,
exp:"Traditional IRA deductibility phases out at higher income levels when the taxpayer (or spouse) is covered by an employer retirement plan. If not covered by any workplace plan, contributions are generally fully deductible."},

{id:178,ch:5,q:"A Roth IRA differs from a traditional IRA primarily in that Roth contributions are:",
opts:["Made with pre-tax dollars","Made with after-tax dollars; qualified withdrawals (including gains) are tax-free","Deductible in all cases","Subject to required minimum distributions starting at age 73"],correct:1,
exp:"Roth IRA contributions are made with after-tax dollars. Qualified distributions (after age 59½ and 5-year holding period) are entirely tax-free, including earnings. Roth IRAs have no lifetime RMDs for the original owner."},

{id:179,ch:5,q:"A 403(b) Tax Sheltered Annuity (TSA) plan is available to employees of:",
opts:["All for-profit corporations","Public schools and non-profit (501(c)(3)) organizations","Federal government employees only","Self-employed individuals"],correct:1,
exp:"Section 403(b) plans are available to employees of public educational institutions and certain non-profit organizations. Federal employees use the Thrift Savings Plan (TSP); self-employed individuals use SEP-IRAs or Solo 401(k)s."},

{id:180,ch:5,q:"A SIMPLE IRA plan may be established by employers with how many employees?",
opts:["Up to 25 employees","Up to 100 employees who earned at least $5,000 in the prior year","Up to 250 employees","Any size employer"],correct:1,
exp:"SIMPLE (Savings Incentive Match Plan for Employees) IRAs are available to employers with 100 or fewer employees who received at least $5,000 in compensation in the preceding year. Both employer and employee contributions are allowed."},

{id:181,ch:5,q:"A SEP-IRA (Simplified Employee Pension) is primarily designed for:",
opts:["Employees of large corporations","Self-employed individuals and small business owners","Employees of non-profit organizations","Federal government workers"],correct:1,
exp:"SEP-IRAs allow self-employed individuals and small business owners to make large tax-deductible contributions (up to 25% of net self-employment income) with minimal administrative requirements."},

{id:182,ch:5,q:"Required Minimum Distributions (RMDs) from qualified retirement plans must generally begin by:",
opts:["Age 59½","Age 70½ for all plans regardless of current law","April 1 of the year following the year the participant turns 73 (under SECURE 2.0)","Age 65"],correct:2,
exp:"Under SECURE 2.0 (effective 2023), RMDs from qualified plans and traditional IRAs must begin by April 1 of the year following the year the participant turns 73. This age is scheduled to rise to 75 in 2033."},

{id:183,ch:5,q:"The death benefit from a corporate-owned life insurance (COLI) policy is:",
opts:["Taxable to the corporation as ordinary income in all cases","Generally income-tax-free to the corporation under IRC § 101(a)","Deductible by the corporation as a business expense","Subject to a 10% excise tax"],correct:1,
exp:"COLI death benefits are generally income-tax-free to the corporate beneficiary under IRC § 101(a)(1), provided the policy meets notice and consent requirements under IRC § 101(j) for employer-owned life insurance."},

{id:184,ch:5,q:"Life insurance proceeds received by a beneficiary as a lump sum are income-tax-free. However, if the proceeds are LEFT with the insurer under a settlement option and earn interest, the interest is:",
opts:["Also income-tax-free","Taxable as ordinary income to the beneficiary as it is credited","Taxable only if over $1,000 per year","Always tax-deferred"],correct:1,
exp:"The death benefit principal left under a settlement option remains income-tax-free, but any interest earned on the retained proceeds is taxable to the beneficiary as ordinary income when credited."},

{id:185,ch:5,q:"Which of the following BEST describes the tax treatment of cash value growth inside a whole life insurance policy?",
opts:["Taxable annually as ordinary income","Tax-deferred — not taxed until withdrawn or the policy lapses","Subject to capital gains tax at the preferential rate","Exempt from all taxes permanently"],correct:1,
exp:"Cash value growth inside a life insurance policy accumulates tax-deferred — the policyowner owes no current income tax on the growth. If the policy is surrendered and a gain results, that gain is then taxable."},

{id:186,ch:5,q:"A policyowner takes a policy loan from a whole life policy. This loan is:",
opts:["Taxable as ordinary income at the time of the loan","Tax-free at the time of the loan, as long as the policy remains in force","Deductible as a personal expense","Subject to the 10% early withdrawal penalty if taken before age 59½"],correct:1,
exp:"Policy loans are not taxable events as long as the policy stays in force. Since the loan is a debt against the policy rather than a distribution, no income tax applies when the loan is taken."},

{id:187,ch:5,q:"If a life insurance policy lapses or is surrendered while a policy loan is outstanding, and the loan plus interest creates a taxable gain, the gain is taxable as:",
opts:["Capital gains","Ordinary income","Tax-free income","A return of basis"],correct:1,
exp:"If a policy lapses with an outstanding loan, the IRS treats the loan as a distribution to the extent it exceeds the policyowner's basis. That amount is taxable as ordinary income in the year of lapse."},

{id:188,ch:5,q:"A viatical settlement involves a terminally ill person selling their life insurance policy to a third party. Tax treatment of the proceeds received by the original insured is:",
opts:["Always fully taxable as income","Generally income-tax-free if the insured is terminally ill (defined as having 24 months or less to live under IRC § 101(g))","Taxable as a capital gain","Subject to state gift tax"],correct:1,
exp:"Under IRC § 101(g), proceeds from a viatical settlement are income-tax-free if the insured has been certified as terminally ill (24-month life expectancy or less) by a physician. Chronically ill viatications may also qualify."},

{id:189,ch:5,q:"A split-dollar life insurance arrangement between an employer and employee: the employer pays the portion of the premium equal to the annual increase in cash value. The employee pays the remainder. The employer's premium payments are:",
opts:["Fully deductible by the employer in all cases","Generally not deductible, and may create taxable economic benefit to the employee depending on the arrangement type","Tax-free to both parties","Deductible up to the Section 79 $50,000 exclusion limit"],correct:1,
exp:"Split-dollar arrangements are complex and taxed under either the economic benefit or loan regime. Generally, employer premium payments are not deductible, and the employee may have taxable income based on the economic benefit received."},

{id:190,ch:5,q:"Which type of retirement plan allows the EMPLOYEE to make the investment decisions for their own account?",
opts:["Defined benefit plan","Defined contribution plan (e.g., 401(k))","Pension plan","Deferred compensation plan"],correct:1,
exp:"In a defined contribution plan (401(k), 403(b), IRA), the employee controls investment choices for their individual account. In a defined benefit (pension) plan, the employer manages investments and bears the investment risk."},

{id:191,ch:5,q:"The 'transfer for value' rule can make an otherwise tax-free life insurance death benefit TAXABLE if the policy is transferred to a third party for valuable consideration. An exception to this rule includes transfers to:",
opts:["Any charity","A partner of the insured, a partnership in which the insured is a partner, or a corporation in which the insured is a shareholder/officer","A stranger purchasing in a life settlement","A trust for estate planning purposes in all cases"],correct:1,
exp:"IRC § 101(a)(2) (transfer for value rule) makes death proceeds taxable if the policy was transferred for valuable consideration — UNLESS the transfer falls within a statutory exception, including transfers to partners, partnerships, or corporations of the insured."},

{id:192,ch:5,q:"An employer deducts premiums paid for an employee's group term life insurance as a business expense. This is allowed because:",
opts:["All insurance premiums are tax-deductible for businesses","The group term plan qualifies as a business expense under IRC § 162 as compensation paid to employees","Only premiums over $50,000 of coverage are deductible","Group life premiums must equal at least 2% of payroll to be deductible"],correct:1,
exp:"Employer-paid group term life premiums are deductible as ordinary and necessary business compensation expenses under IRC § 162, provided the plan does not discriminate in favor of key employees."},

{id:193,ch:5,q:"Which of the following describes the tax treatment of an employer's contribution to a qualified pension plan?",
opts:["Deductible when made; employee pays tax when distributed","Not deductible; employee pays tax on distributions","Deductible; all distributions are tax-free","Deductible; employer pays tax on investment gains annually"],correct:0,
exp:"Employer contributions to qualified retirement plans are deductible when made. The employee pays ordinary income tax on distributions received — the tax burden is deferred from contribution to distribution."},

{id:194,ch:5,q:"A life insurance policy purchased inside a qualified retirement plan must pass the 'incidental death benefit' test. If the policy fails this test, the excess benefit is treated as:",
opts:["A tax-free fringe benefit","A taxable distribution from the plan","An additional deductible contribution","An exempt COLI benefit"],correct:1,
exp:"If the life insurance inside a qualified plan exceeds the IRS incidental benefit limits, the excess amount is considered a taxable distribution to the participant — meaning it must be included in their gross income for that year."},

{id:195,ch:5,q:"A non-qualified deferred compensation plan is a promise by the employer to pay an executive a sum in the future. The executive's tax obligation on this promise arises:",
opts:["When the promise is made","When the amounts are actually paid or made available","When the plan is formally established","Never — deferred compensation is always tax-free"],correct:1,
exp:"Non-qualified deferred compensation is taxable to the executive when actually paid or made available (constructive receipt), not when the promise is made. The employer deduction also occurs when the executive includes the amount in income."},

{id:196,ch:5,q:"Which of the following life insurance policy arrangements is MOST likely to create a 'transfer for value' problem that could make a death benefit taxable?",
opts:["A policy transferred to a spouse incident to divorce","Assigning a policy to a partner in a business partnership","Selling a policy to an unrelated stranger on the open market (life settlement)","Naming a charity as beneficiary"],correct:2,
exp:"Selling a policy to an unrelated purchaser (life settlement investor) for valuable consideration is the classic 'transfer for value' scenario — the buyer receives a taxable death benefit (proceeds minus consideration paid) unless an exception applies."},

{id:197,ch:5,q:"Under the constructive receipt doctrine in taxation, income is taxable when:",
opts:["Actually received in cash","Made available without substantial restrictions, regardless of whether actually received","Invested in a life insurance policy","Converted to an annuity"],correct:1,
exp:"Constructive receipt means that income is taxable when it is available to the taxpayer without substantial limitation — even if not actually taken. This doctrine prevents taxpayers from indefinitely postponing tax by declining to receive money that is otherwise available."},

{id:198,ch:5,q:"Withdrawals from a Roth IRA are completely tax-free (qualified distributions) if the Roth account has been open for at least 5 years AND the owner is:",
opts:["At least age 59½, disabled, or deceased","At least age 65","Making the withdrawal for any reason","Purchasing a first home — always tax-free"],correct:0,
exp:"Roth IRA qualified distributions are tax-free when the 5-year rule is met AND the owner is age 59½ or older, disabled, or deceased. First-time home purchases up to $10,000 may also qualify."},

{id:199,ch:5,q:"A policy loan taken from a life insurance policy that is not a MEC is:",
opts:["Taxable as ordinary income when taken","Tax-free at the time of the loan as long as the policy remains in force","Subject to capital gains tax","Treated as a premature distribution under LIFO rules"],correct:1,
exp:"For non-MEC life insurance, policy loans are not income-tax events at the time taken, as long as the policy remains in force. This is a key advantage over MEC loans, which are taxed as distributions."},

{id:200,ch:5,q:"The primary tax advantage of using a cash value life insurance policy to accumulate wealth (compared to a taxable investment account) is:",
opts:["All gains are permanently excluded from income","Growth is tax-deferred, death benefit is income-tax-free, and policy loans may allow tax-free access to cash value","All income is deductible","No required minimum distributions apply in all circumstances"],correct:1,
exp:"Cash value life insurance offers a triple tax advantage: (1) tax-deferred growth, (2) income-tax-free death benefit to beneficiaries, and (3) the ability to access cash value through loans without current income taxation."},

// ─────────────────────────────────────────
// CHAPTER 6 — Ethics & Trade Practices (25 questions)
// ─────────────────────────────────────────

{id:201,ch:6,q:"Twisting in life insurance refers to an agent who:",
opts:["Sells a policy to a family member","Convinces a policyowner to replace an existing policy through misrepresentation or misleading comparisons","Shares commission with the client","Fails to submit an application promptly"],correct:1,
exp:"Twisting is the illegal practice of inducing a policyowner to lapse, surrender, or replace existing insurance through misrepresentation, incomplete information, or misleading comparisons. It is prohibited under RCW 48.30."},

{id:202,ch:6,q:"Churning differs from twisting in that churning:",
opts:["Occurs with a competitor's policies only","Involves replacing a policy within the SAME insurance company to generate a new commission","Always involves fraud","Applies only to group insurance"],correct:1,
exp:"Churning is internally-motivated twisting — replacing a policy within the same company, primarily to earn a new commission, to the detriment of the policyholder. Both are prohibited unfair trade practices."},

{id:203,ch:6,q:"Rebating is defined as:",
opts:["Returning a portion of the premium or commission to the client as an inducement to buy insurance","Reducing a premium for a preferred risk","Issuing a policy at a rated premium","Paying a death claim promptly"],correct:0,
exp:"Rebating is offering or giving any part of the premium, commission, or other consideration not specified in the policy as an inducement to purchase insurance. Rebating is illegal in Washington under RCW 48.30.150."},

{id:204,ch:6,q:"An agent sends out mailers claiming a competitor insurer is financially unstable and likely to become insolvent. This practice is BEST described as:",
opts:["Twisting","Misrepresentation — defamation of a competitor","Rebating","Unfair discrimination"],correct:1,
exp:"Making false or misleading statements about a competitor's financial condition to induce policyowners to switch companies is misrepresentation and defamation — prohibited as an unfair trade practice under Washington law."},

{id:205,ch:6,q:"'Unfair discrimination' in insurance occurs when an insurer:",
opts:["Charges different premiums based on actuarially justified risk differences","Treats two applicants with identical risk profiles differently without actuarial justification","Declines high-risk applicants","Charges higher premiums for tobacco users"],correct:1,
exp:"Unfair discrimination means treating similarly situated risks differently without actuarial justification. Charging different rates for different risks IS allowed when justified by sound actuarial principles — the key is whether there is legitimate justification."},

{id:206,ch:6,q:"Washington's Insurance Code prohibits an agent from using which of the following as a sales technique?",
opts:["Explaining how dividends work","Illustrating how cash value grows over time","Claiming that a policy is a 'savings account' or 'investment' without disclosing it is life insurance","Comparing the client's current policy premium with a competitor's premium accurately"],correct:2,
exp:"Misrepresenting a life insurance policy as a savings or investment vehicle without disclosing its insurance nature is deceptive and prohibited under Washington's unfair trade practices statutes (RCW 48.30)."},

{id:207,ch:6,q:"Under Washington law, an agent who knowingly misrepresents the terms of a policy to a prospective buyer may face:",
opts:["A warning letter only on the first offense","License suspension or revocation and fines","Only a civil lawsuit from the client","No consequences if the client ultimately benefits"],correct:1,
exp:"Under RCW 48.30 and 48.17, misrepresentation by a producer can result in disciplinary action including license suspension or revocation, fines, and cease-and-desist orders — regardless of whether the client ultimately was harmed."},

{id:208,ch:6,q:"The primary purpose of suitability requirements in life insurance sales is to ensure that:",
opts:["Agents earn the maximum commission","Products recommended are appropriate for the client's specific financial situation, needs, and objectives","All clients buy the same type of policy","Premiums are as low as possible"],correct:1,
exp:"Suitability requires producers to gather information about the client's financial situation, risk tolerance, and objectives before making recommendations, ensuring the product actually meets the client's needs rather than the agent's commission goals."},

{id:209,ch:6,q:"An agent who deposits client premium checks into a personal bank account before remitting them to the insurer is guilty of:",
opts:["Errors and omissions","Commingling and potentially misappropriation of funds — a serious violation","Rebating","Twisting"],correct:1,
exp:"Commingling client funds with an agent's personal funds is a serious violation of fiduciary duty. If the agent also uses the funds for personal purposes, it rises to misappropriation or embezzlement — grounds for license revocation."},

{id:210,ch:6,q:"A producer has a duty to disclose material information to a client. 'Material information' means information that:",
opts:["The producer finds interesting","Would likely influence the client's decision to purchase or retain a policy","Is over 5 years old","Has been verified by the state insurance department"],correct:1,
exp:"Material information is any fact that would likely influence a reasonable person's decision — such as policy limitations, exclusions, costs, risks, or competitor alternatives. Failure to disclose material information may be considered misrepresentation."},

{id:211,ch:6,q:"Which of the following is a permitted practice under Washington insurance law?",
opts:["Offering a gift worth $500 to a prospect to induce purchase of a policy","Providing an accurate comparison of two policies' premiums and benefits","Implying that a policy approved in another state has WA OIC approval","Failing to disclose a policy's surrender charges"],correct:1,
exp:"Providing an accurate, fair comparison of two policies is not only permitted but is good practice. All other options describe prohibited practices: inducements (rebating), false authority claims, and failure to disclose material terms."},

{id:212,ch:6,q:"Under the concept of agency, an insurance producer acts as an agent of the:",
opts:["State insurance department","Policyowner in all dealings","Insurer for purposes of soliciting and submitting applications","National Association of Insurance Commissioners (NAIC)"],correct:2,
exp:"For the purpose of soliciting insurance and accepting applications, a producer is the agent of the insurer — not the client. This means the insurer may be bound by the agent's representations made within the scope of their authority."},

{id:213,ch:6,q:"If an agent learns that a client's existing policy is suitable and adequate, but the agent replaces it anyway to earn a new commission, this is called:",
opts:["Ethical selling","Churning or twisting","Rebating","Field underwriting"],correct:1,
exp:"Replacing a suitable, adequate policy solely to earn a new commission — without benefit to the client — is churning or twisting, depending on whether it's within the same company (churning) or across companies (twisting)."},

{id:214,ch:6,q:"The NAIC model regulation on life insurance illustrations requires that policy illustrations given to prospective buyers must be:",
opts:["Guaranteed projections of future policy performance","Clearly labeled as non-guaranteed where applicable, signed by both the applicant and agent","Provided only after policy delivery","Approved by the state insurance department for each individual illustration"],correct:1,
exp:"NAIC illustration regulations require that non-guaranteed policy projections be clearly identified as non-guaranteed, and that both the agent and applicant sign an acknowledgment that the illustration was reviewed and understood."},

{id:215,ch:6,q:"Washington's unfair trade practices law (RCW 48.30) applies to:",
opts:["Only licensed producers, not insurers","Insurers, producers, and adjusters — all parties in the insurance transaction","Only transactions involving more than $100,000 in coverage","Federal insurance programs only"],correct:1,
exp:"RCW 48.30 broadly prohibits unfair or deceptive acts or practices by all parties in insurance transactions — insurers, producers, adjusters, and other licensees — not just agents or not just insurers."},

{id:216,ch:6,q:"An insurance agent who holds client funds in a fiduciary capacity must:",
opts:["Commingle those funds with personal funds for convenience","Keep client funds separate and remit them promptly to the insurer or client","Invest client funds in money market accounts for the agent's benefit","Hold client funds for at least 30 days before remitting"],correct:1,
exp:"Insurance agents who receive premiums or claims funds act in a fiduciary capacity — they must keep client funds strictly separate from personal funds and remit them promptly as required."},

{id:217,ch:6,q:"A producer's license can be suspended or revoked in Washington for all of the following EXCEPT:",
opts:["Misappropriation of client funds","Willful misrepresentation","Failing a CE requirement in a timely manner","Recommending a policy that resulted in a small but correctable billing error"],correct:3,
exp:"A minor, correctable administrative error is not grounds for license suspension. Misappropriation, willful misrepresentation, and CE non-compliance are all grounds for disciplinary action under RCW 48.17.530."},

{id:218,ch:6,q:"'Controlled business' in the context of producer licensing refers to insurance written:",
opts:["By agents who control a block of group accounts","Primarily on the agent's own life or the lives of close family members and business associates","By the insurer's own captive agents","For governmental entities only"],correct:1,
exp:"Controlled business is insurance written on the agent's own interests (self, family, business). Excessive controlled business as a proportion of total production may indicate the license was obtained primarily for personal use, which is prohibited."},

{id:219,ch:6,q:"Under Washington law, an insurer must provide written notice of policy cancellation at least how many days before the effective date of cancellation (for policies that have been in force more than 60 days)?",
opts:["10 days","20 days","45 days","90 days"],correct:1,
exp:"Under Washington insurance regulations, for policies in force more than 60 days, insurers generally must provide at least 20 days' advance written notice before canceling a policy — giving the insured time to find replacement coverage."},

{id:220,ch:6,q:"Which of the following would be considered an unfair claims settlement practice?",
opts:["Investigating a claim promptly","Requesting necessary documentation to verify a claim","Refusing to pay a valid claim without conducting a reasonable investigation","Explaining the basis for a denial in writing"],correct:2,
exp:"Refusing to pay or even investigate a valid claim without reasonable basis is an unfair claims settlement practice under RCW 48.30.015, which requires good-faith claim handling by insurers."},

{id:221,ch:6,q:"A new agent who is not yet licensed attempts to solicit a life insurance application. Under Washington law, this is:",
opts:["Permitted if the agent is supervised by a licensed producer","Illegal — an individual must hold a valid Washington insurance producer license to solicit, negotiate, or sell insurance","Permitted for term life only during training","Legal if the insurer gives written permission"],correct:1,
exp:"Under RCW 48.17.060, a person must hold a valid Washington producer license for the line of authority being sold before soliciting, negotiating, or selling insurance — supervision by a licensed agent does not substitute for individual licensure."},

{id:222,ch:6,q:"A producer who sells life insurance must keep records of all insurance transactions for a minimum of:",
opts:["1 year","3 years","5 years","10 years"],correct:2,
exp:"Washington requires insurance producers to maintain transaction records for at least 5 years (WAC 284-12-010). Insurers also have record-keeping obligations under RCW 48.17 to support regulatory examination."},

{id:223,ch:6,q:"An agent represents to a client that a non-guaranteed policy dividend will definitely be paid each year. This statement is:",
opts:["A permissible projection based on historical performance","A misrepresentation — dividends are not guaranteed and must be clearly disclosed as such","Required under the NAIC illustration model regulation","Permitted if the insurer has paid dividends for 50 consecutive years"],correct:1,
exp:"Dividends on participating policies are not guaranteed and depend on the insurer's actual experience. Representing them as definite or guaranteed is misrepresentation, even if the insurer has a long history of paying them."},

{id:224,ch:6,q:"The concept of 'apparent authority' in insurance agency law means that an insurer may be bound by actions of its agent that:",
opts:["Were expressly authorized in the agent's contract","Fell within the scope of authority a reasonable third party would believe the agent had, even if not expressly granted","The agent took against the insurer's instructions","Were approved by the state insurance department"],correct:1,
exp:"Apparent authority arises from the insurer's actions or representations that lead a reasonable third party (such as a client) to believe the agent had authority to act. The insurer may be bound even if the agent exceeded actual authority."},

{id:225,ch:6,q:"A Washington producer who fails to report a criminal conviction to the OIC within 30 days is subject to disciplinary action. This reporting requirement applies to convictions involving:",
opts:["Only violent crimes","Any felony or misdemeanor involving dishonesty, fraud, or a breach of trust","Only insurance-related crimes","Only crimes occurring in Washington state"],correct:1,
exp:"Under Washington law and the federal Violent Crime Control Act, insurance producers must report any criminal conviction involving dishonesty, fraud, or breach of trust to the OIC within 30 days and may also be prohibited from working in the industry."},

// ─────────────────────────────────────────
// CHAPTER 7 — Washington State Insurance Law (75 questions)
// ─────────────────────────────────────────

{id:226,ch:7,q:"The Washington Office of the Insurance Commissioner (OIC) is headed by a Commissioner who is:",
opts:["Appointed by the Governor","Elected by Washington voters","Appointed by the state Legislature","Elected by licensed insurance producers in Washington"],correct:1,
exp:"Washington's Insurance Commissioner is an elected statewide official, not a gubernatorial appointee. The Commissioner oversees the OIC and regulates the state's insurance marketplace."},

{id:227,ch:7,q:"Under RCW 48.23.030, the grace period for Washington life insurance policies is:",
opts:["10 days","20 days","One month, but not less than 30 days","60 days"],correct:2,
exp:"RCW 48.23.030 mandates a grace period of one month, but not less than 30 days, during which life insurance coverage remains in force and an overdue premium may be paid."},

{id:228,ch:7,q:"Under RCW 48.23.050, Washington life insurance policies become incontestable after how many years?",
opts:["1 year","2 years","3 years","5 years"],correct:1,
exp:"Under RCW 48.23.050, Washington life insurance policies are incontestable after they have been in force during the insured's lifetime for 2 years from the date of issue, except for non-payment of premiums."},

{id:229,ch:7,q:"The Washington free-look period for a standard new life insurance policy is:",
opts:["5 days","10 days","20 days","30 days"],correct:1,
exp:"Washington requires a minimum 10-day free-look (right to return) period for standard life insurance policies. Replacement policies require a 20-day free-look period under WAC 284-23."},

{id:230,ch:7,q:"Under Washington replacement regulations, the free-look period for a replacement life insurance policy is:",
opts:["10 days","15 days","20 days","30 days"],correct:2,
exp:"Washington's replacement regulations (WAC 284-23) require a 20-day free-look period for replacement life insurance policies — double the standard 10-day period — to ensure buyers have adequate time to compare the old and new coverage."},

{id:231,ch:7,q:"If a policyowner returns a policy during the free-look period, the insurer must refund the premium within:",
opts:["10 days","30 days","60 days","90 days"],correct:1,
exp:"Washington requires insurers to refund the full premium within 30 days of receiving a returned policy during the free-look period. A 10% penalty applies to refunds paid late (RCW 48.23.380)."},

{id:232,ch:7,q:"The Washington Life and Disability Insurance Guaranty Association (RCW 48.32A) protects policyowners if a member insurer becomes insolvent. The maximum life insurance death benefit covered per individual is:",
opts:["$100,000","$300,000","$500,000","$1,000,000"],correct:2,
exp:"The Washington Life and Disability Insurance Guaranty Association covers life insurance death benefits up to $500,000 per individual per member insurer (RCW 48.32A). This is funded by assessments on surviving member insurers."},

{id:233,ch:7,q:"The Washington Life and Disability Insurance Guaranty Association covers annuity present values up to:",
opts:["$100,000","$250,000","$500,000","$1,000,000"],correct:2,
exp:"Under RCW 48.32A, the guaranty association covers up to $500,000 in present value of annuity benefits per individual per member insurer. Governmental retirement plan annuities receive a lower limit of $100,000 per individual."},

{id:234,ch:7,q:"Which of the following types of insurers is NOT covered by the Washington Life and Disability Insurance Guaranty Association?",
opts:["Stock life insurance companies","Mutual life insurance companies","Fraternal benefit societies","Foreign (out-of-state) life insurers licensed in Washington"],correct:2,
exp:"Fraternal benefit societies are specifically excluded from the Washington Guaranty Association's coverage (RCW 48.32A). They maintain their own separate reserve and benefit guarantee mechanisms."},

{id:235,ch:7,q:"A producer's first Washington insurance license application must include:",
opts:["10 years of employment history","Passing scores from the PSI licensing examination and a completed application to the OIC","Proof of at least 40 hours of prelicensing education","A letter of recommendation from a current licensee"],correct:1,
exp:"Since July 23, 2023, Washington no longer requires prelicensing education. A first-time applicant must pass the PSI licensing exam and submit a completed application (with background check and fees) to the OIC."},

{id:236,ch:7,q:"Washington insurance producer licenses must be renewed every:",
opts:["1 year","2 years","3 years","5 years"],correct:1,
exp:"Washington insurance producer licenses have a 2-year renewal cycle. Most licenses expire on even-numbered years on the producer's birth month date. Renewal requires completing 24 CE credit hours."},

{id:237,ch:7,q:"How many continuing education (CE) credit hours must a Washington life insurance producer complete each renewal period?",
opts:["12 hours","18 hours","24 hours","30 hours"],correct:2,
exp:"Under RCW 48.17.150, Washington producers must complete 24 CE credit hours per 2-year renewal period. At least 3 of those hours must be in ethics or consumer protection topics."},

{id:238,ch:7,q:"Of the 24 required CE hours for Washington producers, how many must be in ethics or consumer protection?",
opts:["1 hour","3 hours","6 hours","10 hours"],correct:1,
exp:"Washington requires that at least 3 of the 24 required CE hours per renewal period be specifically in ethics or consumer protection subjects (RCW 48.17.150)."},

{id:239,ch:7,q:"Under Washington law, an insurance producer license application may be DENIED for which of the following reasons?",
opts:["The applicant is under age 25","The applicant has been convicted of a crime involving fraud or dishonesty","The applicant has no prior insurance experience","The applicant was born outside the United States"],correct:1,
exp:"Under RCW 48.17.090, a license application may be denied if the applicant has committed a criminal act involving fraud, dishonesty, or breach of trust — among other grounds. Age, experience, and birthplace are not denial grounds."},

{id:240,ch:7,q:"A Washington insurance producer who moves to another state must notify the OIC within:",
opts:["10 days of the move","30 days of the move","90 days of the move","Before the next renewal date only"],correct:1,
exp:"Washington producers must notify the OIC of a change in address within 30 days of the move. Failure to maintain a current address on file with the OIC can result in disciplinary action."},

{id:241,ch:7,q:"Washington's rebating statute (RCW 48.30.150) prohibits which of the following?",
opts:["Giving an accurate written comparison of two competing policies","Offering the client any valuable consideration not specified in the policy as an inducement to purchase","Charging higher premiums for smokers","Using the word 'dividend' in a participating policy illustration"],correct:1,
exp:"RCW 48.30.150 prohibits rebating — offering, paying, or allowing any rebate of premium, commission, or other valuable consideration not specified in the policy as an inducement to purchase insurance in Washington."},

{id:242,ch:7,q:"A Washington producer who wishes to sell variable life insurance products must hold both a life insurance producer license AND:",
opts:["A property and casualty license","A FINRA securities registration (Series 6 or 7)","A surplus lines license","A broker-dealer license issued by the OIC"],correct:1,
exp:"Variable life and variable annuity products are classified as securities. A producer must hold both a Washington life insurance license and appropriate FINRA securities registration (Series 6 or Series 7) to sell them."},

{id:243,ch:7,q:"Under RCW 48.17.530, a Washington producer's license may be suspended, revoked, or not renewed for all of the following EXCEPT:",
opts:["Willfully violating any insurance law","Obtaining a license through material misrepresentation","Failing to respond to a lawful OIC request for information","Recommending a policy with lower premiums than the client's current policy"],correct:3,
exp:"Recommending a lower-premium policy is not a violation — in fact, it may be a reasonable recommendation if it meets the client's needs. The other three options are grounds for license discipline under RCW 48.17.530."},

{id:244,ch:7,q:"The primary statute governing life insurance contracts in Washington is:",
opts:["RCW 48.17","RCW 48.23","RCW 48.30","RCW 48.32A"],correct:1,
exp:"RCW 48.23 (Life Insurance and Annuities) is the primary Washington statute governing life insurance contract requirements, including grace periods, incontestability, misstatement of age, nonforfeiture, and policy loans."},

{id:245,ch:7,q:"Washington's replacement regulations require a producer to provide the applicant with a 'Notice Regarding Replacement' when:",
opts:["Any life insurance policy is sold","Life insurance is sold to anyone over age 65","The new policy will replace an existing life insurance policy","The policy premium exceeds $1,000 per year"],correct:2,
exp:"Washington's replacement regulations (WAC 284-23-540) require the producer to deliver a Notice Regarding Replacement whenever a new policy is intended to replace or modify existing life insurance or annuity coverage."},

{id:246,ch:7,q:"Under Washington law, within how many days must an insurer pay or deny a life insurance claim after receiving proof of loss?",
opts:["15 days","30 days","45 days","60 days"],correct:1,
exp:"Under Washington's prompt payment law (RCW 48.18.380 and related WAC), insurers must pay or deny a claim within 30 days of receiving complete proof of loss, or provide a valid reason for any delay."},

{id:247,ch:7,q:"A Washington insurer that fails to pay a valid life insurance claim within the required period is subject to:",
opts:["No penalty if there was a reasonable investigation","Interest on the unpaid claim amount plus potential bad faith penalties","A fixed fine of $500 regardless of claim amount","Only an OIC investigation"],correct:1,
exp:"Washington's prompt payment laws require interest on delayed claim payments. In cases of bad faith claim handling, the insurer may also face additional penalties, attorney fees, and OIC disciplinary action."},

{id:248,ch:7,q:"Under Washington's Insurance Code (RCW 48.01.030), the purpose of regulating insurance is primarily to:",
opts:["Maximize insurer profits","Protect the public interest","Maximize premium tax revenue for the state","Limit the number of insurers operating in Washington"],correct:1,
exp:"The stated purpose of Washington's insurance regulation is to protect the public interest — ensuring solvency of insurers, fair treatment of policyholders, and an orderly insurance marketplace."},

{id:249,ch:7,q:"A Washington producer acting on behalf of an insurer is considered the insurer's agent. Under agency law, the insurer is responsible for the producer's actions made within the scope of their:",
opts:["Apparent and actual authority","Personal relationships only","Criminal activities","Actions taken after license expiration"],correct:0,
exp:"Under Washington agency law, the insurer (principal) is liable for acts of its producer (agent) performed within the scope of actual or apparent authority. Actions outside any authority do not bind the insurer."},

{id:250,ch:7,q:"Washington state requires that a copy of the life insurance application be:",
opts:["Filed with the OIC before the policy is issued","Attached to the policy when delivered to the policyowner","Sent to the beneficiary separately","Kept by the agent permanently"],correct:1,
exp:"Under the entire contract statute (RCW 48.23.010), the application must be attached to the policy and given to the policyowner at delivery to form part of the entire contract between the parties."},

{id:251,ch:7,q:"Under Washington law, a life insurer must provide nonforfeiture options after a policy has been in force for at least:",
opts:["6 months","1 year","3 years","5 years"],correct:2,
exp:"Washington requires nonforfeiture values to begin accruing after a life policy has been in force for 3 years (consistent with the Standard Nonforfeiture Law, RCW 48.76). After 3 years, the policyowner must be offered cash surrender, reduced paid-up, or extended term."},

{id:252,ch:7,q:"Washington's Standard Nonforfeiture Law (RCW 48.76) requires that every life insurance policy provide:",
opts:["A guaranteed dividend","Waiver of premium upon disability","Nonforfeiture values after the first 3 policy years","Automatic premium loans from the first year"],correct:2,
exp:"RCW 48.76 (Standard Nonforfeiture Law) requires that permanent life insurance policies provide nonforfeiture values — cash surrender, extended term, or reduced paid-up insurance — after the policy has been in force for the required period."},

{id:253,ch:7,q:"Under Washington law, how long does an insurer have to pay a policy loan request from a policyowner after a proper written request is received?",
opts:["Immediately — within 24 hours","Within 6 months after the request","No specific time limit — it is at the insurer's discretion","Within 30 days"],correct:1,
exp:"Under RCW 48.23.085, a life insurance policy must provide for policy loans, and the insurer may defer making the loan for up to 6 months after the policyowner's request — except for loans to pay premiums."},

{id:254,ch:7,q:"Which Washington regulation specifically governs life insurance policy illustrations?",
opts:["RCW 48.23","WAC 284-23-200 through 284-23-280","RCW 48.30","WAC 284-17-010"],correct:1,
exp:"Washington's life insurance illustration regulations (WAC 284-23-200 through 284-23-280) govern the content, format, and disclosure requirements for life insurance policy illustrations provided to prospective buyers."},

{id:255,ch:7,q:"A Washington life insurance producer's license automatically expires if the producer fails to:",
opts:["Sell at least 5 policies per year","Complete CE requirements and pay the renewal fee by the renewal date","Maintain a physical office in Washington","Report all sales to the OIC quarterly"],correct:1,
exp:"A Washington producer license expires on the renewal date if the producer has not completed the required 24 CE hours and paid the renewal fee. The license can sometimes be reinstated within a grace period with late fees."},

{id:256,ch:7,q:"Under Washington law, a producer who is also a managing general agent (MGA) must meet which additional requirement?",
opts:["Hold a surplus lines license","Hold a separate MGA license or appointment as required by OIC regulations","Maintain a $1 million surety bond","Have at least 10 years of producer experience"],correct:1,
exp:"Managing general agents in Washington must meet additional OIC requirements and hold appropriate licensing beyond the basic producer license, as governed by WAC 284 and RCW 48.17, due to their broader underwriting and distribution authority."},

{id:257,ch:7,q:"An insurer that operates in Washington without a Certificate of Authority is:",
opts:["Permitted if they have approval from their home state","Permitted for surplus lines only with OIC notification","Prohibited — all insurers must be licensed by the OIC to transact insurance in Washington","Permitted for reinsurance transactions only"],correct:2,
exp:"Under RCW 48.05.030, no insurer may transact insurance in Washington without a valid Certificate of Authority (COA) issued by the OIC. Unauthorized insurance is prohibited and subject to penalties."},

{id:258,ch:7,q:"Washington's Insurance Code defines 'transacting insurance' to include which of the following activities?",
opts:["Preparing actuarial tables in an office outside Washington","Soliciting insurance, receiving applications, and issuing policies","Publishing insurance company annual reports","Filing federal tax returns for an insurance company"],correct:1,
exp:"Under RCW 48.01.040, 'transacting insurance' includes soliciting coverage, negotiating terms, receiving applications, and issuing policies or certificates in Washington — all activities requiring a license and COA."},

{id:259,ch:7,q:"The Washington OIC has the authority to examine an insurer's books and records:",
opts:["Only when the insurer is under investigation for fraud","At any time deemed necessary to ensure solvency and legal compliance, typically at least every 5 years","Only with a court order","Only with the insurer's written consent"],correct:1,
exp:"Under RCW 48.03.010, the OIC has broad examination authority — it may examine any domestic insurer as often as necessary and must examine each domestic insurer at least once every 5 years to verify financial condition and compliance."},

{id:260,ch:7,q:"An insurer authorized to do business in Washington but domiciled in another state is called a:",
opts:["Domestic insurer","Foreign insurer","Alien insurer","Surplus lines insurer"],correct:1,
exp:"Washington classifies insurers by domicile: domestic = incorporated in WA, foreign = incorporated in another US state but licensed in WA, alien = incorporated outside the US but licensed in WA."},

{id:261,ch:7,q:"A surplus lines insurer in Washington is one that:",
opts:["Is licensed by the OIC but sells only large commercial policies","Is not licensed in Washington but may write certain risks through a licensed surplus lines broker","Is licensed in Washington exclusively for term life insurance","Is a domestic insurer that writes policies above $1 million in face amount"],correct:1,
exp:"Surplus lines insurers are not licensed (admitted) in Washington but may write risks that admitted carriers are unwilling or unable to cover, accessed through a licensed surplus lines broker under RCW 48.15."},

{id:262,ch:7,q:"Under Washington law, premium taxes paid by insurance companies are paid to:",
opts:["The federal government","The Washington state government","The National Association of Insurance Commissioners","The Washington Life and Disability Insurance Guaranty Association"],correct:1,
exp:"Washington collects premium taxes from insurers licensed to do business in the state. These taxes are paid to the Washington State Treasury and help fund the state's general fund and regulatory operations."},

{id:263,ch:7,q:"The Washington Commissioner of Insurance may issue a cease-and-desist order to:",
opts:["Any insurance company or producer engaged in unlawful acts","Courts only","Licensed producers who fail CE requirements only","Insurers only, not producers"],correct:0,
exp:"Under RCW 48.30.070, the Insurance Commissioner may issue a cease-and-desist order to any person — insurer, producer, adjuster, or other party — engaged in conduct that violates Washington's Insurance Code."},

{id:264,ch:7,q:"Under Washington law, a life insurance policy delivered in Washington must contain a provision for policy loans if the policy has a cash value of:",
opts:["At least $500","Any amount — all cash value policies must allow policy loans","At least $5,000","At least $10,000"],correct:1,
exp:"Under RCW 48.23.080–48.23.085, every life insurance policy with a cash value issued in Washington must provide for policy loans as a standard provision, regardless of the cash value amount."},

{id:265,ch:7,q:"Under Washington's insurance advertising regulations, which statement about life insurance policy advertising is TRUE?",
opts:["Insurers may advertise projected dividends as guaranteed","All advertising materials must be approved by the OIC before use","Advertising must not be false, misleading, or deceptive","Testimonials from celebrities are prohibited in all circumstances"],correct:2,
exp:"Washington's insurance advertising regulations (WAC 284-23-400 et seq.) prohibit false, misleading, or deceptive advertising. Not all materials require prior OIC approval, and testimonials are generally allowed if truthful."},

{id:266,ch:7,q:"Washington's long-term care insurance regulations require that LTC policies sold in Washington include a minimum benefit period of:",
opts:["6 months","1 year","2 years","No minimum — benefit periods are at the insurer's discretion"],correct:1,
exp:"Washington's LTC insurance regulations require a minimum benefit period of at least 12 months (1 year) for policies sold in the state, ensuring meaningful coverage duration for policyholders."},

{id:267,ch:7,q:"A person may apply for a nonresident Washington insurance producer license if they are:",
opts:["A resident of any country","A resident of another U.S. state who holds a valid producer license in their home state","Only eligible after holding a resident license in their home state for 3 years","Any person, regardless of residency"],correct:1,
exp:"Under RCW 48.17.173, nonresident producer licenses are available to persons who hold a valid license in their home state and meet Washington's licensing requirements — typically through reciprocity with the home state."},

{id:268,ch:7,q:"Washington participates in producer license reciprocity with other states that:",
opts:["Are members of the NAIC","Grant reciprocal nonresident licenses to Washington residents on substantially the same basis","Are in the Pacific Northwest region only","Share the same exam provider (PSI)"],correct:1,
exp:"Washington extends nonresident license reciprocity to states that grant Washington residents nonresident licenses on substantially the same basis (RCW 48.17.173). This simplifies multi-state licensing for producers."},

{id:269,ch:7,q:"Under Washington's Insurance Code, the maximum fine the Commissioner may impose per violation of the Insurance Code (for an individual producer) is:",
opts:["$500","$1,000","$5,000","$25,000"],correct:2,
exp:"Under RCW 48.30.030, the Washington Insurance Commissioner may impose a civil fine of up to $5,000 per violation of the Insurance Code for individual licensees. Higher fines may apply in cases involving fraud or willful misconduct."},

{id:270,ch:7,q:"Washington law requires that all life insurance policies delivered in Washington include which of the following standard provisions?",
opts:["A guaranteed insurability rider","An entire contract provision, grace period, incontestability clause, and misstatement of age provision","An automatic premium loan provision","A paid-up additions dividend option"],correct:1,
exp:"Under RCW 48.23.010–48.23.100, Washington requires all life policies to include standard provisions: entire contract, grace period, incontestability, misstatement of age, nonforfeiture options, and policy loan provisions. Riders and dividend options are not universally required."},

{id:271,ch:7,q:"A producer who sells insurance in Washington without being appointed by the insurer for whom they are acting violates:",
opts:["Federal securities law","RCW 48.17.160 — producers must be appointed by each insurer they represent","Only ethical guidelines, not actual law","The NAIC model insurance code"],correct:1,
exp:"Under RCW 48.17.160, a producer must be properly appointed by each insurer on whose behalf they solicit applications. Operating without a valid appointment is a violation of Washington's Insurance Code."},

{id:272,ch:7,q:"When an insurer terminates a producer's appointment, the insurer must notify the OIC within:",
opts:["24 hours","30 days","60 days","90 days"],correct:1,
exp:"Under Washington law, insurers must notify the OIC within 30 days of terminating a producer's appointment, and must provide the reason for termination if the termination is for cause (misconduct or violation)."},

{id:273,ch:7,q:"A Washington insurer that becomes financially impaired is subject to which OIC action?",
opts:["Immediate license revocation","Receivership proceedings under RCW 48.31 (insurance insolvency)","An automatic guaranty association takeover","Transfer of its policies to the state fund"],correct:1,
exp:"Under RCW 48.31 (Washington Insurance Rehabilitation and Liquidation Act), the OIC may petition for court-ordered receivership for an insurer that becomes financially impaired — allowing rehabilitation or liquidation to protect policyholders."},

{id:274,ch:7,q:"In Washington, an insurance policy must be written in which of the following styles to comply with readable policy requirements?",
opts:["Legal Latin only","Plain language that is understandable to a person of average intelligence","Technical actuarial language for precision","Any style as long as the OIC approves the form"],correct:1,
exp:"Washington, like most states, requires insurance policies to be written in plain language — not overly technical or legalistic — so that policyholders can understand their rights and obligations without a law degree."},

{id:275,ch:7,q:"Under Washington law, the named beneficiary of a life insurance policy has the right to:",
opts:["Change the policy's premium payment mode","Assign the policy to a third party","Receive the death benefit upon the insured's death","Surrender the policy for cash value during the insured's lifetime"],correct:2,
exp:"The primary right of a named beneficiary is to receive the death benefit upon the insured's death. Rights to change premiums, assign the policy, or surrender for cash value belong to the policyowner — not the beneficiary — unless the policy provides otherwise."},

{id:276,ch:7,q:"Washington's 'Unfair Trade Practices Act' (RCW 48.30) specifically prohibits which of the following actions by an insurer?",
opts:["Paying claims within 30 days","Offering policyowners a 10-day free-look period","Misrepresenting the terms or benefits of an insurance policy","Charging different premiums based on actuarially justified risk classes"],correct:2,
exp:"RCW 48.30.010 prohibits misrepresenting the terms, conditions, benefits, or advantages of any insurance policy — a core prohibited act under Washington's Unfair Trade Practices Act."},

{id:277,ch:7,q:"A Washington producer who allows their license to lapse by failing to renew may reinstate the license without re-examination if they reinstate within:",
opts:["30 days","6 months","1 year","2 years"],correct:2,
exp:"Washington allows producers to reinstate a lapsed license (without re-taking the state exam) within 1 year of expiration, provided they complete the required CE hours and pay a reinstatement fee. After 1 year, re-examination may be required."},

{id:278,ch:7,q:"Under Washington law, which entity has the primary authority to approve or disapprove insurance policy forms before they are sold in Washington?",
opts:["The NAIC","The Washington Office of the Insurance Commissioner","The Federal Insurance Office (FIO)","The insurer's board of directors"],correct:1,
exp:"Insurance policy forms must be filed with and approved by the Washington OIC before being used in the state. This form approval process ensures policies meet statutory requirements and are not unfair to consumers."},

{id:279,ch:7,q:"Washington's insurance law requires that a life insurance policy include an incontestability provision that protects the policyowner because it prevents the insurer from:",
opts:["Raising premiums after issue","Denying claims based on application misrepresentations after 2 years","Canceling the policy for non-payment of premiums","Paying dividends selectively"],correct:1,
exp:"The incontestability clause (required under RCW 48.23.050) bars the insurer from voiding the policy or denying claims based on misstatements in the application after the policy has been in force for 2 years during the insured's lifetime."},

{id:280,ch:7,q:"A Washington life insurer must maintain policy reserves to:",
opts:["Fund the insurer's marketing expenses","Ensure the insurer can meet future policy obligations (death claims, cash values) as they become due","Pay producer commissions","Fund OIC regulatory operations"],correct:1,
exp:"Life insurers are required to maintain statutory reserves — mathematically calculated liabilities that represent the present value of future policy benefits. Reserves ensure the insurer can pay obligations to policyholders when due."},

{id:281,ch:7,q:"Under Washington's Insurance Code, when an applicant is denied insurance based on information contained in an investigative consumer report, the insurer must:",
opts:["Provide the applicant with the full text of the report","Notify the applicant of the right to request disclosure of the nature of the information","Destroy the report immediately","File a copy of the report with the OIC"],correct:1,
exp:"Under the Fair Credit Reporting Act and Washington's consumer protection framework, applicants denied insurance based on consumer report information must be notified so they can request disclosure of the information from the reporting agency."},

{id:282,ch:7,q:"Under Washington law, a producer who sells insurance in a line for which they are not licensed is guilty of:",
opts:["An unfair trade practice only","Unauthorized insurance transactions — a violation of RCW 48.17.060","Rebating","Twisting"],correct:1,
exp:"RCW 48.17.060 prohibits any person from acting as an insurance producer in a line of authority for which they are not licensed. Selling outside one's licensed lines is an unauthorized transaction, subject to license suspension and fines."},

{id:283,ch:7,q:"Which of the following statements about Washington's insurance producer licensing is TRUE?",
opts:["Prelicensing education of 40 hours is required before taking the exam","Prelicensing education is no longer required in Washington (since July 23, 2023)","The OIC administers the licensing exam directly","There is no background check required for first-time applicants"],correct:1,
exp:"Washington eliminated its prelicensing education requirement effective July 23, 2023. Applicants must still pass the PSI state licensing exam and pass a background check, but no classroom or online prelicensing course hours are required."},

{id:284,ch:7,q:"An insurance company's Certificate of Authority in Washington may be revoked by the OIC for which of the following?",
opts:["Filing annual financial statements as required","Refusing to pay valid claims — a pattern of unfair claims practices","Complying with all state premium tax obligations","Maintaining adequate financial reserves"],correct:1,
exp:"The OIC may revoke or suspend an insurer's Certificate of Authority for a pattern of unfair claims practices under RCW 48.30, financial impairment, failure to comply with orders, or other material violations of Washington's Insurance Code."},

{id:285,ch:7,q:"When Washington requires that an insurance policy be 'filed' with the OIC, this means:",
opts:["The OIC must send a copy to the insured","The insurer submits the form to the OIC for review and approval before use","The insured must register the policy with the OIC","The producer must record the sale in the state database"],correct:1,
exp:"'Filing' a policy form with the OIC means submitting it for regulatory review. Washington uses a file-and-approve system for most life insurance forms — the OIC must approve forms before they can be sold in the state."},

{id:286,ch:7,q:"A Washington insurance producer who is convicted of a felony must:",
opts:["Automatically surrender their license immediately","Notify the OIC within 30 days of the conviction","Only notify the OIC at their next license renewal","Wait for the OIC to discover the conviction during a background check"],correct:1,
exp:"Under Washington law and the federal Violent Crime Control Act (18 U.S.C. § 1033), producers convicted of felonies or crimes involving dishonesty or breach of trust must report the conviction to the OIC within 30 days."},

{id:287,ch:7,q:"The Washington insurance commissioner's enforcement authority includes all of the following EXCEPT:",
opts:["Issuing cease-and-desist orders","Imposing civil monetary fines","Suspending or revoking licenses","Imposing criminal sentences directly"],correct:3,
exp:"The Insurance Commissioner has administrative enforcement powers: cease-and-desist orders, civil fines, and license suspension/revocation. Criminal prosecution and sentencing are handled by the courts and prosecutors — not the Commissioner directly."},

{id:288,ch:7,q:"A life insurance policy issued in Washington must provide the policyowner with the right to take a policy loan on which type of policies?",
opts:["Term life policies only","Any life insurance policy with a cash surrender value","Variable life policies only","Group life policies only"],correct:1,
exp:"Under RCW 48.23.080, any Washington life insurance policy that has a cash surrender value must provide the policyowner with the right to take a policy loan against that cash value."},

{id:289,ch:7,q:"Under Washington law, an insurer must return the premium to the beneficiary or policyowner if the insured dies DURING which period?",
opts:["The reinstatement period","The grace period — the overdue premium is deducted from, not withheld against, the death benefit","The free-look period","The incontestability period"],correct:1,
exp:"Under the grace period provision (RCW 48.23.030), if the insured dies during the grace period with an overdue premium, the insurer must pay the death benefit minus the overdue premium — not deny the claim. The coverage was in force during the grace period."},

{id:290,ch:7,q:"Washington's insurance regulatory framework is primarily based on:",
opts:["Federal law administered by the state","State law under RCW Title 48, administered by the OIC","NAIC model regulations that automatically become law in Washington","Federal ACA (Affordable Care Act) provisions"],correct:1,
exp:"Insurance regulation in Washington — as in all U.S. states — is primarily a state function, governed by RCW Title 48 and administered by the Washington OIC. Federal law applies in limited areas (Medicare, ERISA, etc.) but state law is the primary framework."},

{id:291,ch:7,q:"A Washington resident licensed as a life insurance producer wishes to also sell in Oregon. Which process applies?",
opts:["The producer must take Oregon's state exam","Oregon will issue a nonresident license based on reciprocity with Washington's license","The producer must establish a physical office in Oregon first","The OIC must grant permission before the producer can seek an out-of-state license"],correct:1,
exp:"Most states have reciprocal nonresident licensing agreements. Oregon will generally issue a nonresident license to a Washington-licensed producer without requiring the Oregon state exam, as long as Washington extends the same reciprocity to Oregon licensees."},

{id:292,ch:7,q:"Under Washington's replacement regulations, the replacing insurer must retain replacement documents for a minimum of:",
opts:["1 year","3 years","5 years","10 years"],correct:1,
exp:"Washington's replacement regulations require that both the producer and insurer retain replacement-related documents (notices, comparisons, applications) for at least 3 years or until the next OIC examination, whichever is longer."},

{id:293,ch:7,q:"Which entity is responsible for funding the Washington Life and Disability Insurance Guaranty Association when a member insurer becomes insolvent?",
opts:["The state of Washington from the general fund","The policyholders of the insolvent company","Other licensed member insurers through assessments","The federal government under ERISA"],correct:2,
exp:"The Washington Life and Disability Insurance Guaranty Association (RCW 48.32A) is funded by assessments levied on surviving member insurers — proportionate to their Washington premium volume — when a member insurer becomes insolvent."},

{id:294,ch:7,q:"Under Washington law, a life insurer must send the policyholder a written notice of premium due at least how many days before the premium due date?",
opts:["Washington does not require advance premium notices for life insurance","10 days","15 days","30 days"],correct:0,
exp:"Washington's life insurance statutes do not mandate a specific advance notice period for regular life insurance premium billing. However, notice of lapse or termination must comply with the grace period and other applicable statutes."},

{id:295,ch:7,q:"The Washington Life and Disability Insurance Guaranty Association provides coverage for policies issued by member insurers. Who is a 'member insurer'?",
opts:["Any insurer that sells life insurance anywhere in the world","Any insurer licensed to transact life or disability insurance in Washington","Only domestic (Washington-incorporated) insurers","Only insurers that have been licensed in Washington for more than 10 years"],correct:1,
exp:"Under RCW 48.32A, any insurer licensed to transact life or disability insurance in Washington (domestic or foreign) is a member insurer of the guaranty association and is subject to assessments upon insolvency of another member."},

{id:296,ch:7,q:"If a Washington producer's appointment with an insurer is terminated, the producer may immediately:",
opts:["Continue to solicit for that insurer for 90 days without a new appointment","Seek appointment with another insurer and begin representing that insurer upon issuance of the new appointment","Keep selling for the old insurer until the OIC confirms the termination","Only apply for reinstatement of the old appointment"],correct:1,
exp:"Upon termination of an appointment, a producer cannot continue representing that insurer. The producer may immediately seek appointment with a different insurer and, upon the new appointment's issuance, begin representing the new insurer."},

{id:297,ch:7,q:"Under Washington law, an insurer's policy form may be disapproved by the OIC if it:",
opts:["Contains standard mandatory provisions","Is written in plain English","Contains provisions that are ambiguous, unfair, or that fail to comply with Washington statutes","Uses a 10-day free-look period instead of a 15-day period"],correct:2,
exp:"The OIC has authority to disapprove policy forms that are ambiguous, unfair, deceptive, or fail to comply with the minimum standards set by RCW 48.23 and applicable WAC provisions. Well-written, compliant forms are approved."},

{id:298,ch:7,q:"Washington's Insurance Code (RCW 48.17.010) defines an 'insurance producer' as a person who for compensation:",
opts:["Processes insurance claims","Solicits, negotiates, or sells insurance contracts","Files premium taxes with the state","Manages an insurance company's investment portfolio"],correct:1,
exp:"Under RCW 48.17.010, an insurance producer is a person licensed to solicit applications for insurance, negotiate terms of insurance, or sell insurance contracts, acting on behalf of an insurer or an insurance applicant."},

{id:299,ch:7,q:"A Washington resident insured's life insurance claim is filed with a licensed insurer. The insurer becomes insolvent before paying the claim. The Washington Life and Disability Insurance Guaranty Association will:",
opts:["Pay nothing — policyholders bear the risk of insurer insolvency","Pay the claim up to the applicable coverage limit ($500,000 for death benefits) from assessments on member insurers","Refer the claimant to the federal government","Pay only if the policy was less than 2 years old"],correct:1,
exp:"The Guaranty Association steps in to pay covered claims (up to statutory limits) when a member insurer becomes insolvent, protecting Washington policyholders and beneficiaries from total loss due to an insurer's financial failure."},

{id:300,ch:7,q:"Under Washington law, which of the following activities requires a life insurance producer license?",
opts:["Explaining to a friend how term life insurance works in casual conversation","Soliciting a life insurance application and collecting a premium from a prospective insured","Working as a customer service representative who processes only policy renewals and does not solicit","Filing an insurer's premium tax return with the state"],correct:1,
exp:"Under RCW 48.17.060, a license is required for soliciting insurance — including presenting and explaining policies to prospects for the purpose of inducing them to apply. Administrative, claims, and customer service roles (that do not involve solicitation) generally do not require a producer license."},

];

// Push all chapter 4-7 questions into the main array
Q2.forEach(q => QUESTIONS.push(q));
})();
