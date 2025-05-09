/**
 * Shape of a serialized exception, used to safely transfer or log error data.
 */
export interface SerializedException {
    message: string;
    code: string;
    stack?: string;
    cause?: string;
    metadata?: unknown;
  }
  
  /**
   * Base class for custom application exceptions.
   * Provides serialization logic and optional metadata/cause support.
   *
   * @abstract
   * @class ExceptionBase
   * @extends {Error}
   *
   * @example
   * class UserNotFoundException extends ExceptionBase {
   *   readonly code = 'user_not_found';
   * }
   */
  export abstract class ExceptionBase extends Error {
    abstract code: string;
  
    /**
     * @param message - The human-readable error message.
     * @param metadata - Optional extra information for debugging (non-sensitive).
     * @param cause - Optional underlying error.
     *
     * @warning Do not include sensitive data in metadata. This data may appear in logs.
     */
    constructor(
      readonly message: string,
      readonly metadata?: unknown,
      readonly cause?: Error,
    ) {
      super(message);
      Error.captureStackTrace(this, this.constructor);
    }
  
    /**
     * Serializes the exception to a plain object.
     * This is useful for logging or transmitting errors.
     *
     * @returns A serialized representation of the exception.
     */
    toJSON(): SerializedException {
      return {
        message: this.message,
        code: this.code,
        stack: this.stack,
        cause: isUndefined(this.cause)
          ? undefined
          : JSON.stringify(this.cause, Object.getOwnPropertyNames(this.cause)),
        metadata: this.metadata,
      };
    }
  }
  
  /**
   * Exception indicating that a required argument was missing or empty.
   *
   * @class ArgumentNotProvidedException
   * @extends {ExceptionBase}
   */
  export class ArgumentNotProvidedException extends ExceptionBase {
    readonly code = 'generic_argument_not_provided';
  }
  