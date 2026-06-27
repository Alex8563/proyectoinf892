import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Usuario } from '../usuarios/usuarios.entity'
import { Curso } from '../cursos/cursos.entity'

@Entity('inscripciones')
export class Inscripcion {
  @PrimaryGeneratedColumn()
  id: number

  // Relación con el usuario que se inscribe
  @ManyToOne(() => Usuario, usuario => usuario.id)
  usuario: Usuario

  // Relación con el curso al que se inscribe
  @ManyToOne(() => Curso, curso => curso.id)
  curso: Curso

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date
}
