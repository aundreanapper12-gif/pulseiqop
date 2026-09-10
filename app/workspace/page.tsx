import type { Metadata } from "next";
import WorkspaceClient from "./workspace-client";

export const metadata: Metadata = {
  title: "Business Money Leak Workspace",
  description:
    "Enter business financial and operating data, identify potential profit leaks, rank the largest opportunities, model recovery scenarios, and create a prioritized action plan.",
  alternates: { canonical: "/workspace" },
};

export default function WorkspacePage() {
  return <WorkspaceClient />;
}
