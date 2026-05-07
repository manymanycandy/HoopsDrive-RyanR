import type { Metadata } from "next";
import Providers from "./providers";

import "../index.css";

export const metadata: Metadata = {
  title: "HoopsDrive",
  description: "More than a sport — confidence, growth, passion, discipline, community.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/x-icon" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
