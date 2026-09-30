import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "Pranav Kasanagottu | AI/ML Engineer",
  description: "Computer Science (AIML) student building deep learning, computer vision and LLM systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable}`}>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
