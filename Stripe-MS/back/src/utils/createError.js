import ApiError from "./ApiError.js";

export default ({message, status}) => {
  return new ApiError(message, status);
};
