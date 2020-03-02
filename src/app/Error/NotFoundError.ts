import FFError from "./FFError";

export default class NotFoundError extends FFError {
  constructor(entity: string) {
    super(`${entity} not found`,'notFound',404);
  }
}
