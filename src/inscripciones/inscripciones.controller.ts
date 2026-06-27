import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common'
import { InscripcionesService } from './inscripciones.service'
import { Inscripcion } from './inscripciones.entity'

@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) {}

  // Crear inscripción
  @Post('crear')
  async crearInscripcion(
    @Body('usuarioId') usuarioId: number,
    @Body('cursoId') cursoId: number,
  ): Promise<Inscripcion> {
    return await this.inscripcionesService.crearInscripcion(usuarioId, cursoId)
  }

  // Listar todas las inscripciones
  @Get('listar')
  async listarInscripciones(): Promise<Inscripcion[]> {
    return await this.inscripcionesService.listarInscripciones()
  }

  // Listar inscripciones de un usuario
  @Get('usuario/:usuarioId')
  async listarPorUsuario(@Param('usuarioId') usuarioId: number): Promise<Inscripcion[]> {
    return await this.inscripcionesService.listarPorUsuario(usuarioId)
  }

  // Listar inscripciones de un curso
  @Get('curso/:cursoId')
  async listarPorCurso(@Param('cursoId') cursoId: number): Promise<Inscripcion[]> {
    return await this.inscripcionesService.listarPorCurso(cursoId)
  }

  // Eliminar inscripción
  @Delete('eliminar/:id')
  async eliminarInscripcion(@Param('id') id: number): Promise<{ mensaje: string }> {
    const eliminado = await this.inscripcionesService.eliminarInscripcion(id)
    return eliminado
      ? { mensaje: 'Inscripción eliminada correctamente.' }
      : { mensaje: 'No se encontró la inscripción.' }
  }
}
