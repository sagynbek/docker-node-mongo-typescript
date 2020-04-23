import { ErrorRequestHandler } from "express";

interface IConstructorConfig {
  error?: ErrorRequestHandler;
}
interface IExceptionBase extends IConstructorConfig {
  status: number,
  message: string,
  getMessage: Function,
  getStatus: Function,
}


class ExceptionBase implements IExceptionBase {
  status: number;
  message: string;
  error?: ErrorRequestHandler;

  constructor(status: number, message: string, config: IConstructorConfig = {}) {
    this.status = status;
    this.message = message;
    this.error = config.error;
  }

  getMessage() {
    return {
      message: this.message,
    }
  }

  getStatus() {
    return this.status;
  }

}

export default ExceptionBase;