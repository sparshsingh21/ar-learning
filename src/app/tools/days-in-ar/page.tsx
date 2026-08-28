import type { Metadata } from "next";
import { DaysInArTool } from "@/components/tools/DaysInArTool";

export const metadata: Metadata = {
  title: "Days in AR",
  description: "Calculate days outstanding and aging bucket for a claim.",
};

export default function Page() {
  return <DaysInArTool />;
}
