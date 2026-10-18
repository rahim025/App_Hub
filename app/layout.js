import "./globals.css";
import Providers from "../components/Providers";
import Footer from "../components/Footer";
import { site } from "../lib/site";

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – Catalogue de projets en ligne`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    siteName: site.name,
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="font-sans">
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
