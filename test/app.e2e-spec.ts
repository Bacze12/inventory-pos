import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { dynamicRateLimitMiddleware } from './../src/middleware/rate-limit.middleware';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    // Replicar la configuración de main.ts
    app.getHttpAdapter().getInstance().set('trust proxy', 1);
    app.enableCors({
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    });

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('should create a product and use it in a sale', async () => {
    const productResponse = await request(app.getHttpServer())
      .post('/products')
      .send({ name: 'Test Product', price: 100 });

    const productId = productResponse.body.id;

    const saleResponse = await request(app.getHttpServer())
      .post('/sales')
      .send({
        items: [{ productId, quantity: 2, price: 100 }],
      });

    expect(saleResponse.status).toBe(201);
    expect(saleResponse.body.total).toBe(200);
  });

  // it('should block requests to /kpis after exceeding rate limit', async () => {
  //   // Realizar 51 solicitudes (una más que el límite)
  //   for (let i = 0; i < 51; i++) {
  //     await request(app.getHttpServer()).get('/kpis');
  //   }
  
  //   // La última solicitud debe ser bloqueada
  //   const response = await request(app.getHttpServer()).get('/kpis');
  //   expect(response.status).toBe(429); // Verifica que devuelve "Too Many Requests"
  // });
  it('should allow up to 1000 requests to /products', async () => {
    for (let i = 0; i < 1000; i++) {
      const res = await request(app.getHttpServer()).get('/products');
      expect(res.status).toBe(200); // Verifica que responde correctamente
    }
  
    // La solicitud 1001 debe ser bloqueada
    const response = await request(app.getHttpServer()).get('/products');
    expect(response.status).toBe(429);
  });
  
});