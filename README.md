# PulseIQ Operations

PulseIQ Operations is a Next.js business money-leak diagnostic and analysis funnel for growing service businesses. The free product helps an owner enter the numbers they already have, separate direct cost overruns from modeled operational opportunities, rank the biggest financial signals, see what to investigate next, and model potential recovery before deciding whether a deeper analysis is worth paying for.

Production domain: `https://www.pulseiqoperations.online`

## Product architecture

PulseIQ now has two jobs:

1. **Free software:** make the business problem visible and useful enough to act on.
2. **Paid analysis:** investigate the underlying data when the business needs the cause—not just the monthly signal.

The free workspace intentionally avoids claiming that a variance proves waste or that a modeled opportunity is guaranteed recoverable revenue.

## Current product

### Public acquisition site

- Conversion-focused homepage built around the question: where is the money leaking?
- Fictional sample diagnostic so a prospect can understand the output before entering data
- Plain-English explanation of direct variances versus modeled opportunities
- Pricing page with one free and three paid paths
- FAQ, methodology, privacy, terms, sitemap, robots, Open Graph metadata, and JSON-LD structured data

### PulseIQ Business Workspace — `/workspace`

- Business name, industry, reporting period, employee count, and location count
- Monthly actual revenue and revenue target
- Actual-versus-target entry for payroll, overtime, marketing, refunds/returns, software/subscriptions, shipping/fulfillment, inventory/supplies, facilities, contractors/outsourcing, and other operating costs
- CSV template download and browser-side CSV import
- Itemized work expenses with date, vendor, description, category, and exact dollar amount; optional expense CSV import
- Spending breakdown by category, percentage of expense total, and top vendors
- Selected-month expense analysis, prior recorded month comparison, source-entry drilldown, and possible-duplicate / recurring-charge review prompts
- Explicit monthly-total or itemized-expense selection: itemized entries replace category actuals without double-counting; existing targets remain in place
- Optional missed-lead opportunity model
- Optional rework / repeat-service cost model
- Direct cost overruns kept separate from modeled opportunities
- Operations health signal and diagnostic completeness score
- Data-quality warnings for incomplete or potentially inconsistent inputs
- Ranked money-leak findings by estimated monthly impact
- Confidence labels, why-it-matters explanation, root-cause questions, first move, and metric to track for every finding
- 25% / 50% / 75% / 100% recovery scenario modeling
- Top-three Fix This First plan
- Browser-local action tracker for baseline, follow-up, owner, evidence, observed spending difference, and separately owner-confirmed improvement
- Copyable and downloadable executive report
- Browser Print / Save PDF support
- Auto-saved browser draft and up to 12 optional local snapshots
- Expense entries, selected expense source and month persist in the browser draft and saved snapshots; follow-up actions are saved separately in the same browser
- Demo business using fictional data

### Paid analysis funnel

- Quick Leak Check — **$149 one-time**
- Profit Leak Analysis — **$399 one-time**
- Monthly Pulse — **$199/month**
- Analysis request builder with business question and available-data fields
- Random session reference shared between the Stripe checkout URL and an optional emailed, copied, or downloaded detailed request, to assist manual order matching
- Safe fallback when email or checkout is not configured: the page never pretends a request or payment was submitted
- Optional external payment links so card data remains with the payment processor

## Diagnostic methodology

PulseIQ distinguishes three concepts:

- **Direct variance:** actual cost above the business-provided target. This is a high-confidence arithmetic signal, not proof that all of the variance is waste.
- **Modeled opportunity:** a planning estimate based on a completed operating model such as missed leads or rework. This is explicitly labeled as modeled.
- **Revenue target gap:** the difference between actual revenue and an entered revenue target. It stays separate so the same dollars are not double-counted as cost leakage.

The health score is a prioritization signal based on completed inputs, not a credit rating, audit, certification, or industry benchmark.

## Browser data handling

The free workspace performs its core calculations in the browser. Selected CSV files are read with browser-side code. The current draft, up to 12 snapshots, and up to 30 action follow-ups use browser local storage and are not a permanent cloud backup or customer account. A selected expense month replaces monthly category actuals when itemized totals are chosen. Comparing months requires comparable revenue, category coverage, and targets; a spending decline alone does not prove savings. An action's owner-confirmed amount is the owner's statement, not an independent PulseIQ verification.

Do not expand the free diagnostic to collect passwords, bank credentials, payment-card details, Social Security numbers, medical records, or unrelated sensitive personal information.

## Planning tools

The workspace now includes 3-, 6-, and 12-month assumption-based projections with baseline/scenario comparison, monthly compound revenue and cost growth, a one-time payroll/overtime change, other-cost reductions, opening cash and monthly cash adjustments. Historical rows support a geometric trend from at least three consecutive months. Plans can be saved/loaded per named business in browser local storage and exported with assumptions. In-app alerts detect projected operating losses and scenario cash shortfalls. These are not statistical forecasts, background alerts, or guaranteed savings.

Data review suggests catch-all categorization and canonical vendor names, validates dates, and flags large expenses against same-month/same-category peers. Corrections require a click; no entries are automatically deleted.

Automatic account syncing, customer authentication, encrypted cloud connector-token storage, provider OAuth applications, scheduled jobs, and email alert delivery are not configured. Do not advertise them as available. The existing Stripe payment links sell PulseIQ services; they do not authorize access to customer transaction data.

## Client intake configuration

The request page and footer use `anapperk12@gmail.com` as the public PulseIQ contact address. To override it, set this Production environment variable:

```text
NEXT_PUBLIC_PULSEIQ_CONTACT_EMAIL=your-business-inbox@example.com
```

The Email PulseIQ button opens a prefilled draft in the visitor's email app. The visitor must press Send there; the website does not submit or deliver the request itself. Copy and download remain available if no email app is configured. Each service gets a non-sensitive random reference kept in session storage. Stripe Payment Links receive it as `client_reference_id`, and the optional detailed email includes the same reference in its subject and body. This assists manual matching in Stripe and the inbox; it is not automatic fulfillment, proof of payment, or a file upload. Checkout itself collects the client's short question.

## Stripe / payment-link configuration

PulseIQ sends checkout to Stripe rather than collecting card data in the application. Verified live payment links are the defaults for Quick Leak Check, Profit Leak Analysis, and Monthly Pulse. The active Stripe customer portal lets Monthly Pulse subscribers update payment details and cancel at the end of their current billing period. Public checkout and portal URLs can be overridden through:

```text
NEXT_PUBLIC_PULSEIQ_QUICK_PAY_URL=https://your-stripe-payment-link
NEXT_PUBLIC_PULSEIQ_COMPLETE_PAY_URL=https://your-stripe-payment-link
NEXT_PUBLIC_PULSEIQ_MONTHLY_PAY_URL=https://your-stripe-payment-link
NEXT_PUBLIC_PULSEIQ_BILLING_PORTAL_URL=https://your-stripe-customer-portal-login-link
```

Only public checkout URLs belong in `NEXT_PUBLIC_*` variables. Never place Stripe secret keys, webhook secrets, bank credentials, or other private credentials in public environment variables or source control.

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

Validation before merge or deployment:

```bash
npx tsc --noEmit
npm run test
npm run lint
npm run build
```

GitHub Actions runs these checks automatically on the product branch and `main`.

## Main routes

- `/` — acquisition-focused product homepage
- `/workspace` — free business money-leak workspace
- `/pricing` — free and paid offer comparison
- `/request` — service selection and analysis-request builder
- `/methodology` — transparent explanation of diagnostic logic
- `/faq` — client-facing questions and service scopes
- `/privacy` — current data-handling practices
- `/terms` — current terms and limitations
- `/sitemap.xml` — generated sitemap
- `/robots.txt` — generated crawler rules

## Launch checklist

Before paid traffic or a broad public launch:

1. Confirm `www.pulseiqoperations.online` resolves to the intended current production deployment.
2. Confirm the deployed build is from the current `main` commit and GitHub CI is green.
3. Confirm the public contact address and send a test request from an email app; a `mailto:` draft alone does not prove delivery.
4. Verify all three Stripe checkout links and the customer portal login. Confirm subscribers can manage payment details and cancel at period end.
5. Test `/workspace` in a clean desktop and mobile browser session.
6. Test demo data, manual entry, CSV template download, CSV import, local snapshot save/load/delete, and current-draft restoration.
7. Test a zero/incomplete dataset and confirm the data-quality warnings are understandable.
8. Test copy report, text download, and Print / Save PDF.
9. Test every pricing CTA and each selected paid service on `/request`.
10. Run a real test-mode checkout before accepting live payments.
11. Keep methodology, privacy, terms, pricing, and checkout behavior aligned whenever the product changes.
12. Do not buy ads until the production site, request delivery, and payment destinations have been verified end-to-end.

## Revenue funnel

The intended path is deliberately simple:

**Problem-aware prospect → free PulseIQ workspace → quantified financial signal → prioritized first action → paid deeper analysis → recurring Monthly Pulse when ongoing monitoring has clear value.**

The software should earn trust by being useful before asking for payment. The paid service should earn its fee by investigating the underlying data rather than repeating generic recommendations from the free scan.

## Decision intelligence

The health score now exposes the four deductions used in its existing formula; it does not assess debt or actual cash flow. Ranked priorities include up to five completed findings. Best/expected/worst comparisons apply adjustable one-time level shocks to each projected month's revenue and scenario costs, leaving monthly compound growth unchanged. Saved plans and exported forecasts include the variations. These comparisons are stress tests, not statistical confidence intervals. The three business question tools calculate target overruns, a fixed 15% revenue-drop scenario, and incremental employment-cost coverage from the current baseline locally; no external LLM or financial account connection is implied.

## Executive experience

Results now lead with revenue, entered costs, operating profit, score, the largest concern, and three immediate priorities. Guided setup offers monthly totals, itemized entries, and a fictional demo, with reporting-month and input coverage checks. Findings expose formulas and up to five supporting records. Calendar forecasts begin after the selected diagnostic month. The locally generated executive PDF includes all findings, source details, active forecast settings, stress tests, input warnings, and recorded action follow-up; text export preserves forecast assumptions too. A public next-steps guide explains manual data/scope agreement, delivery, and billing. It does not verify payment or provide automatic analysis delivery.
