import express from 'express';

import docsRoute from './docs.route.js';
import config from '../config/config.js';
import productRouter from './product.route.js';








const router = express.Router();
const defaultRoutes = [

  {
    path: '/products',
    route: productRouter,
  }

];

const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];
defaultRoutes.forEach((route) => {
  if (route.middlewares) router.use(route.path, route.middlewares, route.route);
  else router.use(route.path, route.route);
});
/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
