import {INestApplication, Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, OpenAPIObject, SwaggerModule} from "@nestjs/swagger";

import { AppModule } from './app/app.module';

class MainApiGateway {
  private static readonly globalPrefix: string = "api";

  private static readonly port: number = parseInt(process.env.PORT, 10) || 8000;

  private static appConfig(app: INestApplication) {
    app.setGlobalPrefix(this.globalPrefix);
    app.enableCors();
    // auth.useGlobalFilters(new GlobalExceptionFilter());
  }

  private static apiDocsConfig(app: INestApplication) {
    const config: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
      .setTitle('Forex Market APIs')
      .setVersion('1.0.0')
      .build();
    const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  private static async main() {
    const app = await NestFactory.create(AppModule);

    this.appConfig(app);

    this.apiDocsConfig(app);

    await app.listen(process.env.PORT || 8080);

    Logger.log(
      `🚀 Application is running on: http://localhost:${this.port}/${this.globalPrefix}`
    );
  }

  public static async run() {
    await this.main()
  }
}

MainApiGateway.run().catch(error => Logger.log(error.message));
