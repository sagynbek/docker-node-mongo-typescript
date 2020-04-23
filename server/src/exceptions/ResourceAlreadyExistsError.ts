import ExceptionBase from "./ExceptionBase";


class ResourceAlreadyExistsError extends ExceptionBase {
  constructor() {
    super(409, "Resource already exists");
  }
}


export default ResourceAlreadyExistsError;