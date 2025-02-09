import jwt, { Secret, SignOptions } from "jsonwebtoken";

import { config } from "../configs/config";
import { TokenTypeEnum } from "../enums/token.type.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public generateToken(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, config.jwtAccessSecret as Secret, {
      expiresIn: config.jwtAccessExpiresIn as SignOptions["expiresIn"],
    });
    const refreshToken = jwt.sign(payload, config.jwtRefreshSecret as Secret, {
      expiresIn: config.jwtRefreshExpiresIn as SignOptions["expiresIn"],
    });
    return { accessToken, refreshToken };
  }

  public verifyToken(token: string, type: TokenTypeEnum): ITokenPayload {
    try {
      let secret: string;
      if (type === "access") {
        secret = config.jwtAccessSecret;
      } else if (type === "refresh") {
        secret = config.jwtRefreshSecret;
      } else {
        throw new ApiError("Invalid token type", 401);
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch {
      throw new ApiError("Invalid token type", 401);
    }
  }
}

export const tokenService = new TokenService();
