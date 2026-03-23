import { ValidationError } from "src/utils/errors.js";
import { sanitiseText } from "src/utils/utils.js";
import { contactsRepository } from "./contacts.repository.js";
import { logger } from "src/config/logger.js";
import path from "path";

export const contactService = {
  searchService: async (searchTerm: string, userId: number | undefined) => {
    const log = logger.child(path.basename(import.meta.url, ".js"));

    log.info(`Initiating contacts service method:: searchService`);
    if (userId === undefined || userId === null) {
      log.error(`User id not found`);
      throw new ValidationError("User Id is required");
    }
    if (searchTerm === undefined || searchTerm === null) {
      log.error(`User id not found`);
      throw new ValidationError("Search term is required.");
    }

    const sanitisedTerm = sanitiseText(searchTerm);
    const contacts = await contactsRepository.searchContacts(
      sanitisedTerm,
      userId,
    );
    logger.info(`Searched contacts ${JSON.stringify(contacts)}`);
    return contacts;
  },
};
