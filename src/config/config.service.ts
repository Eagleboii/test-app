import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    get officerndFlexUrl(): string {
        return 'https://app.officernd.com';
    }

    get officerndFlexOAuthConfig() {
        return {
            oauthUrl: 'https://identity.officernd.com',
            clientId: 'IfTkLEqb7EecDRP0', 
            clientSecret: 'nB9yuyEZjk2FaHp96tErVadVAdSNUd4C', 
        };
    }


    get ezeepBlueOAuthConfig() {
        return {
            clientId: 'FeiqmAMsVbAAwCpjXhLLcsSrtj6z8BJPBQCIJbcA', 
            clientSecret: 'n2j5VIsiccRDYAIPp1vDctJEmks1V9QCNM8nt5Q57Tpz490Z5XG0cF7ZxmDhjge8vhyrUqueUz10vbjfPhGlRjviHB9GakeN2VNRZFy3rI1kqgmQnSAitNqVuIpX5hxe', // Your Ezeep Blue client secret
            redirectUri: 'https://app.officernd.com/connect/external-integration/return', 
        };
    }

    get currentEnvUrl(): string {
        return 'https://www.ezeep.com/'; 
    }
}
