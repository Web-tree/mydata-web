export class WrongComponentUsage implements Error {
  message: string;
  name: string;

  constructor(message: string) {
    this.message = message;
  }
}
