import { Metadata } from "next";
import Providers from "@/app/components/Providers";

export const metadata: Metadata = {
  title: "SignPD",
  description: "Edit, sign, highlight & rearrange your PDFs in the browser—no uploads to any server.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
