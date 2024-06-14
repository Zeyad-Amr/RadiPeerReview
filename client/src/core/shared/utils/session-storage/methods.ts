export class SessionStorage {

  // Save data to session storage
  static saveData(key: string, data: any): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  // Get data from session storage by key
  static getDataByKey(key: string): any {
    const data = sessionStorage.getItem(key);
    return data ? this.safeJSONParse(data) : null;
  }

  private static safeJSONParse(str: any) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;
    }
  }

  static clear(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      throw new SomethingWrongException();
    }
  }

  static clearAll(): void {
    try {
      sessionStorage.clear();
    } catch (error) {
      throw new SomethingWrongException();
    }
  }
}

// class NotAllowedDataTypeException extends Error {
//   constructor() {
//     super('The data type is not allowed for storage');
//     this.name = 'NotAllowedDataTypeException';
//   }
// }

class SomethingWrongException extends Error {
  constructor() {
    super('Something went wrong while accessing storage');
    this.name = 'SomethingWrongException';
  }
}
