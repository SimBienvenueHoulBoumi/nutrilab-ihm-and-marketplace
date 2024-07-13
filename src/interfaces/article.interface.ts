export default interface Article {
    id: string;
    name: string;
    description: string;
    area: string;
    userId: string;
    preparation: string;
    createdAt: string;
    updatedAt: string;
}

export interface ArticleDto {
    name: string;
    description: string;
    preparation: string;
    area: string;
}