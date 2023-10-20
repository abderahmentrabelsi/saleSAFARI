import Joi from 'joi';

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
  }),
};

const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
};

const getCategories = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      image: Joi.string(),
    })
    .min(1),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
};

export default {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
