import type { Metadata } from "next";
import WorkspaceClient from "./workspace-client";

export const metadata: Metadata = {
  title: "Business Money Leak Workspace",
  description:
    "Enter monthly costs or itemize work expenses, see spending by category and vendor, identify potential profit leaks, and create a prioritized action plan.",
  alternates: { canonical: "/workspace" },
};

export default function WorkspacePage() {
  return <WorkspaceClient />;
}
