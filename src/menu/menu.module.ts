import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { Menu } from './entities/menu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuIngredient } from './entities/menu-ingredient.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, MenuIngredient, Ingredient])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
