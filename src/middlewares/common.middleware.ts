import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[key];
        if (!isObjectIdOrHexString(id)) {
          throw new ApiError(`Invalid id [${key}]`, 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public validateBody(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body, { abortEarly: false });
        next();
      } catch (e) {
        const errorMessages = e.details.map(({ context, type }) => ({
          field: context?.label,
          message: this.getValidationMessage(context?.label, type, req.body[context?.label]),
        }));

        res.status(400).json({
          status: 400,
          message: "Validation failed",
          errors: errorMessages,
        });
      }
    };
  }

  private getValidationMessage(field: string, type: string, value: any): string {
    const examples: Record<string, string> = {
      email: "example@mail.com",
      password: "Aa123456!",
      phone: "+1234567890",
    };
    const messages: Record<string, string> = {
      "string.pattern.base": `Field "${field}" is invalid. Example: ${examples[field] || "correct value"}`,
      "string.empty": `Field "${field}" cannot be empty.`,
      "any.required": `Field "${field}" is required.`,
      "string.email": `Field "${field}" must be a valid email. Example: ${examples[field]}`,
      "string.min": `Field "${field}" is too short.`,
      "string.max": `Field "${field}" is too long.`,
      "number.min": `Field "${field}" must be at least ${value}.`,
      "number.max": `Field "${field}" must be at most ${value}.`,
    };
    if (type === "string.pattern.base" && field === "email") {
      return `Field "email" must contain '@'. Example: ${examples[field]}`;
    }
    return messages[type] || `Invalid value for "${field}".`;
  }

}

export const commonMiddleware = new CommonMiddleware();
