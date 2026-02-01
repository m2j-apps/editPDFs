import "./editor.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free PDF Editor Online - Edit PDF Files | EditPDFs.app",
  description: "Edit PDF files for free online. Add text, images, shapes, signatures, and annotations. No signup required. Your files never leave your browser - 100% private.",
  keywords: "pdf editor, edit pdf, free pdf editor, online pdf editor, modify pdf, add text to pdf",
};

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
