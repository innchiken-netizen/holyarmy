import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-[#09090B] py-12 sm:px-6 lg:px-8 relative">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(circle_at_center,rgba(255,85,0,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF5500] font-black text-black text-sm tracking-tight transition-transform group-hover:scale-105">
            HA
          </div>
          <span className="font-bold tracking-tight text-xl text-white">
            holy<span className="text-[#FF5500]">.</span>army
          </span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {children}
      </div>
    </div>
  );
}