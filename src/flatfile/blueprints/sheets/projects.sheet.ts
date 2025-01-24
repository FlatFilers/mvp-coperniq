import { Flatfile } from "@flatfile/api";
import { ValidationType, DateValidationType, StringValidationType, NumberValidationType } from "../../../../support/utils/common/validation";
import { extractClientsDeclaration } from "../../actions/extract.clients.action";

export const projectsSheet: Flatfile.SheetConfig = {
  name: "Projects",
  slug: "projects",
  readonly: false,
  allowAdditionalFields: true,
  actions: [
    extractClientsDeclaration
  ],
  fields: [
    // Standard Fields
    {
      key: "primary_title",
      type: "string",
      label: "Title",
      constraints: [{ type: "required" }],
      metadata: { group: "Standard" }
    },
    {
      key: "primary_name",
      type: "string",
      label: "Primary Name",
      description: "Usually the same as Contact Name",
      constraints: [{ type: "required" }],
      metadata: { group: "Standard" }
    },
    {
      key: "primary_email",
      type: "string",
      label: "Contact Email",
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
      ],
      metadata: { group: "Standard" }
    },
    {
      key: "primary_phone",
      type: "string",
      label: "Contact Phone",
      constraints: [
        { type: "required" }
      ],
      metadata: { group: "Standard" }
    },
    {
      key: "address",
      type: "string",
      label: "Address",
      constraints: [{ type: "required" }],
      metadata: { group: "Standard" }
    },
    {
      key: "workflow",
      type: "string",
      label: "Workflow",
      description: "Primary Workflow in Coperniq",
      constraints: [{ type: "required" }],
      metadata: { group: "Standard" }
    },
    {
      key: "stage",
      type: "string",
      label: "Stage",
      description: "If Stages are different, provide a mapping",
      constraints: [{ type: "required" }],
      metadata: { group: "Standard" }
    },
    {
      key: "project_size",
      type: "number",
      label: "Project Size (kW)",
      description: "Should be in kW, clean without units",
      constraints: [
        { type: "required" },
        {
          type: "external",
          validator: "NumberValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: NumberValidationType.IS_POSITIVE,
            options: {
              setRecord: false,
              addError: true,
              errorMsg: "Project size must be a positive number"
            }
          }
        }
      ],
      metadata: { group: "Standard" }
    },
    {
      key: "project_value",
      type: "number",
      label: "Project Value ($)",
      description: "Should be in $, clean without units",
      constraints: [
        { type: "required" },
        {
          type: "external",
          validator: "NumberValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: NumberValidationType.IS_POSITIVE,
            options: {
              setRecord: false,
              addError: true,
              errorMsg: "Project value must be a positive number"
            }
          }
        }
      ],
      metadata: { group: "Standard" }
    },
    {
      key: "status",
      type: "enum",
      label: "Status",
      constraints: [{ type: "required" }],
      config: {
        options: [
          { value: "Active", label: "Active" },
          { value: "On Hold", label: "On Hold" },
          { value: "Canceled", label: "Canceled" },
          { value: "Completed", label: "Completed" },
        ],
      },
      metadata: { group: "Standard" }
    },
    {
      key: "trades",
      type: "enum-list",
      label: "Trades",
      constraints: [{ type: "required" }],
      config: {
        options: [
          { value: "Solar", label: "Solar" },
          { value: "Storage", label: "Storage" },
          { value: "Electrical", label: "Electrical" },
          { value: "...", label: "..." },
        ],
      },
      metadata: { group: "Standard" }
    },
    {
      key: "sales_rep",
      type: "string",
      label: "Sales Rep",
      constraints: [{ type: "required" }],
      metadata: { group: "Standard" }
    },
    {
      key: "project_manager",
      type: "string",
      label: "Project Manager",
      constraints: [{ type: "required" }],
      metadata: { group: "Standard" }
    },
    {
      key: "owner",
      type: "string",
      label: "Owner",
      constraints: [{ type: "required" }],
      metadata: { group: "Standard" }
    },

    // System Info
    {
      key: "battery_kwh",
      type: "number",
      label: "Battery (kWh)",
      constraints: [
        { type: "required" },
        {
          type: "external", 
          validator: "NumberValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: NumberValidationType.IS_POSITIVE,
            options: {
              setRecord: false,
              addError: true,
              errorMsg: "Battery size must be a positive number"
            }
          }
        }
      ],
      metadata: { group: "System Info" }
    },
    {
      key: "legacy_stage",
      type: "string",
      label: "Legacy Stage",
      constraints: [{ type: "required" }],
      metadata: { group: "System Info" }
    },
    {
      key: "system_size_kw_dc",
      type: "number",
      label: "System Size (kW DC)",
      constraints: [
        {
          type: "external",
          validator: "NumberValidator", 
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: NumberValidationType.IS_POSITIVE,
            options: {
              setRecord: false,
              addError: true,
              errorMsg: "System size DC must be a positive number"
            }
          }
        }
      ],
      metadata: { group: "System Info" }
    },
    {
      key: "system_size_kw_ac",
      type: "number",
      label: "System Size (kW AC)",
      constraints: [
        {
          type: "external",
          validator: "NumberValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: NumberValidationType.IS_POSITIVE,
            options: {
              setRecord: false,
              addError: true,
              errorMsg: "System size AC must be a positive number"
            }
          }
        }
      ],
      metadata: { group: "System Info" }
    },

    // Financial Info
    {
      key: "contract_signed_date",
      type: "date",
      label: "Contract Signed Date",
      constraints: [
        { type: "required" },
        {
          type: "external",
          validator: "DateValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: DateValidationType.VALIDATE,
            format: "YYYY-MM-DD",
            options: {
              setRecord: true,
              addError: true,
              errorMsg: "Please enter a valid date"
            }
          }
        }
      ],
      metadata: { group: "Financial Info" }
    },
    {
      key: "ownership_type",
      type: "enum",
      label: "Ownership Type",
      constraints: [{ type: "required" }],
      config: {
        options: [
          { value: "Cash", label: "Cash" },
          { value: "Loan", label: "Loan" },
          { value: "Lease", label: "Lease" },
          { value: "PPA", label: "PPA" },
        ],
      },
      metadata: { group: "Financial Info" }
    },
    {
      key: "financing_provider",
      type: "string",
      label: "Financing Provider",
      constraints: [{ type: "required" }],
      metadata: { group: "Financial Info" }
    },
    {
      key: "gross_contract_price",
      type: "number",
      label: "Gross Contract Price ($)",
      constraints: [
        { type: "required" },
        {
          type: "external",
          validator: "NumberValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: NumberValidationType.IS_POSITIVE,
            options: {
              setRecord: false,
              addError: true,
              errorMsg: "Gross contract price must be a positive number"
            }
          }
        }
      ],
      metadata: { group: "Financial Info" }
    },
    {
      key: "net_contract_price",
      type: "number",
      label: "Net Contract Price ($)",
      constraints: [
        { type: "required" },
        {
          type: "external",
          validator: "NumberValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: NumberValidationType.IS_POSITIVE,
            options: {
              setRecord: false,
              addError: true,
              errorMsg: "Net contract price must be a positive number"
            }
          }
        }
      ],
      metadata: { group: "Financial Info" }
    },
    {
      key: "sales_commission",
      type: "number",
      label: "Sales Commission ($)",
      constraints: [
        {
          type: "external",
          validator: "NumberValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: NumberValidationType.IS_POSITIVE,
            options: {
              setRecord: false,
              addError: true,
              errorMsg: "Sales commission must be a positive number"
            }
          }
        }
      ],
      metadata: { group: "Financial Info" }
    },

    // Stakeholder Info
    {
      key: "utility_company",
      type: "string",
      label: "Utility Company",
      constraints: [{ type: "required" }],
      metadata: { group: "Stakeholder Info" }
    },
    {
      key: "ahj",
      type: "string",
      label: "AHJ",
      constraints: [{ type: "required" }],
      metadata: { group: "Stakeholder Info" }
    },
    {
      key: "hoa",
      type: "string",
      label: "HOA",
      constraints: [{ type: "required" }],
      metadata: { group: "Stakeholder Info" }
    },
    {
      key: "sales_closer_name",
      type: "string",
      label: "Sales Closer Name",
      constraints: [{ type: "required" }],
      metadata: { group: "Stakeholder Info" }
    },
    {
      key: "sales_closer_email",
      type: "string",
      label: "Sales Closer Email",
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
      ],
      metadata: { group: "Stakeholder Info" }
    },
    {
      key: "project_manager_name",
      type: "string",
      label: "Project Manager Name",
      constraints: [{ type: "required" }],
      metadata: { group: "Stakeholder Info" }
    },
    {
      key: "project_manager_email",
      type: "string",
      label: "Project Manager Email",
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
      ],
      metadata: { group: "Stakeholder Info" }
    },
    {
      key: "market",
      type: "string",
      label: "Market",
      metadata: { group: "Stakeholder Info" }
    },
    {
      key: "sales_company",
      type: "string",
      label: "Sales Company",
      metadata: { group: "Stakeholder Info" }
    },
    {
      key: "epc_company",
      type: "string",
      label: "EPC Company",
      metadata: { group: "Stakeholder Info" }
    },

    // Contact Info
    {
      key: "preferred_communcation",
      type: "enum",
      label: "Preferred Communication",
      config: {
        options: [
          { value: "Email", label: "Email" },
          { value: "SMS", label: "SMS" },
          { value: "Call", label: "Call" },
        ],
      },
      metadata: { group: "Contact Info" }
    },
    {
      key: "other_names",
      type: "string",
      label: "Other Names",
      metadata: { group: "Contact Info" }
    },
    {
      key: "other_emails",
      type: "string",
      label: "Other Emails",
      constraints: [
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
      ],
      metadata: { group: "Contact Info" }
    },
    {
      key: "other_phones",
      type: "string",
      label: "Other Phones",
      metadata: { group: "Contact Info" }
    },

    // Site Info
    {
      key: "number_of_stories",
      type: "string",
      label: "Number of Stories",
      metadata: { group: "Site Info" }
    },
    {
      key: "mount_type",
      type: "string",
      label: "Mount Type",
      metadata: { group: "Site Info" }
    },
    {
      key: "utility_bill_monthly",
      type: "number",
      label: "Utility Bill Monthly ($)",
      constraints: [
        {
          type: "external",
          validator: "NumberValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: NumberValidationType.IS_POSITIVE,
            options: {
              setRecord: false,
              addError: true,
              errorMsg: "Utility bill amount must be a positive number"
            }
          }
        }
      ],
      metadata: { group: "Site Info" }
    },
    {
      key: "roof_type",
      type: "string",
      label: "Roof Type",
      metadata: { group: "Site Info" }
    },
    {
      key: "roof_age",
      type: "string",
      label: "Roof Age",
      metadata: { group: "Site Info" }
    },
    {
      key: "pitch_angle_deg",
      type: "string",
      label: "Pitch Angle (deg)",
      metadata: { group: "Site Info" }
    },
    {
      key: "azimuth_angle_deg",
      type: "string",
      label: "Azimuth Angle (deg)",
      metadata: { group: "Site Info" }
    },
    {
      key: "tilt_angle_deg",
      type: "string",
      label: "Tilt Angle (deg)",
      metadata: { group: "Site Info" }
    },

    // Notes Fields
    {
      key: "sales_rep_notes",
      type: "string",
      label: "Sales Rep Notes",
      metadata: { group: "Notes" }
    },
    {
      key: "change_order_notes",
      type: "string",
      label: "Change Order Notes",
      metadata: { group: "Notes" }
    },
    {
      key: "design_engineering_notes",
      type: "string",
      label: "Design & Engineering Notes",
      metadata: { group: "Notes" }
    },
    {
      key: "construction_notes",
      type: "string",
      label: "Construction Notes",
      metadata: { group: "Notes" }
    },
    {
      key: "inspection_notes",
      type: "string",
      label: "Inspection Notes",
      metadata: { group: "Notes" }
    },
    {
      key: "interconnection_notes",
      type: "string",
      label: "Interconnection Notes",
      metadata: { group: "Notes" }
    },
    {
      key: "cancellation_notes",
      type: "string",
      label: "Cancellation Notes",
      metadata: { group: "Notes" }
    },
    {
      key: "wifi_username_password",
      type: "string",
      label: "WiFi Username & Password",
      metadata: { group: "Notes" }
    },

    // Key Dates Fields
    {
      key: "created_date",
      type: "date",
      label: "Created Date",
      readonly: true,
      constraints: [
        {
          type: "external",
          validator: "DateValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: DateValidationType.VALIDATE,
            format: "YYYY-MM-DDTHH:mm:ssZ",
            options: {
              setRecord: true,
              addError: true,
              errorMsg: "Please enter a valid date"
            }
          }
        }
      ],
      metadata: { group: "Key Dates" }
    },
    {
      key: "site_survey_completed_date",
      type: "date",
      label: "Site Survey Completed Date",
      readonly: true,
      constraints: [
        {
          type: "external",
          validator: "DateValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: DateValidationType.VALIDATE,
            format: "YYYY-MM-DDTHH:mm:ssZ",
            options: {
              setRecord: true,
              addError: true,
              errorMsg: "Please enter a valid date"
            }
          }
        }
      ],
      metadata: { group: "Key Dates" }
    },
    {
      key: "engineering_completed_date",
      type: "date",
      label: "Engineering Completed Date",
      readonly: true,
      constraints: [
        {
          type: "external",
          validator: "DateValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: DateValidationType.VALIDATE,
            format: "YYYY-MM-DDTHH:mm:ssZ",
            options: {
              setRecord: true,
              addError: true,
              errorMsg: "Please enter a valid date"
            }
          }
        }
      ],
      metadata: { group: "Key Dates" }
    },
    {
      key: "permit_applied_date",
      type: "date",
      label: "Permit Applied Date",
      readonly: true,
      constraints: [
        {
          type: "external",
          validator: "DateValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: DateValidationType.VALIDATE,
            format: "YYYY-MM-DDTHH:mm:ssZ",
            options: {
              setRecord: true,
              addError: true,
              errorMsg: "Please enter a valid date"
            }
          }
        }
      ],
      metadata: { group: "Key Dates" }
    },
    {
      key: "permit_received_date",
      type: "date",
      label: "Permit Received Date",
      readonly: true,
      constraints: [
        {
          type: "external",
          validator: "DateValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: DateValidationType.VALIDATE,
            format: "YYYY-MM-DDTHH:mm:ssZ",
            options: {
              setRecord: true,
              addError: true,
              errorMsg: "Please enter a valid date"
            }
          }
        }
      ],
      metadata: { group: "Key Dates" }
    },
    {
      key: "installation_completed_date",
      type: "date",
      label: "Installation Completed Date",
      readonly: true,
      constraints: [
        {
          type: "external",
          validator: "DateValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: DateValidationType.VALIDATE,
            format: "YYYY-MM-DDTHH:mm:ssZ",
            options: {
              setRecord: true,
              addError: true,
              errorMsg: "Please enter a valid date"
            }
          }
        }
      ],
      metadata: { group: "Key Dates" }
    },
    {
      key: "inspection_passed_date",
      type: "date",
      label: "Inspection Passed Date",
      readonly: true,
      constraints: [
        {
          type: "external",
          validator: "DateValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: DateValidationType.VALIDATE,
            format: "YYYY-MM-DDTHH:mm:ssZ",
            options: {
              setRecord: true,
              addError: true,
              errorMsg: "Please enter a valid date"
            }
          }
        }
      ],
      metadata: { group: "Key Dates" }
    },
    {
      key: "pto_applied_date",
      type: "date",
      label: "PTO Applied Date",
      readonly: true,
      constraints: [
        {
          type: "external",
          validator: "DateValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: DateValidationType.VALIDATE,
            format: "YYYY-MM-DDTHH:mm:ssZ",
            options: {
              setRecord: true,
              addError: true,
              errorMsg: "Please enter a valid date"
            }
          }
        }
      ],
      metadata: { group: "Key Dates" }
    },
    {
      key: "pto_received_date",
      type: "date",
      label: "PTO Received Date",
      readonly: true,
      constraints: [
        {
          type: "external",
          validator: "DateValidator",
          config: {
            type: ValidationType.EVALUATE_AND_FORMAT,
            validationType: DateValidationType.VALIDATE,
            format: "YYYY-MM-DDTHH:mm:ssZ",
            options: {
              setRecord: true,
              addError: true,
              errorMsg: "Please enter a valid date"
            }
          }
        }
      ],
      metadata: { group: "Key Dates" }
    },
  ],
}; 