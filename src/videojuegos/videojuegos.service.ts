import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Videojuego } from './videojuegos.entity'

@Injectable()
export class VideojuegosService {
  constructor(
    @InjectRepository(Videojuego)
    private videojuegosRepository: Repository<Videojuego>,
  ) {}

  // Subir un videojuego con imagen y archivo
  async subirVideojuego(
    titulo: string,
    descripcion: string,
    imagen: string,
    archivo: string,
    autorId: number,
  ): Promise<Videojuego> {
    const videojuego = this.videojuegosRepository.create({
      titulo,
      descripcion,
      imagen,
      archivo,
      autorId,
    })
    return await this.videojuegosRepository.save(videojuego)
  }

  // Listar todos los videojuegos
  async listarVideojuegos(): Promise<Videojuego[]> {
    return await this.videojuegosRepository.find()
  }

  // Obtener videojuego por ID
  async obtenerVideojuego(id: number): Promise<Videojuego | null> {
    return await this.videojuegosRepository.findOne({ where: { id } })
  }

  // Actualizar videojuego
  async actualizarVideojuego(
    id: number,
    titulo?: string,
    descripcion?: string,
    imagen?: string,
    archivo?: string,
  ): Promise<Videojuego | null> {
    const videojuego = await this.videojuegosRepository.findOne({ where: { id } })
    if (!videojuego) return null

    if (titulo) videojuego.titulo = titulo
    if (descripcion) videojuego.descripcion = descripcion
    if (imagen) videojuego.imagen = imagen
    if (archivo) videojuego.archivo = archivo

    return await this.videojuegosRepository.save(videojuego)
  }

  // Eliminar videojuego
  async eliminarVideojuego(id: number): Promise<boolean> {
    const result = await this.videojuegosRepository.delete(id)
    return (result.affected ?? 0) > 0
  }
}
