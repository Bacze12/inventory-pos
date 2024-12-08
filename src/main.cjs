import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { dynamicRateLimitMiddleware } from './middleware/rate-limit.middleware';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable trust proxy
  app.getHttpAdapter().getInstance().set('trust proxy', 1);

  app.enableCors({
    origin: [
      process.env.FRONTEND_URL,
      'https://inventory-pos-frontend.vercel.app',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  // Middleware for rate limiting
  app.use(dynamicRateLimitMiddleware);
  app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
  });

  // Swagger configuration for API documentation
  const config = new DocumentBuilder()
    .setTitle('Inventory POS API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Load additional Swagger documentation files
  const authDoc = yaml.load(fs.readFileSync('docs/swagger/auth.yaml', 'utf8'));
  const productsDoc = yaml.load(
    fs.readFileSync('docs/swagger/products.yaml', 'utf8'),
  );
  const salesDoc = yaml.load(
    fs.readFileSync('docs/swagger/sales.yaml', 'utf8'),
  );
  const usersDoc = yaml.load(
    fs.readFileSync('docs/swagger/users.yaml', 'utf8'),
  );

  // Merge additional documentation into the main document
  Object.assign(
    document.paths,
    authDoc.paths,
    productsDoc.paths,
    salesDoc.paths,
    usersDoc.paths,
  );
  Object.assign(
    document.components.schemas,
    authDoc.components.schemas,
    productsDoc.components.schemas,
    salesDoc.components.schemas,
    usersDoc.components.schemas,
  );

  app.getHttpAdapter().get('/api-docs-json', (req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Content-Disposition', 'attachment; filename=swagger-spec.json');
    return res.send(document);
  });

  // Añadir endpoint para descargar en formato YAML
  app.getHttpAdapter().get('/api-docs-yaml', (req, res) => {
    const yamlStr = yaml.dump(document);
    res.header('Content-Type', 'text/yaml');
    res.header('Content-Disposition', 'attachment; filename=swagger-spec.yaml');
    return res.send(yamlStr);
  });

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
