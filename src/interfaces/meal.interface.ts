import { IngredientDto } from "./ingredient.interface";

export interface ICreateMealForm {
    name: string;
    description: string;
    area: string;
    preparation: string;
    ingredients: IngredientDto[];
  }
  
  export interface Ingredient extends IngredientDto {
    id?: string;
    createdAt: string;
    updatedAt: string;
  }
  
