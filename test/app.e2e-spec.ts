import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { configureSwagger } from '../src/swagger/configure-swagger';
import { configureViews } from '../src/views/configure-views';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configureViews(app);
    configureSwagger(app);
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect(`<html>
  <head>
    <meta charset='utf-8' />
    <title>App</title>
  </head>
  <body>
    Hello World!
  </body>
</html>
`);
  });

  it('/api-docs (GET)', () => {
    return request(app.getHttpServer()).get('/api-docs').expect(200);
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect((res) => {
        return Array.isArray(res.body);
      });
  });
});
