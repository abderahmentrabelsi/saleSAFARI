import httpStatus from 'http-status';
import pick from '../utils/pick.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import productService from '../services/product.service.js';
const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(product);
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['q', 'category', 'price']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, options);
  res.send(result);
});

const getProductBySlug = catchAsync(async (req, res) => {
  const product = await productService.getProductBySlug(req.params.slug);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send({ product });
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.params.productId, req.body);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});

const createCheckOutSession = catchAsync(async (req, res) => {
  await productService.createCheckOutSession(req, res);
});

export default {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createCheckOutSession,
  getProductBySlug,
};
