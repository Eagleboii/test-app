import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from './config/config.service';

// app.service.ts
@Injectable()
export class AppService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}

    async exchangeCodeForTokens(code: string): Promise<any> {
        const { clientId, clientSecret } = this.configService.ezeepBlueOAuthConfig;
        const requestBody = new URLSearchParams({
            grant_type: 'authorization_code',
            scope: 'printing reporting',
            code: code,
        }).toString();
        const authHeaderValue = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

        const response = await this.httpService.post(
            'https://account.ezeep.com/oauth/access_token/',
            requestBody,
            {
                headers: {
                    Authorization: `Basic ${authHeaderValue}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        ).toPromise();

        return response.data;
    }



    
    async refreshAccessToken(refreshToken: string): Promise<any> {
        const { clientId, clientSecret } = this.configService.ezeepBlueOAuthConfig;
        const requestBody = new URLSearchParams({
            grant_type: 'refresh_token',
            scope: 'printing reporting',
            refresh_token: refreshToken,
        }).toString();
        const authHeaderValue = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

        const response = await this.httpService.post(
            'https://account.ezeep.com/oauth/access_token/',
            requestBody,
            {
                headers: {
                    Authorization: `Basic ${authHeaderValue}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        ).toPromise();

        return response.data;
    }
}
