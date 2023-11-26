export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-300 bg-[url('/bg.jpg')] bg-cover bg-blend-overlay">
      {children}
    </div>
  );
}
