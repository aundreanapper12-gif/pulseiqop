import type { Metadata } from "next";
import CheckupClient from "./checkup-client";

export const metadata: Metadata = {
  title: "Free Business Checkup",
  description: "Take a free 2-minute PulseIQ business visibility check and see where stronger operating insight could help.",
  alternates: { canonical: "/checkup" },
};

export default function CheckupPage() {
  return <CheckupClient />;
}
