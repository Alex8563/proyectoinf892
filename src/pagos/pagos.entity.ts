import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Usuario } from '../usuarios/usuarios.entity'
import { Curso } from '../cursos/cursos.entity'

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  id: number

  // Relación con el usuario que realiza el pago
  @ManyToOne(() => Usuario, usuario => usuario.id)
  usuario: Usuario

  // Relación con el curso al que corresponde el pago
  @ManyToOne(() => Curso, curso => curso.id)
  curso: Curso

  @Column('decimal')
  monto: number

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date
}
