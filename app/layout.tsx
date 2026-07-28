// app/layout.tsx — Root layout (Section 12.2: one codebase, public + dashboard)
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'ZetaCode', template: '%s | ZetaCode' },
  description: 'Strategy-led websites for service businesses that need to earn trust, clarify value, and generate better enquiries.',
  metadataBase: new URL('https://zetacode.tech'),
  openGraph: {
    siteName: 'ZetaCode',
    type: 'website',
    locale: 'en_GB',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
