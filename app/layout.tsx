import "./globals.css";
import Header from "./components/Header";
import AuthContext from "./context/AuthContext";
import Dashboard from "./components/Dashboard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className="max-x-screen mx-auto min-h-screen bg-gray-100">
        <AuthContext>
          {/* <main className="max-w-4xl mx-auto px-4 py-6"> */}
            {children}
          {/* </main> */}
        </AuthContext>
      </body>
    </html>
  );
}
