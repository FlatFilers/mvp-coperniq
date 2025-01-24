import api, { Flatfile } from "@flatfile/api";
import { jobHandler } from "@flatfile/plugin-job-handler";
import { getWorkbook } from "../../../support/utils/get.workbook";

export const submitActionDeclaration: Flatfile.Action = {
  "label": "Submit",
  "mode": "foreground",
  "description": "Submit the data",
  "operation": "submitfg",
  "primary": true
}


export const submitActionHandler = jobHandler(`*:${submitActionDeclaration.operation}`, async (event, tick) => {
  const { payload } = event;
  const { jobId, workbookId } = event.context;

  const webhookReceiverRaw = process.env.WEBHOOK_SITE_URL;

  if (!webhookReceiverRaw) {
    throw new Error("WEBHOOK_SITE_URL is not set in the environment");
  }

  const webhookReceiver = webhookReceiverRaw.trim();
  
  // Acknowledge the job
  try {
    await api.jobs.ack(jobId, {
      info: "Job started",
      progress: 25,
    });

    tick(50, "Loading data from workbook");

    const knownWorkbook = await getWorkbook(workbookId);
    const projectsKnownSheet = knownWorkbook.sheet("projects");
    const projects = await projectsKnownSheet.getAllRecords().all();

    tick(75, "Submitting data to webhook.site");
    // Send the data to our webhook.site URL
    const response = await fetch(webhookReceiver, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        method: "fetch",
        projects,
      }),
    });

    if (response.status !== 200) {
      console.error("ERROR", response);
      throw new Error("Failed to submit data to webhook.site");
    }

    tick(99, "Data submitted to webhook.site");

    // Otherwise, complete the job
    await api.jobs.complete(jobId, {
      outcome: {
        message: `Data was successfully submitted to Webhook.site. Go check it out at ${webhookReceiver}.`,
      },
    });
  } catch (error) {
    throw error;
  }



});
