class ForbiddenError extends Error {
  constructor(message, code = 403) {
    super(message);
    if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
    this.code = code;
    this.name = "ForbiddenError";
  }
}

export default ForbiddenError;
