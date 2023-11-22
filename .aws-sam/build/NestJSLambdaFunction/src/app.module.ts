import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuModule } from './menu/menu.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { OrderModule } from './order/order.module';
//import { Ingredient } from './ingredient/entities/ingredient.entity';
//import { Menu } from './menu/entities/menu.entity';
//import { MenuIngredient } from './menu/entities/menu-ingredient.entity';

@Module({
  imports: [
    /*
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'username',
      password: 'password',
      database: 'wrap-up',
      entities: [Ingredient, Menu, MenuIngredient],
      synchronize: true,
    }),*/
    MenuModule,
    IngredientModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
