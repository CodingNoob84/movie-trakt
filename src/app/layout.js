import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "@/providers/reactQueryProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "MovieTrakt App";
const APP_DEFAULT_TITLE = "Movie Trakt App";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION =
  "This App is just used to maintain watchlist and watchhistory for movies and series";

export const metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport = {
  themeColor: "#FFFFFF",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en" className="black" suppressHydrationWarning={true}>
      <body className={`${inter.className} bg-black text-white`}>
        <SessionProvider session={session}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Toaster richColors />
        </SessionProvider>
      </body>
    </html>
  );
}
