import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('videojuegos')
export class Videojuego {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  titulo: string

  @Column()
  descripcion: string

  @Column({ nullable: true })
  imagen: string

  @Column({ nullable: true })
  archivo: string

  @Column()
  autorId: number
}
