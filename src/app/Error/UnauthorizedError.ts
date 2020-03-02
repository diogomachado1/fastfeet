import FFError from './FFError';

export default class UnauthorizedError extends FFError {
  constructor() {
    super('Unauthorized', 'unauthorized', 401);
  }
}
