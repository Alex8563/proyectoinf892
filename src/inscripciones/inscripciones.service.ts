import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Inscripcion } from './inscripciones.entity'
import { Usuario } from '../usuarios/usuarios.entity'
import { Curso } from '../cursos/cursos.entity'

@Injectable()
export class InscripcionesService {
  constructor(
    @InjectRepository(Inscripcion)
    private inscripcionesRepository: Repository<Inscripcion>,
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Curso)
    private cursosRepository: Repository<Curso>,
  ) {}

  // Crear inscripción
  async crearInscripcion(usuarioId: number, cursoId: number): Promise<Inscripcion> {
    const usuario = await this.usuariosRepository.findOne({ where: { id: usuarioId } })
    const curso = await this.cursosRepository.findOne({ where: { id: cursoId } })

    if (!usuario || !curso) {
      throw new Error('Usuario o curso no válido')
    }

    const inscripcion = this.inscripcionesRepository.create({
      usuario,
      curso,
    })

    return await this.inscripcionesRepository.save(inscripcion)
  }

  // Listar todas las inscripciones
  async listarInscripciones(): Promise<Inscripcion[]> {
    return await this.inscripcionesRepository.find({
      relations: ['usuario', 'curso'],
    })
  }

  // Listar inscripciones por usuario
  async listarPorUsuario(usuarioId: number): Promise<Inscripcion[]> {
    return await this.inscripcionesRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ['usuario', 'curso'],
    })
  }

  // Listar inscripciones por curso
  async listarPorCurso(cursoId: number): Promise<Inscripcion[]> {
    return await this.inscripcionesRepository.find({
      where: { curso: { id: cursoId } },
      relations: ['usuario', 'curso'],
    })
  }

  // Eliminar inscripción
  async eliminarInscripcion(id: number): Promise<boolean> {
    const result = await this.inscripcionesRepository.delete(id)
    return (result.affected ?? 0) > 0
  }
}
