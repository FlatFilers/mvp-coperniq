import { jobHandler } from "@flatfile/plugin-job-handler";
import api, { Flatfile } from "@flatfile/api";

/**
 * Action declaration for the client extraction process.
 * This defines a foreground action that will be available in the UI
 * to trigger the extraction of unique clients from the projects sheet.
 */
export const extractClientsDeclaration: Flatfile.Action = {
  "label": "Extract Clients",
  "mode": "foreground",
  "description": "Traverse the projects sheet and extract clients",
  "operation": "extract-clients",
  "primary": true
};

/**
 * Handler for the extract clients action.
 * This job processes project records to create a unique list of clients
 * by extracting client information from project entries.
 */
export const extractClientsHandler = jobHandler(`*:${extractClientsDeclaration.operation}`, async (event, tick) => {
  // Extract necessary context from the event
  const { payload } = event;
  const { jobId, workbookId, sheetId } = event.context;

  // Initialize the job and notify the user
  await api.jobs.ack(jobId, {
    info: "Starting job to extract clients",
    progress: 5,
  });

  // Object to store unique clients keyed by email to prevent duplicates
  const uniqueClients = {};

  // Load all project records from the projects sheet
  await tick(10, "Loading projects");
  const projectsResponse = await api.records.get(sheetId);
  const projectRecords = projectsResponse.data.records;

  // Find and load the clients sheet and its existing records
  await tick(30, "Loading clients");
  const sheetsListResponse = await api.sheets.list({ workbookId });
  const sheetsList = sheetsListResponse.data;
  const clientsSheet = sheetsList.find(sheet => sheet.slug === "clients");
  const clientsResponse = await api.records.get(clientsSheet.id);
  const clients = clientsResponse.data.records;

  // Process each project to extract unique client information
  await tick(50, "Extracting clients");
  projectRecords.forEach(project => {
    // Use email as unique identifier for clients
    const projectEmail = project.values["primary_email"].value as string;
    if (!uniqueClients[projectEmail]) {
      // Create a new client entry if this email hasn't been seen before
      uniqueClients[projectEmail] = { 
        primary_name: {
          value: project.values["primary_name"].value as string,
        },
        primary_phone: {
          value: project.values["primary_phone"].value as string,
        },
        address: {
          value: project.values["address"].value as string,
        },
        primary_email: {
          value: projectEmail,
        }
      };
    }
  });

  // Clear existing clients if any exist
  await tick(70, "Creating clients");
  if (clients.length > 0) {
    await api.records.delete(clientsSheet.id, {
      ids: clients.map(client => client.id)
    });
    await tick(85, "Creating clients");
  }

  // Insert the new unique client records
  await api.records.insert(clientsSheet.id, Object.values(uniqueClients));

  // Mark the job as complete
  await tick(100, "Done");
  await api.jobs.complete(jobId, {
    info: "Completed job to extract clients",
  });
});