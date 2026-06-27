import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'text',
    default: 'cliente', // valores posibles: admin, profesor, cliente
  })
  rol: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  codigoVerificacion: string | null;

  @Column({
    default: false,
  })
  verificado: boolean; // indica si el usuario confirmó su correo
}
