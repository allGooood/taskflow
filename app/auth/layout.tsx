
export default function AuthLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            <header className="mb-6 text-center">
              <h1 className="text-2xl font-bold">
                Taskflow
                </h1>
              <p className="text-gray-500 mt-2 text-sm">
                계정에 로그인하거나 새로 가입하세요
              </p>
            </header>
            {children}
            <footer className="mt-6 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} Taskflow
            </footer>
          </div>
        </div>
    );
  }
  