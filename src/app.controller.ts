import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, Query, Redirect, Res, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';

@Controller('/integration')
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly configService: ConfigService, // Inject ConfigService
    ) {}

    @Get('/authorize')
    @Redirect('', 302)
    async initiateOAuth(): Promise<{ url: string }> {
        const { clientId, redirectUri } = this.configService.ezeepBlueOAuthConfig;
        const oauthUrl = 'https://account.ezeep.com/oauth/authorize';

        const authorizationUrl = `${oauthUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

        return { url: authorizationUrl };
    }

    async oauthCallback(@Query('code') code: string): Promise<any> {
        try {
            console.log('Authorization Code:', code);
            const tokens = await this.appService.exchangeCodeForTokens(code);

            const accessToken = tokens.access_token;
            console.log('Access Token:', accessToken);

            return tokens; 
        } catch (error) {
            throw new HttpException('Failed to exchange authorization code for tokens', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    
}