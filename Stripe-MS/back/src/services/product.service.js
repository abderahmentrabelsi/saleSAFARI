import httpStatus from "http-status";
import stripe from "stripe";
// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/extensions
import ApiError from "../utils/ApiError.js";


import axios from "axios";
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody) => {
  const { slug } = productBody;
  const existingProduct = await Product.findOne({ slug });

  if (existingProduct) {
    throw new Error('Product with this slug already exists. Please choose a different slug.');
  }

  return Product.create(productBody);
};


/**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (filter, options) => {
  const { sortBy = 'featured' } = options || {};
  let sortOption;
  switch (sortBy) {
    case 'price-desc':
      sortOption = { price: -1 };
      break;
    case 'price-asc':
      sortOption = { price: 1 };
      break;
    default:
      sortOption = { _id: -1 };
      break;
  }

  if(filter['q'] && filter['q'].length > 0){
    let filterQuery = {
      "name": {
        $regex: filter['q'],
        $options: 'i'
      }
    }
    filter = {...filter, ...filterQuery}
  }
  delete filter['q']

  Object.keys(filter).forEach((key) => (filter[key] === undefined) && delete filter[key]);
  let t = await Product.find(filter);

  return await Product.paginate(filter, {
    sort: sortOption,
    ...options,
  });
};


/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  return Product.findById(id);
};

const getProductBySlug = async (slug) => {
  const product = await Product.findOne({ slug });

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProductById = async (productId, updateBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const promises = [];
  promises.push(product.remove());
  promises.push(CartService.deleteProductFromCart(productId));
  promises.push(WishlistService.deleteProductFromWishlist(productId));
  await Promise.all(promises);
  return product;
};


const createCheckOutSession = async (req, res) => {
  try {
    const productId = req.body.productId; // Assuming the product ID is provided in the request body
    if (!productId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Product ID is required in the request body');
    }

    // Fetch the product data based on the provided product ID
    const productResponse = await axios.get(`http://market:8082/products/${productId}`);
    const product = productResponse.data;

    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    if (typeof product.price !== 'number') {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Product price is not a number');
    }

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card', 'alipay', 'acss_debit', 'wechat_pay', 'link'],
      payment_method_options: {
        acss_debit: {
          mandate_options: {
            payment_schedule: 'sporadic',
            transaction_type: 'personal',
          },
        },
        wechat_pay: {
          client: 'web',
        },
      },
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description, // Add description if needed
            },
            unit_amount: Math.round(product.price * 100),
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: 1,
        },
      ],
      success_url: `https://smartgym.mkadmi.tech/apps/success`,
      cancel_url: `https://stripe.com/docs/checkout/quickstart?lang=node`,
    });

    res.json({ url: session.url });
  } catch (err) {
    // Add error handling to capture and log the error
    console.error('Checkout session error:', err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default {
  createProduct,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  createCheckOutSession,
  getProductBySlug,
};
