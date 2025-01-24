import { Flatfile } from "@flatfile/api";
import { ValidationType, StringValidationType } from "../../../../support/utils/common/validation";

export const clientsSheet: Flatfile.SheetConfig = {
  name: "Clients",
  slug: "clients",
  readonly: true,
  allowAdditionalFields: false,
  fields: [
    {
      key: "primary_name",
      type: "string",
      label: "Primary Name",
      constraints: [{ type: "required" }]
    },
    {
      key: "primary_email",
      type: "string",
      label: "Primary Email",
      constraints: [
        { type: "required" },
        {
          type: "external",
          validator: "StringValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: StringValidationType.IS_EMAIL,
            formatOptions: { case: "lower", trim: true },
            options: {
              setRecord: true,
              addError: true,
              errorMsg: "Please enter a valid email address"
            }
          }
        }
      ]
    },
    {
      key: "primary_phone",
      type: "string",
      label: "Primary Phone",
      constraints: [{ type: "required" }]
    },
    {
      key: "address",
      type: "string",
      label: "Address",
      constraints: [{ type: "required" }]
    }
  ]
};
