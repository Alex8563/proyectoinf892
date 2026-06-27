import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Pago } from './pagos.entity'
import { Usuario } from '../usuarios/usuarios.entity'
import { Curso } from '../cursos/cursos.entity'

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private pagosRepository: Repository<Pago>,
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Curso)
    private cursosRepository: Repository<Curso>,
  ) {}

  // Registrar un pago
  async registrarPago(usuarioId: number, cursoId: number, monto: number): Promise<Pago> {
    const usuario = await this.usuariosRepository.findOne({ where: { id: usuarioId } })
    const curso = await this.cursosRepository.findOne({ where: { id: cursoId } })

    if (!usuario) {
      throw new Error('Usuario no encontrado')
    }
    if (!curso) {
      throw new Error('Curso no encontrado')
    }

    const pago = this.pagosRepository.create({
      usuario,
      curso,
      monto,
    })

    return await this.pagosRepository.save(pago)
  }

  // Listar todos los pagos
  async listarPagos(): Promise<Pago[]> {
    return await this.pagosRepository.find({
      relations: ['usuario', 'curso'],
    })
  }

  // Listar pagos de un usuario
  async listarPagosPorUsuario(usuarioId: number): Promise<Pago[]> {
    return await this.pagosRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ['usuario', 'curso'],
    })
  }

  // Listar pagos de un curso
  async listarPagosPorCurso(cursoId: number): Promise<Pago[]> {
    return await this.pagosRepository.find({
      where: { curso: { id: cursoId } },
      relations: ['usuario', 'curso'],
    })
  }

  // Eliminar un pago
  async eliminarPago(id: number): Promise<boolean> {
    const result = await this.pagosRepository.delete(id)
    return (result.affected ?? 0) > 0
  }
}
