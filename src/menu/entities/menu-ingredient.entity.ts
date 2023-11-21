import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Column } from 'typeorm';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';
import { Menu } from './menu.entity';

@Entity()
export class MenuIngredient {
  @PrimaryColumn()
  cod_menu: number;

  @PrimaryColumn()
  cod_ingredient: number;

  @Column()
  amount_ingredient: number;

  @ManyToOne(() => Menu, (menu) => menu.menuIngredients)
  @JoinColumn({ name: 'cod_menu' })
  menu: Menu;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.menuIngredients)
  @JoinColumn({ name: 'cod_ingredient' })
  ingredient: Ingredient;
}
