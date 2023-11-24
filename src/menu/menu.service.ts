import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuIngredient } from './entities/menu-ingredient.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(MenuIngredient)
    private menuIngredientRepository: Repository<MenuIngredient>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async createOrder(createMenuDto: CreateMenuDto) {
    const menu = await this.menuRepository.find({
      where: { dish_code: createMenuDto.dish_code },
      relations: {
        menuIngredients: true,
      },
    });

    //ceheck if menu is available
    if (!menu[0].available) return 'Menu not available';

    const enoughStock = await this.checkIngredientStock(
      menu,
      createMenuDto.quantity,
    );

    //check if there is enough stock
    if (!enoughStock) return 'Not enough ingredients';

    //dicount ingredients from stock
    this.updateStock()(menu, createMenuDto.quantity);
    return 'Order placed successfully';
  }

  private async checkIngredientStock(menu, quantity): Promise<boolean> {
    for (const element of menu[0].menuIngredients) {
      const ingredient = await this.ingredientRepository.findOne({
        where: { cod: element.cod_ingredient },
      });

      if (element.amount_ingredient * quantity >= ingredient.stock) {
        return false;
      }
    }

    return true;
  }

  private updateStock() {
    return (menu, quantity) => {
      menu[0].menuIngredients.forEach(async (element) => {
        console.log(element);
        const ingredient = await this.ingredientRepository.findOne({
          where: { cod: element.cod_ingredient },
        });
        ingredient.stock -= element.amount_ingredient * quantity;
        const updatedStock = await this.ingredientRepository.save(ingredient);
        console.log('After order ingredient');
        console.log(updatedStock);
      });
    };
  }

  async findAll() {
    const menus = await this.menuRepository.find({
      relations: {
        menuIngredients: true,
      },
    });

    return menus;
  }

  async findOne(id: number) {
    const menu = await this.menuRepository.find({
      where: { dish_code: id },
      relations: {
        menuIngredients: true,
      },
    });

    const b = await this.menuIngredientRepository.find({
      where: { cod_menu: menu[0].dish_code },
    });
    console.log(b);
    console.log(b[0].cod_ingredient);

    const c = await this.ingredientRepository.find({
      where: { cod: b[0].cod_ingredient },
    });
    console.log(c);
    return { c, b, menu };
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu ${updateMenuDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
