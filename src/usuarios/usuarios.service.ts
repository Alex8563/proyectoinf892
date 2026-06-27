import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { Usuario } from './usuarios.entity'

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  // Crear usuario nuevo (registro)
  async crearUsuario(nombre: string, email: string, password: string, rol: string = 'cliente'): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(password, 10)
    const usuario = this.usuariosRepository.create({
      nombre,
      email,
      password: hashedPassword,
      rol,
      verificado: false,
    })
    return await this.usuariosRepository.save(usuario)
  }

  // Listar todos los usuarios
  async listarUsuarios(): Promise<Usuario[]> {
    return await this.usuariosRepository.find()
  }

  // Buscar usuario por ID
  async obtenerUsuario(id: number): Promise<Usuario | null> {
    return await this.usuariosRepository.findOne({ where: { id } })
  }

  // Buscar usuario por email
  async obtenerPorEmail(email: string): Promise<Usuario | null> {
    return await this.usuariosRepository.findOne({ where: { email } })
  }

  // Actualizar usuario
  async actualizarUsuario(
    id: number,
    nombre?: string,
    email?: string,
    password?: string,
    rol?: string,
    verificado?: boolean,
  ): Promise<Usuario | null> {
    const usuario = await this.usuariosRepository.findOne({ where: { id } })
    if (!usuario) return null

    if (nombre) usuario.nombre = nombre
    if (email) usuario.email = email
    if (password) usuario.password = await bcrypt.hash(password, 10)
    if (rol) usuario.rol = rol
    if (verificado !== undefined) usuario.verificado = verificado

    return await this.usuariosRepository.save(usuario)
  }

  // Eliminar usuario
  async eliminarUsuario(id: number): Promise<boolean> {
    const result = await this.usuariosRepository.delete(id)
    return (result.affected ?? 0) > 0
  }

  // 🔹 Método para insertar usuarios de prueba (seed)
  async seedUsuarios() {
    const usuarios = [
      { nombre: 'Administrador', email: 'admin@plataforma.com', password: 'admin123', rol: 'admin', verificado: true },
      { nombre: 'Profesor Juan', email: 'profesor@plataforma.com', password: 'prof123', rol: 'profesor', verificado: true },
      { nombre: 'Cliente Pedro', email: 'cliente@plataforma.com', password: 'cli123', rol: 'cliente', verificado: false },
    ]

    for (const u of usuarios) {
      const existe = await this.usuariosRepository.findOne({ where: { email: u.email } })
      if (!existe) {
        u.password = await bcrypt.hash(u.password, 10) // encriptar contraseña
        await this.usuariosRepository.save(u)
      }
    }
  }
}
