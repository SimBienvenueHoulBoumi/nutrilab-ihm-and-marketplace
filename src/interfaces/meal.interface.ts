export default interface Meal {
    strMeal: string;
    strInstructions: string;
    strMealThumb: string;
}

export interface ICreateMealForm {
    name: string;
    description: string;
    area: string;
    ingredients: { name: string; picture: string; labelDosage: string; dosage: string; }[];
}