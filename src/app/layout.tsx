import "./globals.css"
import { ToastContainer } from "react-toastify"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased !overflow-x-hidden bg-black`}
      >
          <ToastContainer />

            <main>
              {children}
            </main>

      </body>
    </html>
  );
}
