import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'
import { VideojuegosService } from './videojuegos.service'
import { Videojuego } from './videojuegos.entity'

@Controller('videojuegos')
export class VideojuegosController {
  constructor(private readonly videojuegosService: VideojuegosService) {}

  // Subir videojuego
  @Post('subir')
  async subirVideojuego(
    @Body('titulo') titulo: string,
    @Body('descripcion') descripcion: string,
    @Body('imagen') imagen: string,
    @Body('archivo') archivo: string,
    @Body('autorId') autorId: number,
  ): Promise<Videojuego> {
    return await this.videojuegosService.subirVideojuego(titulo, descripcion, imagen, archivo, autorId)
  }

  // Listar todos los videojuegos
  @Get('listar')
  async listarVideojuegos(): Promise<Videojuego[]> {
    return await this.videojuegosService.listarVideojuegos()
  }

  // Obtener videojuego por ID
  @Get(':id')
  async obtenerVideojuego(@Param('id') id: number): Promise<Videojuego | null> {
    return await this.videojuegosService.obtenerVideojuego(id)
  }

  // Actualizar videojuego
  @Put('actualizar/:id')
  async actualizarVideojuego(
    @Param('id') id: number,
    @Body('titulo') titulo?: string,
    @Body('descripcion') descripcion?: string,
    @Body('imagen') imagen?: string,
    @Body('archivo') archivo?: string,
  ): Promise<Videojuego | null> {
    return await this.videojuegosService.actualizarVideojuego(id, titulo, descripcion, imagen, archivo)
  }

  // Eliminar videojuego
  @Delete('eliminar/:id')
  async eliminarVideojuego(@Param('id') id: number): Promise<{ mensaje: string }> {
    const eliminado = await this.videojuegosService.eliminarVideojuego(id)
    return eliminado
      ? { mensaje: 'Videojuego eliminado correctamente.' }
      : { mensaje: 'No se encontró el videojuego.' }
  }
}
