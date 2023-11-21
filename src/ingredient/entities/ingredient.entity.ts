import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { MenuIngredient } from '../../menu/entities/menu-ingredient.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  cod: number;

  @Column({ length: 255 })
  description: string;

  @Column()
  stock: number;

  @OneToMany(() => MenuIngredient, (menuIngredient) => menuIngredient.menu)
  menuIngredients: MenuIngredient[];

  /*
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
  */
}
