import "./globals.css";
import Providers from "../components/Providers";

export const metadata = {
  title: "AppHub",
  description: "Découvrez les créations du monde",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
