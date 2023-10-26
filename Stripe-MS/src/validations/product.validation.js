import Joi from 'joi';

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().required(),
    brand: Joi.string().required(),
    qty: Joi.number().required(),
    slug: Joi.string().required(),
    rating: Joi.number().required(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    brand: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    slug: Joi.string(),
    rating: Joi.number(),
  }),
};
const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().required(),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.number(),
      image: Joi.string(),
      brand: Joi.string(),
      qty: Joi.number(),
      slug: Joi.string(),
      rating: Joi.number(),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().required(),
  }),
};

const createCheckOutSession = Joi.array().items(
  Joi.object().keys({
    id: Joi.string().required(),
    qty: Joi.number().integer().min(1),
  })
);

const getProductBySlug = {
  params: Joi.object().keys({
    slug: Joi.string().required(),
  }),
};



export default {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createCheckOutSession,
  getProductBySlug,
};
