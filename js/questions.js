// Washington State Life Insurance Exam Question Bank
// 300 original questions across 7 chapters
// Exam facts: 100 questions, 150 minutes, 70% passing score

const CHAPTERS = [
  { id: 1, name: "Life Insurance Basics & Policy Types", shortName: "Policy Types" },
  { id: 2, name: "Policy Provisions, Options & Riders", shortName: "Provisions & Riders" },
  { id: 3, name: "Annuities", shortName: "Annuities" },
  { id: 4, name: "Underwriting, Application & Delivery", shortName: "Underwriting" },
  { id: 5, name: "Taxation & Retirement Plans", shortName: "Taxation" },
  { id: 6, name: "Ethics & Trade Practices", shortName: "Ethics" },
  { id: 7, name: "Washington State Insurance Law", shortName: "WA State Law" },
];

const QUESTIONS = [

// ─────────────────────────────────────────
// CHAPTER 1 — Life Insurance Basics & Policy Types (40 questions)
// ─────────────────────────────────────────

{id:1,ch:1,q:"M purchases a life insurance policy that builds cash value, requires level premiums for life, and provides a guaranteed death benefit for the insured's entire lifetime. Which type of policy did M purchase?",
opts:["Term life","Whole life","Universal life","Variable term"],correct:1,
exp:"Whole life insurance features level premiums, a guaranteed lifetime death benefit, and accumulating cash value on a guaranteed basis."},

{id:2,ch:1,q:"A 30-year-old purchases a policy that provides a death benefit only if she dies within a 20-year period. No cash value builds up. What type of policy is this?",
opts:["Whole life","Universal life","Term life","Endowment"],correct:2,
exp:"Term life provides pure death protection for a specified period with no cash value accumulation. If the insured survives the term, coverage ends with no benefit paid."},

{id:3,ch:1,q:"R buys a life insurance policy where he can increase or decrease both his premium payments and death benefit (within limits) as his financial situation changes. This policy is BEST described as:",
opts:["Whole life","Term life","Universal life","Variable whole life"],correct:2,
exp:"Universal life insurance is defined by its flexibility — the owner can adjust premium amounts and death benefit levels, subject to policy minimums and sufficient cash value."},

{id:4,ch:1,q:"A policy's death benefit fluctuates based on the performance of subaccounts invested in stocks and bonds. The policyholder bears the investment risk. This policy is called:",
opts:["Universal life","Variable life","Indexed whole life","Adjustable life"],correct:1,
exp:"Variable life policies invest premiums in separate account subaccounts. The death benefit and cash value fluctuate with subaccount performance, and the owner assumes the investment risk."},

{id:5,ch:1,q:"Which of the following BEST describes the endowment feature of a life insurance policy?",
opts:["Premiums stop after a set period but coverage continues for life","The policy pays the face amount if the insured is alive at the end of the policy period","The policy's cash value can be borrowed against at any time","The death benefit increases each year by the inflation rate"],correct:1,
exp:"An endowment policy matures and pays the face amount to the living insured at the end of the endowment period. If the insured dies before maturity, the death benefit is paid to the beneficiary."},

{id:6,ch:1,q:"J wants permanent life insurance but can only afford to pay premiums for 20 years. After that, the policy should remain in force for life with no further premiums. J should purchase:",
opts:["20-year term","Whole life with a 20-pay option","Universal life","20-year endowment"],correct:1,
exp:"A 20-Pay Whole Life policy is fully paid up after 20 years of premium payments. Coverage continues for the insured's entire life with no additional premiums required."},

{id:7,ch:1,q:"The pure cost of insurance protection in a permanent life policy — the amount the insurer must charge to cover expected mortality — is called the:",
opts:["Cash value","Net single premium","Mortality charge","Reserve"],correct:2,
exp:"The mortality charge (also called cost of insurance or COI) represents the pure cost of the death benefit protection based on the insured's age, health, and the probability of death."},

{id:8,ch:1,q:"A life insurance policy that covers two lives and pays the death benefit upon the death of the FIRST of the two insureds is called a:",
opts:["Joint life policy","Survivorship life policy","Second-to-die policy","Joint and survivor policy"],correct:0,
exp:"A joint life (first-to-die) policy covers two people and pays the benefit when the first insured dies. Survivorship (second-to-die) policies pay upon the last surviving insured's death."},

{id:9,ch:1,q:"Credit life insurance is typically issued as which type of policy?",
opts:["Whole life","Variable life","Decreasing term","Level term"],correct:2,
exp:"Credit life is usually issued as decreasing term — the death benefit decreases over time to match the declining loan balance, paying off the debt if the borrower dies."},

{id:10,ch:1,q:"B holds a life insurance policy whose cash value is tied to a stock market index but is protected against losses by a floor, typically 0%. This policy is BEST described as:",
opts:["Variable universal life","Indexed universal life","Fixed whole life","Variable whole life"],correct:1,
exp:"Indexed universal life (IUL) links cash value growth to a market index (e.g., S&P 500) with a floor that prevents negative returns. The insurer, not the policyholder, holds the investment risk."},

{id:11,ch:1,q:"Under a graded death benefit life insurance policy, which of the following is TRUE?",
opts:["The death benefit increases each year until it reaches the face amount","The full death benefit is paid immediately upon policy issuance","No medical exam is required, but the full benefit is delayed for a specified period","Premiums decrease as the insured ages"],correct:2,
exp:"Graded benefit policies — often used for guaranteed-issue products — pay a limited benefit (e.g., return of premiums plus interest) if death occurs within the first 2–3 years, rising to the full benefit thereafter."},

{id:12,ch:1,q:"A family policy that provides whole life coverage on the breadwinner and convertible term coverage on the spouse and children under one contract is called a:",
opts:["Family income policy","Family maintenance policy","Family plan policy","Juvenile estate builder"],correct:2,
exp:"A family plan policy packages permanent coverage on the primary insured with term riders covering the spouse and children under a single contract and premium."},

{id:13,ch:1,q:"Which statement about term life insurance is CORRECT?",
opts:["It accumulates cash value over the term period","It is the most expensive type of life insurance per dollar of coverage","It provides coverage for a specified period only","It can never be converted to permanent insurance"],correct:2,
exp:"Term life covers the insured only for a specified period (e.g., 10, 20, 30 years). It has no cash value and is generally the least expensive way to buy a given death benefit."},

{id:14,ch:1,q:"A 'return of premium' term life policy differs from standard term life in that:",
opts:["The insurer keeps all premiums if the insured dies during the term","The insured receives all premiums paid back if they outlive the term","Premiums are waived if the insured becomes disabled","The death benefit decreases over the term period"],correct:1,
exp:"Return-of-premium (ROP) term policies refund all or a portion of premiums paid if the insured survives to the end of the term, at the cost of higher premiums than standard term."},

{id:15,ch:1,q:"Which type of life insurance is most appropriate for a business owner who wants to protect the company against the financial loss caused by the death of a key employee?",
opts:["Group term life","Key person life insurance","Buy-sell life insurance","Split-dollar life insurance"],correct:1,
exp:"Key person insurance is purchased by a business on the life of an employee whose death would cause significant financial loss. The business is both the owner and beneficiary."},

{id:16,ch:1,q:"S and her business partner use a buy-sell agreement funded with life insurance. When S dies, her life insurance proceeds will most likely be used to:",
opts:["Pay off the business's debts","Purchase S's business interest from her estate","Fund the business's operating expenses","Pay S's personal income taxes"],correct:1,
exp:"A buy-sell (business continuation) agreement funded by life insurance allows surviving partners or the business to purchase the deceased owner's interest from the estate at an agreed-upon price."},

{id:17,ch:1,q:"Under a split-dollar life insurance plan, the employer and employee typically share:",
opts:["The death benefit only","The premium costs and policy ownership rights","The underwriting risk","The policy loan obligations"],correct:1,
exp:"Split-dollar plans split both the premium costs and ownership rights (including cash value and/or death benefit) between the employer and employee according to the arrangement's terms."},

{id:18,ch:1,q:"Group life insurance is typically issued as which type of coverage?",
opts:["Whole life","Universal life","Term life","Variable life"],correct:2,
exp:"Group life insurance is almost always issued as group term life — providing death benefit coverage without cash value accumulation, renewed annually as part of the employer's benefit package."},

{id:19,ch:1,q:"A 35-year-old purchases a whole life policy. From the insurer's perspective, which factor primarily determines the initial premium?",
opts:["The insured's occupation only","The insured's age at issue","The beneficiary's age","The policy's face amount only, not the insured's age"],correct:1,
exp:"The initial premium for any life insurance policy is primarily based on the insured's age at issue — the younger the insured, the lower the mortality risk and thus the lower the premium."},

{id:20,ch:1,q:"A policy where premiums are paid only once, in a single lump sum, and the policy is immediately paid up for life, is called:",
opts:["Limited pay whole life","Universal life","Single premium whole life","Endowment at 65"],correct:2,
exp:"A single premium whole life policy is purchased with one lump-sum payment. The policy is immediately fully paid up, and the full death benefit remains in force for the insured's lifetime."},

{id:21,ch:1,q:"Under an adjustable life policy, the policyowner CAN adjust which of the following?",
opts:["The insurer's investment allocation","The premium amount and death benefit","The insurer's mortality tables","The policy's tax classification"],correct:1,
exp:"Adjustable life allows the policyowner to change the face amount, premium amount, and premium-paying period within limits, essentially shifting between term and permanent as needs change."},

{id:22,ch:1,q:"The death benefit under a variable life insurance policy must be at least:",
opts:["The current cash value","The original face amount","Twice the original face amount","Zero, if subaccounts perform poorly"],correct:1,
exp:"Variable life guarantees a minimum death benefit equal to the original face amount, even if subaccount performance declines. This minimum guarantee distinguishes it from variable universal life, which may not guarantee a minimum."},

{id:23,ch:1,q:"A juvenile life insurance policy is purchased on a child by the parent. Which statement is TRUE?",
opts:["The child is the owner and insured","The parent is typically the owner; the child is the insured","The child must consent to the policy at age 12","The policy terminates when the child reaches age 18"],correct:1,
exp:"In a juvenile life policy, the parent (or guardian) is typically the policyowner and premium payor, while the child is the insured. Ownership can be transferred to the child at a specified age."},

{id:24,ch:1,q:"A 'payor benefit' rider on a juvenile policy waives premiums if the:",
opts:["Insured child becomes disabled","Payor (typically a parent) dies or becomes totally disabled","Policy reaches its cash value limit","Insured child fails to qualify for continued coverage at age 21"],correct:1,
exp:"A payor benefit rider waives the policy's premiums if the payor (usually the parent who owns the policy) dies or becomes totally disabled before the insured child reaches a specified age."},

{id:25,ch:1,q:"Which of the following policies does NOT build cash value?",
opts:["Whole life","Universal life","20-pay life","Annual renewable term"],correct:3,
exp:"Annual renewable term (ART) is pure death protection with no savings element. It renews each year (usually at increasing premiums) but accumulates no cash value."},

{id:26,ch:1,q:"Industrial life insurance (home service life) is characterized by:",
opts:["Very large face amounts collected monthly by mail","Small face amounts with premiums collected weekly by an agent","Group coverage for industrial workers only","Variable premiums tied to the producer's index"],correct:1,
exp:"Industrial (home service) life insurance features small face amounts, with an agent collecting small weekly or monthly premiums directly from the policyowner's home."},

{id:27,ch:1,q:"T owns a whole life policy with a $100,000 face amount. T's cash value has grown to $40,000. If T surrenders the policy, T receives:",
opts:["$100,000","$40,000","$60,000","Nothing — surrender is forfeit"],correct:1,
exp:"Upon surrender, the policyowner receives the policy's net cash surrender value (cash value minus any surrender charges and outstanding loans). T would receive the $40,000 cash value (less any applicable charges)."},

{id:28,ch:1,q:"The difference between a policy's face amount and its cash value is called the:",
opts:["Net amount at risk","Reserve","Mortality charge","Dividend"],correct:0,
exp:"The net amount at risk is the portion of the death benefit the insurer must pay from its own funds (face amount minus cash value). As cash value grows, the net amount at risk decreases."},

{id:29,ch:1,q:"A life insurance policy where premiums are payable until age 65, after which the policy is paid up and coverage continues for life, is called:",
opts:["Term to 65","Life paid up at 65","Endowment at 65","20-pay whole life"],correct:1,
exp:"Life paid up at 65 (LP65) is a limited-pay whole life policy where all premiums are paid by age 65. The policy then remains in force for the insured's entire life with no additional premiums."},

{id:30,ch:1,q:"Variable universal life (VUL) insurance combines which two features?",
opts:["Level premiums and guaranteed death benefit","Flexible premiums and investment subaccounts","Indexed interest and guaranteed floor","Group coverage and individual ownership"],correct:1,
exp:"VUL offers the premium flexibility of universal life with the investment subaccount options of variable life. Both cash value and death benefit fluctuate with subaccount performance."},

{id:31,ch:1,q:"Which statement about whole life insurance is FALSE?",
opts:["It provides coverage for the insured's entire lifetime","Its premiums remain level throughout the policy","Its cash value is guaranteed","Its death benefit fluctuates based on market performance"],correct:3,
exp:"Whole life death benefits are guaranteed and do not fluctuate. Variable life products have death benefits tied to investment performance, not whole life."},

{id:32,ch:1,q:"An insurer markets a product that pays $25,000 if the insured dies from any cause and $50,000 if death results from an accident. This product is called:",
opts:["Double indemnity term","Accidental death and dismemberment policy","Double protection policy","Graded benefit policy"],correct:1,
exp:"An accidental death and dismemberment (AD&D) policy pays a scheduled benefit for accidental death or loss of limbs/sight. A policy paying double the base for accidental death often incorporates an AD&D rider."},

{id:33,ch:1,q:"A mortgage protection term policy is BEST described as a policy whose death benefit:",
opts:["Remains level for 30 years","Increases annually with inflation","Decreases over time to match a declining mortgage balance","Doubles upon accidental death"],correct:2,
exp:"Mortgage protection insurance is typically decreasing term, designed so the death benefit tracks the outstanding mortgage balance over time, paying off the loan if the borrower dies."},

{id:34,ch:1,q:"Under a modified premium whole life policy, premiums during the early years are:",
opts:["Higher than standard whole life, then level","Lower than standard whole life, then increase to a higher level","Waived entirely for the first 5 years","The same as a 20-pay whole life policy"],correct:1,
exp:"Modified premium whole life charges reduced (lower) premiums for an initial period (typically 3–5 years), then a higher level premium for the remainder of the policy, making coverage more affordable at issue."},

{id:35,ch:1,q:"A 'jumping juvenile' policy on a child typically increases the face amount by a multiple (e.g., 5x) when the insured reaches what age?",
opts:["Age 16","Age 18","Age 21","Age 25"],correct:2,
exp:"Jumping juvenile policies automatically increase the death benefit (often to 5 times the original face amount) when the insured child reaches age 21, without evidence of insurability."},

{id:36,ch:1,q:"Which of the following BEST describes the difference between participating and non-participating life insurance policies?",
opts:["Participating policies build cash value; non-participating policies do not","Participating policies pay dividends to policyowners; non-participating policies do not","Participating policies are only available through mutual companies","Non-participating policies are always term; participating policies are always permanent"],correct:1,
exp:"Participating policies may pay dividends — a refund of excess premium — to policyowners when the insurer's actual mortality, expense, and investment experience is more favorable than expected. Non-participating policies pay no dividends."},

{id:37,ch:1,q:"A group life insurance certificate is issued to:",
opts:["The employer (group policyholder)","Each individual covered employee","The state insurance department","The group's union representative"],correct:1,
exp:"In group insurance, the master policy is issued to the group (employer). Individual participants receive a certificate of insurance that summarizes their coverage under the master policy."},

{id:38,ch:1,q:"The conversion privilege in a group term life plan allows a terminating employee to:",
opts:["Keep the group coverage for 60 days at no charge","Convert to an individual policy without proof of insurability","Increase coverage upon leaving employment","Roll the death benefit into a 401(k)"],correct:1,
exp:"The conversion privilege lets a departing employee convert their group term coverage to an individual permanent policy within 31 days of termination, without providing evidence of insurability."},

{id:39,ch:1,q:"Under a group life plan, the amount of coverage provided to each employee is usually determined by:",
opts:["Each employee's personal health status","A formula based on salary, position, or years of service","The employee's own choice up to the group maximum","A medical underwriting process for each employee"],correct:1,
exp:"Group life benefit amounts are typically determined by a schedule based on objective factors (e.g., 1× annual salary or a flat amount by job class) rather than individual health underwriting."},

{id:40,ch:1,q:"Which of the following is NOT a characteristic of term life insurance?",
opts:["It provides coverage for a specific period","It has no cash value","It is the least expensive form of life insurance for a given death benefit","It can never lapse if premiums are paid"],correct:3,
exp:"Term life can and does lapse — it expires at the end of the term period, and if not renewed, coverage ends. The other three statements accurately describe term life."},

// ─────────────────────────────────────────
// CHAPTER 2 — Policy Provisions, Options & Riders (55 questions)
// ─────────────────────────────────────────

{id:41,ch:2,q:"The entire contract provision in a life insurance policy states that the policy and what else constitute the complete agreement between the parties?",
opts:["The agent's verbal promises","The initial premium receipt","The application","The insurer's rate manual"],correct:2,
exp:"The entire contract provision specifies that the policy and the attached application together form the complete contract. No verbal promises or side agreements are binding on the insurer."},

{id:42,ch:2,q:"K's life insurance policy has been in force for 3 years. The insurer discovers K misrepresented her smoking status on the application. The insurer CAN:",
opts:["Void the policy retroactively for any reason","Deny a claim based on the misrepresentation because the policy is still within the contestable period","Not contest the policy — the incontestability period has passed","Increase the premium retroactively"],correct:2,
exp:"Standard policies are incontestable after 2 years. After 3 years, the insurer cannot void the policy or deny claims based on misrepresentations, except for non-payment of premiums or (in some cases) lack of insurable interest."},

{id:43,ch:2,q:"An insurer discovers that a deceased insured misstated her age on the application, listing herself as 38 when she was actually 42. The insurer should:",
opts:["Void the policy and refund all premiums","Pay the full face amount without adjustment","Adjust the death benefit to the amount that the premium paid would have purchased at the correct age","Deny the claim entirely"],correct:2,
exp:"The misstatement of age provision requires the insurer to pay the benefit that would have been purchased for the premium paid at the insured's correct age — neither voiding the policy nor paying the full face amount."},

{id:44,ch:2,q:"A life insurance policy's grace period allows the policyowner:",
opts:["To receive a refund of all premiums paid after 30 days","To pay an overdue premium late and keep the policy in force","To convert the policy to a different type within 30 days","To increase the death benefit without underwriting"],correct:1,
exp:"The grace period (typically 30 days for life insurance) allows the policyowner to pay an overdue premium while keeping the policy in full force. If the insured dies during the grace period, the overdue premium is deducted from the death benefit."},

{id:45,ch:2,q:"A policy that has lapsed due to non-payment of premiums can be restored under the reinstatement provision. Which of the following is typically NOT required for reinstatement?",
opts:["Payment of all past-due premiums with interest","Evidence of insurability","A new free-look period","Reinstatement within the time allowed by the policy"],correct:2,
exp:"Reinstatement requires paying past-due premiums with interest and providing evidence of insurability. A new free-look period is NOT a reinstatement requirement — the original policy terms are restored."},

{id:46,ch:2,q:"Upon reinstatement of a lapsed life insurance policy, the incontestability period for the reinstated policy:",
opts:["Restarts from the reinstatement date","Continues from the original issue date","Is waived entirely as a courtesy","Extends by 1 year from the original period"],correct:0,
exp:"When a policy is reinstated, the incontestability period typically restarts from the reinstatement date, giving the insurer a new opportunity to contest misrepresentations made in the reinstatement application."},

{id:47,ch:2,q:"A beneficiary designation that the policyowner can change at any time without the beneficiary's consent is called:",
opts:["Irrevocable beneficiary","Revocable beneficiary","Contingent beneficiary","Primary beneficiary"],correct:1,
exp:"A revocable beneficiary designation can be changed by the policyowner at any time without the beneficiary's knowledge or consent. An irrevocable designation cannot be changed without the beneficiary's written consent."},

{id:48,ch:2,q:"If the primary beneficiary dies before the insured and no contingent beneficiary is named, the death benefit is paid to:",
opts:["The insured's spouse","The insured's children equally","The insured's estate","The state"],correct:2,
exp:"When no surviving beneficiary exists, the death benefit is paid to the insured's estate, where it becomes subject to probate and creditors' claims — one reason naming contingent beneficiaries is recommended."},

{id:49,ch:2,q:"Under the common disaster clause, if the insured and primary beneficiary die in the same accident and it cannot be determined who died first, the proceeds are paid:",
opts:["To the insurer to keep","As if the beneficiary predeceased the insured","Equally split between both estates","To the state unclaimed property fund"],correct:1,
exp:"The common disaster (simultaneous death) clause typically stipulates that if both die in the same event, the proceeds are distributed as if the insured survived the beneficiary, paying to contingent beneficiaries or the estate."},

{id:50,ch:2,q:"P names her minor child as beneficiary of her life insurance policy. P dies. What happens to the proceeds?",
opts:["The child receives the money directly","A court-appointed guardian or custodian receives and manages the proceeds for the child","The money is held by the insurer until the child turns 18","The proceeds go to the state guardian fund"],correct:1,
exp:"Minors cannot legally receive large sums directly. A court will appoint a guardian or the proceeds may be held under the Uniform Transfers to Minors Act until the child reaches the age of majority."},

{id:51,ch:2,q:"The automatic premium loan provision, if elected, instructs the insurer to:",
opts:["Waive the overdue premium if the insured is disabled","Borrow against the cash value to pay an overdue premium and keep the policy in force","Cancel the policy and refund the cash value","Reduce the death benefit to cover unpaid premiums"],correct:1,
exp:"With the automatic premium loan provision, the insurer automatically takes a policy loan equal to the overdue premium to prevent lapse, provided sufficient cash value exists."},

{id:52,ch:2,q:"A policyowner borrows $10,000 against a whole life policy with $25,000 cash value. The policyowner dies without repaying the loan. The beneficiary receives:",
opts:["$25,000","$15,000","$10,000","$0 — loans void the policy"],correct:1,
exp:"Outstanding policy loans plus accrued interest are deducted from the death benefit at the time of claim. The beneficiary receives $25,000 (face amount) minus $10,000 (loan) = $15,000."},

{id:53,ch:2,q:"Which nonforfeiture option gives the policyowner paid-up insurance for a REDUCED face amount?",
opts:["Extended term","Reduced paid-up insurance","Cash surrender","Automatic premium loan"],correct:1,
exp:"The reduced paid-up option provides a fully paid-up policy (no further premiums) for a reduced face amount. The extended term option keeps the original face amount but for a limited additional period."},

{id:54,ch:2,q:"Under the extended term nonforfeiture option, the insurer uses the cash value to:",
opts:["Purchase a paid-up whole life policy at a reduced face amount","Purchase a term policy for the original face amount for as long as the cash value will fund","Pay all future premiums automatically","Pay dividends to the policyowner"],correct:1,
exp:"Extended term uses the net cash value as a single premium to buy term insurance at the original face amount for as long as the cash value will fund — potentially several years or even decades."},

{id:55,ch:2,q:"The waiver of premium rider waives future premiums if the insured becomes:",
opts:["Unemployed","Totally disabled","Critically ill","Hospitalized for more than 30 days"],correct:1,
exp:"The waiver of premium rider waives all future policy premiums if the insured becomes totally disabled (as defined in the policy), typically after a 6-month waiting period."},

{id:56,ch:2,q:"An accidental death benefit (double indemnity) rider pays an additional amount if the insured dies as a result of:",
opts:["Any cause","An accidental cause only","A terminal illness","Suicide after the policy's exclusion period"],correct:1,
exp:"The accidental death benefit rider pays an additional benefit (often equal to the face amount, hence 'double indemnity') only when death results directly from an accidental injury, independent of any illness."},

{id:57,ch:2,q:"The guaranteed insurability rider allows the policyowner to purchase additional coverage at specified option dates:",
opts:["With new medical underwriting required each time","Without evidence of insurability","Only if the insured's health has improved","At the original policy's premium rate permanently"],correct:1,
exp:"The guaranteed insurability (guaranteed purchase option) rider allows the purchase of additional insurance on specified dates or events (e.g., marriage, birth of child) without proof of insurability."},

{id:58,ch:2,q:"D adds a term rider to his whole life policy to increase his total death benefit temporarily. Which is true about this rider?",
opts:["It converts automatically to whole life at the end of the term","It has the same cash value as the base policy","It provides additional death benefit for a limited period at a lower cost than adding to the base policy","It allows D to borrow against the term rider's cash value"],correct:2,
exp:"A term rider adds temporary death benefit at lower cost than increasing the permanent base policy. Term riders generally do not accumulate cash value and expire at the end of the term."},

{id:59,ch:2,q:"A long-term care (LTC) rider on a life insurance policy accelerates the death benefit to pay for long-term care expenses. If the LTC benefit is fully paid out and the insured later dies, the beneficiary receives:",
opts:["The full original death benefit","The death benefit minus the LTC payments made","Double the original death benefit","Nothing — the policy is fully surrendered"],correct:1,
exp:"LTC riders reduce the remaining death benefit by the amount of accelerated benefits paid for care. If the full LTC benefit equals the death benefit, nothing remains for the death benefit beneficiary."},

{id:60,ch:2,q:"The term 'spendthrift clause' in a life insurance policy prevents:",
opts:["The insured from borrowing against cash value","Beneficiaries from assigning or pledging their benefits to creditors before receiving them","The insurer from investing premiums in risky assets","The policyowner from changing beneficiaries more than once per year"],correct:1,
exp:"A spendthrift clause (settlement protection clause) prohibits beneficiaries from assigning their rights to the policy proceeds, protecting the proceeds from the beneficiary's creditors before distribution."},

{id:61,ch:2,q:"Under the life insurance settlement options, the 'interest only' option means:",
opts:["The insurer pays the principal and interest immediately","The insurer holds the death benefit principal and pays only the interest to the beneficiary periodically","The beneficiary earns interest on premiums during the contestable period","The policyowner pays interest on policy loans for life"],correct:1,
exp:"The interest-only settlement option leaves the principal (death benefit) with the insurer, which pays periodic interest to the beneficiary. The principal can be withdrawn later or upon the beneficiary's death."},

{id:62,ch:2,q:"Under the fixed period settlement option, proceeds are paid:",
opts:["In equal installments until the proceeds are exhausted, regardless of time","In equal installments over a specified number of years","Until the beneficiary reaches a specified age","Based on the beneficiary's life expectancy only"],correct:1,
exp:"Fixed period pays equal installments (principal plus interest) over a specified number of years chosen by the policyowner or beneficiary, regardless of whether the beneficiary is still living."},

{id:63,ch:2,q:"The life income settlement option guarantees income to the beneficiary:",
opts:["For a minimum guaranteed period only","For the beneficiary's entire lifetime","Until the principal runs out","For 20 years regardless of death"],correct:1,
exp:"Life income (straight life annuity) pays income for the beneficiary's entire lifetime. Payments stop at the beneficiary's death with no refund of any remaining principal — maximizing periodic income."},

{id:64,ch:2,q:"A 'life income with period certain' settlement option differs from straight life income in that:",
opts:["Payments are made only for the certain period, then stop","If the beneficiary dies before the period ends, payments continue to a successor","Payments are larger because there is no guarantee","It is available only to male beneficiaries"],correct:1,
exp:"Life income with period certain guarantees income for the beneficiary's lifetime AND for a minimum number of years. If the beneficiary dies before the period ends, payments continue to a named successor for the remainder of the period."},

{id:65,ch:2,q:"An insured has a policy with an exclusion for aviation. If the insured dies as a pilot of a private aircraft, the insurer will:",
opts:["Pay the full death benefit — aviation exclusions are illegal","Deny the claim entirely and return all premiums","Pay only the policy's cash value or a return of premiums","Pay the full benefit because the insured paid all premiums"],correct:2,
exp:"Aviation exclusions are legal and enforceable. When a covered peril is excluded, the insurer typically pays the policy's cash value or a return of premiums rather than the full death benefit."},

{id:66,ch:2,q:"The suicide clause in most life insurance policies states that if the insured commits suicide within the first two years, the insurer will:",
opts:["Pay the full face amount without question","Deny the claim and keep all premiums","Return all premiums paid to the beneficiary","Pay only the cash surrender value"],correct:2,
exp:"The standard suicide clause limits the insurer's liability if the insured commits suicide within the contestable period (typically 2 years) — the insurer returns premiums paid rather than paying the death benefit."},

{id:67,ch:2,q:"Which provision protects the policyowner if an agent delivers a policy with terms different from what was applied for?",
opts:["Incontestability clause","Entire contract provision","Notice of policy modification","Free-look period"],correct:3,
exp:"The free-look period (10 days standard in most states; 20 days in Washington for replacement policies) allows the policyowner to examine the delivered policy and return it for a full refund if the terms are not acceptable."},

{id:68,ch:2,q:"The ownership clause in a life insurance policy states that the policyowner has all rights under the contract EXCEPT:",
opts:["The right to change the beneficiary","The right to take a policy loan","The right to assign the policy","Rights that require the beneficiary's irrevocable consent"],correct:3,
exp:"The policyowner holds all contractual rights (naming beneficiaries, loans, assignments, surrender) EXCEPT those that are limited by an irrevocable beneficiary designation — which requires the irrevocable beneficiary's consent to change."},

{id:69,ch:2,q:"An absolute assignment of a life insurance policy transfers:",
opts:["Only the right to change the beneficiary","All ownership rights and interests in the policy to the assignee","Only the cash value to the assignee","The death benefit only, not the cash value"],correct:1,
exp:"An absolute assignment transfers all rights and ownership of the policy to the assignee. A collateral assignment transfers only certain rights (e.g., to a lender as loan security) while the original owner retains most rights."},

{id:70,ch:2,q:"A children's term rider on a life insurance policy typically converts to individual permanent insurance on each child without evidence of insurability at what event?",
opts:["When each child turns 18","When the child graduates high school","At a specified age (often 21–25) or marriage","When the rider expires"],correct:2,
exp:"Children's term riders typically provide a conversion option allowing each covered child to convert to individual permanent insurance at a specified age (commonly 21 or 25) or upon marriage, without proof of insurability."},

{id:71,ch:2,q:"The cost of living (COL) rider automatically increases the death benefit each year based on:",
opts:["The insurer's dividend performance","An index such as the Consumer Price Index (CPI)","The policyowner's income","The policy's investment subaccount returns"],correct:1,
exp:"A cost of living rider ties annual death benefit increases to a price index (typically CPI), helping the policy keep pace with inflation without requiring new applications or underwriting."},

{id:72,ch:2,q:"Under a policy's dividend options, the policyowner elects to use dividends to purchase additional paid-up insurance each year. This option is called:",
opts:["Paid-up additions","Dividend accumulation","Premium reduction","One-year term"],correct:0,
exp:"Paid-up additions (PUAs) use dividends to purchase small blocks of single-premium paid-up whole life insurance, increasing both the death benefit and cash value over time."},

{id:73,ch:2,q:"If a policyowner does not elect a dividend option, most policies pay dividends by:",
opts:["Surrendering the policy","Applying them to reduce the next premium due","Depositing them into the insurer's general account","Purchasing additional term coverage"],correct:1,
exp:"The default dividend option if no election is made is typically premium reduction — dividends are applied to offset the next premium due, reducing the out-of-pocket cost for the policyowner."},

{id:74,ch:2,q:"The accelerated death benefit (ADB) rider, also called a living benefit rider, allows a terminally ill insured to receive a portion of the death benefit while still alive. What happens to the remaining death benefit?",
opts:["It is doubled as compensation","It equals the original face amount minus the accelerated amount paid","It is forfeited to the insurer","It is converted to an annuity automatically"],correct:1,
exp:"Accelerated death benefits are paid in advance of death; the remaining death benefit paid at death equals the original face amount minus the advance payment (plus any accrued interest or discount)."},

{id:75,ch:2,q:"A 'return of cash value' rider on a whole life policy means that upon the insured's death the beneficiary receives:",
opts:["The face amount only","The face amount plus the accumulated cash value","The cash value minus outstanding loans only","Twice the face amount"],correct:1,
exp:"A return of cash value rider pays the face amount PLUS the policy's accumulated cash value at death, rather than just the face amount. This rider increases premiums because the insurer must fund both elements."},

{id:76,ch:2,q:"Which of the following best describes the 'facility of payment' clause sometimes found in industrial (home service) life policies?",
opts:["It allows the insurer to pay the proceeds to any relative or person who appears to have a claim when no named beneficiary exists","It waives the premium upon disability","It allows payments to be made monthly instead of annually","It gives the agent the right to collect premiums"],correct:0,
exp:"The facility of payment clause allows the insurer to pay a small policy's proceeds to a family member or the person who paid the burial expenses when there is no named beneficiary, without requiring formal estate administration."},

{id:77,ch:2,q:"Under which settlement option is the insurer obligated to make payments for as long as BOTH a husband and wife are alive, and then continuing for the surviving spouse's lifetime?",
opts:["Life income with period certain","Joint and survivor annuity","Fixed amount option","Interest only option"],correct:1,
exp:"A joint and survivor life income option pays while both parties are alive, then continues (often at a reduced rate) for the survivor's lifetime — commonly used for spousal income continuation."},

{id:78,ch:2,q:"A policyowner elects the fixed amount settlement option. Payments of $1,000 per month continue until:",
opts:["The beneficiary dies","A specified number of years pass","The proceeds plus interest are exhausted","The beneficiary turns age 65"],correct:2,
exp:"Fixed amount pays a specified dollar amount each period until the proceeds (principal plus interest credited) are fully exhausted. Payments stop when funds run out, regardless of whether the beneficiary is still living."},

{id:79,ch:2,q:"A life insurance policy's 'war exclusion clause' would apply if the insured died:",
opts:["In a car accident in a war zone","While serving in active military combat","In a natural disaster in a foreign country","During a robbery at home"],correct:1,
exp:"War exclusion clauses limit the insurer's liability for deaths resulting from military service in active combat zones, reducing adverse selection from military risk concentration."},

{id:80,ch:2,q:"The purpose of the incontestability clause is to protect the:",
opts:["Insurer from fraudulent claims","Policyowner and beneficiary from claim denials based on past misrepresentations after the contestable period","Agent from errors and omissions claims","State insurance department from insurer insolvency"],correct:1,
exp:"The incontestability clause protects the insured and beneficiary by preventing the insurer from voiding the policy or denying a death claim based on misstatements in the application after 2 years."},

{id:81,ch:2,q:"A 'return of premium' rider on a life insurance policy is classified as which type of benefit?",
opts:["A living benefit","An increasing term rider that equals premiums paid","A dividend option","A nonforfeiture option"],correct:1,
exp:"A return of premium rider is typically structured as an increasing term rider — the death benefit increases each year by an amount equal to the cumulative premiums paid, so that if death occurs, the beneficiary receives the face amount plus all premiums paid."},

{id:82,ch:2,q:"Under the 'ownership provision,' which of the following rights does the policyowner NOT automatically have?",
opts:["Surrender the policy for its cash value","Name or change the revocable beneficiary","Change the irrevocable beneficiary without consent","Assign the policy as collateral"],correct:2,
exp:"An irrevocable beneficiary designation removes the policyowner's unilateral right to change the beneficiary. All other listed rights remain with the owner (subject to policy terms)."},

{id:83,ch:2,q:"Which rider specifically covers situations where a policyowner becomes disabled and cannot pay premiums, AND also provides a monthly income benefit to the insured?",
opts:["Waiver of premium rider","Disability income rider","Accidental death benefit rider","Guaranteed insurability rider"],correct:1,
exp:"A disability income rider provides two benefits: it waives premiums during total disability AND pays a monthly income benefit. A standard waiver of premium rider only waives premiums without the income component."},

{id:84,ch:2,q:"L's whole life policy has lapsed. She does not elect a nonforfeiture option within the required period. The policy will automatically be placed under which option by default?",
opts:["Cash surrender","Reduced paid-up insurance","Extended term","Interest only"],correct:2,
exp:"Most states require extended term to be the automatic default nonforfeiture option if the policyowner fails to elect an option. Some policies default to reduced paid-up — the specific default is stated in the policy."},

{id:85,ch:2,q:"A 'return of premium' provision in a term life policy differs from the death benefit in that the return of premium:",
opts:["Is paid only if the insured dies during the term","Is paid to the policyowner if they survive to the end of the term","Is paid to the insurer as a penalty for early cancellation","Is only available if the policyowner converts to permanent coverage"],correct:1,
exp:"The return-of-premium feature refunds all premiums paid to a living policyowner who survives the full term period. The death benefit is paid only if the insured dies during the term."},

{id:86,ch:2,q:"A policy loan from a life insurance policy is characterized by which of the following?",
opts:["It must be repaid within 5 years or the policy lapses","It accrues interest but does not need to be repaid during the insured's lifetime","It reduces the cash value permanently, even if repaid","It requires credit approval from the insurer"],correct:1,
exp:"Policy loans accrue interest at the rate stated in the policy but do not have to be repaid during the insured's lifetime. If unpaid at death, the outstanding loan and interest reduce the death benefit. Policy loans do not require credit approval."},

{id:87,ch:2,q:"A rider that allows the policyowner to purchase additional insurance without a medical examination at specific life events such as marriage or the birth of a child is called the:",
opts:["Cost of living rider","Guaranteed insurability rider","Term conversion rider","Payor benefit rider"],correct:1,
exp:"The guaranteed insurability rider (also called guaranteed purchase option) allows the purchase of additional coverage at specified trigger events (marriage, birth of child, certain ages) without proof of insurability."},

{id:88,ch:2,q:"Under the 'facility of payment' clause, the insurer may pay a small industrial policy's proceeds to someone other than the named beneficiary. The maximum amount payable under this clause is typically:",
opts:["$500","$1,000","$5,000","Unlimited"],correct:1,
exp:"The facility of payment clause is typically limited to small amounts (commonly up to $1,000) in industrial life policies, allowing the insurer to pay a relative or person who bore funeral expenses without probate."},

{id:89,ch:2,q:"The 'aviation exclusion' rider in a life insurance policy most commonly excludes deaths involving:",
opts:["Commercial airline passengers","Military pilots during wartime","Private, non-commercial aviation activities","Any aviation-related activity"],correct:2,
exp:"Modern aviation exclusions typically apply to private or non-commercial flying activities. Deaths as a fare-paying passenger on commercial airlines are usually covered without exclusion."},

{id:90,ch:2,q:"A decreasing term rider attached to a whole life policy is commonly used to:",
opts:["Provide additional permanent coverage at lower cost","Cover a mortgage or other declining debt obligation","Increase the cash value growth rate","Fund a buy-sell agreement"],correct:1,
exp:"Decreasing term riders provide declining death benefit coverage — often matching a mortgage balance — while the base whole life policy provides permanent protection. The rider's cost decreases as the benefit declines."},

{id:91,ch:2,q:"Which nonforfeiture option preserves the original face amount of the policy but limits the duration of coverage?",
opts:["Reduced paid-up","Extended term","Cash surrender","Automatic premium loan"],correct:1,
exp:"Extended term nonforfeiture uses the cash value to buy term insurance at the original face amount for as long as the cash will fund. Reduced paid-up preserves lifetime coverage but at a reduced face amount."},

{id:92,ch:2,q:"A policyowner who selects the 'paid-up additions' dividend option will see their policy's death benefit:",
opts:["Remain level for the life of the policy","Decrease as premiums are returned","Increase over time","Be replaced entirely with term coverage"],correct:2,
exp:"Paid-up additions use dividends to purchase small amounts of paid-up whole life insurance, incrementally increasing both the death benefit and cash value over the life of the policy."},

{id:93,ch:2,q:"The term 'net cash surrender value' means the cash value:",
opts:["Plus any outstanding dividends","Minus any outstanding policy loans and surrender charges","Times the policy's dividend interest rate","Divided by the number of years the policy has been in force"],correct:1,
exp:"Net cash surrender value = gross cash value minus any outstanding policy loans, loan interest, and applicable surrender charges. This is the amount actually paid to the policyowner upon surrender."},

{id:94,ch:2,q:"A life insurance policy application asks whether the proposed insured has had any other insurance applications declined in the last 5 years. This question is important because a prior declination:",
opts:["Is irrelevant — every applicant gets a fresh start","May indicate a health or risk factor the underwriter needs to evaluate","Automatically results in denial","Is illegal to ask under HIPAA"],correct:1,
exp:"Prior insurance application declines may signal health or lifestyle risks that the underwriter needs to consider. The information is material to the underwriting decision and must be disclosed honestly."},

{id:95,ch:2,q:"A policy may provide a 'misstatement of sex' adjustment similar to the misstatement of age provision. If a female insured was mistakenly listed as male, the insurer would:",
opts:["Void the policy for fraud","Pay the benefit that the premium paid would have purchased for a female at the correct age","Increase the death benefit to compensate","Keep all premiums and deny the claim"],correct:1,
exp:"Misstatement of sex (like misstatement of age) requires the insurer to adjust the benefit to what the actual premium paid would have purchased based on the correct demographic information."},

// ─────────────────────────────────────────
// CHAPTER 3 — Annuities (35 questions)
// ─────────────────────────────────────────

{id:96,ch:3,q:"An annuity is BEST described as a contract that:",
opts:["Provides a death benefit to beneficiaries","Accumulates funds and then distributes them as a stream of income, often for life","Covers the annuitant's medical expenses","Insures the annuitant's property against loss"],correct:1,
exp:"An annuity's primary function is income distribution — converting a lump sum or series of payments into a periodic income stream, often guaranteed for the annuitant's lifetime."},

{id:97,ch:3,q:"The period during which the policyowner pays into an annuity and the funds accumulate is called the:",
opts:["Distribution phase","Annuitization phase","Accumulation phase","Settlement phase"],correct:2,
exp:"The accumulation phase is the period before annuitization during which premiums are paid and funds grow tax-deferred. The annuitization (distribution) phase begins when income payments start."},

{id:98,ch:3,q:"An immediate annuity differs from a deferred annuity in that income payments under an immediate annuity begin:",
opts:["After a 10-year accumulation period","After one payment period (typically within one year of purchase)","Only after the annuitant reaches age 70½","Upon the annuitant's death"],correct:1,
exp:"An immediate annuity converts a lump-sum purchase payment directly into income payments that begin within one payment period (one month for monthly payments; one year for annual payments)."},

{id:99,ch:3,q:"Under a fixed annuity, the insurance company guarantees:",
opts:["The annuitant's investment in subaccounts","A minimum rate of interest and the principal","Returns linked to a market index with no floor","Variable income payments tied to market performance"],correct:1,
exp:"A fixed annuity guarantees the principal and a minimum credited interest rate. The insurer bears all investment risk, making it suitable for conservative investors seeking predictable accumulation."},

{id:100,ch:3,q:"The primary difference between a fixed annuity and a variable annuity is that in a variable annuity:",
opts:["The insurer guarantees the principal","The annuitant bears the investment risk through subaccount performance","Premiums are tax-deductible","No surrender charges apply"],correct:1,
exp:"Variable annuities invest premiums in separate account subaccounts chosen by the owner. The annuitant bears the investment risk — account values can go up or down based on subaccount performance."},

{id:101,ch:3,q:"An indexed annuity credits interest based on a market index but protects against negative returns through a:",
opts:["Participation rate ceiling","Floor (typically 0%)","Stop-loss provision","Mortality and expense charge"],correct:1,
exp:"Indexed annuities use a floor — typically 0% — that prevents the account value from declining even if the linked index has a negative return, while capping or limiting upside participation."},

{id:102,ch:3,q:"F purchases a straight life annuity. F receives monthly income payments. F dies after receiving payments for only 2 years. What does F's beneficiary receive?",
opts:["Payments continue for the remainder of F's life expectancy","All remaining unpaid payments in a lump sum","Nothing — straight life income stops at the annuitant's death","The original principal minus payments received"],correct:3,
exp:"A straight life (pure life) annuity provides income for the annuitant's entire life only. When the annuitant dies, all payments cease — there is no refund and no continuation to a beneficiary."},

{id:103,ch:3,q:"To avoid the 'annuity mortality risk' of dying too soon after annuitization, an annuitant might choose which settlement option?",
opts:["Straight life","Life with period certain","Fixed amount","Interest only"],correct:1,
exp:"Life with period certain guarantees payments for at least a minimum number of years (e.g., 10 or 20), ensuring the annuitant or a beneficiary receives a minimum total benefit even if the annuitant dies early."},

{id:104,ch:3,q:"A 'joint and survivor' annuity settlement option is commonly used by:",
opts:["Single individuals seeking maximum monthly income","Married couples wanting income to continue for the surviving spouse","Business partners funding key person coverage","Employers funding pension plans for a single executive"],correct:1,
exp:"Joint and survivor annuities continue income — often at a reduced percentage — for the surviving annuitant after one dies. They are frequently used in retirement planning for married couples."},

{id:105,ch:3,q:"Which annuity payout option provides the HIGHEST monthly income payment?",
opts:["Life with 20-year period certain","Joint and 100% survivor","Straight life (pure life)","Life with cash refund"],correct:2,
exp:"Straight life (pure life) pays the highest monthly income because there are no guarantees — payments stop at death with nothing returned. Options that guarantee minimum payments or survivor income pay lower monthly amounts."},

{id:106,ch:3,q:"Under a 'cash refund' annuity, if the annuitant dies before receiving payments equal to the purchase price, the beneficiary receives:",
opts:["Nothing","The balance in a lump sum","Continued monthly payments for life","A percentage of the remaining principal"],correct:1,
exp:"A cash refund annuity guarantees the annuitant (or beneficiary) will receive at least the original purchase price. If the annuitant dies early, the beneficiary receives the difference as a lump-sum cash payment."},

{id:107,ch:3,q:"An annuity that is funded with a series of periodic premium payments rather than one lump sum is called a:",
opts:["Single premium deferred annuity (SPDA)","Flexible premium deferred annuity (FPDA)","Immediate annuity","Fixed period annuity"],correct:1,
exp:"A flexible premium deferred annuity (FPDA) allows the owner to make periodic contributions of varying amounts over the accumulation period, unlike a single premium annuity funded with one lump sum."},

{id:108,ch:3,q:"The 'accumulation unit' in a variable annuity is used during the:",
opts:["Annuitization phase","Accumulation phase","Distribution phase only","Settlement phase"],correct:1,
exp:"During the accumulation phase of a variable annuity, the owner's account is tracked in accumulation units — the number of units held multiplied by the current unit value equals the account value."},

{id:109,ch:3,q:"When a variable annuity begins making income payments, accumulation units are converted to:",
opts:["Fixed income payments","Annuity units","Separate account shares","Policy reserve credits"],correct:1,
exp:"At annuitization, accumulation units convert to annuity units. The number of annuity units is fixed, but each payment's dollar amount varies based on the unit's current value — which fluctuates with subaccount performance."},

{id:110,ch:3,q:"An annuity that allows the owner to transfer funds between subaccounts without paying taxes on the gains at the time of transfer benefits from:",
opts:["FIFO tax treatment","Tax-deferred growth within the annuity","Ordinary income treatment on all gains","Step-up in basis at death"],correct:1,
exp:"Variable annuity subaccount exchanges are not taxable events — gains are tax-deferred until withdrawal. This allows the owner to reallocate without triggering current income tax."},

{id:111,ch:3,q:"Withdrawals from a non-qualified deferred annuity before age 59½ are subject to:",
opts:["A 5% federal penalty and ordinary income tax on gains","A 10% federal penalty tax on the taxable portion plus ordinary income tax","Capital gains tax only","No tax because annuities are always tax-free"],correct:1,
exp:"Early withdrawals from non-qualified annuities before age 59½ trigger a 10% federal penalty tax on the taxable portion (earnings) in addition to ordinary income tax on those earnings."},

{id:112,ch:3,q:"For tax purposes, withdrawals from a non-qualified annuity are treated on a 'last in, first out' (LIFO) basis, meaning:",
opts:["The first money withdrawn is considered a return of principal","Earnings are considered withdrawn before principal, making early withdrawals fully taxable","Withdrawals are tax-free until the principal is fully recovered","All withdrawals are treated as capital gains"],correct:1,
exp:"Under LIFO tax treatment for non-qualified annuities, earnings come out first — making withdrawals fully taxable as ordinary income until all gains are distributed, then remaining withdrawals are tax-free return of basis."},

{id:113,ch:3,q:"The 'exclusion ratio' for an annuity determines what portion of each annuity payment is:",
opts:["Taxable as ordinary income","A tax-free return of the annuitant's investment (basis)","Subject to capital gains tax","Deductible as a business expense"],correct:1,
exp:"The exclusion ratio = investment in contract ÷ expected return. Each payment's non-taxable portion (return of basis) is determined by this ratio; the remainder is taxable ordinary income."},

{id:114,ch:3,q:"An annuity owner dies during the accumulation phase. Under the required minimum distribution (RMD) rules, the non-spouse beneficiary must generally:",
opts:["Annuitize within 1 year","Withdraw the entire balance within 5 years (or receive distributions over their lifetime if elected within 1 year)","Pay taxes and penalties equal to 50% of the balance","Leave the funds untouched for 10 more years"],correct:1,
exp:"Non-spouse beneficiaries of an annuity owner who dies during accumulation must generally distribute the entire account within 5 years, or begin lifetime distributions within one year of the owner's death under IRS rules."},

{id:115,ch:3,q:"A 'market value adjustment' (MVA) feature on an annuity means that a surrender may result in:",
opts:["Always receiving more than the account value","An adjusted surrender value based on current interest rates relative to rates at purchase — could be positive or negative","Tax-free treatment of all surrendered gains","Automatic conversion to a variable annuity"],correct:1,
exp:"An MVA adjusts the surrender value up or down based on current vs. original interest rates. If rates rose, MVA may reduce the surrender value; if rates fell, MVA may increase it."},

{id:116,ch:3,q:"A 'period certain' annuity with no life contingency guarantees payments for a specific number of years. If the annuitant dies before the period ends:",
opts:["All remaining payments are forfeited","Payments continue to the named beneficiary for the remainder of the period","The insurer keeps the remaining funds","A lump sum is paid equal to remaining payments discounted to present value"],correct:1,
exp:"A period certain annuity (no life contingency) simply pays for the specified period. If the annuitant dies, payments continue to the named beneficiary until the period ends."},

{id:117,ch:3,q:"Which of the following is NOT a characteristic of a variable annuity?",
opts:["Separate account investing","Risk borne by the contract owner","Guaranteed minimum interest rate on the separate account","Annuity units that fluctuate in value"],correct:2,
exp:"Variable annuity separate accounts do NOT offer a guaranteed minimum interest rate — that is a feature of fixed annuities. Variable subaccount values fluctuate based on market performance."},

{id:118,ch:3,q:"The 'surrender charge period' on a deferred annuity is a period during which:",
opts:["No interest is credited to the account","Withdrawals above a free-withdrawal allowance may incur a percentage penalty","The annuitant cannot elect annuitization","All withdrawals are tax-free"],correct:1,
exp:"Surrender charges apply during a specified period (commonly 5–10 years) to discourage early withdrawals. Most contracts allow a free withdrawal of 10% of account value annually without charge."},

{id:119,ch:3,q:"G purchases a qualified annuity inside her employer's 403(b) plan. Compared to a non-qualified annuity, her contributions to this annuity are:",
opts:["Made with after-tax dollars","Made with pre-tax dollars and reduce current taxable income","Taxed at capital gains rates upon withdrawal","Not subject to required minimum distributions"],correct:1,
exp:"Qualified annuities (inside plans like IRAs, 403(b)s, 401(k)s) are funded with pre-tax dollars — contributions reduce current taxable income. All withdrawals are fully taxable as ordinary income."},

{id:120,ch:3,q:"A 'longevity annuity' (also called a deferred income annuity or DIA) is designed primarily to:",
opts:["Provide immediate income starting within one year of purchase","Begin income payments at a future date (e.g., age 80 or 85), protecting against outliving assets","Provide death benefit protection during the accumulation phase","Replace term life insurance during retirement"],correct:1,
exp:"Longevity annuities are purchased early in retirement but defer income until an advanced age (e.g., 80–85), providing protection against the risk of outliving savings in very old age at a relatively low cost."},

{id:121,ch:3,q:"Which of the following BEST describes the 'mortality and expense' (M&E) charge in a variable annuity?",
opts:["A tax charged by the IRS on variable annuity gains","A fee the insurer charges for the mortality guarantee and administrative expenses","A penalty for early surrender of the annuity","A commission paid to the agent at the time of sale"],correct:1,
exp:"The M&E charge is an annual fee (typically 0.5–1.5% of assets) deducted from variable annuity subaccounts to cover the insurer's mortality guarantees, death benefit, and administrative costs."},

{id:122,ch:3,q:"An annuitant selects the 'installment refund' option. This option guarantees that:",
opts:["The annuitant receives payments for life only","If the annuitant dies early, installment payments continue to the beneficiary until total payments equal the original purchase price","The insurer refunds all payments if the annuitant outlives expectations","Payments increase each year by 3% for inflation"],correct:1,
exp:"The installment refund option continues periodic payments to a beneficiary after the annuitant's death until the total paid equals the original purchase price — the refund is in installments rather than a cash lump sum."},

{id:123,ch:3,q:"A variable annuity must be sold with a prospectus because it is classified as both an insurance product AND a:",
opts:["Savings account","Security under federal law","Banking product","Real estate investment"],correct:1,
exp:"Variable annuities are classified as securities under federal law because premiums are invested in separate account subaccounts with market risk. Selling variable annuities requires both an insurance license and FINRA securities registration (Series 6 or 7)."},

{id:124,ch:3,q:"The 'free corridor' or 'free withdrawal' provision in most deferred annuity contracts allows the owner to withdraw up to what percentage of account value per year without a surrender charge?",
opts:["5%","10%","15%","25%"],correct:1,
exp:"Most deferred annuity contracts allow annual free withdrawals of up to 10% of the account value without incurring surrender charges, providing liquidity while the surrender charge period is still in effect."},

{id:125,ch:3,q:"An annuity owner who exchanges one annuity contract for another without triggering current income taxes is using a:",
opts:["1035 exchange","Rollover","Annuitization election","Surrender and reinvestment"],correct:0,
exp:"IRC Section 1035 allows a tax-free exchange of one annuity contract for another. The owner must not receive the funds directly — the exchange must be between carriers. Gains are not taxed until withdrawals from the new contract."},

{id:126,ch:3,q:"In the context of annuities, 'annuitant' refers to the person:",
opts:["Who owns the annuity contract","Whose life expectancy is used to calculate payments","Who receives the death benefit","Who sells the annuity"],correct:1,
exp:"The annuitant is the measuring life — the person whose age and life expectancy determine the annuity payment amounts. The annuitant may or may not be the same person as the contract owner."},

{id:127,ch:3,q:"Which of the following annuity features would be MOST appropriate for an investor worried about outliving their money, who also wants their spouse covered after death?",
opts:["Straight life annuity","Joint and 100% survivor annuity","Fixed period annuity — 10 years","Cash refund annuity"],correct:1,
exp:"A joint and 100% survivor annuity continues the same payment amount to the surviving spouse after the first annuitant dies, providing the strongest protection against both outliving assets and spousal income loss."},

{id:128,ch:3,q:"Which of the following correctly describes how interest is taxed inside a deferred annuity during the accumulation phase?",
opts:["Interest is taxed each year as it is credited","Interest grows tax-deferred until withdrawn","Interest is always exempt from federal income tax","Interest is subject to capital gains tax"],correct:1,
exp:"A key tax advantage of deferred annuities is tax-deferred growth — credited interest (or investment gains in variable products) accumulates without current income tax until funds are distributed."},

{id:129,ch:3,q:"An 'equity-indexed annuity' (EIA) is a type of FIXED annuity because:",
opts:["It invests premiums in stock market subaccounts","The insurance company bears the investment risk and guarantees the principal","Withdrawals are always tax-free","Premiums are paid with pre-tax dollars"],correct:1,
exp:"Despite being linked to an equity index, an EIA is a fixed annuity — the insurer bears all investment risk and guarantees the principal. The owner does not directly participate in equity markets."},

{id:130,ch:3,q:"A 'participation rate' in an indexed annuity refers to:",
opts:["The percentage of the premium that is invested in the index","The percentage of the index gain credited to the annuity","The surrender charge percentage","The minimum guaranteed interest rate"],correct:1,
exp:"The participation rate determines how much of a positive index return is credited to the annuity (e.g., 80% participation = if the index gains 10%, the annuity is credited 8%). Caps and floors further limit credited amounts."},

];

// Flashcards
const FLASHCARDS = [
  {id:1,ch:1,term:"Term Life Insurance",def:"Pure death protection for a specified period. No cash value. Least expensive per dollar of coverage."},
  {id:2,ch:1,term:"Whole Life Insurance",def:"Permanent coverage with level premiums, guaranteed death benefit, and guaranteed cash value accumulation."},
  {id:3,ch:1,term:"Universal Life Insurance",def:"Flexible premium, flexible death benefit permanent insurance with a cash value component earning interest."},
  {id:4,ch:1,term:"Variable Life Insurance",def:"Death benefit and cash value tied to separate account subaccount performance. Owner bears investment risk."},
  {id:5,ch:1,term:"Endowment Policy",def:"Pays face amount if insured dies before a specified date OR if insured is alive at the policy's maturity date."},
  {id:6,ch:1,term:"Net Amount at Risk",def:"The difference between the policy face amount and its cash value — the portion the insurer must fund from reserves."},
  {id:7,ch:1,term:"Joint Life (First-to-Die) Policy",def:"Covers two lives; pays death benefit upon the FIRST insured's death."},
  {id:8,ch:1,term:"Survivorship Life (Second-to-Die)",def:"Covers two lives; pays death benefit upon the LAST surviving insured's death. Often used for estate planning."},
  {id:9,ch:1,term:"Key Person Insurance",def:"Policy owned by a business on a key employee's life; business is beneficiary. Covers financial loss from that employee's death."},
  {id:10,ch:1,term:"Group Life Insurance",def:"Coverage provided to members of a group (e.g., employees) under a master policy. Usually issued as term life."},
  {id:11,ch:2,term:"Entire Contract Provision",def:"The policy and the application together constitute the complete agreement between insurer and policyowner."},
  {id:12,ch:2,term:"Incontestability Clause",def:"After 2 years, the insurer cannot contest the policy or deny a claim based on misrepresentations in the application."},
  {id:13,ch:2,term:"Grace Period",def:"A period (typically 30 days) after a premium due date during which the policy stays in force while the overdue premium can still be paid."},
  {id:14,ch:2,term:"Reinstatement",def:"Restoring a lapsed policy by paying all past-due premiums with interest and providing evidence of insurability."},
  {id:15,ch:2,term:"Misstatement of Age",def:"If age is misstated, the benefit is adjusted to what the premium paid would have purchased at the correct age."},
  {id:16,ch:2,term:"Free-Look Period",def:"Period (10 days standard; 20 days for replacements in WA) allowing the policyowner to return the policy for a full premium refund."},
  {id:17,ch:2,term:"Revocable Beneficiary",def:"A beneficiary designation the policyowner can change at any time without the beneficiary's consent."},
  {id:18,ch:2,term:"Irrevocable Beneficiary",def:"A beneficiary designation that cannot be changed without the beneficiary's written consent."},
  {id:19,ch:2,term:"Automatic Premium Loan (APL)",def:"Policy provision that uses available cash value to automatically pay an overdue premium, preventing lapse."},
  {id:20,ch:2,term:"Extended Term Nonforfeiture",def:"Uses cash value to purchase term insurance at the ORIGINAL face amount for as long as the cash value will fund."},
  {id:21,ch:2,term:"Reduced Paid-Up Nonforfeiture",def:"Uses cash value to purchase a paid-up policy at a REDUCED face amount, with no further premiums required."},
  {id:22,ch:2,term:"Waiver of Premium Rider",def:"Waives future premiums if the insured becomes totally disabled (typically after a 6-month waiting period)."},
  {id:23,ch:2,term:"Guaranteed Insurability Rider",def:"Allows purchase of additional coverage at specified events/ages without proof of insurability."},
  {id:24,ch:2,term:"Accidental Death Benefit Rider",def:"Pays an additional amount (often equal to the face) if death results directly from an accident."},
  {id:25,ch:2,term:"Spendthrift Clause",def:"Prevents beneficiaries from assigning or pledging their policy proceeds to creditors before receiving them."},
  {id:26,ch:2,term:"Suicide Clause",def:"If insured commits suicide within 2 years of policy issue, insurer returns premiums paid rather than paying the death benefit."},
  {id:27,ch:2,term:"Absolute Assignment",def:"Transfer of ALL ownership rights in a policy to another party (the assignee)."},
  {id:28,ch:2,term:"Collateral Assignment",def:"Transfer of CERTAIN policy rights to a lender as loan security; original owner retains most rights."},
  {id:29,ch:2,term:"Paid-Up Additions (PUAs)",def:"Dividend option that uses dividends to purchase small amounts of additional paid-up whole life insurance."},
  {id:30,ch:2,term:"Accelerated Death Benefit (ADB)",def:"Allows a terminally or chronically ill insured to receive a portion of the death benefit while still alive."},
  {id:31,ch:3,term:"Annuity",def:"A contract that converts a lump sum or premium stream into a periodic income stream, often guaranteed for life."},
  {id:32,ch:3,term:"Accumulation Phase",def:"The period before annuitization when premiums are paid and funds grow tax-deferred."},
  {id:33,ch:3,term:"Annuitization",def:"Converting an annuity's accumulated value into a stream of periodic income payments."},
  {id:34,ch:3,term:"Straight Life Annuity",def:"Pays income for the annuitant's entire life only; stops at death with no refund. Highest monthly income option."},
  {id:35,ch:3,term:"Life with Period Certain",def:"Pays for life but guarantees a minimum number of years; if annuitant dies early, beneficiary receives remaining payments."},
  {id:36,ch:3,term:"Joint and Survivor Annuity",def:"Pays while both annuitants are alive, continues (often at a reduced %) for the surviving annuitant's lifetime."},
  {id:37,ch:3,term:"Fixed Annuity",def:"Insurer guarantees principal and a minimum interest rate. Insurer bears all investment risk."},
  {id:38,ch:3,term:"Variable Annuity",def:"Owner invests in subaccounts; both values and payments fluctuate. Owner bears investment risk. Requires securities registration to sell."},
  {id:39,ch:3,term:"Indexed Annuity (EIA/FIA)",def:"Interest linked to a market index with a floor (usually 0%) protecting against losses. Classified as a FIXED annuity."},
  {id:40,ch:3,term:"1035 Exchange",def:"Tax-free exchange of one life insurance, endowment, or annuity contract for another of the same type."},
  {id:41,ch:3,term:"Exclusion Ratio",def:"Investment in contract ÷ expected return = the non-taxable fraction of each annuity payment (return of basis)."},
  {id:42,ch:3,term:"LIFO Tax Treatment",def:"Withdrawals from non-qualified annuities are taxed as earnings first (last in, first out), then principal."},
  {id:43,ch:4,term:"Insurable Interest",def:"A financial or emotional stake in the continued life of the insured. Required at the time of application."},
  {id:44,ch:4,term:"Conditional Receipt",def:"Given to applicant with initial premium; provides coverage if the applicant qualifies as insurable on the date of application or medical exam."},
  {id:45,ch:4,term:"Binding Receipt",def:"Provides immediate temporary coverage regardless of insurability, from the date of application."},
  {id:46,ch:4,term:"Rated Policy",def:"A policy issued at a higher-than-standard premium because the insured represents a greater risk."},
  {id:47,ch:4,term:"Substandard Risk",def:"An applicant whose health or lifestyle increases mortality risk beyond the standard — may be rated, restricted, or declined."},
  {id:48,ch:4,term:"MIB (Medical Information Bureau)",def:"A cooperative database of coded medical information shared among member insurers to detect misrepresentation."},
  {id:49,ch:4,term:"Attending Physician Statement (APS)",def:"A report from the applicant's doctor requested by the underwriter for additional medical detail."},
  {id:50,ch:4,term:"Field Underwriting",def:"The agent's role in gathering accurate information, screening applicants, and completing the application correctly."},
  {id:51,ch:5,term:"Section 1035 Exchange",def:"Allows tax-free exchange of life insurance, endowment, or annuity contracts without recognizing taxable gain."},
  {id:52,ch:5,term:"Modified Endowment Contract (MEC)",def:"A life policy that fails the 7-pay test; loses favorable tax treatment — loans and withdrawals are taxed LIFO with 10% penalty if under 59½."},
  {id:53,ch:5,term:"7-Pay Test",def:"Determines whether a life insurance policy is a MEC; if cumulative premiums paid in the first 7 years exceed the 7-pay limit, it becomes a MEC."},
  {id:54,ch:5,term:"403(b) Plan",def:"A tax-sheltered annuity plan available to employees of public schools and non-profit organizations."},
  {id:55,ch:5,term:"Traditional IRA",def:"Individual Retirement Account funded with pre-tax (deductible) or after-tax dollars; taxable on withdrawal."},
  {id:56,ch:5,term:"Roth IRA",def:"IRA funded with after-tax dollars; qualified withdrawals (including earnings) are tax-free."},
  {id:57,ch:5,term:"Section 79 (Group Term Life)",def:"Employer-paid group term life premiums for coverage up to $50,000 are tax-free to the employee; amounts over $50,000 create taxable income."},
  {id:58,ch:5,term:"Death Benefit Taxation",def:"Life insurance death benefits are generally income-tax-free to the beneficiary under IRC Section 101(a)(1)."},
  {id:59,ch:6,term:"Twisting",def:"Inducing a policyowner to lapse, surrender, or replace an existing policy through misrepresentation or incomplete comparison."},
  {id:60,ch:6,term:"Churning",def:"Replacing a policy within the same company to generate additional commission — a form of twisting."},
  {id:61,ch:6,term:"Rebating",def:"Sharing or returning any part of the premium or commission to the client as an inducement to purchase. Illegal in Washington."},
  {id:62,ch:6,term:"Misrepresentation",def:"Making false or misleading statements about a policy, insurer, or competitor to induce purchase or prevent cancellation."},
  {id:63,ch:6,term:"Unfair Discrimination",def:"Treating applicants or insureds of the same class and risk differently without actuarial justification. Illegal."},
  {id:64,ch:6,term:"Suitability",def:"The obligation to recommend products that match the client's financial situation, needs, objectives, and risk tolerance."},
  {id:65,ch:7,term:"RCW 48.23.030 — Grace Period",def:"Washington requires a grace period of one month (at least 30 days) for life insurance premium payments after the first."},
  {id:66,ch:7,term:"RCW 48.23.050 — Incontestability",def:"Washington life policies become incontestable after 2 years from the issue date (during the insured's lifetime)."},
  {id:67,ch:7,term:"RCW 48.23.060 — Misstatement of Age",def:"If age is misstated, the policy pays the benefit the premium would have purchased at the correct age."},
  {id:68,ch:7,term:"Free Look — WA (WAC 284-23)",def:"10 days for new policies; 20 days for replacement policies. Insurer must refund full premium within 30 days of return."},
  {id:69,ch:7,term:"RCW 48.32A — WA Guaranty Association",def:"Covers life insurance death benefits up to $500,000; annuity values up to $500,000; cash values up to $500,000."},
  {id:70,ch:7,term:"RCW 48.17.150 — CE Requirements",def:"Washington producers must complete 24 CE credit hours every 2-year renewal period, including 3 hours of ethics."},
  {id:71,ch:7,term:"WA Producer License Renewal",def:"Washington insurance producer licenses are renewed every 2 years (even-year expiration for most producers)."},
  {id:72,ch:7,term:"RCW 48.17 — Licensing",def:"Governs producer licensing in Washington: application, appointment, license lines of authority, and discipline."},
  {id:73,ch:7,term:"Replacement (WA WAC 284-23-540)",def:"When new life insurance replaces existing coverage, the producer must follow WA replacement regulations including disclosure requirements."},
  {id:74,ch:7,term:"RCW 48.30 — Unfair Trade Practices",def:"Prohibits misrepresentation, twisting, rebating, unfair discrimination, and other deceptive insurance practices in Washington."},
  {id:75,ch:7,term:"WA OIC (Office of the Insurance Commissioner)",def:"The state agency that regulates the insurance industry in Washington, headed by the elected Insurance Commissioner."},
];

window.CHAPTERS = CHAPTERS;
window.QUESTIONS = QUESTIONS;
window.FLASHCARDS = FLASHCARDS;
