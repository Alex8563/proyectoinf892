import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Curso } from './cursos.entity'
import { Usuario } from '../usuarios/usuarios.entity'

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso)
    private cursosRepository: Repository<Curso>,
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  // Crear un curso nuevo
  async crearCurso(
    titulo: string,
    descripcion: string,
    horario: string,
    instructorId: number,
  ): Promise<Curso> {
    const instructor = await this.usuariosRepository.findOne({ where: { id: instructorId } })
    if (!instructor || instructor.rol !== 'instructor') {
      throw new Error('Instructor no válido')
    }

    const curso = this.cursosRepository.create({
      titulo,
      descripcion,
      horario,
      instructor,
    })

    return await this.cursosRepository.save(curso)
  }

  // Listar todos los cursos con su instructor
  async listarCursos(): Promise<Curso[]> {
    return await this.cursosRepository.find({
      relations: ['instructor'],
    })
  }

  // Buscar curso por ID
  async obtenerCurso(id: number): Promise<Curso | null> {
    return await this.cursosRepository.findOne({
      where: { id },
      relations: ['instructor'],
    })
  }

  // Actualizar curso
  async actualizarCurso(
    id: number,
    titulo?: string,
    descripcion?: string,
    horario?: string,
    instructorId?: number,
  ): Promise<Curso | null> {
    const curso = await this.cursosRepository.findOne({ where: { id }, relations: ['instructor'] })
    if (!curso) return null

    if (titulo) curso.titulo = titulo
    if (descripcion) curso.descripcion = descripcion
    if (horario) curso.horario = horario
    if (instructorId) {
      const instructor = await this.usuariosRepository.findOne({ where: { id: instructorId } })
      if (instructor && instructor.rol === 'instructor') {
        curso.instructor = instructor
      }
    }

    return await this.cursosRepository.save(curso)
  }

  // Eliminar curso (corregido para evitar error de tipos)
  async eliminarCurso(id: number): Promise<boolean> {
    const result = await this.cursosRepository.delete(id)
    return (result.affected ?? 0) > 0
  }
}
