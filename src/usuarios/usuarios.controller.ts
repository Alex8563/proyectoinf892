import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'
import { UsuariosService } from './usuarios.service'
import { Usuario } from './usuarios.entity'

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Crear usuario nuevo
  @Post('crear')
  async crearUsuario(
    @Body('nombre') nombre: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('rol') rol?: string,
  ): Promise<Usuario> {
    return await this.usuariosService.crearUsuario(nombre, email, password, rol)
  }

  // Listar todos los usuarios
  @Get('listar')
  async listarUsuarios(): Promise<Usuario[]> {
    return await this.usuariosService.listarUsuarios()
  }

  // Obtener usuario por ID
  @Get(':id')
  async obtenerUsuario(@Param('id') id: number): Promise<Usuario | null> {
    return await this.usuariosService.obtenerUsuario(id)
  }

  // Obtener usuario por email
  @Get('email/:email')
  async obtenerPorEmail(@Param('email') email: string): Promise<Usuario | null> {
    return await this.usuariosService.obtenerPorEmail(email)
  }

  // Actualizar usuario
  @Put('actualizar/:id')
  async actualizarUsuario(
    @Param('id') id: number,
    @Body('nombre') nombre?: string,
    @Body('email') email?: string,
    @Body('password') password?: string,
    @Body('rol') rol?: string,
    @Body('verificado') verificado?: boolean,
  ): Promise<Usuario | null> {
    return await this.usuariosService.actualizarUsuario(id, nombre, email, password, rol, verificado)
  }

  // Eliminar usuario
  @Delete('eliminar/:id')
  async eliminarUsuario(@Param('id') id: number): Promise<{ mensaje: string }> {
    const eliminado = await this.usuariosService.eliminarUsuario(id)
    return eliminado
      ? { mensaje: 'Usuario eliminado correctamente.' }
      : { mensaje: 'No se encontró el usuario.' }
  }
}
