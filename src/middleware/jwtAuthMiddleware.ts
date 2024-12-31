import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
    public constructor(private readonly jwtService: JwtService) {}

    public use(req: any, res: any, next: () => void) {
        const token = req.query.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Token no proporcionado');
        }

        try {
            const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            req.clientId = payload.clientId;
            req.schema = payload.schema;
            next();
        } catch (error) {
            throw new UnauthorizedException('Token inválido o expirado');
            return error;
        }
    }
}