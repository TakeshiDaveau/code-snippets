
  /**
   * Checks if a value is nullish — either `undefined`, `null`, or the string `'undefined'`.
   *
   * @param value - Any value.
   * @returns `true` if the value is nullish, otherwise `false`.
   *
   * @example
   * isUndefined(undefined); // true
   * isUndefined('undefined'); // true
   * isUndefined(null); // true
   * isUndefined(0); // false
   */
  export const isUndefined = (value: unknown): value is undefined => {
    return value === undefined || value === null || value === 'undefined';
  };
  
  /**
   * Determines whether a value is "empty".
   * 
   * - For arrays: checks if the array or all items are empty.
   * - For objects: shallow check (empty object).
   * - For strings: empty string is considered empty.
   * - For numbers/booleans: never empty.
   * - Nullish values are considered empty.
   *
   * @param value - A value of unknown type.
   * @returns Whether the value is empty or not.
   *
   * @example
   * isEmpty(false); // false
   * isEmpty(''); // true
   * isEmpty(new Date()); // false
   * isEmpty([]); // true
   * isEmpty([{}, {}]); // false
   * isEmpty({}); // true
   * isEmpty(undefined); // true
   */
  export const isEmpty = (value: unknown): boolean => {
    if (typeof value === 'number' || typeof value === 'boolean') {
      return false;
    }
    if (isUndefined(value)) {
      return true;
    }
    if (value instanceof Date) {
      return false;
    }
    if (value instanceof Object && Object.keys(value).length === 0) {
      return true;
    }
  
    if (
      Array.isArray(value) &&
      value.every((item) => isEmpty(item))
    ) {
      return true;
    }
    if (value === '') {
      return true;
    }
  
    return false;
  };
  
  /**
   * Union of primitive types allowed in Value Objects.
   */
  type Primitive = string | boolean | number | undefined | null | Date;
  
  /**
   * Checks if a value is a supported primitive type.
   *
   * @param value - The value to check.
   * @returns `true` if the value is primitive.
   */
  const isPrimitive = (value: unknown): value is Primitive => {
    return (
      typeof value === 'string' ||
      typeof value === 'boolean' ||
      typeof value === 'number' ||
      value === undefined ||
      value === null ||
      value instanceof Date
    );
  };
  
  /**
   * Wraps a primitive in an object for consistent storage.
   *
   * @template T - Primitive type.
   */
  interface PrimitiveObjectProperties<T> {
    value: T;
  }
  
  /**
   * Defines the shape of the internal `properties` for a Value Object.
   * If the value is primitive, it's wrapped. Otherwise it's passed directly.
   */
  export type ValueObjectProperties<T> = T extends Primitive ? PrimitiveObjectProperties<T> : T;
  
  /**
   * Abstract base class for creating Value Objects in a DDD context.
   * Provides equality, validation, serialization, and immutability.
   *
   * @template T - The type of the value represented.
   *
   * @example
   * class Email extends ValueObject<string> {
   *   protected validate(value: string) {
   *     if (!value.includes('@')) {
   *       throw new Error('Invalid email address');
   *     }
   *   }
   *
   *   public getValue(): string {
   *     return this.properties.value;
   *   }
   *
   *   public equals(other: ValueObject<string>): boolean {
   *     return other instanceof Email && this.getValue() === other.getValue();
   *   }
   * }
   */
  export abstract class ValueObject<T> {
    /**
     * Internal representation of the value.
     */
    protected readonly properties: ValueObjectProperties<T>;
  
    private readonly isPrimitive: boolean;
  
    /**
     * Creates a new Value Object.
     *
     * @param properties - The raw value or object.
     * @throws ArgumentNotProvidedException if the value is empty.
     */
    constructor(properties: T) {
      this.checkIfEmpty(properties);
      this.validate(properties);
      if (isPrimitive(properties)) {
        const temporaryProperties: PrimitiveObjectProperties<T> = { value: properties };
        this.properties = temporaryProperties as ValueObjectProperties<T>;
        this.isPrimitive = true;
      } else {
        this.properties = properties as ValueObjectProperties<T>;
        this.isPrimitive = false;
      }
    }
  
    /**
     * Type guard to verify if a value is a ValueObject instance.
     *
     * @param object - Value to test.
     * @returns `true` if it's a ValueObject.
     */
    static isValueObject(object: unknown): object is ValueObject<unknown> {
      return object instanceof ValueObject;
    }
  
    /**
     * Gets the raw value represented by this Value Object.
     */
    public abstract getValue(): T;
  
    /**
     * Checks equality with another ValueObject.
     *
     * @param valueObject - Another instance to compare.
     * @returns `true` if values are structurally equal.
     */
    public abstract equals(valueObject?: ValueObject<T>): boolean;
  
    /**
     * Validates the value of this object.
     *
     * @param properties - The value to validate.
     */
    protected abstract validate(properties: T): void;
  
    /**
     * Default string representation of the Value Object.
     * Can be overridden in subclasses.
     *
     * @returns A string representation for debugging/logging.
     */
    public toString(): string {
      return this.isPrimitive
        ? `${this.constructor.name} [${(
            this.properties as PrimitiveObjectProperties<any>
          ).value.toString()}]`
        : `${this.constructor.name} [${JSON.stringify(this.properties)}]`;
    }
  
    /**
     * Ensures the value is not empty or undefined.
     *
     * @param properties - The value to check.
     * @throws ArgumentNotProvidedException if value is considered empty.
     */
    private checkIfEmpty(properties: T): void {
      if (isEmpty(properties)) {
        // See 001-ts-base-exception.ts
        throw new ArgumentNotProvidedException(
          `Property of value object (${this.constructor.name}) cannot be empty`,
        );
      }
    }
  }
  