import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

export function configureViews(app: NestExpressApplication) {
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', '..', 'views'));
  app.setViewEngine('hbs');
}
