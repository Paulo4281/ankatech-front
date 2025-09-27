import "./globals.css"
import { ToastContainer } from "react-toastify"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/Sidebar/Sidebar"
import { QueryProvider } from "@/providers/QueryClientProvider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`antialiased !overflow-x-hidden bg-black`}
      >
        <QueryProvider>
          <SidebarProvider>
            <Sidebar />
            
            <ToastContainer />
              <main className="!w-full">
                <SidebarTrigger className="bg-white cursor-pointer ms-2 mt-1" />
                {children}
              </main>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
