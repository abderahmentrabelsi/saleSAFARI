import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
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
  ],
  controllers: [],
  providers: [],
})
export class RootModule {}
