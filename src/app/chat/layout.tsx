import Dummy from "./_components/dummy";
import Sidebar from "./_components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
        <Sidebar />
        {/* {children} */}
        <Dummy />
    </div>
  );
}
