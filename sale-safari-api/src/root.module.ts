import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { TestModule } from './modules/test/test.module';
// import { KeycloakModule } from './common/keycloak/keycloak.module';  <-- commented because moved to the gateway
import { EurekaModule } from 'nestjs-eureka';

@Module({
  imports: [
    // KeycloakModule, <-- commented because moved to the gateway
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EurekaModule.forRoot({
      eureka: {
        host: 'localhost',
        port: 8761,
        registryFetchInterval: 1000,
        servicePath: '/eureka/apps',
        maxRetries: 3,
      },
      service: {
        name: 'api',
        port: 4747,
        host: 'localhost',
      },
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri:
            configService.get<string>('MONGO_URI') ??
            `mongodb://localhost:27017/nest`,
          autoIndex: true,
        } as MongooseModuleFactoryOptions;
      },
    }),
    TestModule,
  ],
  controllers: [],
  providers: [],
})
export class RootModule {}
