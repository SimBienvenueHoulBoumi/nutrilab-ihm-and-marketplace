export default interface Article {
    id: string;
    name: string;
    description: string;
    area: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface ArticleDto {
    name: string;
    description: string;
    area: string;
}