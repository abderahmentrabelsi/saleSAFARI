import Joi from 'joi';
import { password } from './custom.validation.js';

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    profilePicture: Joi.string(),
    phoneNumber: Joi.string(),
  }),
};
const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    rememberMe: Joi.boolean().required(),
  }),
};
const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};
const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};
const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};
const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};
const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};
export { register };
export { login };
export { logout };
export { refreshTokens };
export { forgotPassword };
export { resetPassword };
export { verifyEmail };
export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
