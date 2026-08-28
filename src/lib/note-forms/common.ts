import type { NoteFieldDef, NoteFieldValues } from "./types";
import {
  MODE_FAX_MAIL_WEB,
  SOURCE_ALL,
  SOURCE_CALL_WEBSITE,
  YES_NO,
} from "./types";

export function isCall(values: NoteFieldValues) {
  return values.source === "Call";
}

export function isWebsite(values: NoteFieldValues) {
  return values.source === "Website";
}

export function sourceFields(
  sources: readonly string[] = SOURCE_ALL,
): NoteFieldDef[] {
  return [
    {
      id: "source",
      label: "Source of Status",
      type: "select",
      required: true,
      options: [...sources],
      fullWidth: true,
      noteLabel: "Source of Status",
    },
    {
      id: "clearingHouseComment",
      label: "Clearing House Comment (Please make the changes if required)",
      type: "textarea",
      fullWidth: true,
      required: false,
      noteLabel: "Clearing House Comment",
    },
  ];
}

export function insuranceContactFields(
  opts: { includeClearingHouseName?: boolean } = {},
): NoteFieldDef[] {
  const fields: NoteFieldDef[] = [
    {
      id: "insuranceName",
      label: "Insurance Name",
      type: "text",
      required: true,
      noteLabel: "Insurance Name",
    },
  ];

  if (opts.includeClearingHouseName !== false) {
    fields.push({
      id: "clearingHouseName",
      label: "Clearing House Name",
      type: "text",
      required: false,
      noteLabel: "Clearing House Name",
    });
  }

  fields.push(
    {
      id: "insurancePhone",
      label: "Insurance Phone#",
      type: "text",
      required: true,
      showWhen: isCall,
      noteLabel: "Insurance Phone#",
    },
    {
      id: "repName",
      label: "Rep Name",
      type: "text",
      required: true,
      showWhen: isCall,
      noteLabel: "Rep Name",
    },
    {
      id: "websiteName",
      label: "Website Name",
      type: "text",
      required: true,
      showWhen: isWebsite,
      noteLabel: "Website Name",
    },
  );

  return fields;
}

export function claimActionFields(actions: string[]): NoteFieldDef[] {
  return [
    {
      id: "additionalComment",
      label: "Additional Comment",
      type: "textarea",
      fullWidth: true,
      required: false,
      noteLabel: "Additional Comment",
    },
    {
      id: "claimNumber",
      label: "Claim Number",
      type: "text",
      required: true,
      noteLabel: "Claim Number",
    },
    {
      id: "callReference",
      label: "Call Reference#",
      type: "text",
      required: true,
      noteLabel: "Call Reference#",
    },
    {
      id: "action",
      label: "Action",
      type: "select",
      required: true,
      options: actions,
      fullWidth: true,
      noteLabel: "Action",
    },
  ];
}

export function appealDeliveryFields(prefix = "appeal"): NoteFieldDef[] {
  const modeId = `${prefix}Mode`;
  return [
    {
      id: modeId,
      label: prefix === "appeal" ? "Mode of appeal" : "Mode of Submission",
      type: "select",
      required: true,
      options: [...MODE_FAX_MAIL_WEB],
      noteLabel: prefix === "appeal" ? "Mode of appeal" : "Mode of Submission",
    },
    {
      id: `${prefix}Fax`,
      label: "Fax Number",
      type: "text",
      required: true,
      showWhen: (v) => v[modeId] === "Fax",
      noteLabel: "Fax Number",
    },
    {
      id: `${prefix}Mail`,
      label: "Mailing Address",
      type: "textarea",
      required: true,
      fullWidth: true,
      showWhen: (v) => v[modeId] === "Mail",
      noteLabel: "Mailing Address",
    },
    {
      id: `${prefix}WebsiteLink`,
      label: "Website Link",
      type: "text",
      required: true,
      showWhen: (v) => v[modeId] === "Website",
      noteLabel: "Website Link",
    },
  ];
}

export { SOURCE_ALL, SOURCE_CALL_WEBSITE, MODE_FAX_MAIL_WEB, YES_NO };
