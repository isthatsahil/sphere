import { Router } from "express";
import { contactsController } from "./contacts.controller.js";
import { authenticate } from "src/middleware/authenticate.middleware.js";

const contactsRoute = Router();

contactsRoute.post(
  "/search-contacts",
  authenticate,
  contactsController.searchContacts,
);
export default contactsRoute;
