import FlatfileListener from "@flatfile/listener";
import { configureSpace } from "@flatfile/plugin-space-configure";
import workbook from "./blueprints/workbooks/workbook";

export default function (listener: FlatfileListener) {
  return listener.use(configureSpace({
    workbooks: [workbook],
    space: {
      metadata: {
        theme: {
          root: {
            primaryColor: "#003448",
          },
          sidebar: {
            logo: "https://cdn.prod.website-files.com/648382c3b35916e18f783442/64919c473a5f45935881e484_coperniq-logo-white.svg",
            backgroundColor: "#003448",
            focusTextColor: "#003448",
            focusBgColor: "#20d782",
            titleColor: "#ffffff",
            textColor: "#ffffff"
          },
        }
      }
    }
  }))
}