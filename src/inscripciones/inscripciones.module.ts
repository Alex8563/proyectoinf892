import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscripcionesService } from './inscripciones.service';
import { InscripcionesController } from './inscripciones.controller';
import { Inscripcion } from './inscripciones.entity';
import { Usuario } from '../usuarios/usuarios.entity';
import { Curso } from '../cursos/cursos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inscripcion, Usuario, Curso])],
  providers: [InscripcionesService],
  controllers: [InscripcionesController],
})
export class InscripcionesModule {}
