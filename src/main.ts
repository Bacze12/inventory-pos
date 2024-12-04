import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { rateLimitMiddleware } from './middleware/rate-limit.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habillitar confianza en proxies
  app.getHttpAdapter().getInstance().set('trust proxy', 1);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  
  // Middleware de rate limiting
  app.use(rateLimitMiddleware);
  app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
  });


  const config = new DocumentBuilder()
    .setTitle('Inventory POS API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();