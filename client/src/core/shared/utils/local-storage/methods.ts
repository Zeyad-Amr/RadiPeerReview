export class LocalStorage {

  static store<T>(key: string, value: T): void {
    try {
      if (typeof value === 'string') {
        localStorage.setItem(key, value);
      } else if (typeof value === 'number') {
        localStorage.setItem(key, value.toString());
      } else if (typeof value === 'boolean') {
        localStorage.setItem(key, value.toString());
      } else if (Array.isArray(value)) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        throw new NotAllowedDataTypeException();
      }
    } catch (error) {
      throw new SomethingWrongException();
    }
  }

  static fetch<T>(key: string): T | null {
    try {
      const storedValue = localStorage.getItem(key);

      if (storedValue === null) {
        return null;
      }

      if (typeof storedValue === 'string') {
        return storedValue as unknown as T;
      } else if (typeof storedValue === 'number') {
        return parseFloat(storedValue) as unknown as T;
      } else if (typeof storedValue === 'boolean') {
        return (storedValue === 'true') as unknown as T;
      } else {
        return JSON.parse(storedValue) as unknown as T;
      }
    } catch (error) {
      throw new SomethingWrongException();
    }
  }

  static clear(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      throw new SomethingWrongException();
    }
  }

  static clearAll(): void {
    try {
      localStorage.clear();
    } catch (error) {
      throw new SomethingWrongException();
    }
  }
}

class NotAllowedDataTypeException extends Error {
  constructor() {
    super('The data type is not allowed for storage');
    this.name = 'NotAllowedDataTypeException';
  }
}

class SomethingWrongException extends Error {
  constructor() {
    super('Something went wrong while accessing storage');
    this.name = 'SomethingWrongException';
  }
}
