import type { Metadata } from "next";
import "./globals.css";
import { WorkflowProvider } from "@/context/WorkflowContext";

export const metadata: Metadata = {
  title: "HR Workflow Designer",
  description: "Visual workflow builder for HR processes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <WorkflowProvider>{children}</WorkflowProvider>
      </body>
    </html>
  );
}
