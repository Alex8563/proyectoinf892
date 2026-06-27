import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'
import { CursosService } from './cursos.service'
import { Curso } from './cursos.entity'

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  // Crear curso nuevo
  @Post('crear')
  async crearCurso(
    @Body('titulo') titulo: string,
    @Body('descripcion') descripcion: string,
    @Body('horario') horario: string,
    @Body('instructorId') instructorId: number,
  ): Promise<Curso> {
    return await this.cursosService.crearCurso(titulo, descripcion, horario, instructorId)
  }

  // Listar todos los cursos con su instructor
  @Get('listar')
  async listarCursos(): Promise<Curso[]> {
    return await this.cursosService.listarCursos()
  }

  // Obtener curso por ID
  @Get(':id')
  async obtenerCurso(@Param('id') id: number): Promise<Curso | null> {
    return await this.cursosService.obtenerCurso(id)
  }

  // Actualizar curso
  @Put('actualizar/:id')
  async actualizarCurso(
    @Param('id') id: number,
    @Body('titulo') titulo?: string,
    @Body('descripcion') descripcion?: string,
    @Body('horario') horario?: string,
    @Body('instructorId') instructorId?: number,
  ): Promise<Curso | null> {
    return await this.cursosService.actualizarCurso(id, titulo, descripcion, horario, instructorId)
  }

  // Eliminar curso
  @Delete('eliminar/:id')
  async eliminarCurso(@Param('id') id: number): Promise<{ mensaje: string }> {
    const eliminado = await this.cursosService.eliminarCurso(id)
    return eliminado
      ? { mensaje: 'Curso eliminado correctamente.' }
      : { mensaje: 'No se encontró el curso.' }
  }
}
