import Header from "../components/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6">
        {children}
      </main>
    </>
  );
}