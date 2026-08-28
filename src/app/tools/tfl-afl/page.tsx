import type { Metadata } from "next";
import { TflAflTool } from "@/components/tools/TflAflTool";

export const metadata: Metadata = {
  title: "TFL / AFL Calculator",
  description: "Estimate timely filing deadlines from date of service.",
};

export default function Page() {
  return <TflAflTool />;
}
