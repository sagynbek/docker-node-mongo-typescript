import ExceptionBase from "./ExceptionBase";


class PageNotFoundError extends ExceptionBase {
  constructor(message: string = "Nothing found") {
    super(404, message);
  }
}


export default PageNotFoundError;