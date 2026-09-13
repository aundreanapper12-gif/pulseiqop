import type { Metadata } from "next";
import WorkspaceClient from "./workspace-client";

export const metadata: Metadata = {
  title: "Executive Profit Intelligence Workspace",
  description:
    "Analyze revenue, labor, expenses, missed opportunities, and operating performance in one decision-focused workspace built for growing service businesses.",
  alternates: { canonical: "/workspace" },
};

export default function WorkspacePage() {
  return <WorkspaceClient />;
}
