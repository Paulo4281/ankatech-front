import "./globals.css"
import { ToastContainer } from "react-toastify"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/Sidebar/Sidebar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased !overflow-x-hidden bg-black`}
      >
        <SidebarProvider>
          <Sidebar />
          
          <ToastContainer />
            <main>
              <SidebarTrigger className="bg-white cursor-pointer ms-2 mt-1" />
              {children}
            </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
