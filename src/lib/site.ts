export const siteConfig = {
  name: "AR Training Guide",
  shortName: "AR Guide",
  description:
    "Practical Accounts Receivable training for medical billing — RCM basics, denial scenarios, ECW workflows, and AR tools.",
  url: "https://ar-training-guide.local",
};

export const mainNav = [
  {
    label: "Learn",
    href: "/learn",
    description: "AR basics, RCM, and analyst workflow",
  },
  {
    label: "Scenarios",
    href: "/scenarios",
    description: "Call questions and note helpers",
  },
  {
    label: "Denials",
    href: "/denials",
    description: "Denial categories and next actions",
  },
  {
    label: "ECW Guide",
    href: "/ecw",
    description: "eClinicalWorks AR click-paths",
  },
  {
    label: "Tools",
    href: "/tools",
    description: "Calculators for AR work",
  },
  {
    label: "References",
    href: "/references",
    description: "Phones, forms, and websites",
  },
] as const;

export const toolLinks = [
  {
    label: "Days in AR",
    href: "/tools/days-in-ar",
    description: "Calculate days outstanding and aging bucket",
  },
  {
    label: "TFL / AFL Calculator",
    href: "/tools/tfl-afl",
    description: "Timely filing deadline from date of service",
  },
  {
    label: "Attrition / Attendance",
    href: "/tools/attrition",
    description: "Team attrition, attendance, and absenteeism %",
  },
  {
    label: "Payment Validator",
    href: "/tools/payment-validator",
    description: "Check billed, allowed, paid, and imbalances",
  },
] as const;

export const sectionLabels: Record<string, string> = {
  learn: "Learn",
  scenarios: "Scenarios",
  denials: "Denials",
  ecw: "ECW Guide",
  references: "References",
  tools: "Tools",
};
