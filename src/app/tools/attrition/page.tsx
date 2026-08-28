import type { Metadata } from "next";
import { AttritionTool } from "@/components/tools/AttritionTool";

export const metadata: Metadata = {
  title: "Attrition / Attendance",
  description: "Calculate attrition, attendance, and absenteeism percentages.",
};

export default function Page() {
  return <AttritionTool />;
}
