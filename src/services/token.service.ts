import jwt, { Secret, SignOptions } from "jsonwebtoken";
import {config} from "../configs/config";
import {ITokenPair, ITokenPayload} from "../interfaces/token.interface";
import {ApiError} from "../errors/api.error";
import {TokenTypeEnum} from "../enums/token.type.enum";


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

    public verifyToken(token:string, type: TokenTypeEnum): ITokenPayload {
        try{
            let secret: string;
            switch (type) {
                case "access":
                    secret = config.jwtAccessSecret;
                    break;
                case "refresh":
                    secret = config.jwtRefreshSecret;
                    break;
                default:
                    throw new ApiError('Invalid token type', 401);
            }
            return jwt.verify(token, secret) as ITokenPayload;
        } catch (error){
            throw new ApiError('Invalid token type', 401);
        }
    }

}

export const tokenService = new TokenService();