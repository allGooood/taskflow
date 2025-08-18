import "./globals.css";
import Header from "./components/Header";
import AuthContext from "./context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <Header/>
          <main>
            {children}
          </main>
        </AuthContext>
      </body>
    </html>
  );
}
