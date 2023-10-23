import { NestFactory } from '@nestjs/core';
import process from 'process';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConsoleLogger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import cookieParser from 'cookie-parser';
import { RootModule } from './root.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(RootModule);
  initSwagger(app);
  app.enableCors({
    origin: '*',
  });
  app.use(cookieParser());

  await app.listen(3000);
}

function initSwagger(app: NestExpressApplication) {
  if (process.env.NODE_ENV !== 'production') {
    patchNestJsSwagger();
    new ConsoleLogger('startup').log('Swagger enabled');
    const config = new DocumentBuilder()
      .setTitle('sale-safari-api')
      .addServer('http://localhost:3000', 'Local server')
      .setDescription('The Hero Circle API description')
      .setVersion('1.0')
      .addBearerAuth({
        name: 'Authorization',
        description: `Please enter token in following format: Bearer <JWT>`,
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'header',
      })
      .addSecurityRequirements('Authorization')
      .build();
    SwaggerModule.setup(
      'swagger',
      app,
      SwaggerModule.createDocument(app, config, {
        operationIdFactory: (controllerKey, methodKey) => methodKey,
        deepScanRoutes: true,
      }),
      {
        yamlDocumentUrl: '/yaml',
        jsonDocumentUrl: '/json',
        swaggerOptions: {
          persistAuthorization: true,
        },
      },
    );
  }
}

bootstrap();
