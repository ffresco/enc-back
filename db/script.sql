-- Create the ingredient table
CREATE TABLE ingredient (
                            cod SERIAL PRIMARY KEY,
                            description VARCHAR(255),
                            stock INTEGER
);


-- Create the menu table
CREATE TABLE menu (
                      dish_code SERIAL PRIMARY KEY,
                      description VARCHAR(255),
                      available BOOLEAN
);

-- Create the menu_ingredient table
CREATE TABLE menu_ingredient (
                                 cod_menu INTEGER REFERENCES menu(dish_code),
                                 cod_ingredient INTEGER REFERENCES ingredient(cod),
                                 amount_ingredient INTEGER,
                                 PRIMARY KEY (cod_menu, cod_ingredient)
);



-- INSERT statements for the ingredient table
INSERT INTO ingredient (description, stock) VALUES
('Ingredient1', 100),
('Ingredient2', 150),
('Ingredient3', 200);

-- INSERT statements for the menu table
INSERT INTO menu (description, available) VALUES
('Dish1', true),
('Dish2', true),
('Dish3', false);

-- INSERT statements for the menu_ingredient table
INSERT INTO menu_ingredient (cod_menu, cod_ingredient, amount_ingredient) VALUES
 (1, 1, 2),
 (1, 2, 1),
 (2, 2, 3),
 (2, 3, 2),
 (3, 1, 1),
 (3, 3, 1);