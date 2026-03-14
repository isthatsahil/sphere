import type { ErrorDetailsType } from "../types/error.js";

class CustomError extends Error {
  name: string;
  message: string;
  statusCode: number;

  constructor({ name, message, statusCode }: ErrorDetailsType) {
    super(message);
    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default CustomError;
