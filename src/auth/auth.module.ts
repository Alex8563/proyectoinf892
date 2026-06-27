import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { Usuario } from '../usuarios/usuarios.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]), // habilita el repositorio de Usuario
    JwtModule.register({
      secret: 'CLAVE_SECRETA_JWT', // cámbiala por una segura en tu .env
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
