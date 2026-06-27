import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Usuario } from '../usuarios/usuarios.entity'

@Entity('cursos')
export class Curso {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  titulo: string

  @Column()
  descripcion: string

  @Column()
  horario: string

  // Relación con el profesor/instructor que ofrece el curso
  @ManyToOne(() => Usuario, usuario => usuario.id)
  instructor: Usuario
}
