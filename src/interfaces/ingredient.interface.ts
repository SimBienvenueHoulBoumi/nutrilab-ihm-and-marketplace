export default interface Ingredient {
    id: string;
    name: string;
    picture: string,
    labelDosage: string,
    dosage: string;
    createdAt: string;
    updatedAt: string;
}

export interface IngredientDto {
    name: string;
    picture: string,
    labelDosage: string,
    dosage: string,
}

export interface IFormValues {
    mealName: string;
    description: string;
    area: string;
    ingredients: IngredientDto[];
}

export const ingredientFields = [
    { name: 'name', label: 'Name' },
    { name: 'picture', label: 'Picture URL' },
    { name: 'labelDosage', label: 'Label Dosage' },
    { name: 'dosage', label: 'Dosage' },
];

export const areas = [
    { name: 'Africa' },
    { name: 'Asia' },
    { name: 'Europe' },
    { name: 'North America' },
    { name: 'South America' },
    { name: 'Australia' },
    { name: 'Antarctica' },
];