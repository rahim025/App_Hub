import "./globals.css";

export const metadata = {
  title: "AppHub",
  description: "Découvrez les créations du monde",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
