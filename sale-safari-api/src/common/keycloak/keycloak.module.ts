import { Module, Global } from '@nestjs/common';
import {
  KeycloakConnectModule,
  KeycloakConnectOptions,
} from 'nest-keycloak-connect';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => {
        return {
          authServerUrl: configService.get<string>('KEYCLOAK_AUTH_SERVER_URL'),
          realm: configService.get<string>('KEYCLOAK_REALM'),
          clientId: configService.get<string>('KEYCLOAK_CLIENT_ID'),
          secret: configService.get<string>('KEYCLOAK_SECRET'),
        } as KeycloakConnectOptions;
      },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [KeycloakConnectModule],
})
export class KeycloakModule {}
