import Header from "../components/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="px-6 py-6 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
        <div className="w-[85vw] max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </>
  );
}