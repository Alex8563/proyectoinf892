import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideojuegosService } from './videojuegos.service';
import { VideojuegosController } from './videojuegos.controller';
import { Videojuego } from './videojuegos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Videojuego])],
  providers: [VideojuegosService],
  controllers: [VideojuegosController],
})
export class VideojuegosModule {}
