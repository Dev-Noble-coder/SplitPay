import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "sonner";
import { QueryProvider } from "./QueryProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SplitPay - Automate group savings and payouts",
  description: "Digital contribution and rotational savings platform for students and small communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased bg-gray-50`}
    >
      <body className="min-h-full font-sans text-gray-900">
        <QueryProvider>
          <Toaster richColors position="top-center" closeButton />
          {/* Mobile View Wrapper */}
          <div className="md:hidden flex flex-col h-screen bg-white">
            {children}
          </div>

        {/* Desktop Disabled View */}
        <div className="hidden md:flex flex-col min-h-screen items-center justify-center bg-gray-100 p-6 text-center">
          <div className="bg-white p-8 rounded-lg  max-w-md w-full border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Please view on mobile</h2>
            <p className="text-gray-500 text-sm">
              SplitPay is currently optimized for mobile devices. Please open this application on your smartphone for the best experience.
            </p>
          </div>
        </div>
        </QueryProvider>
      </body>
    </html>
  );
}
