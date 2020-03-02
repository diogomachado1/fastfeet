import FFError from "./FFError";

export default class BadRequestError extends FFError {
  constructor(details: string) {
    const restMessage = '. Checkout documentation for more info: ';
    const defaultMessage = 'Invalid request arguments';
    const message = (details?details:defaultMessage)+restMessage;
    super(message, 'badRequest',400);
  }
}
