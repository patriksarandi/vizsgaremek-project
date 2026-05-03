import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
    sub: number;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        const secret = configService.get<string>('JWT_SECRET') ?? 'vizsgaremek-dev-secret-change-me';

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }

    async validate(payload: JwtPayload) {
        if (!payload.sub) {
            throw new UnauthorizedException('Érvénytelen token payload.');
        }

        return {
            id: payload.sub,
            email: payload.email,
            role: payload.role
        }
    }
}