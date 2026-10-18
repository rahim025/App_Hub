import "./globals.css";
import Providers from "../components/Providers";

export const metadata = {
  title: "AppHub",
  description: "Le catalogue des sites, jeux et outils publiés par leurs créateurs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="font-sans">
        <Providers>
          {children}
          <footer className="border-t border-line mt-24">
            <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-muted">
              © 2026 AppHub · par Batchabi Rahim
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
