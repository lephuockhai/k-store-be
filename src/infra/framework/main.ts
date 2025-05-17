import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        // Description of how to enter the token
        name: 'Authorization', // Name of the authorization header, here it is 'Authorization'
        type: 'http', // Type of authorization, here it is 'http'
        scheme: 'bearer', // Authorization scheme, here it is 'bearer'
        bearerFormat: 'JWT', // Format of the bearer token, here it is 'JWT'
        in: 'header', // Location of the authorization header, here it is 'header'
      },
      'access-token', // Optional name for the Bearer token authorization
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  const logger = new Logger();
  const port = process.env.PORT ?? 3000;

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port).then(() => {
    logger.log(`Listening on port ${port}`, 'Bootstrap');
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
