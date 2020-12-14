import validationMiddleware from './validation.middleware';
import loggerMiddleware from './logger.middleware';
import errorMiddleware from './error.middleware';

export { loggerMiddleware, errorMiddleware, validationMiddleware };
export type Validation = 'createProduct' | 'getProduct';