export type NoteFieldType = "text" | "textarea" | "date" | "select" | "yesno";

export type NoteFieldValues = Record<string, string>;

export type NoteFieldDef = {
  id: string;
  label: string;
  type: NoteFieldType;
  /** Required when visible. Can be dynamic. */
  required?: boolean | ((values: NoteFieldValues) => boolean);
  options?: string[];
  fullWidth?: boolean;
  placeholder?: string;
  /** Show field only when predicate is true. Default: always. */
  showWhen?: (values: NoteFieldValues) => boolean;
  /** Label used in generated notes. Defaults to field label. */
  noteLabel?: string;
  /** If false, omit from generated notes when empty. Default true when has value. */
  includeInNotes?: boolean;
};

export type NoteFormSchema = {
  id: string;
  title?: string;
  description?: string;
  fields: NoteFieldDef[];
};

export const YES_NO = ["Yes", "No"] as const;

export const SOURCE_CALL_WEBSITE = ["Call", "Website"] as const;
export const SOURCE_ALL = ["Call", "Website", "EOB", "System"] as const;
export const MODE_FAX_MAIL_WEB = ["Fax", "Mail", "Website"] as const;
