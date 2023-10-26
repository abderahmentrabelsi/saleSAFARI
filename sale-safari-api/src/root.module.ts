import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { EurekaModule } from 'nestjs-eureka';
import { OpenAIModule } from '@platohq/nestjs-openai';
import { AutomatedResponseModule } from './modules/openai/automated-response-module';

@Module({
  imports: [
    // KeycloakModule, <-- commented because moved to the gateway
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    OpenAIModule.register({
      apiKey: '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',
    }),
    EurekaModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          eureka: {
            host: configService.get<string>('EUREKA_HOST') ?? 'eureka-server',
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
        };
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
    AutomatedResponseModule,
  ],
  controllers: [],
  providers: [],
})
export class RootModule {}
