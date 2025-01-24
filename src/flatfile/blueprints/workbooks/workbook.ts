import { Flatfile } from "@flatfile/api";
import { projectsSheet } from "../sheets/projects.sheet";
import { clientsSheet } from "../sheets/clients.sheet";
import { submitActionDeclaration } from "../../actions/submit.action";

const workbook: Flatfile.CreateWorkbookConfig = {
  name: "Intake Workbook",
  labels: ["pinned"],
  sheets: [projectsSheet, clientsSheet],
  actions: [submitActionDeclaration]
};

export default workbook;
