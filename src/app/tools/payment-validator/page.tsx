import type { Metadata } from "next";
import { PaymentValidatorTool } from "@/components/tools/PaymentValidatorTool";

export const metadata: Metadata = {
  title: "Payment Validator",
  description: "Validate billed, allowed, paid, and patient responsibility balances.",
};

export default function Page() {
  return <PaymentValidatorTool />;
}
