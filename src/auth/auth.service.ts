import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { Usuario } from '../usuarios/usuarios.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  // Registro de nuevo usuario
  async registrar(nombre: string, email: string, password: string): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(password, 10)
    const codigoVerificacion = Math.floor(100000 + Math.random() * 900000).toString()

    const nuevoUsuario = this.usuariosRepository.create({
      nombre,
      email,
      password: hashedPassword,
      codigoVerificacion,
      verificado: false,
      rol: 'cliente',
    })

    return await this.usuariosRepository.save(nuevoUsuario)
  }

  // Verificación de cuenta
  async verificarCuenta(email: string, codigo: string): Promise<boolean> {
    const usuario = await this.usuariosRepository.findOne({ where: { email } })
    if (usuario && usuario.codigoVerificacion === codigo) {
      usuario.verificado = true
      usuario.codigoVerificacion = null
      await this.usuariosRepository.save(usuario)
      return true
    }
    return false
  }

  // Login
  async login(email: string, password: string): Promise<{ access_token: string } | null> {
    const usuario = await this.usuariosRepository.findOne({ where: { email } })
    if (usuario && await bcrypt.compare(password, usuario.password)) {
      if (!usuario.verificado) {
        return null // No puede loguearse si no verificó su cuenta
      }
      const payload = { sub: usuario.id, email: usuario.email, rol: usuario.rol }
      return {
        access_token: this.jwtService.sign(payload),
      }
    }
    return null
  }
}
