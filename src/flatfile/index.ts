import FlatfileListener, { Listener } from "@flatfile/listener";
import { ExcelExtractor } from "@flatfile/plugin-xlsx-extractor";

import { instrumentRequests } from "../../support/instrument.requests";
import { addDateValidator, addStringValidator, addNumberValidator } from "../../support/utils/common/validation";
import { extractClientsHandler } from "./actions/extract.clients.action";
import spaceConfigure from "./space.configure";
import projectsHooks from "./hooks/projects.hooks";
import { submitActionHandler } from "./actions/submit.action";

instrumentRequests();

export default function (listener: FlatfileListener) {
  listener.use(ExcelExtractor());

  listener.use(spaceConfigure);

  listener.use(addDateValidator);
  listener.use(addStringValidator);
  listener.use(addNumberValidator);

  listener.use(projectsHooks);

  listener.use(extractClientsHandler);
  listener.use(submitActionHandler);

  listener.on("**", (event) => {
    console.log(`Received event: ${event.topic}`);
  });
}
