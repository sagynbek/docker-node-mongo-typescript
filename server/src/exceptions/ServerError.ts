import ExceptionBase from "./ExceptionBase";
import { ErrorRequestHandler } from "express";


class ServerError extends ExceptionBase {
  constructor(error?: ErrorRequestHandler) {
    super(500, "Server error", { error: error });
  }
}


export default ServerError;