import "./globals.css"
// import { Navbar } from "../components/Navbar/Navbar"
// import { Footer } from "../components/Footer/Footer"
// import QueryProvider from "../providers/QueryClientProvider"
import { ToastContainer } from "react-toastify"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-black`}
      >
        {/* <QueryProvider> */}
          <ToastContainer />
            {/* <Navbar /> */}

            <main>
              {children}
            </main>

            {/* <Footer /> */}
        {/* </QueryProvider> */}
      </body>
    </html>
  );
}
