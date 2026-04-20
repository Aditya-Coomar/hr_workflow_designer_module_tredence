import type { Metadata } from "next";
import { WorkflowProvider } from "@/context/WorkflowContext";
import "@xyflow/react/dist/style.css";
import "./globals.css";

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
