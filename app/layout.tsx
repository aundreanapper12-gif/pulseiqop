import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { billingPortalUrl, contactEmail } from "./site-config";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const siteUrl = "https://www.pulseiqoperations.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PulseIQ Operations | Know where your money goes",
    template: "%s | PulseIQ Operations",
  },
  description:
    "Understand your business expenses, payroll, missed leads, and repeat work. Run a free business scan and get practical next steps with PulseIQ Operations.",
  applicationName: "PulseIQ Operations",
  icons: {
    icon: [{ url: "/pulseiq-solutions-icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/pulseiq-solutions-icon.png", type: "image/png", sizes: "512x512" }],
  },
  keywords: [
    "business operations analytics",
    "profit leak analysis",
    "small business analytics",
    "operational intelligence",
    "labor cost analysis",
    "missed lead analysis",
    "business performance dashboard",
    "profit improvement",
    "operations consulting",
  ],
  authors: [{ name: "PulseIQ Operations" }],
  creator: "PulseIQ Operations",
  publisher: "PulseIQ Operations",
  category: "Business Analytics",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "PulseIQ Operations",
    title: "PulseIQ Operations | Know where your money goes",
    description:
      "Turn business data into prioritized financial and operational decisions with transparent assumptions and executive-ready analysis.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PulseIQ Operations | Know where your money goes",
    description:
      "Identify costly operational gaps, quantify financial impact, and prioritize the decisions that matter most.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "VwlG8w2T82XWnxuSVl8RnMHezQMB1gfMts5OTen1RYc",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PulseIQ Operations",
  url: siteUrl,
  description: "Operational profit intelligence for growing service businesses.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PulseIQ Operations",
  url: siteUrl,
  email: contactEmail,
  description:
    "Business operations analytics focused on profit leakage, labor, missed leads, rework, customer experience, and operational decision support.",
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PulseIQ Business Workspace",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${siteUrl}/workspace`,
  description:
    "A browser-based business diagnostic that compares actuals with targets, ranks potential money leaks, models recovery scenarios, and creates a prioritized action plan.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "PulseIQ Operations Profit Leak Analysis",
  provider: {
    "@type": "Organization",
    name: "PulseIQ Operations",
    url: siteUrl,
  },
  serviceType: "Business operations analytics and profit leak analysis",
  areaServed: "US",
  description:
    "Operational analysis that helps businesses identify costly gaps and connect financial signals to root-cause questions and prioritized actions.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "PulseIQ Analysis Services",
    itemListElement: [
      {
        "@type": "Offer",
        priceCurrency: "USD",
        price: "149",
        itemOffered: {
          "@type": "Service",
          name: "Quick Leak Check",
          description: "Focused review of one operational question and one dataset.",
        },
      },
      {
        "@type": "Offer",
        priceCurrency: "USD",
        price: "399",
        itemOffered: {
          "@type": "Service",
          name: "Profit Leak Analysis",
          description: "Broader operational analysis using up to four data sources.",
        },
      },
      {
        "@type": "Offer",
        priceCurrency: "USD",
        price: "199",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "199",
          priceCurrency: "USD",
          unitText: "MONTH",
        },
        itemOffered: {
          "@type": "Service",
          name: "Monthly Pulse",
          description: "Recurring monthly performance review and action prioritization.",
        },
      },
    ],
  },
};

const utilityLinks = [
  ["Workspace", "/workspace"],
  ["Pricing", "/pricing"],
  ["Delivery process", "/next-steps"],
  ["FAQ", "/faq"],
  ["Methodology", "/methodology"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
] as const;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        {children}

        <div className="site-utility border-t border-slate-900/10 bg-[#eee7dc] px-5 py-6 text-[#0f172a] md:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
            <p className="font-semibold text-slate-600">© 2026 PulseIQ Operations · Clear Data. Better Decisions. Stronger Operations.</p>
            <nav aria-label="PulseIQ site information" className="flex flex-wrap gap-x-5 gap-y-2 font-semibold text-slate-600">
              {utilityLinks.map(([label, href]) => (
                <a key={href} href={href} className="hover:text-slate-900">{label}</a>
              ))}
              <a href="/request" className="text-slate-900">Request Analysis</a>
              <a href={billingPortalUrl} className="hover:text-slate-900">Manage Billing</a>
              <a href={`mailto:${contactEmail}`} className="text-slate-900">{contactEmail}</a>
            </nav>
          </div>
        </div>


      </body>
    </html>
  );
}
