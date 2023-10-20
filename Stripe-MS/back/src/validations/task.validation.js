const Joi = require("@hapi/joi");

const createTask = {
body: Joi.object().keys({
  tasktitle: Joi.string().min(5).max(100).required(),
  assignby: Joi.string().required(),
  assignto: Joi.string().required(),
  describe: Joi.string().min(5).required(),
  project: Joi.string(),
  status: Joi.string().valid("done", "pending"),
  like: Joi.string().valid("like", "dislike"),
}),
};

export default {
    createTask,
};
