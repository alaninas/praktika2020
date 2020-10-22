import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const port = process.env.APPLICATION_PORT || 3000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: JSON.parse(process.env.VALIDATION_PIPE_DISABLE_ERROR_MESSAGES) }));
  
    const options = new DocumentBuilder()
        .setTitle(process.env.SWAGGER_SET_TITLE)
        .setDescription(process.env.SWAGGER_SET_DESCRIPTION)
        .setVersion(process.env.SWAGGER_SET_VERSION)
        .addTag(process.env.SWAGGER_ADD_TAG)
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(process.env.SWAGGER_SET_PATH, app, document);

    app.enableCors();
    await app.listen(port);
}
bootstrap();
