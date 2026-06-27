import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { Curso } from './cursos.entity';
import { Usuario } from '../usuarios/usuarios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Curso, Usuario])], // <-- aquí incluimos ambas entidades
  providers: [CursosService],
  controllers: [CursosController],
})
export class CursosModule {}
