import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { I18nValidationPipe } from 'nestjs-i18n';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// import { OpenApiNestFactory } from 'nest-openapi-tools';
// import * as fs from 'fs'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Demo API')
    .setDescription('A Demo API with CRUD functionality')
    .setVersion('1.0')
    .addTag(' Class API`s ')
    .setBasePath('v1/swagger')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // await OpenApiNestFactory.configure(
  //   app,
  //   new DocumentBuilder()
  //     .setTitle('My API')
  //     .setDescription('An API to do awesome things')
  //     .addBearerAuth(),
  //   {
  //     webServerOptions: {
  //       enabled: true,
  //       path: 'v1/swagger',
  //     },
  //     fileGeneratorOptions: {
  //       enabled: true,
  //       outputFilePath: './swagger.json', // or ./swagger.yaml
  //     },

  //     clientGeneratorOptions: {
  //       enabled: true,
  //       type: 'typescript-axios',
  //       outputFolderPath: '../typescript-api-client/src',
  //       additionalProperties:
  //         'apiPackage=clients,modelPackage=models,withoutPrefixEnums=true,withSeparateModelsAndApi=true',
  //       openApiFilePath: './swagger.json', // or ./swagger.yaml
  //       skipValidation: true, // optional, false by default
  //     },
  //   },
  // );
  // app.useGlobalPipes(
  //   new I18nValidationPipe(),
  // );
  await app.listen(3000);
}
bootstrap();
