import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "PAIO Stats",
    template: "%s · PAIO Stats",
  },
  description:
    "Statistics for the Pan-African Informatics Olympiad: editions, countries, tasks, contestants, and all-time medal records.",
};

// Set the theme class before paint to avoid a flash of the wrong theme.
const themeScript = `(() => {
  try {
    const stored = localStorage.getItem('theme');
    const dark = stored ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (_) {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} font-sans bg-background text-foreground antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md outline-none transition-transform focus:translate-y-0 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background motion-reduce:transition-none"
        >
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
