import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.pulseiqoperations.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PulseIQ Operations | Find Profit Leaks in Your Business",
    template: "%s | PulseIQ Operations",
  },
  description:
    "PulseIQ Operations helps growing service businesses identify costly gaps in labor, expenses, missed leads, customer experience, and daily operations—then prioritize what to fix first.",
  applicationName: "PulseIQ Operations",
  keywords: [
    "business operations analytics",
    "profit leak analysis",
    "small business analytics",
    "operational intelligence",
    "labor cost analysis",
    "missed lead analysis",
    "business performance dashboard",
    "operations consulting",
  ],
  authors: [{ name: "PulseIQ Operations" }],
  creator: "PulseIQ Operations",
  publisher: "PulseIQ Operations",
  category: "Business Analytics",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "PulseIQ Operations",
    title: "PulseIQ Operations | Find Profit Leaks in Your Business",
    description:
      "Turn business numbers into prioritized operational decisions. Identify profit leaks, model financial impact, and see what deserves attention first.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PulseIQ Operations | Find Profit Leaks in Your Business",
    description:
      "Identify costly operational gaps, estimate financial impact, and prioritize what to fix first.",
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
  description:
    "Business operations analytics focused on profit leakage, labor, missed leads, customer experience, and operational decision support.",
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
    "Operational analysis that helps businesses identify costly gaps in labor, expenses, missed leads, customer experience, and daily operations.",
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
  ["FAQ", "/faq"],
  ["Methodology", "/methodology"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
] as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        {children}

        <div className="site-utility border-t border-black/10 bg-[#eee7dc] px-5 py-6 text-[#101010] md:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
            <p className="font-semibold text-black/45">© 2026 PulseIQ Operations · Clear data. Better decisions.</p>
            <nav aria-label="PulseIQ site information" className="flex flex-wrap gap-x-5 gap-y-2 font-black text-black/55">
              {utilityLinks.map(([label, href]) => (
                <a key={href} href={href} className="hover:text-black">{label}</a>
              ))}
              <a href="/request" className="text-black">Request analysis</a>
            </nav>
          </div>
        </div>

        <a
          href="/request"
          className="site-cta fixed bottom-5 right-5 z-[60] rounded-full bg-black px-5 py-3 text-sm font-black text-white shadow-2xl hover:-translate-y-0.5 hover:shadow-xl"
        >
          Request analysis
        </a>
      </body>
    </html>
  );
}
