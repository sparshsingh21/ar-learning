import insurancePhones from "./insurance-phones.json";
import tflLimits from "./tfl-limits.json";
import medicareContacts from "./medicare-contacts.json";

export type InsurancePhone = { name: string; phone: string };
export type TflLimit = { name: string; tfl: string };
export type MedicareRegion = {
  states: string;
  ivr: string;
  customerService: string;
  links?: Record<string, string>;
};
export type MedicareContractor = {
  contractor: string;
  regions: MedicareRegion[];
};

export const INSURANCE_PHONES = insurancePhones as InsurancePhone[];
export const TFL_LIMITS = tflLimits as TflLimit[];
export const MEDICARE_CONTACTS = medicareContacts as MedicareContractor[];
