import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { AppLogger } from './common/services/logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptors/response.interceptor';
const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for My Project')
    .setVersion('1.0')
    .addTag('api')
    // .addBearerAuth() // Configures Bearer token authentication
    .build();
    // @ApiBearerAuth()
    // @ApiResponse({ status: 403, description: 'Forbidden.' })
  
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  app.setGlobalPrefix('api/v1');


  // app.useGlobalInterceptors(new TransformInterceptor());

  // app.useGlobalFilters(new HttpExceptionFilter());
  

  // app.enableCors({
  //   origin: ['https://yourfrontend.com'],
  //   credentials: true,
  // });
  // app.use(helmet());
  // Enable global validation
  // const logger = app.get(AppLogger);
  // app.useLogger(logger); 
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
