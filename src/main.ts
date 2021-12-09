import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync(__dirname + '/server_key.pem'),
  cert: fs.readFileSync(__dirname + '/server_cert.pem'),
};

async function bootstrap() {
const app: any = await NestFactory.create(AppModule, {httpsOptions});
    app.setGlobalPrefix('api');
    app.enableCors();
    await app.listen(3000);
}

bootstrap();
