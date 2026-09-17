export type InsightPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  takeaway: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};

export const insightPosts: InsightPost[] = [
  {
    slug: "hidden-business-expenses-killing-profit",
    title: "7 Hidden Business Expenses Quietly Eating Your Profit",
    description: "Learn how to spot recurring costs, rework, overtime, refunds, software creep, and other expenses that can weaken profit even when revenue looks healthy.",
    category: "Profit Leaks",
    publishedAt: "2026-09-17",
    readTime: "7 min read",
    featured: true,
    takeaway: "The goal is not to cut every expense. It is to identify costs that are rising without producing a comparable business benefit.",
    sections: [
      { heading: "Revenue can hide expensive operating habits", paragraphs: ["A business can bring in more revenue and still feel cash-tight. One reason is that operating costs often rise quietly across several categories at once. Individually, the changes may look small. Together, they can materially reduce margin.", "The first step is to compare actual spending with a target, prior period, or operating plan instead of looking at each expense in isolation."] },
      { heading: "Seven areas worth checking", paragraphs: ["These are not automatically waste. They are places where a closer review can reveal whether spending is still supporting the business."], bullets: ["Recurring software and subscriptions that are rarely used", "Overtime caused by scheduling gaps or repeated fire drills", "Refunds, credits, and service recovery costs", "Rework, repeat visits, and preventable corrections", "Vendor price increases that were never re-evaluated", "Marketing spend that is not tied to qualified leads or sales", "Small miscellaneous expenses that have become permanent monthly costs"] },
      { heading: "How to review them", paragraphs: ["Pull one to three months of expenses and group them by category and vendor. Compare each category with your budget or target. Then investigate the largest dollar gaps first.", "A variance is a signal, not a verdict. The point is to ask what changed, why it changed, and whether the additional cost is producing enough value to justify it."] },
      { heading: "Turn the review into action", paragraphs: ["Choose one or two high-value findings and assign a next step, owner, and follow-up date. Measure the next period against the original baseline before claiming savings.", "PulseIQ is designed around this exact workflow: organize the numbers, rank the signals, identify the next action, and then track what actually changed."] },
    ],
  },
  {
    slug: "payroll-percentage-of-revenue",
    title: "How Much Should Payroll Cost as a Percentage of Revenue?",
    description: "A practical way to evaluate payroll-to-revenue without relying on a one-size-fits-all benchmark.",
    category: "Payroll & Overtime",
    publishedAt: "2026-09-17",
    readTime: "6 min read",
    takeaway: "Payroll percentage is most useful when you compare it with your own targets, workload, staffing model, and prior periods.",
    sections: [
      { heading: "Start with the basic calculation", paragraphs: ["Payroll percentage of revenue is calculated by dividing payroll cost by revenue for the same period, then multiplying by 100.", "For example, if monthly payroll is $30,000 and monthly revenue is $100,000, payroll represents 30% of revenue."] },
      { heading: "Why there is no universal perfect percentage", paragraphs: ["A labor-intensive service company will naturally look different from a software business or retailer. Even within the same industry, staffing models, owner compensation, seasonality, subcontracting, and growth stage can change the number significantly.", "That is why PulseIQ does not invent a universal benchmark for a business. Your own budget, historical trend, workload, and operating context are more defensible starting points."] },
      { heading: "Questions to ask when payroll rises", paragraphs: ["If payroll is growing faster than revenue, investigate the operating drivers before cutting staff."], bullets: ["Did employee count increase?", "Did overtime rise?", "Did revenue fall while staffing stayed constant?", "Are paid hours aligned with demand?", "Did training, vacancies, absences, or rework increase labor needs?", "Are contractors being counted separately from payroll?"] },
      { heading: "Track the relationship over time", paragraphs: ["A single month can be misleading. Track payroll, revenue, overtime, and paid hours over several comparable periods. The trend is often more useful than a single percentage.", "If the ratio moves away from your plan, quantify the dollar impact and investigate the operational cause before deciding what to change."] },
    ],
  },
  {
    slug: "revenue-growing-profit-not",
    title: "Why Revenue Is Growing but Profit Is Not",
    description: "Revenue growth can coexist with weak margins. Here is how to investigate labor, cost, pricing, rework, refunds, and revenue-capture issues.",
    category: "Profit Leaks",
    publishedAt: "2026-09-17",
    readTime: "7 min read",
    featured: true,
    takeaway: "More sales do not automatically create more profit when the cost of delivering those sales rises just as fast—or faster.",
    sections: [
      { heading: "Growth can make inefficiency bigger", paragraphs: ["When sales increase, businesses often need more labor, supplies, fulfillment, support, and marketing. If those costs scale faster than revenue, total sales can look impressive while operating profit barely moves.", "The right question is not only, 'Did revenue increase?' It is, 'What did it cost us to create and deliver that additional revenue?'" ] },
      { heading: "Five common places to investigate", paragraphs: ["Look for changes in the relationship between revenue and the costs required to support it."], bullets: ["Payroll and overtime growing faster than revenue", "Discounting or pricing that reduces contribution margin", "Higher refunds, returns, or service recovery", "Rework and repeat work consuming labor or materials", "Marketing or acquisition cost rising without equivalent profitable growth"] },
      { heading: "Compare periods on the same basis", paragraphs: ["Use consistent reporting periods and avoid mixing monthly revenue with quarterly expenses. Compare actual revenue, total operating costs, and operating margin for the same time window.", "Then rank the largest cost movements by dollars, not just percentages. A 50% increase in a tiny category may matter less than a 7% increase in payroll."] },
      { heading: "Build a recovery plan", paragraphs: ["Once you identify the biggest driver, choose a measurable corrective action. For example, if overtime is the largest variance, review overtime by employee, shift, and cause before changing staffing levels.", "Track the next period against the original baseline. That is how you separate a good idea from an improvement you can actually verify."] },
    ],
  },
  {
    slug: "how-to-find-money-leaks-in-business",
    title: "How to Find Money Leaks in Your Business: A Step-by-Step Review",
    description: "A simple process for finding cost overruns, missed revenue, rework, and other operational signals using the data you already have.",
    category: "Business KPIs",
    publishedAt: "2026-09-17",
    readTime: "8 min read",
    takeaway: "Start with actual versus target, rank the dollar gaps, investigate causes, and verify changes over time.",
    sections: [
      { heading: "Step 1: choose one reporting period", paragraphs: ["Pick a clean monthly or quarterly period and gather revenue plus the major costs from that same window. Consistency matters more than perfection at the beginning."] },
      { heading: "Step 2: compare actuals with a baseline", paragraphs: ["Use your budget, target, prior comparable period, or another defensible baseline. Flag the categories where actual performance moved away from plan."] },
      { heading: "Step 3: rank by financial impact", paragraphs: ["Sort findings by dollars. Investigate the largest meaningful gaps first rather than trying to optimize every category at once."] },
      { heading: "Step 4: separate verified variances from modeled opportunities", paragraphs: ["An expense above budget is directly observable. A missed-lead opportunity or potential rework savings is usually a model based on assumptions. Keep those categories separate so you know what is measured and what is estimated."] },
      { heading: "Step 5: assign an action and follow-up", paragraphs: ["For each priority, define what you will change, who owns the action, what metric should move, and when you will measure again.", "PulseIQ follows this structure so business owners can move from a financial signal to a concrete operational next step."] },
    ],
  },
  {
    slug: "overtime-costing-business",
    title: "5 Signs Overtime Is Costing Your Business More Than You Think",
    description: "How to tell when overtime is a normal demand response versus a recurring operational problem worth investigating.",
    category: "Payroll & Overtime",
    publishedAt: "2026-09-17",
    readTime: "6 min read",
    takeaway: "Recurring overtime is most useful as a diagnostic signal when you break it down by person, shift, location, workload, and cause.",
    sections: [
      { heading: "Overtime is not automatically bad", paragraphs: ["Short-term overtime can be cheaper and more flexible than hiring for a temporary spike. The concern is when overtime becomes recurring, concentrated, unpredictable, or disconnected from profitable demand."] },
      { heading: "Five warning signs", paragraphs: ["Look for patterns rather than reacting to the total alone."], bullets: ["The same employees or shifts repeatedly generate overtime", "Overtime rises even when workload is flat", "Overtime regularly exceeds the budget or target", "Absences, scheduling gaps, or rework are driving paid hours", "Revenue is not growing enough to offset the additional labor cost"] },
      { heading: "What to analyze", paragraphs: ["Review at least several comparable weeks of overtime by employee, shift, team, location, and business reason. Add workload or sales volume where available.", "This lets you distinguish productive demand from avoidable scheduling or process problems."] },
      { heading: "Test before making a staffing decision", paragraphs: ["Before adding or cutting headcount, test whether schedule changes, cross-training, workload balancing, or process fixes reduce the recurring overtime pattern.", "Measure the next period against the baseline so the result is based on evidence rather than assumption."] },
    ],
  },
  {
    slug: "healthy-profit-margin-small-business",
    title: "What Is a Healthy Profit Margin for a Small Business?",
    description: "Learn how to calculate operating margin and use it to evaluate your business without relying on a misleading universal target.",
    category: "Business KPIs",
    publishedAt: "2026-09-17",
    readTime: "6 min read",
    takeaway: "A useful margin target depends on your business model, cost structure, growth stage, and the consistency of your accounting inputs.",
    sections: [
      { heading: "Know which margin you mean", paragraphs: ["Gross margin, operating margin, and net margin answer different questions. For operational reviews, operating margin is especially useful because it shows how much revenue remains after the operating costs included in the calculation."] },
      { heading: "Basic operating margin calculation", paragraphs: ["Subtract included operating expenses from revenue to estimate operating profit. Divide operating profit by revenue and multiply by 100 to calculate operating margin.", "Make sure revenue and expenses refer to the same period and that you are consistent about what is included."] },
      { heading: "Why universal targets can mislead", paragraphs: ["Businesses with different labor intensity, inventory needs, pricing, debt, owner compensation, and growth strategies can have very different margins.", "Rather than treating one internet benchmark as a rule, compare your margin against your plan, prior comparable periods, and the operating changes occurring inside the business."] },
      { heading: "Use margin as a conversation starter", paragraphs: ["If margin declines, identify which categories changed most in dollars and investigate the operational causes. If margin improves, document what changed so you know whether the improvement is repeatable."] },
    ],
  },
  {
    slug: "is-marketing-spend-working",
    title: "How to Know if Your Marketing Spend Is Actually Working",
    description: "A practical small-business approach to connecting marketing spend with leads, customers, revenue, and contribution instead of judging campaigns by clicks alone.",
    category: "Marketing ROI",
    publishedAt: "2026-09-17",
    readTime: "7 min read",
    takeaway: "Marketing performance should connect spend to meaningful business outcomes, not just activity metrics.",
    sections: [
      { heading: "Start with the outcome you are buying", paragraphs: ["Marketing spend is intended to create attention that eventually produces qualified demand and profitable customers. Impressions, clicks, and followers can be useful leading indicators, but they are not the final business result."] },
      { heading: "Track the basic funnel", paragraphs: ["At minimum, connect spend to leads, leads to customers, and customers to revenue. If possible, also track gross profit or contribution so you can distinguish high-revenue customers from profitable ones."] },
      { heading: "Useful questions", paragraphs: ["Review both cost and quality."], bullets: ["How much did we spend?", "How many qualified leads did it create?", "How many became paying customers?", "What revenue did those customers generate?", "Did refunds, discounts, or delivery costs reduce the value?", "Is performance improving or declining over time?"] },
      { heading: "Avoid overreacting to one period", paragraphs: ["Some marketing takes time to convert. Use a consistent attribution approach and compare comparable periods before making large budget decisions.", "PulseIQ can help surface when marketing cost is moving away from the target you entered, but the operational follow-up should still examine lead quality and conversion evidence."] },
    ],
  },
  {
    slug: "small-business-kpis-to-track",
    title: "10 KPIs Every Small Business Owner Should Track",
    description: "A focused KPI list for owners who want visibility into revenue, margin, labor, expenses, customer demand, rework, and cash pressure.",
    category: "Business KPIs",
    publishedAt: "2026-09-17",
    readTime: "8 min read",
    featured: true,
    takeaway: "A small set of decision-ready metrics is more useful than a dashboard full of numbers no one acts on.",
    sections: [
      { heading: "Choose metrics that change decisions", paragraphs: ["The best KPI is not the most sophisticated one. It is a measure that helps you notice a change, investigate the reason, and decide what to do next."] },
      { heading: "Ten practical KPIs", paragraphs: ["The exact mix depends on your business, but these are useful starting points."], bullets: ["Revenue", "Operating profit", "Operating margin", "Payroll as a percentage of revenue", "Overtime cost", "Total operating expenses", "Actual versus target by major expense category", "Lead-to-customer conversion", "Refund or service recovery cost", "Rework or repeat-work cost"] },
      { heading: "Add context", paragraphs: ["A KPI without context can be misleading. Compare each measure with a target, prior period, workload, or other relevant baseline.", "For example, payroll rising is not automatically a problem if revenue and demand increased even faster."] },
      { heading: "Review on a schedule", paragraphs: ["Monthly reviews work well for many operating metrics, while some teams may need weekly visibility into overtime, leads, or service issues.", "The important part is to use the same definitions consistently so trends mean something."] },
    ],
  },
  {
    slug: "cost-of-rework",
    title: "How Much Is Rework Costing Your Business?",
    description: "A practical method for estimating the direct labor, materials, travel, and capacity consumed by repeat work and preventable corrections.",
    category: "Profit Leaks",
    publishedAt: "2026-09-17",
    readTime: "7 min read",
    takeaway: "Rework costs more than the visible correction because it also consumes capacity that could have been used for new revenue-producing work.",
    sections: [
      { heading: "Define rework clearly", paragraphs: ["Rework is work that must be repeated, corrected, replaced, or revisited because the original outcome did not meet the required standard. The definition should be consistent enough that your team can track it over time."] },
      { heading: "Calculate the direct cost", paragraphs: ["Start with labor hours required to correct the issue, the loaded labor cost for those hours, replacement materials, shipping, travel, credits, refunds, or other direct costs."] },
      { heading: "Consider the capacity effect", paragraphs: ["Rework also uses time that could have served another customer or completed another job. That opportunity should be modeled separately from the direct cost so measured losses and estimated opportunity are not mixed together."] },
      { heading: "Find the repeating cause", paragraphs: ["Break rework down by job type, employee or team, location, customer issue, product, and root-cause category where possible.", "The most valuable insight is usually not the total rework cost. It is the recurring pattern that tells you what process deserves attention first."] },
    ],
  },
  {
    slug: "business-expense-analysis-guide",
    title: "Business Expense Analysis: A Simple Step-by-Step Guide",
    description: "How to organize business expenses, compare actuals with targets, identify meaningful variances, and create a practical follow-up plan.",
    category: "Business Expenses",
    publishedAt: "2026-09-17",
    readTime: "9 min read",
    takeaway: "Expense analysis is most useful when it moves from categorization to comparison, investigation, prioritization, and follow-up.",
    sections: [
      { heading: "1. Gather a clean period of expenses", paragraphs: ["Export or collect expenses for a defined period. Include a date, vendor or expense name, category, and amount where possible."] },
      { heading: "2. Group costs into useful categories", paragraphs: ["Categories should be detailed enough to support decisions but simple enough to maintain consistently. Common examples include payroll, overtime, marketing, software, supplies, facilities, contractors, fulfillment, refunds, and other operating costs."] },
      { heading: "3. Compare actual spending with a target", paragraphs: ["A target can come from your budget, forecast, contractual expectation, or another defensible internal plan. Calculate the dollar and percentage difference between actual and target."] },
      { heading: "4. Review vendor and trend concentration", paragraphs: ["Within a category, identify the vendors or expense types driving the total. Compare periods to see whether the change is temporary or recurring."] },
      { heading: "5. Rank and investigate", paragraphs: ["Focus first on the largest meaningful dollar gaps. Ask what operational event caused the change and whether the additional cost was expected, productive, or avoidable."] },
      { heading: "6. Track the next period", paragraphs: ["Document the action you take and compare future results against the original baseline. Avoid labeling an estimated opportunity as verified savings until the follow-up data supports it.", "PulseIQ provides a browser-based workspace for this workflow, including itemized expenses, actual-versus-target analysis, ranked findings, forecasting, and action tracking."] },
    ],
  },
];

export const insightCategories = ["All", ...Array.from(new Set(insightPosts.map((post) => post.category)))];

export function getInsightPost(slug: string) {
  return insightPosts.find((post) => post.slug === slug);
}
