import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { MenuIngredient } from './menu-ingredient.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  dish_code: number;

  @Column({ length: 255 })
  description: string;

  @Column()
  available: boolean;

  @OneToMany(() => MenuIngredient, (menuIngredient) => menuIngredient.menu)
  menuIngredients: MenuIngredient[];
}
