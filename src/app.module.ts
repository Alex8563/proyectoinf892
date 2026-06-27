import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CursosModule } from './cursos/cursos.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { PagosModule } from './pagos/pagos.module';
import { VideojuegosModule } from './videojuegos/videojuegos.module';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuarios/usuarios.entity';
import { Curso } from './cursos/cursos.entity';
import { Inscripcion } from './inscripciones/inscripciones.entity';
import { Pago } from './pagos/pagos.entity';
import { Videojuego } from './videojuegos/videojuegos.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/protegida.db', // archivo interno
      entities: [Usuario, Curso, Inscripcion, Pago, Videojuego],
      synchronize: true, // ⚠️ solo en desarrollo
    }),
    UsuariosModule,
    CursosModule,
    InscripcionesModule,
    PagosModule,
    VideojuegosModule,
    AuthModule,
  ],
})
export class AppModule {}
