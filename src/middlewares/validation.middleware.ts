import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import { HttpException } from '../utils/exceptions';
import { StatusCodes } from 'http-status-codes'
import { Dto } from '../dtos';


function validationMiddleware<T>(dto: Dto & any, from: 'body' | 'params'): express.RequestHandler {
  return (req, res, next) => {
    console.log(plainToClass(dto, req.params));

    validate(plainToClass(dto, req[from]))
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
          next(new HttpException(StatusCodes.BAD_REQUEST, message));
        } else {
          next();
        }
      });
  };
}

export default validationMiddleware;