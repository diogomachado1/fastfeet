interface BodyError {
  status: string;
  message: string;
}

export default class FFError extends Error {
  public name: string;

  public message: string;

  public type: string;

  public status: number;

  public body: BodyError;

  constructor(message, type, status) {
    super();
    this.message = message;
    this.type = type;
    this.status = status;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FFError);
    }

    this.name = 'FastFeetError';
    this.body = {
      status: 'error',
      message: this.message,
    };
  }
}
