# PulseIQ Operations

PulseIQ Operations is a Next.js business-operations diagnostic for growing service businesses. It helps users compare actual performance with targets, identify potential profit leakage, rank operational questions by financial impact, model recovery scenarios, and prepare a request for a deeper analysis.

Production domain: `https://www.pulseiqoperations.online`

## Current product

- Free browser-based profit-leak diagnostic
- Manual actual-vs-target entry
- CSV template download and CSV import
- Revenue-gap, cost-overrun, margin, and missed-lead calculations
- Ranked operational findings
- Recovery-scenario modeling
- Printable / PDF-friendly executive report
- Service intake page
- Quick Leak Check — $149
- Profit Leak Analysis — $399
- Monthly Pulse — $199/month
- Methodology, FAQ, Privacy, and Terms pages
- Search metadata, JSON-LD structured data, sitemap, and robots configuration

## Client intake configuration

The request page is intentionally safe when business contact information has not been configured: users can prepare, copy, or download their request without the site pretending it was submitted.

To enable direct email intake in Vercel, add:

```text
NEXT_PUBLIC_PULSEIQ_CONTACT_EMAIL=your-business-inbox@example.com
```

After this variable is present in the Production environment, redeploy the site. The request page will show **Email PulseIQ** and create a prefilled email to the configured address.

## Payment-link configuration

The request page supports optional external checkout links. Add only the links from the payment processor account owned by PulseIQ Operations.

```text
NEXT_PUBLIC_PULSEIQ_QUICK_PAY_URL=https://your-payment-link
NEXT_PUBLIC_PULSEIQ_COMPLETE_PAY_URL=https://your-payment-link
NEXT_PUBLIC_PULSEIQ_MONTHLY_PAY_URL=https://your-payment-link
```

When a link exists, **Secure Checkout** appears for that service. Payment-card information stays with the external checkout provider and is not entered into the PulseIQ request form.

Do not hard-code private API keys or payment secrets into `NEXT_PUBLIC_*` variables. These variables are visible to the browser and are intended only for public destination URLs or the public business contact address.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Before deployment:

```bash
npm run lint
npm run build
```

## Main routes

- `/` — free diagnostic and executive report
- `/request` — service selection and analysis-request builder
- `/methodology` — transparent explanation of the diagnostic logic
- `/faq` — client-facing questions and service scopes
- `/privacy` — privacy practices for the current product
- `/terms` — terms and limitations
- `/sitemap.xml` — generated sitemap
- `/robots.txt` — generated crawler rules

## Data handling notes

The current free diagnostic performs its core calculations in the browser. The CSV importer reads the selected CSV with browser-side code. The current request builder prepares the request in the browser and only opens direct email when the business contact environment variable is configured.

Do not expand the product to collect passwords, bank credentials, payment-card details, Social Security numbers, medical records, or unrelated sensitive personal information.

## Methodology principle

PulseIQ should distinguish **signal** from **cause**. A target variance or modeled opportunity identifies where an investigation may be valuable; it does not prove causation or guarantee that the full amount can be recovered.

## Launch checklist

1. Confirm the custom domain resolves to the intended production deployment.
2. Add `NEXT_PUBLIC_PULSEIQ_CONTACT_EMAIL` using the business inbox that should receive requests.
3. Create payment links in the payment processor owned by PulseIQ and add the three public payment-link environment variables if self-serve checkout is desired.
4. Redeploy production after environment-variable changes.
5. Test the free diagnostic with demo data and a clean browser session.
6. Test CSV download and import.
7. Test Print / Save Report.
8. Test `/request` on desktop and mobile.
9. Test the configured email and payment destinations before advertising the site.
10. Keep `/methodology`, `/privacy`, and `/terms` aligned with any future changes to data collection, analytics, payment, or client-delivery workflows.
