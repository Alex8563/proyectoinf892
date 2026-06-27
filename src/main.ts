import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsuariosService } from './usuarios/usuarios.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Servir carpeta pública (HTML, CSS, JS, imágenes)
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'assets'), { prefix: '/assets' });

  // Insertar usuarios de prueba al iniciar
  const usuariosService = app.get(UsuariosService);
  await usuariosService.seedUsuarios();

  await app.listen(process.env.PORT || 3000); // Railway usa PORT automático
}
bootstrap();
