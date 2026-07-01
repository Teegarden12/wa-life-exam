// Washington State Life Insurance Exam Question Bank
// 300 original questions across 7 chapters
// Exam facts: 100 questions, 150 minutes, 70% passing score

var CHAPTERS = [
  { id: 1, name: "Life Insurance Basics & Policy Types", shortName: "Policy Types" },
  { id: 2, name: "Policy Provisions, Options & Riders", shortName: "Provisions & Riders" },
  { id: 3, name: "Annuities", shortName: "Annuities" },
  { id: 4, name: "Underwriting, Application & Delivery", shortName: "Underwriting" },
  { id: 5, name: "Taxation & Retirement Plans", shortName: "Taxation" },
  { id: 6, name: "Ethics & Trade Practices", shortName: "Ethics" },
  { id: 7, name: "Washington State Insurance Law", shortName: "WA State Law" },
];

var QUESTIONS = [

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

// Flashcards
var FLASHCARDS = [
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
