import app from "./app.js";
import serverConfig from "./config/serverConfig.js";
import { logger } from "./config/logger.js";
import path from "path";

const log = logger.child(path.basename(import.meta.url, ".js"));

app.listen(serverConfig.port, () => {
  log.info(`Server running on port ${serverConfig.port}`);
});
