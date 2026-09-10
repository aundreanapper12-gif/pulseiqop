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
- Optional missed-lead opportunity model
- Optional rework / repeat-service cost model
- Direct cost overruns kept separate from modeled opportunities
- Operations health signal and diagnostic completeness score
- Data-quality warnings for incomplete or potentially inconsistent inputs
- Ranked money-leak findings by estimated monthly impact
- Confidence labels, why-it-matters explanation, root-cause questions, first move, and metric to track for every finding
- 25% / 50% / 75% / 100% recovery scenario modeling
- Top-three Fix This First plan
- Copyable and downloadable executive report
- Browser Print / Save PDF support
- Auto-saved browser draft and up to 12 optional local snapshots
- Demo business using fictional data

### Paid analysis funnel

- Quick Leak Check — **$149 one-time**
- Profit Leak Analysis — **$399 one-time**
- Monthly Pulse — **$199/month**
- Analysis request builder with business question and available-data fields
- Safe fallback when email or checkout is not configured: the page never pretends a request or payment was submitted
- Optional external payment links so card data remains with the payment processor

## Diagnostic methodology

PulseIQ distinguishes three concepts:

- **Direct variance:** actual cost above the business-provided target. This is a high-confidence arithmetic signal, not proof that all of the variance is waste.
- **Modeled opportunity:** a planning estimate based on a completed operating model such as missed leads or rework. This is explicitly labeled as modeled.
- **Revenue target gap:** the difference between actual revenue and an entered revenue target. It stays separate so the same dollars are not double-counted as cost leakage.

The health score is a prioritization signal based on completed inputs, not a credit rating, audit, certification, or industry benchmark.

## Browser data handling

The free workspace performs its core calculations in the browser. Selected CSV files are read with browser-side code. The current draft and optional saved snapshots use browser local storage and are not a permanent cloud backup or customer account.

Do not expand the free diagnostic to collect passwords, bank credentials, payment-card details, Social Security numbers, medical records, or unrelated sensitive personal information.

## Client intake configuration

The request page supports a public business inbox through this Production environment variable:

```text
NEXT_PUBLIC_PULSEIQ_CONTACT_EMAIL=your-business-inbox@example.com
```

When configured, the page can create a prefilled email request to the business inbox. Without it, the prospect can still copy or download the request and the site clearly states that direct delivery is not configured.

## Stripe / payment-link configuration

PulseIQ is designed to send checkout to the payment processor rather than collect card data in the application. Create one-time payment links for Quick Leak Check and Profit Leak Analysis and a recurring subscription payment link for Monthly Pulse, then configure:

```text
NEXT_PUBLIC_PULSEIQ_QUICK_PAY_URL=https://your-stripe-payment-link
NEXT_PUBLIC_PULSEIQ_COMPLETE_PAY_URL=https://your-stripe-payment-link
NEXT_PUBLIC_PULSEIQ_MONTHLY_PAY_URL=https://your-stripe-payment-link
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
3. Configure a real PulseIQ business inbox with `NEXT_PUBLIC_PULSEIQ_CONTACT_EMAIL` if direct email intake is desired.
4. Configure and test all three Stripe payment links before showing Secure Checkout to prospects.
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
