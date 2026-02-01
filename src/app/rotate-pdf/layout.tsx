import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rotate PDF Free Online - Turn PDF Pages | EditPDFs.app",
  description: "Rotate PDF pages for free online. Turn pages 90, 180, or 270 degrees. Fix upside-down or sideways PDFs. No signup required, 100% private.",
  keywords: "rotate pdf, turn pdf pages, flip pdf, free pdf rotator, fix pdf orientation",
};

export default function RotatePDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
