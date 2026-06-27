import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { Pago } from './pagos.entity';
import { Usuario } from '../usuarios/usuarios.entity';
import { Curso } from '../cursos/cursos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pago, Usuario, Curso])],
  providers: [PagosService],
  controllers: [PagosController],
})
export class PagosModule {}
