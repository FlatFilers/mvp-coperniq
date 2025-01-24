import { Flatfile } from "@flatfile/api";

export const Sheet1: Flatfile.SheetConfig = {
  name: "Sheet 1",
  slug: "sheet-1",
  fields: [
    {
      key: "field1",
      type: "string",
      label: "Field 1",
    },
  ],
};
