export type CalculatorSlug =
  | "true-labor-cost"
  | "overtime-cost"
  | "processing-fee"
  | "job-profitability"
  | "profit-margin"
  | "break-even-revenue";

export type CalculatorDefinition = {
  slug: CalculatorSlug;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  keywords: string[];
  intro: string;
};

export const calculators: CalculatorDefinition[] = [
  {
    slug: "true-labor-cost",
    name: "True Labor Cost Calculator",
    eyebrow: "Labor Cost",
    title: "Calculate the true cost of an employee",
    description: "Estimate an employee's real hourly and monthly labor cost after payroll taxes, benefits, workers compensation, and other labor burden.",
    keywords: ["true labor cost calculator", "employee cost calculator", "labor burden calculator", "payroll cost calculator"],
    intro: "Hourly pay is only part of labor cost. Add payroll taxes, benefits, workers compensation, and other burden to see a more realistic cost per hour."
  },
  {
    slug: "overtime-cost",
    name: "Overtime Cost Calculator",
    eyebrow: "Overtime",
    title: "See what overtime is really costing your business",
    description: "Calculate overtime wages, regular wages, and the estimated premium cost created by overtime hours.",
    keywords: ["overtime cost calculator", "overtime expense calculator", "labor overtime calculator"],
    intro: "A few extra hours per employee can become a meaningful monthly expense. This calculator separates regular wages from overtime premium."
  },
  {
    slug: "processing-fee",
    name: "Card Processing Fee Calculator",
    eyebrow: "Merchant Fees",
    title: "Calculate how much card processing fees cost you",
    description: "Estimate monthly and annual credit card processing fees using sales volume, percentage fees, per-transaction fees, and transaction count.",
    keywords: ["credit card processing fee calculator", "merchant fee calculator", "Stripe fee calculator", "Square fee calculator"],
    intro: "Processing fees look small transaction by transaction. Annualizing them shows the real drag on revenue."
  },
  {
    slug: "job-profitability",
    name: "Job Profitability Calculator",
    eyebrow: "Job Costing",
    title: "Find out whether a job actually made money",
    description: "Calculate job gross profit and margin after labor, materials, subcontractors, travel, merchant fees, and other direct costs.",
    keywords: ["job profitability calculator", "job costing calculator", "service business profit calculator", "project profit calculator"],
    intro: "Revenue does not tell you whether a job was worth doing. Add the direct costs and see the actual gross profit and margin."
  },
  {
    slug: "profit-margin",
    name: "Profit Margin Calculator",
    eyebrow: "Profitability",
    title: "Calculate your business profit margin",
    description: "Calculate operating profit, profit margin, expense percentage, and how much profit remains from each dollar of revenue.",
    keywords: ["profit margin calculator", "business profit calculator", "operating margin calculator", "expense percentage calculator"],
    intro: "Use revenue and operating expenses to see how much of each sales dollar remains as operating profit."
  },
  {
    slug: "break-even-revenue",
    name: "Break-Even Revenue Calculator",
    eyebrow: "Break Even",
    title: "Calculate the revenue you need to break even",
    description: "Estimate break-even revenue using monthly fixed costs and your variable cost percentage.",
    keywords: ["break even revenue calculator", "business break even calculator", "break even sales calculator"],
    intro: "Break-even revenue is the sales level where contribution margin covers fixed operating costs."
  }
];

export function getCalculator(slug: string) {
  return calculators.find((calculator) => calculator.slug === slug);
}
